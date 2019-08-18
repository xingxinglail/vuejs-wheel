import Vue from 'vue'
import Toast from '../src/plugins/toast/src/Main'
import ToastPlugin from '../src/plugins/toast'

Vue.config.productionTip = false
Vue.config.devtools = false

Vue.use(ToastPlugin)

const expect = chai.expect

describe('Toast', () => {

    describe('Component', () => {

        it('存在.', () => {
            expect(Toast).to.be.ok
        })

        it('可以设置duration', done => {
            const Constructor = Vue.extend(Toast)
            const vm = new Constructor({
                propsData: {
                    duration: 400
                }
            }).$mount()
            vm.$on('close', () => {
                const toast = document.body.querySelector('.v-toast')
                expect(toast).to.be.not.exist
                done()
            })
        })

        it('可以设置enableHTML', () => {
            const Constructor = Vue.extend(Toast)
            const vm = new Constructor({
                propsData: {
                    enableHTML: true
                }
            })
            vm.$slots.default = '<div id="hello">hello</div>'
            vm.$mount()
            expect(vm.$el.querySelector('#hello')).to.be.exist
        })

        it('可以设置closeBtnText', done => {
            const Constructor = Vue.extend(Toast)
            const callback = sinon.fake();
            const vm = new Constructor({
                propsData: {
                    closeBtnText: '关闭'
                }
            }).$mount()
            expect(vm.$el.classList.contains('v-toast-has-close-btn')).to.equal(true)
            const btn = vm.$el.querySelector('.close-btn')
            expect(btn).to.be.exist
            vm.$on('close', () => {
                callback()
                expect(callback).to.have.been.called
                done()
            })
            btn.click()
        })

        it('可以设置position', () => {
            const Constructor = Vue.extend(Toast)
            let vm = new Constructor({
                propsData: {
                    position: 'top'
                }
            }).$mount()
            expect(vm.$el.classList.contains('v-toast-position-top')).to.equal(true)
            vm = new Constructor({
                propsData: {
                    position: 'middle'
                }
            }).$mount()
            expect(vm.$el.classList.contains('v-toast-position-middle')).to.equal(true)
            vm = new Constructor({
                propsData: {
                    position: 'bottom'
                }
            }).$mount()
            expect(vm.$el.classList.contains('v-toast-position-bottom')).to.equal(true)
        })
    })

    describe('Plugin', () => {
        let div = null
        let vm = null

        beforeEach(() => {
            div = document.createElement('div')
            vm = new Vue().$mount(div)
        })

        afterEach(() => {
            vm.$destroy()
        })

        it('存在.', () => {
            expect(ToastPlugin).to.be.ok
            expect(vm.$toast).to.be.exist
        })

        it('可以设置duration', done => {
            vm.$toast({
                duration: 1000,
                onClose () {
                    const toast = document.body.querySelector('.v-toast')
                    expect(toast).to.be.not.exist
                    done()
                }
            })
        })

        it('可以设置enableHTML', () => {
            vm.$toast({
                message: '<div id="hello">hello</div>',
                enableHTML: true,
                duration: 100
            })
            expect(document.body.querySelector('.v-toast')).to.be.exist
        })

        it('可以设置closeBtnText', done => {
            const callback = sinon.fake();
            vm.$toast({
                closeBtnText: '关闭',
                onClose: callback
            })

            setTimeout(() => {
                const toast = document.body.querySelector('.v-toast')
                expect(toast.classList.contains('v-toast-has-close-btn')).to.equal(true)
                const btn = toast.querySelector('.close-btn')
                expect(btn.children[0].innerText).to.equal('关闭')
                btn.click()
                setTimeout(() => {
                    expect(callback).to.have.been.called
                    done()
                }, 400)
            }, 600)
        })

        it('可以设置position', (done) => {
            vm.$toast({
                position: 'middle'
            })

            setTimeout(() => {
                const toast = document.body.querySelector('.v-toast')
                expect(toast.classList.contains('v-toast-position-middle')).to.equal(true)
                done()
            }, 1000)
        })
    })
})
