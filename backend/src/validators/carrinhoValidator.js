//@Author ismael alves
import { checkSchema } from 'express-validator'
import Produto from '../models/produto'
import Tamanhos from '../types/tamanhos'

class ProdutoValidator{

    editar(){
        return checkSchema({
            produto:{
                in:"body",
                isEmpty: {
                    errorMessage: "produto deve ser vázio"
                }
            },
            quantidade:{
                in: 'body',
                notEmpty: {
                    errorMessage: "quantidade e requirido"
                },
                custom:{
                    options: async (value, {req, location, path}) =>{
                        if(value && parseInt(value) <= 0){
                            return Promise.reject(`quantidade necessita ser maior que zero`) 
                        }
                    }
                }
            },
            tamanho:{
                in: 'body',
                isEmpty: {
                    errorMessage: "tamanho deve ser vázio"
                }
            },
        })
    }

    cadastro(){
        return checkSchema({
            produto:{
                in:"body",
                notEmpty: {
                    errorMessage: "produto e requirido"
                },
                custom:{
                    options: async (value, {req, location, path}) =>{
                        if(value){
                            await Produto.findById(value).then((doc)=>{
                                if(doc == null){
                                    return Promise.reject(`produto não foi encontrado :(`)
                                }
                            })
                        }
                    }
                }
            },
            quantidade:{
                in: 'body',
                notEmpty: {
                    errorMessage: "quantidade e requirido"
                },
                custom:{
                    options: async (value, {req, location, path}) =>{
                        if(value && parseInt(value) <= 0){
                            return Promise.reject(`quantidade necessita ser maior que zero`) 
                        }
                    }
                }
            },
            tamanho:{
                in: 'body',
                notEmpty: {
                    errorMessage: "tamanho e requirido"
                },
                custom:{
                    options: async (value, {req, location, path}) =>{
                        if(value){
                            if(!Object.values(Tamanhos).includes(value)){
                                return Promise.reject(`O valor ${value} não faz parte dos tipos existentes!`)  
                            }
                            await Produto.findById(req.body.produto).then((doc)=>{
                                if(doc && !doc.tamanhos.includes(value)){
                                    return Promise.reject(`tamanho selecionado não faz parte dos tamanhos do produto selecionado`)
                                }
                            })
                        }
                    }
                }
            },
        })
    }
}

export default new ProdutoValidator()