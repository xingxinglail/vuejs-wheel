import chai from 'chai'
import { createVue, destroyVM } from '../util'
import Col from '../../../src/layout/VCol'

const expect = chai.expect

describe('Col', () => {
    let vm

    afterEach(() => {
        destroyVM(vm)
    })

    it('可以设置span', () => {
        vm = createVue({
            template: `
                <v-col :span="4"></v-col>
            `
        })
        expect(vm.$el.classList.contains('v-col-4')).to.eq(true)
    })

    it('可以设置offset', () => {
        vm = createVue({
            template: `
                <v-col :offset="4"></v-col>
            `
        })
        expect(vm.$el.classList.contains('v-col-offset-4')).to.eq(true)
    })

    it('可以设置ipad', () => {
        vm = createVue({
            template: `
                <v-col :ipad="{ span: 4, offset: 4 }"></v-col>
            `
        })
        expect(vm.$el.classList.contains('v-col-ipad-4')).to.eq(true)
        expect(vm.$el.classList.contains('v-col-ipad-offset-4')).to.eq(true)
    })

    it('可以设置narrowPc', () => {
        vm = createVue({
            template: `
                <v-col :narrow-pc="{ span: 4, offset: 4 }"></v-col>
            `
        })
        expect(vm.$el.classList.contains('v-col-narrow-pc-4')).to.eq(true)
        expect(vm.$el.classList.contains('v-col-narrow-pc-offset-4')).to.eq(true)
    })

    it('可以设置widePc', () => {
        vm = createVue({
            template: `
                <v-col :wide-pc="{ span: 4, offset: 4 }"></v-col>
            `
        })
        expect(vm.$el.classList.contains('v-col-wide-pc-4')).to.eq(true)
        expect(vm.$el.classList.contains('v-col-wide-pc-offset-4')).to.eq(true)
    })

    it('ipad 错误验证', () => {
        expect(Col.props.ipad.validator({})).to.false
        expect(Col.props.ipad.validator({ span: 12 })).to.true
    })

    it('narrowPc 错误验证', () => {
        expect(Col.props.narrowPc.validator({})).to.false
        expect(Col.props.narrowPc.validator({ a: 12 })).to.false
    })

    it('widePc 错误验证', () => {
        expect(Col.props.widePc.validator({})).to.false
        expect(Col.props.widePc.validator({ a: 12 })).to.false
    })
})
