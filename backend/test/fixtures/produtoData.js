//@Author ismael alves
import Tamanhos from '../../src/types/tamanhos'

export default [
    {
        nome: 'produto 01', 
        descricao: "descricao 01", 
        tamanhos: [ Tamanhos.PP, Tamanhos.M]
    },
    {
        nome: 'produto 02', 
        descricao: "descricao 02", 
        tamanhos: [ Tamanhos.GG, Tamanhos.GGG],
        foto: [
            './test/fixtures/assets/produto-01.png',
            './test/fixtures/assets/produto-02.png',
            './test/fixtures/assets/produto-03.png',
            './test/fixtures/assets/produto-04.png'
        ],
    },
]