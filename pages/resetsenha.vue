<template lang="">
  <div></div>
</template>
<template>
  <div>
    <v-container flex align-center justify-center class="">
      <v-layout flex align-center justify-center>
        <v-flex xs12 sm10 md6 lg4>
          <br />
          <br />
          <br />
          <br />
          <br />
          <v-card class="mt-3" elevation="10" max-width="">
            <v-card-title primary-title> Reset de senha </v-card-title>
            <template>
              <div>
                <v-form v-model="valid" ref="form">
                  <v-row>
                    <v-col cols="12" class="pb-0">
                      <v-text-field
                        class="pl-2 pr-2"
                        type=""
                        error-count=""
                        placeholder=""
                        label="Cpf"
                        append-icon="person"
                        v-model="usuario"
                        outlined
                        color
                        dense
                        counter="11"
                        required
                        min="11"
                        :rules="usuarioRules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="pt-0 pb-0">
                      <v-text-field
                        :type="show ? 'text' : 'password'"
                        @click:append="show = !show"
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
                        :rules="senhaRules"
                        required
                        min="5"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="pb-0 pt-0">
                      <v-text-field
                        :type="show ? 'text' : 'password'"
                        @click:append="show = !show"
                        ref="rsenha"
                        class="pl-2 pr-2"
                        error-count=""
                        placeholder=""
                        label="Rep.Senha"
                        :append-icon="e1 ? 'visibility' : 'visibility_off'"
                        :append-icon-cb="() => (e1 = !e1)"
                        v-model="rsenha"
                        outlined
                        color
                        dense
                        counter="20"
                        :rules="senhaRules"
                        required
                        min="5"
                        @blur="verificarSenha()"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <template justify-space-around>
                    <div>
                      <v-row class="pa-2" justify="center">
                        <v-col cols="10" sm="10" md="6" align="center">
                          <v-btn
                            block
                            elevation="5"
                            color=""
                            @click="salvarSenha()"
                            :class="{
                              'blue darken-4 white--text': valid,
                              disabled: !valid,
                            }"
                          >
                            Salvar</v-btn
                          >
                        </v-col>
                        <v-col cols="10" sm="10" md="6">
                          <v-btn
                            block
                            elevation="5"
                            color="info"
                            @click="clear()"
                          >
                            <v-icon class="pr-5">clear</v-icon>
                            Limpar</v-btn
                          >
                        </v-col>
                        <v-col cols="10" sm="10" md="6">
                          <v-btn
                            block
                            elevation="5"
                            color="warning"
                            @click="voltar()"
                          >
                            <v-icon class="pr-5">arrow_back</v-icon>
                            Voltar
                          </v-btn>
                        </v-col>
                        <v-col v-if="exibir_login === true">
                          <nuxt-link
                            to="/login"
                            title="Acessar página de login..."
                            >Entrar no sistema</nuxt-link
                          >
                        </v-col>
                      </v-row>
                    </div>
                  </template>
                </v-form>
              </div>
            </template>
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
      senhaRules: [(v) => !!v || 'Digite sua senha...'],
      usuarioRules: [(v) => !!v || 'Digite seu cpf...'],
      usuario: null,
      senha: null,
      rsenha: null,
      logado: 'N',
      host: process.env.host_api,
      snackbar: false,
      texto_snackbar: '',
      timeout: -1,
      exibir_login: false,
    }
  },
  mounted() {
    this.removeToken()
    this.exibir_login = false
  },
  methods: {
    clear() {
      this.cpf = ''
      this.exibir_login = false
    },
    voltar() {
      this.$router.push('/login')
    },
    removeToken() {
      sessionStorage.removeItem('token')
      sessionStorage.setItem('logado', 'N')
      sessionStorage.setItem('nomeUsuario', '')
      sessionStorage.setItem('idUsuario', '')
      sessionStorage.setItem('nivelUsuario', '')
      process.env.usuario_logado = null
    },
    showSnackBar(msg, tempo) {
      this.snackbar = true
      this.texto_snackbar = msg
      this.timeout = tempo
    },
    verificarSenha() {
      if (this.senha !== this.rsenha) {
        this.showSnackBar('Senhas não conferem!', 4000)
      }
    },

    async salvarSenha() {
      // eslint-disable-next-line no-unused-vars
      let statusCode = 0
      // eslint-disable-next-line no-unused-vars
      let dados = []
      // eslint-disable-next-line no-unused-vars

      if (
        this.usuario === null ||
        this.usuario.length < 11 ||
        this.usuario.length > 11
      ) {
        this.showSnackBar('Usuário(cpf) deve conter 11 dígitos!', 4000)
      } else if (this.senha !== this.rsenha) {
        this.showSnackBar('Senhas não conferem!\nRepita a operação', 4000)
      } else {
        try {
          dados = {
            usuario: `${this.usuario}`,
            senha: `${this.senha}`,
          }
          const result = await axios.put(
            `${this.host}usuarios/resetsenha`,
            dados,
            {
              headers: { 'Content-Type': 'application/json' },
            }
          )
          statusCode = result.status

          if (statusCode === 200) {
            this.exibir_login = true
            this.showSnackBar(
              'Senha atualizada com sucesso!\nClique na opção ENTRAR NO SISTEMA',
              6000
            )
          } else if (statusCode === 201) {
            this.showSnackBar('Usuário inativo ou bloqueado!', 6000)
          } else if (statusCode === 204) {
            this.showSnackBar(
              'Usuario não existe!\nConfira seu CPF ou \nentre na opção PRIMEIRO ACESSO!',
              6000
            )
          }
        } catch (error) {
          this.showSnackBar('Usuário/senhas são inválidos!', 4000)
        }
      }
    },
  },
}
</script>
