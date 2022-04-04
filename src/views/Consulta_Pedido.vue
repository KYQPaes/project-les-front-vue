<template>
  <div>
    <Menu />

    <!-- style=";display: flex;flex-direction: column;align-items: center;" -->

    <v-card :style="{ backgroundImage: 'url(https://wallpaperscute.com/wp-content/uploads/2018/07/Graffiti-Wall-Desktop-Backgrounds-HD.jpg)', backgroundSize: 'cover', display: 'flex', flexDirection: 'column', alignItems: 'center' }">
      <div style="background-color: white; min-width: 55vw; display: flex; flex-direction: column; align-items: center">
        <v-layout class="justify-center" style="width: 100%; padding-top: 20px">
          <h2 class="blue--text">Detalhes do Pedido ID</h2>
        </v-layout>
        <v-layout class="d-flex align-center" style="width: 100%; margin-top: 15px">
          <v-flex>
            <v-layout>
              <v-flex xs4>
                <v-layout class="justify-center" style="padding: 7px">
                  <h2 style="margin-left: 40px">Data de Entrega</h2>
                </v-layout>
                <v-layout class="justify-center" style="padding: 7px">
                  <p class="justify-center" style="margin-left: 40px">12/04/2022</p>
                </v-layout>
                <v-layout class="justify-center" style="padding: 7px">
                  <h2 style="margin-left: 40px">Data da Compra</h2>
                </v-layout>
                <v-layout class="justify-center" style="padding: 7px">
                  <p style="margin-left: 40px">05/04/2022</p>
                </v-layout>
              </v-flex>

              <v-flex xs4>
                <v-layout class="justify-center" style="padding: 7px">
                  <h2 style="margin-left: 40px">Status do Pedido</h2>
                </v-layout>
                <v-layout class="justify-center" style="padding: 7px">
                  <p style="margin-left: 40px">EM PROCESSAMENTO</p>
                </v-layout>
                <v-layout class="justify-center" style="padding: 7px">
                  <h2 style="margin-left: 40px">Endereços</h2>
                </v-layout>
                <v-layout class="justify-center" style="padding: 7px">
                  <h4 style="margin-left: 40px">Entrega</h4>
                </v-layout>
                <v-layout class="justify-center" style="padding: 7px">
                  <p style="margin-left: 40px">casa</p>
                </v-layout>
                <v-layout class="justify-center" style="padding: 7px">
                  <h4 style="margin-left: 40px">Cobrança</h4>
                </v-layout>
                <v-layout class="justify-center" style="padding: 7px">
                  <p style="margin-left: 40px">Trabalho</p>
                </v-layout>
              </v-flex>

              <v-flex xs4>
                <v-layout class="justify-center" style="padding: 7px">
                  <h2 style="margin-left: 40px">Pagamento</h2>
                </v-layout>
                <v-layout class="justify-center" style="padding: 7px">
                  <p style="margin-left: 40px">Cartão 1</p>
                </v-layout>
                <v-layout class="justify-center" style="padding: 7px">
                  <p style="margin-left: 40px">Cartão 2</p>
                </v-layout>
                <v-layout class="justify-center" style="padding: 7px">
                  <h2 style="margin-left: 40px">Valor da Compra</h2>
                </v-layout>
                <v-layout class="justify-center" style="padding: 7px">
                  <p style="margin-left: 40px">149,99</p>
                </v-layout>
              </v-flex>
            </v-layout>

            <v-divider></v-divider>

            <v-layout class="justify-center">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left"></th>
                      <th class="text-left">Produto</th>
                      <th class="text-left">Quantidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in pedido" :key="item.name">
                      <td>{{ item.imagem }}</td>
                      <td>{{ item.produto }}</td>
                      <td>{{ item.quantidade }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-layout>
            <v-divider></v-divider>

            <v-layout class="justify-center">
              <v-col style="flex-grow: 0; margin-right: 10px">
                <v-btn color="yellow" class="black--text">
                  Requisitar Troca
                  <v-icon> sync_alt </v-icon>
                </v-btn>
              </v-col>
              <v-col style="flex-grow: 0; margin-right: 10px">
                <v-btn outlined color="red" class="white--text">
                  Cancelar Pedido
                  <v-icon> report_problem </v-icon>
                </v-btn>
              </v-col>
            </v-layout>
            <v-divider></v-divider>
          </v-flex>
        </v-layout>
      </div>
    </v-card>
    <Footer />
  </div>
</template>

<script>
import Menu from "../components/Menu.vue";
import Footer from "../components/Footer.vue";
import produtosService from "../service/produtos";
export default {
  data: () => ({
    produto: {},

    pedido: [
      {
        imagem: "IMAGEM DO PRODUTO",
        produto: "Carteira Personalizada - Modelo x",
        quantidade: 1,
      },
    ],
  }),
  components: {
    Menu,
    Footer,
  },

  methods: {
    list(id) {
      produtosService.listById(id).then((response) => {
        this.produto = response.data;
      });
    },
  },
};
</script>

<style scoped>
.row {
  margin: 0px 0px 0px;
}
</style>
