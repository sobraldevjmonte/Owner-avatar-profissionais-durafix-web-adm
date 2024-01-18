export const categorias = () => ({
    id_categoria: 99999,
})

export const mutations = {
    getCategoria(categorias, lista) {
        categorias.id_categoria = lista.id_categoria
    },
}