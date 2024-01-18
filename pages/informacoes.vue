<template lang="">
  <div></div>
</template>
<template>
  <div class="pt-10">
    <v-card class="ma-1 pa-1">
      <v-col cols="12">
        <v-row class="pa-1 ma-5" align="center" justify="center">
          <v-col cols="10" sm="4" md="4" lg="4">
            <v-img class="imagens" v-bind:src="'img/logo.jpg'"></v-img>
          </v-col>
        </v-row>
        <v-row align="center" justify="center" class="pa-0 ma-0">
          <span class="texto_informacoes"> Aguarde liberação de acesso! </span>
        </v-row>
      </v-col>
      <v-col>
        <v-row align="center" justify="center" class="pa-0 ma-0">
          <span class="texto_informacoes"
            >Fale com um de nossos colaboradores!</span
          >
        </v-row>
        <v-row class="pb-5">
          <v-btn
            depressed
            block
            outlined
            color="green"
            href="https://api.whatsapp.com/send?phone=5586994321635"
            >Whatsapp

            <a href="https://api.whatsapp.com/send?phone=5586994321635"
              ><v-img :src="'img/whats.png'" class="imagem_whats"></v-img></a
          ></v-btn>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row align="center" justify="center" class="pa-1">
          <v-btn block link>
            <router-link
              to="/"
              class="routerLink"
              style="text-decoration: none; color: inherit"
              >Página de login</router-link
            >
          </v-btn>
        </v-row>
      </v-col>
    </v-card>
  </div>
</template>
<script>
export default {}
</script>
<style scoped>
.imagens {
  height: 30%;
  padding: 1px;
  margin: 1px;
  border: 1px solid #fff;
  background-color: #fff;
}
.imagem_whats {
  height: 20px;
  width: 20px;
  padding: 1px;
  margin: 1px;
}
.texto_informacoes {
  font-size: 0.8rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  text-align: center;
  justify-content: center;
}
.texto_col {
  text-align: center;
  padding: 1px;
  margin: 1px;
}
.routerLink {
  text-decoration: none;
  font-weight: 400;
}
</style>
