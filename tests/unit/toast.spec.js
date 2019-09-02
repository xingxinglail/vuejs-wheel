import Vue from 'vue/dist/vue.min'
import { expect } from 'chai'
import sinon from 'sinon'
import { mount } from '@vue/test-utils'
import Toast from '../../src/plugins/toast/src/Main'
import ToastPlugin from '../../src/plugins/toast'

Vue.use(ToastPlugin)

describe('Toast', () => {

    describe('Component', () => {

        it('存在.', () => {
            expect(Toast).to.be.ok
        })

        it('可以设置duration', done => {
            const wrapper = mount(Toast, {
                attachToDocument: true,
                propsData: {
                    duration: 400
                }
            })
            expect(wrapper.props('duration')).to.eq(400)
            expect(document.body.querySelector('.v-toast')).to.be.exist
            wrapper.vm.$on('close', () => {
                expect(document.body.querySelector('.v-toast')).to.be.not.exist
                done()
                wrapper.destroy()
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
            const wrapper = mount(Toast, {
                propsData: {
                    closeBtnText: '关闭'
                }
            })
            const clickHandler = sinon.stub()
            expect(wrapper.classes('v-toast-has-close-btn')).to.eq(true)
            wrapper.vm.$on('close', clickHandler)
            const btn = wrapper.find('.close-btn')
            btn.trigger('click')
            setTimeout(() => {
                expect(clickHandler.called).to.eq(true)
                done()
            }, 400)
        })

        it('可以设置position', () => {
            let wrapper = mount(Toast, {
                propsData: {
                    position: 'top'
                }
            })
            expect(wrapper.classes('v-toast-position-top')).to.eq(true)
            wrapper = mount(Toast, {
                propsData: {
                    position: 'middle'
                }
            })
            expect(wrapper.classes('v-toast-position-middle')).to.eq(true)
            wrapper = mount(Toast, {
                propsData: {
                    position: 'bottom'
                }
            })
            expect(wrapper.classes('v-toast-position-bottom')).to.eq(true)
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
            const callback = sinon.stub()
            vm.$toast({
                className: 'test-close',
                closeBtnText: '关闭',
                onClose: callback
            })
            const toast = document.body.querySelector('.test-close')
            expect(toast.classList.contains('v-toast-has-close-btn')).to.equal(true)
            const btn = toast.querySelector('.close-btn')
            expect(btn.children[0].innerText).to.equal('关闭')
            btn.click()
            setTimeout(() => {
                expect(callback.called).to.eq(true)
                done()
            }, 400)
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
