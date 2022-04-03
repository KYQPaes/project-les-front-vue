<template>
  <div>
    <Menu />

    <!-- style=";display: flex;flex-direction: column;align-items: center;" -->

    <v-card :style="{ backgroundImage: 'url(https://wallpaperscute.com/wp-content/uploads/2018/07/Graffiti-Wall-Desktop-Backgrounds-HD.jpg)', backgroundSize: 'cover', display: 'flex', flexDirection: 'column', alignItems: 'center' }">
      <div style="background-color: white; min-width: 55vw; display: flex; flex-direction: column; align-items: center">
        <v-layout class="justify-center" style="width: 100%; padding-top: 20px">
          <h2 class="blue--text">Carrinho</h2>
        </v-layout>
        <v-layout class="d-flex align-center" style="width: 100%; margin-top: 15px">
          <v-flex xs6>
            <v-row justify="center" style="margin-top: 5px; margin-left: 10px; height: 80%; width:80% max-height: 500px; max-width: 500px">
              <v-img :src="produto.imagem"></v-img>
            </v-row>
          </v-flex>

          <v-flex xs6>
            <h2 style="margin-top=10px">Carteira Personalizada - Modelo</h2>

            <v-flex xs3>
              <v-text-field type="number" label="Quantidade" />
            </v-flex>

            <v-layout class="align-center">
              <p>Valor:</p>
              <h1 class="green--text" style="margin-left: 20px">R$ 49,99</h1>
            </v-layout>
            <v-divider></v-divider>

            <v-layout class="align-baseline">
              <v-flex xs4>
                <v-text-field v-mask="'#####-###'" type="cep" label="CEP" placeholder="CEP" />
              </v-flex>
              <v-flex xs4>
                <v-col cols="12" sm="3">
                  <v-btn icon color="blue">
                    <v-icon>travel_explore</v-icon>
                  </v-btn>
                </v-col>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-row style="margin-top: 30px">
              <v-col style="flex-grow: 0; margin-right: 10px">
                <v-btn color="green" class="white--text">
                  Finalizar pedido
                  <v-icon> shopping_bag </v-icon>
                </v-btn>
              </v-col>
            </v-row>
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
