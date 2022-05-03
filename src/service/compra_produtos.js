import { http } from "./config.js";

export default {
	list: () => {
		return http.get("api/compraprodutos");
	},

	ListByCompraid: (id) => {
		return http.get(`api/compraprodutos/compraid/${id}`);
	},

	save: (compras) => {
		return http.post("api/compraprodutos", compras);
	},

};
