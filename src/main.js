import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import VCreditCard from "v-credit-card";
import VueMask from 'v-mask'
Vue.use(VueMask)

Vue.component("v-credit-card", VCreditCard);

Vue.config.productionTip = false;

new Vue({
	router,
	vuetify,
	render: (h) => h(App),
}).$mount("#app");
