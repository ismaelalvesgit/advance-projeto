//@Author ismael alves
import mongoose from 'mongoose'
import Tamanhos from '../types/tamanhos'

const carrinhoSchema = new mongoose.Schema({
    quantidade:{
        type: Number,
        required: [true, 'quantidade e requirido']
    },
    tamanho:{
        type: String,
        enum: {
            values: Object.values(Tamanhos),
            message: 'O valor {VALUE} não faz parte dos tipos existentes!'
        },
        trim: true,
        required: [true, 'tamanhos e requirido'],
    },
    produto: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Produto',
        required: [true, 'produto e Requirida']
    },
},{
    collection:"carrinho",
    timestamps: { 
        createdAt: 'dataRegistro', 
        updatedAt: 'dataAtualizacao',
    }
})

const Carrinho = mongoose.model('Carrinho', carrinhoSchema);

export default Carrinho;