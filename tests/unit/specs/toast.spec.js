import Vue from 'vue'
import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { createVue, destroyVM } from '../util'

const expect = chai.expect
chai.use(sinonChai)

describe('Toast', () => {
    let vm

    afterEach(() => {
        destroyVM(vm)
    })

    describe('Component', () => {

        it('可以设置duration', done => {
            vm = createVue({
                template: `
                    <v-toast :duration="400" @close="onClose"></v-toast>
                `,
                methods: {
                    onClose () {
                        const toast = document.body.querySelector('.v-toast')
                        expect(toast).to.be.not.exist
                        done()
                    }
                }
            }, true)
        })

        it('可以设置enableHTML', () => {
            vm = createVue({
                template: `
                    <v-toast enable-html><div id="hello">hello</div></v-toast>
                `
            })
            expect(vm.$el.querySelector('#hello')).to.be.exist
        })

        it('可以设置closeBtnText', done => {
            const callback = sinon.fake();
            vm = createVue({
                template: `
                    <v-toast close-btn-text="关闭" @close="onClose"></v-toast>
                `,
                methods: {
                    onClose () {
                        callback()
                        expect(callback).to.have.been.called
                        done()
                    }
                }
            }, true)
            expect(vm.$el.classList.contains('v-toast-has-close-btn')).to.equal(true)
            const btn = vm.$el.querySelector('.close-btn')
            expect(btn).to.be.exist
            btn.click()
        })

        it('可以设置position', () => {
            vm = createVue({
                template: `
                    <v-toast position="top">hello</v-toast>
                `
            })
            expect(vm.$el.classList.contains('v-toast-position-top')).to.equal(true)
            vm = createVue({
                template: `
                    <v-toast position="middle">hello</v-toast>
                `
            })
            expect(vm.$el.classList.contains('v-toast-position-middle')).to.equal(true)
            vm = createVue({
                template: `
                    <v-toast position="bottom">hello</v-toast>
                `
            })
            expect(vm.$el.classList.contains('v-toast-position-bottom')).to.equal(true)
        })
    })
    describe('Plugin', () => {

        beforeEach(() => {
            vm = createVue(null)
        })

        it('可以设置duration', done => {
            vm.$toast({
                duration: 1000,
                onClose() {
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
            expect(document.body.querySelector('#hello')).to.be.exist
        })

        it('可以设置closeBtnText', done => {
            const callback = sinon.fake();
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
                expect(callback).to.have.been.called
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
