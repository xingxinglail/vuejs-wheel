import Vue from 'vue'
import VButton from './VButton'
import VIcon from './VIcon'
import VButtonGroup from './VButtonGroup'
import VInput from './VInput'
import VRow from './VRow'
import VCol from './VCol'

Vue.component('v-button', VButton)
Vue.component('v-icon', VIcon)
Vue.component('v-button-group', VButtonGroup)
Vue.component('v-input', VInput)
Vue.component('v-row', VRow)
Vue.component('v-col', VCol)

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
