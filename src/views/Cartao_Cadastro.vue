<template>
  <div>
    <Menu />
    <v-app>
      <v-main class="d-flex justify-center align-center">
        <v-col cols="10" lg="4" class="mx-auto">
          <v-card class="pa-4" elevation="24">
            <v-form>
              <div class="text-center">
                <h2 class="blue--text">Cartão de Crédito</h2>
              </div>

              <VCreditCard :trans="translations" />

              <v-card-actions class="justify-center">
                <v-btn color="black">
                  <span class="white--text px-8">Cadastrar Cartão</span>
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
      </v-main>
    </v-app>
    <Footer />
  </div>
</template>

<script>
import Menu from "../components/Menu.vue";
import Footer from "../components/Footer.vue";
import VCreditCard from "v-credit-card";
import "v-credit-card/dist/VCreditCard.css";

const translations = {
  name: {
    label: "Nome no cartão",
    placeholder: "Nome no cartão",
  },
  card: {
    label: "Numero do cartão",
    placeholder: "Numero do cartão",
  },
  expiration: {
    label: "Validade",
  },
  security: {
    label: "Código de segurança",
    placeholder: "CVV",
  },
};

export default {
  data: (vm) => ({
    translations,
  }),

  components: {
    Menu,
    Footer,
    VCreditCard,
  },
};
</script>

<style scoped>
.v-text-field {
  padding: 10px;
}
</style>
