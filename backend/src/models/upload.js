//@Author ismael alves
import mongoose from 'mongoose'

const uploadsSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: [true, 'nome e Requirido']
    },
    local:{
        type: String,
        required: [true, 'local e Requirido']
    },
    extensao:{
        type: String,
        required: [true, 'extensão e Requirido']
    },
    url:{
        type: String,
        required: [true, 'url e Requirido']
    },
    model:{
        type: String,
        required: [true, 'model e Requirido']
    },
    idObjeto:{
        type:  mongoose.Schema.Types.ObjectId,
        required: [true, 'idObjeto e Requirido']
    }
},{
    collection:"upload",
    timestamps: { 
        createdAt: 'dataRegistro', 
        updatedAt: 'dataAtualizacao',
    }
})

const Upload = mongoose.model('Upload', uploadsSchema);

export default Upload;