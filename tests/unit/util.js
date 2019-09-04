import Vue from 'vue/dist/vue.min'
import Button from '../../src/VButton'
import Input from '../../src/VInput'
import Toast from '../../src/plugins/toast/src/Main'
import ToastPlugin from '../../src/plugins/toast'
import Row from '../../src/VRow'
import Col from '../../src/VCol'

Vue.config.productionTip = false
Vue.config.devtools = false

Vue.component('v-button', Button)
Vue.component('v-input', Input)
Vue.component('v-toast', Toast)
Vue.component('v-row', Row)
Vue.component('v-col', Col)
Vue.use(ToastPlugin)

let id = 0

const createElm = function() {
    const elm = document.createElement('div')
    elm.id = 'app' + ++id
    document.body.appendChild(elm)
    return elm
}

/**
 * 回收 vm
 * @param  {Object} vm
 */
export const destroyVM = function(vm) {
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
