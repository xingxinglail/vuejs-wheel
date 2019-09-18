import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { createVue, destroyVM, wait } from '../util'

const expect = chai.expect
chai.use(sinonChai)

describe('Pagination', () => {
    let vm

    afterEach(() => {
        destroyVM(vm)
    })

    it('可以设置total 和 current', () => {
        vm = createVue({
            template: `
                <v-pagination :total="6" :current="2"></v-pagination>
            `
        }, true)
        expect(vm.$el.children[2].classList.contains('active')).to.true
        expect(vm.$el.querySelectorAll('.quick-jump').length).to.eq(0)
    })

    it('可以设置hideIfOnePage', async () => {
        vm = createVue({
            template: `
                <v-pagination :hide-if-one-page="hideIfOnePage" :total="1" :current="1"></v-pagination>
            `,
            data () {
                return {
                    hideIfOnePage: false
                }
            }
        }, true)
        expect(getComputedStyle(vm.$el).display).to.not.eq('none')
        vm.hideIfOnePage = true
        await wait()
        expect(getComputedStyle(vm.$el).display).to.eq('none')
    })

    it('可以点击切换页码', async () => {
        vm = createVue({
            template: `
                <v-pagination :total="100" :current.sync="current"></v-pagination>
            `,
            data () {
                return {
                    current: 1
                }
            }
        }, true)
        const prevAndNext = vm.$el.querySelectorAll('.icon')
        const prev = prevAndNext[0]
        const next = prevAndNext[1]
        const doublePrevAndDoubleNext = vm.$el.querySelectorAll('.quick-jump')
        const doublePrev = doublePrevAndDoubleNext[0]
        const doubleNext = doublePrevAndDoubleNext[1]
        prev.click()
        expect(vm.current).to.eq(1)
        expect(prev.classList.contains('disabled')).to.true
        next.click()
        expect(vm.current).to.eq(2)
        prev.click()
        expect(vm.current).to.eq(1)
        next.click()
        next.click()
        expect(vm.current).to.eq(3)
        await wait()
        expect(prev.classList.contains('disabled')).to.false
        doubleNext.click()
        doubleNext.click()
        expect(vm.current).to.eq(13)
        doublePrev.click()
        doublePrev.click()
        doublePrev.click()
        expect(vm.current).to.eq(1)
    })

    it('触发change事件', async () => {
        const cb = sinon.fake()
        vm = createVue({
            template: `
                <v-pagination :total="100" :current="current" @change="change"></v-pagination>
            `,
            data () {
                return {
                    current: 1
                }
            },
            methods: {
                change (e) {
                    cb(e)
                    this.current = e
                }
            }
        }, true)
        const doublePrevAndDoubleNext = vm.$el.querySelectorAll('.quick-jump')
        const doubleNext = doublePrevAndDoubleNext[1]
        doubleNext.click()
        expect(vm.current).to.eq(6)
        expect(cb).to.have.been.calledWith(6)
    })
})
