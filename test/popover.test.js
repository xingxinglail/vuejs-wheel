import Vue from 'vue'
import VPopover from '../src/VPopover'

Vue.config.productionTip = false
Vue.config.devtools = false

const expect = chai.expect

describe('VPopover', () => {

    it('存在.', () => {
        expect(VPopover).to.be.exist
    })

    it('可设置placement', done => {
        Vue.component('v-popover', VPopover)
        const div = document.createElement('div')
        document.body.appendChild(div)
        div.innerHTML = `
            <v-popover placement="left-end" ref="popover">
                <template slot="content">
                    <p>水电是电饭费</p>
                </template>
                <button>设置</button>
            </v-popover>
        `
        const vm = new Vue({
            el: div
        })
        setTimeout(() => {
            const { contentWrapper } = vm.$refs.popover.$refs
            expect(contentWrapper.classList.contains('v-popover-placement-left-end')).to.be.equal(true)
            vm.$destroy()
            done()
        }, 100)
    })

    it('点击trigger显示隐藏', done => {
        Vue.component('v-popover', VPopover)
        const div = document.createElement('div')
        document.body.appendChild(div)
        div.innerHTML = `
            <v-popover placement="left-end" ref="popover">
                <template slot="content">
                    <p>水电是电饭费</p>
                </template>
                <button>设置</button>
            </v-popover>
        `
        const vm = new Vue({
            el: div
        })
        setTimeout(() => {
            const popover = vm.$refs.popover
            const { contentWrapper } = popover.$refs
            popover.$el.click()
            expect(popover.visible).to.be.equal(true)
            setTimeout(() => {
                expect(getComputedStyle(contentWrapper).display).to.be.equal('block')
                popover.$el.click()
                expect(popover.visible).to.be.equal(false)
                setTimeout(() => {
                    expect(getComputedStyle(contentWrapper).display).to.be.equal('none')
                    vm.$destroy()
                    done()
                }, 100)
            }, 100)
        }, 100)
    })

    it('点击document隐藏', done => {
        Vue.component('v-popover', VPopover)
        const div = document.createElement('div')
        document.body.appendChild(div)
        div.innerHTML = `
            <v-popover placement="left-end" ref="popover">
                <template slot="content">
                    <p>水电是电饭费</p>
                </template>
                <button>设置</button>
            </v-popover>
        `
        const vm = new Vue({
            el: div
        })
        setTimeout(() => {
            const popover = vm.$refs.popover
            const { contentWrapper } = popover.$refs
            popover.$el.click()
            setTimeout(() => {
                document.body.click()
                setTimeout(() => {
                    expect(popover.visible).to.be.equal(false)
                    expect(getComputedStyle(contentWrapper).display).to.be.equal('none')
                    vm.$destroy()
                    done()
                }, 100)
            }, 100)
        }, 100)
    })

    it('点击content不隐藏', done => {
        Vue.component('v-popover', VPopover)
        const div = document.createElement('div')
        document.body.appendChild(div)
        div.innerHTML = `
            <v-popover placement="left-end" ref="popover">
                <template slot="content">
                    <p>水电是电饭费</p>
                </template>
                <button>设置</button>
            </v-popover>
        `
        const vm = new Vue({
            el: div
        })
        setTimeout(() => {
            const popover = vm.$refs.popover
            const { contentWrapper } = popover.$refs
            popover.$el.click()
            expect(popover.visible).to.be.equal(true)
            setTimeout(() => {
                expect(getComputedStyle(contentWrapper).display).to.be.equal('block')
                contentWrapper.click()
                setTimeout(() => {
                    expect(popover.visible).to.be.equal(true)
                    expect(getComputedStyle(contentWrapper).display).to.be.equal('block')
                    vm.$destroy()
                    done()
                }, 100)
            }, 100)
        }, 100)
    })

    it('可设置trigger hover', done => {
        Vue.component('v-popover', VPopover)
        const div = document.createElement('div')
        document.body.appendChild(div)
        div.innerHTML = `
            <v-popover trigger="hover" placement="left-end" ref="popover">
                <template slot="content">
                    <p>水电是电饭费</p>
                </template>
                <button>设置</button>
            </v-popover>
        `
        const vm = new Vue({
            el: div
        })
        setTimeout(() => {
            const popover = vm.$refs.popover
            const { contentWrapper } = popover.$refs
            const mouseenterEvent = new Event('mouseenter')
            const mouseleaveEvent = new Event('mouseleave')
            popover.$el.dispatchEvent(mouseenterEvent) // 鼠标移入popover
            expect(popover.visible).to.be.equal(true)
            setTimeout(() => {
                expect(getComputedStyle(contentWrapper).display).to.be.equal('block')
                popover.$el.dispatchEvent(mouseleaveEvent) // 鼠标移出popover
                contentWrapper.dispatchEvent(mouseenterEvent) // 鼠标移入contentWrapper
                expect(popover.visible).to.be.equal(true)
                contentWrapper.dispatchEvent(mouseleaveEvent) // 鼠标移出contentWrapper
                setTimeout(() => {
                    expect(getComputedStyle(contentWrapper).display).to.be.equal('none')
                    expect(popover.visible).to.be.equal(false)
                    popover.$el.dispatchEvent(mouseenterEvent) // 鼠标移入popover
                    expect(popover.visible).to.be.equal(true)
                    popover.$el.dispatchEvent(mouseleaveEvent) // 鼠标移出popover
                    setTimeout(() => {
                        expect(popover.visible).to.be.equal(false)
                        expect(getComputedStyle(contentWrapper).display).to.be.equal('none')
                        vm.$destroy()
                        done()
                    }, 210)
                }, 210)
            }, 100)
        }, 100)
    })

    it('可设置v-model', done => {
        Vue.component('v-popover', VPopover)
        const div = document.createElement('div')
        document.body.appendChild(div)
        div.innerHTML = `
            <v-popover v-model="visible" placement="left-end" ref="popover">
                <template slot="content">
                    <p>水电是电饭费</p>
                </template>
                <button @click="visible = false">设置</button>
            </v-popover>
        `
        const vm = new Vue({
            el: div,
            data: {
                visible: true
            }
        })
        setTimeout(() => {
            const popover = vm.$refs.popover
            const { contentWrapper } = popover.$refs
            expect(getComputedStyle(contentWrapper).display).to.be.equal('block')
            expect(popover.visible).to.be.equal(true)
            popover.$el.querySelector('button').click()
            expect(popover.visible).to.be.equal(false)
            expect(vm.visible).to.be.equal(false)
            vm.$nextTick(() => {
                expect(getComputedStyle(contentWrapper).display).to.be.equal('none')
                vm.visible = true
                setTimeout(() => {
                    expect(popover.visible).to.be.equal(true)
                    expect(getComputedStyle(contentWrapper).display).to.be.equal('block')
                    vm.$destroy()
                    done()
                }, 100)
            })
        }, 100)
    })

    it('派发show事件', done => {
        Vue.component('v-popover', VPopover)
        const div = document.createElement('div')
        document.body.appendChild(div)
        div.innerHTML = `
            <v-popover placement="left-end" ref="popover" @show="show">
                <template slot="content">
                    <p>水电是电饭费</p>
                </template>
                <button>设置</button>
            </v-popover>
        `
        const callback = sinon.fake();
        const vm = new Vue({
            el: div,
            methods: {
                show () {
                    callback()
                }
            }
        })
        setTimeout(() => {
            const popover = vm.$refs.popover
            popover.$el.click()
            setTimeout(() => {
                expect(callback).to.have.been.called
                vm.$destroy()
                done()
            }, 40)
        }, 100)
    })

    it('派发hide事件', done => {
        Vue.component('v-popover', VPopover)
        const div = document.createElement('div')
        document.body.appendChild(div)
        div.innerHTML = `
            <v-popover placement="left-end" ref="popover" @hide="hide">
                <template slot="content">
                    <p>水电是电饭费</p>
                </template>
                <button>设置</button>
            </v-popover>
        `
        const callback = sinon.fake();
        const vm = new Vue({
            el: div,
            methods: {
                hide () {
                    callback()
                }
            }
        })
        setTimeout(() => {
            const popover = vm.$refs.popover
            popover.$el.click()
            setTimeout(() => {
                document.body.click()
                setTimeout(() => {
                    expect(callback).to.have.been.called
                    vm.$destroy()
                    done()
                }, 40)
            }, 100)
        }, 100)
    })
})
