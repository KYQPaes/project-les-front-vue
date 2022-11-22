import { http } from "./config.js";

export default {
	list: () => {
		return http.get("api/compraprodutos");
	},

	ListByCompraid: (id) => {
		return http.get(`api/compraprodutos/compraid/${id}`);
	},

	graphProduto: (id, dataInicial, dataFinal) => {
		return http.get(`api/compraprodutos/graphProduto/${id}/${dataInicial}/${dataFinal}`);
	},

	graphData: (dataInicial, dataFinal) => {
		return http.get(`api/compraprodutos/graphData/${dataInicial}/${dataFinal}`);
	},

	save: (compras) => {
		return http.post("api/compraprodutos", compras);
	},

};
