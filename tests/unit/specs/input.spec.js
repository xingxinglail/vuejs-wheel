import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { createVue, destroyVM } from '../util'

const expect = chai.expect
chai.use(sinonChai)

describe('Input', () => {
    let vm

    afterEach(() => {
        destroyVM(vm)
    })



    it('接收value', () => {
        vm = createVue({
            template: `
                <v-input value="hi"></v-input>
            `
        })
        const el = vm.$el.querySelector('input')
        expect(el.value).to.equal('hi')
    })

    it('接收disabled', () => {
        vm = createVue({
            template: `
                <v-input disabled></v-input>
            `
        })
        const el = vm.$el.querySelector('input')
        expect(el.disabled).to.equal(true)
    })

    it('接收readonly', () => {
        vm = createVue({
            template: `
                <v-input readonly></v-input>
            `
        })
        const el = vm.$el.querySelector('input')
        expect(el.readOnly).to.equal(true)
    })

    it('接收error', () => {
        vm = createVue({
            template: `
                <v-input error="出错了！"></v-input>
            `
        })
        const el = vm.$el.querySelector('input')
        const useEl = vm.$el.querySelector('use')
        const spanEl = vm.$el.querySelector('span')
        expect(useEl.getAttribute('xlink:href')).to.equal('#i-info-circle')
        expect(spanEl.innerText).to.equal('出错了！')
    })

    it('input/change/focus/blur', () => {
        ['input', 'change', 'focus', 'blur'].forEach(eventName => {
            const callback = sinon.fake();
            vm = createVue({
                template: `
                    <v-input value="hi" @input="onInput" @change="onChange" @focus="onFocus" @blur="onBlur"></v-input>
                `,
                methods: {
                    onInput (v) {
                        callback(v)
                    },
                    onChange (v) {
                        callback(v)
                    },
                    onFocus (v) {
                        callback(v)
                    },
                    onBlur (v) {
                        callback(v)
                    }
                }
            })
            const el = vm.$el.querySelector('input')
            const event = new Event(eventName)
            // 突破Event对象只读属性限制
            Object.defineProperty(event, 'target', { writable: false, value: { value: 'hi' } });
            el.dispatchEvent(event)
            expect(callback).to.have.been.calledWith('hi')
        })
    })
})
