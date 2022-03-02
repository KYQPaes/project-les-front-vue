<template>
  <div>
    <Menu />
    <div display: flex; align-content: center, align-items: center  align-self: center; flex-direction: column;>
      
    <v-card :style="{backgroundImage:'url(https://wallpaperscute.com/wp-content/uploads/2018/07/Graffiti-Wall-Desktop-Backgrounds-HD.jpg)',backgroundSize:'cover'
    } ">
    <div style="background-color: white ;width: 50%">

    


    <v-layout class="text-xs-center" >
        <v-row justify="center" style="margin:40px">
        <h1>
          Carteiras Personalizadas
        </h1>
        </v-row>
      </v-layout >

      <v-layout >
        <v-row justify="center" style="margin:40px">
          <v-flex xs6>
            <v-carousel>
              <v-carousel-item
                v-for="(item,i) in items"
                :key="i"
                :src="item.src"
                reverse-transition="fade-transition"
                transition="fade-transition"
              ></v-carousel-item>
            </v-carousel>
          </v-flex>
        </v-row>
      </v-layout>
  </div>
  </v-card>
  </div>
  </div>

 
  
</template>

<script>
import Menu from '../components/Menu.vue'
export default {
  name: 'HomeView',
  components: {
    Menu
  },

  data () {
      return {
        items: [
          {
            src:  'https://supercarteira.com.br/img/wallets/maro01/carteira-de-papel-tyvek-mar-oriental-frente.jpg',
          },
          {
            src: 'https://supercarteira.com.br/img/wallets/astr01/carteira-de-papel-tyvek-astronauta-frente.jpg',
          },
          {
            src: 'https://supercarteira.com.br/img/wallets/univ01/carteira-de-papel-tyvek-universo-frente.jpg',
          },
          {
            src: 'https://supercarteira.com.br/img/wallets/juli01/carteira-de-papel-tyvek-julius-frente.jpg',
          },
        ],
      }
    },
  }

</script>
