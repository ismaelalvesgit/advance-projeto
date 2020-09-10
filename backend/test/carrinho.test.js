// //@Author ismael alves
import request  from 'supertest'
import produtoData from './fixtures/produtoData'
import Produto from '../src/models/produto'
import Carrinho from '../src/models/carrinho'
import mongoose from 'mongoose'
const address = global.address

// //antes de todo teste
afterEach( async()=>{
    await Produto.deleteMany({})
    await Carrinho.deleteMany({})
})

describe('Fluxo tratamento de erros dos produtos no carrinho', () => {


test('delete - deletar produto no carrinho com id não cadastrado', async() => {
        //teste
        return request(address).del(`/carrinho/${mongoose.Types.ObjectId()}`)
        .then(response=>{
            expect(response.status).toBe(404)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
            expect(response.body[0].mensagem).toBe('Documento não encontrado')
        }).catch(fail)      
    })

    test('delete - deletar produto no carrinho com id errado', async() => {
        //teste
        return request(address).del(`/carrinho/aaaaa`)
        .then(response=>{
            expect(response.status).toBe(404)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
            expect(response.body[0].mensagem).toBe('Documento não encontrado')
        }).catch(fail)      
    })

    test('put - atualizar produto no carrinho com id não cadastrado', async() => {
        //teste
        return request(address).put(`/carrinho/${mongoose.Types.ObjectId()}`)
        .field('quantidade', 10)
        .then(response=>{
            expect(response.status).toBe(404)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
            expect(response.body[0].mensagem).toBe('Documento não encontrado')
        }).catch(fail)      
    })

    test('put - atualizar produto no carrinho com id errado', async() => {
        //teste
        return request(address).put(`/carrinho/aaaaa`)
        .field('quantidade', 10)
        .then(response=>{
            expect(response.status).toBe(404)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
            expect(response.body[0].mensagem).toBe('Documento não encontrado')
        }).catch(fail)      
    })

    test('put - atualizar produto no carrinho enviando o produto e tamanho', async() => {
        //montando o cenario
        let idProduto = ''
        let idCarrinho = ''
        const cenario = [
            await Produto({...produtoData[1]}).save().then((doc)=>{
                idProduto = doc._id
            }),
            await Carrinho({produto: idProduto, quantidade: 1, tamanho: produtoData[1].tamanhos[0]}).save().then((doc)=>{
                idCarrinho = doc._id
            })
         ]
         await Promise.all(cenario)

        //teste
        return request(address).put(`/carrinho/${idCarrinho}`)
        .field('quantidade', 10)
        .field('produto', 10)
        .field('tamanho', 10)
        .then(response=>{
            expect(response.status).toBe(400)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
        }).catch(fail)      
    })

    test('put - atualizar produto no carrinho com quantidade igual ou menor que zero', async() => {
        //montando o cenario
        let idProduto = ''
        let idCarrinho = ''
        const cenario = [
            await Produto({...produtoData[1]}).save().then((doc)=>{
                idProduto = doc._id
            }),
            await Carrinho({produto: idProduto, quantidade: 1, tamanho: produtoData[1].tamanhos[0]}).save().then((doc)=>{
                idCarrinho = doc._id
            })
         ]
         await Promise.all(cenario)

        //teste
        return request(address).put(`/carrinho/${idCarrinho}`)
        .field('quantidade', 0)
        .then(response=>{
            expect(response.status).toBe(400)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
            expect(response.body[0].mensagem).toBe(`quantidade necessita ser maior que zero`)
        }).catch(fail)      
    })

    test('put - atualizar produto no carrinho sem a quantidade', async() => {
        //montando o cenario
        let idProduto = ''
        let idCarrinho = ''
        const cenario = [
            await Produto({...produtoData[1]}).save().then((doc)=>{
                idProduto = doc._id
            }),
            await Carrinho({produto: idProduto, quantidade: 1, tamanho: produtoData[1].tamanhos[0]}).save().then((doc)=>{
                idCarrinho = doc._id
            })
         ]
         await Promise.all(cenario)

        //teste
        return request(address).put(`/carrinho/${idCarrinho}`)
        .then(response=>{
            expect(response.status).toBe(400)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
            expect(response.body[0].mensagem).toBe(`quantidade e requirido`)
        }).catch(fail)      
    })

    test('post - cadastra produto no carrinho com o tamanho não exitente no produto', async() => {
        //montando o cenario
        let idProduto = ''
        const cenario = [
            await Produto({...produtoData[1]}).save().then((doc)=>{
                idProduto = doc._id
            })
        ]
        await Promise.all(cenario)
        
        //teste
        return request(address).post('/carrinho')
        .field('quantidade', 1)
        .field('tamanho', "M")
        .field('produto', `${idProduto}`)
        .then(response=>{
            expect(response.status).toBe(400)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
            expect(response.body[0].mensagem).toBe(`tamanho selecionado não faz parte dos tamanhos do produto selecionado`)
        }).catch(fail)
    })

    test('post - cadastra produto no carrinho com tamando do produto inexitente', async() => {
        //montando o cenario
        let idProduto = ''
        const cenario = [
            await Produto({...produtoData[1]}).save().then((doc)=>{
                idProduto = doc._id
            })
        ]
        await Promise.all(cenario)
        
        //teste
        return request(address).post('/carrinho')
        .field('quantidade', 1)
        .field('tamanho', "AAA")
        .field('produto', `${idProduto}`)
        .then(response=>{
            expect(response.status).toBe(400)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
            expect(response.body[0].mensagem).toBe(`O valor AAA não faz parte dos tipos existentes!`)
        }).catch(fail)
    })

    test('post - cadastra produto no carrinho com quantidade meno ou igual a zero', async() => {
        //montando o cenario
        let idProduto = ''
        const cenario = [
            await Produto({...produtoData[1]}).save().then((doc)=>{
                idProduto = doc._id
            })
        ]
        await Promise.all(cenario)
        
        //teste
        return request(address).post('/carrinho')
        .field('quantidade', 0)
        .field('tamanho', produtoData[1].tamanhos[0])
        .field('produto', `${idProduto}`)
        .then(response=>{
            expect(response.status).toBe(400)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
        }).catch(fail)
    })
    
    test('post - cadastra produto no carrinho com id do produto inexitente', async() => {
    
        //teste
        return request(address).post('/carrinho')
        .field('quantidade', 1)
        .field('tamanho', produtoData[1].tamanhos[0])
        .field('produto', `${mongoose.Types.ObjectId()}`)
        .then(response=>{
            expect(response.status).toBe(400)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
            expect(response.body[0].mensagem).toBe('produto não foi encontrado :(')
        }).catch(fail)
    })


    test('post - cadastra produto no carrinho sem os campos obrigátorios', async() => {
        //teste
        return request(address).post('/carrinho')
        .then(response=>{
            expect(response.status).toBe(400)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
        }).catch(fail)
    })
})

describe('Fluxo normal de dados do produto no carrinho', () => {

    test('get - listagem de produto no carrinho', async() => {
        //montando o cenario
        let idProduto = ''
        const cenario = [
            await Produto({...produtoData[1]}).save().then((doc)=>{
                idProduto = doc._id
            }),
            await Carrinho({produto: idProduto, quantidade: 1, tamanho: produtoData[1].tamanhos[0]}).save()
        ]
        await Promise.all(cenario)

        //teste
        return request(address).get(`/carrinho`)
        .then(response=>{
            expect(response.status).toBe(200)
            expect(response.body).not.toHaveProperty('_links')
            expect(response.body).toHaveProperty('items')
            expect(response.body.items.length).toBeGreaterThan(0)
            expect(response.body).toBeTruthy()
        }).catch(fail)      
    })

    test('delete - deletar produto no carrinho', async() => {
        //montando o cenario
        let idProduto = ''
        let idCarrinho = ''
        const cenario = [
            await Produto({...produtoData[1]}).save().then((doc)=>{
                idProduto = doc._id
            }),
            await Carrinho({produto: idProduto, quantidade: 1, tamanho: produtoData[1].tamanhos[0]}).save().then((doc)=>{
                idCarrinho = doc._id
            })
        ]
        await Promise.all(cenario)

        //teste
        return request(address).del(`/carrinho/${idCarrinho}`)
        .then(response=>{
            expect(response.status).toBe(204)
        }).catch(fail)      
    })

    test('put - atualizar produto no carrinho', async() => {
        //montando o cenario
        let idProduto = ''
        let idCarrinho = ''
        const cenario = [
            await Produto({...produtoData[1]}).save().then((doc)=>{
                idProduto = doc._id
            }),
            await Carrinho({produto: idProduto, quantidade: 1, tamanho: produtoData[1].tamanhos[0]}).save().then((doc)=>{
                idCarrinho = doc._id
            })
         ]
         await Promise.all(cenario)

        //teste
        return request(address).put(`/carrinho/${idCarrinho}`)
        .field('quantidade', 10)
        .then(response=>{
            expect(response.status).toBe(200)
            expect(response.body).toMatchObject({quantidade: 10})
            expect(response.body).toHaveProperty('dataRegistro')
            expect(response.body).toHaveProperty('dataAtualizacao')
            expect(response.body).toHaveProperty('quantidade')
            expect(response.body).toHaveProperty('tamanho')
            expect(response.body).toHaveProperty('produto')
            expect(response.body).toHaveProperty('_id')
        }).catch(fail)      
    })

    test('post - cadastra produto no carrinho com tamanho iguais', async() => {
        //montando o cenario
        let idProduto = ''
        const cenario = [
            await Produto({...produtoData[1]}).save().then((doc)=>{
                idProduto = doc._id
            }),
            await Carrinho({produto: idProduto, quantidade: 1, tamanho: produtoData[1].tamanhos[0]}).save()
        ]
        await Promise.all(cenario)
        
        //teste
        return request(address).post('/carrinho')
        .field('quantidade', 1)
        .field('tamanho', produtoData[1].tamanhos[0])
        .field('produto', `${idProduto}`)
        .then(response=>{
            expect(response.status).toBe(200)
            expect(response.body).toMatchObject({quantidade: 2})
            expect(response.body).toHaveProperty('dataRegistro')
            expect(response.body).toHaveProperty('dataAtualizacao')
            expect(response.body).toHaveProperty('quantidade')
            expect(response.body).toHaveProperty('tamanho')
            expect(response.body).toHaveProperty('produto')
            expect(response.body).toHaveProperty('_id')
        }).catch(fail)
    })

    test('post - cadastra produto no carrinho com tamanho diferentes', async() => {
        //montando o cenario
        let idProduto = ''
        const cenario = [
            await Produto({...produtoData[1]}).save().then((doc)=>{
                idProduto = doc._id
            })
        ]
        await Promise.all(cenario)
        
        //teste
        return request(address).post('/carrinho')
        .field('quantidade', 1)
        .field('tamanho', produtoData[1].tamanhos[0])
        .field('produto', `${idProduto}`)
        .then(response=>{
            expect(response.status).toBe(201)
            expect(response.body).toMatchObject({quantidade: 1})
            expect(response.body).toHaveProperty('dataRegistro')
            expect(response.body).toHaveProperty('dataAtualizacao')
            expect(response.body).toHaveProperty('quantidade')
            expect(response.body).toHaveProperty('tamanho')
            expect(response.body).toHaveProperty('produto')
            expect(response.body).toHaveProperty('_id')
        }).catch(fail)
    })

})