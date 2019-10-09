import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { createVue, destroyVM, wait } from '../util'
import Menu from '../../../src/menu/VMenu'

const expect = chai.expect
chai.use(sinonChai)

describe('Menu', () => {
    let vm

    afterEach(() => {
        destroyVM(vm)
    })

    it('horizontal模式', () => {
        vm = createVue({
            template: `
                <v-menu mode="horizontal">
                    <v-menu-item name="/home">首页</v-menu-item>
                    <v-menu-item name="/go">Go</v-menu-item>
                    <v-menu-item name="/about">关于我</v-menu-item>
                </v-menu>
            `
        })
        expect(vm.$el.classList.contains('v-menu-horizontal')).to.be.true
    })

    it('vertical模式', () => {
        vm = createVue({
            template: `
                <v-menu>
                    <v-menu-item name="/home">首页</v-menu-item>
                    <v-menu-item name="/go">Go</v-menu-item>
                    <v-menu-item name="/about">关于我</v-menu-item>
                </v-menu>
            `
        })
        expect(vm.$el.classList.contains('v-menu-vertical')).to.be.true
    })

    it('可以设置defaultActive', async () => {
        vm = createVue({
            template: `
                <v-menu :default-active="defaultActive">
                    <v-menu-item name="/home">首页</v-menu-item>
                    <v-menu-item name="/go">Go</v-menu-item>
                    <v-menu-item name="/about">关于我</v-menu-item>
                </v-menu>
            `,
            data: {
                defaultActive: '/go'
            }
        })
        await wait()
        expect(vm.$el.children[1].classList.contains('v-menu-item-active')).to.be.true
        vm.defaultActive = '/about'
        await wait()
        expect(vm.$el.children[1].classList.contains('v-menu-item-active')).to.be.false
        expect(vm.$el.children[2].classList.contains('v-menu-item-active')).to.be.true
    })

    it('可以通过click展开子菜单，vertical 模式', async () => {
        vm = createVue({
            template: `
                <v-menu menu-trigger="click">
                    <v-menu-item name="/home">首页</v-menu-item>
                    <v-sub-menu name="/programming-language" :show-timeout="50">
                        <template v-slot:title>编程语言</template>
                        <v-menu-item name="/java">Java</v-menu-item>
                        <v-menu-item name="/javascript">Javascript</v-menu-item>
                        <v-menu-item name="/go">Go</v-menu-item>
                        <v-sub-menu name="/framework" :show-timeout="50">
                            <template v-slot:title>框架</template>
                            <v-menu-item name="/jquery">jQuery</v-menu-item>
                            <v-menu-item name="/express">express</v-menu-item>
                            <v-menu-item name="/vue">vue</v-menu-item>
                        </v-sub-menu>
                    </v-sub-menu>
                    <v-menu-item name="/about">关于我</v-menu-item>
                </v-menu>
            `
        }, true)
        const titleDom = vm.$el.querySelector('.v-sub-menu').querySelector('.v-sub-menu-title')
        titleDom.click()
        await wait(100)
        expect(getComputedStyle(vm.$el.querySelector('.v-sub-menu').querySelector('.v-sub-menu-popover')).display).to.eq('block')
        const titleDom2 = vm.$el.querySelector('.v-sub-menu').querySelector('.v-sub-menu').querySelector('.v-sub-menu-title')
        titleDom2.click()
        await wait(100)
        expect(getComputedStyle(vm.$el.querySelector('.v-sub-menu').querySelector('.v-sub-menu-popover').querySelector('.v-sub-menu').querySelector('.v-sub-menu-popover')).display).to.eq('block')
        await wait(100)
        document.body.click()
        await wait(400)
        expect(getComputedStyle(vm.$el.querySelector('.v-sub-menu').querySelector('.v-sub-menu-popover')).display).to.eq('block')
        expect(getComputedStyle(vm.$el.querySelector('.v-sub-menu').querySelector('.v-sub-menu-popover').querySelector('.v-sub-menu').querySelector('.v-sub-menu-popover')).display).to.eq('block')
    })

    it('可以通过click展开子菜单', async () => {
        vm = createVue({
            template: `
                <v-menu mode="horizontal" menu-trigger="click">
                    <v-menu-item name="/home">首页</v-menu-item>
                    <v-sub-menu name="/programming-language" :show-timeout="50">
                        <template v-slot:title>编程语言</template>
                        <v-menu-item name="/java">Java</v-menu-item>
                        <v-menu-item name="/javascript">Javascript</v-menu-item>
                        <v-menu-item name="/go">Go</v-menu-item>
                        <v-sub-menu name="/framework" :show-timeout="50">
                            <template v-slot:title>框架</template>
                            <v-menu-item name="/jquery">jQuery</v-menu-item>
                            <v-menu-item name="/express">express</v-menu-item>
                            <v-menu-item name="/vue">vue</v-menu-item>
                        </v-sub-menu>
                    </v-sub-menu>
                    <v-menu-item name="/about">关于我</v-menu-item>
                </v-menu>
            `
        }, true)
        const titleDom = vm.$el.querySelector('.v-sub-menu').querySelector('.v-sub-menu-title')
        titleDom.click()
        await wait(100)
        expect(getComputedStyle(vm.$el.querySelector('.v-sub-menu').querySelector('.v-sub-menu-popover')).display).to.eq('block')
        const titleDom2 = vm.$el.querySelector('.v-sub-menu').querySelector('.v-sub-menu').querySelector('.v-sub-menu-title')
        titleDom2.click()
        await wait(100)
        expect(getComputedStyle(vm.$el.querySelector('.v-sub-menu').querySelector('.v-sub-menu-popover').querySelector('.v-sub-menu').querySelector('.v-sub-menu-popover')).display).to.eq('block')
        await wait(100)
        document.body.click()
        await wait(400)
        expect(getComputedStyle(vm.$el.querySelector('.v-sub-menu').querySelector('.v-sub-menu-popover')).display).to.eq('none')
        expect(getComputedStyle(vm.$el.querySelector('.v-sub-menu').querySelector('.v-sub-menu-popover').querySelector('.v-sub-menu').querySelector('.v-sub-menu-popover')).display).to.eq('none')
    })

    it('可以通过hover展开子菜单', async () => {
        vm = createVue({
            template: `
                <v-menu mode="horizontal">
                    <v-menu-item name="/home">首页</v-menu-item>
                    <v-sub-menu name="/programming-language" :show-timeout="50" :hide-timeout="50">
                        <template v-slot:title>编程语言</template>
                        <v-menu-item name="/java">Java</v-menu-item>
                        <v-menu-item name="/javascript">Javascript</v-menu-item>
                        <v-menu-item name="/go">Go</v-menu-item>
                        <v-sub-menu name="/framework" :show-timeout="50" :hide-timeout="50">
                            <template v-slot:title>框架</template>
                            <v-menu-item name="/jquery">jQuery</v-menu-item>
                            <v-menu-item name="/express">express</v-menu-item>
                            <v-menu-item name="/vue">vue</v-menu-item>
                        </v-sub-menu>
                    </v-sub-menu>
                    <v-menu-item name="/about">关于我</v-menu-item>
                </v-menu>
            `
        }, true)
        const titleDom = vm.$el.querySelector('.v-sub-menu').querySelector('.v-sub-menu-title')
        const e1 = new Event('mouseenter')
        titleDom.dispatchEvent(e1)
        await wait(100)
        expect(getComputedStyle(vm.$el.querySelector('.v-sub-menu').querySelector('.v-sub-menu-popover')).display).to.eq('block')
        const titleDom2 = vm.$el.querySelector('.v-sub-menu').querySelector('.v-sub-menu').querySelector('.v-sub-menu-title')
        titleDom2.dispatchEvent(e1)
        await wait(100)
        expect(getComputedStyle(vm.$el.querySelector('.v-sub-menu').querySelector('.v-sub-menu-popover').querySelector('.v-sub-menu').querySelector('.v-sub-menu-popover')).display).to.eq('block')
        await wait(100)
        const e2 = new Event('mouseleave')
        titleDom2.dispatchEvent(e2)
        await wait(400)
        expect(getComputedStyle(vm.$el.querySelector('.v-sub-menu').querySelector('.v-sub-menu-popover').querySelector('.v-sub-menu').querySelector('.v-sub-menu-popover')).display).to.eq('none')
        titleDom.dispatchEvent(e2)
        await wait(400)
        expect(getComputedStyle(vm.$el.querySelector('.v-sub-menu').querySelector('.v-sub-menu-popover')).display).to.eq('none')
    })

    it('可以设置defaultOpeneds', async () => {
        vm = createVue({
            template: `
                <v-menu :default-openeds="defaultOpeneds">
                    <v-sub-menu name="/programming-language">
                        <template v-slot:title>编程语言</template>
                        <v-menu-item name="/java">Java</v-menu-item>
                        <v-menu-item name="/javascript">Javascript</v-menu-item>
                        <v-menu-item name="/go">Go</v-menu-item>
                        <v-sub-menu name="/framework">
                            <template v-slot:title>框架</template>
                            <v-menu-item name="/jquery">jQuery</v-menu-item>
                            <v-menu-item name="/express">express</v-menu-item>
                            <v-menu-item name="/vue">vue</v-menu-item>
                        </v-sub-menu>
                    </v-sub-menu>
                </v-menu>
            `,
            data: {
                defaultOpeneds: ['/programming-language', '/framework']
            }
        }, true)
        await wait()
        const sub = vm.$el.querySelector('.v-sub-menu')
        const subPopover = sub.querySelector('.v-sub-menu-popover')
        expect(sub.classList.contains('v-sub-menu-opened')).to.be.true
        expect(getComputedStyle(subPopover).display).to.eq('block')
        expect(subPopover.querySelector('.v-sub-menu').classList.contains('v-sub-menu-opened')).to.be.true
        expect(getComputedStyle(subPopover.querySelector('.v-sub-menu').querySelector('.v-sub-menu-popover')).display).to.eq('block')
    })

    it('触发select事件', async () => {
        const cb = sinon.fake()
        const cb2 = sinon.fake()
        vm = createVue({
            template: `
                <v-menu router @select="onSelect" :default-openeds="['/programming-language', '/framework']">
                    <v-menu-item name="/home">首页</v-menu-item>
                    <v-sub-menu name="/programming-language">
                        <template v-slot:title>编程语言</template>
                        <v-menu-item name="/java">Java</v-menu-item>
                        <v-menu-item name="/javascript">Javascript</v-menu-item>
                        <v-menu-item name="/go">Go</v-menu-item>
                        <v-sub-menu name="/framework">
                            <template v-slot:title>框架</template>
                            <v-menu-item name="/jquery">jQuery</v-menu-item>
                            <v-menu-item name="/express">express</v-menu-item>
                            <v-menu-item name="/vue">vue</v-menu-item>
                        </v-sub-menu>
                    </v-sub-menu>
                    <v-menu-item name="/about">关于我</v-menu-item>
                </v-menu>
            `,
            methods: {
                onSelect (name, namePath) {
                    cb(name)
                    cb2(namePath)
                }
            }
        }, true)
        await wait()
        const sub = vm.$el.querySelector('.v-sub-menu')
        const subPopover = sub.querySelector('.v-sub-menu-popover')
        const sub2 = subPopover.querySelector('.v-sub-menu')
        const subPopover2 = sub2.querySelector('.v-sub-menu-popover')
        subPopover2.children[1].click()
        expect(cb).to.have.been.calledWith('/express')
        expect(cb2).to.have.been.calledWith(['/programming-language', '/framework', '/express'])
        subPopover2.children[1].click()
        expect(cb).to.have.been.calledWith('/express')
        expect(cb2).to.have.been.calledWith(['/programming-language', '/framework', '/express'])
    })

    it('mode 错误验证', () => {
        expect(Menu.props.mode.validator('xxx')).to.false
    })

    it('menuTrigger 错误验证', () => {
        expect(Menu.props.menuTrigger.validator('xxx')).to.false
    })
})
