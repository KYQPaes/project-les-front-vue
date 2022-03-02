<template>
        <div>
            <v-layout>
                <v-flex xs12>
                    <div class="text-xs-center">
                        <v-img class="mx-auto" src="../images/logo.png" width="250" height="250"></v-img> 
                    </div>
                </v-flex>
            </v-layout>
            <v-layout style="margin-bottom:10px">
                <v-spacer>
                </v-spacer>
                <v-flex xs1>
                        <!-- <a class="otherPage" href="http://localhost:8080/deus-1.0-SNAPSHOT/cupons.jsp" draggable="false">   -->
                        <v-btn id="button" fab small text>
                            <v-icon :size="size" color="black">
                                mdi-percent
                            </v-icon>
                        </v-btn>
                        <!-- </a> -->
                        <!-- <a class="otherPage" href="http://localhost:8080/deus-1.0-SNAPSHOT/login.xhtml" draggable="false">   -->
                        <v-btn id="button" fab small text>
                            <v-icon :size="size" color="black">
                                account_circle
                            </v-icon>
                        </v-btn>
                        <!-- </a> -->
                        <!-- <a class="otherPage" href="http://localhost:8080/deus-1.0-SNAPSHOT/carrinho.jsp" draggable="false">   -->
                        <v-btn id="button" fab small text>
                            <v-icon :size="size" color="black">
                                shopping_cart
                            </v-icon>
                        </v-btn>
                        <!-- </a> -->
                </v-flex>
            </v-layout>
            <v-app-bar elevation="10" dense color="#111">
                <v-app-bar-nav-icon color="white" @click="drawer = true"></v-app-bar-nav-icon>
                <v-spacer></v-spacer>
                <v-flex xs3>
                    <v-text-field background-color="white" dense outlined hide-details placeholder="Pesquise Aqui..." append-icon="search"></v-text-field>
                </v-flex>
            </v-app-bar>
            <v-navigation-drawer v-model="drawer" absolute temporary >
                <v-list nav dense >
                    <v-list-item-group color="grey">
                        <v-subheader>Páginas</v-subheader>
                        <v-list-item v-for="(item, i) in items" :key="i">
                            <v-list-item-icon>
                                <v-icon v-text="item.img"></v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title v-text="item.name"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-subheader>Categorias</v-subheader>
                        <v-list-item v-for="(item, i) in items_cat" :key="i">
                            <v-list-item-icon>
                                <v-icon v-text="item.img"></v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title v-text="item.name"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-navigation-drawer>
            </div>
        </div>
</template>

<script>
export default {
    data: () => ({
        size: 30,
        drawer: false,
        items: [
            { name: "Tela Inicial", img: "mdi-home" },
            { name: "Conta", img: "account_circle" },
            { name: "Cupons", img: "mdi-percent" },
            { name: "Carrinho", img: "shopping_cart" },
        ],
        items_cat: [
            { name: "Masculino", img: "man" },
            { name: "Feminino", img: "woman" },
            { name: "Personalizadas", img: "handyman" },
            { name: "Carbono", img: "widgets" },
            { name: "Documento", img: "folder_special" },
        ],
    })
}
</script>
<style scoped>
.v-input__control{
  max-height: 30px !important;
}
.vbutton{
    margin-right:10px;
    margin-bottom: 5px
}
</style>