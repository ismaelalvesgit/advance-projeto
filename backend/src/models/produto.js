//@Author ismael alves
import mongoose, { Schema } from 'mongoose'
import Carrinho from './carrinho'
import Upload from './upload'
import Tamanhos from '../types/tamanhos'

const produtoSchema = new Schema({
    nome:{
        type: String,
        required: [true, 'nome e requirido'],
    },
    descricao:{
        type: String,
    },
    fotos:{
        type: [String],
    },
    tamanhos:{
        type: [{
            type: String,
            enum: {
                values: Object.values(Tamanhos),
                message: 'O valor {VALUE} não faz parte dos tipos existentes!'
            },
            trim: true,
            required: [true, 'tamanhos e requirido'],
        }],
        validate: {
            validator: v => Array.isArray(v) && v.length > 0,
            message: "tamanhos e requirido"
        }
    },
},{
    collection:"produto",
    timestamps: { 
        createdAt: 'dataRegistro', 
        updatedAt: 'dataAtualizacao',
    }
})

const removeMiddleware =  function (next){
    Carrinho.countDocuments({produto: mongoose.Types.ObjectId(this._conditions._id)}, async (err, count)=>{
        if(count){
            next({name: 'contains', message: `Este produto esta em ${count} carrinhos de compra`})
        }else{
            await Upload.deleteOne({idObjeto: this._conditions._id, model: Produto.collection.name})
            next()
        }
    })
}

const mask = (obj, next)=>{
    console.log(obj)
    if(obj && Array.isArray(obj.tamanhos) && obj.tamanhos.length > 1){
        obj.tamanhos = [... new Set(obj.tamanhos)]
    }
    next()
}

const saveMiddleware = function(next){
    const produto = this
    mask(produto, next)
}

const updateMiddleware = function (next){
    mask(this.getUpdate(), next)
}

produtoSchema.pre('findOneAndUpdate', updateMiddleware)
produtoSchema.pre('save', saveMiddleware)
produtoSchema.pre('deleteOne', removeMiddleware)

const Produto = mongoose.model('Produto', produtoSchema);

export default Produto;