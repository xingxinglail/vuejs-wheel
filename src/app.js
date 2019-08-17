import Vue from 'vue'
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

new Vue({
    el: '#app',
    data: {
        msg: 'hi'
    },
    mounted () {
        setInterval(() => {
            this.msg += '!'
        }, 3000)
    }
})
