<template lang="">
  <div></div>
</template>
<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog transition="dialog-top-transition" max-width="50%">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            x-small
            elevation="5"
            class="pa-0"
            title="Anexos do pedido"
            color="primary"
            v-bind="attrs"
            v-on="on"
            @click="getAnexos()"
            icon
          >
            <v-icon>attach_file</v-icon>
          </v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card height="60vh">
            <v-toolbar color="" dark height="50">
              <v-row align="center" justify="space-between">
                <v-col cols="9" justify-center>
                  Anexos do pedido nº {{ idvenda }}
                </v-col>
                <v-col class="justify-end">
                  <v-btn text @click="dialog.value = false" class="botaofechar"
                    >Fechar
                    <v-icon>clear</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-toolbar>
            <v-card-text class="pt-2">
              <div class="text-h5" v-if="quant_anexos > 0">
                <v-simple-table dense fixed-header class="tabelaPedidos">
                  <template v-slot:default>
                    <thead class="thead_tabela">
                      <tr>
                        <th class="black--text">ID</th>
                        <th class="black--text">LINK</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="listapedidos in lanexosvenda"
                        :key="listapedidos.id_anexo"
                      >
                        <td class="font-weight-light text-caption">
                          {{ listapedidos.id_anexo }}
                        </td>
                        <td class="font-weight-light text-caption">
                          <a
                            v-bind:href="listapedidos.link_anexo"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {{ listapedidos.link_anexo }}
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </div>
            </v-card-text>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios'
export default {
  props: ['idvenda'],
  data() {
    return {
      id_venda: 0,
      lanexosvenda: [],
      quant_anexos: 0,
      host: process.env.host_api,
    }
  },

  methods: {
    async getAnexos() {
      this.lanexosvenda = []

      const anexos = await axios.get(
        `${this.host}adm_vendas/anexos/${this.idvenda}`
      )
      const tam = anexos.data.quantidade
      this.quant_anexos = tam
      if (tam > 0) {
        for (let i = 0; i < tam; i++) {
          anexos.data.anexos[i].link_anexo =
            '/api_durafix/prof/static/anexos/' + anexos.data.anexos[i].link_anexo
          this.lanexosvenda.push(anexos.data.anexos[i])
        }
      }
    },
  },
}
</script>

<style scoped>
.modal {
  height: 800px;
}
.botaofechar {
  background-color: #fff;
  color: #000;
  height: 30px;
  padding: 1px;
  margin: 1px;
}
</style>
