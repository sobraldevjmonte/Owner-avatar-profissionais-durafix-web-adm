<template lang="">
  <div></div>
</template>
<template>
  <div v-if="exibir === true">
    <v-card elevation="5" transition="fade-transition" class="card_novo">
      <v-card-text class="pb-0 mb-0"> Novo Produto </v-card-text>
      <v-divider class="pa-0 ml-3 mr-3"></v-divider>
      <v-col>
        <v-row align="center">
          <v-col cols="4">
            <v-text-field
              class="pt-3 pl-2"
              type=""
              error-count=""
              placeholder="descrição do produto..."
              label="Descrição"
              v-model="descricao"
              dense
              counter="30"
              required
              min="10"
              outlined
              @keyup="maiusculasCliente()"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="pa-2" justify="end">
          <v-btn>{{ exibir }}</v-btn>
          <v-btn color="success" @click="fecharJanela()" class="mr-2">
            <v-icon>save</v-icon>
            Salvar
          </v-btn>
          <v-btn color="error" @click="fecharJanela()">
            <v-icon>clear</v-icon>
            Fechar
          </v-btn>
        </v-row>
      </v-col>
    </v-card>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-default-prop
  props: { exibir: Boolean },
  data() {
    return {
      host: process.env.host_api,
      descricao: '',
      pontos: 0,
    }
  },
  methods: {
    maiusculasCliente() {
      this.descricao = this.descricao.toUpperCase()
    },
    clear() {
      this.$refs.form.reset()
      this.msg = null
    },
    fecharJanela() {
      // eslint-disable-next-line vue/no-mutating-props
      this.exibir = false
    },
  },
}
</script>

<style>
.card_novo {
  background-color: red;
  transition-property: opacity, left, top, height;
  transition-duration: 10s;
  transition-delay: 10s;
}
</style>
