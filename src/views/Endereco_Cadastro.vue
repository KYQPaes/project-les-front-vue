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
                      <v-select v-model="tipoResidencia" :rules="emptyRules" :items="TipoResidencia" label="Tipo de residência"></v-select>
                    </v-flex>
                    <v-flex xs6>
                      <v-select v-model="tipoLogradouro" :rules="emptyRules" :items="TipoLogradouro" label="Tipo de Logradouro"></v-select>
                    </v-flex>
                  </v-layout>

                  <v-layout>
                    <v-flex xs10>
                      <v-text-field v-model="logradouro" :rules="emptyRules" type="logradouro" label="Logradouro" placeholder="Logradouro" />
                    </v-flex>
                  </v-layout>

                  <v-layout>
                    <v-flex xs4>
                      <v-text-field v-mask="'#####'" v-model="numero" :rules="emptyRules" type="numero" label="Numero" placeholder="Numero" />
                    </v-flex>
                    <v-flex xs8>
                      <v-text-field v-model="bairro" :rules="emptyRules" type="bairro" label="Bairro" placeholder="Bairro" />
                    </v-flex>
                  </v-layout>

                  <v-layout>
                    <v-flex xs4>
                      <v-text-field v-mask="'#####-###'" v-model="cep" :rules="emptyRules" type="cep" label="CEP" placeholder="CEP" />
                    </v-flex>
                    <v-flex xs6>
                      <v-text-field v-model="cidade" :rules="emptyRules" type="cidade" label="Cidade" placeholder="Cidade" />
                    </v-flex>
                  </v-layout>

                  <v-layout>
                    <v-flex xs6>
                      <v-select v-model="pais" :rules="emptyRules" :items="countryList" label="Pais"></v-select>
                    </v-flex>
                    <v-flex xs3>
                      <v-select v-model="estado" :rules="emptyRules" :items="Estado" label="Estado" :disabled="pais == 'Brazil' ? false : true"></v-select>
                    </v-flex>
                  </v-layout>
                </v-card-text>

                <v-card-actions class="justify-center">
                  <v-btn :loading="loading" type="submit" color="blue">
                    <span class="white--text px-8">Efetuar Cadastro</span>
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-col>
          <v-snackbar top color="green" v-model="snackbar">Endereço cadastrado com sucesso </v-snackbar>
        </v-main>
      </v-layout>
    </v-app>
    <Footer />
  </div>
</template>

<script>
import Menu from "../components/Menu.vue";
import Footer from "../components/Footer.vue";
import vueCountriesCities from "vue-countries-cities";

export default {
  data: (vm) => ({
    TipoResidencia: ["Casa", "Apartamento", "Condomínio", "Trabalho", "Comercio", "Outro"],
    TipoLogradouro: ["Privado", "Publico"],
    Estado: ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"],
    countryList: ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas (the)", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia (Plurinational State of)", "Bonaire, Sint Eustatius and Saba", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory (the)", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Cayman Islands (the)", "Central African Republic (the)", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands (the)", "Colombia", "Comoros (the)", "Congo (the Democratic Republic of the)", "Congo (the)", "Cook Islands (the)", "Costa Rica", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czechia", "Côte d'Ivoire", "Denmark", "Djibouti", "Dominica", "Dominican Republic (the)", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Falkland Islands (the) [Malvinas]", "Faroe Islands (the)", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories (the)", "Gabon", "Gambia (the)", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and McDonald Islands", "Holy See (the)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea (the Democratic People's Republic of)", "Korea (the Republic of)", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic (the)", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands (the)", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia (Federated States of)", "Moldova (the Republic of)", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands (the)", "New Caledonia", "New Zealand", "Nicaragua", "Niger (the)", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands (the)", "Norway", "Oman", "Pakistan", "Palau", "Palestine, State of", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines (the)", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Republic of North Macedonia", "Romania", "Russian Federation (the)", "Rwanda", "Réunion", "Saint Barthélemy", "Saint Helena, Ascension and Tristan da Cunha", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin (French part)", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten (Dutch part)", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "Sudan (the)", "Suriname", "Svalbard and Jan Mayen", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands (the)", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates (the)", "United Kingdom of Great Britain and Northern Ireland (the)", "United States Minor Outlying Islands (the)", "United States of America (the)", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela (Bolivarian Republic of)", "Viet Nam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe", "Åland Islands"],
    pais: "",
    loading: false,
    snackbar: false,

    tipoResidencia: "",
    tipoLogradouro: "",
    logradouro: "",
    numero: "",
    bairro: "",
    cep: "",
    cidade: "",
    pais: "",
    estado: "",

    emptyRules: [(v) => !!v || "Campo Obrigatório"],
  }),

  components: {
    Menu,
    Footer,
    vueCountriesCities,
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

::v-deep .v-application--wrap {
  min-height: 63vh !important;
}
</style>
