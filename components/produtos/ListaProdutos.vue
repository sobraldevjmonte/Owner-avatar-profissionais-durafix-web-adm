<template lang="">
  <div></div>
</template>
<template>
  <div class="pl-3 pb-0 mb-0 mt-0 pt-0">
    <v-row align="center">
      <v-col cols="3">
        <v-text-field
          name="name"
          label="Pesquisa produtos..."
          v-model="filterprodutos"
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
          title="Novo Produto"
          @click="cadProduto()"
        >
          <v-icon>add</v-icon></v-btn
        >
      </v-col>
    </v-row>
    <template class="telacad" v-if="exibir_cadastro === true">
      <div>
        <v-card elevation="5" transition="fade-transition" class="card_novo">
          <v-card-text class="pb-0 mb-0">
            <span v-if="operacao === 'novo'">Novo Produto</span>
            <span v-else>
              Editar Produto
              <span class="font-weight-bold">
                - {{ descricao_cad }}(Id: {{ id_novoproduto }})</span
              ></span
            >
          </v-card-text>
          <v-divider class="pa-0 pb-2 ml-3 mr-3"></v-divider>
          <v-col v-if="operacao !== 'novo'">
            <v-img
              class="imagens"
              align="center"
              v-bind:src="'img_produtos/' + imagem_nome"
            ></v-img>
          </v-col>
          <v-col>
            <v-row align="center">
              <v-col cols="3">
                <v-text-field
                  type=""
                  error-count="Qtd de caracteres incorreta!"
                  placeholder="descrição do produto..."
                  label="Descrição"
                  v-model="descricao_cad"
                  dense
                  counter="40"
                  required
                  min="10"
                  class="text-caption font-weight-light"
                  @keyup="maiusculasDescricao()"
                  @change="maiusculasDescricao()"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-select
                  v-model="categoria_cad"
                  :items="categorias_list"
                  item-value="id_categoria"
                  item-text="descricao_categoria"
                  label="Categoria"
                  overflow
                  editable
                  dense
                  class="text-caption font-weight-light"
                  @change="maiusculasDescricao()"
                ></v-select>
              </v-col>
              <v-col cols="1">
                <v-select
                  v-model="tamanho_cad"
                  :items="tamanhos_list"
                  item-value="id_tamanho"
                  item-text="descricao"
                  label="Tam."
                  overflow
                  editable
                  dense
                  class="text-caption font-weight-light"
                  @change="maiusculasDescricao()"
                ></v-select>
              </v-col>
              <v-col cols="1">
                <v-text-field
                  type="number"
                  error-count=""
                  placeholder="pontos..."
                  label="Pontos"
                  v-model="pontos_cad"
                  dense
                  required
                  class="text-caption font-weight-light"
                  @change="maiusculasDescricao()"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-file-input
                  dense
                  label="Imagem Produto"
                  class="text-caption font-weight-light"
                  @change="carregarImagem"
                  :key="imagemKey"
                  counter=""
                  show-size
                ></v-file-input>
              </v-col>
            </v-row>
            <v-divider class="mb-3 mt-3"></v-divider>
            <v-row class="pa-2" justify="end">
              <v-btn color="success" class="mr-2" small>
                <v-icon>save</v-icon>
                <span v-if="operacao === 'novo'" @click="salvarProduto()"
                  >Salvar</span
                >
                <span v-else @click="atualizarProduto()">Atualizar</span>
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
    <span class="textoquantidade">Quantidade: {{ total_produtos }}</span>
    <br />
    <!----------------------------------- TABELA DE PRODUTOS  ----------------------------------->
    <v-simple-table dense height="650px" fixed-header class="tabelaProdutos">
      <thead class="thead_tabela">
        <tr>
          <th class="black--text text-right" width="5%">ID</th>
          <th class="black--text">DESCRIÇÃO</th>
          <th class="black--text">CATEGORIA</th>
          <th class="black--text text-left" width="10%">TAMANHOS</th>
          <th class="black--text text-right" width="10%">PONTOS</th>
          <th class="black--text text-left" width="5%">ATIVO</th>
          <th class="black--text" width="10%">AÇÕES</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="listaprodutos in filtrarProdutos"
          :key="listaprodutos.id_produtos_tamanhos"
        >
          <td class="font-weight-light text-caption text-right">
            {{ listaprodutos.id_produto }}
          </td>
          <td class="font-weight-light text-caption">
            {{ listaprodutos.descricao }}
          </td>
          <td class="font-weight-light text-caption">
            {{ listaprodutos.descricao_categoria }}
          </td>
          <td class="font-weight-light text-caption text-left">
            {{ listaprodutos.descricao_tamanho }}
          </td>
          <td class="font-weight-light text-caption text-right">
            {{ listaprodutos.pontos }}
          </td>
          <td class="font-weight-light text-caption text-center">
            {{ listaprodutos.ativo }}
          </td>
          <td class="text-left">
            <v-row>
              <v-btn
                x-small
                color="blue"
                elevation="5"
                class="pa-3 botao"
                title="Editar produto"
                icon
                @click="editarProduto(listaprodutos)"
              >
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn
                color="red"
                x-small
                elevation="5"
                class="pa-3 ml-1 botao"
                title="Excluir produto"
                icon
                @click="excluirProduto(listaprodutos)"
              >
                <v-icon>clear</v-icon>
              </v-btn>
              <v-btn
                x-small
                elevation="5"
                class="pa-3 ml-1 botao"
                title="Ativar/Inativar produto"
                icon
                @click="inativarProduto(listaprodutos)"
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
      imagem: [],
      imagem_nome: '',
      imagemKey: 0,

      snackbar: false,
      texto_snackbar: '',
      timeout: -1,
      host: process.env.host_api,
      listprodutos: [],

      exibir_cadastro: false,

      descricao_cad: '',
      categoria_cad: '',
      tamanho_cad: '',
      imagem_cad: '',
      codigo_cad: 0,
      pontos_cad: 0,
      id_produtos_tamanhos: null,
      total_produtos: 0,

      id_novoproduto: null,

      filterprodutos: '',
      operacao: '',

      categorias_list: [],
      tamanhos_list: [],
    }
  },
  computed: {
    filtrarProdutos() {
      if (this.filterprodutos) {
        const fil = this.filterprodutos.toUpperCase()
        return this.listprodutos.filter((cli) => {
          return cli.descricao.toUpperCase().includes(fil)
        })
      } else {
        return this.listprodutos
      }
    },
  },
  mounted() {
    this.listaTodosProdutos()
  },
  methods: {
    async anexarImagem() {
      const dataForm = new FormData()
      dataForm.append('imagemproduto', this.imagem)

      await axios.post(
        `${this.host}adm_produtos/anexararquivos/${this.id_novoproduto}`,
        dataForm,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      this.imagemKey++
      this.imagem_nome = ''
      this.imagem = []
    },
    carregarImagem(e) {
      if (e) {
        this.imagem = e
        this.imagem_nome = e.name
      }
    },
    showSnackBar(msg, tempo) {
      this.snackbar = true
      this.texto_snackbar = msg
      this.timeout = tempo
    },
    async listaTodosProdutos() {
		console.log(this.host)
		console.log('****************** lista produtos ***********************')
      // eslint-disable-next-line no-unused-vars
      const pedidos = await axios.get(`${this.host}adm_produtos/listacompleta`,  {
				  headers: {
					'content-type': 'application/json'
				  }
				});
		console.log('****************** lista produtos ***********************')
      this.listprodutos = pedidos.data.produtos
      this.total_produtos = pedidos.data.quantidade
    },
    async inativarProduto(produto) {
      this.id_produto = produto.id_produto
      let ativo = ''
      if (produto.ativo === 'S') {
        produto.ativo = 'N'
        ativo = 'N'
      } else {
        produto.ativo = 'S'
        ativo = 'S'
      }
      let dados = []
      dados = {
        ativo,
      }
      await axios.put(
        `${this.host}adm_produtos/ativar_inativar_produto/${this.id_produto}`,
        dados,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
    },
    async atualizarProduto() {
      let dados = []
      dados = {
        descricao_produto: this.descricao_cad,
        codigo_produto: 2222,
        link_imagem: this.imagem_nome,
        id_categoria: this.categoria_cad,
        id_tamanho: this.tamanho_cad,
        pontos_produto: this.pontos_cad,
        id_produtos_tamanhos: this.id_produtos_tamanhos,
      }
      const resposta = await axios.put(
        `${this.host}adm_produtos/${this.id_novoproduto}`,
        dados,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      const statusResposta = resposta.status
      // this.id_novoproduto = resposta.data.produto.id_produto
      if (statusResposta === 201) {
        // -------------- salvando imagem do arquivo -----------------
        // -------------- salvando imagem do arquivo -----------------
        if (this.imagem.size > 0) {
          this.anexarImagem()
        }
        // -------------- salvando imagem do arquivo -----------------
        // -------------- salvando imagem do arquivo -----------------

        this.cadProduto()
        this.showSnackBar('Produto atuaizado com sucesso!', 4000)
        this.exibir_cadastro = false
        this.listaTodosProdutos()
      }
    },
    async salvarProduto() {
      let dados = []
      dados = {
        descricao_produto: this.descricao_cad,
        codigo_produto: 2222,
        link_imagem: this.imagem_nome,
        id_categoria: this.categoria_cad,
        id_tamanho: this.tamanho_cad,
        pontos_produto: this.pontos_cad,
      }
      const resposta = await axios.post(`${this.host}adm_produtos/`, dados, {
        headers: { 'Content-Type': 'application/json' },
      })
      const statusResposta = resposta.status
      this.id_novoproduto = resposta.data.produto.id_produto
      if (statusResposta === 201) {
        // -------------- salvando imagem do arquivo -----------------
        // -------------- salvando imagem do arquivo -----------------
        this.anexarImagem()
        // -------------- salvando imagem do arquivo -----------------
        // -------------- salvando imagem do arquivo -----------------

        this.cadProduto()
        this.showSnackBar('Produto salvo com sucesso!', 4000)
        this.exibir_cadastro = false
        this.listaTodosProdutos()
      }
    },
    cadProduto() {
      this.exibir_cadastro = true
      this.operacao = 'novo'
      this.limparCampos()
      this.getCategorias()
      this.getTamanhos()
    },
    fecharJanela() {
      this.exibir_cadastro = false
      this.limparCampos()
    },
    limparCampos() {
      this.descricao_cad = null
      this.categoria_cad = null
      this.tamanho_cad = null
      this.pontos_cad = 0
      this.imagem = []
      this.imagem_nome = ''
      this.id_produtos_tamanhos = null
    },
    async getCategorias() {
      const x = await axios.get(
        `${this.host}adm_produtos_categorias/listacompleta`
      )
      this.categorias_list = x.data.categorias
    },
    async getTamanhos() {
      const y = await axios.get(
        `${this.host}adm_produtos_tamanhos/listacompleta`
      )

      this.tamanhos_list = y.data.tamanhos
    },
    maiusculasDescricao() {
      this.descricao_cad = this.descricao_cad.toUpperCase()
    },
    editarProduto(produto) {
      this.exibir_cadastro = true
      this.operacao = 'editar'
      this.descricao_cad = produto.descricao
      this.categoria_cad = produto.id_categoria
      this.tamanho_cad = produto.id_tamanho
      this.pontos_cad = produto.pontos
      this.imagem_nome = produto.imagem
      this.id_novoproduto = produto.id_produto
      this.id_produtos_tamanhos = produto.id_produtos_tamanhos

      this.getCategorias()
      this.getTamanhos()
    },
    excluirProduto() {
      this.showSnackBar('Opção em desenvolvimento...', 4000)
    },
  },
}
</script>

<style scoped>
.botaoNovo {
  width: 30px;
  height: 30px;
  border: 1px solid;
}
.botao {
  border: 1px solid;
}
.tabelaProdutos {
  height: 30px;
  text-orientation: upright;
  max-width: 99%;
}
.thead_tabela {
  background-color: silver;
}
.botaoAcao {
  width: 20px;
  height: 20px;
  padding: 1px;
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
.card_novo {
  width: 99%;
  background-color: #fff;
  border: solid 2px rgb(204, 201, 201);
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
