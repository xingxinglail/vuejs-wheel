import Vue from 'vue'
import VInput from '../src/VInput'

Vue.config.productionTip = false
Vue.config.devtools = false

const expect = chai.expect

describe('VInput', () => {

    it('存在', () => {
        expect(VInput).to.exist
    })

    const Constructor = Vue.extend(VInput)
    let vm = null

    describe('props', () => {
        afterEach(() => {
            vm.$destroy()
        })

        it('接收value', () => {
            vm = new Constructor({
                propsData: {
                    value: 'hi'
                }
            }).$mount()
            const el = vm.$el.querySelector('input')
            expect(el.value).to.equal('hi')
        })

        it('接收disabled', () => {
            vm = new Constructor({
                propsData: {
                    disabled: true
                }
            }).$mount()
            const el = vm.$el.querySelector('input')
            expect(el.disabled).to.equal(true)
        })

        it('接收readonly', () => {
            vm = new Constructor({
                propsData: {
                    readonly: true
                }
            }).$mount()
            const el = vm.$el.querySelector('input')
            expect(el.readOnly).to.equal(true)
        })

        it('接收error', () => {
            vm = new Constructor({
                propsData: {
                    error: '出错了！'
                }
            }).$mount()
            const el = vm.$el.querySelector('input')
            const useEl = vm.$el.querySelector('use')
            const spanEl = vm.$el.querySelector('span')
            expect(useEl.getAttribute('xlink:href')).to.equal('#i-info-circle')
            expect(spanEl.innerText).to.equal('出错了！')
        })
    })

    describe('事件', () => {
        it('input/change/focus/blur', () => {
            ['input', 'change', 'focus', 'blur'].forEach(eventName => {
                vm = new Constructor().$mount()
                const callback = sinon.fake();
                vm.$on(eventName, callback)
                const el = vm.$el.querySelector('input')
                const event = new Event(eventName)
                // 突破Event对象只读属性限制
                Object.defineProperty(event, 'target', { writable: false, value: { value: 'hi' } });
                el.dispatchEvent(event)
                expect(callback).to.have.been.calledWith('hi')
            })
            vm.$destroy()
        })
    })
})
