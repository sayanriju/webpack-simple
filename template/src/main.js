import Vue from "vue"
import axios from "axios"
import VueAxios from "vue-axios"
import VueAuthenticate from "vue-authenticate"

import config from "./config"
import routes from "./routes"

import App from "./App.vue"

Vue.use(VueAxios)
Vue.use(VueAuthenticate, {
  baseUrl: config.apiRoot, // Your API domain
  loginUrl: "/login",
  tokenName: config.tokenName
})


new Vue({   // eslint-disable-line
  el: "#app",
  render: h => h(App),
  routes
})
