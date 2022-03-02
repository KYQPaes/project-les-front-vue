<template>
        <v-div>
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
            <v-toolbar>
                <v-layout>
                    <v-flex xs4 style="border:1px solid black">
                        <v-row >
                            <v-col>
                                Masculino
                            </v-col>
                            <v-col>
                                Feminino
                            </v-col>
                            <v-col>
                                Personalizadas
                            </v-col>
                            <v-col>
                                Carbono
                            </v-col>
                            <v-col>
                                Documento
                            </v-col>
                        </v-row>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-flex xs2>
                        <v-text-field outlined hide-details label="Pesquise Aqui..." ></v-text-field>
                    </v-flex>
                </v-layout>
            </v-toolbar>
        </v-div>
</template>

<script>
export default {
    data(){
        return{
            size: 30,
        }
    }
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