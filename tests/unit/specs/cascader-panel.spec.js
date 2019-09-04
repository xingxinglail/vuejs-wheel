import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { createVue, wait, destroyVM } from '../util'

const expect = chai.expect
chai.use(sinonChai)

const options = [{
    value: 'zhinan',
    label: '指南',
    children: [{
        value: 'shejiyuanze',
        label: '设计原则',
        children: [{
            value: 'yizhi',
            label: '一致',
            children: [{
                value: 'xixi',
                label: '嘻嘻'
            }, {
                value: 'haha',
                label: '哈哈'
            }]
        }, {
            value: 'fankui',
            label: '反馈'
        }, {
            value: 'xiaolv',
            label: '效率'
        }, {
            value: 'kekong',
            label: '可控'
        }]
    }, {
        value: 'daohang',
        label: '导航',
        children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
        }, {
            value: 'dingbudaohang',
            label: '顶部导航'
        }]
    }]
}, {
    value: 'zujian',
    label: '组件',
    children: [{
        value: 'basic',
        label: 'Basic',
        children: [{
            value: 'layout',
            label: 'Layout 布局'
        }, {
            value: 'color',
            label: 'Color 色彩'
        }, {
            value: 'typography',
            label: 'Typography 字体'
        }, {
            value: 'icon',
            label: 'Icon 图标'
        }, {
            value: 'button',
            label: 'Button 按钮'
        }]
    }, {
        value: 'form',
        label: 'Form',
        children: [{
            value: 'radio',
            label: 'Radio 单选框'
        }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
        }, {
            value: 'input',
            label: 'Input 输入框'
        }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
        }, {
            value: 'select',
            label: 'Select 选择器'
        }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
        }, {
            value: 'switch',
            label: 'Switch 开关'
        }, {
            value: 'slider',
            label: 'Slider 滑块'
        }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
        }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
        }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
        }, {
            value: 'upload',
            label: 'Upload 上传'
        }, {
            value: 'rate',
            label: 'Rate 评分'
        }, {
            value: 'form',
            label: 'Form 表单'
        }]
    }, {
        value: 'data',
        label: 'Data',
        children: [{
            value: 'table',
            label: 'Table 表格'
        }, {
            value: 'tag',
            label: 'Tag 标签'
        }, {
            value: 'progress',
            label: 'Progress 进度条'
        }, {
            value: 'tree',
            label: 'Tree 树形控件'
        }, {
            value: 'pagination',
            label: 'Pagination 分页'
        }, {
            value: 'badge',
            label: 'Badge 标记'
        }]
    }, {
        value: 'notice',
        label: 'Notice',
        children: [{
            value: 'alert',
            label: 'Alert 警告'
        }, {
            value: 'loading',
            label: 'Loading 加载'
        }, {
            value: 'message',
            label: 'Message 消息提示'
        }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
        }, {
            value: 'notification',
            label: 'Notification 通知'
        }]
    }, {
        value: 'navigation',
        label: 'Navigation',
        children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
        }, {
            value: 'tabs',
            label: 'Tabs 标签页'
        }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
        }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
        }, {
            value: 'steps',
            label: 'Steps 步骤条'
        }]
    }, {
        value: 'others',
        label: 'Others',
        children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
        }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
        }, {
            value: 'popover',
            label: 'Popover 弹出框'
        }, {
            value: 'card',
            label: 'Card 卡片'
        }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
        }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
        }]
    }]
}, {
    value: 'ziyuan',
    label: '资源',
    children: [{
        value: 'axure',
        label: 'Axure Components'
    }, {
        value: 'sketch',
        label: 'Sketch Templates'
    }, {
        value: 'jiaohu',
        label: '组件交互文档'
    }]
}]

describe('CascaderPanel', () => {
    let vm

    afterEach(() => {
        destroyVM(vm)
    })

    it('可以设置options', async () => {
        vm = createVue({
            template: `
                <v-cascader-panel :options="options"></v-cascader-panel>
            `,
            data: {
                options
            }
        }, true)
        const panel = vm.$el
        await wait()
        const lastItem = panel.querySelector('.v-cascader-menu').children[2]
        lastItem.click()
        await wait()
        expect(lastItem.classList.contains('v-cascader-menu-item-selected')).to.true
        const level2 = panel.querySelectorAll('.v-cascader-menu')[1]
        expect(level2).to.exist
    })

    it('可以设置value', async () => {
        try {
            vm = createVue({
                template: `
                    <v-cascader-panel v-model="value" :options="options"></v-cascader-panel>
                `,
                data: {
                    options,
                    value: ['zujian', 'form', 'checkbox']
                }
            }, true)
            const panel = vm.$el
            const menus = panel.querySelectorAll('.v-cascader-menu')
            expect(menus[0].children[1].classList.contains('v-cascader-menu-item-selected')).to.true
            expect(menus[1].children[1].classList.contains('v-cascader-menu-item-selected')).to.true
            expect(menus[2].children[1].classList.contains('v-cascader-menu-item-selected')).to.true
            menus[0].children[0].click()
            await wait()
            expect(menus[0].children[0].classList.contains('v-cascader-menu-item-selected')).to.true
            expect(menus[0].children[1].classList.contains('v-cascader-menu-item-selected')).to.false
            const menus2 = panel.querySelectorAll('.v-cascader-menu')
            expect(menus2.length).to.eq(2)
            menus2[1].children[0].click()
            await wait()
            const menus3 = panel.querySelectorAll('.v-cascader-menu')
            expect(menus3.length).to.eq(3)
            menus3[2].children[1].click()
            expect(vm.value).to.deep.equal(['zhinan', 'shejiyuanze', 'fankui']);
        } catch (err) {
            console.error(err)
        }
    })

    it('可以设置separator', async () => {
        vm = createVue({
            template: `
                <v-cascader-panel v-model="value" separator="-" :options="options"></v-cascader-panel>
            `,
            data: {
                options,
                value: ['zujian', 'form', 'checkbox']
            }
        }, true)
        const panel = vm.$el
        const menus = panel.querySelectorAll('.v-cascader-menu')
        expect(menus[0].children[1].classList.contains('v-cascader-menu-item-selected')).to.true
        expect(menus[1].children[1].classList.contains('v-cascader-menu-item-selected')).to.true
        expect(menus[2].children[1].classList.contains('v-cascader-menu-item-selected')).to.true
        menus[0].children[0].click()
        await wait()
        expect(menus[0].children[0].classList.contains('v-cascader-menu-item-selected')).to.true
        expect(menus[0].children[1].classList.contains('v-cascader-menu-item-selected')).to.false
        const nextMenus = panel.querySelectorAll('.v-cascader-menu')
        expect(nextMenus.length).to.eq(2)
        nextMenus[1].children[0].click()
        await wait()
        const menus2 = panel.querySelectorAll('.v-cascader-menu')
        expect(menus2.length).to.eq(3)
        menus2[2].children[1].click()
        expect(vm.value).to.deep.eq(['zhinan', 'shejiyuanze', 'fankui'])
    })

    it('触发change事件', async () => {
        const callback = sinon.fake()
        vm = createVue({
            template: `
                <v-cascader-panel :options="options" @change="onChange"></v-cascader-panel>
            `,
            data: {
                options
            },
            methods: {
                onChange (e) {
                    callback(e)
                }
            }
        }, true)
        const panel = vm.$el
        const menus = panel.querySelectorAll('.v-cascader-menu')
        menus[0].children[0].click()
        await wait()
        const nextMenus = panel.querySelectorAll('.v-cascader-menu')
        expect(nextMenus.length).to.eq(2)
        nextMenus[1].children[0].click()
        await wait()
        const menus2 = panel.querySelectorAll('.v-cascader-menu')
        expect(menus2.length).to.eq(3)
        menus2[2].children[1].click()
        expect(callback).to.have.been.calledWith(['zhinan', 'shejiyuanze', 'fankui'])
    })

    it('按需加载', async () => {
        let id = 0
        vm = createVue({
            template: `
                <v-cascader-panel v-model="value" :options="options" :props="cascaderProps"></v-cascader-panel>
            `,
            data: {
                value: [],
                options: [
                    {
                        value: 'zhinan',
                        label: '指南',
                        leaf: false
                    },
                    {
                        value: 'zujian',
                        label: '组件',
                        leaf: false
                    },
                    {
                        value: 'ziyuan',
                        label: '资源',
                        leaf: false
                    }
                ],
                cascaderProps: {
                    lazy: true,
                    lazyLoad (node, cb) {
                        const { level } = node
                        setTimeout(() => {
                            const nodes = Array.from({ length: level + 1 })
                                .map(() => {
                                    return {
                                        value: ++id,
                                        label: `选项${id}`,
                                        leaf: id > 3
                                    }
                                })
                            cb(nodes)
                        }, 100)
                    }
                }
            }
        }, true)
        const panel = vm.$el
        await wait()
        const menus = panel.querySelectorAll('.v-cascader-menu')
        menus[0].children[0].click()
        await wait(110)
        const menus2 = panel.querySelectorAll('.v-cascader-menu')
        menus2[1].children[0].click()
        await wait(110)
        const menus3 = panel.querySelectorAll('.v-cascader-menu')
        menus3[2].children[0].click()
        await wait(110)
        const menus4 = panel.querySelectorAll('.v-cascader-menu')
        menus4[3].children[0].click()
        expect(vm.value).to.deep.eq(['zhinan', 1, 2, 4])
    })
})
