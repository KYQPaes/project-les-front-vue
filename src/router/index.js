import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Cliente from "../views/Cliente.vue";
import Login from "../views/Login.vue";
import Cadastro from "../views/Cadastro.vue";
import cadastro_cartao from "../views/Cartao_Cadastro.vue";
import endereco_cadastro from "../views/Endereco_Cadastro.vue";

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
	{
		path: "/cartao_cadastro",
		name: "cadastro_cartao",
		component: cadastro_cartao,
	},
	{
		path: "/Endereco_cadastro",
		name: "Endereco_cadastro",
		component: endereco_cadastro,
	},
	
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
