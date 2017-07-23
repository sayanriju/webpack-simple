import Vue from "vue"
import axios from "axios"
import VueAxios from "vue-axios"
import VueAuthenticate from "vue-authenticate"

import Config from "./config"
import Router from "./routes"

import App from "./App.vue"

Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  baseUrl: Config.apiRoot, // Your API domain
  loginUrl: "/login",
  tokenName: Config.tokenName,

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
  Router,
  el: "#vue-app",
  render: h => h(App),
})
