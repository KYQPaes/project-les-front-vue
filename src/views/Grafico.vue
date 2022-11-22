<template>
	<div>
		<Menu />
		<div width="100%" style="padding: 50px">
			<v-layout>
				<v-flex xs9 style="margin-left: 15%">
					<v-card elevation="10" class="justify-center" style="padding: 20px">
						<v-card-title style="display: flex; justify-content: center; font-size: 20px; font-family: sans-serif;">
							<h3 class="headline mb-0">Gráfico de Vendas</h3>
						</v-card-title>
						<!-- <v-date-picker v-model="dataInicial"></v-date-picker>
						<v-date-picker v-model="dataFim"></v-date-picker> -->
						<v-layout style="display: flex; justify-content: space-evenly;">
							<v-flex xs4>
								<v-autocomplete return-object v-model="produtosEscolhidos" :items="produtos" dense hide-details item-text="nome" item-value="id" outlined chips color="blue-grey lighten-2" label="Produtos" multiple></v-autocomplete>
							</v-flex>
							<v-flex xs3>
								<v-text-field v-model="dataInicial" type="date" label="Data Inicial" outlined dense hide-details></v-text-field>
							</v-flex>
							<v-flex xs3>
								<v-text-field v-model="dataFim" type="date" label="Data Final" outlined dense hide-details></v-text-field>
							</v-flex>
							<v-flex xs1>
								<v-btn @click="createGraph" color="primary" depressed>
									Pesquisar
								</v-btn>
							</v-flex>
						</v-layout>
						<v-layout>
							<v-flex xs12 style="display: flex; justify-content: center; padding: 25px">
								<apexchart :key="update" width="500" type="line" :options="chartOptions" :series="series"></apexchart>
							</v-flex>
						</v-layout>
					</v-card>
				</v-flex>
				<v-spacer></v-spacer>
			</v-layout>
		</div>
		<Footer />
	</div>
</template>
<script>
	import Menu from "../components/Menu.vue";
	import Footer from "../components/Footer.vue";
	import CompraProdutoService from "../service/compra_produtos";
	import produtosService from "../service/produtos.js";

	export default {
		data: () => ({
			dataInicial: '2021-10-22',
			dataFim: '2022-10-22',
			chartOptions: {
				chart: {
					id: 'wallet'
				},
				xaxis: {
					categories: []
				}
			},
			series: [],
			produtosEscolhidos: [],
			produtos: [],
			update: false,
		}),
		components: {
			Menu,
			Footer,
		},
		created() {
			this.getProdutos();
		},
		methods: {
			getProdutos(){
				produtosService.list().then((response) => {
					this.produtos = response.data;
				});
			},
			getHeader(){
				return CompraProdutoService.graphData(this.dataInicial,this.dataFim).then((response) => {
					this.chartOptions.xaxis.categories = response.data.map((item) => item.split('-')[2]+'/'+item.split('-')[1]+'/'+item.split('-')[0]);
					const dataUnfiltered = response.data;
					this.series = [];
					const data = this.chartOptions.xaxis.categories.map(() => (0));
					this.produtosEscolhidos.forEach(async (produto) => {
						await CompraProdutoService.graphProduto(produto.id,this.dataInicial,this.dataFim).then((responseP) => {
							var template = [...data];
							template.forEach((item, index) => {
								const indexA = responseP.data.findIndex((item) => item[1] == dataUnfiltered[index]);
								if(indexA != -1){
									template[index] = responseP.data[indexA][0];
								}
							});
							this.series.push({
								name: produto.nome,
								data: template
							});
						});
					})
					this.update = !this.update;
				}).catch((error) => {
					console.log(error);
				});
			},
			async createGraph(){
				await this.getHeader();
			}
		}
	};
</script>
      