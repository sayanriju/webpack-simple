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
  tokenName: config.tokenName,

  // Stuff to make it work with Axios (until vue-authenticate uses axios as official instead of vue-resource)
  requestDataKey: "data",
  responseDataKey: "data",
  bindRequestInterceptor() {
    this.$http.interceptors.request.use((axiosConfig) => {
      if (this.isAuthenticated()) {
        axiosConfig.headers["Authorization"] = [
          this.options.tokenType, this.getToken()
        ].join(" ")
      } else {
        delete axiosConfig.headers["Authorization"]
      }
      return axiosConfig
    })
  },

  bindResponseInterceptor() {
    this.$http.interceptors.response.use((response) => {
      this.setToken(response)
      return response
    })
  }

})


new Vue({   // eslint-disable-line
  routes,
  el: "#app",
  render: h => h(App),
})
