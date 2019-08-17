import Vue from 'vue'
import VCol from '../src/VCol'

Vue.config.productionTip = false
Vue.config.devtools = false

const expect = chai.expect

describe('VCol', () => {
    it('存在.', () => {
        expect(VCol).to.be.ok
    })

    const Constructor = Vue.extend(VCol)
    let vm = null

    afterEach(() => {
        if (vm) vm.$destroy()
    })

    it('可以设置span', () => {
        vm = new Constructor({
            propsData: {
                span: 4
            }
        }).$mount()
        expect(vm.$el.classList.contains('v-col-4')).to.equal(true)
    })

    it('可以设置offset', () => {
        vm = new Constructor({
            propsData: {
                offset: 4
            }
        }).$mount()
        expect(vm.$el.classList.contains('v-col-offset-4')).to.equal(true)
    })

    it('可以设置ipad', () => {
        vm = new Constructor({
            propsData: {
                ipad: {
                    span: 4,
                    offset: 4
                }
            }
        }).$mount()
        expect(vm.$el.classList.contains('v-col-ipad-4')).to.equal(true)
        expect(vm.$el.classList.contains('v-col-ipad-offset-4')).to.equal(true)
    })

    it('可以设置narrowPc', () => {
        vm = new Constructor({
            propsData: {
                narrowPc: {
                    span: 4,
                    offset: 4
                }
            }
        }).$mount()
        expect(vm.$el.classList.contains('v-col-narrow-pc-4')).to.equal(true)
        expect(vm.$el.classList.contains('v-col-narrow-pc-offset-4')).to.equal(true)
    })

    it('可以设置widePc', () => {
        vm = new Constructor({
            propsData: {
                widePc: {
                    span: 4,
                    offset: 4
                }
            }
        }).$mount()
        expect(vm.$el.classList.contains('v-col-wide-pc-4')).to.equal(true)
        expect(vm.$el.classList.contains('v-col-wide-pc-offset-4')).to.equal(true)
    })
})
