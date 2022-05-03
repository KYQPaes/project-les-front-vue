import { http } from "./config.js";

export default {
	list: () => {
		return http.get("api/compraprodutos");
	},

	save: (compras) => {
		return http.post("api/compraprodutos", compras);
	},

};
