import { http } from "./config.js";

export default {
	list: () => {
		return http.get("api/produtos");
	},
        listByTipo: (tipo) => {
		return http.get(`api/produtos/tipo/${tipo}`);
	},
        listById: (id) => {
		return http.get(`api/produtos/${id}`);
	},
};
