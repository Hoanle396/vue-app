import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Home from './components/Home.vue'
import Product from './components/Product.vue'
import DetailProduct from './components/DetailProduct.vue'
import Tuvan from './components/Tuvan.vue'
import News from './components/News.vue'
import DetailNews from './components/DetailNews.vue'
import Profile from './components/Profile.vue'
import Bank from './components/Bank.vue'
import Checkout from './components/Checkout.vue'
import Feedback from './components/Feedback.vue'
import notfound from './components/layout/404.vue'
import 'bootstrap'
Vue.config.productionTip = false

Vue.use(VueRouter)
const routes = [

    { path: '/', component: Home, name: 'home' },
    { path: '/Product', component: Product },
    { path: '/Login', component: Login, name: 'login' },
    { path: '/Register', component: Register },
    { path: '/Product/:id', component: DetailProduct, name: 'detailProduct' },
    { path: '/Tuvan', component: Tuvan },
    { path: '/News', component: News },
    { path: '/News/:id', component: DetailNews },
    { path: '/Profile', component: Profile, name: 'Account' },
    { path: '/Checkout', component: Checkout },
    { path: '/Bank', component: Bank, name: 'bank' },
    { path: '/Feedback', component: Feedback },
    { path: '*', component: notfound, name: '404' }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')