import { http } from "./config.js";

export default {
        listByClienteId: (id) => {
		return http.get(`api/compras/clienteid/${id}`);
	},
        update: (item) => {
		return http.put("api/compras", item);
	},
        save: (item) => {
		return http.post("api/compras", item);
	},
};
