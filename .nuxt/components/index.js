export const NuxtLogo = () => import('../../components/NuxtLogo.vue' /* webpackChunkName: "components/nuxt-logo" */).then(c => wrapFunctional(c.default || c))
export const Tutorial = () => import('../../components/Tutorial.vue' /* webpackChunkName: "components/tutorial" */).then(c => wrapFunctional(c.default || c))
export const VuetifyLogo = () => import('../../components/VuetifyLogo.vue' /* webpackChunkName: "components/vuetify-logo" */).then(c => wrapFunctional(c.default || c))
export const Loading = () => import('../../components/loading.vue' /* webpackChunkName: "components/loading" */).then(c => wrapFunctional(c.default || c))
export const MenuAdmin = () => import('../../components/menu/Admin.vue' /* webpackChunkName: "components/menu-admin" */).then(c => wrapFunctional(c.default || c))
export const MenuProfissionais = () => import('../../components/menu/Profissionais.vue' /* webpackChunkName: "components/menu-profissionais" */).then(c => wrapFunctional(c.default || c))
export const PedidosModalAnexosPedidos = () => import('../../components/pedidos/ModalAnexosPedidos.vue' /* webpackChunkName: "components/pedidos-modal-anexos-pedidos" */).then(c => wrapFunctional(c.default || c))
export const PedidosModalFinalizarPedido = () => import('../../components/pedidos/ModalFinalizarPedido.vue' /* webpackChunkName: "components/pedidos-modal-finalizar-pedido" */).then(c => wrapFunctional(c.default || c))
export const PedidosModalMotivoRejeicao = () => import('../../components/pedidos/ModalMotivoRejeicao.vue' /* webpackChunkName: "components/pedidos-modal-motivo-rejeicao" */).then(c => wrapFunctional(c.default || c))
export const UsuariosListaUsuarios = () => import('../../components/usuarios/ListaUsuarios.vue' /* webpackChunkName: "components/usuarios-lista-usuarios" */).then(c => wrapFunctional(c.default || c))
export const ProdutosCadastro = () => import('../../components/produtos/Cadastro.vue' /* webpackChunkName: "components/produtos-cadastro" */).then(c => wrapFunctional(c.default || c))
export const ProdutosListaCategorias = () => import('../../components/produtos/ListaCategorias.vue' /* webpackChunkName: "components/produtos-lista-categorias" */).then(c => wrapFunctional(c.default || c))
export const ProdutosListaProdutos = () => import('../../components/produtos/ListaProdutos.vue' /* webpackChunkName: "components/produtos-lista-produtos" */).then(c => wrapFunctional(c.default || c))
export const ProdutosListaTamanhos = () => import('../../components/produtos/ListaTamanhos.vue' /* webpackChunkName: "components/produtos-lista-tamanhos" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
