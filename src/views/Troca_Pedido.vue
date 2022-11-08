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
				<tr v-for="(item, i) in pedidos" :key="item.produtoid">
					<td :key="item.imagem"><img style="width: 50px; height: 50px" :src="produtos[i].imagem"></td>
					<td>{{ produtos[i].nome }}</td>
					<td>
						<div style="display: flex; align-items: center; width: 80px">
							<v-text-field style="width: 30px" v-model="item.quantTroca" :rules="[(value) => value <= item.quantidade]" type="number"/>
							{{ (item.preco * item.quantTroca).toFixed(2) }}
						</div>
					</td>
				</tr>
			</tbody>
			</template>
		</v-simple-table>
	</v-layout>
	<v-layout>
		<v-flex xs12 style="display: flex; justify-content: center; color: green">
			{{this.pedidos.reduce((ant, nov, i) => (parseFloat(ant) + parseFloat(nov.preco * nov.quantTroca)).toFixed(2), 0)}}
		</v-flex>
	</v-layout>
            <v-divider></v-divider>
            <v-layout class="justify-center">
              <v-flex xs8>
                <h4>Motivo da troca:</h4>
                <v-col cols="12">
                  <v-textarea v-model="motivo" color="teal"></v-textarea>
                </v-col>
              </v-flex>
            </v-layout>
            <v-layout class="justify-center">
              <v-col style="flex-grow: 0; margin-right: 10px">
                <v-btn @click="update()" color="yellow" class="black--text"> Confirmar Troca </v-btn>
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
	 produtos: [],
	 motivo: ''
  }),
  components: {
	Menu,
	Footer,
  },
  
  mounted() {
		if(this.$route.params.id)
			this.list(this.$route.params.id);
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
				this.pedidos = response.data.map((value) => ({...value, quantTroca: value.quantidade}));
				this.pedidos.forEach((element, index) => {
					ProdutoService.listById(element.produtoid).then((response) => {
						let produto = response.data;
						this.produtos.push(produto);
						element.preco = produto.preco;
						this.$forceUpdate();
					});
				});
			});
			this.$forceUpdate();
		},
		update(){
			const valorTroca = this.pedidos.reduce((ant, nov, i) => parseFloat(ant) + parseFloat(nov.preco * nov.quantTroca), 0);
			const pedido = {
				...this.compra,
				status: 'EM TROCA',
				motivoTroca: this.motivo,
				valorTroca: valorTroca,
			}
			CompraService.update(pedido).then(() => {
				this.$router.push('/cliente');
			});
		}
  },
};
</script>

<style scoped>
.row {
  margin: 0px 0px 0px;
}
</style>
