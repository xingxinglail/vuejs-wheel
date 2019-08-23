import Vue from 'vue'
import VueRouter from 'vue-router'
import Page from './Page'
import Page2 from './Page2'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/a',
            component: Page
        },
        {
            path: '/b',
            component: Page2
        }
    ]
})

export default router
