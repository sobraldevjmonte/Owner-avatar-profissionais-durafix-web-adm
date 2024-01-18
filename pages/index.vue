<template>
  <div align="center" justify="center">
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <v-col cols="12">
      <span>Carregando...</span>
    </v-col>
    <v-col>
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nivelUsuario: 999,
      logado: 'N',
    }
  },

  mounted() {
	/* eslint-disable */
	//console.log('---------------- PAGINA INDEX --------------------------')
    const log = this.getLogado()
    if (log === 'S') {
      const n = this.getNivelUsuario()
      if (n === '1') {
        this.$router.push('/admin')
      } else if (n === '2') {
        this.$router.push('/profissionais')
      } else if (n === '99') {
        console.log('---------------- nivel 99 ----------------------')
      }
    } else {
      process.env.usuario_logado = ''
      this.$router.push('/login')
    }
  },

  methods: {
    getNivelUsuario() {
      this.nivelUsuario = sessionStorage.getItem('nivelUsuario')
      return this.nivelUsuario
    },
    getLogado() {
	
      this.logado = sessionStorage.getItem('logado')
      return this.logado
    },
  },
}
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
