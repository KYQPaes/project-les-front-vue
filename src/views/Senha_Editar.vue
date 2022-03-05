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
            <v-form>
              <v-card-text>
                <v-layout>
                  <v-flex xs12>
                    <v-text-field :type="passwordShow ? 'text' : 'password'" label="Senha Atual" placeholder="Senha Atual" prepend-inner-icon="mdi-lock" :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'" @click:append="passwordShow = !passwordShow" />
                  </v-flex>
                </v-layout>

                <v-layout>
                  <v-flex xs12>
                    <v-text-field :type="passwordShow2 ? 'text' : 'password'" label="Nova Senha" placeholder="Nova Senha" prepend-inner-icon="mdi-lock" :append-icon="passwordShow2 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="passwordShow2 = !passwordShow2" />
                  </v-flex>
                </v-layout>

                <v-layout>
                  <v-flex xs12>
                    <v-text-field :type="passwordShow3 ? 'text' : 'password'" label="Nova Senha" placeholder="Nova Senha" prepend-inner-icon="mdi-lock" :append-icon="passwordShow3 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="passwordShow3 = !passwordShow3" />
                  </v-flex>
                </v-layout>
              </v-card-text>

              <v-card-actions class="justify-center">
                <v-btn color="black">
                  <span class="white--text px-8">Alterar Senha</span>
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

export default {
  data: (vm) => ({
    passwordShow: false,
    passwordShow2: false,
    passwordShow3: false,
  }),

  components: {
    Menu,
    Footer,
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
