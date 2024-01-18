<template lang="">
  <div></div>
</template>
<template>
  <div class="pl-3 pb-0 mb-0 mt-0 pt-0">
    <v-row align="center">
      <v-col cols="3">
        <v-text-field
          name="name"
          label="Pesquisa tamanhos..."
          v-model="filtercategoriastamanhos"
          class="text-caption"
        ></v-text-field>
      </v-col>
      <v-col class="">
        <v-btn
          color="success"
          rounded
          icon
          class="botaoNovo"
          elevation="5"
          title="Nova Categoria"
          @click="cadTamanho()"
        >
          <v-icon>add</v-icon></v-btn
        >
      </v-col>
    </v-row>
    <template v-if="exibir_cadastro === true">
      <div class="telacad">
        <v-card elevation="5" transition="fade-transition" class="card_novo">
          <v-card-text class="pb-0 mb-0">
            <span v-if="operacao === 'novo'">Novo tamanho</span>
            <span v-else
              >Editar tamanho
              <span class="font-weight-bold">
                - {{ descricao_cad }}(Id: {{ id_tamanho }})</span
              >
            </span>
          </v-card-text>
          <v-divider class="pa-0 pb-2 ml-3 mr-3"></v-divider>
          <v-col>
            <v-row align="center">
              <v-col cols="6">
                <v-text-field
                  type=""
                  error-count="Qtd de caracteres incorreta!"
                  placeholder="Descrição do tamanho..."
                  label="Descrição"
                  v-model="descricao_cad"
                  dense
                  counter="30"
                  required
                  min="10"
                  class="text-caption font-weight-light"
                  @keyup="maiusculasDescricao()"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-text-field
                  type=""
                  error-count="Qtd de caracteres incorreta!"
                  placeholder="Sigla..."
                  label="Sigla"
                  v-model="sigla_cad"
                  dense
                  counter="10"
                  required
                  min="2"
                  class="text-caption font-weight-light"
                  @keyup="maiusculasSigla()"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider class="mb-3 mt-3"></v-divider>
            <v-row class="pa-2" justify="end">
              <v-btn color="success" class="mr-2" small>
                <v-icon>save</v-icon>
                <span v-if="operacao === 'novo'" @click="salvarTamanho()"
                  >Salvar</span
                >
                <span v-else @click="atualizarTamanho()">Atualizar</span>
              </v-btn>
              <v-btn color="warning" class="mr-2" @click="limparCampos()" small>
                <v-icon>refresh</v-icon>
                Limpar
              </v-btn>
              <v-btn color="error" @click="fecharJanela()" small>
                <v-icon>clear</v-icon>
                Fechar
              </v-btn>
            </v-row>
          </v-col>
        </v-card>
      </div>
    </template>
    <span class="textoquantidade">Quantidade: {{ total_tamanhos }}</span>
    <br />
    <!----------------------------------- TABELA DE PRODUTOS  ----------------------------------->
    <v-simple-table dense height="650px" fixed-header class="tabelaTamanhos">
      <thead class="thead_tabela">
        <tr>
          <th class="black--text text-right" width="5%">ID</th>
          <th class="black--text">DESCRIÇÃO</th>
          <th class="black--text" width="10%">SIGLA</th>
          <th class="black--text text-center" width="10%">ATIVO</th>
          <th class="black--text" width="20%">AÇÕES</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="trred"
          v-for="listtamanhos in filtrarProdutosTamanhos"
          :key="listtamanhos.id_tamanho"
        >
          <td class="font-weight-light text-caption text-right">
            {{ listtamanhos.id_tamanho }}
          </td>
          <td class="font-weight-light text-caption">
            {{ listtamanhos.descricao }}
          </td>
          <td class="font-weight-light text-caption">
            {{ listtamanhos.sigla }}
          </td>
          <td class="font-weight-light text-caption text-center">
            {{ listtamanhos.ativo }}
          </td>
          <td class="text-left">
            <v-row>
              <v-btn
                x-small
                color="blue"
                elevation="5"
                class="pa-3 botao"
                title="Editar tamanho"
                icon
                @click="editarTamanho(listtamanhos)"
              >
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn
                color="red"
                x-small
                elevation="5"
                class="pa-3 ml-1 botao"
                title="Excluir tamanho"
                icon
                @click="excluirTamanho(listtamanhos)"
              >
                <v-icon>clear</v-icon>
              </v-btn>
              <v-btn
                x-small
                elevation="5"
                class="pa-3 ml-1 botao"
                title="Ativar/Inativar tamanho"
                icon
                @click="inativarTamanho(listtamanhos)"
              >
                <v-icon>compare_arrows</v-icon>
              </v-btn>
            </v-row>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-snackbar v-model="snackbar" :timeout="timeout" v-if="snackbar === true">
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
      snackbar: false,
      texto_snackbar: '',
      timeout: -1,

      exibir_cadastro: false,

      host: process.env.host_api,
      listprodutos_tamanhos: [],

      filtercategoriastamanhos: '',

      descricao_cad: '',
      sigla_cad: '',
      operacao: '',
      id_tamanho: 0,
      total_tamanhos: 0,
    }
  },
  computed: {
    filtrarProdutosTamanhos() {
      if (this.filtercategoriastamanhos) {
        const fil = this.filtercategoriastamanhos.toUpperCase()
        return this.listprodutos_tamanhos.filter((cli) => {
          return cli.descricao.toUpperCase().includes(fil)
        })
      } else {
        return this.listprodutos_tamanhos
      }
    },
  },
  mounted() {
    this.listaTodosProdutosTamanhos()
  },
  methods: {
    async listaTodosProdutosTamanhos() {
      // eslint-disable-next-line no-unused-vars
      const pedidos = await axios.get(
        `${this.host}adm_produtos_tamanhos/listacompleta`
      )

      this.listprodutos_tamanhos = pedidos.data.tamanhos
      this.total_tamanhos = pedidos.data.quantidade
    },
    async inativarTamanho(tamanho) {
      this.id_tamanho = tamanho.id_tamanho
      let ativo = ''
      if (tamanho.ativo === 'S') {
        tamanho.ativo = 'N'
        ativo = 'N'
      } else {
        tamanho.ativo = 'S'
        ativo = 'S'
      }
      let dados = []
      dados = {
        ativo,
      }
      await axios.put(
        `${this.host}adm_produtos_tamanhos/ativar_inativar_tamanho/${this.id_tamanho}`,
        dados,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
    },
    async atualizarTamanho() {
      let dados = []
      dados = {
        descricao_tamanho: this.descricao_cad,
        sigla_tamanho: this.sigla_cad,
      }
      const resposta = await axios.put(
        `${this.host}adm_produtos_tamanhos/${this.id_tamanho}`,
        dados,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      const statusResposta = resposta.status
      if (statusResposta === 201) {
        this.cadTamanho()
        this.showSnackBar('Tamanho salvo com sucesso!', 4000)
        this.exibir_cadastro = false
        this.listaTodosProdutosTamanhos()
      }
    },
    async salvarTamanho() {
      let dados = []
      dados = {
        descricao_tamanho: this.descricao_cad,
        sigla_tamanho: this.sigla_cad,
      }
      const resposta = await axios.post(
        `${this.host}adm_produtos_tamanhos/`,
        dados,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      const statusResposta = resposta.status
      if (statusResposta === 201) {
        this.cadTamanho()
        this.showSnackBar('Tamanho salvo com sucesso!', 4000)
        this.exibir_cadastro = false
        this.listaTodosProdutosTamanhos()
      }
    },
    editarTamanho(tamanho) {
      this.operacao = 'editar'
      this.exibir_cadastro = true
      this.id_tamanho = tamanho.id_tamanho
      this.descricao_cad = tamanho.descricao
      this.sigla_cad = tamanho.sigla
    },
    cadTamanho() {
      this.operacao = 'novo'
      this.descricao_cad = ''
      this.sigla_cad = ''
      this.exibir_cadastro = true
    },
    fecharJanela() {
      this.operacao = ''
      this.exibir_cadastro = false
    },
    limparCampos() {
      this.descricao_cad = ''
      this.sigla_cad = ''
    },
    showSnackBar(msg, tempo) {
      this.snackbar = true
      this.texto_snackbar = msg
      this.timeout = tempo
    },
    maiusculasDescricao() {
      this.descricao_cad = this.descricao_cad.toUpperCase()
    },
    maiusculasSigla() {
      this.sigla_cad = this.sigla_cad.toUpperCase()
    },
    excluirTamanho(tamanho) {
      this.showSnackBar('Opção em desenvolvimento...', 4000)
    },
  },
}
</script>

<style scoped>
.tabelaTamanhos {
  height: 30px;
  text-orientation: upright;
  max-width: 90%;
  min-width: 60%;
}
.thead_tabela {
  background-color: silver;
}
.botao {
  border: 1px solid;
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
.telacad {
  width: 50%;
}
.tdred {
  color: red;
}
.textoquantidade {
  color: blue;
  font-size: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 400;
}
</style>
