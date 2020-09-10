//@Author ismael alves
import request  from 'supertest'
import produtoData from './fixtures/produtoData'
import Produto from '../src/models/produto'
import mongoose from 'mongoose'
const address = global.address

//antes de todo teste
afterEach( async()=>{
    await Produto.deleteMany({})
})

describe('Fluxo de tratamento de erros do produto', () => {

    test('delete - deletar produto com id não cadastrado', async() => {
        //teste
        return request(address).del(`/produto/${mongoose.Types.ObjectId()}`)
        .send(produtoData[0])
        .then(response=>{
            expect(response.status).toBe(404)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
            expect(response.body[0].mensagem).toBe('Documento não encontrado')
        }).catch(fail)
    })

    test('delete - deletar produto com id errado', async() => {
        //teste
        return request(address).del(`/produto/aaaaaa`)
        .send(produtoData[0])
        .then(response=>{
            expect(response.status).toBe(404)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
            expect(response.body[0].mensagem).toBe('Documento não encontrado')
        }).catch(fail)
    })

    test('put - atuaizar produto com id não cadastrado', async() => {
        //teste
        return request(address).put(`/produto/${mongoose.Types.ObjectId()}`)
        .send(produtoData[0])
        .then(response=>{
            expect(response.status).toBe(404)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
            expect(response.body[0].mensagem).toBe('Documento não encontrado')
        }).catch(fail)
    })

    test('put - atuaizar produto com id errado', async() => {
        //teste
        return request(address).put(`/produto/aaaaaa`)
        .send(produtoData[0])
        .then(response=>{
            expect(response.status).toBe(404)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
            expect(response.body[0].mensagem).toBe('Documento não encontrado')
        }).catch(fail)
    })

    test('post - cadastra produto com o tamanho não exitente', async () => {
        //teste
        return request(address).post('/produto')
        .field('nome', produtoData[1].nome)
        .field('tamanhos', "AAA")
        .then(response=>{
            expect(response.status).toBe(400)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
        }).catch(fail)
    })

    test('post - cadastra produto sem os dados necessários', async () => {
        //teste
        return request(address).post('/produto')
        .field('nome', produtoData[1].nome)
        .then(response=>{
            expect(response.status).toBe(400)
            expect(response.body[0]).toHaveProperty('nome')
            expect(response.body[0]).toHaveProperty('mensagem')
        }).catch(fail)
    })

})

describe('Fluxo normal de dados produto', () => {

    test('get - pegar produto por id', async() => {
        //montando o cenario
        let idProduto = ''
        const cenario = [
            await Produto({...produtoData[1]}).save().then((doc)=>{
                idProduto = doc._id
            })
        ]
        await Promise.all(cenario)

        //teste
        return request(address).get(`/produto/${idProduto}`)
        .then(response=>{
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('_links')
            expect(response.body).toBeTruthy()
        }).catch(fail)
    })

    test('get - lista de todas produtos', async() => {
        //montando o cenario
        const cenario = [
            await Produto({...produtoData[1]}).save()
        ]
        await Promise.all(cenario)

        //teste
        return request(address).get(`/produto`)
        .then(response=>{
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('_links')
            expect(response.body).toHaveProperty('items')
            expect(response.body.items).toBeTruthy();
        }).catch(fail)
    })

    test('delete - deletar produto por id', async() => {
        //montando o cenario
        let idProduto = ''
        const cenario = [
            await Produto({...produtoData[1]}).save().then((doc)=>{
                idProduto = doc._id
            })
        ]
        await Promise.all(cenario)

        //teste
        return request(address).delete(`/produto/${idProduto}`)
        .then(response=>{
            expect(response.status).toBe(204)
        }).catch(fail)
    })

    test('put - atuaizar produto sem foto', async() => {
        //montando o cenario
        let idProduto = ''
        const cenario = [
            await request(address).post('/produto')
            .send(produtoData[1])
            .then(response=>{
                idProduto = response.body._id
            })
        ]
        await Promise.all(cenario)

        //teste
        return request(address).put(`/produto/${idProduto}`)
        .send(produtoData[0])
        .then(response=>{
            expect(response.status).toBe(200)
            expect(response.body).toMatchObject({nome: produtoData[0].nome, descricao: produtoData[0].descricao})
            expect(response.body).toHaveProperty('fotos')
            expect(response.body).toHaveProperty('nome')
            expect(response.body).toHaveProperty('descricao')
            expect(response.body).toHaveProperty('tamanhos')
            expect(response.body).toHaveProperty('dataRegistro')
            expect(response.body).toHaveProperty('dataAtualizacao')
            expect(response.body).toHaveProperty('_id')
        }).catch(fail)
    })

    test('put - atualizar produto com foto', async() => {
        //montando o cenario
        let idProduto = ''
        const cenario = [
            await request(address).post('/produto')
            .attach('fotos', produtoData[1].foto[0])
            .field('nome', produtoData[1].nome)
            .field('descricao', produtoData[1].descricao)
            .field('tamanhos', produtoData[1].tamanhos)
            .then(response=>{
                idProduto = response.body._id
            })
        ]
        await Promise.all(cenario)

        //teste
        return request(address).put(`/produto/${idProduto}`)
        .attach('fotos', produtoData[1].foto[1])
        .field('nome', produtoData[0].nome)
        .field('descricao', produtoData[0].descricao)
        .field('tamanhos', produtoData[0].tamanhos)
        .then(response=>{
            expect(response.status).toBe(200)
            expect(response.body).toMatchObject({nome: produtoData[0].nome, descricao: produtoData[0].descricao})
            expect(response.body).toHaveProperty('fotos')
            expect(response.body).toHaveProperty('nome')
            expect(response.body).toHaveProperty('descricao')
            expect(response.body).toHaveProperty('tamanhos')
            expect(response.body).toHaveProperty('dataRegistro')
            expect(response.body).toHaveProperty('dataAtualizacao')
            expect(response.body).toHaveProperty('_id')
        }).catch(fail)
    })
    
    test('post - cadastra produto sem foto', async() => {
        //teste
        return request(address).post('/produto')
        .send(produtoData[0])
        .then(response=>{
            expect(response.status).toBe(201)
            expect(response.body).toMatchObject({nome: produtoData[0].nome, descricao: produtoData[0].descricao})
            expect(response.body).toHaveProperty('fotos')
            expect(response.body).toHaveProperty('nome')
            expect(response.body).toHaveProperty('descricao')
            expect(response.body).toHaveProperty('tamanhos')
            expect(response.body).toHaveProperty('dataRegistro')
            expect(response.body).toHaveProperty('dataAtualizacao')
            expect(response.body).toHaveProperty('_id')
        }).catch(fail)
    })

    test('post - cadastra produto com fotos', async() => {
        //teste
        return request(address).post('/produto')
        .attach('fotos', produtoData[1].foto[0])
        .field('nome', produtoData[1].nome)
        .field('descricao', produtoData[1].descricao)
        .field('tamanhos', produtoData[1].tamanhos)
        .then(response=>{
            expect(response.status).toBe(201)
            expect(response.body).toMatchObject({nome:  produtoData[1].nome, descricao: produtoData[1].descricao})
            expect(response.body).toHaveProperty('fotos')
            expect(response.body).toHaveProperty('nome')
            expect(response.body).toHaveProperty('descricao')
            expect(response.body).toHaveProperty('tamanhos')
            expect(response.body).toHaveProperty('dataRegistro')
            expect(response.body).toHaveProperty('dataAtualizacao')
            expect(response.body).toHaveProperty('_id')
        }).catch(fail)
    })

})