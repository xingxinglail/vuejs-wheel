import chai from 'chai'
import { createVue, destroyVM } from '../util'

const expect = chai.expect

describe('Layout', () => {
    let vm

    afterEach(() => {
        destroyVM(vm)
    })

    it('是否有Aside子组件', done => {
        vm = createVue({
            template: `
                <v-layout>
                    <v-aside></v-aside>
                    <v-header></v-header>
                </v-layout>
            `
        }, true)
        vm.$nextTick(() => {
            expect(vm.$el.classList.contains('v-layout-has-aside')).to.eq(true)
            done()
        })
    })
})
