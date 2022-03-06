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
                  <v-flex xs6>
                    <v-text-field type="date" :rules="rules" v-model="cliente.data_nasc" label="Data de Nascimento" prepend-icon="mdi-calendar"></v-text-field>
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
                  <v-flex xs6>
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
          <v-btn @click="$router.push({ path: '/cartao_cadastro' })" fab color="white">
            <v-icon color="black"> add </v-icon>
          </v-btn>
        </v-card-title>
        <v-row class="pa-4" justify="space-between">
          <v-col cols="5">
            <v-treeview key="id" :active.sync="active" item-text="nome" activatable :items="cartoes" color="black" open-on-click transition>
              <template v-slot:prepend="{ item }">
                <v-icon v-if="!item.children"> credit_card </v-icon>
              </template>
            </v-treeview>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col class="d-flex text-center">
            <v-scroll-y-transition mode="out-in">
              <div v-if="!selected" class="text-h6 grey--text text--lighten-1 font-weight-light" style="align-self: center">Escolha um Cartão</div>
              <v-card v-else :key="selected.id" class="pt-6 mx-auto" flat max-width="400">
                <v-card-text>
                  <h3 class="text-h5 mb-2">
                    {{ selected.nome }}
                  </h3>
                  <div class="blue--text mb-2">
                    {{ selected.numero }}
                  </div>
                  <div class="blue--text subheading font-weight-bold">
                    {{ selected.validade }}
                  </div>
                </v-card-text>
                <v-divider></v-divider>
                <v-row class="text-left" tag="v-card-text">
                  <v-col class="text-right mr-4 mb-2" tag="strong" cols="5"> CVV: </v-col>
                  <v-col>
                    {{ selected.cvv }}
                  </v-col>
                  <v-col class="text-right mr-4 mb-2" tag="strong" cols="5"> CPF: </v-col>
                  <v-col>
                    {{ selected.cpf }}
                  </v-col>
                </v-row>
                <v-card-actions class="justify-center">
                  <v-btn fab outlined @click="EditarItemCart(selected)">
                    <v-icon> edit </v-icon>
                  </v-btn>
                  <v-btn fab outlined @click="DeleteItemCart(selected)" color="error">
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
          Pedidos
          <v-spacer> </v-spacer>
        </v-card-title>
        <v-row class="pa-4" justify="space-between">
          <v-col cols="5">
            <v-treeview :items="itemsPed"></v-treeview>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col class="d-flex text-center">
            <v-scroll-y-transition mode="out-in">
              <div v-if="!selected" class="text-h6 grey--text text--lighten-1 font-weight-light" style="align-self: center">Escolha um Pedido</div>
              <v-card v-else :key="selected.id" class="pt-6 mx-auto" flat max-width="400">
                <v-card-text>
                  <h3 class="text-h5 mb-2"></h3>
                  <div class="blue--text mb-2"></div>
                  <div class="blue--text subheading font-weight-bold"></div>
                </v-card-text>
                <v-divider></v-divider>
                <v-row class="text-left" tag="v-card-text">
                  <v-col class="text-right mr-4 mb-2" tag="strong" cols="5"> </v-col>
                  <v-col> </v-col>
                  <v-col class="text-right mr-4 mb-2" tag="strong" cols="5"> </v-col>
                  <v-col> </v-col>
                </v-row>
                <v-card-actions class="justify-center">
                  <v-btn fab outlined>
                    <v-icon> edit </v-icon>
                  </v-btn>
                  <v-btn fab outlined color="error">
                    <v-icon> delete </v-icon>
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

    itemsPed: [
      {
        id: 1,
        name: "Pedido 1",
      },
      {
        id: 2,
        name: "Pedido 2",
      },
      {
        id: 3,
        name: "Pedido 3",
      },
      {
        id: 4,
        name: "Pedido 4",
      },
      {
        id: 5,
        name: "Pedido 5",
      },
      {
        id: 6,
        name: "Pedido 6",
      },
    ],
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

    DeleteItemCart(item){
      cartaoService.delete(item.id).then(() => {
        let index = this.cartoes.indexOf(item);
        this.cartoes.splice(index, 1);
        this.error = false;
        this.snackbar = true;
      }).catch()
    },

    DeleteItemEnd(item){
      enderecoService.delete(item.id).then(() => {
        let index = this.enderecos.indexOf(item);
        this.enderecos.splice(index, 1);
        this.error = false;
        this.snackbar = true;
      }).catch()
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

    EditarItemEnd(item) {
      localStorage.setItem("endereco", JSON.stringify(item));
      this.$router.push({ path: "/endereco_cadastro" });
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
    openPed() {
      this.dialogPed = true;
      this.title = "Pedidos";
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
