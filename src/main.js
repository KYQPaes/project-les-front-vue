import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import Vuetify from "vuetify";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import VCreditCard from "v-credit-card";
import VueMask from "v-mask";
import VueApexCharts from 'vue-apexcharts'

Vue.use(VueApexCharts);
Vue.use(VueMask);
Vue.use(Vuetify);

Vue.component('apexchart', VueApexCharts);
Vue.component("v-credit-card", VCreditCard);

Vue.config.productionTip = false;

new Vue({
	router,
	vuetify,
	render: (h) => h(App),
}).$mount("#app");
