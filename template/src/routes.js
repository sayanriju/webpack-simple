import Vue from "vue"
import Router from "vue-router"

import Home from "./Components/Home.vue"
import Login from "./Components/Login.vue"

import FourZeroFour from "./Components/404.vue"

Vue.use(Router)
export default new Router({
  mode: "hash",
  routes: [
    { path: "/home", name: "homepage", component: Home, alias: "/" },
    { path: "/login", name: "loginpage", component: Login },

    { path: "*", name: "fourzerofour", component: FourZeroFour },
  ]
})
