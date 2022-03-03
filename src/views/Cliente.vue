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

    <v-dialog width="500" v-model="dialog">
      <v-card>
        <v-card-title>
          {{ title }}
        </v-card-title>
        <v-card-text> </v-card-text>
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
  }),
  components: {
    Menu,
    Footer,
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
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
  },
};
</script>
<style scoped>
.v-text-field {
  padding: 10px;
}
</style>
