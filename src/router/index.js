import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import home from "../components/home.vue"
import checkoutPage from "../components/checkoutPage.vue"
import success from "../components/success.vue"

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'HomeView',
        component: HomeView
    },
    {
        path: "/products",
        name: "home",
        component: home
    },
    {
        path: "/checkout-make-payment",
        name: "checkoutPage",
        component: checkoutPage
    },
    {
        path: "/success",
        name: "success",
        component: success
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router