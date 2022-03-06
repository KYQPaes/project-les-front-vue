<template>
  <div>
    <Menu />
    <v-app style="margin-bottom: 60px; margin-top: 60px">
      <v-layout>
        <v-main class="d-flex justify-center align-center">
          <v-col cols="10" lg="4" class="mx-auto">
            <v-card class="pa-4" elevation="24">
              <div class="text-center">
                <v-icon size="80px" color="black"> credit_card </v-icon>
                <h2 class="blue--text">Cadastro de Cartão</h2>
              </div>
              <v-form @submit.prevent="submitHandler" ref="form">
                <v-card-text>
                  <v-layout>
                    <v-flex xs6>
                      <v-text-field v-model="cartao.nome" :rules="emptyRules" label="Nome no cartão"></v-text-field>
                    </v-flex>

                    <v-flex xs6>
                      <v-text-field v-model="cartao.numero" :rules="emptyRules" label="Numero no cartão"></v-text-field>
                    </v-flex>
                  </v-layout>

                  <v-layout>
                    <v-flex xs6>
                      <v-text-field v-model="cartao.validade" :rules="emptyRules" type="Validade" label="Validade" placeholder="Validade" />
                    </v-flex>
                    <v-flex xs4>
                      <v-select v-model="cartao.bandeira" :rules="emptyRules" :items="bandeira" label="Bandeira"></v-select>
                    </v-flex>
                  </v-layout>

                  <v-layout>
                    <v-flex xs4>
                      <v-text-field v-model="cartao.cvv" :rules="emptyRules" type="CVV" label="CVV" placeholder="CVV" />
                    </v-flex>
                    <v-flex xs8>
                      <v-text-field v-model="cartao.cpf" :rules="emptyRules" type="CPF" label="CPF" placeholder="CPF" />
                    </v-flex>
                  </v-layout>
                </v-card-text>

                <v-card-actions class="justify-center">
                  <v-btn v-if="cartao.id > 0" :loading="loading" type="submit" color="blue">
                    <span class="white--text px-8">Editar</span>
                  </v-btn>
                  <v-btn v-else :loading="loading" type="submit" color="blue">
                    <span class="white--text px-8">Efetuar Cadastro</span>
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-col>
        </v-main>
        <v-snackbar top :color="error == true ? 'error' : 'green'" v-model="snackbar">
          <span v-if="error == false"> Endereço cadastrado com sucesso </span>
          <span v-else> Erro ao realizar o cadastro, verifique todos os campos </span>
        </v-snackbar>
      </v-layout>
    </v-app>
    <Footer />
  </div>
</template>

<script>
import Menu from "../components/Menu.vue";
import Footer from "../components/Footer.vue";
import cartaoService from "@/service/cartoes";

export default {
  data: (vm) => ({
    bandeira: ["MasterCard", "Visa", "Dinners Club", "Discover", "JCB", "American Express"],

    loading: false,
    snackbar: false,
    error: false,

    cartao: {
      nome: "",
      numero: "",
      cvv: "",
      cpf: "",
      validade: "",
      bandeira: "",
      clienteId: JSON.parse(localStorage.getItem("cliente")).id,
    },

    emptyRules: [(v) => !!v || "Campo Obrigatório"],
  }),

  components: {
    Menu,
    Footer,
  },

  mounted() {
    if (JSON.parse(localStorage.getItem("cartao"))) this.cartao = JSON.parse(localStorage.getItem("cartao"));
    console.log(this.cartao);
  },

  methods: {
    submitHandler() {
      this.error = false;
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.loading = false;
        if (this.cartao.id > 0) {
          cartaoService.update(this.cartao).then((response) => {
            if (response.data) {
              this.error = false;
              this.snackbar = true;

              setTimeout(() => {
                localStorage.removeItem("cartao");
                this.$router.push({ path: "/cliente" });
              }, 1500);
            }
          });
        } else {
          cartaoService
            .create(this.cartao)
            .then((response) => {
              if (response.data) {
                this.error = false;
                this.snackbar = true;

                setTimeout(() => {
                  this.$router.push({ path: "/cliente" });
                }, 1500);
              }
            })
            .catch(() => {
              this.error = true;
              this.snackbar = true;
            });
        }
      }
    },

    cartaoList() {
      cartaoService.listClienteId(JSON.parse(localStorage.getItem("cliente")).id).then((response) => {
        this.cartao = response.data;
        console.log(response.data);
      });
    },

    update() {
      this.error = false;
      if (this.$refs.form.validate()) {
        cartaoService
          .update(this.cartao)
          .then((response) => {
            if (response.data) {
              this.error = false;
              this.snackbar = true;
              setTimeout(() => {
                localStorage.setItem("cartao", JSON.stringify(response.data));
                this.$router.go();
              }, 1500);
            }
          })
          .catch(() => {
            this.error = true;
            this.snackbar = true;
          });
      }
      cartaoService.update(this.cartao);
    },
  },
};
</script>

<style scoped>
.v-text-field {
  padding: 10px;
}

::v-deep .v-application--wrap {
  min-height: 40vh !important;
}
</style>
