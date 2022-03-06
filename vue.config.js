// const { defineConfig } = require("@vue/cli-service");
// module.exports = defineConfig({
// 	transpileDependencies: ["vuetify"],
// });

module.exports = {
	devServer: {
		proxy: "http://192.168.1.19:3000",
	},
};
