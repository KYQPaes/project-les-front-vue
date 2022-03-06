import { http } from "./config.js";

export default {
	list: () => {
		return http.get("api/clientes");
	},

	login: (email, senha) => {
		return http.get(`api/clientes/log?email=${email}&senha=${senha}`);
	},

	create: (cliente) => {
		return http.post("api/clientes", cliente);
	},

	update: (cliente) => {
		return http.put("api/clientes", cliente);
	},
};
