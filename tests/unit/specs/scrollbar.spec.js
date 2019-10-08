import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { createVue, destroyVM, wait } from '../util'

const expect = chai.expect
chai.use(sinonChai)

describe('Scrollbar', () => {
    let vm

    beforeEach(() => {
        const style = document.createElement('style')
        style.innerHTML = `
            * { padding: 0; margin: 0; }
            .wrapper { width: 100px; }
            .view { max-height: 100px; }
            .content { height: 1000px; }
            .content2 { width: 1000px; height: 100px; }
            .content3 { width: 1000px; height: 1000px; }
        `
        document.getElementsByTagName('head').item(0).appendChild(style)
    })

    afterEach(() => {
        destroyVM(vm)
    })

    it('可以操作竖向滚动条', async () => {
        vm = createVue({
            template: `
                <v-scrollbar wrapper-class="wrapper" view-class="view" ref="scrollbar">
                    <div class="content"></div>
                </v-scrollbar>
            `
        }, true)
        await wait()
        const innerWrap = vm.$el.querySelector('.v-scrollbar-inner-wrapper')
        const bar = vm.$el.querySelector('.v-scrollbar-bar.vertical')
        const innerBar = bar.querySelector('.inner')
        expect(bar).is.exist
        expect(innerBar.style.height).to.eq('10%')
        const event = document.createEvent('MouseEvents')
        event.initMouseEvent(
            'mousedown',
            true,
            false,
            window,
            0,
            0,
            0,
            0,
            0)
        innerBar.dispatchEvent(event)
        event.initMouseEvent(
            'mousemove',
            true,
            false,
            window,
            0,
            0,
            0,
            0,
            80)
        document.dispatchEvent(event)
        const mouseupEvent = new Event('mouseup')
        document.dispatchEvent(mouseupEvent)
        expect(innerWrap.scrollTop).to.eq(800)
        await wait()
        event.initMouseEvent(
            'mousedown',
            true,
            false,
            window,
            0,
            0,
            0,
            0,
            80)
        innerBar.dispatchEvent(event)
        event.initMouseEvent(
            'mousemove',
            true,
            false,
            window,
            0,
            0,
            0,
            0,
            30)
        document.dispatchEvent(event)
        document.dispatchEvent(mouseupEvent)
        expect(innerWrap.scrollTop).to.eq(300)
        await wait()
        event.initMouseEvent(
            'click',
            true,
            false,
            window,
            0,
            0,
            0,
            0,
            55)
        bar.dispatchEvent(event)
        await wait()
        expect(innerWrap.scrollTop).to.eq(550)
    })

    it('可以操作横向滚动条', async () => {
        vm = createVue({
            template: `
                <v-scrollbar wrapper-class="wrapper" view-class="view" ref="scrollbar">
                    <div class="content2"></div>
                </v-scrollbar>
            `
        }, true)
        await wait()
        const innerWrap = vm.$el.querySelector('.v-scrollbar-inner-wrapper')
        const bar = vm.$el.querySelector('.v-scrollbar-bar.horizontal')
        const innerBar = bar.querySelector('.inner')
        expect(bar).is.exist
        expect(innerBar.style.width).to.eq('10%')
        const event = document.createEvent('MouseEvents')
        event.initMouseEvent(
            'mousedown',
            true,
            false,
            window,
            0,
            0,
            0,
            0,
            0)
        innerBar.dispatchEvent(event)
        event.initMouseEvent(
            'mousemove',
            true,
            false,
            window,
            0,
            0,
            0,
            80,
            0)
        document.dispatchEvent(event)
        const mouseupEvent = new Event('mouseup')
        document.dispatchEvent(mouseupEvent)
        expect(innerWrap.scrollLeft).to.eq(800)
        await wait()
        event.initMouseEvent(
            'mousedown',
            true,
            false,
            window,
            0,
            0,
            0,
            80,
            0)
        innerBar.dispatchEvent(event)
        event.initMouseEvent(
            'mousemove',
            true,
            false,
            window,
            0,
            0,
            0,
            30,
            0)
        document.dispatchEvent(event)
        document.dispatchEvent(mouseupEvent)
        expect(innerWrap.scrollLeft).to.eq(300)
        await wait()
        event.initMouseEvent(
            'click',
            true,
            false,
            window,
            0,
            0,
            0,
            55,
            0)
        bar.dispatchEvent(event)
        await wait()
        expect(innerWrap.scrollLeft).to.eq(550)
    })

    it('可以滚动容器', async () => {
        vm = createVue({
            template: `
                <v-scrollbar wrapper-class="wrapper" view-class="view" ref="scrollbar">
                    <div class="content3"></div>
                </v-scrollbar>
            `
        }, true)
        await wait()
        const innerWrap = vm.$el.querySelector('.v-scrollbar-inner-wrapper')
        const verticalBar = vm.$el.querySelector('.v-scrollbar-bar.vertical')
        const verticalInnerBar = verticalBar.querySelector('.inner')
        const horizontalBar = vm.$el.querySelector('.v-scrollbar-bar.horizontal')
        const horizontalInnerBar = horizontalBar.querySelector('.inner')
        expect(verticalInnerBar).is.exist
        expect(horizontalInnerBar).is.exist
        innerWrap.scrollTop = 100
        await wait()
        expect(verticalInnerBar.style.transform).to.eq('translate3d(0px, 100%, 0px)')
        innerWrap.scrollLeft = 60
        await wait()
        expect(horizontalInnerBar.style.transform).to.eq('translate3d(60%, 0px, 0px)')
    })

    it('可以调用 scrollTo 滚动到指定位置', async () => {
        vm = createVue({
            template: `
                <v-scrollbar wrapper-class="wrapper" view-class="view" ref="scrollbar">
                    <div class="content3"></div>
                </v-scrollbar>
            `
        }, true)
        await wait()
        const scrollbar = vm.$refs.scrollbar
        const verticalBar = vm.$el.querySelector('.v-scrollbar-bar.vertical')
        const verticalInnerBar = verticalBar.querySelector('.inner')
        const horizontalBar = vm.$el.querySelector('.v-scrollbar-bar.horizontal')
        const horizontalInnerBar = horizontalBar.querySelector('.inner')
        scrollbar.scrollTo(100, 200)
        await wait()
        expect(horizontalInnerBar.style.transform).to.eq('translate3d(100%, 0px, 0px)')
        expect(verticalInnerBar.style.transform).to.eq('translate3d(0px, 200%, 0px)')
        scrollbar.scrollTo(9999, 9999)
        await wait()
        expect(horizontalInnerBar.style.transform).to.eq('translate3d(900%, 0px, 0px)')
        expect(verticalInnerBar.style.transform).to.eq('translate3d(0px, 900%, 0px)')
        scrollbar.scrollTo(undefined, 200)
        await wait()
        expect(horizontalInnerBar.style.transform).to.eq('translate3d(900%, 0px, 0px)')
        expect(verticalInnerBar.style.transform).to.eq('translate3d(0px, 200%, 0px)')
    })

    it('没有点击滚动条时 mousemove 不会触发移动操作', async () => {
        vm = createVue({
            template: `
                <v-scrollbar wrapper-class="wrapper" view-class="view">
                    <div class="content"></div>
                </v-scrollbar>
            `
        }, true)
        await wait()
        const innerWrap = vm.$el.querySelector('.v-scrollbar-inner-wrapper')
        const event = document.createEvent('MouseEvents')
        event.initMouseEvent(
            'mousemove',
            true,
            false,
            window,
            0,
            0,
            0,
            0,
            80)
        document.dispatchEvent(event)
        expect(innerWrap.scrollTop).to.eq(0)
    })
})
