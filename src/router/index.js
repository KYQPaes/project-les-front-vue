import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Cliente from "../views/Cliente.vue";
import Login from "../views/Login.vue";
import Cadastro from "../views/Cadastro.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "home",
		component: Home,
	},
	{
		path: "/cliente",
		name: "cliente",
		component: Cliente,
	},
	{
		path: "/login",
		name: "login",
		component: Login,
	},
	{
		path: "/cadastro",
		name: "cadastro",
		component: Cadastro,
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
