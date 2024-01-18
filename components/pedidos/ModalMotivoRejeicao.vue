<template lang="">
  <div></div>
</template>
<template>
  <div>
    <v-row justify="space-around">
      <v-col cols="auto">
        <v-dialog
          v-model="dialog"
          transition="dialog-bottom-transition"
          max-width="600"
        >
          <template>
            <div></div>
          </template>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              x-small
              elevation="5"
              class=""
              title="Rejeitar pedido(Modal)"
              color="error"
              v-bind="attrs"
              v-on="on"
              @click="taca()"
              icon
            >
              <v-icon title="Rejeitar? Descrever o motivo...">clear</v-icon>
            </v-btn>
          </template>
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar color="primary" dark height="50%"
                >Motivo da rejeição</v-toolbar
              >
              <v-card-text>
                <div class="pt-3 ma-0">
                  <v-col class="pa-0 ma-0"> Pedido nº {{ numeroVenda }} </v-col>
                  <v-col class="pa-0 ma-0">
                    Profissional: {{ nomeProfissional }}
                  </v-col>
                </div>
                <div class="text-h2 pa-2">
                  <v-textarea
                    label="Motivo da rejeição..."
                    id="id"
                    v-model="motivorejeicao"
                    @keyup="maiusculas()"
                    textarea
                    outlined
                    counter="100"
                    dense
                    rows="2"
                  ></v-textarea>
                </div>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  text
                  @click="dialog.value = false"
                  class="ma-2 black--text"
                  color="blue-grey"
                  outlined
                  small
                  title="Fechar Janela"
                  >Fechar
                  <v-icon>clear</v-icon>
                </v-btn>
                <v-btn
                  text
                  @click="atualizarMotivoRejeicao()"
                  class="info"
                  small
                  >Confirma <v-icon>check</v-icon></v-btn
                >
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['idvenda', 'pedido'],
  data() {
    return {
      dialog: false,
      id_venda: 0,
      motivorejeicao: '',
      host: process.env.host_api,
      numeroVenda: 0,
      nomeProfissional: '',
    }
  },
  mounted() {
    this.taca()
    this.motivorejeicao = this.pedido.motivo_rejeicao
    this.numeroVenda = this.pedido.numero_venda
    this.nomeProfissional = this.pedido.nome
    this.id_venda = this.pedido.id_vendas
  },
  methods: {
    taca() {
      this.id_venda = this.idvenda
    },

    async atualizarMotivoRejeicao() {
      const dados = {
        id_venda: this.idvenda,
        motivo_rejeicao: this.motivorejeicao,
      }
      const resposta = await axios.put(
        `${this.host}adm_vendas/atualizarMotivoRejeicaoPedido`,
        dados,
        { headers: { 'Content-Type': 'application/json' } }
      )

      const statusResposta = resposta.status
      const ret = {
        pedido: this.pedido,
        st: statusResposta,
        motivo_rejeicao: this.motivorejeicao,
      }
      this.dialog = false
      this.$emit('atualizarMotivoRejeicao', ret)
    },
    maiusculas() {
      const x = this.motivorejeicao.toUpperCase()
      this.motivorejeicao = x
    },
  },
}
</script>
