import Vue from 'vue'
import VAside from '../src/VAside'

Vue.config.productionTip = false
Vue.config.devtools = false

const expect = chai.expect

describe('VAside', () => {
    it('存在.', () => {
        expect(VAside).to.be.ok
    })

    it('可以设置width', () => {
        const Constructor = Vue.extend(VAside)
        const vm = new Constructor({
            propsData: {
                width: '100px'
            }
        }).$mount()
        expect(vm.$el.getAttribute('style')).to.equal('width: 100px;')
        vm.$destroy()
    })
})
