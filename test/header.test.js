import Vue from 'vue'
import VHeader from '../src/VHeader'

Vue.config.productionTip = false
Vue.config.devtools = false

const expect = chai.expect

describe('VHeader', () => {
    it('存在.', () => {
        expect(VHeader).to.be.ok
    })

    it('可以设置height', () => {
        const Constructor = Vue.extend(VHeader)
        const vm = new Constructor({
            propsData: {
                height: '100px'
            }
        }).$mount()
        expect(vm.$el.getAttribute('style')).to.equal('height: 100px;')
        vm.$destroy()
    })
})
