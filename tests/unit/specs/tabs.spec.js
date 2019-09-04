import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { createVue, destroyVM } from '../util'

const expect = chai.expect
chai.use(sinonChai)

describe('Tabs', () => {
    let vm

    afterEach(() => {
        destroyVM(vm)
    })

    it('可点击nav进行切换', () => {
        const callback = sinon.fake();
        vm = createVue({
            template: `
                <v-tabs v-model="tabsActive" @tab-click="handleTabClick">
                <v-tab-head>
                    <v-tab-nav name="first">用户</v-tab-nav>
                    <v-tab-nav name="second">配置管理</v-tab-nav>
                    <v-tab-nav name="third">角管理</v-tab-nav>
                    <v-tab-nav name="fourth">定时任务补偿</v-tab-nav>
                </v-tab-head>
                <v-tab-body>
                    <v-tab-pane name="first">用户管理用户管理</v-tab-pane>
                    <v-tab-pane name="second">配置管理配置管理</v-tab-pane>
                    <v-tab-pane name="third">角色管理角色管理</v-tab-pane>
                    <v-tab-pane name="fourth">定时任务补偿定时任务补偿</v-tab-pane>
                </v-tab-body>
            </v-tabs>
            `,
            data: {
                tabsActive: 'second'
            },
            methods: {
                handleTabClick (name) {
                    callback(name)
                }
            }
        }, true)
        const tabs = document.body.querySelector('.v-tabs')
        const nav = tabs.querySelectorAll('.v-tab-nav')
        nav[0].click()
        expect(vm.tabsActive).to.be.equal('first')
        expect(callback).to.have.been.calledWith('first')
    })
})
