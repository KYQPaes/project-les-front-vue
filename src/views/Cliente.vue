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
                    <!-- <v-text-field :rules="rules" v-model="cliente.data_nasc" label="Data de Nascimento" prepend-icon="mdi-calendar" ></v-text-field> -->
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
              <v-btn @click="update" color="black" dark> Salvar Alterações </v-btn>
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
                <v-card-text>Esteja ciente que ao confirmar com a seguinte opção, sua conta sera inativada. Você não será mais capaz de realizar pedidos e ver seu histórico de compras.</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="inativar = false"> Discordo </v-btn>
                  <v-btn color="green darken-1" text @click="inativar = false"> Concordo </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-layout>
        </v-flex>
      </v-layout>
    </div>

    <v-dialog width="1000" v-model="dialog">
      <v-card>
        <v-card-title class="black white--text text-h5">
          {{ title }}
        </v-card-title>
        <v-row class="pa-4" justify="space-between">
          <v-col cols="5">
            <v-treeview :load-children="fetchUsers" key="id" :active.sync="active" :open.sync="open" activatable :items="itemsCard" color="black" open-on-click transition>
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
                  <v-avatar v-if="avatar" size="88">
                    <v-img :src="`https://avataaars.io/${avatar}`" class="mb-6"></v-img>
                  </v-avatar>
                  <h3 class="text-h5 mb-2">
                    <!-- {{ selected.name }} -->
                  </h3>
                  <div class="blue--text mb-2">
                    <!-- {{ selected.email }} -->
                  </div>
                  <div class="blue--text subheading font-weight-bold">
                    <!-- {{ selected.username }} -->
                  </div>
                </v-card-text>
                <v-divider></v-divider>
                <v-row class="text-left" tag="v-card-text">
                  <v-col class="text-right mr-4 mb-2" tag="strong" cols="5"> Company: </v-col>
                  <v-col>
                    <!-- {{ selected.company.name }} -->
                  </v-col>
                  <v-col class="text-right mr-4 mb-2" tag="strong" cols="5"> Website: </v-col>
                  <v-col>
                    <!-- <a :href="`//${selected.website}`" target="_blank">
                                    {{ selected.website }}
                                </a> -->
                  </v-col>
                  <v-col class="text-right mr-4 mb-2" tag="strong" cols="5"> Phone: </v-col>
                  <v-col>
                    <!-- {{ selected.phone }} -->
                  </v-col>
                </v-row>
              </v-card>
            </v-scroll-y-transition>
          </v-col>
        </v-row>

        <v-card-actions>
          <v-spacer> </v-spacer>
          <v-btn text color="error"> Fechar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar top :color="error == true ? 'error':'green'" v-model="snackbar">
      <span v-if="error==false">
        Alterações realizadas com sucesso
      </span>
      <span v-else>
        Ocorreu um erro
      </span>
    </v-snackbar>
    <Footer />
  </div>
</template>

<script>
import Menu from "../components/Menu.vue";
import Footer from "../components/Footer.vue";
import clienteService from '@/service/clientes';

export default {
  name: "Cliente",
  data: (vm) => ({
    items: ["Masculino", "Feminino"],
    TipoTelefone: ["Residencial", "Móvel"],
    menu1: false,
    menu2: false,

    inativar: false,
    altSenha: false,

    snackbar: false,
    error: false,
    cliente:{},
    title: "",
    open: [],
    active: [],
    select: {},
    rules: [(v) => !!v || "Campo Obrigatório"],
    itemsCard: [
      {
        id: 1,
        name: "Cartão1",
      },
      {
        id: 2,
        name: "Cartão2",
      },
      {
        id: 3,
        name: "Cartão3",
      },
      {
        id: 4,
        name: "Cartão4",
      },
      {
        id: 5,
        name: "Cartão5",
      },
      {
        id: 6,
        name: "Cartão6",
      },
    ],
  }),
  components: {
    Menu,
    Footer,
  },
  mounted(){
    this.cliente = JSON.parse(localStorage.getItem('cliente'));
  },
  computed: {
    selected() {
      if (!this.active.length) return undefined;

      const id = this.active[0];

      return this.users.find((user) => user.id === id);
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
    update(){
      this.error = false;
      if (this.$refs.form.validate()) {
        this.cliente.telefone = this.cliente.telefone.replace(/[^a-zA-Z0-9]/g, '');
        this.cliente.cpf = this.cliente.cpf.replace(/[^a-zA-Z0-9]/g, '');
        clienteService.update(this.cliente).then((response) => {
          if(response.data){
            this.error = false;
            this.snackbar = true;
            setTimeout(() => {
              localStorage.setItem('cliente', JSON.stringify(response.data))
              this.$router.go();
            }, 1500);
          }
        }).catch(() => {
          this.error = true;
          this.snackbar = true;
        });
      }
      clienteService.update(this.cliente)
    },
    openPed() {
      this.dialog = true;
      this.title = "Pedidos";
    },
    openCard() {
      this.dialog = true;
      this.title = "Cartões";
    },
    openEnd() {
      this.dialog = true;
      this.title = "Endereços";
    },
    fetchUsers(item) {
      this.select = {
        id: "teste",
        cvv: "455",
        cartao: "412442134121",
      };
    },
  },
};
</script>
<style scoped>
.v-text-field {
  padding: 10px;
}
</style>
