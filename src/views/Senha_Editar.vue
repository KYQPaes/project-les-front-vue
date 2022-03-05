<template>
  <div>
    <Menu />
    <v-app style="min-height: 63vh">
      <v-main class="d-flex justify-center align-center">
        <v-col cols="10" lg="4" class="mx-auto">
          <v-card class="pa-4" elevation="24">
            <div class="text-center">
              <v-icon size="80px" color="black"> lock </v-icon>
              <h2 class="blue--text">Editar Senha</h2>
            </div>
            <v-form @submit.prevent="submitHandler" ref="form">
              <v-card-text>
                <v-layout>
                  <v-flex xs12>
                    <v-text-field v-model="oldPassword" :rules="emptyRules" :type="passwordShow ? 'text' : 'password'" label="Senha Atual" placeholder="Senha Atual" prepend-inner-icon="mdi-lock" :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'" @click:append="passwordShow = !passwordShow" />
                  </v-flex>
                </v-layout>

                <v-layout>
                  <v-flex xs12>
                    <v-text-field v-model="newPassword" :rules="[this.newPassword !== this.oldPassword || 'Nova senha não pode ser igual a senha atual', (v) => !!v || 'Campo Obrigatório', rules.password]" :type="passwordShow2 ? 'text' : 'password'" label="Nova Senha" placeholder="Nova Senha" prepend-inner-icon="mdi-lock" :append-icon="passwordShow2 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="passwordShow2 = !passwordShow2" />
                  </v-flex>
                </v-layout>

                <v-layout>
                  <v-flex xs12>
                    <v-text-field v-model="confirmarNewPassword" :rules="[this.newPassword === this.confirmarNewPassword || 'campos diferentes', (v) => !!v || 'Campo Obrigatório']" :type="passwordShow3 ? 'text' : 'password'" label="Nova Senha" placeholder="Nova Senha" prepend-inner-icon="mdi-lock" :append-icon="passwordShow3 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="passwordShow3 = !passwordShow3" />
                  </v-flex>
                </v-layout>
              </v-card-text>

              <v-card-actions class="justify-center">
                <v-btn :loading="loading" type="submit" color="blue">
                  <span class="white--text px-8">Alterar Senha</span>
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
      </v-main>
      <v-snackbar top color="green" v-model="snackbar"> Senha Alterada com sucesso </v-snackbar>
    </v-app>
    <Footer />
  </div>
</template>

<script>
import Menu from "../components/Menu.vue";
import Footer from "../components/Footer.vue";

export default {
  data: (vm) => ({
    passwordShow: false,
    passwordShow2: false,
    passwordShow3: false,
    loading: false,
    snackbar: false,

    oldPassword: "",
    newPassword: "",
    confirmarNewPassword: "",

    emptyRules: [(v) => !!v || "Campo Obrigatório"],

    rules: {
      required: (value) => !!value || "Required.",
      password: (value) => {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        return pattern.test(value) || "Mínimo de 8 caracteres com pelo menos uma letra maiúscula, um número e um caractere especial.";
      },
    },
  }),

  components: {
    Menu,
    Footer,
  },

  methods: {
    submitHandler() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.snackbar = true;
        }, 2000);
      }
    },
  },
};
</script>

<style scoped>
.v-text-field {
  padding: 10px;
}
::v-deep .v-application--wrap {
  min-height: 63vh !important;
}
</style>
