<template>
	<div>
		<Menu />
		<div width="100%" style="padding: 50px">
			<v-layout>
				<v-flex xs4 style="margin-left: 30%">
					<v-card elevation="10" class="justify-center">
						<v-card-title class="justify-center"> Finalização de Compra </v-card-title>
						<v-divider></v-divider>
						<v-card-text>
							<h3 style="padding: 15px">Cupons</h3>
							<v-layout class="justify-center" style="padding: 7px">
								<!-- <div style="padding: 15px">
									<v-autocomplete return-object v-model="cupom" item-text="descricao" value="id" :items="cupons" label="Cupons Disponíveis" ></v-autocomplete>
								</div> -->
								<v-flex xs12 style="height: 250px; overflow-y: scroll;">
									<v-data-table :headers="headers" :hide-default-footer="true" :items="cupons">
										<template v-slot:no-data>
											Não há cupons cadastrados
										</template>
										<template v-slot:item.checkbox="{ item, index }">
											<v-checkbox :disabled="!item.luso && totcupom>total" @click="checkCupons(index)"></v-checkbox>
										</template>
									</v-data-table>
								</v-flex>
							</v-layout>
							<v-divider></v-divider>
							<h3>Pagamento</h3>
							<div style="padding: 5px">
								<v-layout>
									<v-flex xs12>
										<div class="text-xs-center">
											<v-layout>
												<p>Deseja pagar a compra com quantos cartões?</p>
												<v-spacer></v-spacer>
												<v-flex xs3>
													<v-select v-model="quantiCartao" :items="[1,2]" label="Quant. de Cartões"></v-select>
												</v-flex>
											</v-layout>
											<v-layout style="margin-bottom: 20px">
												<v-layout style="padding: 7px">
													<div>
														<span v-if="cardSelect">
															{{cardSelect.nome}}
														</span>
														<br/>
														<v-btn @click="openCard" outlined>
															Cartão 1
															<v-icon> credit_card </v-icon>
														</v-btn>
													</div>
													<div v-if="quantiCartao == 2" style="margin-left: 80px">
														<span v-if="cardSelect2">
															{{cardSelect2.nome}}
														</span>
														<br/>
														<v-btn @click="openCard2" outlined>
															Cartão 2
															<v-icon> credit_card </v-icon>
														</v-btn>
													</div>
												</v-layout>
											</v-layout>
											<v-divider></v-divider>
											<h3 style="margin-bottom: 5px; padding: 15px">Entrega</h3>
											<v-layout>
												<p>Endereço de Entrega:</p>
												<p style="margin-left: 80px">Endereço de Cobrança:</p>
											</v-layout>
											<v-layout>
												<v-layout style="padding: 7px">
													<div>
														<span>
															{{endSelect.endereco}}
														</span>
														<br/>
														<v-btn @click="openEnd" outlined>
															Endereços
															<v-icon> home </v-icon>
														</v-btn>
													</div>
													<div style="margin-left: 80px">
														<span>
															{{endSelect2.endereco}}
														</span>
														<br/>
														<!--não esta funcionando-->
														<v-btn @click="openEnd2" outlined>
															Endereços
															<v-icon> home </v-icon>
														</v-btn>
													</div>
												</v-layout>
											</v-layout>
										</div>
									</v-flex>
								</v-layout>
							</div>
						</v-card-text>
					</v-card>
				</v-flex>
				<v-spacer> </v-spacer>
				<v-flex xs4>
					<v-card-text>
						<div v-for="(produto, index) in carrinho" :key="index">
							<v-layout style="padding: 20px">
								<v-flex xs12>
									<div class="text-xs-center">
										<v-layout class="d-flex flex-row">
											<h2>Carteira {{produto.tipo}} - Modelo {{produto.nome}}</h2>
											<v-spacer>
											</v-spacer>
											<h2 class="green--text">R$ {{produto.preco}}</h2>
										</v-layout>
										<v-layout>
											Quantidade : {{produto.quantidade}}
										</v-layout>
									</div>
								</v-flex>
							</v-layout>
							<v-divider></v-divider>
						</div>
						<v-layout>
							<v-flex xs12 style="padding-left: 20px">
								<div class="text-xs-center">
									<h2 class="green--text">Subtotal: R$ {{total}}
									</h2>
									<h2 class="green--text">Frete: R$ {{frete}}.00
									</h2>
									<h2 class="green--text">Total: R$ {{total + frete}} 
									</h2>
								</div>
							</v-flex>
						</v-layout>
						<v-layout style="padding: 20px" class="justify-center">
							<v-btn class="white--text" color="blue" text-color="white" @click="saveCompra"> Finalizar Pedido </v-btn>
						</v-layout>
					</v-card-text>
				</v-flex>
			</v-layout>
		</div>

		<v-dialog width="1000" v-model="dialogCard">
			<v-card>
				<v-card-title class="black white--text text-h5">
					{{ title }}
					<v-spacer> </v-spacer>
					<v-btn @click="novoCartao" fab color="white">
						<v-icon color="black"> add </v-icon>
					</v-btn>
				</v-card-title>
				<v-row class="pa-4" justify="space-between">
					<v-col cols="5">
							<v-treeview key="id" :active.sync="active" item-text="nome" activatable :items="cartoes" color="black" open-on-click transition>
								<template v-slot:prepend="{ item }">
									<v-icon v-if="!item.children && item.id != null"> credit_card </v-icon>
									<v-icon v-else> clear </v-icon>
								</template>
								<template v-slot:append="{ item }">
									<v-tooltip bottom v-if="item.id == cliente.cartaoFavId">
										<template v-slot:activator="{ on }">
										<v-icon v-on="on"> star </v-icon>
										</template>
										<span>
											Seu cartão favorito
										</span>
									</v-tooltip>
								</template>
							</v-treeview>
					</v-col>
					<v-divider vertical></v-divider>
					<v-col class="d-flex text-center">
						<v-scroll-y-transition mode="out-in">
							<div v-if="!selectedCard || selectedCard.id == null" class="text-h6 grey--text text--lighten-1 font-weight-light" style="align-self: center">Escolha um Cartão</div>
							<v-card v-else :key="selectedCard.id" class="pt-6 mx-auto" flat max-width="400">
								<v-card-text>
									<h3 class="text-h5 mb-2">
										{{ selectedCard.nome }}
									</h3>
									<div class="blue--text mb-2">
										{{ selectedCard.numero }}
									</div>
									<div class="blue--text subheading font-weight-bold">
										{{ selectedCard.validade }}
									</div>
								</v-card-text>
								<v-divider></v-divider>
								<v-row class="text-left" tag="v-card-text">
									<v-col class="text-right mr-4 mb-2" tag="strong" cols="5"> CVV: </v-col>
									<v-col>
										{{ selectedCard.cvv }}
									</v-col>
									<v-col class="text-right mr-4 mb-2" tag="strong" cols="5"> CPF: </v-col>
									<v-col>
										{{ selectedCard.cpf }}
									</v-col>
									<v-col class="text-right mr-4 mb-2" tag="strong" cols="5"> Bandeira: </v-col>
									<v-col>
										{{ selectedCard.bandeira }}
									</v-col>
								</v-row>
							</v-card>
						</v-scroll-y-transition>
					</v-col>
				</v-row>

				<v-card-actions>
					<v-spacer> </v-spacer>
					<v-scroll-y-transition mode="out-in">
						<v-flex xs2>
							<v-form ref="form">
								<v-text-field v-model="priceCard1" :rules="emptyRules.concat([(v) => (v >= 10 || this.cupons.find((c) => c.luso == true) != undefined) || 'Valor mínimo de R$10,00'])" label="Preço a Pagar"/>
							</v-form>
						</v-flex>
					</v-scroll-y-transition>
					<v-btn @click="dialogCard = false" text color="error"> Fechar </v-btn>
					<v-btn @click="selectCard" :disabled="!selectedCard || selectedCard.id == null ? true : false" text color="primary"> Escolher Cartão</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<v-dialog width="1000" v-model="dialogCard2">
			<v-card>
				<v-card-title class="black white--text text-h5">
					{{ title }}
					<v-spacer> </v-spacer>
					<v-btn @click="novoCartao" fab color="white">
						<v-icon color="black"> add </v-icon>
					</v-btn>
				</v-card-title>
				<v-row class="pa-4" justify="space-between">
					<v-col cols="5">
							<v-treeview key="id" :active.sync="active2" item-text="nome" activatable :items="cartoes" color="black" open-on-click transition>
								<template v-slot:prepend="{ item }">
									<v-icon v-if="!item.children && item.id != null"> credit_card </v-icon>
									<v-icon v-else> clear </v-icon>
								</template>
								<template v-slot:append="{ item }">
									<v-tooltip bottom v-if="item.id == cliente.cartaoFavId">
										<template v-slot:activator="{ on }">
										<v-icon v-on="on"> star </v-icon>
										</template>
										<span>
											Seu cartão favorito
										</span>
									</v-tooltip>
								</template>
							</v-treeview>
					</v-col>
					<v-divider vertical></v-divider>
					<v-col class="d-flex text-center">
						<v-scroll-y-transition mode="out-in">
							<div v-if="!selectedCard2 || selectedCard2.id == null" class="text-h6 grey--text text--lighten-1 font-weight-light" style="align-self: center">Escolha um Cartão</div>
							<v-card v-else :key="selectedCard2.id" class="pt-6 mx-auto" flat max-width="400">
								<v-card-text>
									<h3 class="text-h5 mb-2">
										{{ selectedCard2.nome }}
									</h3>
									<div class="blue--text mb-2">
										{{ selectedCard2.numero }}
									</div>
									<div class="blue--text subheading font-weight-bold">
										{{ selectedCard2.validade }}
									</div>
								</v-card-text>
								<v-divider></v-divider>
								<v-row class="text-left" tag="v-card-text">
									<v-col class="text-right mr-4 mb-2" tag="strong" cols="5"> CVV: </v-col>
									<v-col>
										{{ selectedCard2.cvv }}
									</v-col>
									<v-col class="text-right mr-4 mb-2" tag="strong" cols="5"> CPF: </v-col>
									<v-col>
										{{ selectedCard2.cpf }}
									</v-col>
									<v-col class="text-right mr-4 mb-2" tag="strong" cols="5"> Bandeira: </v-col>
									<v-col>
										{{ selectedCard2.bandeira }}
									</v-col>
								</v-row>
							</v-card>
						</v-scroll-y-transition>
					</v-col>
				</v-row>

				<v-card-actions>
					<v-spacer> </v-spacer>
					<v-scroll-y-transition mode="out-in">
						<v-flex xs2>
							<v-form ref="form">
								<v-text-field v-model="priceCard2" :rules="emptyRules.concat([(v) => (v >= 10 || this.cupons.find((c) => c.luso == true) != undefined) || 'Valor mínimo de R$10,00'])" label="Preço a Pagar"/>
							</v-form>
						</v-flex>
					</v-scroll-y-transition>
					<v-btn @click="dialogCard2 = false" text color="error"> Fechar </v-btn>
					<v-btn @click="selectCard2" :disabled="!selectedCard2 || selectedCard2.id == null ? true : false" text color="primary"> Escolher Cartão</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<v-dialog width="1000" v-model="dialogEnd">
			<v-card>
				<v-card-title class="black white--text text-h5">
					{{ title }}
					<v-spacer> </v-spacer>
					<v-btn @click="novoEndereco" fab color="white">
						<v-icon color="black"> add </v-icon>
					</v-btn>
				</v-card-title>
				<v-row class="pa-4" justify="space-between">
					<v-col cols="5">
						<v-treeview key="id" :active.sync="activeEnd" item-text="tipo_residencia" activatable :items="enderecos" color="black" open-on-click transition>
							<template v-slot:prepend="{ item }">
								<v-icon v-if="!item.children"> home </v-icon>
							</template>
						</v-treeview>
					</v-col>
					<v-divider vertical></v-divider>
					<v-col class="d-flex text-center">
						<v-scroll-y-transition mode="out-in">
							<div v-if="!selectedEnd" class="text-h6 grey--text text--lighten-1 font-weight-light" style="align-self: center">Escolha um Endereço</div>
							<v-card v-else :key="selectedEnd.id" class="pt-6 mx-auto" flat max-width="400">
								<v-card-text>
									<h3 class="text-h5 mb-2">
										{{ selectedEnd.tipo_residencia }}
									</h3>
									<div class="blue--text mb-2">
										{{ selectedEnd.tipo_logradouro }}
									</div>
									<div class="blue--text subheading font-weight-bold">
										{{ selectedEnd.pais }}
									</div>
									<div class="blue--text subheading font-weight-bold">
										{{ selectedEnd.estado }}
									</div>
									<div class="blue--text subheading font-weight-bold">
										{{ selectedEnd.cep }}
									</div>
								</v-card-text>
								<v-divider></v-divider>
								<v-row class="text-left" tag="v-card-text">
									<v-col class="text-right mr-4 mb-2" tag="strong" cols="5"> Logradouro: </v-col>
									<v-col>
										{{ selectedEnd.endereco }}
									</v-col>
									<v-col class="text-right mr-4 mb-2" tag="strong" cols="5"> bairro: </v-col>
									<v-col>
										{{ selectedEnd.bairro }}
									</v-col>
									<v-col class="text-right mr-4 mb-2" tag="strong" cols="5"> numero: </v-col>
									<v-col>
										{{ selectedEnd.numero }}
									</v-col>
									<v-col class="text-right mr-4 mb-2" tag="strong" cols="5"> cidade: </v-col>
									<v-col>
										{{ selectedEnd.cidade }}
									</v-col>
									<v-col class="text-right mr-4 mb-2" tag="strong" cols="5"> estado: </v-col>
									<v-col>
										{{ selectedEnd.estado }}
									</v-col>
								</v-row>
							</v-card>
						</v-scroll-y-transition>
					</v-col>
				</v-row>

				<v-card-actions>
					<v-spacer> </v-spacer>
					<v-btn @click="dialogEnd = false" text color="error"> Fechar </v-btn>
					<v-btn @click="selectEnd" :disabled="!selectedEnd || selectedEnd.id == null ? true : false" text color="primary"> Escolher Endereço</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<v-dialog width="1000" v-model="dialogEnd2">
			<v-card>
				<v-card-title class="black white--text text-h5">
					{{ title }}
					<v-spacer> </v-spacer>
					<v-btn @click="novoEndereco" fab color="white">
						<v-icon color="black"> add </v-icon>
					</v-btn>
				</v-card-title>
				<v-row class="pa-4" justify="space-between">
					<v-col cols="5">
						<v-treeview key="id" :active.sync="activeEnd2" item-text="tipo_residencia" activatable :items="enderecos" color="black" open-on-click transition>
							<template v-slot:prepend="{ item }">
								<v-icon v-if="!item.children"> home </v-icon>
							</template>
						</v-treeview>
					</v-col>
					<v-divider vertical></v-divider>
					<v-col class="d-flex text-center">
						<v-scroll-y-transition mode="out-in">
							<div v-if="!selectedEnd2" class="text-h6 grey--text text--lighten-1 font-weight-light" style="align-self: center">Escolha um Endereço</div>
							<v-card v-else :key="selectedEnd2.id" class="pt-6 mx-auto" flat max-width="400">
								<v-card-text>
									<h3 class="text-h5 mb-2">
										{{ selectedEnd2.tipo_residencia }}
									</h3>
									<div class="blue--text mb-2">
										{{ selectedEnd2.tipo_logradouro }}
									</div>
									<div class="blue--text subheading font-weight-bold">
										{{ selectedEnd2.pais }}
									</div>
									<div class="blue--text subheading font-weight-bold">
										{{ selectedEnd2.estado }}
									</div>
									<div class="blue--text subheading font-weight-bold">
										{{ selectedEnd2.cep }}
									</div>
								</v-card-text>
								<v-divider></v-divider>
								<v-row class="text-left" tag="v-card-text">
									<v-col class="text-right mr-4 mb-2" tag="strong" cols="5"> Logradouro: </v-col>
									<v-col>
										{{ selectedEnd2.endereco }}
									</v-col>
									<v-col class="text-right mr-4 mb-2" tag="strong" cols="5"> bairro: </v-col>
									<v-col>
										{{ selectedEnd2.bairro }}
									</v-col>
									<v-col class="text-right mr-4 mb-2" tag="strong" cols="5"> numero: </v-col>
									<v-col>
										{{ selectedEnd2.numero }}
									</v-col>
									<v-col class="text-right mr-4 mb-2" tag="strong" cols="5"> cidade: </v-col>
									<v-col>
										{{ selectedEnd2.cidade }}
									</v-col>
									<v-col class="text-right mr-4 mb-2" tag="strong" cols="5"> estado: </v-col>
									<v-col>
										{{ selectedEnd2.estado }}
									</v-col>
								</v-row>
							</v-card>
						</v-scroll-y-transition>
					</v-col>
				</v-row>

				<v-card-actions>
					<v-spacer> </v-spacer>
					<v-btn @click="dialogEnd2 = false" text color="error"> Fechar </v-btn>
					<v-btn @click="selectEnd2" :disabled="!selectedEnd2 || selectedEnd2.id == null ? true : false" text color="primary"> Escolher Endereço</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<v-snackbar top :color="error == true ? 'error' : 'green'" v-model="snackbar">
			<span v-if="error == false"> Pedido finalizado com sucesso </span>
			<span v-else> Ocorreu um erro </span>
		</v-snackbar>
		
		<v-snackbar top :color="error == true ? 'error' : 'green'" v-model="snackbarPreco">
			<span> Configurar cartões para pagar o valor total </span>
		</v-snackbar>

		<v-snackbar top :color="error == true ? 'error' : 'green'" v-model="snackbarValidade">
			<span> Demorou mais de uma semana para a finalização da compra, por favor adicione novamente os produtos ao carrinho </span>
		</v-snackbar>

		<v-snackbar top :color="error == true ? 'error' : 'green'" v-model="snackbarEstoque">
			<span> Não é possível comprar {{produtoEstoque.nome}} por problemas de estoque </span>
		</v-snackbar>
		<Footer />
	</div>
</template>

<script>
import Menu from "../components/Menu.vue";
import Footer from "../components/Footer.vue";
import clienteService from "@/service/clientes";
import cartaoService from "@/service/cartoes";
import enderecoService from "@/service/enderecos";
import compraService from "@/service/compra";
import cupomService from "@/service/cupom";
import compraProdutoService from "@/service/compra_produtos";
import produtoService from "../service/produtos";
import router from "@/router";

export default {
	name: "fin_compra",
	data: (vm) => ({
		items: ["Masculino", "Feminino"],
		cupons: [],
		cupom:{},
		TipoTelefone: ["Residencial", "Móvel"],
		menu1: false,
		menu2: false,
		dialogCard: false,
		dialogCard2: false,
		dialogEnd: false,
		dialogEnd2: false,

		emptyRules: [(v) => !!v || "Campo Obrigatório"],

		quantiCartao: 1,

		inativar: false,
		altSenha: false,

		enderecos: [],
		cartoes: [],
		snackbar: false,
		snackbarPreco: false,
		snackbarValidade: false,
		error: false,
		cliente: {},
		title: "",
		open: [],
		active: [],
		active2: [],
		activeEnd: [],
		activeEnd2: [],
		select: {},
		rules: [(v) => !!v || "Campo Obrigatório"],
		carrinho: [],
		endSelect: {},
		endSelect2: {},	
		cardSelect: {},
		cardSelect2: {},
		priceCard1: 0,
		priceCard2: 0,
		total: 0,
		totcupom: 0,
		compra: {},
		frete:0,

		headers: [
			{ text: "Descrição", value: "descricao" },
			{text: "Valor",value: "valor"},
			{text: "",value: "checkbox", sortable: false},
		],
		snackbarEstoque: false,
		produtoEstoque: {},
	}),
	components: {
		Menu,
		Footer,
	},
	mounted() {
		this.frete = JSON.parse(localStorage.getItem("frete"));
		this.cliente = JSON.parse(localStorage.getItem("cliente"));
		this.carrinho = JSON.parse(localStorage.getItem('cart'));
		this.frete = JSON.parse(localStorage.getItem('frete'));
		this.listCupons();
		this.carrinho.forEach((item) => {
			this.total += parseFloat((parseFloat(item.preco) * parseInt(item.quantidade)).toFixed(2));
		});
		this.total += this.frete;
	},
	computed: {
		selected() {
			if (!this.active.length) return undefined;
			const id = this.active[0];
			return this.cartoes.find((cartao) => cartao.id === id);
		},

		selectedEnd() {
			if (!this.activeEnd.length) return undefined;
			const id = this.activeEnd[0];
			return this.enderecos.find((endereco) => endereco.id === id);
		},

		selectedEnd2() {
			if (!this.activeEnd2.length) return undefined;
			const id = this.activeEnd2[0];
			return this.enderecos.find((endereco) => endereco.id === id);
		},

		selectedCard() {
			if (!this.active.length) return undefined;
			const id = this.active[0];
			return this.cartoes.find((cartao) => cartao.id === id);
		},

		selectedCard2() {
			if (!this.active2.length) return undefined;
			const id = this.active2[0];
			return this.cartoes.find((cartao) => cartao.id === id);
		},

	},

	watch: {
		dialog(val) {
			if (val) {
			} else {
				this.close();
			}
		},
	},

	methods: {
		checkCupons(index){
			if(this.cupons[index]?.luso != undefined)
				this.cupons[index].luso = !this.cupons[index].luso;
			else
				this.cupons[index].luso = true;

			const array1 = this.cupons.map((item) => item.valor);
			const initialValue = 0;
			const sumWithInitial = array1.reduce(
				(previousValue, currentValue, index) => {
					if(this.cupons[index].luso)
						return (parseFloat(previousValue) + parseFloat(currentValue)).toFixed(2)
					else
						return parseFloat(previousValue)
				},
				initialValue
			);
			this.totcupom = sumWithInitial;
		},

		listCupons() {
			cupomService.listByClienteId(this.cliente.id).then((response) => {
				response.data.forEach((element) => {
					if(element.status == "ATIVO"){
						element.descricao = element.descricao + " - " + element.valor;
						this.cupons.push(element);
					}
				});
			});
		},

		async saveCompra(){
			var data = new Date();

			if(this.total+this.frete > (parseFloat(this.priceCard1) + parseFloat(this.priceCard2) + parseFloat(this.totcupom)).toFixed(2)){
				this.error = true;
				this.snackbarPreco = true;
				return;
			}

			if(localStorage.getItem('cartValidade')){
				const diff = new Date().getTime() - new Date(localStorage.getItem('cartValidade')).getTime();
				const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
				console.log(days)
				if(days >= 7){
					localStorage.removeItem('cart');
					localStorage.removeItem('cartValidade');
					this.error = true;
					this.snackbarValidade = true;
					return;
				}
			}
			this.compra = {
				clienteId: this.cliente.id,
				status: 'EM ANÁLISE',
				data_comp: data.getFullYear() + '-' + (data.getMonth()+1) + '-' + data.getDate(),
				metodo: this.cardSelect.numero,
				metodo2: this.quantiCartao == 2 ? this.cardSelect2.numero : null,
				endereco: this.endSelect.id,
				enderecoCobranca: this.endSelect2.id,
				cupomId: this.cupom != null ? this.cupom.id : '-1',
				valor: this.total + this.frete,
				metodoPreco: this.priceCard1,
				metodo2Preco: this.priceCard2,
				// compraProduto: newCart,
			};

			var lEstoque = true;
			var oldProdutos = [];
			for(const c of this.carrinho){
				await produtoService.listById(c.id).then((response) => {
					if((response.data.quantidade <= 0 || c.quantidade > response.data.quantidade) && lEstoque){
						lEstoque = false;
						this.error = true;
						this.snackbarEstoque = true;
						this.produtoEstoque = response.data;
					}else
						oldProdutos.push(response.data);
				})
			}

			if(!lEstoque)
				return;

			compraService.save(this.compra).then((r) => {
				var newCart = [];
				this.carrinho.forEach((item) => {
					const produto = oldProdutos.find((p) => p.id == item.id);
					produtoService.update({...produto, quantidade: produto.quantidade - Number(item.quantidade)}).catch((e) => {
						console.log(e);
					});
					newCart.push({
						compraid: r.data.id,
						produtoid: item.id,
						quantidade: item.quantidade,
					})
				});
				compraProdutoService.save(newCart).then((r) => {
					localStorage.removeItem('cart');
					localStorage.removeItem('cartValidade');
					this.error = false;
					this.snackbar = true;

					setTimeout(() => {
						localStorage.removeItem('cart');
						localStorage.removeItem('cartValidade');
						this.$router.push({ path: '/cliente' });
					}, 1500);
				}).catch(() => {
					this.error = true;
					this.snackbar = true;
				});

				console.log(this.cliente.ranking)
				console.log(this.cliente.ranking + parseInt(this.total))
				clienteService.update({...this.cliente, ranking: this.cliente.ranking + parseInt(this.total)}).then(() => {
					localStorage.setItem("cliente", JSON.stringify({...this.cliente, ranking: this.cliente.ranking + parseInt(this.total)}));
				});

				this.cupons.forEach((item) => {
					if(item.luso){
						item.status = "INATIVO";
						cupomService.update(item)
					}
				});

				if(this.total + this.frete < (parseFloat(this.priceCard1) + parseFloat(this.priceCard2) + parseFloat(this.totcupom)).toFixed(2)){
					const cupom = {
						id: null,
						valor: ((parseFloat(this.priceCard1) + parseFloat(this.priceCard2) + parseFloat(this.totcupom)).toFixed(2) -  parseFloat(this.total+this.frete)),
						clienteId: JSON.parse(localStorage.getItem("cliente")).id,
						descricao: "TROCA",
						status: 'ATIVO',
					};
					cupomService.save(cupom)
				}
				cupomService.update(this.cupom)
			})
		},
		selectEnd(){
			this.endSelect = this.selectedEnd;
			this.dialogEnd = false;
		},
		selectEnd2(){
			this.endSelect2 = this.selectedEnd2;
			this.dialogEnd2 = false;
		},
		selectCard(){
			if(this.$refs.form.validate()){
				this.cardSelect = this.selectedCard;
				this.dialogCard = false;
			}
		},

		selectCard2(){
			if(this.$refs.form.validate()){
				this.cardSelect2 = this.selectedCard2;
				this.dialogCard2 = false;
			}
		},

		cartaoList(){
			cartaoService.listClienteId(JSON.parse(localStorage.getItem("cliente")).id).then((response) => {
				this.cartoes = response.data;
			});
		},

		enderecoList() {
			enderecoService.listClienteId(JSON.parse(localStorage.getItem("cliente")).id).then((response) => {
				this.enderecos = response.data;
			});
		},

		novoEndereco() {
			localStorage.removeItem("endereco");
			this.$router.push({ path: "/endereco_cadastro" });
		},

		novoCartao() {
			localStorage.removeItem("cartao");
			this.$router.push({ path: "/cartao_cadastro" });
		},

		EditarItemEnd(item) {
			localStorage.setItem("endereco", JSON.stringify(item));
			this.$router.push({ path: "/endereco_cadastro" });
		},

		EditarCard(item) {
			localStorage.removeItem("cartao");
			localStorage.setItem("cartao", JSON.stringify(item));
			this.$router.push({ path: "/cartao_cadastro" });
		},

		openCard() {
			this.cartaoList();
			this.dialogCard = true;
			this.title = "Cartões";
		},
		
		openCard2() {
			this.cartaoList();
			this.dialogCard2 = true;
			this.title = "Cartões";
		},

		openEnd() {
			this.enderecoList();
			this.dialogEnd = true;
			this.title = "Endereços";
		},
		openEnd2() {
			this.enderecoList();
			this.dialogEnd2 = true;
			this.title = "Endereços";
		},
	},
};
</script>
<style scoped>
.v-text-field {
	padding: 10px;
}
.row {
	margin: 0;
}
</style>
