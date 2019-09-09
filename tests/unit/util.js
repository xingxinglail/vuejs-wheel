import Vue from 'vue/dist/vue.min'
import Button from '../../src/VButton'
import Input from '../../src/VInput'
import Toast from '../../src/plugins/toast/src/Main'
import ToastPlugin from '../../src/plugins/toast'
import Row from '../../src/VRow'
import Col from '../../src/VCol'
import Tabs from '../../src/VTabs'
import TabNav from '../../src/VTabNav'
import TabHead from '../../src/VTabHead'
import TabBody from '../../src/VTabBody'
import TabPane from '../../src/VTabPane'
import Layout from '../../src/VLayout'
import Aside from '../../src/VAside'
import Header from '../../src/VHeader'
import Footer from '../../src/VFooter'
import Collapse from '../../src/VCollapse'
import CollapseItem from '../../src/VCollapseItem'
import Popover from '../../src/VPopover'
import Cascader from '../../src/cascader/VCascader'
import CascaderPanel from '../../src/cascader/VCascaderPanel'
import VCarousel from '../../src/carousel/VCarousel'
import VCarouselItem from '../../src/carousel/VCarouselItem'

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
