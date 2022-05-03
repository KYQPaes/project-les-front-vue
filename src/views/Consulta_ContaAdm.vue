<template>
  <div>
    <Menu />
    <div width="100%" style="padding: 50px">
      <v-layout>
        <v-flex xs9 style="margin-left: 15%">
          <v-card elevation="10" class="justify-center">
            <v-data-table :headers="headers" :items="compras" sort-by="calories" class="elevation-1">
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
                  <v-select :items="items" v-model="item.statusNew" label="Status"></v-select>
                  <v-col cols="12" sm="3">
                    <v-btn @click="update(item)" icon color="green">
                      <v-icon>done</v-icon>
                    </v-btn>
                  </v-col>
                </v-layout>
              </template>
              <template v-slot:no-data> Nenhuma Informação Encontrada </template>
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
import CompraService from "@/service/compra";
import router from "@/router";

export default {
  name: "Cliente",
  data: (vm) => ({
    headers: [
      { text: "Código de compra", value: "id" },
      { text: "Data da Compra", align: "start", value: "data_comp" },
      { text: "Status", align: "start", value: "status" },
      { text: "Forma de Pagamento", value: "metodo" },
      { text: "Endereço de Cobrança", value: "endereco" },
      { text: "Frete", align: "start", value: "frete" },
      { text: "Valor da Compra", align: "start", value: "valor" },
      { text: "Detalhes", value: "actions", sortable: false },
      { text: "Opção", value: "adm", sortable: false },
    ],
    items: ["COMPRA NÃO AUTORIZADA", "COMPRA EFETUADA", "TROCA ACEITA", "TROCA RECUSADA", "EM PROCESSAMENTO", "EM TRANSITO"],
    compras: [],
  }),

  components: {
    Menu,
    Footer,
  },
  mounted() {
    if (this.$route.params.id) this.list(this.$route.params.id);
    else this.$router.push("/consultaCliente");
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
    list(id) {
      CompraService.listByClienteId(id).then((response) => {
        this.compras = response.data;
      });
    },
    update(compra) {
      compra.status = compra.statusNew;
      CompraService.update(compra).then(() => {
        this.list(this.$route.params.id);
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
