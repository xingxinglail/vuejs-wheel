import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { createVue, destroyVM } from '../util'
import Button from '../../../src/button/VButton'

const expect = chai.expect
chai.use(sinonChai)

describe('Button', () => {
    let vm

    afterEach(() => {
        destroyVM(vm)
    })

    it('可以设置icon.', () => {
        vm = createVue({
            template: `
                <v-button icon="setting"></v-button>
            `
        })
        const useElement = vm.$el.querySelector('use')
        expect(useElement.getAttribute('xlink:href')).to.eq('#i-setting')
    })

    it('可以设置loading', () => {
        vm = createVue({
            template: `
                <v-button icon="setting" loading></v-button>
            `
        })
        const useElement = vm.$el.querySelector('use')
        expect(useElement.getAttribute('xlink:href')).to.eq('#i-loading')
    })

    it('icon position left 的 order 是 2', () => {
        vm = createVue({
            template: `
                <v-button icon="setting" icon-position="right"></v-button>
            `
        }, true)
        const svgDom = vm.$el.querySelector('svg')
        expect(getComputedStyle(svgDom).order).to.eq('2')
    })

    it('点击 button 触发 click 事件', () => {
        const callback = sinon.fake();
        vm = createVue({
            template: `
                <v-button icon="setting" @click="onClick">设置</v-button>
            `,
            methods: {
                onClick () {
                    callback()
                }
            }
        })
        vm.$el.click()
        expect(callback).to.have.been.called
    })

    it('iconPosition 错误验证', () => {
        expect(Button.props.iconPosition.validator('xxx')).to.false
    })
})
