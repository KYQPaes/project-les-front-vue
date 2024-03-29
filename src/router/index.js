import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Cliente from "../views/Cliente.vue";
import Login from "../views/Login.vue";
import Cadastro from "../views/Cadastro.vue";
import cadastro_cartao from "../views/Cartao_Cadastro.vue";
import endereco_cadastro from "../views/Endereco_Cadastro.vue";
import senha_editar from "../views/Senha_Editar.vue";
import categoria from "../views/Categoria.vue";
import modelo from "../views/Modelo.vue";
import cupom from "../views/Cupom.vue";
import cupomAdm from "../views/Cupom_Adm.vue";
import consultaCliente from "../views/Consulta_ClienteAdm.vue";
import consultaContaAdm from "../views/Consulta_ContaAdm.vue";
import carrinho from "../views/Carrinho.vue";
import final_compra from "../views/Finalizar_Compra.vue";
import consulta_pedido from "../views/Consulta_Pedido.vue";
import troca_pedido from "../views/Troca_Pedido.vue";
import consulta_troca_adm from "../views/Consulta_Troca_Admin"
import grafico_adm from "../views/Grafico"

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
	{
		path: "/Senha_editar",
		name: "Senha_editar",
		component: senha_editar,
	},	
	{
		path: "/categoria/:tpproduto",
		name: "categoria",
		component: categoria,
	},
	{
		path: "/modelo/:id",
		name: "modelo",
		component: modelo,
	},
	{
		path: "/cupom",
		name: "cupom",
		component: cupom,
	},
	{
		path: "/cupomAdm",
		name: "cupomAdm",
		component: cupomAdm,
	},
	{
		path: "/consultaCliente",
		name: "consultaCliente",
		component: consultaCliente,
	},
	{
		path: "/consultaContaAdm/:id",
		name: "consultaContaAdm",
		component: consultaContaAdm,
	},
	{
		path: "/carrinho",
		name: "carrinho",
		component: carrinho,
	},
	{
		path: "/final_compra",
		name: "final_compra",
		component: final_compra,
	},	
	{
		path: "/consulta_pedido/:id",
		name: "consulta_pedido",
		component: consulta_pedido,
	},	
	{
		path: "/troca_pedido/:id",
		name: "troca_pedido",
		component: troca_pedido,
	},
	{
		path: "/consulta_troca_adm/:id",
		name: "consulta_troca_adm",
		component: consulta_troca_adm,
	},
	{
		path: "/grafico_adm",
		name: "grafico_adm",
		component: grafico_adm,
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
