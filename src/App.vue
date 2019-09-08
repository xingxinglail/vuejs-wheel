<template>
    <div>
        <div style="padding: 20px;">
            <v-carousel :autoplay="autoplay" :interval="1000" direction="vertical">
                <v-carousel-item name="first">
                    <div class="carousel-box">
                        1
                    </div>
                </v-carousel-item>
                <v-carousel-item name="second">
                    <div class="carousel-box">
                        2
                    </div>
                </v-carousel-item>
                <v-carousel-item name="third">
                    <div class="carousel-box">
                        3
                    </div>
                </v-carousel-item>
            </v-carousel>
            <v-carousel active-name="second" :interval="1000">
                <v-carousel-item name="first">
                    <div class="carousel-box">
                        1
                    </div>
                </v-carousel-item>
                <v-carousel-item name="second">
                    <div class="carousel-box">
                        2
                    </div>
                </v-carousel-item>
                <v-carousel-item name="third">
                    <div class="carousel-box">
                        3
                    </div>
                </v-carousel-item>
            </v-carousel>
        </div>
        <div style="margin: 140px;">
            <v-popover placement="top-start">
                <template slot="content">
                    <p>aaaaaaaaaaasdasdasdsfsdfdsfsdfsdfsdf</p>
                </template>
                <v-button>按钮</v-button>
            </v-popover>
        </div>
        <div style="padding: 20px;">
            <v-cascader separator="-" :options="cascaderOptions"
                        @change="onCascaderChange"></v-cascader>
        </div>
        <div style="margin-top: 200px;padding: 20px;">
            <v-cascader-panel v-model="cascaderValue2" :options="cascaderOptions" />
        </div>
        <div style="margin-top: 200px;padding: 20px;">
            <v-cascader-panel v-model="cascaderValue3"
                              :props="cascaderProps"
                              :options="cascaderOptions2"
                              @change="onCascaderChange3" />
        </div>
        <br />
        <br />
        <v-button>按钮</v-button>
        <v-button>按钮2</v-button>
        <v-button icon="setting" disabled>设置</v-button>
        <v-button icon="download" icon-position="left">下载</v-button>
        <v-button icon="upload" icon-position="right">上传</v-button>
        <v-button loading icon-position="right">上传中...</v-button>
        <v-button loading>加载中...</v-button>
        <div>
            <v-button-group>
                <div>
                    <v-button icon="download" icon-position="left">下载</v-button>
                </div>
                <v-button icon="download" icon-position="left">下载</v-button>
                <v-button icon="upload" icon-position="right">上传</v-button>
            </v-button-group>
        </div>
        <div>
            <v-button-group>
                <v-button icon="download" icon-position="left">下载</v-button>
                <v-button icon="upload" icon-position="right">上传</v-button>
                <v-button icon="setting" icon-position="right">设置</v-button>
            </v-button-group>
        </div>
    </div>
</template>

<script>

export default {
    name: 'App',
    data () {
        let id = 0
        return {
            carouselList: [],
            cascaderOptions2: [
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
            cascaderValue3: [],
            cascaderValue: ['zhinan', 'shejiyuanze', 'fankui', 'xixi'],
            cascaderValue2: ['zhinan', 'shejiyuanze', 'yizhi', 'xixi'],
            cascaderOptions: [{
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
            }],
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
                    }, 1000)
                }
            },
            autoplay: true
        }
    },
    created () {
        setTimeout(() => {
            this.autoplay = false
        }, 3000)
    },
    methods: {
        onCascaderChange (val) {
            console.log(val)
        },
        onCascaderChange3 (v) {
            console.log(v)
        },
        onCarouselChange (v) {
            console.log(v)
        }
    }
}
</script>

<style lang="scss" scoped>
.carousel-box {
    line-height: 200px;
    height: 200px;
    text-align: center;
    font-size: 36px;
    font-weight: bold;
    background-color: #23b2ff;
}
</style>
