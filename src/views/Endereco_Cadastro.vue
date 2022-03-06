<template>
  <div>
    <Menu />
    <v-app style="margin-bottom: 60px; margin-top: 60px">
      <v-layout>
        <v-main class="d-flex justify-center align-center">
          <v-col cols="10" lg="4" class="mx-auto">
            <v-card class="pa-4" elevation="24">
              <div class="text-center">
                <v-icon size="80px" color="black"> home </v-icon>
                <h2 class="blue--text">Endereços</h2>
              </div>
              <v-form @submit.prevent="submitHandler" ref="form">
                <v-card-text>
                  <v-layout>
                    <v-flex xs6>
                      <v-select v-model="endereco.tipo_residencia" :rules="emptyRules" :items="TipoResidencia" label="Tipo de residência"></v-select>
                    </v-flex>

                    <v-flex xs6>
                      <v-select v-model="endereco.tipo_logradouro" :rules="emptyRules" :items="TipoLogradouro" label="Tipo de Logradouro"></v-select>
                    </v-flex>
                  </v-layout>

                  <v-layout>
                    <v-flex xs10>
                      <v-text-field v-model="endereco.endereco" :rules="emptyRules" type="logradouro" label="Logradouro" placeholder="Logradouro" />
                    </v-flex>
                  </v-layout>

                  <v-layout>
                    <v-flex xs4>
                      <v-text-field v-mask="'#####'" v-model="endereco.numero" :rules="emptyRules" type="numero" label="Numero" placeholder="Numero" />
                    </v-flex>
                    <v-flex xs8>
                      <v-text-field v-model="endereco.bairro" :rules="emptyRules" type="bairro" label="Bairro" placeholder="Bairro" />
                    </v-flex>
                  </v-layout>

                  <v-layout>
                    <v-flex xs4>
                      <v-text-field v-mask="'#####-###'" v-model="endereco.cep" :rules="emptyRules" type="cep" label="CEP" placeholder="CEP" />
                    </v-flex>
                    <v-flex xs6>
                      <v-text-field v-model="endereco.cidade" :rules="emptyRules" type="cidade" label="Cidade" placeholder="Cidade" />
                    </v-flex>
                  </v-layout>

                  <v-layout>
                    <v-flex xs6>
                      <v-select v-model="endereco.pais" :rules="emptyRules" :items="countryList" label="Pais"></v-select>
                    </v-flex>
                    <v-flex xs3>
                      <v-select v-model="endereco.estado" :rules="emptyRules" :items="Estado" label="Estado" :disabled="endereco.pais == 'Brazil' ? false : true"></v-select>
                    </v-flex>
                  </v-layout>
                </v-card-text>

                <v-card-actions class="justify-center">
                  <v-btn v-if="endereco.id > 0" :loading="loading" type="submit" color="blue">
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
import enderecoService from "@/service/enderecos";

export default {
  data: (vm) => ({
    TipoResidencia: ["Casa", "Apartamento", "Condomínio", "Trabalho", "Comercio", "Outro"],
    TipoLogradouro: ["Privado", "Publico"],
    Estado: ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"],
    countryList: ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas (the)", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia (Plurinational State of)", "Bonaire, Sint Eustatius and Saba", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory (the)", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Cayman Islands (the)", "Central African Republic (the)", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands (the)", "Colombia", "Comoros (the)", "Congo (the Democratic Republic of the)", "Congo (the)", "Cook Islands (the)", "Costa Rica", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czechia", "Côte d'Ivoire", "Denmark", "Djibouti", "Dominica", "Dominican Republic (the)", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Falkland Islands (the) [Malvinas]", "Faroe Islands (the)", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories (the)", "Gabon", "Gambia (the)", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and McDonald Islands", "Holy See (the)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea (the Democratic People's Republic of)", "Korea (the Republic of)", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic (the)", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands (the)", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia (Federated States of)", "Moldova (the Republic of)", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands (the)", "New Caledonia", "New Zealand", "Nicaragua", "Niger (the)", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands (the)", "Norway", "Oman", "Pakistan", "Palau", "Palestine, State of", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines (the)", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Republic of North Macedonia", "Romania", "Russian Federation (the)", "Rwanda", "Réunion", "Saint Barthélemy", "Saint Helena, Ascension and Tristan da Cunha", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin (French part)", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten (Dutch part)", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "Sudan (the)", "Suriname", "Svalbard and Jan Mayen", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands (the)", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates (the)", "United Kingdom of Great Britain and Northern Ireland (the)", "United States Minor Outlying Islands (the)", "United States of America (the)", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela (Bolivarian Republic of)", "Viet Nam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe", "Åland Islands"],

    loading: false,
    snackbar: false,
    error: false,

    endereco: {},

    endereco: {
      tipo_residencia: "",
      tipo_logradouro: "",
      endereco: "",
      numero: "",
      bairro: "",
      cep: "",
      cidade: "",
      pais: "",
      estado: "",
      clienteId: JSON.parse(localStorage.getItem("cliente")).id,
    },

    emptyRules: [(v) => !!v || "Campo Obrigatório"],
  }),

  components: {
    Menu,
    Footer,
  },

  mounted() {
    if (JSON.parse(localStorage.getItem("endereco"))) this.endereco = JSON.parse(localStorage.getItem("endereco"));
    console.log(this.endereco);
  },

  methods: {
    submitHandler() {
      this.error = false;
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.loading = false;
        if (this.endereco.id > 0) {
          enderecoService.update(this.endereco).then((response) => {
            if (response.data) {
              this.error = false;
              this.snackbar = true;
              setTimeout(() => {
                localStorage.removeItem("endereco");
                this.$router.push({ path: "/cliente" });
              }, 1500);
            }
          });
        } else {
          enderecoService
            .create(this.endereco)
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

    enderecoList() {
      enderecoService.listClienteId(JSON.parse(localStorage.getItem("cliente")).id).then((response) => {
        this.enderecos = response.data;
      });
    },

    update() {
      this.error = false;
      if (this.$refs.form.validate()) {
        enderecoService
          .update(this.endereco)
          .then((response) => {
            if (response.data) {
              this.error = false;
              this.snackbar = true;
              setTimeout(() => {
                localStorage.setItem("endereco", JSON.stringify(response.data));
                this.$router.go();
              }, 1500);
            }
          })
          .catch(() => {
            this.error = true;
            this.snackbar = true;
          });
      }
      enderecoService.update(this.endereco);
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
