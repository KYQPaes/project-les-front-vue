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
                    <v-text-field v-model="password.oldPassword" :rules="emptyRules" :type="passwordShow ? 'text' : 'password'" label="Senha Atual" placeholder="Senha Atual" prepend-inner-icon="mdi-lock" :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'" @click:append="passwordShow = !passwordShow" />
                  </v-flex>
                </v-layout>

                <v-layout>
                  <v-flex xs12>
                    <v-text-field v-model="password.newPassword" :rules="[this.password.newPassword !== this.password.oldPassword || 'Nova senha não pode ser igual a senha atual', (v) => !!v || 'Campo Obrigatório', rules.password]" :type="passwordShow2 ? 'text' : 'password'" label="Nova Senha" placeholder="Nova Senha" prepend-inner-icon="mdi-lock" :append-icon="passwordShow2 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="passwordShow2 = !passwordShow2" />
                  </v-flex>
                </v-layout>

                <v-layout>
                  <v-flex xs12>
                    <v-text-field v-model="password.confirmarNewPassword" :rules="[this.password.newPassword === this.password.confirmarNewPassword || 'campos diferentes', (v) => !!v || 'Campo Obrigatório']" :type="passwordShow3 ? 'text' : 'password'" label="Nova Senha" placeholder="Nova Senha" prepend-inner-icon="mdi-lock" :append-icon="passwordShow3 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="passwordShow3 = !passwordShow3" />
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
      <v-snackbar top :color="error == true ? 'error' : 'green'" v-model="snackbar">
        <span v-if="error == false"> Alterações realizadas com sucesso </span>
        <span v-else>
          {{ text }}
        </span>
      </v-snackbar>
    </v-app>
    <Footer />
  </div>
</template>

<script>
import Menu from "../components/Menu.vue";
import Footer from "../components/Footer.vue";
import clienteService from "../service/clientes";

export default {
  data: (vm) => ({
    passwordShow: false,
    passwordShow2: false,
    passwordShow3: false,
    loading: false,
    snackbar: false,
    error: false,
    text: "",
    cliente: {},
    password: {
      oldPassword: "",
      newPassword: "",
      confirmarNewPassword: "",
    },
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

  mounted() {
    this.cliente = JSON.parse(localStorage.getItem("cliente"));
  },

  methods: {
    submitHandler() {
      this.error = false;
      if (this.$refs.form.validate()) {
        if (this.password.oldPassword == this.cliente.senha) {
          this.cliente.senha = this.password.newPassword;
          clienteService
            .update(this.cliente)
            .then((response) => {
              if (response.data) {
                this.error = false;
                this.snackbar = true;
                setTimeout(() => {
                  localStorage.setItem("cliente", JSON.stringify(response.data));
                  this.$router.push({ path: "/cliente" });
                }, 1500);
              }
            })
            .catch(() => {
              this.text = "Ocorreu algum erro";
              this.error = true;
              this.snackbar = true;
            });
        } else {
          this.text = "Senha antiga incorreta";
          this.error = true;
          this.snackbar = true;
        }
      }
      clienteService.update(this.cliente);
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
