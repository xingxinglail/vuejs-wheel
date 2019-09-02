import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import VInput from '../../src/VInput'
import sinon from "sinon";

describe('Input', () => {

    it('存在', () => {
        expect(VInput).to.exist
    })

    describe('props', () => {

        it('接收value', () => {
            const wrapper = mount(VInput, {
                propsData: {
                    value: 'hi'
                }
            })
            expect(wrapper.props('value')).to.eq('hi')
            expect(wrapper.vm.$el.querySelector('input').value).to.eq('hi')
        })

        it('接收disabled', () => {
            const wrapper = mount(VInput, {
                propsData: {
                    disabled: true
                }
            })
            expect(wrapper.props('disabled')).to.eq(true)
            expect(wrapper.vm.$el.querySelector('input').disabled).to.eq(true)
        })

        it('接收readonly', () => {
            const wrapper = mount(VInput, {
                propsData: {
                    readonly: true
                }
            })
            expect(wrapper.props('readonly')).to.eq(true)
            expect(wrapper.vm.$el.querySelector('input').readOnly).to.eq(true)
        })

        it('接收error', () => {
            const wrapper = mount(VInput, {
                propsData: {
                    error: '出错了！'
                }
            })
            expect(wrapper.props('error')).to.eq('出错了！')
            const useDom = wrapper.find('use')
            expect(useDom.attributes('href')).to.eq('#i-info-circle')
            const spanDom = wrapper.find('span')
            expect(spanDom.text()).to.eq('出错了！')
        })
    })

    describe('事件', () => {

        it('input/change/focus/blur', () => {
            const wrapper = mount(VInput)
            const input = wrapper.find('input')
            ;['input', 'change', 'focus', 'blur'].forEach((eventName, index) => {
                const val = `hi-${index}`
                const handler = sinon.stub().withArgs(eventName).returns(eventName + val)
                input.element.value = val
                wrapper.vm.$on(eventName, e => {
                    const res = handler(eventName)
                    expect(res).to.eq(eventName + e)
                })
                input.trigger(eventName)
                expect(handler.called).to.eq(true)
            })
        })
    })
})
