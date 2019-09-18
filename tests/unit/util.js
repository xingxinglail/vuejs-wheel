import Vue from 'vue/dist/vue.min'
import Button from '../../src/button/VButton'
import Input from '../../src/input/VInput'
import Toast from '../../src/plugins/toast/src/Main'
import ToastPlugin from '../../src/plugins/toast'
import Row from '../../src/layout/VRow'
import Col from '../../src/layout/VCol'
import Tabs from '../../src/tabs/VTabs'
import TabNav from '../../src/tabs/VTabNav'
import TabHead from '../../src/tabs/VTabHead'
import TabBody from '../../src/tabs/VTabBody'
import TabPane from '../../src/tabs/VTabPane'
import Layout from '../../src/container/VLayout'
import Aside from '../../src/container/VAside'
import Header from '../../src/container/VHeader'
import Footer from '../../src/container/VFooter'
import Collapse from '../../src/collapse/VCollapse'
import CollapseItem from '../../src/collapse/VCollapseItem'
import Popover from '../../src/popover/VPopover'
import Cascader from '../../src/cascader/VCascader'
import CascaderPanel from '../../src/cascader/VCascaderPanel'
import VCarousel from '../../src/carousel/VCarousel'
import VCarouselItem from '../../src/carousel/VCarouselItem'
import VMenu from '../../src/menu/VMenu'
import VMenuItem from '../../src/menu/VMenuItem'
import VSubMenu from '../../src/menu/VSubMenu'
import VPagination from '../../src/pagination/VPagination'

Vue.config.productionTip = false
Vue.config.devtools = false
console.info = function () {}

Vue.component('v-button', Button)
Vue.component('v-input', Input)
Vue.component('v-toast', Toast)
Vue.component('v-row', Row)
Vue.component('v-col', Col)
Vue.component('v-tabs', Tabs)
Vue.component('v-tab-nav', TabNav)
Vue.component('v-tab-head', TabHead)
Vue.component('v-tab-body', TabBody)
Vue.component('v-tab-pane', TabPane)
Vue.component('v-layout', Layout)
Vue.component('v-aside', Aside)
Vue.component('v-header', Header)
Vue.component('v-footer', Footer)
Vue.component('v-collapse', Collapse)
Vue.component('v-collapse-item', CollapseItem)
Vue.component('v-popover', Popover)
Vue.component('v-cascader', Cascader)
Vue.component('v-cascader-panel', CascaderPanel)
Vue.component('v-carousel', VCarousel)
Vue.component('v-carousel-item', VCarouselItem)
Vue.component('v-menu', VMenu)
Vue.component('v-menu-item', VMenuItem)
Vue.component('v-sub-menu', VSubMenu)
Vue.component('v-pagination', VPagination)
Vue.use(ToastPlugin)

let id = 0

const createElm = () => {
    const elm = document.createElement('div')
    elm.id = 'app' + ++id
    document.body.appendChild(elm)
    return elm
}

/**
 * 回收 vm
 * @param  {Object} vm
 */
export const destroyVM = vm => {
    vm.$destroy && vm.$destroy();
    vm.$el &&
    vm.$el.parentNode &&
    vm.$el.parentNode.removeChild(vm.$el)
}

/**
 * 创建一个 Vue 的实例对象
 * @param  {Object|String}  Compo   组件配置，可直接传 template
 * @param  {Boolean=false} mounted 是否添加到 DOM 上
 * @return {Object} vm
 */
export const createVue = (Compo, mounted = false) => {
    if (Object.prototype.toString.call(Compo) === '[object String]') {
        Compo = { template: Compo }
    }
    return new Vue(Compo).$mount(mounted === false ? null : createElm())
}

/**
* 等待 ms 毫秒，返回 Promise
* @param {Number} ms
*/
export const wait = (ms = 50) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
