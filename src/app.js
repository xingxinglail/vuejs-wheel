import Vue from 'vue'
import VButton from './VButton'
import VIcon from './VIcon'

Vue.component('v-button', VButton)
Vue.component('v-icon', VIcon)

new Vue({
    el: '#app',
    data: {
        test: '1'
    }
})
