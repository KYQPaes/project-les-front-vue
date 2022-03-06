import { http } from "./config.js";

export default {
	list: () => {
		return http.get("api/enderecos");
	},	

	create: (endereco) => {
		return http.post("api/enderecos", endereco);
	},
};
