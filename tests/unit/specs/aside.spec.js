import chai from 'chai'
import { createVue, destroyVM } from '../util'

const expect = chai.expect

describe('Aside', () => {
    let vm

    afterEach(() => {
        destroyVM(vm)
    })

    it('可以设置width', () => {
        vm = createVue({
            template: `
                <v-aside width="100px"></v-aside>
            `
        })
        expect(vm.$el.getAttribute('style')).to.equal('width: 100px;')
    })
})
