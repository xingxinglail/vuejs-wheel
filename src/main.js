import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import VButton from './button/VButton'
import VIcon from './icon/VIcon'
import VButtonGroup from './button/VButtonGroup'
import VInput from './input/VInput'
import VRow from './layout/VRow'
import VCol from './layout/VCol'
import VLayout from './container/VLayout'
import VHeader from './container/VHeader'
import VContent from './container/VContent'
import VAside from './container/VAside'
import VFooter from './container/VFooter'
import Toast from './plugins/toast'
import VToast from './plugins/toast/src/Main'
import VTabs from './tabs/VTabs'
import VTabPane from './tabs/VTabPane'
import VTabHead from './tabs/VTabHead'
import VTabBody from './tabs/VTabBody'
import VTabNav from './tabs/VTabNav'
import VPopover from './popover/VPopover'
import VCollapse from './collapse/VCollapse'
import VCollapseItem from './collapse/VCollapseItem'
import VCascader from './cascader/VCascader'
import VCascaderPanel from './cascader/VCascaderPanel'
import VCarousel from './carousel/VCarousel'
import VCarouselItem from './carousel/VCarouselItem'
import VMenu from './menu/VMenu'
import VMenuItem from './menu/VMenuItem'
import VSubMenu from './menu/VSubMenu'
import VPagination from './pagination/VPagination'
import VTable from './table/VTable'
import VTableColumn from './table/VTableColumn'
import VSticky from './sticky/VSticky'
import VScrollbar from './scrollbar/VScrollbar'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: []
})

Vue.config.productionTip = false

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
Vue.component('v-cascader', VCascader)
Vue.component('v-cascader-panel', VCascaderPanel)
Vue.component('v-carousel', VCarousel)
Vue.component('v-carousel-item', VCarouselItem)
Vue.component('v-menu', VMenu)
Vue.component('v-menu-item', VMenuItem)
Vue.component('v-sub-menu', VSubMenu)
Vue.component('v-pagination', VPagination)
Vue.component('v-table', VTable)
Vue.component('v-table-column', VTableColumn)
Vue.component('v-sticky', VSticky)
Vue.component('v-scrollbar', VScrollbar)
Vue.use(Toast)

new Vue({
    render: h => h(App),
    router
}).$mount('#app')
