<template>
  <div>
    <Menu />
    <v-card :style="{ backgroundImage: 'url(https://wallpaperscute.com/wp-content/uploads/2018/07/Graffiti-Wall-Desktop-Backgrounds-HD.jpg)', backgroundSize: 'cover', display: 'flex', flexDirection: 'column', alignItems: 'center' }">
      <div style="min-width: fit-content; background-color: white; width: 50vw; flex-direction: column; padding: 60px">
        <v-row class="d-flex flex-row" v-for="(group, i) in prodGroups" :key="i">
          <v-col v-for="produto in produtos.slice(i * itemsPerRow, (i+1)*itemsPerRow)" :key="produto.id">
            <v-card class="mx-auto my-12 hovCard" max-width="374">
              <v-img height="250" :src="produto.imagem"></v-img>
              <v-card-title>{{produto.nome}}</v-card-title>
              <v-card-text>
                <div>{{produto.descricao}}</div>
              </v-card-text>

              <v-divider class="mx-4"></v-divider>

              <v-card-title>Preço</v-card-title>

              <v-card-text>
                R$ {{produto.preco}}
              </v-card-text>

              <v-card-actions>
                <v-btn color="deep-purple lighten-2" text>
                  Visualizar Produto
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <!-- <v-layout >
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

        <v-layout>
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

        <v-layout>
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
        </v-layout> -->
      </div>
    </v-card>
    <Footer />
  </div>
</template>

<script>
import Menu from "../components/Menu.vue";
import Footer from "../components/Footer.vue";
import produtosService from "../service/produtos.js";

export default {
  data: () => ({
    cat: null,
    produtos: [],
    row: null,
	itemsPerRow: 3,
  }),
  components: {
    Menu,
    Footer,
  },
  mounted(){
    if(this.$route.params.tpproduto)
      this.cat = this.$route.params.tpproduto;
    else
      this.cat = 'personalizado';
    this.list();
  },
  computed: {
	prodGroups () {
		return Array.from(Array(Math.ceil(this.produtos.length / this.itemsPerRow)).keys())
	}
  },
  methods: {
	    list(){
			produtosService.listByTipo(this.cat).then(response => {
				this.produtos = response.data;
				console.log(this.produtos);
    	  	});
    	},
  },
};
</script>

<style scoped>
  .hovCard:hover{
    box-shadow: 0px 0px 10px #949494;
  }
</style>
