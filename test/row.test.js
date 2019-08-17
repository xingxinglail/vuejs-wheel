import Vue from 'vue'
import VRow from '../src/VRow'
import VCol from '../src/VCol'

Vue.config.productionTip = false
Vue.config.devtools = false

const expect = chai.expect

describe('VRow', () => {
    it('存在.', () => {
        expect(VRow).to.be.ok
    })

    it('可以设置gutter.', done => {
        Vue.component('v-row', VRow)
        Vue.component('v-col', VCol)
        const div = document.createElement('div')
        document.body.appendChild(div)
        div.innerHTML = `
            <v-row gutter="20">
                <v-col></v-col>
                <v-col></v-col>
            </v-row>
        `
        const vm = new Vue({
            el: div
        })
        vm.$nextTick(() => {
            const row = vm.$el.querySelector('.v-row')
            expect(getComputedStyle(row).marginLeft).to.equal('-10px')
            expect(getComputedStyle(row).marginRight).to.equal('-10px')
            const col = row.querySelector('.v-col')
            expect(getComputedStyle(col).paddingLeft).to.equal('10px')
            expect(getComputedStyle(col).paddingRight).to.equal('10px')
            vm.$destroy()
            done()
        })
    })

    it('可以设置align', () => {
        const Constructor = Vue.extend(VRow)
        const vm = new Constructor({
            propsData: {
                align: 'center'
            }
        }).$mount()
        expect(vm.$el.classList.contains('v-row-align-center')).to.equal(true)
        vm.$destroy()
    })
})
