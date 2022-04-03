<template>
  <div>
    <Menu />

    <!-- style=";display: flex;flex-direction: column;align-items: center;" -->

    <v-card :style="{ backgroundImage: 'url(https://wallpaperscute.com/wp-content/uploads/2018/07/Graffiti-Wall-Desktop-Backgrounds-HD.jpg)', backgroundSize: 'cover', display: 'flex', flexDirection: 'column', alignItems: 'center' }">
      <div style="background-color: white; min-width: 55vw; display: flex; flex-direction: column; align-items: center">
        <v-layout class="justify-center" style="width: 100%; padding-top: 20px">
          <h2 class="blue--text">Carrinho</h2>
        </v-layout>
        <v-layout v-for="prod in carrinho.length" :key="prod" class="d-flex align-center" style="width: 100%; padding-top:40px; border-bottom: 1px solid #ccc; border-top: 1px solid #ccc">
          <v-flex xs5>
            <v-row justify="center" style="margin-left: 10px; height: 80%; width:80% max-height: 500px; max-width: 500px">
              <v-img :src="carrinho[prod-1].imagem"></v-img>
            </v-row>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs6>
            <h2 style="margin-top=10px">Carteira {{carrinho[prod-1].tipo}} - Modelo {{carrinho[prod-1].nome}}</h2>

            <v-flex xs3>
              <v-text-field @change="changeCart(prod)" v-model="carrinho[prod-1].quantidade" type="number" label="Quantidade" />
            </v-flex>

            <v-layout style="margin-bottom: 40px" class="align-center">
              <p>Valor:</p>
              <h1 class="green--text" style="margin-left: 20px">{{carrinho[prod-1].preco}}</h1>
            </v-layout>

          </v-flex>
        </v-layout>
        <v-row v-if="carrinho.length > 0">
          <v-col class="d-flex flex-nowrap align-end">
            <v-text-field hide-details v-mask="'#####-###'" type="cep" label="CEP" placeholder="CEP" />
            <v-btn icon color="blue">
              <v-icon>travel_explore</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col style="flex-grow: 0; margin-right: 10px">
            <v-btn :disabled="carrinho.length > 0 ? false : true" color="green" class="white--text">
              Finalizar pedido
              <v-icon> shopping_bag </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="290"    >
      <v-card>
        <v-card-title class="text-h5">
          Remoção de Produto
        </v-card-title>
        <v-card-text>Deseja remover o produto do seu carrinho?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="quant1">
            Não
          </v-btn>
          <v-btn color="green darken-1" text @click="removeProdCart">
            Sim
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <Footer />
  </div>
</template>

<script>
import Menu from "../components/Menu.vue";
import Footer from "../components/Footer.vue";
export default {
  data: () => ({
    carrinho: [],
    dialog: false,
  }),
  components: {
    Menu,
    Footer,
  },
  mounted(){
    this.carrinho = JSON.parse(localStorage.getItem('cart'));
    console.log(this.carrinho);
    if(!this.carrinho){
      this.carrinho = [];
    }
  },
  methods: {
    changeCart(id){
      if(this.carrinho[id-1].quantidade < 1){
        this.dialog = true;
      }
      localStorage.setItem('cart', JSON.stringify(this.carrinho));
    },
    quant1(){
      this.dialog = false;
      this.carrinho.forEach(cart => {
        if(cart.quantidade < 1){
          cart.quantidade = 1;
        }
      })
    },
    removeProdCart(){
      this.dialog = false;
      this.carrinho.forEach((cart, index) => {
        if(cart.quantidade < 1){
          this.carrinho.splice(index, 1);
        }
      })
      localStorage.setItem('cart', JSON.stringify(this.carrinho));
    },
  },
};
</script>

<style scoped>
.row {
  margin: 0px 0px 0px;
}

</style>
