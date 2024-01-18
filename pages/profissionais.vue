<template lang="">
  <div></div>
</template>
<template>
  <div>
    <MenuProfissionais :usuariologado="nomeUsuario" />
    <template>
      <v-card exact>
        <v-card-title primary-title>
          <v-row class="d-flex justify-space-between">
            <v-col
              cols="6"
              class="text-caption text-sm-subtitle-2 text-uppercase align-center orange--text pt-1 pb-0"
            >
              Em Análise: {{ totalPontosPendentes }}
            </v-col>

            <v-col
              cols="6"
              class="text-caption text-sm-subtitle-2 text-uppercase align-center indigo--text pt-1 pb-0"
            >
              Aprovados: {{ totalPontosAprovados }}
            </v-col>
            <!--v-col
              cols="4"
              md="3"
              sm="3"
              lg="3"
              class="text-caption text-sm-subtitle-2 text-uppercase align-center red--text pt-1 pb-0"
            >
              Rejeitados: {{ totalPontosRejeitados }}
            </!--v-col-->
          </v-row>
        </v-card-title>
      </v-card>
    </template>
    <template v-if="exibe_pgcategorias === true && venda_existe === true">
      <v-card class="pa-2 mt-1 mb-1 text-caption">
        Pedido: {{ numero_venda }} Status: {{ venda_status }} Pontos:
        {{ venda_pontos }}
      </v-card>
    </template>
    <template v-if="venda_existe === true && cliente_da_venda !== null">
      <div>
        <v-card class="pa-2 mt-1 mb-1 text-caption">
          Revendedor: {{ cliente_da_venda }} <v-icon color="red">delete</v-icon>
        </v-card>
      </div>
    </template>
    <template v-if="exibe_pgcategorias === true">
      <div>
        <v-sheet class="mx-auto mt-1" elevation="6" max-height="100">
          <v-slide-group
            v-model="categoriaSelecionada"
            class="pa-1"
            active-class="success"
            show-arrows
            align="center"
            justify="center"
          >
            <v-slide-item
              v-for="list in lcategorias"
              :key="list.id_categoria"
              v-slot="{ active, toggle }"
            >
              <v-card
                :color="active ? undefined : 'grey lighten-0'"
                class="ml-1 mr-1 mb-10 fill-height"
                max-height="90"
                max-width="130"
                :value="list.descricao_categoria"
                @click="toggle"
              >
                <!--v-row
                class="fill-height white--text"
                align="center"
                justify="center"
                @click="getCategoriaSelecionada(list.id_categoria)"
              -->
                <v-row
                  class="fill-height white--text"
                  align="center"
                  justify="center"
                  @click="getCategoriaSelecionada(list.id_categoria)"
                >
                  <v-col
                    cols="12"
                    align="center"
                    class="text-caption text-uppercase align-center ma-0 pb-0"
                    >{{ list.seq }} - {{ list.descricao_categoria }}</v-col
                  >
                  <v-col cols="12" class="ma-0 pb-0">
                    <v-avatar size="80">
                      <v-img
                        class="imagens"
                        align="center"
                        v-bind:src="'img_categorias/' + list.imagem"
                      ></v-img>
                    </v-avatar>
                  </v-col>
                </v-row>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </div>
    </template>
    <template v-if="exibe_pgprodutos === true">
      <div class="pt-1">
        <v-row>
          <v-col>
            <v-text-field
              name="name"
              label="Pesquisa produto..."
              v-model="filterProduto"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
    </template>
    <template v-if="exibe_pgprodutos === true">
      <v-virtual-scroll
        v-if="this.quantidadeProdutos > 0"
        :items="filtrarProduto"
        :item-height="75"
        max-width="900"
        min-height="400"
        max-height="800"
      >
        <template v-slot:default="{ item }">
          <v-list-item class="mb-1 mt-5">
            <v-row align="center" class="pt-0">
              <v-col cols="2" class="ma-0 pl-2">
                <v-list-item-avatar class="pa-0 ma-0" size="60" align="left">
                  <v-avatar class="white--text">
                    <v-img v-bind:src="'img_produtos/' + item.imagem"></v-img>
                  </v-avatar>
                </v-list-item-avatar>
              </v-col>
              <v-col cols="10" class="pt-1 pb-1 ma-0 justify-start">
                <v-row>
                  <v-list-item-content class="pl-3 pt-0 pl-1 pb-0">
                    <v-list-item-title
                      class="text-caption text-sm-subtitle-2 text-md-body-2 text-uppercase text-left pt-1 pb-0"
                    >
                      {{ item.descricao_produto }}</v-list-item-title
                    >
                  </v-list-item-content>
                </v-row>
                <v-row class="pl-3">
                  <v-col cols="2">
                    <span class="botaosiglas">
                      {{ item.sigla }}
                    </span>
                  </v-col>
                  <v-col cols="2" sm="2" md="2" lg="2">
                    <v-icon
                      title="Decrementar"
                      v-if="item.quantidade > 0"
                      @click="decrementaProduto(item)"
                      class="red--text pl-1 pr-1"
                    >
                      remove
                    </v-icon>
                  </v-col>

                  <v-col cols="3" sm="3" md="2" lg="2">
                    <v-text-field
                      v-bind:options="optionsquantidade"
                      title="Quantidade"
                      label="Quant."
                      :value="item.quantidade"
                      dense
                      hide-details
                      type="number"
                      @keyup="incrementaProduto2($event, item)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2" sm="2" md="2" lg="2">
                    <v-icon
                      title="Incrementar"
                      @click="incrementaProduto(item)"
                      class="blue--text pr-2"
                    >
                      add
                    </v-icon>
                  </v-col>
                  <v-col cols="3" sm="3" md="2" lg="2">
                    <div v-if="item.quantidade > 0" class="pl-3">
                      <v-btn class="" small color="primary">
                        <v-icon
                          class="white--text"
                          title="Adicionar produto"
                          @click="salvarItem(item)"
                          >check</v-icon
                        >
                      </v-btn>
                    </div>
                    <div v-else class="pl-3">
                      <v-btn class="" small color="primary" justify="end">
                        <v-icon
                          class="grey--text"
                          title="Adicionar produto"
                          disabled
                          >check</v-icon
                        >
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-list-item>
          <v-divider></v-divider>
        </template>
      </v-virtual-scroll>
    </template>
    <template v-if="exibe_telaFechamento === true">
      <div>
        <v-card class="pa-2 mt-1 mb-1 text-caption">
          Finalizar Pedido: {{ numero_venda }} Pontos:
          {{ venda_pontos }} Anexos:
          {{ quant_anexos }}
        </v-card>
        <!------------------------ https://sharklabs.com.br/file-upload-com-vuejs-e-nodejs/ ------------------------------>
        <!------------------------ ANEXAR ARQUIVO ------------------------------>
        <div class="pt-5 pl-2 pr-5 pb-5">
          <v-row align="center" justify="center">
            <v-file-input
              @change="carregarImagem"
              id="comprovante"
              :key="comprovanteKey"
              class="pr-5"
              show-size
              counter=""
            ></v-file-input>
            <!--v-file-input capture="camera" /-->

            <!--input type="file" @change="uploadImage"  title="abutab"/-->
            <v-icon
              @click="anexarComprovante()"
              @change="validarAnexo()"
              color="blue"
              v-if="comprovante_size > 0"
              >send</v-icon
            >
          </v-row>
        </div>
        <!------------------------ LISTA DE ANEXOS ------------------------------>
        <template>
          <v-card
            class="mx-auto"
            max-width="900"
            tile
            justify="left"
            align="left"
          >
            <v-list shaped>
              <v-subheader class="text-caption text-sm-subtitle-2"
                >COMPROVANTES</v-subheader
              >
              <v-list-item-group color="primary">
                <v-list-item
                  v-for="listanexos in lanexosvenda"
                  :key="listanexos.id_anexo"
                >
                  <v-list-item-icon>
                    <v-icon
                      color="red"
                      @click="deletarComprovante(listanexos.id_anexo)"
                      size="20"
                      title="Deletar comprovante"
                      >delete</v-icon
                    >
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title
                      class="font-weight-light"
                      v-text="listanexos.link_anexo"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </template>

        <!------------------------ LISTA DE ANEXOS(fim) ------------------------------>

        <!--v-bottom-navigation-- app class="d-flex">
          <v-row justify="center" class="pt-2">
            <v-col cols="3" sm="2" md="1" lg="1">
              <v-btn @click="informarCliente()" title="Voltar para Revendedor">
                <span>Voltar</span>
                <v-icon color="orange">arrow_back</v-icon>
              </v-btn></v-col
            >
            <v-col cols="3" sm="2" md="1" lg="1">
              <v-btn @click="informarCliente()">
                <span>Revendedor</span>
                <v-icon color="green">store</v-icon>
              </v-btn></v-col
            >
            <v-col cols="3" sm="2" md="1" lg="1">
              <v-btn v-if="quant_anexos > 0 && this.cliente_da_venda != null">
                <PedidosModalFinalizarPedido
                  :id_venda="id_venda"
                  @atualizaPedido="finalizarPedido"
                />
                <v-icon color="blue">done_all</v-icon>
              </v-btn></v-col
            >
          </v-row>
        </!--v-bottom-navigation-->
        <v-btn
          width="49%"
          color="indigo"
          class="white--text"
          fixed
          bottom
          left
          style="bottom: 10px; left: 3px"
          @click="informarCliente()"
        >
          <v-icon color="white">navigate_before</v-icon>
          <span style="font-size: 12px">Voltar</span>
        </v-btn>
        <v-btn
          width="49%"
          color="indigo"
          class="white--text"
          style="bottom: 10px; right: 3px"
          fixed
          bottom
          right
          v-if="quant_anexos > 0 && this.cliente_da_venda != null"
        >
          <PedidosModalFinalizarPedido
            :id_venda="id_venda"
            @atualizaPedido="finalizarPedido"
          />
          <v-icon color="white">done_all</v-icon>
        </v-btn>
      </div>
    </template>
    <template v-if="exibir_telaCliente === true">
      <div class="pa-5">
        <v-row align="center" justify="center">
          <v-text-field
            name="valorcliente"
            label="Pesquisa revendedor..."
            id="id"
            class="pr-3"
            v-model="filtercliente"
          ></v-text-field>
          <v-icon color="blue" @click="salvarCliente()" size="30" title="Salvar"
            >save</v-icon
          >
        </v-row>
        <div>
          <!------------------------ LISTA DE CLIENTES ------------------------------>
          <v-simple-table>
            <tbody>
              <tr
                v-for="lclientes of filtrarCliente"
                :key="lclientes.id_cliente"
              >
                <td class="font-weight-light text-uppercase">
                  {{ lclientes.nome_cliente }}
                </td>
                <td>
                  <v-icon
                    color="red"
                    @click="selecionarCliente(lclientes.id_cliente)"
                    size="20"
                    >check</v-icon
                  >
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </div>

        <!--v-bottom-navigation app class="d-flex">
          <v-row justify="center" class="pt-2">
            <v-col cols="3" sm="2" md="1" lg="1">
              <v-btn @click="voltar()" title="Voltar para tela principal">
                <span>Voltar</span>
                <v-icon color="orange">arrow_back</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="3" sm="2" md="1" lg="1">
              <v-btn @click="irParaAnexos()" title="Ir para anexos">
                <span>Anexos</span>
                <v-icon color="green">attach_file</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="3" sm="2" md="1" lg="1">
              <v-btn v-if="quant_anexos > 0 && this.cliente_da_venda != null">
                <PedidosModalFinalizarPedido
                  :id_venda="id_venda"
                  @atualizaPedido="finalizarPedido"
                />
                <v-icon color="blue">done_all</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </!--v-bottom-navigation-->
        <v-btn
          width="49%"
          color="indigo"
          class="white--text"
          fixed
          bottom
          left
          style="bottom: 10px; left: 3px"
          @click="voltar()"
        >
          <v-icon color="white">navigate_before</v-icon>
          <span style="font-size: 12px">Produtos</span>
        </v-btn>
        <v-btn
          width="49%"
          color="indigo"
          class="white--text"
          fixed
          bottom
          right
          style="bottom: 10px; right: 3px"
          @click="irParaAnexos()"
        >
          <span style="font-size: 12px">Anexos </span>
          <v-icon color="white">navigate_next</v-icon>
        </v-btn>
      </div>
    </template>
    <!------------------------------ MODAL FINALIZAR VENDA ---------------------------------->

    <!--v-btn
      v-if="exibe_telaFechamento === false"
      color="blue"
      fab
      fixed
      bottom
      right
      style="bottom: 30px"
      height="45"
      width="45"
      @click="fecharPedido()"
    >
      <v-icon color="white">playlist_play</v-icon>
    </!--v-btn-->

    <v-btn
      v-if="this.quantidadeProdutos > 0 && exibe_pgcategorias === true"
      color="indigo"
      class="white--text"
      fixed
      bottom
      right
      style="bottom: 10px; right: 3px"
      @click="irParaClientes()"
      width="49%"
    >
      <span style="font-size: 12px"> Revendedor </span>
      <v-icon color="white">navigate_next</v-icon>
    </v-btn>
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
// eslint-disable-next-line no-unused-vars
// import WebCam from 'vue-web-cam'
// eslint-disable-next-line no-unused-vars
export default {
  data() {
    return {
      optionsquantidade: {
        locale: 'pt-BR',
        // prefix: 'R$',
        suffix: '',
        length: 9,
        precision: 0,
      },
      snackbar: false,
      texto_snackbar: '',
      timeout: -1,

      benched: 0,
      total_pedidos: 0,
      totalPontosPendentes: 0,
      totalPontosAprovados: 0,
      totalPontosRejeitados: 0,
      totalPontos_pedidos: 0,
      host: process.env.host_api,
      nomeUsuario: '',
      lcategorias: [],
      categoriaSelecionada: 9999,
      lprodutosDaCategoria: [],
      lanexosvenda: [],
      quantidadeProdutos: 0,
      id_tamanho: 0,
      id_usuario: 3,
      id_venda: 0,
      numero_venda: 0,
      venda_existe: false,
      venda_status: '',
      venda_pontos: 0,
      venda_anexos: 0,

      comprovante: [],
      comprovante_nome: '',
      comprovante_size: 0,
      comprovanteKey: 0,
      quant_anexos: 0,

      exibe_pgcategorias: true,
      exibe_pgprodutos: false,
      exibe_telaFechamento: false,
      exibir_telaCliente: false,
      exibir_modalFinalizar: false,

      cliente_da_venda: null,
      lclientes: [],
      filtercliente: '',
      filterProduto: '',
    }
  },
  computed: {
    filtrarCliente() {
      if (this.filtercliente) {
        const fil = this.filtercliente.toUpperCase()
        return this.lclientes.filter((cli) => {
          return cli.nome_cliente.toUpperCase().includes(fil)
        })
      } else {
        return this.lclientes
      }
    },
    filtrarProduto() {
      if (this.filterProduto) {
        const fil = this.filterProduto.toUpperCase()
        return this.lprodutosDaCategoria.filter((cli) => {
          return cli.descricao_produto.toUpperCase().includes(fil)
        })
      } else {
        return this.lprodutosDaCategoria
      }
    },
  },

  mounted() {
    this.getLogado()
    if (this.logado === 'S') {
      this.lprodutosDaCategoria = []
      this.getCategoriasProdutos()
      this.getPontosVendas()
      this.getVendaAtual()
      if (this.venda_existe === true) {
        this.getAnexos()
      }
    } else {
      this.$router.push('/login')
    }
  },

  methods: {
    showSnackBar(msg, tempo) {
      this.snackbar = true
      this.texto_snackbar = msg
      this.timeout = tempo
      this.comprovanteKey++
    },
    excluirPedido() {},
    // ----------------------------------- FINALIZAR PEDIDO ----------------------------
    async finalizarPedido(st) {
      if (st === 200) {
        const dados = {
          id_venda: this.id_venda,
        }
        const resposta = await axios.put(
          `${this.host}vendas/finalizarpedido/`,
          dados,
          { headers: { 'Content-Type': 'application/json' } }
        )
        const statusResposta = resposta.status
        if (statusResposta === 201) {
          this.showSnackBar(
            'Pedido finalizado! Confira sua pontuação no topo da tela.',
            10000
          )
          this.filtercliente = ''
          this.lclientes = []
          this.venda_pontos = 0
          this.categoriaSelecionada = 9999
          this.lprodutosDaCategoria = []
          this.lanexosvenda = []
          this.quantidadeProdutos = 0
          this.id_tamanho = 0
          // this.id_usuario = 3
          this.id_venda = 0
          this.venda_existe = false
          this.venda_status = ''
          this.venda_pontos = 0
          this.venda_anexos = 0
          this.comprovante = []
          this.comprovante_nome = ''
          this.comprovanteKey = 0
          this.quant_anexos = 0
          this.exibe_pgcategorias = true
          this.exibe_pgprodutos = false
          this.exibe_telaFechamento = false
          this.exibir_telaCliente = false
          this.lprodutosDaCategoria = []
          this.cliente_da_venda = null
          this.total_pedidos = 0
          this.totalPontosPendentes = 0
          this.totalPontosAprovados = 0
          this.totalPontosRejeitados = 0
          this.totalPontos_pedidos = 0

          // this.getCategoriasProdutos()
          this.getPontosVendas()
          this.getVendaAtual()
        } else {
          console.log('-------------------- errrrrro ----------------------')
        }
      } else {
        this.showSnackBar(
          'Não foi possível finalizar o pedido. Tente mais tarde!',
          10000
        )
      }
    },
    async getClientes() {
      this.lclientes = []
      const clientes = await axios.get(
        `${this.host}clientes/${this.id_usuario}`
      )
      const tam = clientes.data.quantidade
      for (let i = 0; i < tam; i++) {
        this.lclientes.push(clientes.data.clientes[i])
      }
    },
    async salvarCliente() {
      let dados = []
      dados = {
        id_usuario: this.id_usuario,
        nome_cliente: this.filtercliente.toUpperCase(),
        id_loja: 1,
      }
      if (this.filtercliente.length > 4) {
        const resposta = await axios.post(`${this.host}clientes/`, dados, {
          headers: { 'Content-Type': 'application/json' },
        })
        const statusResposta = resposta.status
        if (statusResposta === 201) {
          this.showSnackBar('Revendedor salvo com sucesso!', 4000)
          this.filtercliente = ''
          this.getClientes()
        } else {
          this.showSnackBar('Não foi possível salvar!', 4000)
          this.filtercliente = ''
          this.getClientes()
        }
      } else {
        this.showSnackBar(
          'Nome do revendedor deve conter pelo menos 5 digitos!',
          4000
        )
      }
    },
    async selecionarCliente(id) {
      let dados = []
      dados = { id_venda: this.id_venda, id_cliente: id }
      const resposta = await axios.put(
        `${this.host}vendas/selecionarClienteParaPedido/`,
        dados,
        { headers: { 'Content-Type': 'application/json' } }
      )
      const statusResposta = resposta.status
      if (statusResposta === 201) {
        this.showSnackBar('Revendedor selecionado!', 4000)
        this.filtercliente = ''
        this.getClienteDaVenda()
        this.irParaClientes()
      } else {
        this.showSnackBar('Erro so selecionar!', 4000)
      }
    },
    async getClienteDaVenda() {
      const resposta = await axios.get(
        `${this.host}vendas/cliente/${this.id_venda}`
      )
      this.cliente_da_venda = resposta.data.nome_cliente
    },
    informarCliente() {
      // this.getClientes()
      this.exibe_telaFechamento = false
      this.exibe_pgprodutos = false
      this.exibe_pgcategorias = false
      this.exibir_telaCliente = true
    },
    irParaAnexos() {
      this.exibe_telaFechamento = true
      this.exibe_pgcategorias = false
      this.exibir_telaCliente = false
      if (this.venda_existe === true) {
        this.getAnexos()
      }
    },
    voltar() {
      this.exibe_telaFechamento = false
      this.exibir_telaCliente = false
      this.exibe_pgcategorias = true
      // this.$router.push('/vendas')
    },
    carregarImagem(e) {
      
      if (e) {
        this.comprovante = e
        this.comprovante_nome = e.name
        this.comprovante_size = e.size
      }
    },
    async anexarComprovante(e) {
      if (this.comprovante_size > 0) {
        const dataForm = new FormData()
        dataForm.append('comprovante', this.comprovante)

        const resposta = await axios.post(
          `${this.host}vendas/anexararquivos/${this.id_venda}`,
          dataForm,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )
        const statusResposta = resposta.status
        if (statusResposta === 200) {
          this.showSnackBar('Comprovante anexado com sucesso!', 4000)

          this.comprovante_nome = ''
          this.irParaAnexos()
        } else {
          this.showSnackBar('Não foi possível anexar o arquivo!', 4000)
        }
      } else {
        this.showSnackBar('Comprovante não incluído!', 4000)
      }
    },
    async deletarComprovante(id) {
      const resposta = await axios.delete(
        `${this.host}vendas/deletaranexo/${id}`
      )
      const statusResposta = resposta.status
      if (statusResposta === 200) {
        this.showSnackBar('Comprovante excluído com sucesso!', 4000)

        this.comprovante_nome = ''
        this.irParaAnexos()
      } else {
        this.showSnackBar('Não foi possível excluir!', 4000)
      }
    },

    async getAnexos() {
      this.lanexosvenda = []
      const anexos = await axios.get(
        `${this.host}vendas/anexos/${this.id_venda}`
      )
      const tam = anexos.data.quantidade
      this.quant_anexos = tam
      if (tam > 0) {
        for (let i = 0; i < tam; i++) {
          // anexos.data.anexos[i].link_anexo = '../anexos/' + anexos.data.anexos[i].link_anexo
          anexos.data.anexos[i].link_anexo =
            '' + anexos.data.anexos[i].link_anexo
          this.lanexosvenda.push(anexos.data.anexos[i])
        }
      }
    },
    irParaClientes() {
      this.getClientes()
      this.exibe_pgcategorias = false
      this.exibe_pgprodutos = false
      this.exibe_telaFechamento = false
      this.exibir_telaCliente = true
    },
    getLogado() {
      this.logado = sessionStorage.getItem('logado')
      this.id_usuario = sessionStorage.getItem('idUsuario')
      this.nomeUsuario = sessionStorage.getItem('nomeUsuario')
    },

    // carrega categorias cadastradas/produtos lançados na venda em aberto(se existir)/pontos em geral(se existirem)
    async getCategoriasProdutos() {
	  //console.log('--------------------- produtosCategorias ---------------------');
      this.lprodutosDaCategoria = []
      const categorias = await axios.get(`${this.host}produtosCategorias`)
      const tam = categorias.data.quantidade
      for (let i = 0; i < tam; i++) {
        this.lcategorias.push(categorias.data.categorias[i])
      }
    },
    async getPontosVendas() {
      const pontosPedidos = await axios.get(
        `${this.host}vendas/pontosvendas/${this.id_usuario}`
      )
      // const dados = pedidos.data.vendas
      this.totalPontosPendentes = pontosPedidos.data.pontos.pontosPendentes
      this.totalPontosAprovados = pontosPedidos.data.pontos.pontosAprovados
      this.totalPontosRejeitados = pontosPedidos.data.pontos.pontosRejeitados
    },

    // carregar produtos da categoria selecionada
    async getCategoriaSelecionada(valor) {
      this.filtercliente = ''
      this.filterProduto = ''
      this.exibe_telaFechamento = false
      this.exibe_pgprodutos = true
      this.getPontosVendas()
      this.quantidadeProdutos = 0
      this.lprodutosDaCategoria = []
      this.categoriaSelecionada = valor

      const produtosCategoria = await axios.get(
        `${this.host}produtos/categoria/${this.categoriaSelecionada}`
      )
      this.lprodutosDaCategoria = produtosCategoria.data.produtos
      this.quantidadeProdutos = produtosCategoria.data.quantidade

      if (this.venda_existe === true) {
        for (let kk = 0; kk < this.quantidadeProdutos; kk++) {
          const idp = this.lprodutosDaCategoria[kk].id_produto
          const idt = this.lprodutosDaCategoria[kk].id_tamanho

          const produtosCategoriaQuantidades = await axios.get(
            `${this.host}vendas/pontosvendasquantidades/${this.id_venda}` +
              `/${idp}` +
              `/${idt}`
          )
          const x = produtosCategoriaQuantidades.data.quantidadesLancadas
          if (x.length > 0) {
            this.lprodutosDaCategoria[kk].quantidade = x[0].quant_item
          } else {
            this.lprodutosDaCategoria[kk].quantidade = 0
          }
        }
      } else {
        for (let kk = 0; kk < this.quantidadeProdutos; kk++) {
          this.lprodutosDaCategoria[kk].quantidade = 0
          this.venda_pontos = 0
        }
      }
    },
    async getVendaAtual() {
      const ultimavenda = await axios.get(
        `${this.host}vendas/ultimavenda/${this.id_usuario}`
      )
      const u = ultimavenda.data.venda.id_venda
      const n = ultimavenda.data.venda.numero_venda
      const l = ultimavenda.data.venda.linhas
      this.venda_status = ultimavenda.data.venda.status
      if (this.venda_status === '0') {
        this.venda_status = 'ABERTO'
      }
      this.venda_pontos = ultimavenda.data.venda.pontos
      if (l > 0) {
        this.venda_existe = true
        this.id_venda = u
        this.numero_venda = n
        this.getClienteDaVenda()
      } else {
        this.id_venda = u + 1
        this.numero_venda = n
      }
      this.getAnexos()
    },
    async salvarItem(item) {
      const q = item.quantidade
      const ttlPontos = item.pontos * q
      this.dados = {
        id_usuario: this.id_usuario,
        id_venda: this.id_venda,
        id_produto: item.id_produto,
        id_tamanho: item.id_tamanho,
        quantidade_venda: q,
        venda_existe: this.venda_existe,
        pontos_item: ttlPontos,
      }

      if (this.venda_existe === true) {
        await axios.put(`${this.host}vendas/salvarItem/`, this.dados, {
          headers: { 'Content-Type': 'application/json' },
        })
      } else if (this.venda_existe === false) {
        await axios.post(`${this.host}vendas/salvarItem/`, this.dados, {
          headers: { 'Content-Type': 'application/json' },
        })
      }
      this.getPontosVendas()
      this.getVendaAtual()
    },

    calculaTotalPontos(item) {
      const x = this.lprodutosDaCategoria.length
      let y = 0
      for (let index = 0; index < x; index++) {
        y +=
          this.lprodutosDaCategoria[index].quantidade *
          this.lprodutosDaCategoria[index].pontos
      }

      if (x === 1 && item.quantidade === '') {
        this.venda_pontos = 0
      } else if (x > 1 && item.quantidade === '') {
        this.venda_pontos = y - item.pontos
      } else {
        this.venda_pontos = y
      }
    },
    incrementaProduto2(event, item) {
      const qq = event.target.value
      if (qq === '0') {
        item.quantidade = 1
        this.lprodutosDaCategoria.quantidade = 1
      } else {
        item.quantidade = qq
        this.lprodutosDaCategoria.quantidade = qq
      }
    },
    incrementaProduto(item) {
      this.lprodutosDaCategoria.quantidade = item.quantidade++
    },
    decrementaProduto(item) {
      this.lprodutosDaCategoria.quantidade = item.quantidade--
    },
  },
}
</script>
<style>
.botoes-concluir {
  height: 30px;
  background-color: red;
}
.botaosiglas {
  background-color: yellow;
  text-align: center;
  vertical-align: right;
  justify-content: center;
  padding-top: 2px;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 2px;
  margin-top: 1px;
  border-radius: 3px;
}

.descricaoprodutos {
  padding-top: 5px;
}
.imagens {
  height: 80px;
  width: 80px;
  padding: 1px;
  margin: 1px;
  border: 1px solid #fff;
  background-color: #fff;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
