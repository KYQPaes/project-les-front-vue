<template>
  <div>
    <Menu />
    <div width="100%" style="padding: 50px">
      <v-layout>
        <v-flex xs9 style="margin-left: 15%">
          <v-card elevation="10" class="justify-center">
            <v-data-table :headers="headers" :items="cupons" sort-by="calories" class="elevation-1">
              <template v-slot:top>
                <v-toolbar flat class="d-flex justify-center">
                  <v-toolbar-title>Cupons cadastrados</v-toolbar-title>
                  <v-divider class="mx-4" inset></v-divider>
                  <v-spacer></v-spacer>
                </v-toolbar>
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
import CupomService from "@/service/cupom";
import clienteService from "@/service/clientes";
import router from "@/router";

export default {
  name: "Cupom",
  data: (vm) => ({
    headers: [
      { text: "Descricao", align: "start", value: "descricao" },
      { text: "Valor", align: "start", value: "valor" },
      { text: "Codigo", value: "codigo" },
      { text: "Status", align: "start", value: "status" },
      { text: "Validade", align: "start", value: "validade" },
    ],
    cupons: [],
    cliente: {},
    search: "",

    select: {},
    rules: [(v) => !!v || "Campo Obrigatório"],
  }),

  created() {
    this.cliente = JSON.parse(localStorage.getItem("cliente"));
    this.list(this.cliente.id);
  },

  components: {
    Menu,
    Footer,
  },
  mounted() {},
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
      CupomService.listByClienteId(id).then((response) => {
        this.cupons = response.data;
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
