
<template>
  <div justify="center" align="center">
    <v-container flex align-center justify-center class="">
      <v-layout flex align-center justify-center>
        <v-flex xs12 sm10 md6 lg4>
          <!--template>
            <div justify="center" align="center" class="pt-5">
              <v-img
                max-height="150"
                max-width="250"
                :aspect-ratio="16 / 9"
                src="img/logo.jpg"
              ></v-img>
            </div>
          </!--template-->

          <!--v-avatar>
            <v-img class="imagens" v-bind:src="'img/logo.jpg'"></v-img>
          </!--v-avatar-->
          <br />
          <br />
          <br />
          <br />
          <br />
          <v-card class="" elevation="10" max-width="">
            <v-card-title primary-title class="font-weight-light pb-1">
              Login(12/01/2024)
            </v-card-title>
            <v-divider class="pb-3 ml-3 mr-3 mt-0 pt-0"></v-divider>
            <template>
              <div>
                <v-form v-model="valid" ref="form">
                  <v-row>
                    <v-col cols="12" class="pb-0">
                      <v-text-field
                        class="pl-2 pr-2"
                        type="text"
                        error-count=""
                        placeholder=""
                        label="Usuário(cpf)"
                        append-icon="person"
                        v-model="usuario"
                        outlined
                        color
                        dense
                        counter="11"
                        required
                        min="5"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="pt-0">
                      <v-text-field
                        :type="show ? 'text' : 'password'"
                        class="pl-2 pr-2"
                        error-count=""
                        placeholder=""
                        label="Senha"
                        :append-icon="e1 ? 'visibility' : 'visibility_off'"
                        :append-icon-cb="() => (e1 = !e1)"
                        v-model="senha"
                        outlined
                        color
                        dense
                        counter="20"
                        required
                        min="5"
                        clearable
                        @click:append="show = !show"
                      >
                        ></v-text-field
                      >
                    </v-col>
                  </v-row>
                  <template justify-space-around>
                    <div>
                      <v-row class="pa-2">
                        <v-col cols="12" sm="6" md="6">
                          <v-btn
                            block
                            elevation="5"
                            color=""
                            @click="login()"
                            :class="{
                              'blue darken-4 white--text': valid,
                              disabled: !valid,
                            }"
                          >
                            Entrar</v-btn
                          >
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-btn block elevation="5" color="info" @click="clear"
                            >Limpar</v-btn
                          >
                        </v-col>
                        <v-col>
                          <nuxt-link to="/resetsenha"
                            >Esqueci a senha</nuxt-link
                          >
                        </v-col>
                        <v-col>
                          <nuxt-link to="/primeiroacesso" class="te"
                            >Primeiro Acesso</nuxt-link
                          >
                        </v-col>
                      </v-row>
                    </div>
                  </template>
                </v-form>
              </div>
            </template>
            <v-divider></v-divider>
            <div class="pa-2 grey--text text-caption">V1.0.16 (12/01/2024)</div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
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
      show: false,
      valid: false,
      e1: false,
      senha: null,
      senhaRules: [(v) => !!v || 'Digite sua senha...'],
      usuario: null,
      usuarioRules: [(v) => !!v || 'Digite seu cpf...'],
      msg: null,
 
      logado: 'N',
      nivel_usuario: 999,
      id_usuario: 999999999,
      nome_usuario: '',

      host: process.env.host_api,
      //host: this.$axios.defaults.baseURL,

      snackbar: false,
      texto_snackbar: '',
      timeout: -1,
    }
  },
  mounted() {
	/* eslint-disable */
	//console.log('---------------- PAGINA DE LOGIN ----------------------------------')
    this.removeToken()
    process.env.usuario_logado = ''
  },
  methods: {
    showSnackBar(msg, tempo) {
      this.snackbar = true
      this.texto_snackbar = msg
      this.timeout = tempo
    },
    async login() {
		console.log('*******************************')
      // this.$refs.form.$el.submit()
		let headers = {
			'Content-Type': 'text/plain'
		}
		
	  console.log('++++++++++++++++++++++++++++++++++++++++')
      let statusCode = 0
      let result
      let dados = { usuario: `${this.usuario}`, senha: `${this.senha}` }
	  console.log(dados)
      try {
		  result = await axios.post(`${this.host}usuarios/login`, dados, {
				  headers: {
					'content-type': 'application/json'
				  }
				});
		statusCode = result.status 
		console.log('++++++++++++++++++++++ linha 187 ++++++++++++++++++++++++++++++')
        if (statusCode === 200) {
          sessionStorage.setItem('logado', 'S')
          sessionStorage.setItem('nivelUsuario', result.data.nivel_usuario)
          sessionStorage.setItem('idUsuario', result.data.id_usuario)
          sessionStorage.setItem('nomeUsuario', result.data.nome_usuario)
          process.env.usuario_logado = result.data.nome_usuario

          const n = this.getNivelUsuario()
          if (n === '1') {
            this.$router.push('/admin')
          } else if (n === '2') {
            this.$router.push('/profissionais')
          } else if (n === '99') {
            console.log('---------------- nivel 99 ----------------------')
          }
        } else {
          this.showSnackBar('Usuário/senhas incorretos!', 4000)
          // this.usuario = null
          // this.senha = null
          // this.removeToken()
        }
      } catch (error) {
        this.showSnackBar(
          'Usuário/senhas são obrigatórios ou estão incorretos!',
          4000
        )
      }

      this.usuario = ''
      this.senha = ''
    },
    getNivelUsuario() {
      this.nivelUsuario = sessionStorage.getItem('nivelUsuario')
      return this.nivelUsuario
    },
    getLogado() {
      this.logado = sessionStorage.getItem('logado')
      return this.logado
    },
    /* setToken(token) {
      // sessionStorage.setItem('token', token)
      sessionStorage.setItem('logado', 'S')
      sessionStorage.setItem('nivelUsuario', 2)
      sessionStorage.setItem('idUsuario', 3)
      sessionStorage.setItem('nomeUsuario', this.nome_usuario)
    }, */
    removeToken() {
      sessionStorage.removeItem('token')
      sessionStorage.setItem('logado', 'N')
      sessionStorage.setItem('nomeUsuario', '')
      sessionStorage.setItem('idUsuario', '')
      sessionStorage.setItem('nivelUsuario', '')
      process.env.usuario_logado = null
    },
    getToken() {
      let t = ''
      t = sessionStorage.getItem('token')
      return t
    },
    clear() {
      this.$refs.form.reset()
      this.msg = null
    },
  },
}
</script>

<style scoped>
.loginOverlay {
  background: rgba(22, 147, 185, 0.3);
}
.imagens {
  height: 80px;
  padding: 1px;
  margin: 1px;
  border: 1px solid #fff;
  background-color: #fff;
}
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
