<template>
  <div>
    <!-- Colocar um voltar à página principal aqui -->
    <v-footer dark padless >
      <v-card flat tile class="black lighten-1 white--text text-center">
        <v-card-text>
          <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          AVISO: Todas as imagens deste site estão legalmente protegidas (a não ser aquelas que já se encontram no domínio público) e não podem ser utilizadas, reproduzidas, modificadas ou distribuídas sem o consentimento por escrito da HotLine Wallet Company.
          <p/>
          Dados fornecidos pela HotLine Wallet Co.:
          "Copyright © HotLine Wallet Co., 1990 - {{ new Date().getFullYear() }}. Todos os Direitos Reservados. A HotLine Wallet Co. foi diligente no fornecimento de informações precisas e completas. Entretanto, a HotLine Wallet Co. não garante a precisão ou integridade dos dados. Tome cuidado no uso das informações fornecidas."
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong> Hotline Wallet</strong>© Todos os direitos reservados.
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
export default {
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],
  }),
}
</script>

<style scoped>
.sub_div {
  position: absolute;
  bottom: 0px;
}
</style>