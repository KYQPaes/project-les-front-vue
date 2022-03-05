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
                    <v-text-field v-model="nome" :rules="emptyRules" type="NomeCompleto" label="Nome Completo" placeholder="NomeCompleto" />
                  </v-flex>
                </v-layout>

                <v-layout>
                  <v-flex xs6>
                    <v-select :items="items" label="Gênero" v-model="genero" :rules="emptyRules"></v-select>
                  </v-flex>

                  <v-flex xs6>
                    <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="dateFormatted" :rules="emptyRules" label="Data de Nascimento" persistent-hint prepend-icon="mdi-calendar" v-bind="attrs" @blur="date = parseDate(dateFormatted)" v-on="on"></v-text-field>
                      </template>
                      <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                    </v-menu>
                  </v-flex>
                </v-layout>

                <v-layout>
                  <v-flex xs4>
                    <v-text-field v-mask="'###.###.###.##'" type="CPF" label="CPF" placeholder="CPF" v-model="CPF" :rules="emptyRules" />
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field v-model="End" :rules="emptyRules" type="Endereço Residencial" label="Endereço Residencial" placeholder="Endereço Residencial" />
                  </v-flex>
                </v-layout>

                <v-layout>
                  <v-flex xs4>
                    <v-select :items="TipoTelefone" label="Tipo de Telefone" v-model="TipoDeTelefone"></v-select>
                  </v-flex>
                  <v-flex xs2>
                    <v-text-field v-mask="'##'" v-model="DDD" :rules="emptyRules" type="DDD" label="DDD" placeholder="DDD" />
                  </v-flex>
                  <v-flex xs5>
                    <v-text-field v-mask="TipoDeTelefone == 'Residencial' ? '####-####' : '9####-####'" v-model="Telefone" :rules="emptyRules" type="Numero de Telefone" label="Numero de Telefone" placeholder="Numero de Telefone" />
                  </v-flex>
                </v-layout>

                <v-layout>
                  <v-flex xs6>
                    <v-text-field v-model="email" :rules="emptyRules" type="email" label="Email" placeholder="Email" />
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field v-model="ConfirmarEmail" :rules="[this.email === this.ConfirmarEmail || 'campos diferentes', (v) => !!v || 'Campo Obrigatório']" type="Confirmar Email" label="Confirmar Email" placeholder="Confirmar Email" />
                  </v-flex>
                </v-layout>

                <v-layout>
                  <v-flex xs6>
                    <v-text-field v-model="password" :rules="emptyRules" class="pass" :type="passwordShow ? 'text' : 'password'" label="Senha" placeholder="Senha" :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'" @click:append="passwordShow = !passwordShow" />
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field v-model="ConfirmarPassword" :rules="[this.password === this.ConfirmarPassword || 'campos diferentes', (v) => !!v || 'Campo Obrigatório']" :type="passwordShow2 ? 'text' : 'password'" label="Confirmar Senha" placeholder="Senha" :append-icon="passwordShow2 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="passwordShow2 = !passwordShow2" />
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
      <v-snackbar top color="green" v-model="snackbar"> Cadastro Efetuado com sucesso </v-snackbar>
    </v-card>
  </v-app>
</template>

<script>
export default {
  data: (vm) => ({
    passwordShow: false,
    passwordShow2: false,
    loading: false,
    snackbar: false,
    menu1: false,
    menu2: false,

    items: ["Masculino", "Feminino"],
    TipoTelefone: ["Residencial", "Móvel"],

    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10)),
    CPF: "",
    DDD: "",
    TipoDeTelefone: "Residencial",
    Telefone: "",
    dateFormatted: "",
    email: "",
    password: "",
    ConfirmarEmail: "",
    ConfirmarPassword: "",
    DDD: "",
    Telefone: "",
    End: "",
    CPF: "",
    dateFormatted: "",
    nome: "",
    genero: "",
    checkbox: "",

    emptyRules: [(v) => !!v || "Campo Obrigatório"],
  }),

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },

  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
  },

  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },

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
</style>
