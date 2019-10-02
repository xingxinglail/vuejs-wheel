import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { createVue, destroyVM, wait } from '../util'

const expect = chai.expect
chai.use(sinonChai)

describe('Sticky', () => {
    let vm

    afterEach(() => {
        window.scrollTo(0, 0)
        destroyVM(vm)
    })

    it('可以固定在顶部', async () => {
        vm = createVue({
            template: `
                <div style="height: 2000px;">
                     <div style="position: absolute;top: 200px;left: 50px;">
                        <v-sticky>
                            <h1 class="title" style="width: 200px;height: 50px;">hello world</h1>
                        </v-sticky>
                    </div>
                </div>
            `
        }, true)
        await wait()
        const wrapper = vm.$el.querySelector('.v-sticky')
        const inner = vm.$el.querySelector('.v-sticky-inner')
        const moveTop = wrapper.getBoundingClientRect().top
        window.scrollTo(0, moveTop)
        await wait()
        expect(getComputedStyle(wrapper).height).to.eq('50px')
        expect(getComputedStyle(inner).width).to.eq('200px')
        expect(getComputedStyle(inner).left).to.eq('50px')
        expect(getComputedStyle(inner).top).to.eq('0px')
        expect(inner.classList.contains('sticky')).to.true
        window.scrollTo(0, 0)
        await wait()
        expect(getComputedStyle(inner).width).to.eq('200px')
        expect(getComputedStyle(inner).left).to.eq('auto')
        expect(inner.classList.contains('sticky')).to.false
    })

    it('可以设置distance', async () => {
        vm = createVue({
            template: `
                <div style="height: 2000px;">
                     <div style="position: absolute;top: 200px;left: 50px;">
                        <v-sticky :distance="55">
                            <h1 class="title" style="width: 200px;height: 50px;">hello world</h1>
                        </v-sticky>
                    </div>
                </div>
            `
        }, true)
        await wait()
        const wrapper = vm.$el.querySelector('.v-sticky')
        const inner = vm.$el.querySelector('.v-sticky-inner')
        const moveTop = wrapper.getBoundingClientRect().top
        window.scrollTo(0, moveTop)
        await wait()
        expect(getComputedStyle(inner).top).to.eq('55px')
        window.scrollTo(0, 0)
        await wait()
        expect(getComputedStyle(inner).top).to.eq('auto')
    })

    it('可以指定容器', async () => {
        vm = createVue({
            template: `
                <div style="height: 3000px;">
                     <br />
                     <br />
                     <br />
                     <br />
                     <div style="height: 600px;" ref="container">
                        <v-sticky :container="container">
                            <h1 class="title" style="width: 200px;height: 50px;">hello world</h1>
                        </v-sticky>
                    </div>
                </div>
            `,
            data: {
                container: null
            },
            mounted () {
                this.container = this.$refs.container
            }
        }, true)
        await wait()
        const inner = vm.$el.querySelector('.v-sticky-inner')
        const { top, height } = vm.container.getBoundingClientRect()
        window.scrollTo(0, top)
        await wait()
        expect(inner.classList.contains('sticky')).to.true
        window.scrollTo(0, top + height)
        await wait()
        expect(inner.classList.contains('sticky')).to.false
        window.scrollTo(0, top + height - 10)
        await wait()
        expect(inner.classList.contains('sticky')).to.true
    })

    it('可以触发change事件', async () => {
        const callback = sinon.fake();
        vm = createVue({
            template: `
                <div style="height: 2000px;">
                     <div style="position: absolute;top: 200px;left: 50px;">
                        <v-sticky @change="change">
                            <h1 class="title" style="width: 200px;height: 50px;">hello world</h1>
                        </v-sticky>
                    </div>
                </div>
            `,
            methods: {
                change (v) {
                    callback(v)
                }
            }
        }, true)
        await wait()
        const wrapper = vm.$el.querySelector('.v-sticky')
        const inner = vm.$el.querySelector('.v-sticky-inner')
        const moveTop = wrapper.getBoundingClientRect().top
        window.scrollTo(0, moveTop)
        await wait()
        expect(callback).to.have.been.calledWith(true)
        window.scrollTo(0, 0)
        await wait()
        expect(callback).to.have.been.calledWith(false)
        expect(callback.callCount).to.eq(2)
    })
})
