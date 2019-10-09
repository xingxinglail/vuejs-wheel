import chai from 'chai'
import { createVue, destroyVM } from '../util'
import Row from '../../../src/layout/VRow'

const expect = chai.expect

describe('Row', () => {
    let vm

    afterEach(() => {
        destroyVM(vm)
    })

    it('可以设置gutter', done => {
        vm = createVue({
            template: `
                <v-row :gutter="20">
                    <v-col></v-col>
                    <v-col></v-col>
                </v-row>
            `
        }, true)
        vm.$nextTick(() => {
            const row = vm.$el
            expect(getComputedStyle(row).marginLeft).to.eq('-10px')
            expect(getComputedStyle(row).marginRight).to.eq('-10px')
            const col = row.querySelector('.v-col')
            expect(getComputedStyle(col).paddingLeft).to.eq('10px')
            expect(getComputedStyle(col).paddingRight).to.eq('10px')
            done()
        })
    })

    it('可以设置align', () => {
        vm = createVue({
            template: `
                <v-row align="center"></v-row>
            `
        })
        expect(vm.$el.classList.contains('v-row-align-center')).to.eq(true)
    })

    it('align 错误验证', () => {
        expect(Row.props.align.validator('xxx')).to.false
    })
})
