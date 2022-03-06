import { http } from "./config.js";

export default {
	listClienteId: (id) => {
		return http.get(`api/cartoes/clienteid/${id}`);
	},

	show: (id) => {
		return http.get(`api/cartoes/${id}`);
	},

	create: (cartao) => {
		return http.post("api/cartoes", cartao);
	},	

	update: (cartao) => {
		return http.put("api/cartoes", cartao);
	},

};







