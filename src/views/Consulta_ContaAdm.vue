<template>
  <div>
    <Menu />
    <div width="100%" style="padding: 50px">
      <v-layout>
        <v-flex xs9 style="margin-left: 15%">
          <v-card elevation="10" class="justify-center">
            <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
              <template v-slot:top>
                <v-toolbar flat class="d-flex justify-center">
                  <v-toolbar-title>Detalhes dos pedidos</v-toolbar-title>
                  <v-divider class="mx-4" inset></v-divider>
                  <v-spacer></v-spacer>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)"> description </v-icon>
              </template>

              <template v-slot:item.adm="{ item }">
                <v-layout class="align-baseline">
                  <v-select :items="items" label="Status"></v-select>
                  <v-col cols="12" sm="3">
                    <v-btn icon color="green">
                      <v-icon>done</v-icon>
                    </v-btn>
                  </v-col>
                </v-layout>
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
      { text: "Código de compra", value: "ID" },
      {
        text: "Entrega",
        align: "start",
        filterable: false,
        value: "entrega",
      },
      {
        text: "Status",
        align: "start",
        filterable: false,
        value: "status",
      },
      { text: "Forma de Pagamento", value: "forma_Pagamento" },
      { text: "Endereço de Cobrança", value: "endereco_Cobranca" },
      { text: "Endereco de Entrega", value: "endereco_Entrega" },
      {
        text: "Valor da Compra",
        align: "start",
        filterable: false,
        value: "valor",
      },
      { text: "Detalhes", value: "actions", sortable: false },
      { text: "Opção", value: "adm", sortable: false },
    ],
    items: ["COMPRA NÃO AUTORIZADA", "COMPRA EFETUADA", "TROCA ACEITA", "TROCA RECUSADA"],
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
          entrega: "12/04/2022",
          status: "EM PROCESSAMENTO",
          forma_Pagamento: 48998465498,
          endereco_Cobranca: "Rua beijamin 245",
          endereco_Entrega: "Rua ricardo 578",
          valor: 49,
        },
        {
          ID: 2,
          entrega: "2/04/2022",
          status: "ENTREGA REALIZADA",
          forma_Pagamento: 5454654,
          endereco_Cobranca: "Rua beijamin 245",
          endereco_Entrega: "Rua ricardo 578",
          valor: 149,
        },
        {
          ID: 3,
          entrega: "03/04/2022",
          status: "TROCA SOCILITADA",
          forma_Pagamento: 48998465498,
          endereco_Cobranca: "Rua beijamin 245",
          endereco_Entrega: "Rua ricardo 578",
          valor: 200,
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
