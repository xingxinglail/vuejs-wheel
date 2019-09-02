import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import VRow from '../../src/VRow'
import VCol from '../../src/VCol'

describe('Row', () => {
    it('存在.', () => {
        expect(VRow).to.be.ok
    })

    it('可以设置gutter', done => {
        const wrapper = mount(VRow, {
            attachToDocument: true,
            propsData: {
                gutter: 20
            },
            slots: {
                default: [VCol, VCol]
            }
        })
        const rowDom = wrapper.vm.$el
        expect(getComputedStyle(rowDom).marginLeft).to.eq('-10px')
        expect(getComputedStyle(rowDom).marginRight).to.eq('-10px')
        const colDom = rowDom.querySelector('.v-col')
        wrapper.vm.$nextTick(() => {
            expect(getComputedStyle(colDom).paddingLeft).to.equal('10px')
            expect(getComputedStyle(colDom).paddingRight).to.equal('10px')
            done()
            wrapper.destroy()
        })
    })

    it('可以设置align', () => {
        const wrapper = mount(VRow, {
            propsData: {
                align: 'center'
            }
        })
        expect(wrapper.classes('v-row-align-center')).to.eq(true)
    })
})
