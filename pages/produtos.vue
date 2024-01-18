<template lang="">
  <div></div>
</template>
<template class="container">
  <div>
    <MenuAdmin v-if="showSistema === true" :usuariologado="nomeUsuario" />

    <template>
      <div class="pl-2 pt-0 ma-0">
        <v-row>
          <v-col cols="2">
            <v-select
              v-model="cadastroSelecionado"
              :items="items_status"
              item-value="value"
              label="Menu Cadastros"
              overflow
              editable
              class="text-caption font-weight-light"
              @change="selecionarTipoCadastro()"
              :menu-props="{ contentClass: 'red-first-item' }"
            ></v-select>
          </v-col>
          <v-col class="pt-8 pl-10">
            <div v-if="cadastroSelecionado === 'P'">Cadastro de produtos</div>
            <div v-if="cadastroSelecionado === 'C'">Categorias de produtos</div>
            <div v-if="cadastroSelecionado === 'T'">Tamanhos de produtos</div>
          </v-col>
        </v-row>
      </div>
    </template>
    <v-divider></v-divider>
    <ProdutosListaProdutos v-if="cadastroSelecionado === 'P'" />
    <ProdutosListaCategorias v-if="cadastroSelecionado === 'C'" />
    <ProdutosListaTamanhos v-if="cadastroSelecionado === 'T'" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      cadastroSelecionado: 'P',

      host: process.env.host_api,
      id_usuario: 0,
      logado: null,
      nivelUsuario: 999,
      nomeUsuario: '',
      showSistema: false,

      items_status: [
        { text: '', value: '' },
        { text: 'Categorias', value: 'C' },
        { text: 'Tamanhos', value: 'T' },
        { text: 'Produtos', value: 'P' },
      ],
    }
  },
  mounted() {
    this.getLogado()
    if (this.logado === 'S' && this.nivelUsuario === '1') {
      this.showSistema = true
    } else {
      this.$router.push('/login_admin')
    }
  },
  methods: {
    getLogado() {
      this.id_usuario = sessionStorage.getItem('idUsuario')
      this.logado = sessionStorage.getItem('logado')
      this.nivelUsuario = sessionStorage.getItem('nivelUsuario')
      this.nomeUsuario = sessionStorage.getItem('nomeUsuario')
    },
    selecionarTipoCadastro() {},
  },
}
</script>

<style>
.container {
  max-width: 100%;
  padding-left: 10px;
  padding-top: 10px;
  align-content: flex;
}
.red-text {
  color: red;
}

.red-first-item .v-list-item:first-child .v-list-item__title {
  color: red;
}
</style>
