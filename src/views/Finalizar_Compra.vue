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
                            {{cardSelect.descricao}}
                            </span>
                            <v-btn @click="openCard" outlined>
                              Cartão 1
                              <v-icon> credit_card </v-icon>
                            </v-btn>
                          </div>
                          <div v-if="quantiCartao == 2" style="margin-left: 80px">
                            <v-btn @click="openCard" outlined>
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
                            <v-btn @click="openEnd" outlined>
                              Endereços
                              <v-icon> home </v-icon>
                            </v-btn>
                          </div>
                          <div style="margin-left: 80px">
                            <v-btn @click="openEnd" outlined>
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
              <v-divider></v-divider>
              <h3 style="padding: 15px">Desconto</h3>
              <v-layout class="justify-center" style="padding: 7px">
                <div style="padding: 15px">
                  <v-btn color="green" @click="openEnd">
                    Ver meus Cupons
                    <v-icon> percent </v-icon>
                  </v-btn>
                </div>
              </v-layout>
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
            <v-layout style="padding: 20px" class="justify-center">
              <v-btn class="white--text" color="blue" text-color="white" @click="openEnd"> Finalizar Pedido </v-btn>
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
          <v-btn @click="dialogCard = false" text color="error"> Fechar </v-btn>
          <v-btn @click="selectCard" :disabled="!selectedCard || selectedCard.id == null ? true : false" text color="primary"> Escolher Cartão</v-btn>
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
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar top :color="error == true ? 'error' : 'green'" v-model="snackbar">
      <span v-if="error == false"> Alterações realizadas com sucesso </span>
      <span v-else> Ocorreu um erro </span>
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
import router from "@/router";

export default {
  name: "fin_compra",
  data: (vm) => ({
    items: ["Masculino", "Feminino"],
    TipoTelefone: ["Residencial", "Móvel"],
    menu1: false,
    menu2: false,
    dialogCard: false,
    dialogEnd: false,

    quantiCartao: 1,

    inativar: false,
    altSenha: false,

    enderecos: [],
    cartoes: [],
    snackbar: false,
    error: false,
    cliente: {},
    title: "",
    open: [],
    active: [],
    activeEnd: [],
    select: {},
    rules: [(v) => !!v || "Campo Obrigatório"],
    carrinho: [],
    cardSelect: {},
    cardSelect2: {},
    compra: {},
  }),
  components: {
    Menu,
    Footer,
  },
  mounted() {
    this.cliente = JSON.parse(localStorage.getItem("cliente"));
    this.carrinho = JSON.parse(localStorage.getItem('cart'));
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

    selectedCard() {
      if (!this.active.length) return undefined;
      const id = this.active[0];
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
    selectCard(){
      this.cardSelect = this.selectedCard;
      this.dialogCard = false;
    },

    cartaoList() {
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
    openEnd() {
      this.enderecoList();
      this.dialogEnd = true;
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
