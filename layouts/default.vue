<template>
  <v-app>
    <!-- 18012022 v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </!--v-navigation-drawer-->

    <!--18012022 v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" 18012022 /-->
    <!--
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>-->
    <!-- 18012022v-toolbar-title
        v-model="nomeUsuario"
        class="text-subtitle-1 text-md-subtitle-2 text-lg-button"
        v-text="nomeUsuario"
      />
      <v-spacer / -->
    <!-- div class="text-subtitle-1">PP: 250</!--div-->

    <!--v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </!--v-btn-->
    <!--v-app-bar-->
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <!--v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </@v-navigation-drawer>
    <v-footer-- :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer-->
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      token: '',
      logado: 'N',
      nivelUsuario: 999,
      idUsuario: 99999999,
      nomeUsuario: '',
      items: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'list',
          title: 'Meus Pedidos',
          to: '/pedidos',
        },
        {
          icon: 'swap_horiz',
          title: 'Entrar/Sair',
          to: '/login',
        },
        {
          icon: 'swap_horiz',
          title: 'Login Admin',
          to: '/login_admin',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vendas Profissionais',
    }
  },
  created() {
    // console.log('---------------- created pag default ----------------------')
  },
  mounted() {
    process.env.usuario_logado = sessionStorage.getItem('nomeUsuario')
    this.nomeUsuario = process.env.usuario_logado
  },

  methods: {
    getLogado() {
      this.token = sessionStorage.getItem('token')
      this.logado = sessionStorage.getItem('logado')
      this.nivelUsuario = sessionStorage.getItem('nivelUsuario')
      this.idUsuario = sessionStorage.getItem('idUsuario')
      this.nomeUsuario = sessionStorage.getItem('nomeUsuario')
    },
  },
}
</script>
