import { http } from "./config.js";

export default {
	listByClienteId: (id) => {
		return http.get(`api/cupom/clienteid/${id}`);
	},

	list: () => {
		return http.get("api/cupom");
	},

	save: (item) => {
		// console.log('save')
		return http.post("api/cupom", item);
	},
};
