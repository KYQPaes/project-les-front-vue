<template>
  <div>
    <Menu />
    <div width="100%" style="padding: 50px">
      <v-layout>
        <v-flex xs4 style="margin-left: 30%">
          <v-card elevation="10" class="justify-center">
            <v-card-title> Dados Cadastrais do Cliente </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-form ref="form">
                <v-layout>
                  <v-flex xs12>
                    <v-text-field v-model="cliente.nome" :rules="rules" label="Nome Completo"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs4>
                    <v-autocomplete v-model="cliente.genero" :items="items" label="Gênero"></v-autocomplete>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field type="date" :rules="rules" v-model="cliente.data_nasc" label="Data de Nascimento"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs4>
                    <!-- v-mask="'###.###.###.##'" -->
                    <v-text-field :rules="rules" type="CPF" v-model="cliente.cpf" label="CPF" />
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field :rules="rules" type="Endereço Residencial" v-model="cliente.endereco" label="Endereço Residencial" />
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs4>
                    <v-autocomplete :rules="rules" :items="TipoTelefone" v-model="cliente.tptelefone" label="Tipo de Telefone"></v-autocomplete>
                  </v-flex>
                  <v-flex xs2>
                    <v-text-field :rules="rules" type="DDD" label="DDD" v-model="cliente.ddd" />
                  </v-flex>
                  <v-flex xs4>
                    <!-- v-mask="cliente.tptelefone == 'Residencial' ? '####-####' : '9####-####'" -->
                    <v-text-field :rules="rules" type="Numero de Telefone" label="Numero de Telefone" v-model="cliente.telefone" />
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer> </v-spacer>
              <v-btn @click="update" color="blue" dark> Salvar Alterações </v-btn>
              <v-row justify="center">
                <v-dialog v-model="altSenha" persistent max-width="290">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="green" dark v-bind="attrs" v-on="on"> Alterar Senha </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="text-h5"> Confirmação? </v-card-title>
                    <v-card-text>Por favor confirme que realmente deseja alterar a senha desta conta</v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" text @click="altSenha = false"> Discordo </v-btn>
                      <v-btn
                        color="green darken-1"
                        text
                        @click="
                          () => {
                            this.$router.push({ path: '/senha_editar' });
                          }
                        "
                      >
                        Concordo
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-spacer> </v-spacer>
        <v-flex xs4>
          <v-layout style="padding: 7px">
            <v-btn @click="openPed" outlined>
              Pedidos
              <v-icon> shopping_cart </v-icon>
            </v-btn>
          </v-layout>
          <v-layout style="padding: 7px">
            <v-btn @click="openCard" outlined>
              Cartões
              <v-icon> credit_card </v-icon>
            </v-btn>
          </v-layout>
          <v-layout style="padding: 7px">
            <v-btn @click="openEnd" outlined>
              Endereços
              <v-icon> home </v-icon>
            </v-btn>
          </v-layout>
          <v-layout style="padding: 7px">
            Sua Pontuação: {{ cliente.ranking }} Pontos
          </v-layout>
          <v-layout style="margin-top: 200px">
            <v-dialog v-model="inativar" persistent max-width="350">
              <template v-slot:activator="{ on, attrs }">
                <v-btn rounded color="red" dark v-bind="attrs" v-on="on"> Inativar Conta <v-icon> report_problem </v-icon> </v-btn>
              </template>
              <v-card>
                <v-card-title class="text-h5"> Confirmação </v-card-title>
                <v-card-text>Esteja ciente que ao confirmar com a seguinte opção, sua conta sera inativada. Você não será mais capaz de entrar na sua conta.</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="inativar = false"> Discordo </v-btn>
                  <v-btn color="green darken-1" text @click="inatCliente"> Concordo </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-layout>
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
            <v-radio-group v-model="cliente.cartaoFavId" @change="updateCardFav">
              <v-treeview key="id" :active.sync="active" item-text="nome" activatable :items="cartoes" color="black" open-on-click transition>
                <template v-slot:prepend="{ item }">
                  <v-icon v-if="!item.children && item.id != null"> credit_card </v-icon>
                  <v-icon v-else> clear </v-icon>
                </template>
                <template v-slot:append="{ item }">
                  <v-radio :value="item.id"></v-radio>
                </template>
              </v-treeview>
            </v-radio-group>
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
                <v-card-actions class="justify-center">
                  <v-btn fab outlined @click="EditarCard(selectedCard)">
                    <v-icon> edit </v-icon>
                  </v-btn>
                  <v-btn fab outlined @click="DeleteItemCard(selected)" color="error">
                    <v-icon> delete </v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-scroll-y-transition>
          </v-col>
        </v-row>

        <v-card-actions>
          <v-spacer> </v-spacer>
          <v-btn @click="dialogCard = false" text color="error"> Fechar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog width="1000" v-model="dialogPed">
      <v-card>
        <v-card-title class="black white--text text-h5">
          {{ title }}
          <v-spacer> </v-spacer>
        </v-card-title>
        <v-row class="pa-4" justify="space-between">
          <v-col cols="5">
            <v-treeview key="id" :active.sync="activePed" item-text="data_comp" activatable :items="compra" color="black" open-on-click transition>
              <template v-slot:prepend="{ item }">
                <v-icon v-if="!item.children && item.id != null"> shopping_cart </v-icon>
                <v-icon v-else> clear </v-icon>
              </template>
            </v-treeview>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col class="d-flex text-center">
            <v-scroll-y-transition mode="out-in">
              <div v-if="!selectedPed || selectedPed.id == null" class="text-h6 grey--text text--lighten-1 font-weight-light" style="align-self: center">Escolha um Pedido</div>
              <v-card v-else :key="selectedPed.id" class="pt-6 mx-auto" flat max-width="400">
                <v-card-text>
                  <h3 class="text-h5 mb-2">
                    {{ selectedPed.data_comp }}
                  </h3>
                  <div class="blue--text mb-2">
                    {{ selectedPed.status }}
                  </div>
                  <div class="blue--text subheading font-weight-bold">
                    {{ selectedPed.valor }}
                  </div>
                </v-card-text>
                <v-divider></v-divider>
                <v-row class="text-left" tag="v-card-text">
                  <v-col class="text-right mr-4 mb-2" tag="strong" cols="5"> cartão 1: </v-col>
                  <v-col>
                    {{ selectedPed.metodo }}
                  </v-col>
                  <v-col class="text-right mr-4 mb-2" tag="strong" cols="5"> cartão 2: </v-col>
                  <v-col>
                    {{ selectedPed.metodo2 }}
                  </v-col>
                  <v-col class="text-right mr-4 mb-2" tag="strong" cols="5"> endereço: </v-col>
                  <v-col>
                    {{ selectedPed.endereco }}
                  </v-col>
                </v-row>
                <v-card-actions class="justify-center">
                  <v-btn fab outlined @click="$router.push({ path: `/consulta_pedido/${selectedPed.id}` })">
                    <v-icon> description </v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-scroll-y-transition>
          </v-col>
        </v-row>

        <v-card-actions>
          <v-spacer> </v-spacer>
          <v-btn @click="dialogPed = false" text color="error"> Fechar </v-btn>
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
                <v-card-actions class="justify-center">
                  <v-btn fab outlined @click="EditarItemEnd(selectedEnd)">
                    <v-icon> edit </v-icon>
                  </v-btn>
                  <v-btn fab outlined @click="DeleteItemEnd(selectedEnd)" color="error">
                    <v-icon> delete </v-icon>
                  </v-btn>
                </v-card-actions>
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
import compraService from "@/service/compra";
import router from "@/router";

export default {
  name: "Cliente",
  data: (vm) => ({
    items: ["Masculino", "Feminino"],
    TipoTelefone: ["Residencial", "Móvel"],
    menu1: false,
    menu2: false,

    dialogCard: false,
    dialogPed: false,
    dialogEnd: false,

    inativar: false,
    altSenha: false,

    compra: [],
    enderecos: [],
    cartoes: [],

    snackbar: false,
    error: false,
    cliente: {},
    title: "",
    open: [],

    active: [],
    activeEnd: [],
    activePed: [],

    select: {},
    rules: [(v) => !!v || "Campo Obrigatório"],
  }),
  components: {
    Menu,
    Footer,
  },
  mounted() {
    this.cliente = JSON.parse(localStorage.getItem("cliente"));
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

    selectedPed() {
      if (!this.activePed.length) return undefined;
      const id = this.activePed[0];
      return this.compra.find((compra) => compra.id === id);
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
    updateCardFav() {
      clienteService.update(this.cliente).then(() => {
        localStorage.setItem("cliente", JSON.stringify(this.cliente));
        this.error = false;
        this.snackbar = true;
      });
    },

    DeleteItemCard(item) {
      if (this.cliente.cartaoFavId == item.id) {
        this.cliente.cartaoFavId = null;
        this.updateCardFav();
      }
      cartaoService
        .delete(item.id)
        .then(() => {
          let index = this.cartoes.indexOf(item);
          this.cartoes.splice(index, 1);
          this.error = false;
          this.snackbar = true;
        })
        .catch();
    },

    DeleteItemEnd(item) {
      enderecoService
        .delete(item.id)
        .then(() => {
          let index = this.enderecos.indexOf(item);
          this.enderecos.splice(index, 1);
          this.error = false;
          this.snackbar = true;
        })
        .catch();
    },

    inatCliente() {
      this.cliente.inativar = true;
      clienteService
        .update(this.cliente)
        .then((response) => {
          if (response.data) {
            this.error = false;
            this.snackbar = true;
            setTimeout(() => {
              localStorage.removeItem("cliente");
              this.$router.push({ path: "/" });
            }, 1500);
          }
        })
        .catch(() => {
          this.error = true;
          this.snackbar = true;
        });
    },

    cartaoList() {
      cartaoService.listClienteId(JSON.parse(localStorage.getItem("cliente")).id).then((response) => {
        this.cartoes = response.data;
        let noChoice = {
          nome: "Sem Cartão Favorito",
          id: null,
        };
        this.cartoes.unshift(noChoice);
      });
    },

    enderecoList() {
      enderecoService.listClienteId(JSON.parse(localStorage.getItem("cliente")).id).then((response) => {
        this.enderecos = response.data;
      });
    },

    compraList() {
      compraService.listByClienteId(JSON.parse(localStorage.getItem("cliente")).id).then((response) => {
        this.compra = response.data;
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

    EditarItemPed(item) {
      localStorage.setItem("compra", JSON.stringify(item));
      this.$router.push({ path: "/consulta_pedido/${.id}" });
    },

    EditarCard(item) {
      localStorage.removeItem("cartao");
      localStorage.setItem("cartao", JSON.stringify(item));
      this.$router.push({ path: "/cartao_cadastro" });
    },

    update() {
      this.error = false;
      if (this.$refs.form.validate()) {
        this.cliente.telefone = this.cliente.telefone.replace(/[^a-zA-Z0-9]/g, "");
        this.cliente.cpf = this.cliente.cpf.replace(/[^a-zA-Z0-9]/g, "");
        clienteService
          .update(this.cliente)
          .then((response) => {
            if (response.data) {
              this.error = false;
              this.snackbar = true;
              setTimeout(() => {
                localStorage.setItem("cliente", JSON.stringify(response.data));
                this.$router.go();
              }, 1500);
            }
          })
          .catch(() => {
            this.error = true;
            this.snackbar = true;
          });
      }
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
    openPed() {
      this.compraList();
      this.dialogPed = true;
      this.title = "Pedidos";
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
