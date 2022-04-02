<template>
  <div>
    <Menu />
    <div width="100%" style="padding: 50px">
      <v-layout>
        <v-flex xs8 style="margin-left: 17%">
          <v-card elevation="10" class="justify-center">
            <v-data-table :search="search" :headers="headers" :items="clientes" sort-by="calories" class="elevation-1">
              <template v-slot:top>
                <v-toolbar flat class="d-flex justify-center">
                  <v-toolbar-title>Contas Cadastradas</v-toolbar-title>
                </v-toolbar>
                <v-layout class="justify-center">
                  <v-flex xs3>
                    <v-text-field v-model="search" label="Pesquisar..."></v-text-field>
                  </v-flex>
                </v-layout>
              </template>
              <template v-slot:item.inativar="{ item }">
                <span v-if="item.inativar">
                  Inativado
                </span>
                <span v-else>
                  Ativado
                </span>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="$router.push({ path: `/consultaContaAdm/${item.id}` })"> description </v-icon>
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
      { text: "ID da conta", value: "id" },
      {text: "Email",align: "start",value: "email"},
      {text: "Nome",align: "start",value: "nome"},
      { text: "Telefone", value: "telefone" },
      {text: "Status da conta",align: "start",value: "inativar"},
      { text: "Pedidos", value: "actions", sortable: false },
    ],
    clientes: [],
    search: '',
  }),

  created() {
    this.list();
  },

  components: {
    Menu,
    Footer,
  },
  mounted() {
    this.cliente = JSON.parse(localStorage.getItem("cliente"));
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
    list() {
      clienteService.list().then((response) => {
        this.clientes = response.data;
      });
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
