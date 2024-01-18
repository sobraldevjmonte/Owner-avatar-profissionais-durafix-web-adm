<template lang="">
  <div>tela de vendas</div>
</template>
<template lang="">
  <div>
    <v-row>
      <v-col>
        <v-text-field
          @keyup="filtrarProdutos()"
          type=""
          error-count=""
          placeholder="descrição..."
          label="Produto..."
          hint="Digite parte da descrição do produto para pesquisar..."
          v-model="valorPesquisa"
          outlined
          color
          dense
          autofocus
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="align-center">
      <v-col v-for="item in produtos" :key="item.id_produto" cols="6">
        <v-card outlined @click="vender(item.id_produto)">
          <v-card-title
            align="center"
            class="text-caption text-sm-subtitle-1 text-md-subtitle-2 text-lg-button text-uppercase align-center"
          >
            {{ item.descricao }}
          </v-card-title>
          <v-img
            v-bind:src="'img_produtos/' + item.imagem"
            height="120"
            width="150"
          ></v-img>
          <div align="left" class="pa-2">R$ {{ item.valor }}</div>
        </v-card>
      </v-col>
    </v-row>
    <v-btn
      color="blue"
      fab
      fixed
      bottom
      right
      style="bottom: 50px"
      height="45"
      width="45"
      @click="home()"
    >
      <v-icon color="white">home</v-icon>
    </v-btn>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      subtitulo: 'Vendas',
      mostrarTabela: true,
      nivelUsuario: 999,
      produtos: [],
      quantid: 0,
      // host: '10.5.59.70',
      // host: '192.168.0.121',
      host: 'localhost',
      valorPesquisa: '',
    }
  },
  mounted() {
    this.getLogado()
    this.getProdutosResumo()
  },
  methods: {
    home() {
      this.$router.push('/pedidos')
    },
    async filtrarProdutos() {
      await axios.get(
        `http://${this.host}:4000/produtos?decricao${this.valorPesquisa}`,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
    },
    getLogado() {
      this.token = sessionStorage.getItem('token')
      this.logado = sessionStorage.getItem('logado')
      this.nivelUsuario = sessionStorage.getItem('nivelUsuario')
    },
    novoVenda() {},
    async getProdutosResumo() {
      const prods = await axios.get(`http://${this.host}:4000/produtos/resumo`)
      const tam = prods.data.quantidade
      for (let i = 0; i < tam; i++) {
        this.produtos.push(prods.data.produtos[i])
      }
    },
    vender(id) {
      sessionStorage.setItem('itemLancar', id)
      this.$router.push('/vendas_item')
    },
  },
}
</script>
