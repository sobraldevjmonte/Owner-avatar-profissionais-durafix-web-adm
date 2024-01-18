<template lang="">
  <div></div>
</template>
<template class="container">
  <div class="card_totais">
    <MenuAdmin v-if="showSistema === true" :usuariologado="nomeUsuario" />

    <Loading v-if="loading === true" />

    <div>
      <h4 class="pa-1 ma-0 text-caption text-button text-sm-subtitle-1 titulo">
        Total de pedidos: {{ total_pedidos }}
      </h4>
    </div>
    <v-divider></v-divider>
    <template>
      <div class="pl-2 pt-0 ma-0">
        <v-row>
          <v-col cols="1">
            <v-btn
              color="success"
              icon
              class="pt-5 pr-0 mr-0"
              title="Limpar filtros"
              @click="getPedidos()"
            >
              <v-icon>refresh</v-icon></v-btn
            >
          </v-col>
          <v-col cols="3">
            <v-text-field
              name="valorcliente"
              label="Profissional..."
              id="id"
              class="text-caption font-weight-light pl-0"
              v-model="filtrarprofissional"
              @keyup="maiusculas()"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-select
              v-model="filtro_status"
              :items="items_status"
              item-value="value"
              label="Status"
              overflow
              editable
              class="text-caption font-weight-light"
              @change="filtrarPorStatus()"
            ></v-select>
          </v-col>
        </v-row>
      </div>
    </template>

    <!--template>
      <v-card>
        <template v-slot:default>
          <v-data-table
            fixed-header
            :headers="headers"
            :items="filtrarProfissional"
            dense
            height="400px"
          ></v-data-table>
        </template>
      </v-card>
    </!--template-->

    <template>
      <div>
        <v-simple-table dense height="700px" fixed-header class="tabelaPedidos">
          <template v-slot:default>
            <thead class="thead_tabela">
              <tr>
                <th class="black--text text-right" width="3%">Nº</th>
                <th class="black--text">DATA LANÇ.</th>
                <th class="black--text">DATA COMPRA</th>
                <th class="black--text">CLIENTE</th>
                <th class="black--text">PROFISSIONAL</th>
                <th class="black--text text-right">PONTOS</th>
                <th class="black--text" width="10%">STATUS</th>
                <th class="black--text" width="2%">REJ.</th>
                <th class="black--text pl-1 text-center" width="150px">
                  OPERAÇÕES
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="listapedidos in filtrarProfissional"
                :key="listapedidos.id_vendas"
              >
                <td class="font-weight-light text-caption text-right">
                  {{ listapedidos.numero_venda }}
                </td>
                <td class="font-weight-light text-caption">
                  {{ listapedidos.data_lancamento }}
                </td>
                <td class="font-weight-light text-caption">
                  {{ listapedidos.data_venda }}
                </td>
                <td class="font-weight-light text-caption text-uppercase">
                  {{ listapedidos.nome_cliente }}
                </td>
                <td class="font-weight-light text-caption text-uppercase">
                  {{ listapedidos.nome }}
                </td>
                <td
                  class="font-weight-light text-caption text-uppercase text-right"
                >
                  {{ listapedidos.total_pontos }}
                </td>
                <td class="font-weight-light text-caption text-uppercase">
                  {{ listapedidos.status }}
                </td>
                <td
                  class="font-weight-light text-caption text-uppercase"
                  v-if="listapedidos.rejeicoes > 0"
                >
                  ({{ listapedidos.rejeicoes }})
                </td>
                <td
                  class="font-weight-light text-caption text-uppercase"
                  v-else
                ></td>
                <td class="text-center">
                  <v-btn
                    x-small
                    elevation="5"
                    class="pa-0"
                    title="Anexos do pedido"
                    icon
                  >
                    <PedidosModalAnexosPedidos
                      :idvenda="listapedidos.id_vendas"
                      @click="getAnexos()"
                    />
                  </v-btn>
                  <v-btn
                    x-small
                    elevation="5"
                    color="success"
                    class=""
                    icon
                    title="Aprovador pedido"
                    @click="aprovarPedido(listapedidos)"
                  >
                    <v-icon>check</v-icon>
                  </v-btn>
                  <v-btn
                    x-small
                    elevation=""
                    color="error"
                    class=""
                    icon
                    title="Motivo Rejeição(admin)"
                  >
                    <PedidosModalMotivoRejeicao
                      :idvenda="listapedidos.id_vendas"
                      :pedido="listapedidos"
                      @atualizarMotivoRejeicao="rejeitarPedido"
                    />
                  </v-btn>
                  <v-btn
                    x-small
                    elevation="5"
                    v-if="listapedidos.premiado === true"
                    color="success"
                    class=""
                    icon
                    title="Premiar pedido"
                    @click="premiarPedido(listapedidos)"
                  >
                    <v-icon>card_giftcard</v-icon>
                  </v-btn>
                  <v-btn
                    x-small
                    elevation="5"
                    v-else
                    color="error"
                    class=""
                    icon
                    title="Premiar pedido"
                    @click="premiarPedido(listapedidos)"
                  >
                    <v-icon>card_giftcard</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </template>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ texto_snackbar }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      loading: false,
      testexxx: '',
      exibe_campo_motivorejeicao: false,
      // motivo_rejeicao: '',
      showAlertSucesso: false,
      showAlertErro: false,
      snackbar: false,
      texto_snackbar: '',
      timeout: -1,

      host: process.env.host_api,
      id_usuario: 0,
      id_loja: 1,
      logado: null,
      nivelUsuario: 999,
      nomeUsuario: '',
      showSistema: false,
      showTabelaPedidos: false,

      exibemodal: false,
      id_venda: 0,

      total_pedidos: 0,
      lpedidos: [],

      filtercliente: '',
      filtrarprofissional: '',
      filtro_status: '',
      /* headers: [
        { text: 'ID', value: 'numero_venda' },
        { text: 'DATA', value: 'data_venda' },
        { text: 'CLIENTE', value: 'nome_cliente' },
        { text: 'PROFISSIONAL', value: 'nome' },
        { text: 'PONTOS', value: 'total_pontos' },
        { text: 'STATUS', value: 'status' },
      ], */
      items_status: [
        { text: '', value: '' },
        { text: 'APROVADOS', value: 'A' },
        { text: 'REJEITADOS', value: 'R' },
        { text: 'PENDENTES', value: 'P' },
      ],
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
    filtrarProfissional() {
      if (this.filtrarprofissional) {
        const fil = this.filtrarprofissional.toUpperCase()
        return this.lpedidos.filter((cli) => {
          return cli.nome.toUpperCase().includes(fil)
        })
      } else {
        return this.lpedidos
      }
    },
  },

  mounted() {
    // this.motivo_rejeicao = ''
    this.showAlertSucesso = false
    this.showAlertErro = false
    this.getLogado()
    if (this.logado === 'S' && this.nivelUsuario === '1') {
      this.showSistema = true
      this.getPedidos()
      // this.getPontosVendas()
    } else {
      this.$router.push('/index_admin')
    }
  },
  methods: {
    exibirBotaoRejeicao() {
      this.exibe_campo_motivorejeicao = true
    },

    clearSearch() {
      this.filtrarprofissional = ''
    },
    showSnackBar(msg, tempo) {
      this.snackbar = true
      this.texto_snackbar = msg
      this.timeout = tempo
    },
    async aprovarPedido(pedido) {
      const s = 'A'
      // this.inseriModalRejeicao = true
      pedido.status = 'APROVADO'

      const dados = {
        id_venda: pedido.id_vendas,
        status: s,
        // motivo: this.motivo_rejeicao,
      }

      const resposta = await axios.put(
        `${this.host}adm_vendas/atualizarStatusPedido`,
        dados,
        { headers: { 'Content-Type': 'application/json' } }
      )

      const statusResposta = resposta.status
      const rejeicoesr = resposta.data.rejeicoes
      if (statusResposta === 200) {
        pedido.rejeicoes = rejeicoesr
        this.showSnackBar('Pedido APROVADO!!!', 10000)
      }
    },
    async rejeitarPedido(st) {
      const pedido = st.pedido
      const s = 'R'
      pedido.status = 'REJEITADO'
      pedido.motivo_rejeicao = st.motivo_rejeicao

      const dados = {
        id_venda: pedido.id_vendas,
        status: s,
      }

      const resposta = await axios.put(
        `${this.host}adm_vendas/atualizarStatusPedido`,
        dados,
        { headers: { 'Content-Type': 'application/json' } }
      )

      const statusResposta = resposta.status
      const rejeicoesr = resposta.data.rejeicoes
      if (statusResposta === 200) {
        pedido.rejeicoes = rejeicoesr
        this.showSnackBar('Pedido REJEITADO!!!', 10000)
      }
    },
    async premiarPedido(pedido) {
      this.loading = true
      let p = pedido.premiado
      if (p === true) {
        p = false
      } else {
        p = true
      }
      pedido.premiado = p

      const dados = {
        id_venda: pedido.id_vendas,
        premiado: p,
      }

      const resposta = await axios.put(
        `${this.host}adm_vendas/premiarPedido`,
        dados,
        { headers: { 'Content-Type': 'application/json' } }
      )

      const statusResposta = resposta.status
      const rejeicoesr = resposta.data.rejeicoes
      if (statusResposta === 200) {
        pedido.rejeicoes = rejeicoesr
        if (p === false) {
          this.showSnackBar('Pedido não PREMIADO!!!', 10000)
        } else {
          this.showSnackBar('Pedido PREMIADO!!!', 10000)
        }
      }
      this.loading = false
    },
    async filtrarPorStatus() {
      if (this.filtro_status !== '') {
        const pedidos = await axios.get(
          `${this.host}adm_vendas/status/${this.id_loja}/${this.filtro_status}`
        )
        const dados = pedidos.data.pedidos
        const tam = pedidos.data.quantidade
        this.total_pedidos = tam
        if (tam > 0) {
          for (let i = 0; i < tam; i++) {
            const dt = this.formataData(dados[i].data_venda)
            dados[i].data_venda = dt

            const dtlanc = this.formataData(dados[i].data_lancamento)
            dados[i].data_lancamento = dtlanc

            const status = dados[i].status
            if (status === 'P') {
              dados[i].status = 'PENDENTE'
            } else if (status === 'R') {
              dados[i].status = 'REJEITADO'
            } else if (status === 'A') {
              dados[i].status = 'APROVADO'
            } else if (status === '0') {
              dados[i].status = 'ABERTO'
            }
            // this.totalPontos_pedidos += dados[i].total_pontos
            this.showTabelaPedidos = true
            this.lpedidos = dados
          }
        } else {
          this.lpedidos = []
        }
      } else {
        this.getPedidos()
      }
    },
    getLogado() {
      this.id_usuario = sessionStorage.getItem('idUsuario')
      this.logado = sessionStorage.getItem('logado')
      this.nivelUsuario = sessionStorage.getItem('nivelUsuario')
      this.nomeUsuario = sessionStorage.getItem('nomeUsuario')
    },
    async getPedidos() {
      const pedidos = await axios.get(`${this.host}adm_vendas/${this.id_loja}`)
      const dados = pedidos.data.pedidos
      const tam = pedidos.data.quantidade
      this.total_pedidos = tam
      // if (tam > 1) {
      for (let i = 0; i < tam; i++) {
        const dt = this.formataData(dados[i].data_venda)
        dados[i].data_venda = dt

        const dtlanc = this.formataData(dados[i].data_lancamento)
        dados[i].data_lancamento = dtlanc

        const status = dados[i].status
        if (status === 'P') {
          dados[i].status = 'PENDENTE'
        } else if (status === 'R') {
          dados[i].status = 'REJEITADO'
        } else if (status === 'A') {
          dados[i].status = 'APROVADO'
        } else if (status === '0') {
          dados[i].status = 'ABERTO'
        }
        // this.totalPontos_pedidos += dados[i].total_pontos
        this.showTabelaPedidos = true
        this.lpedidos = dados
      }
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
    maiusculas() {
      const valor = this.filtercliente.toUpperCase()
      this.filtercliente = valor
    },
  },
}
</script>

<style>
.totalpedidos {
  font-size: 12px;
}
.card_totais {
  align-content: flex-start;
  padding-top: 1px;
}
.container {
  max-width: 100%;
  padding-left: 10px;
  padding-top: 10px;
  align-content: flex;
}
.tabelaPedidos {
  height: 30px;
  text-orientation: upright;
}
.thead_tabela {
  background-color: silver;
}
.botaoAcao {
  width: 20px;
  height: 20px;
  padding: 1px;
}
tbody tr:nth-of-type(even) {
  background-color: rgba(236, 237, 237);
}

tbody tr:nth-of-type(odd) {
  background-color: rgb(250, 250, 250);
}

.v-data-table-header {
  background-color: rgba(182, 183, 187);
  color: white;
}

.v-data-footer {
  background-color: rgb(250, 250, 250);
}

.theme--light.v-data-table thead tr th {
  color: white;
}

.class-rejeitados {
  background-color: rgb(214, 130, 130);
}
.titulo {
  color: blue;
  font-size: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 400;
}
</style>
