import Vue from 'vue'
import VFooter from '../src/VFooter'

Vue.config.productionTip = false
Vue.config.devtools = false

const expect = chai.expect

describe('VFooter', () => {
    it('存在.', () => {
        expect(VFooter).to.be.ok
    })

    it('可以设置height', () => {
        const Constructor = Vue.extend(VFooter)
        const vm = new Constructor({
            propsData: {
                height: '100px'
            }
        }).$mount()
        expect(vm.$el.getAttribute('style')).to.equal('height: 100px;')
        vm.$destroy()
    })
})
