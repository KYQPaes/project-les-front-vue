<template>
  <div>
    <Menu />
    <div width="100%" style="padding: 50px">
      <v-layout>
        <v-flex xs10 style="margin-left: 8%">
          <v-card elevation="10" class="justify-center">
            <v-card-title class="d-flex justify-center"> Detalhes de Pedidos </v-card-title>
            <v-divider></v-divider>

            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Código de compra</th>
                    <th class="text-left">Entrega</th>
                    <th class="text-left">Status</th>
                    <th class="text-left">Forma de pagamento</th>
                    <th class="text-left">Endereço de cobrança</th>
                    <th class="text-left">Endereço de Entrega</th>
                    <th class="text-left">Valor</th>
                    <th class="text-left">Detalhes</th>
                    <th class="text-left">Detalhes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in pedido" :key="item.name">
                    <td>
                      {{ item.ID }}
                    </td>
                    <td>
                      {{ item.Entrega }}
                    </td>
                    <td>
                      {{ item.Status }}
                    </td>
                    <td>
                      {{ item.forma_Pagamento }}
                    </td>
                    <td>
                      {{ item.endereco_Cobranca }}
                    </td>
                    <td>
                      {{ item.endereco_Entrega }}
                    </td>
                    <td>
                      {{ item.Valor }}
                    </td>
                    <td>
                      <v-icon> feed </v-icon>
                    </td>
                    <td>
                      <v-select :items="items" label="Status"></v-select>
                      <div class="d-flex justify-center" style="padding: 10px">
                        <v-btn style="margin-botton: 5px" color="primary" small> Salvar</v-btn>
                      </div>
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
    pedido: [
      {
        ID: 1,
        Entrega: "12/04/2022",
        Status: "EM PROCESSAMENTO",
        forma_Pagamento: 48998465498,
        endereco_Cobranca: "Rua beijamin 245",
        endereco_Entrega: "Rua ricardo 578",
        Valor: 49,
      },
      {
        ID: 2,
        Entrega: "2/04/2022",
        Status: "ENTREGA REALIZADA",
        forma_Pagamento: 5454654,
        endereco_Cobranca: "Rua beijamin 245",
        endereco_Entrega: "Rua ricardo 578",
        Valor: 149,
      },
      {
        ID: 3,
        Entrega: "03/04/2022",
        Status: "TROCA SOCILITADA",
        forma_Pagamento: 48998465498,
        endereco_Cobranca: "Rua beijamin 245",
        endereco_Entrega: "Rua ricardo 578",
        Valor: 200,
      },
    ],

    items: ["COMPRA NÃO AUTORIZADA", "COMPRA EFETUADA", "TROCA ACEITA", "TROCA RECUSADA"],

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
