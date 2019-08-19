import Vue from 'vue'
import VTabs from '../src/VTabs'
import VTabNav from '../src/VTabNav'
import VTabHead from '../src/VTabHead'
import VTabBody from '../src/VTabBody'
import VTabPane from '../src/VTabPane'

Vue.config.productionTip = false
Vue.config.devtools = false

const expect = chai.expect

describe('VTabs', () => {
    it('存在.', () => {
        expect(VTabs).to.be.ok
        expect(VTabNav).to.be.ok
        expect(VTabHead).to.be.ok
        expect(VTabBody).to.be.ok
        expect(VTabPane).to.be.ok
    })

    it('可点击nav进行切换', () => {
        Vue.component('v-tabs', VTabs)
        Vue.component('v-tab-pane', VTabPane)
        Vue.component('v-tab-head', VTabHead)
        Vue.component('v-tab-body', VTabBody)
        Vue.component('v-tab-nav', VTabNav)
        const div = document.createElement('div')
        document.body.appendChild(div)
        div.innerHTML = `
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
        `
        const callback = sinon.fake();
        const vm = new Vue({
            el: div,
            data: {
                tabsActive: 'second'
            },
            methods: {
                handleTabClick (name) {
                    callback(name)
                }
            }
        })
        const tabs = document.body.querySelector('.v-tabs')
        const nav = tabs.querySelectorAll('.v-tab-nav')
        nav[0].click()
        expect(vm.tabsActive).to.be.equal('first')
        expect(callback).to.have.been.calledWith('first')
    })
})
