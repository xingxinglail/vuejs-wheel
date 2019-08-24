import Vue from 'vue'
import router from './router'
import VButton from './VButton'
import VIcon from './VIcon'
import VButtonGroup from './VButtonGroup'
import VInput from './VInput'
import VRow from './VRow'
import VCol from './VCol'
import VLayout from './VLayout'
import VHeader from './VHeader'
import VContent from './VContent'
import VAside from './VAside'
import VFooter from './VFooter'
import Toast from './plugins/toast'
import VToast from './plugins/toast/src/Main'
import ToastTest from './ToastTest'
import VTabs from './VTabs'
import VTabPane from './VTabPane'
import VTabHead from './VTabHead'
import VTabBody from './VTabBody'
import VTabNav from './VTabNav'
import VPopover from './VPopover'
import VCollapse from './VCollapse'
import VCollapseItem from './VCollapseItem'

Vue.component('toast-test', ToastTest)
Vue.component('v-button', VButton)
Vue.component('v-icon', VIcon)
Vue.component('v-button-group', VButtonGroup)
Vue.component('v-input', VInput)
Vue.component('v-row', VRow)
Vue.component('v-col', VCol)
Vue.component('v-layout', VLayout)
Vue.component('v-header', VHeader)
Vue.component('v-content', VContent)
Vue.component('v-aside', VAside)
Vue.component('v-footer', VFooter)
Vue.component('v-toast', VToast)
Vue.component('v-tabs', VTabs)
Vue.component('v-tab-pane', VTabPane)
Vue.component('v-tab-head', VTabHead)
Vue.component('v-tab-body', VTabBody)
Vue.component('v-tab-nav', VTabNav)
Vue.component('v-popover', VPopover)
Vue.component('v-collapse', VCollapse)
Vue.component('v-collapse-item', VCollapseItem)
Vue.use(Toast)

new Vue({
    el: '#app',
    data: {
        msg: 'hi',
        tabsActive: 'second',
        collapseActive: '1',
        collapseActive2: ['2']
    },
    router,
    created () {
    },
    mounted () {
        setInterval(() => {
            this.msg += '!'
        }, 3000)
    },
    methods: {
        createTopToast () {
            this.$toast({
                message: '<div>卢卡<b>记录卡健身房的考虑将</b>斯按时付款了坚实的浪费空间施蒂利克福建省离开对方家里睡大觉了开始的减肥阿里空间发的玩</div>',
                duration: 0,
                enableHTML: true,
                closeBtnText: '关闭'
            })
        },
        createMiddleToast () {
            this.$toast({
                message: 'hello world',
                duration: 400,
                position: 'middle',
                onClose (toast) {
                    console.log(toast)
                }
            })
        },
        createBottomToast () {
            this.$toast({
                message: '<div>卢卡<b>记录卡健身房的考虑将</b>斯按时付款了坚实的浪费间发的玩</div>',
                duration: 0,
                position: 'bottom',
                closeBtnText: '关闭'
            })
        },
        handleTabClick (name, e) {
            console.log(name);
            console.log(e);
        },
        collapseChange (e) {
            console.log(e);
        },
        collapseChange2 (e) {
            console.log(e);
            console.log(this.collapseActive2);
        }
    }
})
