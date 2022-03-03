<template>
  <div>
    <Menu />
    <v-app>
      <v-main class="d-flex justify-center align-center">
        <v-col cols="10" lg="4" class="mx-auto">
          <v-card class="pa-4" elevation="24">
            <div class="text-center">
              <v-icon size="80px" color="black"> home </v-icon>
              <h2 class="blue--text">Endereços</h2>
            </div>
            <v-form>
              <v-card-text>
                <v-layout>
                  <v-flex xs6>
                    <v-select :items="TipoResidencia" label="Tipo de residência"></v-select>
                  </v-flex>
                  <v-flex xs6>
                    <v-select :items="TipoLogradouro" label="Tipo de Logradouro"></v-select>
                  </v-flex>
                </v-layout>

                <v-layout>
                  <v-flex xs10>
                    <v-text-field type="Logradouro" label="Logradouro" placeholder="Logradouro" />
                  </v-flex>
                </v-layout>

                <v-layout>
                  <v-flex xs4>
                    <v-text-field type="Numero" label="Numero" placeholder="Numero" />
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field type="Bairro" label="Bairro" placeholder="Bairro" />
                  </v-flex>
                </v-layout>

                <v-layout>
                  <v-flex xs4>
                    <v-text-field type="CEP" label="CEP" placeholder="CEP" />
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field type="Cidade" label="Cidade" placeholder="Cidade" />
                  </v-flex>
                </v-layout>

                <v-layout>
                  <v-flex xs3>
                    <v-select :items="Estado" label="Estado"></v-select>
                  </v-flex>
                  <v-flex xs5>
                    <v-text-field type="Pais" label="Pais" placeholder="Pais" />
                  </v-flex>
                </v-layout>
              </v-card-text>

              <v-card-actions class="justify-center">
                <v-btn color="black">
                  <span class="white--text px-8">Efetuar Cadastro</span>
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
    TipoResidencia: ["Casa", "Apartamento", "Condomínio", "Trabalho", "Comercio", "Outro"],
    TipoLogradouro: ["Privado", "Publico"],
    Estado: ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"],
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
</style>
