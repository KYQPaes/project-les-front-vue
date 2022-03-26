<template>
  <div>
    <Menu />

    <!-- style=";display: flex;flex-direction: column;align-items: center;" -->

    <v-card :style="{ backgroundImage: 'url(https://wallpaperscute.com/wp-content/uploads/2018/07/Graffiti-Wall-Desktop-Backgrounds-HD.jpg)', backgroundSize: 'cover', display: 'flex', flexDirection: 'column', alignItems: 'center' }">
      <div style="background-color: white; width: 80%; display: flex; flex-direction: column; align-items: center">
        <v-layout style="align-self: flex-start">
          <v-flex xs10>
            <v-row justify="center" style="margin: 40px">
              <v-img max-height="500" max-width="500" src="https://supercarteira.com.br/img/wallets/maro01/carteira-de-papel-tyvek-mar-oriental-frente.jpg"></v-img>
            </v-row>
          </v-flex>

          <v-flex xs12>
            <v-row justify="center" style="margin-top: 180px">
              <h2 class="blue--text">Carteira Personalizada - Modelo Onda Oriental</h2>
            </v-row>
            <v-row class="text-left" tag="v-card-text" style="margin-top: 50px">
              <b>por apenas:</b>
              <h1 class="green--text" style="margin-left: 20px">R$ 49,99</h1>
            </v-row>
            <v-row style="margin-top: 30px"> Dimensões aberta:22.2 x 8.2cm </v-row>
            <v-row> Dimensões fechada:11.1 x 8.2cm </v-row>
            <v-row>Espessura aberta:1mm </v-row>
            <v-row>Espessura fechada:2mm </v-row>
            <v-row>Peso:8 gramas </v-row>
            <v-row>Material:Tyvek - Fibras de polietileno de alta densidade. </v-row>

            <v-row style="margin-top: 30px">
              <v-col style="flex-grow: 0; margin-right: 10px">
                <v-btn color="green" class="white--text">
                  Comprar
                  <v-icon> shopping_bag </v-icon>
                </v-btn>
              </v-col>
              <v-col>
                <v-btn outlined color="green" class="white--text">
                  Adicionar ao Carrinho
                  <v-icon> shopping_cart </v-icon>
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
export default {
  data: () => ({}),
  components: {
    Menu,
    Footer,
  },
};
</script>

<style scoped></style>
