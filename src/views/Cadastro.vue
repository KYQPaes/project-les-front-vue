<template>
  <v-app>
    <v-card :style="{ backgroundImage: 'url(https://images.hdqwalls.com/download/republic-of-gamers-8-bit-3n-1920x1080.jpg)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', display: 'flex', height: '100%', backgroundPosition: 'center', backgroundSize: 'cover' }">
      <v-main class="d-flex justify-center align-center">
        <v-col cols="10" lg="4" class="mx-auto">
          <v-card class="pa-4" elevation="24">
            <div class="text-center">
              <v-img class="mx-auto" src="../images/logo.png" width="250" height="250"></v-img>
              <h2 class="blue--text">Criação de conta</h2>
            </div>
            <v-form @submit.prevent="submitHandler" ref="form">
              <v-card-text>
                <v-layout>
                  <v-flex xs10>
                    <v-text-field v-model="cliente.nome" :rules="emptyRules" type="NomeCompleto" label="Nome Completo" placeholder="NomeCompleto" />
                  </v-flex>
                </v-layout>

                <v-layout>
                  <v-flex xs6>
                    <v-select :items="items" label="Gênero" v-model="cliente.genero" :rules="emptyRules"></v-select>
                  </v-flex>

                  <v-flex xs6>
                    <v-text-field type="date" v-model="cliente.data_nasc" :rules="emptyRules" label="Data de Nascimento"></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout>
                  <v-flex xs4>
                    <v-text-field v-mask="'###.###.###.##'" type="CPF" label="CPF" placeholder="CPF" v-model="cliente.cpf" :rules="emptyRules" />
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field v-model="cliente.endereco" :rules="emptyRules" type="Endereço Residencial" label="Endereço Residencial" placeholder="Endereço Residencial" />
                  </v-flex>
                </v-layout>

                <v-layout>
                  <v-flex xs4>
                    <v-select :items="TipoTelefone" label="Tipo de Telefone" v-model="cliente.tptelefone"></v-select>
                  </v-flex>
                  <v-flex xs2>
                    <v-text-field v-mask="'##'" v-model="cliente.ddd" :rules="emptyRules" type="DDD" label="DDD" placeholder="DDD" />
                  </v-flex>
                  <v-flex xs5>
                    <v-text-field v-mask="cliente.tptelefone == 'Residencial' ? '####-####' : '9####-####'" v-model="cliente.telefone" :rules="emptyRules" type="Numero de Telefone" label="Numero de Telefone" placeholder="Numero de Telefone" />
                  </v-flex>
                </v-layout>

                <v-layout>
                  <v-flex xs6>
                    <v-text-field v-model="cliente.email" :rules="emptyRules" type="email" label="Email" placeholder="Email" />
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field v-model="ConfirmarEmail" :rules="[this.cliente.email === this.ConfirmarEmail || 'campos diferentes', (v) => !!v || 'Campo Obrigatório']" type="Confirmar Email" label="Confirmar Email" placeholder="Confirmar Email" />
                  </v-flex>
                </v-layout>

                <v-layout>
                  <v-flex xs6>
                    <v-text-field validate-on-blur v-model="cliente.senha" :rules="[rules.password]" class="pass" :type="passwordShow ? 'text' : 'password'" label="Senha" placeholder="Senha" :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'" @click:append="passwordShow = !passwordShow" />
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field v-model="ConfirmarPassword" :rules="[this.cliente.senha === this.ConfirmarPassword || 'campos diferentes', (v) => !!v || 'Campo Obrigatório']" :type="passwordShow2 ? 'text' : 'password'" label="Confirmar Senha" placeholder="Senha" :append-icon="passwordShow2 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="passwordShow2 = !passwordShow2" />
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-container fluid>
                <v-checkbox v-model="checkbox" :rules="emptyRules">
                  <template v-slot:label>
                    <div>
                      Eu concordo com os
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <a target="_blank" href="https://vuetifyjs.com" @click.stop v-on="on"> Termos de Uso e Privacidade </a>
                        </template>
                        Abrir Termos de Uso e Privacidade
                      </v-tooltip>
                      do e-commerce Hotline Wallet
                    </div>
                  </template>
                </v-checkbox>
              </v-container>

              <v-card-actions class="justify-center">
                <v-btn :loading="loading" type="submit" color="blue">
                  <span class="white--text px-8">Efetuar Cadastro</span>
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
      </v-main>
      <v-snackbar top :color="error == true ? 'error' : 'green'" v-model="snackbar">
        <span v-if="error == false"> Cadastro efetuado com sucesso </span>
        <span v-else> Erro ao realizar o cadastro, verifique todos os campos </span>
      </v-snackbar>
    </v-card>
  </v-app>
</template>

<script>
import clienteService from "@/service/clientes";
export default {
  data: (vm) => ({
    passwordShow: false,
    passwordShow2: false,
    loading: false,
    snackbar: false,
    menu1: false,
    menu2: false,

    error: false,

    items: ["Masculino", "Feminino"],
    TipoTelefone: ["Residencial", "Móvel"],

    ConfirmarEmail: "",
    ConfirmarPassword: "",
    checkbox: "",

    cliente: {
      nome: "",
      senha: "",
      email: "",
      genero: "",
      cpf: "",
      endereco: "",
      tptelefone: "Residencial",
      ddd: "",
      data_nasc: "",
      telefone: "",
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

  methods: {
    submitHandler() {
      this.error = false;
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.loading = false;
        this.cliente.cpf = this.cliente.cpf.replace(/[^a-zA-Z0-9]/g, "");
        this.cliente.telefone = this.cliente.telefone.replace(/[^a-zA-Z0-9]/g, "");
        clienteService
          .create(this.cliente)
          .then((response) => {
            if (response.data) {
              this.error = false;
              this.snackbar = true;
              setTimeout(() => {
                this.$router.push({ path: "/login" });
              }, 1500);
            }
          })
          .catch(() => {
            this.error = true;
            this.snackbar = true;
          });
      }
    },
  },
};
</script>

<style scoped>
.v-text-field {
  padding: 10px;
}
</style>
