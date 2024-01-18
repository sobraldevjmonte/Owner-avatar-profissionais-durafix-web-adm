<template lang="">
  <div></div>
</template>
<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="indigo"
          elevation="0"
          class="white--text"
          v-bind="attrs"
          v-on="on"
        >
          Finalizar
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="grey lighten-2"> ATENÇÃO... </v-card-title>
        <br />
        <v-card-text> Confirma a finalização do pedido? </v-card-text>
        <template>
          <div>
            <v-form v-model="valid" ref="form">
              <v-row>
                <v-col cols="12" sm="6" class="pt-0 pb-0">
                  <v-text-field
                    class="pl-2 pr-2"
                    type=""
                    error-count=""
                    placeholder=""
                    label="Vendedor..."
                    append-icon="person"
                    v-model="vendedorPedido"
                    outlined
                    color
                    dense
                    counter="20"
                    required
                    min="10"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="pt-0 pb-0">
                  <v-text-field
                    class="pl-2 pr-2"
                    error-count=""
                    placeholder=""
                    label="Data Pedido"
                    :append-icon="'event'"
                    type="date"
                    v-model="dataPedido"
                    outlined
                    color
                    dense
                    counter="20"
                    required
                    min="8"
                  ></v-text-field>
                </v-col>
              </v-row>
              <template justify-space-around>
                <div>
                  <v-row class="pa-2">
                    <v-col cols="12" sm="6" md="6">
                      <v-btn
                        block
                        elevation="5"
                        color="indigo"
                        class="white--text"
                        @click="atualizaPedido()"
                      >
                        Finalizar Pedido</v-btn
                      >
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-btn
                        block
                        elevation="5"
                        color="error"
                        @click="dialog = false"
                        >Cancelar</v-btn
                      >
                    </v-col>
                  </v-row>
                </div>
              </template>
            </v-form>
          </div>
        </template>
      </v-card>
    </v-dialog>
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
  props: ['id_venda'],
  data() {
    return {
      valid: false,
      idvenda: 0,
      dialog: false,
      msg: '',
      vendedorPedido: '',
      dataPedido: '',

      host: process.env.host_api,
      snackbar: false,
      texto_snackbar: '',
      timeout: -1,
    }
  },
  methods: {
    async atualizaPedido() {
      if (this.vendedorPedido === '') {
        this.showSnackBar('Campo vendedor não pode estar em branco', 5000)
      } else if (this.dataPedido === null) {
        this.showSnackBar('Campo vendedor não pode estar em branco', 5000)
      } else {
        const dados = {
          id_venda: this.id_venda,
          vendedor_venda: this.vendedorPedido,
          data_venda: this.dataPedido,
        }
        const resposta = await axios.put(
          `${this.host}vendas/up_vendedor_data/`,
          dados,
          { headers: { 'Content-Type': 'application/json' } }
        )
        const statusResposta = resposta.status

        this.dialog = false
        this.vendedorPedido = ''
        this.dataPedido = ''
        this.$emit('atualizaPedido', statusResposta)
      }
    },
    showSnackBar(msg, tempo) {
      this.snackbar = true
      this.texto_snackbar = msg
      this.timeout = tempo
      this.comprovanteKey++
    },
  },
}
</script>
