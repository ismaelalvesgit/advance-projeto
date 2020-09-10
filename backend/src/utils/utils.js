//@Author ismael alves
import fs from 'fs'
import shell from 'shelljs'
import Upload from '../models/upload'
import env from '../../config/environments'
import mv from 'mv'
import rimraf from 'rimraf'

class Utils{

    //metodo que faz upload de um arquivo por vez
    singleUpload({file, path, nameFile, idObjeto, model}){
        return new Promise((resolve, reject)=>{
            try {
                this.defaultFolder(env.files.uploadsPath + path)
                let extension = this.fileExtension(file.type.split('/')[1])
                let name = nameFile+'.'+extension;
                let path_origem = file.path;
                let path_destino = env.files.uploadsPath + path + name; 
                mv(path_origem, path_destino, async function(err){  
                    if(!err){  
                        Upload.find({idObjeto: idObjeto}).then((doc)=>{
                            if(doc.length > 0){
                                Upload.findOneAndUpdate({idObjeto: idObjeto}, {
                                    model: model.collection.name,
                                    idObjeto: idObjeto,
                                    local: path_destino,
                                    nome: name,
                                    extensao: extension,
                                    url: env.files.uploadsUrl + path + name
                                })
                                .then(()=> resolve(env.files.uploadsUrl + path + name))
                                .catch(reject)
                            }else{
                                new Upload({
                                    model: model.collection.name,
                                    idObjeto: idObjeto,
                                    local: path_destino,
                                    nome: name,
                                    extensao: extension,
                                    url: env.files.uploadsUrl + path + name
                                }).save().then(()=> resolve(env.files.uploadsUrl + path + name))
                                .catch(reject)
                            }
                        })    
                    }else{
                        reject({name: "upload", message: err})
                    }
                })
            } catch (error) {
                reject({name: "upload", message: error})
            }
        })
    }

    //metodo que faz varios uploads de uma vez
    multipleUpload({files, path, nameFile, idObjeto, model, limit}){
        return new Promise((resolve, reject)=>{
            try {
                this.defaultFolder(env.files.uploadsPath + path) 
                limit = files.length == undefined ? 1 : files.length
                if(limit > 4){
                    limit = 4
                } 
                let urls = []
                for(let i = 0; i < limit; i++){
                    let extension = ''
                    let path_origem = ''
                    let name = ''
                    if(limit == 1 ){
                        extension = this.fileExtension(files.type.split('/')[1])
                        path_origem = files.path;
                        name = nameFile +'.'+extension;
                    }else{
                        extension = this.fileExtension(files[i].type.split('/')[1])
                        path_origem = files[i].path;
                        name = nameFile+i +'.'+extension;
                    }
                    let path_destino = env.files.uploadsPath + path + name;
                    mv(path_origem, path_destino, async function(err){  
                        if(!err){
                            urls.push(env.files.uploadsUrl + path + name)
                            Upload.find({idObjeto: idObjeto}).then((doc)=>{
                                if(doc.length > 0){
                                    Upload.findOneAndUpdate({idObjeto: idObjeto}, {
                                        model: model.collection.name,
                                        idObjeto: idObjeto,
                                        local: path_destino,
                                        nome: name,
                                        extensao: extension,
                                        url: env.files.uploadsUrl + path + name
                                    }).then(()=> {
                                        if(parseInt(limit) == urls.length){
                                            resolve(urls)
                                        }
                                    }).catch(reject)
                                }else{
                                    new Upload({
                                        model: model.collection.name,
                                        idObjeto: idObjeto,
                                        local: path_destino,
                                        nome: name,
                                        extensao: extension,
                                        url: env.files.uploadsUrl + path + name
                                    }).save().then(()=> {
                                        if(parseInt(limit) == urls.length){
                                            resolve(urls)
                                        }
                                    }).catch(reject)
                                }
                            })
                        }else{
                            reject({name: "upload", message: err})
                        }
                    })
                } 
            } catch (error) {
                reject({name: "upload", message: error})
            }
        })
    }

    //metodo que fara tratamento de extenções de arquivos que serao feito upload
    fileExtension(extension){
        switch(extension){
            case 'vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                extension = 'xlsx'
                break;
            case 'vnd.openxmlformats-officedocument.wordprocessingml.document':
                extension = 'doc'
                break;
            case 'vnd.ms-powerpoint':
                extension = 'ppt'
                break;
            case 'x-rar-compressed':
                extension = 'rar'
                break;
            case 'plain':
                extension = 'log'
                break;
            case 'octet-stream':
                extension = 'pxd'
                break;
            case 'svg+xml':
                extension = 'svg'
                break;
            case 'vnd.microsoft.icon':
                extension = 'icon'
                break;    
        }
        return extension
    }
    
    //metodo que deleta uma folder
    deleteFolder(path){
        rimraf.sync(path)
    }

    //metodo que deleta um arquivo de upload
    deleteFile(url){
        const file  = url.split(env.files.uploadsUrl)[1]
        if(file != 'system/default.png'){
            fs.unlinkSync(env.files.uploadsPath+file)
        }
    }

    //metodo que criar folders
    defaultFolder(folder){
        if (!fs.existsSync(folder)){
            shell.mkdir('-p', folder)
        }
    }
}

export default new Utils()