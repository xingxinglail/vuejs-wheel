import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import VCol from '../../src/VCol'

describe('Col', () => {
    it('存在.', () => {
        expect(VCol).to.be.ok
    })

    it('可以设置span', () => {
        const wrapper = mount(VCol, {
            propsData: {
                span: 4
            }
        })
        expect(wrapper.classes('v-col-4')).to.eq(true)
    })

    it('可以设置offset', () => {
        const wrapper = mount(VCol, {
            propsData: {
                offset: 4
            }
        })
        expect(wrapper.classes('v-col-offset-4')).to.eq(true)
    })

    it('可以设置ipad', () => {
        const wrapper = mount(VCol, {
            propsData: {
                ipad: {
                    span: 4,
                    offset: 4
                }
            }
        })
        expect(wrapper.classes('v-col-ipad-4')).to.eq(true)
        expect(wrapper.classes('v-col-ipad-offset-4')).to.eq(true)
    })

    it('可以设置narrowPc', () => {
        const wrapper = mount(VCol, {
            propsData: {
                narrowPc: {
                    span: 4,
                    offset: 4
                }
            }
        })
        expect(wrapper.classes('v-col-narrow-pc-4')).to.eq(true)
        expect(wrapper.classes('v-col-narrow-pc-offset-4')).to.eq(true)
    })

    it('可以设置widePc', () => {
        const wrapper = mount(VCol, {
            propsData: {
                widePc: {
                    span: 4,
                    offset: 4
                }
            }
        })
        expect(wrapper.classes('v-col-wide-pc-4')).to.eq(true)
        expect(wrapper.classes('v-col-wide-pc-offset-4')).to.eq(true)
    })
})
