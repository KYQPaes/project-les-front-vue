<template>
  <div>
	 <Menu />

	 <!-- style=";display: flex;flex-direction: column;align-items: center;" -->

	 <v-card :style="{ backgroundImage: 'url(https://wallpaperscute.com/wp-content/uploads/2018/07/Graffiti-Wall-Desktop-Backgrounds-HD.jpg)', backgroundSize: 'cover', display: 'flex', flexDirection: 'column', alignItems: 'center' }">
		<div style="background-color: white; min-width: 55vw; display: flex; flex-direction: column; align-items: center">
		  <v-layout class="justify-center" style="width: 100%; padding-top: 20px">
			 <h2 class="blue--text">Detalhes do Pedido ID</h2>
		  </v-layout>
		  <v-layout class="d-flex align-center" style="width: 100%; margin-top: 15px">
			 <v-flex>
				<v-layout>
				  <v-flex xs4>
					 <v-layout class="justify-center" style="padding: 7px">
						<h2 style="margin-left: 40px">Data da Compra</h2>
					 </v-layout>
					 <v-layout class="justify-center" style="padding: 7px">
						<p style="margin-left: 40px">{{compra.formated_data}}</p>
					 </v-layout>
				  </v-flex>

				  <v-flex xs4>
					 <v-layout class="justify-center" style="padding: 7px">
						<h2 style="margin-left: 40px">Status do Pedido</h2>
					 </v-layout>
					 <v-layout class="justify-center" style="padding: 7px">
						<p style="margin-left: 40px">{{compra.status}}</p>
					 </v-layout>
					 <v-layout class="justify-center" style="padding: 7px">
						<h2 style="margin-left: 40px">Endereços</h2>
					 </v-layout>
					 <v-layout>
						 <v-flex xs6>
							<v-layout class="justify-center" style="padding: 7px">
								<h4 style="margin-left: 40px">Entrega</h4>
							</v-layout>
							<v-layout class="justify-center" style="padding: 7px">
								<p style="margin-left: 40px">{{compra.endereco}}</p>
							</v-layout>
						 </v-flex>
						 <v-flex xs6>
							<v-layout class="justify-center" style="padding: 7px">
								<h4 style="margin-left: 40px">Cobrança</h4>
							</v-layout>
							<v-layout class="justify-center" style="padding: 7px">
								<p style="margin-left: 40px">Trabalho</p>
							</v-layout>
						 </v-flex>
					 </v-layout>
				  </v-flex>

				  <v-flex xs4>
					 <v-layout class="justify-center" style="padding: 7px">
						<h2 style="margin-left: 40px">Pagamento</h2>
					 </v-layout>
					 <v-layout class="justify-center" style="padding: 7px">
						<p style="margin-left: 40px">{{compra.metodo}}</p>
					 </v-layout>
					 <v-layout v-if="compra.metodo2 != null" class="justify-center" style="padding: 7px">
						<p style="margin-left: 40px">{{compra.metodo2}}</p>
					 </v-layout>
					 <v-layout class="justify-center" style="padding: 7px">
						<h2 style="margin-left: 40px">Valor da Compra</h2>
					 </v-layout>
					 <v-layout v-if="compra.valor != null" class="justify-center" style="padding: 7px">
						<p style="margin-left: 40px">R${{compra.valor.toString().replace(/\./g, ',')}}</p>
					 </v-layout>
				  </v-flex>
				</v-layout>

				<v-divider style="margin-top: 50px"></v-divider>

				<v-layout class="justify-center">
				  <v-simple-table>
					 <template v-slot:default>
						<thead>
						  <tr>
							 <th class="text-left">Imagem</th>
							 <th class="text-left">Produto</th>
							 <th class="text-left">Quantidade</th>
						  </tr>
						</thead>
						<tbody>
						  <tr v-for="item in pedidos" :key="item.produtoid">
							 <td :key="item.imagem"><img :src="item.imagem"></td>
							 <td>{{ item.nome }}</td>
							 <td>{{ item.quantidade }}</td>
						  </tr>
						</tbody>
					 </template>
				  </v-simple-table>
				</v-layout>
				<v-divider></v-divider>

				<v-layout class="justify-center">
				  <v-col style="flex-grow: 0; margin-right: 10px">
					 <v-btn color="yellow" class="black--text">
						Requisitar Troca
						<v-icon> sync_alt </v-icon>
					 </v-btn>
				  </v-col>
				  <v-col style="flex-grow: 0; margin-right: 10px">
					 <v-btn outlined color="red" class="white--text">
						Cancelar Pedido
						<v-icon> report_problem </v-icon>
					 </v-btn>
				  </v-col>
				</v-layout>
				<v-divider></v-divider>
			 </v-flex>
		  </v-layout>
		</div>
	 </v-card>
	 <Footer />
  </div>
</template>

<script>
import Menu from "../components/Menu.vue";
import Footer from "../components/Footer.vue";
import CompraService from "../service/compra";
import CompraProdutoService from "../service/compra_produtos";
import ProdutoService from "../service/produtos";
export default {
  data: () => ({
	 compra: {},
	 pedidos: [],
  }),
  components: {
	 Menu,
	 Footer,
  },
  
  mounted() {
		if(this.$route.params.id)
			this.list(this.$route.params.id);
		else{}
			// this.$router.push('/consultaCliente'); retorna se ñ tiver id
  },

  methods: {
		list(id) {
			CompraService.findById(id).then((response) => {
				this.compra = response.data;
				let formated_data = this.compra.data_comp.split('-');
				this.compra.formated_data = formated_data[2].padStart(2, '0') + '/' + formated_data[1].padStart(2, '0') + '/' + formated_data[0];
				this.listCompraProdutos(this.compra.id);
			});
		},
		listCompraProdutos(compraid){
			CompraProdutoService.ListByCompraid(compraid).then((response) => {
				this.pedidos = response.data;
				this.pedidos.forEach((element, index) => {
					// this.listProdutos(element.produtoid, index);
					ProdutoService.listById(element.produtoid).then((response) => {
						let produto = response.data;
						this.pedidos[index].imagem = produto.imagem;
						this.pedidos[index].nome = produto.nome;
					});
				});
			}).then(()=>{
				console.log(this.pedidos)
			});
			this.$forceUpdate();
		},
  },
};
</script>

<style scoped>
.row {
  margin: 0px 0px 0px;
}
</style>
