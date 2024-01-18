<template lang="">
  <div></div>
</template>
<template>
  <div>
    <h3>Nº Venda: {{ venda_atual }}</h3>
    <br />
    <v-card class="d-flex justify-center">
      <v-row>
        <v-col
          cols="12"
          align="left"
          class="text-sm-body-1 text-md-body-2 text-uppercase pl-5 pt-5"
          >{{ descricao_produto }}</v-col
        >
        <v-col cols="12" align="center">
          <v-img
            align="center"
            v-bind:src="imagem_produto"
            max-height="250"
            max-width="250"
            class="pa-0 ma-0"
          ></v-img>
          <br />
          <!--v-text-field box label="R$: " v-model="valor_produto"></!--v-text-field-->
        </v-col>
        <v-col
          cols="12"
          align="left"
          class="text-sm-body-1 text-md-body-2 text-uppercase pa-5"
          >R$ {{ valor_padrao }}</v-col
        >
      </v-row>
    </v-card>
    <br />
    <template>
      <div>
        <v-row justify="start">
          <v-col cols="2" class="text-sm-body-1 text-md-body-2 pt-5 ver"
            >Tam:
          </v-col>
          <v-col
            @click="selecionarTamanho(itemtam.id_tamanho, itemtam.pontos)"
            v-for="itemtam in tamanhos_produtos"
            :key="itemtam.id_tamanho"
            cols="2"
          >
            <v-btn dense>{{ itemtam.sigla_tamanho }}</v-btn>
          </v-col>
        </v-row>
      </div>
    </template>
    <br />
    <v-form lazy-validation>
      <v-row>
        <v-col cols="4" sm="4" lg="2" class="pb-0 pt-0 mt-0 mb-0">
          <v-text-field
            type=""
            error-count=""
            placeholder=""
            label="Valor"
            append-icon=""
            v-model="valor_produto"
            outlined
            color
            dense
            case
            @keyup="calculaTotalItem()"
          ></v-text-field>
        </v-col>
        <v-col cols="1"> </v-col>
        <v-col cols="1" class="pa-2">
          <v-icon @click="decrementaProduto()" class="red--text">
            remove
          </v-icon>
        </v-col>
        <v-col cols="4" sm="4" lg="2" class="pb-0 pt-0 mt-0 mb-0">
          <v-text-field
            type=""
            error-count=""
            placeholder=""
            label="Quant."
            append-icon=""
            v-model="quantidade_venda"
            outlined
            color
            dense
            case
            @keyup="calculaTotalItem()"
          ></v-text-field>
        </v-col>
        <v-col cols="1" class="pa-2">
          <v-icon @click="incrementaProduto()" class="blue--text"> add </v-icon>
        </v-col>
        <v-col cols="12" sm="4" lg="2" class="pb-0 pt-0 mt-0 mb-0">
          Total do item: R$ {{ total_item }}
        </v-col>
      </v-row>
      <br />
      <template class="pt-5">
        <div>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="3"
              lg="2"
              class="pb-1 pt-0 mt-0 mb-0"
              align="center"
            >
              <v-btn
                block
                fullscreen
                elevation="5"
                color="success mr-2"
                @click="salvarItem()"
              >
                <!--v-icon color=""  align="left">done</!--v-icon-->
                Incluir Item
              </v-btn>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="3"
              lg="2"
              class="pb-1 pt-0 mt-0 mb-0"
              align="center"
            >
              <v-btn
                block
                fullscreen
                elevation="5"
                color="warning"
                @click="voltar()"
              >
                <!--v-icon color="">arrow_back_ios</!--v-icon-->
                Voltar
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </template>
      <v-snackbar
        v-if="msgErroTamanho != ''"
        :timeout="4000"
        :value="true"
        absolute
        bottom
        color="red"
        center
      >
        {{ msgErroTamanho }}
      </v-snackbar>
    </v-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      subtitulo: 'Vendas Item',
      id_produto: 0,
      codigo_codigo: 0,
      descricao_produto: '',
      imagem_produto: '',
      valor_produto: 0,
      tamanhos: [],
      cores: [],
      idUsuario: 0,
      valor_padrao: 0,
      quantidade_venda: 1,
      total_item: 0.0,
      venda_atual: 0,
      venda_existe: false,
      dados: [],
      host: process.env.host_api,
      // host: '192.168.0.121',
      // host: 'localhost',
      pontos: 0,
      id_tamanho: 0,
      sigla_tamanho: '',
      tamanhos_produtos_linhas: 0,
      tamanhos_produtos: [],
      tamanho_selecionado: 0,
      pontos_item: 0,
      msgErroTamanho: '',
    }
  },
  mounted() {
    this.getIdProduto()
    this.getLogado()
    this.getProduto()
    this.getVendaAtual()
  },
  methods: {
    selecionarTamanho(v, p) {
      this.tamanho_selecionado = v
      this.pontos_item = p
    },
    async getVendaAtual() {
      const ultimavenda = await axios.get(`${this.host}vendas/ultimavenda/${this.idUsuario}`)
      const u = ultimavenda.data.venda.id_venda
      const l = ultimavenda.data.venda.linhas
      if (l > 0) {
        this.venda_existe = true
        this.venda_atual = u
      } else {
        this.venda_atual = u + 1
      }
    },
    async salvarItem() {
      this.dados = {
        id_venda: this.venda_atual,
        id_usuario: this.idUsuario,
        id_produto: this.id_produto,
        quantidade_venda: this.quantidade_venda,
        valor_produto: this.valor_produto,
        total_item: this.total_item,
        venda_existe: this.venda_existe,
        pontos_item: this.pontos_item,
      }
      if (this.venda_existe === true) {
        if (this.tamanho_selecionado === 0) {
          this.msgErroTamanho = 'Selecione um tamanho!'
          return false
        } else {
          await axios.put(`${this.host}vendas/salvarItem/`,
            this.dados,
            { headers: { 'Content-Type': 'application/json' } }
          )
        }
      } else if (this.venda_existe === false) {
        if (this.tamanho_selecionado === 0) {
          this.msgErroTamanho = 'Selecione um tamanho!'
          return false
        } else {
          await axios.post(`${this.host}vendas/salvarItem`,
            this.dados,
            { headers: { 'Content-Type': 'application/json' } }
          )
        }
      }
      this.voltar()
    },
    voltar() {
      this.$router.push('/vendas')
    },
    calculaTotalItem() {
      const v = this.valor_produto.toString()
      const vf = v.replace(',', '.')

      const q = this.quantidade_venda.toString()
      const qf = q.replace(',', '.')
      const t = parseFloat(qf) * parseFloat(vf)
      if (vf > 0 && qf > 0) {
        this.total_item = parseFloat(t.toFixed(2))

        this.valor_produto = vf
        this.quantidade_venda = qf
      } else {
        this.quantidade_venda = 1
        this.valor_produto = this.valor_padrao
      }
    },
    incrementaProduto() {
      const v = this.valor_produto.toString()
      const vf = v.replace(',', '.')
      let q = this.quantidade_venda
      q++
      q = q.toString()
      const qf = q.replace(',', '.')

      const t = parseFloat(qf) * parseFloat(vf)
      if (vf > 0 && qf > 0) {
        this.total_item = parseFloat(t.toFixed(2))

        this.valor_produto = vf
        this.quantidade_venda = qf
      } else {
        this.quantidade_venda = 1
        this.valor_produto = this.valor_padrao
      }
    },
    decrementaProduto() {
      const v = this.valor_produto.toString()
      const vf = v.replace(',', '.')
      let q = this.quantidade_venda
      q--
      q = q.toString()
      const qf = q.replace(',', '.')

      const t = parseFloat(qf) * parseFloat(vf)
      if (vf > 0 && qf > 0) {
        this.total_item = parseFloat(t.toFixed(2))

        this.valor_produto = vf
        this.quantidade_venda = qf
      } else {
        this.quantidade_venda = 1
        this.valor_produto = this.valor_padrao
      }
    },
    getLogado() {
      this.token = sessionStorage.getItem('idusuario')
      this.logado = sessionStorage.getItem('logado')
      this.nivelUsuario = sessionStorage.getItem('nivelUsuario')
      this.idUsuario = sessionStorage.getItem('idUsuario')
    },
 
    // -------------- carrega dados iniciais do produto ------------------
    async getProduto() {
      const prods = await axios.get(`${this.host}produtos/${this.id_produto}`)
      const data = prods.data.produtos

      this.id_produto = data.id_produto
      this.codigo_codigo = data.codigo
      this.descricao_produto = data.descricao_produto
      this.valor_produto = data.valor
      this.imagem_produto = 'img_produtos/' + data.imagem
      this.valor_padrao = data.valor
      this.pontos = data.pontos
      this.id_tamanho = data.id_tamanho
      this.sigla_tamanho = data.sigla_tamanho
      this.descricao_tamanho = data.descricao_tamanho
      this.tamanhos_produtos_linhas = data.tamanhos_produtos
      this.tamanhos_produtos = data.tamanhos_produtos

      this.pontos_item = 0
      this.tamanho_selecionado = 0

      this.calculaTotalItem()
    },
    confirmaItem(id) {
      sessionStorage.setItem('itemLancar', id)
      this.$router.push('/vendas_item')
    },
    getIdProduto() {
      this.id_produto = sessionStorage.getItem('itemLancar')
    },
  },
}
</script>
