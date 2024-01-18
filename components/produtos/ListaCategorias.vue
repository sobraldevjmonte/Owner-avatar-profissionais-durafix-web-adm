<template lang="">
  <div></div>
</template>
<template>
  <div class="pl-3 pb-0 mb-0 mt-0 pt-0">
    <v-row align="center">
      <v-col cols="3">
        <v-text-field
          name="name"
          label="Pesquisa categorias..."
          v-model="filtercategoriasprodutos"
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
          @click="cadCategoria()"
        >
          <v-icon>add</v-icon></v-btn
        >
      </v-col>
    </v-row>
    <template v-if="exibir_cadastro === true">
      <div class="telacad">
        <v-card elevation="5" transition="fade-transition" class="card_novo">
          <v-card-text class="pb-0 mb-0">
            <span v-if="operacao === 'novo'">Nova Categoria</span>
            <span v-else
              >Editar Categoria
              <span class="font-weight-bold">
                - {{ descricao_cad }}(Id: {{ id_novacategoria }})</span
              >
            </span>
          </v-card-text>
          <v-divider class="pa-0 pb-2 ml-3 mr-3"></v-divider>
          <v-col v-if="operacao !== 'novo'">
            <v-img
              class="imagens"
              align="center"
              v-bind:src="'img_categorias/' + imagem_name"
            ></v-img>
          </v-col>
          <v-col>
            <v-row align="center">
              <v-col cols="4">
                <v-text-field
                  type=""
                  error-count="Qtd de caracteres incorreta!"
                  placeholder="Descrição da categoria..."
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
              <v-col cols="8">
                <v-file-input
                  dense
                  counter
                  label="Imagem Categoria"
                  class="text-caption font-weight-light"
                  @change="carregarImagem"
                  :key="imagemKey"
                  show-size
                  >{{ imagem_name }}</v-file-input
                >
              </v-col>
            </v-row>
            <v-divider class="mb-3 mt-3"></v-divider>
            <v-row class="pa-2" justify="end">
              <v-btn color="success" class="mr-2" small>
                <v-icon>save</v-icon>
                <span v-if="operacao === 'novo'" @click="salvarCategoria()"
                  >Salvar</span
                >
                <span v-else @click="atualizarCategoria()">Atualizar</span>
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
    <v-simple-table dense height="400px" fixed-header class="tabelaCategorias">
      <thead>
        <tr>
          <th class="black--text text-right" width="5%">ID</th>
          <th class="black--text">DESCRIÇÃO</th>
          <th class="black--text text-center" width="10%">ATIVO</th>
          <th class="black--text" width="20%">AÇÕES</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="listcategorias in filtrarProdutosCategorias"
          :key="listcategorias.id_categoria"
        >
          <td class="font-weight-light text-caption text-right">
            {{ listcategorias.id_categoria }}
          </td>
          <td class="font-weight-light text-caption">
            {{ listcategorias.descricao_categoria }}
          </td>
          <td class="font-weight-light text-caption text-center">
            {{ listcategorias.ativo }}
          </td>
          <td class="text-left">
            <v-row>
              <v-btn
                x-small
                color="blue"
                elevation="5"
                class="pa-3 botao"
                title="Editar Categoria"
                icon
                @click="editarCategoria(listcategorias)"
              >
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn
                color="red"
                x-small
                elevation="5"
                class="pa-3 ml-1 botao"
                title="Excluir Categoria"
                icon
                @click="excluirCategoria(listcategorias)"
              >
                <v-icon>clear</v-icon>
              </v-btn>
              <v-btn
                x-small
                elevation="5"
                class="pa-3 ml-1 botao"
                title="Ativar/Inativar Categoria"
                icon
                @click="inativarCategoria(listcategorias)"
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
      host: process.env.host_api,
      listprodutos_categorias: [],

      filtercategoriasprodutos: '',

      exibir_cadastro: false,

      descricao_cad: '',
      operacao: '',
      total_tamanhos: 0,

      imagem: [],
      imagem_name: '',
      imagemKey: 0,

      id_categoria: 0,
      id_novacategoria: 0,
    }
  },
  computed: {
    filtrarProdutosCategorias() {
      if (this.filtercategoriasprodutos) {
        const fil = this.filtercategoriasprodutos.toUpperCase()
        return this.listprodutos_categorias.filter((cli) => {
          return cli.descricao_categoria.toUpperCase().includes(fil)
        })
      } else {
        return this.listprodutos_categorias
      }
    },
  },
  mounted() {
    this.listaTodosCategoriasProdutos()
  },
  methods: {
    async listaTodosCategoriasProdutos() {
      // eslint-disable-next-line no-unused-vars
      const pedidos = await axios.get(
        `${this.host}adm_produtos_categorias/listacompleta`
      )

      this.listprodutos_categorias = pedidos.data.categorias
      this.total_tamanhos = pedidos.data.quantidade
    },
    editarCategoria(categoria) {
      this.operacao = 'editar'
      this.exibir_cadastro = true
      this.id_novacategoria = categoria.id_categoria
      this.descricao_cad = categoria.descricao_categoria
      this.imagem_name = categoria.imagem
    },

    cadCategoria() {
      this.operacao = 'novo'
      this.exibir_cadastro = true
      this.limparCampos()
    },
    fecharJanela() {
      this.exibir_cadastro = false
      this.limparCampos()
    },
    limparCampos() {
      this.descricao_cad = ''
      this.imagem_name = ''
      this.imagem = []
      this.id_novacategoria = 0
    },
    async inativarCategoria(categoria) {
      this.id_categoria = categoria.id_categoria
      let ativo = ''
      if (categoria.ativo === 'S') {
        categoria.ativo = 'N'
        ativo = 'N'
      } else {
        categoria.ativo = 'S'
        ativo = 'S'
      }
      let dados = []
      dados = {
        ativo,
      }
      await axios.put(
        `${this.host}adm_produtos_categorias/ativar_inativar_categoria/${this.id_categoria}`,
        dados,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
    },
    async atualizarCategoria() {
      let dados = []
      dados = {
        descricao_categoria: this.descricao_cad,
        // link_imagem: this.imagem_name,
      }
      const resposta = await axios.put(
        `${this.host}adm_produtos_categorias/${this.id_novacategoria}`,
        dados,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      const statusResposta = resposta.status
      if (statusResposta === 201) {
        // -------------- salvando imagem do arquivo -----------------
        // -------------- salvando imagem do arquivo -----------------
        if (this.imagem.size > 0) {
          this.anexarImagem()
        }
        // -------------- salvando imagem do arquivo -----------------
        // -------------- salvando imagem do arquivo -----------------

        this.cadCategoria()
        this.showSnackBar('Categoria atualizada com sucesso!', 4000)
        this.exibir_cadastro = false
        this.listaTodosCategoriasProdutos()
      }
    },
    async salvarCategoria() {
      let dados = []
      dados = {
        descricao_categoria: this.descricao_cad,
        // link_imagem: this.imagem_name,
      }
      const resposta = await axios.post(
        `${this.host}adm_produtos_categorias/`,
        dados,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      const statusResposta = resposta.status
      this.id_novacategoria = resposta.data.categoria.id_categoria
      if (statusResposta === 201) {
        // -------------- salvando imagem do arquivo -----------------
        // -------------- salvando imagem do arquivo -----------------
        this.anexarImagem()
        // -------------- salvando imagem do arquivo -----------------
        // -------------- salvando imagem do arquivo -----------------

        this.cadCategoria()
        this.showSnackBar('Categoria salva com sucesso!', 4000)
        this.exibir_cadastro = false
        this.listaTodosCategoriasProdutos()
      }
    },

    async anexarImagem() {
      const dataForm = new FormData()
      dataForm.append('imagemprodutocategoria', this.imagem)

      await axios.post(
        `${this.host}adm_produtos_categorias/anexararquivos/${this.id_novacategoria}`,
        dataForm,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      this.imagemKey++
      this.imagem_name = ''
      this.imagem = []
    },
    carregarImagem(e) {
      if (e) {
        this.imagem = e
        this.imagem_name = e.name
      }
    },
    showSnackBar(msg, tempo) {
      this.snackbar = true
      this.texto_snackbar = msg
      this.timeout = tempo
    },
    maiusculasDescricao() {
      this.descricao_cad = this.descricao_cad.toUpperCase()
    },
    excluirCategoria(categoria) {
      this.showSnackBar('Opção em desenvolvimento...', 4000)
    },
  },
}
</script>

<style scoped>
.tabelaCategorias {
  height: 30px;
  text-orientation: upright;
  width: 90%;
}

.thead_tabela {
  background-color: red;
}
.botaoNovo {
  width: 30px;
  height: 30px;
  border: 1px solid;
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
  width: 90%;
}
.imagens {
  height: 100px;
  width: 100px;
  padding: 1px;
  margin: 1px;
  border: 1px solid #fff;
  background-color: #fff;
}
.textoquantidade {
  color: blue;
  font-size: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 400;
}
</style>
