<template>
  <div>
    <Menu />

    <!-- style=";display: flex;flex-direction: column;align-items: center;" -->

    <v-card :style="{ backgroundImage: 'url(https://wallpaperscute.com/wp-content/uploads/2018/07/Graffiti-Wall-Desktop-Backgrounds-HD.jpg)', backgroundSize: 'cover', display: 'flex', flexDirection: 'column', alignItems: 'center' }">
      <div style="background-color: white; width: 80%; display: flex; flex-direction: column; align-items: center">
        <v-layout style="align-self: flex-start">
          <v-flex xs10>
            <v-row justify="center" style="margin: 40px">
              <v-img max-height="300" max-width="300" src="https://supercarteira.com.br/img/wallets/maro01/carteira-de-papel-tyvek-mar-oriental-frente.jpg"></v-img>
            </v-row>
          </v-flex>

          <v-flex xs12>
            <v-row justify="center" style="margin-top: 120px">
              <h3 class="blue--text">Carteira Personalizada - Modelo Onda Oriental</h3>
            </v-row>
            <v-row class="text-left" tag="v-card-text">
              <v-col class="text-right mr-4 mb-2" tag="strong" cols="5"> apenas por: </v-col>
              <v-col>
                <h1 class="green--text">R$ 49,99</h1>
              </v-col>

              <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                <v-btn color="green" dark> Veja Mais </v-btn>
              </v-col>
            </v-row>
          </v-flex>
        </v-layout>

        <v-layout style="align-self: flex-start">
          <v-flex xs10>
            <v-row justify="center" style="margin: 40px">
              <v-img max-height="300" max-width="300" src="https://supercarteira.com.br/img/wallets/samu01/carteira-de-papel-tyvek-samurai-frente.jpg"></v-img>
            </v-row>
          </v-flex>

          <v-flex xs12>
            <v-row justify="center" style="margin-top: 120px">
              <h3 class="blue--text">Carteira Personalizada - Modelo Onda Oriental</h3>
            </v-row>
            <v-row class="text-left" tag="v-card-text">
              <v-col class="text-right mr-4 mb-2" tag="strong" cols="5"> apenas por: </v-col>
              <v-col>
                <h1 class="green--text">R$ 49,99</h1>
              </v-col>

              <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                <v-btn color="green" dark> Veja Mais </v-btn>
              </v-col>
            </v-row>
          </v-flex>
        </v-layout>

        <v-layout style="align-self: flex-start">
          <v-flex xs10>
            <v-row justify="center" style="margin: 40px">
              <v-img max-height="300" max-width="300" src="https://supercarteira.com.br/img/wallets/juli01/carteira-de-papel-tyvek-julius-frente.jpg"></v-img>
            </v-row>
          </v-flex>

          <v-flex xs12>
            <v-row justify="center" style="margin-top: 120px">
              <h3 class="blue--text">Carteira Personalizada - Modelo Onda Oriental</h3>
            </v-row>
            <v-row class="text-left" tag="v-card-text">
              <v-col class="text-right mr-4 mb-2" tag="strong" cols="5"> apenas por: </v-col>
              <v-col>
                <h1 class="green--text">R$ 49,99</h1>
              </v-col>

              <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                <v-btn color="green" dark> Veja Mais </v-btn>
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
