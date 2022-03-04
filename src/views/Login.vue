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
            <v-form>
              <v-card-text>
                <v-layout>
                  <v-flex xs12>
                    <v-text-field type="email" label="Email" placeholder="Email" prepend-inner-icon="mdi-account" />
                  </v-flex>
                </v-layout>

                <v-layout>
                  <v-flex xs12>
                    <v-text-field :type="passwordShow ? 'text' : 'password'" label="Senha" placeholder="Senha" prepend-inner-icon="mdi-lock" :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'" @click:append="passwordShow = !passwordShow" />
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-actions class="justify-center" style="margin-bottom: 30px">
                <v-btn color="black">
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
    </v-card>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    passwordShow: false,

    password: "",
    passwordRules: [(v) => !!v || "Senha Obrigatória is required", (v) => (v && v.length >= 6) || "Senha deve ser maior que 6 dígitos"],
    email: "",
    emailRules: [(v) => !!v || "E-mail is required", (v) => /.+@.+\..+/.test(v) || "E-mail must be valid"],
  }),
};
</script>

<style scoped></style>
