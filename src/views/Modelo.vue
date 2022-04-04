<template>
  <div>
    <Menu />

    <!-- style=";display: flex;flex-direction: column;align-items: center;" -->

    <v-card :style="{ backgroundImage: 'url(https://wallpaperscute.com/wp-content/uploads/2018/07/Graffiti-Wall-Desktop-Backgrounds-HD.jpg)', backgroundSize: 'cover', display: 'flex', flexDirection: 'column', alignItems: 'center' }">
      <div style="background-color: white; min-width: 55vw; display: flex; flex-direction: column; align-items: center">
        <v-layout class="justify-center" style="width:100%; padding-top: 20px">
          <h2 class="blue--text">Carteira {{produto.tipo}} - Modelo {{produto.nome}}</h2>
        </v-layout>
        <v-layout class="d-flex align-center" style="width:100%;">
          <v-flex xs6>
            <v-row justify="center" style="margin-top: 5px; margin-left: 10px; height: 80%; width:80% max-height: 500px; max-width: 500px">
              <v-img :src="produto.imagem"></v-img>
            </v-row>
          </v-flex>

          <v-flex xs6>
            <v-row class="text-left" tag="v-card-text" style="margin-top: 50px">
              <b>por apenas:</b>
              <h1 class="green--text" style="margin-left: 20px">R$ {{produto.preco}}</h1>
            </v-row>
            <v-row> Dimensões aberta:22.2 x 8.2cm </v-row>
            <v-row> Dimensões fechada:11.1 x 8.2cm </v-row>
            <v-row>Espessura aberta:1mm </v-row>
            <v-row>Espessura fechada:2mm </v-row>
            <v-row>Peso:8 gramas </v-row>
            <v-row>Material:Tyvek - Fibras de polietileno de alta densidade. </v-row>

            <v-row style="margin-top: 30px">
              <v-col style="flex-grow: 0; margin-right: 10px">
                <v-btn @click="addCart(true)" color="green" class="white--text">
                  Comprar
                  <v-icon> shopping_bag </v-icon>
                </v-btn>
              </v-col>
              <v-col>
                <v-btn @click="addCart(false)" outlined color="green" class="white--text">
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
import produtosService from "../service/produtos";
export default {
  data: () => ({
    produto: {},
  }),
  components: {
    Menu,
    Footer,
  },
  mounted(){
    if(this.$route.params.id)
      this.list(this.$route.params.id);
    else
      this.$router.push('/');
  },
  methods: {
    list(id){
      produtosService.listById(id).then(response => {
        this.produto = response.data;
      });
    },
    addCart(condicao){
      let prod = this.produto;
      prod.quantidade = 1;
      let cart;
      if(localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'));
        let index = cart.findIndex(item => item.id == prod.id);
        if(index >= 0){
          cart[index].quantidade++;
        }else{
          cart.push(prod);
        }
      }else{
        cart = [];
        cart.push(prod);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      if(condicao)
        this.$router.push('/carrinho');
    },
  },
};
</script>

<style scoped>
  .row{
    margin: 0px 0px 0px;
  }
</style>
