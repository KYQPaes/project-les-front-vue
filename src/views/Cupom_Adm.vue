<template>
  <div>
    <Menu />
    <div width="100%" style="padding: 50px">
      <v-layout>
        <v-flex xs6 style="margin-left: 23%">
          <v-card elevation="10" class="justify-center">
            <v-card-title> Cupons Cadastrados </v-card-title>
            <v-divider></v-divider>

            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Cupom</th>
                    <th class="text-left">Valor</th>
                    <th class="text-left">Código</th>
                    <th class="text-left">Status</th>
                    <th class="text-left">Validade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in cupons" :key="item.name">
                    <td>
                      <v-icon> receipt </v-icon>
                      {{ item.Cupom }}
                    </td>
                    <td>
                      <v-icon> attach_money </v-icon>
                      {{ item.Valor }}
                    </td>
                    <td>
                      <v-icon> vpn_key </v-icon>
                      {{ item.Código }}
                    </td>
                    <td>
                      {{ item.Status }}
                    </td>
                    <td>
                      <v-icon> schedule </v-icon>
                      {{ item.Validade }}
                    </td>
                    <td>
                      <v-icon> delete </v-icon>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
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
    cupons: [
      {
        Cupom: "Troca",
        Valor: 159,
        Status: "Ativo",
        Código: "D875-A657",
        Validade: "15/04/2022",
      },
      {
        Cupom: "Troca",
        Valor: 159,
        Status: "Ativo",
        Código: "D875-A657",
        Validade: "15/04/2022",
      },
      {
        Cupom: "Troca",
        Valor: 159,
        Status: "Ativo",
        Código: "D875-A657",
        Validade: "15/04/2022",
      },
      {
        Cupom: "Troca",
        Valor: 159,
        Status: "Usado",
        Código: "D875-A657",
        Validade: "15/04/2022",
      },
      {
        Cupom: "Troca",
        Valor: 159,
        Status: "Usado",
        Código: "D875-A657",
        Validade: "15/04/2022",
      },
      {
        Cupom: "Troca",
        Valor: 159,
        Status: "Usado",
        Código: "D875-A657",
        Validade: "15/04/2022",
      },
      {
        Cupom: "Troca",
        Valor: 159,
        Status: "Usado",
        Código: "D875-A657",
        Validade: "15/04/2022",
      },
      {
        Cupom: "Troca",
        Valor: 159,
        Status: "Usado",
        Código: "D875-A657",
        Validade: "15/04/2022",
      },
      {
        Cupom: "Troca",
        Valor: 159,
        Status: "Usado",
        Código: "D875-A657",
        Validade: "15/04/2022",
      },
    ],

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
  computed: {},

  watch: {
    dialog(val) {
      if (val) {
      } else {
        this.close();
      }
    },
  },

  methods: {},
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
