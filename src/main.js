import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { routes } from './routes'
import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            token: null
        }
    },
    mutations: {
        setToken(state, token) {
            state.token=token
        },
        deleteToken(state) {
            state.token=null
        }
    }
})

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')

import 'bootstrap/dist/js/bootstrap.js'