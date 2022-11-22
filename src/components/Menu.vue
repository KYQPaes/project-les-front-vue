<template>
  <div>
    <v-layout>
      <v-flex xs12>
        <div class="text-xs-center">
          <v-img class="mx-auto" src="../images/logo.png" width="250" height="250" @click="methodName"></v-img>
        </div>
      </v-flex>
    </v-layout>
    <v-layout style="margin-bottom: 10px">
      <v-spacer> </v-spacer>
      <v-flex xs2>
        <v-btn class="button" fab small text v-if="cliente && cliente.id == 0"  @click="() => { this.$router.push({ path: '/cupomAdm' }); }">
          <v-icon :size="size" color="black"> mdi-percent </v-icon>
        </v-btn>
        <v-btn class="button" fab small text v-else-if=" (typeof cliente != 'undefined') && cliente && cliente.id > 0"  @click="() => { this.$router.push({ path: '/cupom' }); }">
          <v-icon :size="size" color="black"> mdi-percent </v-icon>
        </v-btn>
        <v-btn v-else @click="() => { this.$router.push({ path: '/login' }); }" class="button" fab small text>
          <v-icon :size="size" color="black"> mdi-percent </v-icon>
        </v-btn>

        <v-btn class="button" fab small text v-if="cliente && cliente.id == 0"  @click="() => { this.$router.push({ path: '/consultaCliente' }); }">
          <v-icon :size="size" color="black"> account_circle </v-icon>
        </v-btn>
        <v-btn v-else-if="(typeof cliente != 'undefined') && cliente && cliente.id > 0" class="button" fab small text @click="() => { this.$router.push({ path: '/cliente' }); }">
          <v-icon :size="size" color="black"> account_circle </v-icon>
        </v-btn>
        <v-btn v-else class="button" fab small text @click="() => { this.$router.push({ path: '/login' }); }">
          <v-icon :size="size" color="black"> account_circle </v-icon>
        </v-btn>

        <v-btn v-if="cliente && cliente.id == 0" class="button" @click="() => { this.$router.push({ path: '/' }); }" fab small text>
          <v-icon :size="size" color="black"> mdi-home </v-icon>
        </v-btn>
        <v-btn v-else-if="(typeof cliente != 'undefined') && cliente && cliente.id > 0" class="button" @click="() => { this.$router.push({ path: '/carrinho' }); }" fab small text>
          <v-icon :size="size" color="black"> shopping_cart </v-icon>
        </v-btn>
        <v-btn v-else class="button" @click="() => { this.$router.push({ path: '/login' }); }" fab small text>
          <v-icon :size="size" color="black"> shopping_cart </v-icon>
        </v-btn>
        
        <v-btn class="button" v-if="cliente" @click="logout" fab small text>
            <v-icon :size="size" color="black"> logout </v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-app-bar elevation="10" dense color="#111">
      <v-app-bar-nav-icon color="white" @click="drawer = true"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-flex xs3>
        <v-text-field background-color="white" dense outlined hide-details placeholder="Pesquise Aqui..." append-icon="search"></v-text-field>
      </v-flex>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list v-if="cliente && cliente.id == 0" nav dense>
        <v-list-item-group color="grey">
          <v-subheader>Admin</v-subheader>

          <v-list-item v-for="(item, i) in items_admin" :key="i">
            <v-layout @click="$router.push({ path: item.router })">
              <v-list-item-icon>
                <v-icon v-text="item.img"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item-content>
            </v-layout>
          </v-list-item>
          
        </v-list-item-group>
      </v-list>
      <v-list v-else nav dense>
        <v-list-item-group color="grey">
          <v-subheader>Páginas</v-subheader>

          <v-list-item v-for="(item, i) in items" :key="i">
            <v-layout @click="$router.push({ path: item.router })">
              <v-list-item-icon>
                <v-icon v-text="item.img"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item-content>
            </v-layout>
          </v-list-item>
        </v-list-item-group>

        <v-divider></v-divider>
        <v-list-item-group color="grey">
          <v-subheader>Categorias</v-subheader>

          <v-list-item v-for="(item, i) in items_cat" :key="i">
            <v-layout @click="$router.push({ path: item.router })">
              <v-list-item-icon>
                <v-icon v-text="item.img"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item-content>
            </v-layout>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template v-if="cliente" v-slot:prepend>
          <v-btn block @click="logout" color="error" outlined>
            <v-icon :size="size" color="error"> logout </v-icon>
            Logout
          </v-btn>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    size: 30,
    drawer: false,
    items: [
      { name: "Tela Inicial", img: "mdi-home", router: "/" },
      { name: "Conta", img: "account_circle", router: "/cliente" },
      { name: "Cupons", img: "mdi-percent", router: "/cupom" },
      { name: "Carrinho", img: "shopping_cart", router: "/carrinho" },
    ],
    items_cat: [
      { name: "Masculino", img: "man", router: "/categoria/masculino" },
      { name: "Feminino", img: "woman", router: "/categoria/feminino" },
      { name: "Personalizadas", img: "handyman", router: "/categoria/personalizado" },
      { name: "Carbono", img: "widgets", router: "/categoria/carbono" },
      { name: "Documento", img: "folder_special", router: "/categoria/documento" },
    ],
    items_admin: [
      { name: "Clientes", img: "account_circle", router: "/consultaCliente" },
      { name: "Cupoms", img: "mdi-percent", router: "/cupomAdm" },
      { name: "Gráficos", img: "bar_chart", router: "/grafico_adm" },
    ],
    cliente: {
      id: null
    },
  }),
  mounted(){
    this.cliente = JSON.parse(localStorage.getItem('cliente'));
    if(typeof this.cliente == 'undefined' || this.cliente == null){
      this.items[1].router = '/login';
      this.items[2].router = '/login';
      this.items[3].router = '/login';
    }
  },

  methods: {
    methodName() {
      return this.$router.push("/");
    },
    logout(){
      localStorage.removeItem("cliente");
      this.$router.push("/");
      this.$router.go();
    }
  },
};
</script>
<style scoped>
.v-input__control {
  max-height: 30px !important;
}
.button {
  margin-right: 10px;
  margin-bottom: 5px;
}
</style>
