<template lang="">
  <div></div>
</template>
<template>
  <div class="pl-2 pt-0 ma-0">
    <span class="pt-1">Cadastro de Usuários</span>
    <v-divider class="pt-2"></v-divider>
    <v-row align="center" justify="center">
      <v-col cols="1">
        <v-btn
          color="success"
          icon
          class="pt-1 pr-0 mr-0"
          title="Atualizar lista de usuários"
          @click="teste()"
        >
          <v-icon>refresh</v-icon></v-btn
        >
      </v-col>
      <v-col cols="3">
        <v-text-field
          name="name"
          label="Pesquisa usuários..."
          v-model="filterusuarios"
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
          title="Novo Usuário"
          @click="cadUsuarios()"
        >
          <v-icon>add</v-icon></v-btn
        >
      </v-col>
    </v-row>
    <v-divider></v-divider>

    <template v-if="exibir_cadastro === true">
      <div class="telacad">
        <v-card elevation="5" transition="fade-transition" class="card_novo">
          <v-card-text class="pb-0 mb-0">
            <span v-if="operacao === 'novo'" class="titulo">Novo Usuário</span>
            <span v-else class="titulo"
              >Editar Usuário
              <span class="font-weight-bold">
                - {{ nome_cad }}(Id: {{ id_usuario }})</span
              >
            </span>
          </v-card-text>
          <v-divider class="pa-0 pb-2 ml-3 mr-3"></v-divider>
          <v-col>
            <v-row align="center">
              <v-col cols="3">
                <v-text-field
                  append-icon="person"
                  type=""
                  error-count="Qtd de caracteres incorreta!"
                  placeholder="nome do usuário..."
                  label="Nome Usuário"
                  v-model="nome_cad"
                  dense
                  counter="30"
                  required
                  min="10"
                  class="font-weight-light inputx"
                  @keyup="maiusculasNome()"
                ></v-text-field>
              </v-col>
              <v-col cols="3" lg="2">
                <v-select
                  dense
                  v-model="tipoCadSelecionado"
                  :items="tipoCad"
                  item-value="value"
                  label="Tipo de usuário"
                  overflow
                  editable
                  class="inputx font-weight-light"
                  :menu-props="{ contentClass: 'red-first-item' }"
                ></v-select>
              </v-col>
              <v-col cols="3" lg="2">
                <v-text-field
                  type=""
                  error-count="Qtd de caracteres incorreta!"
                  placeholder="Telefone(1)"
                  label="Telefone"
                  v-model="telefone1_cad"
                  append-icon="phone"
                  dense
                  counter="11"
                  required
                  min="11"
                  class="font-weight-light inputx"
                ></v-text-field>
              </v-col>
              <v-col cols="3" lg="2">
                <v-text-field
                  type=""
                  error-count="Qtd de caracteres incorreta!"
                  placeholder="Telefone(2)"
                  label="Telefone"
                  v-model="telefone2_cad"
                  append-icon="phone"
                  dense
                  counter="11"
                  min="11"
                  class="font-weight-light inputx"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" lg="2">
                <v-text-field
                  type=""
                  error-count="Qtd de caracteres incorreta!"
                  placeholder="Usuário(login)"
                  label="Usuário(login)"
                  v-model="usuario_cad"
                  append-icon="person_outline"
                  dense
                  counter="11"
                  required
                  min="11"
                  class="font-weight-light inputx"
                ></v-text-field>
              </v-col>
              <v-col cols="3" lg="2">
                <v-text-field
                  type="password"
                  error-count="Qtd de caracteres incorreta!"
                  placeholder="Senha(login)"
                  label="Senha(login)"
                  v-model="senha_cad"
                  append-icon="lock"
                  dense
                  counter="10"
                  required
                  min="1"
                  class="font-weight-light inputx"
                ></v-text-field>
              </v-col>
              <v-col cols="3" lg="2">
                <v-text-field
                  type="password"
                  error-count="Qtd de caracteres incorreta!"
                  placeholder="Rep.Senha(login)"
                  label="Rep.Senha(login)"
                  v-model="repsenha_cad"
                  append-icon="lock"
                  dense
                  counter="10"
                  required
                  min="1"
                  class="font-weight-light inputx"
                  @blur="verificarSenha()"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider class="mb-3 mt-3"></v-divider>
            <v-row class="pa-2" justify="end">
              <v-btn color="success" class="mr-2" small>
                <v-icon>save</v-icon>
                <span v-if="operacao === 'novo'" @click="salvarUsuario()"
                  >Salvar</span
                >
                <span v-else @click="atualizarUsuario()">Atualizar</span>
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
    <br />
    <span class="textoquantidade">Quantidade: {{ total_usuarios }}</span>
    <br />
    <!----------------------------------- TABELA DE PRODUTOS  ----------------------------------->
    <v-simple-table dense height="400px" fixed-header class="tabelaTamanhos">
      <thead class="thead_tabela">
        <tr>
          <th class="black--text text-right textotabela" width="5%">ID</th>
          <th class="black--text textotabela">NOME</th>
          <th class="black--text textotabela">TELEFONE</th>
          <th class="black--text textotabela" width="10%">TIPO</th>
          <th class="black--text text-center textotabela" width="10%">ATIVO</th>
          <th class="black--text textotabela" width="20%">AÇÕES</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="listusuarios in filtrarUsuarios"
          :key="listusuarios.id_usuario"
        >
          <td class="textotabelatd text-right">
            {{ listusuarios.id_usuario }}
          </td>
          <td class="textotabelatd">
            {{ listusuarios.nome }}
          </td>
          <td class="textotabelatd">
            {{ listusuarios.telefone1 }}
          </td>
          <td class="textotabelatd">
            <span v-if="listusuarios.tipo === 0">SUPORTE</span>
            <span v-else-if="listusuarios.tipo === 1">ADMIN</span>
            <span v-else-if="listusuarios.tipo === 2">PROFISSIONAL</span>
          </td>
          <td class="textotabelatd text-center">
            {{ listusuarios.ativo }}
          </td>
          <td class="text-left">
            <v-row>
              <v-btn
                x-small
                color="blue"
                elevation="5"
                class="pa-3 botao"
                title="Editar Usuário"
                icon
                @click="editarUsuario(listusuarios)"
              >
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn
                color="red"
                x-small
                elevation="5"
                class="pa-3 ml-1 botao"
                title="Excluir Usuário"
                icon
                @click="excluirUsuario(listusuarios)"
              >
                <v-icon>clear</v-icon>
              </v-btn>
              <v-btn
                x-small
                elevation="5"
                class="pa-3 ml-1 botao"
                title="Ativar/Inativar Usuário"
                icon
                @click="inativarUsuario(listusuarios)"
              >
                <v-icon>compare_arrows</v-icon>
              </v-btn>
            </v-row>
          </td>
        </tr>
      </tbody>
    </v-simple-table>

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
  data() {
    return {
      snackbar: false,
      texto_snackbar: '',
      timeout: -1,

      exibir_cadastro: false,

      host: process.env.host_api,
      lista_usuarios: [],
      filterusuarios: '',
      id_usuario: 0,
      logado: null,
      nivelUsuario: 999999,
      nomeUsuario: null,
      total_usuarios: 0,

      id_loja: 1,
      nome_cad: '',
      telefone1_cad: '',
      telefone2_cad: '',
      usuario_cad: '',
      senha_cad: '',
      repsenha_cad: '',

      operacao: '',

      tipoCadSelecionado: 0,
      tipoCad: [
        { text: 'ADMIN', value: 1 },
        { text: 'PROFISSIONAL', value: 2 },
      ],
    }
  },

  computed: {
    filtrarUsuarios() {
      if (this.filterusuarios) {
        const fil = this.filterusuarios.toUpperCase()
        return this.lista_usuarios.filter((cli) => {
          return cli.nome.toUpperCase().includes(fil)
        })
      } else {
        return this.lista_usuarios
      }
    },
  },
  mounted() {
    this.listaUsuarios()
    this.filterusuarios = ''
  },
  methods: {
    async listaUsuarios() {
      const rs = await axios.get(
        `${this.host}adm_usuarios/listacompleta/${this.id_loja}`
      )
      this.total_usuarios = rs.data.quantidade
      this.lista_usuarios = rs.data.usuarios
    },
    async salvarUsuario() {
      let dados = []
      dados = {
        id_loja_usuario: this.id_loja,
        nome: this.nome_cad,
        telefone1: this.telefone1_cad,
        telefone2: this.telefone2_cad,
        usuario: this.usuario_cad,
        senha: this.senha_cad,
        tipo: this.tipoCadSelecionado,
      }

      const rs = await axios.post(`${this.host}adm_usuarios/`, dados, {
        headers: { 'Content-Type': 'application/json' },
      })
      const statusResposta = rs.status
      console.log('status: ' + statusResposta)
      if (statusResposta === 204) {
        this.showSnackBar('Usuário já cadastrado na base de dados!', 4000)
      } else if (statusResposta === 201) {
        this.showSnackBar('Usuário salvo com sucesso!', 4000)
        this.limparCampos()
        this.listaUsuarios()
        this.exibir_cadastro = false
      } else {
        this.showSnackBar('Não foi possível salvar!', 4000)
        console.log('-------------------- errrrrro ----------------------')
      }
    },
    async inativarUsuario(usuario) {
      this.id_usuario = usuario.id_usuario
      let ativo = ''
      if (usuario.ativo === 'S') {
        usuario.ativo = 'N'
        ativo = 'N'
      } else {
        usuario.ativo = 'S'
        ativo = 'S'
      }
      let dados = []
      dados = {
        ativo,
      }
      dados = {
        id_usuario: this.id_usuario,
        ativo,
      }
      const rs = await axios.put(
        `${this.host}adm_usuarios/ativar_inativar_usuario/${this.id_usuario}`,
        dados,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      console.log(rs)
    },
    editarUsuario(usuario) {
      this.exibir_cadastro = true
      this.id_usuario = usuario.id_usuario

      this.nome_cad = usuario.nome
      this.telefone1_cad = usuario.telefone1
      if (usuario.telefone2 === 'null') {
        this.telefone2_cad = ''
      } else {
        this.telefone2_cad = usuario.telefone2
      }
      this.usuario_cad = usuario.usuario
      this.senha_cad = null
      this.tipoCadSelecionado = usuario.tipo
    },
    async atualizarUsuario() {
      let dados = []
      dados = {
        id_loja_usuario: this.id_loja,
        nome: this.nome_cad,
        telefone1: this.telefone1_cad,
        telefone2: this.telefone2_cad,
        usuario: this.usuario_cad,
        senha: this.senha_cad,
        tipo: this.tipoCadSelecionado,
      }
      const rs = await axios.put(
        `${this.host}adm_usuarios/${this.id_usuario}`,
        dados,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )

      const statusResposta = rs.status
      console.log('status: ' + statusResposta)
      if (statusResposta === 200) {
        this.showSnackBar(
          'Usuário já cadastrado na base de dados. Refaça operação!',
          4000
        )
      } else if (statusResposta === 204) {
        this.showSnackBar('Usuário atualizado com sucesso!', 4000)
      } else {
        this.showSnackBar('Não foi possível atuaizar!', 4000)
      }
    },
    excluirUsuario(usuario) {
      this.showSnackBar('Opção em desenvolvimento...', 4000)
    },
    verificarSenha() {
      if (this.senha_cad !== this.repsenha_cad) {
        // this.$refs.rsenha.$el.focus()
        this.showSnackBar('Senhas não conferem!', 4000)
        // this.$refs.rsenha.$el.focus()
      }
    },
    showSnackBar(msg, tempo) {
      this.snackbar = true
      this.texto_snackbar = msg
      this.timeout = tempo
    },
    cadUsuarios() {
      this.operacao = 'novo'
      this.limparCampos()
      this.exibir_cadastro = true
    },
    fecharJanela() {
      this.operacao = ''
      this.exibir_cadastro = false
    },
    limparCampos() {
      this.nome_cad = ''
      this.tipoCadSelecionado = ''
      this.telefone1_cad = ''
      this.telefone2_cad = ''
      this.usuario_cad = ''
      this.senha_cad = ''
      this.repsenha_cad = ''
    },
    maiusculasNome() {
      this.nome_cad = this.nome_cad.toUpperCase()
    },
    /* selecionarTipoCadastro() {
      console.log('sigla_cad valor------------> ' + this.tipoCadSelecionado)
    }, */
    teste() {
      this.filterusuarios = ''
      this.listaUsuarios()
    },
  },
}
</script>

<style scoped>
.tabelaTamanhos {
  text-orientation: upright;
  width: 100%;
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
  width: 90%;
}
.tdred {
  color: red;
}
.inputx {
  font-size: 12px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.titulo {
  color: blue;
  font-size: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 400;
}
.textotabela {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.textotabelatd {
  font-size: 0.5rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 400;
}
.textoquantidade {
  color: blue;
  font-size: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 400;
}
</style>
