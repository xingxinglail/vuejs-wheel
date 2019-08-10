import Vue from 'vue'
import VButton from './VButton'
import VIcon from './VIcon'
import VButtonGroup from './VButtonGroup'

Vue.component('v-button', VButton)
Vue.component('v-icon', VIcon)
Vue.component('v-button-group', VButtonGroup)

new Vue({
    el: '#app'
})
