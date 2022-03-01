<template>
        <v-div>
            <v-layout>
                <v-flex xs13>
                    <div class="text-xs-center">
                        <v-img class="mx-auto" src="../images/logo.png" width="250" height="250"></v-img> 
                    </div>
                </v-flex>
            </v-layout>
            <v-toolbar>
            </v-toolbar>
                    <div>
                        <!-- <a class="otherPage" href="http://localhost:8080/deus-1.0-SNAPSHOT/cupons.jsp" draggable="false">   -->

                        <img src="images/icon/cupom.png" width="40" height="40" draggable="false" ></img> 
                        <!-- </a> -->
                        <!-- <a class="otherPage" href="http://localhost:8080/deus-1.0-SNAPSHOT/login.xhtml" draggable="false">   -->
                            <img src="images/icon/login.png" id="user" width="40" height="40" draggable="false" ></img> 
                        <!-- </a> -->
                        <!-- <a class="otherPage" href="http://localhost:8080/deus-1.0-SNAPSHOT/carrinho.jsp" draggable="false">   -->
                        <v-icon width="40" height="40">
                            mdi-percent
                        </v-icon>
                            <img src="images/icon/cart.png" width="40" height="40" draggable="false" ></img> 
                        <!-- </a> -->
                    </div>
        </v-div>
</template>

<script>
export default {

}
</script>
<style scoped>

</style>