import chai from 'chai'
import { createVue, destroyVM } from '../util'

const expect = chai.expect

describe('Header', () => {
    let vm

    afterEach(() => {
        destroyVM(vm)
    })

    it('可以设置height', () => {
        vm = createVue({
            template: `
                <v-header height="100px"></v-header>
            `
        })
        expect(vm.$el.getAttribute('style')).to.equal('height: 100px;')
    })
})
