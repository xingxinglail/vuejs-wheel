import chai from 'chai'
import { createVue, destroyVM } from '../util'

const expect = chai.expect

describe('Footer', () => {
    let vm

    afterEach(() => {
        destroyVM(vm)
    })

    it('可以设置height', () => {
        vm = createVue({
            template: `
                <v-footer height="100px"></v-footer>
            `
        })
        expect(vm.$el.getAttribute('style')).to.equal('height: 100px;')
    })
})
