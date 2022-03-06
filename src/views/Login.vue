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
                    <v-text-field v-model="cliente.email" :rules="emailRules" type="email" label="Email" placeholder="Email" prepend-inner-icon="mdi-account" />
                  </v-flex>
                </v-layout>

                <v-layout>
                  <v-flex xs12>
                    <v-text-field v-model="cliente.password" :rules="passwordRules" :type="passwordShow ? 'text' : 'password'" label="Senha" placeholder="Senha" prepend-inner-icon="mdi-lock" :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'" @click:append="passwordShow = !passwordShow" />
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
                  <router-link to="/cadastro" style="text-decoration: none; color: inherit">
                    <v-btn color="black">
                      <span class="white--text px-8">Inscreva-se</span>
                    </v-btn>
                  </router-link>
                </v-card-actions>
              </div>
            </v-form>
          </v-card>
        </v-col>
      </v-main>
      <v-snackbar top :color="error == true ? 'error':'green'" v-model="snackbar">
        <span v-if="error==false">
          Login efetuado com sucesso
        </span>
        <span v-else>
          Login ou senha incorreto
        </span>
      </v-snackbar>
    </v-card>
  </v-app>
</template>

<script>
import clienteService from '@/service/clientes';
export default {
  data: () => ({
    loading: false,
    snackbar: false,
    passwordShow: false,
    cliente: {
      email:"",
      password: "",
    },
    error: false,
    passwordRules: [(v) => !!v || "Senha Obrigatória", (v) => (v && v.length >= 8) || "Senha deve ser maior que 8 dígitos"],
    emailRules: [(v) => !!v || "E-mail", (v) => /.+@.+\..+/.test(v) || "E-mail Inválido"],
  }),

  methods: {
    submitHandler() {
      this.error = false;
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.loading = false;
        clienteService.login(this.cliente.email, this.cliente.password).then((response) => {
          if(response.data.length>0){
            this.error = false;
            this.snackbar = true;
            setTimeout(() => {
              localStorage.setItem('cliente', JSON.stringify(response.data[0]))
              this.$router.push({ path: "/" });
            }, 1500);
          }else{
            this.error = true;
            this.snackbar = true;
          }
        });
      }
    },
  },
};
</script>

<style scoped></style>
