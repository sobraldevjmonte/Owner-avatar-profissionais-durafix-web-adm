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
  mounted() {
    this.$router.push('/login_admin')
  },
}
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
