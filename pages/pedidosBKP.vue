<template>
  <div>
    <v-container grid-list-xs class="pa-0">
      <template v-if="mostrarTabela === true">
        <div>
          <v-card class="" elevation="3" max-width="">
            <v-card-title class="pa-1 text-button text-sm-subtitle-1">
              <v-row>
                <v-col> Total Pedidos: {{ total_pedidos }} </v-col>
                <v-col> Pontos: {{ totalPontos_pedidos }} </v-col>
              </v-row>
            </v-card-title>
            <v-simple-table dense>
              <thead class="info text-uppercase">
                <tr>
                  <th class="white--text pa-1 text-sm-subtitle-1">Nº</th>
                  <th
                    class="white--text pa-0 text-sm-subtitle-1"
                    style="width: 25%"
                  >
                    DATA
                  </th>
                  <th
                    class="white--text pa-0 text-sm-subtitle-1"
                    style="width: 40%"
                  >
                    VL
                  </th>
                  <!--th class="white--text d-none d-md-inline-block pt-4">VL</!--th-->
                  <th class="white--text pa-1 text-sm-subtitle-1">ST</th>
                  <th
                    class="white--text pa-0 text-sm-subtitle-1"
                    style="width: 25%"
                  >
                    AÇÕES
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="list in lpedidos"
                  :key="list.id_venda"
                  class="text-caption text-sm-subtitle-1 text-md-subtitle-1 text-lg-button text-uppercase pa-0"
                >
                  <td
                    class="text-caption text-sm-subtitle-1 text-md-subtitle-1 text-lg-button text-uppercase pa-1"
                  >
                    {{ list.numero_venda }}
                  </td>
                  <td
                    class="text-caption text-sm-subtitle-1 text-md-subtitle-1 text-lg-button text-uppercase pa-0"
                  >
                    {{ list.data_venda }}
                  </td>
                  <!-- td class="text-caption text-sm-subtitle-1 text-md-subtitle-1 text-lg-button d-none d-md-inline-block pt-4">
                    {{ list.total_venda }}
                  </!-->
                  <td
                    class="text-caption text-sm-subtitle-1 text-md-subtitle-1 text-lg-button pa-0"
                  >
                    R$ {{ list.total_venda }}
                  </td>
                  <td
                    class="text-caption text-sm-subtitle-1 text-md-subtitle-1 text-lg-button text-uppercase pa-1"
                  >
                    {{ list.status_venda }}
                  </td>
                  <td class="pa-1">
                    <v-icon
                      color="blue"
                      size="20"
                      @click="detalharFilial(list.id_venda)"
                      >edit</v-icon
                    >
                    <v-icon
                      color="red"
                      size="20"
                      @click="deletarFilial(list.id_venda)"
                      >delete
                    </v-icon>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card>
        </div>
      </template>
    </v-container>
    <v-btn
      color="blue"
      fab
      fixed
      bottom
      right
      style="bottom: 50px"
      height="45"
      width="45"
      @click="novoPedido()"
    >
      <v-icon color="white">add</v-icon>
    </v-btn>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      total_pedidos: 0,
      totalVendasPendentes: 0,
      totalVendasRejeitadas: 0,
      totalVendasAprovadas: 0,
      mostrarTabela: true,
      lpedidos: [],
      totalPontos_pedidos: 0,
      host: '10.5.59.70',
      // host: '192.168.0.121',
      // host: 'localhost',
      id_usuario: 0,
    }
  },
  created() {
    console.log('---------------- created index----------------------')
    // this.getLogado()
  },
  mounted() {
    this.getLogado()
    this.getVendas()
    console.log('--------- mounted -----------------')
  },

  methods: {
    novoPedido() {
      this.$router.push('/vendas')
    },
    async getVendas() {
      const pedidos = await axios.get(
        `http://${this.host}:4000/vendas/${this.id_usuario}`
      )
      const dados = pedidos.data.vendas
      const tam = pedidos.data.quantidade
      this.total_pedidos = tam

      if (tam > 1) {
        for (let i = 0; i < tam; i++) {
          // const dt = this.formataData(pedidos.data.vendas[i].data_venda)
          // pedidos.data.vendas[i].data_venda = dt
          // console.log('-------------- data formatada: ' + dt)
          // ----------------- data pedido ----------------------
          const dtOriginal = dados.data_venda
          const dtFormatada = this.formataData(dtOriginal)
          dados[i].data_venda = dtFormatada
          this.totalPontos_pedidos += dados[i].total_pontos
          // ----------------- status pedido ----------------------
          const status = dados.status
          if (status === 0) {
            dados.status = 'P'
          } else if (status === 1) {
            dados.status = 'F'
          } else if (status === 2) {
            dados.status = 'R'
          } else if (status === 3) {
            dados.status = 'V'
          }
          console.log('------------------------ data formatada: ' + dtFormatada)
          dados[i].data_venda = dtFormatada
          console.log(
            '------------------------ data formatada2: ' + dtFormatada
          )

          this.lpedidos.push(pedidos.data.vendas[i])
        }
      } else {
        console.log('-------------- dados(data original): ' + dados.data_venda)
        const dtOriginal = dados.data_venda
        const dtFormatada = this.formataData(dtOriginal)
        this.totalPontos_pedidos += dados.total_pontos
        console.log('------------------------ data formatada: ' + dtFormatada)
        dados.data_venda = dtFormatada
        console.log('------------------------ data formatada2: ' + dtFormatada)

        // ----------------- status pedido ----------------------
        const status = dados.status_venda
        if (status === 0) {
          dados.status_venda = 'P'
        } else if (status === 1) {
          dados.status_venda = 'F'
        } else if (status === 2) {
          dados.status_venda = 'R'
        } else if (status === 3) {
          dados.status_venda = 'V'
        }
        console.log('------------------------ dados: ' + dados.status_venda)
        this.lpedidos.push(dados)
      }
    },
    getNivelUsuario() {
      this.nivelUsuario = sessionStorage.getItem('nivelUsuario')
      return this.nivelUsuario
    },
    getLogado() {
      // this.token = sessionStorage.getItem('token')
      this.id_usuario = sessionStorage.getItem('idUsuario')
      this.logado = sessionStorage.getItem('logado')
      this.nivelUsuario = sessionStorage.getItem('nivelUsuario')
    },
    formataData(data) {
      const f = data.substring(0, 10)
      const dt = f.split('-')
      const ano = dt[0]
      const mm = dt[1]
      const dd = dt[2]
      const dtFinal = dd + '/' + mm + '/' + ano

      return dtFinal
    },
  },
}
</script>
