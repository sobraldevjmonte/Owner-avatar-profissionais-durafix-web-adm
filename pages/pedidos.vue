<template lang="">
  <div></div>
</template>
<template>
  <div>
    <MenuProfissionais :usuariologado="nomeUsuario" />
    <v-container grid-list-xs class="pa-0 ma-0">
      <!--v-card class="pa-2 mb-3" elevation="3">
        <v-row>
          <v-col> Total Pedidos: {{ total_pedidos }} </v-col>
          <v-col> Pontos: {{ totalPontos_pedidos }} </v-col>
        </v-row>
      </!--v-card-->
      <template>
        <div class="pl-5 pr-1 pt-2">
          <v-row align="center" justify="center">
            <v-text-field
              name="valorcliente"
              label="Revendedor..."
              id="id"
              class="pr-3"
              v-model="filtercliente"
            ></v-text-field>
          </v-row>
        </div>
      </template>
      <template v-if="mostrarTabela === true">
        <v-card
          v-for="list in filtrarCliente"
          :key="list.id_vendas"
          class="mb-4 pb-1"
          elevation="3"
        >
          <v-card-title
            class="pl-2 pt-1 pb-1 text-caption text-sm-subtitle-2 cliente"
          >
            {{ list.nome_cliente }}
          </v-card-title>
          <v-divider></v-divider>
          <v-row class="pt-3 pl-3">
            <v-col cols="4" class="pl-5 pt-3 pb-1">
              <v-row
                class="text-caption pa-1 font-weight-light text-button text-sm-subtitle-2 black--text"
                >Nº: {{ list.numero_venda }}</v-row
              >
            </v-col>
            <v-col cols="8" class="pl-5 pt-3 pb-1">
              <v-row
                class="text-caption pa-1 font-weight-light text-button text-sm-subtitle-2 black--text"
                >Data: {{ list.data_venda }}</v-row
              >
            </v-col>
          </v-row>
          <v-row class="pl-3 pb-3">
            <v-col cols="4" class="pl-5 pb-1">
              <v-row
                class="text-caption pa-1 font-weight-light text-button text-sm-subtitle-2 black--text"
                >Pontos: {{ list.total_pontos }}</v-row
              >
            </v-col>
            <v-col cols="6" class="pl-5 pb-1">
              <v-row
                class="text-caption pa-1 text-button text-sm-subtitle-2 black--text"
                >Status: {{ list.status }}</v-row
              >
            </v-col>
          </v-row>
        </v-card>
      </template>
      <v-bottom-navigation app background-color="#3877B6">
        <v-col cols="12">
          <!--v-row class="pl-3 pt-1 text-caption text-button text-sm-subtitle-1">
            <v-col cols="4" class="pt-1 pb-1">
              Pedidos: {{ total_pedidos }}
            </v-col>
            <v-col cols="8" class="pt-1 pb-1">
              Pontos: {{ totalPontos_pedidos }}
            </v-col>
          </!--v-row>
          <v-divider class="mt-2 divider" light> </v-divider -->
          <v-row class="pt-2 text-caption text-button text-sm-subtitle-1">
            <v-col cols="4" class="pt-0 white--text">
              Pendentes: {{ totalPontosPendentes }}
            </v-col>
            <v-col cols="4" class="pt-0 white--text">
              Aprovados: {{ totalPontosAprovados }}
            </v-col>
            <v-col cols="4" class="pt-0 white--text">
              Rejeitados: {{ totalPontosRejeitados }}
            </v-col>
          </v-row>
        </v-col>
      </v-bottom-navigation>
    </v-container>
    <v-btn
      color="blue"
      fab
      fixed
      bottom
      right
      style="bottom: 80px; right: 40px"
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
      totalPontosPendentes: 0,
      totalPontosAprovados: 0,
      totalPontosRejeitados: 0,
      mostrarTabela: true,
      lpedidos: [],
      totalPontos_pedidos: 0,
      host: process.env.host_api,
      id_usuario: 0,
      nomeUsuario: '',
      corselecionada: 0,
      filtercliente: '',
    }
  },
  computed: {
    filtrarCliente() {
      if (this.filtercliente) {
        const fil = this.filtercliente.toUpperCase()
        return this.lpedidos.filter((cli) => {
          return cli.nome_cliente.toUpperCase().includes(fil)
        })
      } else {
        return this.lpedidos
      }
    },
    color() {
      switch (this.corselecionada) {
        case 0:
          return 'white'
        case 1:
          return 'teal'
        case 2:
          return 'brown'
        case 3:
          return 'indigo'
        default:
          return 'blue-grey'
      }
    },
  },
  mounted() {
    this.getLogado()
    if (this.logado === 'S') {
      this.getVendas()
      this.getPontosVendas()
    } else {
      this.$router.push('/login')
    }
  },

  methods: {
    async getPontosVendas() {
      const pontosPedidos = await axios.get(
        `${this.host}vendas/pontosvendas/${this.id_usuario}`
      )
      // const dados = pedidos.data.vendas
      this.totalPontosPendentes = pontosPedidos.data.pontos.pontosPendentes
      this.totalPontosAprovados = pontosPedidos.data.pontos.pontosAprovados
      this.totalPontosRejeitados = pontosPedidos.data.pontos.pontosRejeitados
    },
    novoPedido() {
      this.$router.push('/profissionais')
    },
    async getVendas() {
      const pedidos = await axios.get(
        `${this.host}vendas/listarpedidosusuario/${this.id_usuario}`
      )
      const dados = pedidos.data.pedidos
      const tam = pedidos.data.quantidade
      this.total_pedidos = tam
      // if (tam > 1) {
      for (let i = 0; i < tam; i++) {
        const dt = this.formataData(dados[i].data_venda)
        dados[i].data_venda = dt

        const status = dados[i].status
        if (status === 'P') {
          dados[i].status = 'PENDENTE'
        } else if (status === 'R') {
          dados[i].status = 'REJEITADO'
        } else if (status === 'A') {
          dados[i].status = 'APROVADO'
        } else if (status === 'V') {
          dados[i].status = 'VENCIDO'
        } else if (status === '0') {
          dados[i].status = 'ABERTO'
        }
        this.totalPontos_pedidos += dados[i].total_pontos

        this.lpedidos = dados
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
      this.nomeUsuario = sessionStorage.getItem('nomeUsuario')
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

<style>
.cliente {
  background-color: #d1d3e0;
  color: #000;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
    'Lucida Sans', Arial, sans-serif;
}
.fixa {
  position: fixed;
  background-color: #7897c0;
}
.backRodape {
  background-color: grey;
}
.divider {
  background: #fff;
}
.container {
  width: 100%;
  align-content: center;
  padding: 5px;
  margin-right: auto;
  margin-left: auto;
}
</style>
