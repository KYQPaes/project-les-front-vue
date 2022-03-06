import { http } from "./config.js";

export default {
	listClienteId: (id) => {
		return http.get(`api/enderecos/clienteid/${id}`);
	},	

	show: (id) => {
		return http.get(`api/enderecos/${id}`);
	},

	create: (endereco) => {
		return http.post("api/enderecos", endereco);
	},	

	update: (endereco) => {
		return http.put("api/enderecos", endereco);
	},

	delete: (id) => {
		return http.delete(`api/enderecos/${id}`);
	},
};


