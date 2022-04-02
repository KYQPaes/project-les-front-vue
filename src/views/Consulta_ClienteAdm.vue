<template>
  <div>
    <Menu />
    <div width="100%" style="padding: 50px">
      <v-layout>
        <v-flex xs8 style="margin-left: 17%">
          <v-card elevation="10" class="justify-center">
            <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
              <template v-slot:top>
                <v-toolbar flat class="d-flex justify-center">
                  <v-toolbar-title>Contas Cadastradas</v-toolbar-title>
                  <v-divider class="mx-4" inset></v-divider>
                  <v-spacer></v-spacer>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)"> description </v-icon>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize"> Reset </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
        <v-spacer> </v-spacer>
      </v-layout>
    </div>

    <Footer />
  </div>
</template>

<script>
import Menu from "../components/Menu.vue";
import Footer from "../components/Footer.vue";
import clienteService from "@/service/clientes";
import router from "@/router";

export default {
  name: "Cliente",
  data: (vm) => ({
    headers: [
      { text: "ID da conta", value: "ID" },
      {
        text: "Email",
        align: "start",
        filterable: false,
        value: "email",
      },
      {
        text: "Nome",
        align: "start",
        filterable: false,
        value: "nome",
      },
      { text: "Telefone", value: "telefone" },
      {
        text: "Status da conta",
        align: "start",
        filterable: false,
        value: "status",
      },
      ,
      { text: "Pedidos", value: "actions", sortable: false },
    ],
  }),

  created() {
    this.initialize();
  },

  components: {
    Menu,
    Footer,
  },
  mounted() {
    this.cliente = JSON.parse(localStorage.getItem("cliente"));
  },
  computed: {},

  watch: {
    dialog(val) {
      if (val) {
      } else {
        this.close();
      }
    },
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          ID: 1,
          email: "leonardo-eiji@live.com",
          nome: "leonardo",
          telefone: "97474-5487",
          status: "Ativo",
        },
        {
          ID: 2,
          email: "roverto-eiji@live.com",
          nome: "aluis",
          telefone: "97474-5487",
          status: "Ativo",
        },
        {
          ID: 7,
          email: "bruna-eiji@live.com",
          nome: "bruna",
          telefone: "97474-5487",
          status: "Ativo",
        },
        {
          ID: 9,
          email: "kayque-eiji@live.com",
          nome: "kayque",
          telefone: "97474-5487",
          status: "Inativo",
        },
        {
          ID: 3,
          email: "joão-eiji@live.com",
          nome: "joão",
          telefone: "97474-5487",
          status: "Inativo",
        },
        {
          ID: 5,
          email: "valtencir-eiji@live.com",
          nome: "val",
          telefone: "97474-5487",
          status: "Ativo",
        },
      ];
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
