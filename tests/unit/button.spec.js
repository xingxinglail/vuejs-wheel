import { expect } from 'chai'
import sinon from 'sinon'
import { mount } from '@vue/test-utils'
import Button from '../../src/VButton'

describe('Button', () => {
    it('存在.', () => {
        expect(Button).to.be.ok
    })

    it('可以设置icon.', () => {
        const wrapper = mount(Button, {
            propsData: {
                icon: 'setting'
            }
        })
        const useDom = wrapper.find('use')
        expect(useDom.attributes('href')).to.eq('#i-setting')
    })

    it('可以设置loading', () => {
        const wrapper = mount(Button, {
            propsData: {
                icon: 'setting',
                loading: true
            }
        })
        const useDom = wrapper.find('use')
        expect(useDom.attributes('href')).to.eq('#i-loading')
    })

    it('icon position left 的 order 是 2', () => {
        const wrapper = mount(Button, {
            attachToDocument: true,
            propsData: {
                icon: 'setting',
                iconPosition: 'right'
            }
        })
        const svgDom = wrapper.vm.$el.querySelector('svg')
        expect(getComputedStyle(svgDom).order).to.eq('2')
        wrapper.destroy()
    })

    it('点击 button 触发 click 事件', () => {
        const clickHandler = sinon.stub()
        const wrapper = mount(Button, {
            propsData: {
                icon: 'setting',
            }
        })
        wrapper.vm.$on('click', clickHandler)
        wrapper.trigger('click')
        expect(clickHandler.called).to.eq(true)
    })
})
