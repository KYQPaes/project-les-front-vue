<template>
  <v-app>
    <v-card :style="{ backgroundImage: 'url(https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/fabaa169848551.5b8f9bb8332c8.gif)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', display: 'flex', height: '100%', backgroundPosition: 'center', backgroundSize: 'cover' }">
      <v-main class="d-flex justify-center align-center">
        <v-col cols="10" lg="4" class="mx-auto">
          <v-card class="pa-4" elevation="24">
            <div class="text-center">
              <v-img class="mx-auto" src="../images/logo.png" width="250" height="250"></v-img>
              <h2 class="blue--text">Login</h2>
            </div>
            <v-form @submit.prevent="submitHandler" ref="form">
              <v-card-text>
                <v-layout>
                  <v-flex xs12>
                    <v-text-field v-model="email" :rules="emailRules" type="email" label="Email" placeholder="Email" prepend-inner-icon="mdi-account" />
                  </v-flex>
                </v-layout>

                <v-layout>
                  <v-flex xs12>
                    <v-text-field v-model="password" :rules="passwordRules" :type="passwordShow ? 'text' : 'password'" label="Senha" placeholder="Senha" prepend-inner-icon="mdi-lock" :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'" @click:append="passwordShow = !passwordShow" />
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-actions class="justify-center" style="margin-bottom: 30px">
                <v-btn :loading="loading" type="submit" color="blue">
                  <span class="white--text px-8">Login </span>
                </v-btn>
              </v-card-actions>
              <div class="text-center">
                <h3 class="indigo--text">Não possui uma conta?</h3>
                <v-card-actions class="justify-center">
                  <v-btn color="black">
                    <span class="white--text px-8">Inscreva-se</span>
                  </v-btn>
                </v-card-actions>
              </div>
            </v-form>
          </v-card>
        </v-col>
      </v-main>
      <v-snackbar top color="green" v-model="snackbar"> Login Efetuado com sucesso </v-snackbar>
    </v-card>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    snackbar: false,

    passwordShow: false,

    password: "",
    passwordRules: [(v) => !!v || "Senha Obrigatória", (v) => (v && v.length >= 6) || "Senha deve ser maior que 6 dígitos"],
    email: "",
    emailRules: [(v) => !!v || "E-mail", (v) => /.+@.+\..+/.test(v) || "E-mail Inválido"],
  }),

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

<style scoped></style>
