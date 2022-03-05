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
              <v-layout>
                <v-flex xs12>
                  <v-text-field label="Nome Completo"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs4>
                  <v-autocomplete :items="items" label="Gênero"></v-autocomplete>
                </v-flex>
                <v-flex xs6>
                  <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="dateFormatted" label="Data de Nascimento" persistent-hint prepend-icon="mdi-calendar" v-bind="attrs" @blur="date = parseDate(dateFormatted)" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs4>
                  <v-text-field type="CPF" label="CPF" />
                </v-flex>
                <v-flex xs8>
                  <v-text-field type="Endereço Residencial" label="Endereço Residencial" />
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs4>
                  <v-autocomplete :items="TipoTelefone" label="Tipo de Telefone"></v-autocomplete>
                </v-flex>
                <v-flex xs2>
                  <v-text-field type="DDD" label="DDD" />
                </v-flex>
                <v-flex xs6>
                  <v-text-field type="Numero de Telefone" label="Numero de Telefone" />
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-spacer> </v-spacer>
              <v-btn color="black" dark> Salvar Alterações </v-btn>
              <v-btn outlined color="error" dark> Alterar Senha </v-btn>
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
                <v-treeview :load-children="fetchUsers" key="id" :active.sync="active" :open.sync="open" activatable :items="items" color="black" open-on-click transition>
                    <template v-slot:prepend="{ item }">
                        <v-icon v-if="!item.children">
                            credit_card
                        </v-icon>
                    </template>
                </v-treeview>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col class="d-flex text-center">
                <v-scroll-y-transition mode="out-in">
                    <div v-if="!selected" class="text-h6 grey--text text--lighten-1 font-weight-light" style="align-self: center;" >
                        Escolha um Cartão
                    </div>
                    <v-card v-else :key="selected.id" class="pt-6 mx-auto" flat max-width="400" >
                        <v-card-text>
                            <v-avatar v-if="avatar" size="88" >
                                <v-img :src="`https://avataaars.io/${avatar}`" class="mb-6" ></v-img>
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
                            <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                                Company:
                            </v-col>
                            <v-col>
                                <!-- {{ selected.company.name }} -->
                            </v-col>
                            <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                                Website:
                            </v-col>
                            <v-col>
                                <!-- <a :href="`//${selected.website}`" target="_blank">
                                    {{ selected.website }}
                                </a> -->
                            </v-col>
                            <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                                Phone:
                            </v-col>
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

    <Footer />
  </div>
</template>

<script>
import Menu from "../components/Menu.vue";
import Footer from "../components/Footer.vue";
export default {
  name: "Cliente",
  data: (vm) => ({
    items: ["Masculino", "Feminino"],
    TipoTelefone: ["Residencial", "Móvel"],

    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10)),
    menu1: false,
    menu2: false,

    dialog: false,
    title: "",
    open: [],
    active: [],
    select: {},
    items: [
            {
                id: 1,
                name: 'Cartão1',
            },
            {
                id: 2,
                name: 'Cartão2',
            },
            {
                id: 3,
                name: 'Cartão3',
            },
            {
                id: 4,
                name: 'Cartão4',
            },
            {
                id: 5,
                name: 'Cartão5',
            },
            {
                id: 6,
                name: 'Cartão6',
            },
    ]
  }),
  components: {
    Menu,
    Footer,
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    selected () {
        if (!this.active.length) return undefined

        const id = this.active[0]

        return this.users.find(user => user.id === id)
    },
  },

  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
    dialog(val) {
      if (val) {
      } else {
        this.close();
      }
    },
  },

  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },

    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
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
        this.select = ({
            id: "teste",
            cvv: "455",
            cartao: "412442134121",

        })
    },
  },
};
</script>
<style scoped>
.v-text-field {
  padding: 10px;
}
</style>
