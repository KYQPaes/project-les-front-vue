import { http } from "./config.js";

export default {
	list: () => {
		return http.get("clientes");
	},

	login: (email, senha) => {
		return http.get(`clientes/log?email=${email}&senha=${senha}`);
	},
};
