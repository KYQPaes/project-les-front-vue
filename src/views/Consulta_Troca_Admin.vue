<template>
    <div>
      <Menu />
  
      <!-- style=";display: flex;flex-direction: column;align-items: center;" -->
  
      <v-card :style="{ backgroundImage: 'url(https://wallpaperscute.com/wp-content/uploads/2018/07/Graffiti-Wall-Desktop-Backgrounds-HD.jpg)', backgroundSize: 'cover', display: 'flex', flexDirection: 'column', alignItems: 'center' }">
        <div style="background-color: white; min-width: 55vw; display: flex; flex-direction: column; align-items: center">
          <v-layout class="justify-center" style="width: 100%; padding-top: 20px">
            <h2 class="blue--text">Detalhes do Pedido ID</h2>
          </v-layout>
          <v-layout class="d-flex align-center" style="width: 100%; margin-top: 15px">
            <v-flex>
              <v-layout class="justify-center">
          <v-simple-table>
              <template v-slot:default>
              <thead>
                  <tr>
                      <th class="text-left">Imagem</th>
                      <th class="text-left">Produto</th>
                      <th class="text-left">Quantidade</th>
                 
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(item, i) in pedidos" :key="item.produtoid">
                      <td :key="item.imagem"><img style="width: 50px; height: 50px" :src="produtos[i].imagem"></td>
                      <td>{{ produtos[i].nome }}</td>
                      <td>{{ item.quantidade }}</td>
          
                  </tr>
              </tbody>
              </template>
          </v-simple-table>
      </v-layout>
              <v-divider></v-divider>
  
              <!-- <v-layout class="justify-center">
                <p style="margin-top: 20px">Quantidade a ser trocada:</p>
                <v-flex xs1>
                  <v-text-field style="margin-left: 10px" type="number" />
                </v-flex>
              </v-layout> -->
  
              <v-layout class="justify-center">
                <v-flex xs8>
                  <h4>Motivo da troca:</h4>
                  <v-col cols="12">
                    <v-textarea
          name="input-7-1"
          disabled   
          v-model="compra.motivoTroca"      
        ></v-textarea>
                  </v-col>
                </v-flex>
              </v-layout>
              <v-layout class="justify-center">
                <v-col style="flex-grow: 0; margin-right: 10px">
                  <v-btn @click="updateAceito()" color="yellow" class="black--text"> Confirmar Troca </v-btn>
                </v-col>
                <v-col style="flex-grow: 0; margin-right: 10px">
                  <v-btn @click="updateRecusado()" color="red" class="black--text"> Recusar Troca </v-btn>
                </v-col>
              </v-layout>
              <v-divider></v-divider>
            </v-flex>
          </v-layout>
        </div>
      </v-card>
      <Footer />
    </div>
  </template>
  
  <script>
  import Menu from "../components/Menu.vue";
  import Footer from "../components/Footer.vue";
  import CompraService from "../service/compra";
  import CompraProdutoService from "../service/compra_produtos";
  import ProdutoService from "../service/produtos";
  export default {
    data: () => ({
       compra: {},
       pedidos: [],
       produtos: [],
       motivo: ''
    }),
    components: {
      Menu,
      Footer,
    },
    
    mounted() {
          if(this.$route.params.id)
              this.list(this.$route.params.id);
          else{}
              // this.$router.push('/consultaCliente'); retorna se ñ tiver id
    },
  
    methods: {
          list(id) {
              CompraService.findById(id).then((response) => {
                  this.compra = response.data;
                  let formated_data = this.compra.data_comp.split('-');
                  this.compra.formated_data = formated_data[2].padStart(2, '0') + '/' + formated_data[1].padStart(2, '0') + '/' + formated_data[0];
                  this.listCompraProdutos(this.compra.id);
                  console.log(this.compra)
                  this.listEnderecos(this.compra.clienteId)
              });
          },
          listCompraProdutos(compraid){
              CompraProdutoService.ListByCompraid(compraid).then((response) => {
                  this.pedidos = response.data;
                  this.pedidos.forEach((element, index) => {
                      // this.listProdutos(element.produtoid, index);
                      ProdutoService.listById(element.produtoid).then((response) => {
                          let produto = response.data;
                          this.produtos.push(produto);
                          this.$forceUpdate();
                      });
                  });
              }).then(()=>{
                  console.log(this.pedidos)
              });
              this.$forceUpdate();
          },
          updateAceito(){
              const pedido = {
                  ...this.compra,
                  status: 'TROCA AUTORIZADA',
                  
              }
              CompraService.update(pedido).then(() => {
                this.$router.go(-1)

                  
              });
          },
          updateRecusado(){
              const pedido = {
                  ...this.compra,
                  status: 'TROCA RECUSADA',
                
              }
              CompraService.update(pedido).then(() => {
                this.$router.go(-1)
              });
          }
    },
  };
  </script>
  
  <style scoped>
  .row {
    margin: 0px 0px 0px;
  }
  </style>
  