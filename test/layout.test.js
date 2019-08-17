import Vue from 'vue'
import VLayout from '../src/VLayout'
import VAside from '../src/VAside'
import VHeader from '../src/VHeader'

Vue.config.productionTip = false
Vue.config.devtools = false

const expect = chai.expect

describe('VLayout', () => {
    it('存在.', () => {
        expect(VLayout).to.be.ok
    })

    it('是否有Aside子组件', done => {
        Vue.component('v-layout', VLayout)
        Vue.component('v-aside', VAside)
        Vue.component('v-header', VHeader)
        const div = document.createElement('div')
        document.body.appendChild(div)
        div.innerHTML = `
            <v-layout>
                <v-aside></v-aside>
                <v-header></v-header>
            </v-layout>
        `
        const vm = new Vue({
            el: div
        })
        vm.$nextTick(() => {
            expect(vm.$el.querySelector('.v-layout-has-aside')).to.be.ok
            vm.$destroy()
            done()
        })
    })
})
