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
              <p style="margin-top: 20px">Quantidade a ser trocada:</p>
              <v-flex xs1>
                <v-text-field style="margin-left: 10px" type="number" />
              </v-flex>
            </v-layout>

            <v-layout class="justify-center">
              <v-flex xs8>
                <h4>Motivo da troca:</h4>
                <v-col cols="12">
                  <v-textarea color="teal">
                    <template>
                      <div>Bio <small>(optional)</small></div>
                    </template>
                  </v-textarea>
                </v-col>
              </v-flex>
            </v-layout>
            <v-layout class="justify-center">
              <v-col style="flex-grow: 0; margin-right: 10px">
                <v-btn color="yellow" class="black--text"> Confirmar Troca </v-btn>
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
    first: "",
    last: "",
    bio: "",
    favoriteAnimal: "",
    age: null,
    terms: false,
  }),
  components: {
    Menu,
    Footer,
  },

  methods: {
    list(id) {
      produtosService.listById(id).then((response) => {
        this.produto = response.data;
        console.log(this.produto);
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
