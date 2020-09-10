//@Author ismael alves
import { redisCachedMiddleware, delPrefixCache, } from '../middlewares/redisCachedMiddleware'
import utils from '../utils/utils'
import env from '../../config/environments'
import mongoose from 'mongoose'

class ControllerBase{

    pageSize
    basePath

    render(resp, next){
        return (document)=>{
            if(document){
                resp.json(this.envelope(document))
            }else{
                next({name:"NotFound"})
            }
        }
    }

    renderAll(resp, next, options = {}){
        return (documents)=>{
            if(documents){
                documents.forEach(async(document, index, array)=>{
                    array[index] = this.envelope(document, null, options)
                })
                resp.json(this.envelopeAll(documents, options))
            }else{
                resp.json(this.envelopeAll([]))
            }
        }
    }

    envelope(document, basePath, options = { skipLinks : false}){
        this.basePath = basePath != null ? basePath : this.basePath
        if(!options.skipLinks){
            document =  Object.assign({_links:{}}, document.toJSON())
            document._links.self = `${this.basePath}/${document._id}`
            document._links.all = `${this.basePath}`
        }
        return document
    }

    envelopeAll(documents = [], options= {}, basePath) {
        this.basePath = basePath != null ? basePath : this.basePath
        let query = ''
        if(options.query){
            Object.keys(options.query).forEach((key, i)=>{
                query += `${i == 0 ? '?':'&'}${key}=${options.query[key]}`
            })
        }
        const resource = {
            _links:{
                self: `${options.url}${query}`
            },
            items: documents
        }
        if(options.page && options.count && options.pageSize){
            let query = ''
            if(options.query){
                Object.keys(options.query).forEach((key)=>{
                    if(key != "_page") query += `&${key}=${options.query[key]}`
                })
            }
            if(options.page > 1){
                resource._links.previous = `${this.basePath}?_page=${options.page-1}${query}`
            }
            const remaining = options.count - (options.page * options.pageSize)
            if(remaining > 0){
                resource._links.remaining = remaining
                resource._links.total = options.count
                resource._links.next = `${this.basePath}?_page=${options.page+1}${query}`
            }
        }
        return options.skipLinks ? {items: documents} : resource
    }

    findOne({
        model, 
        condition = {}, 
        populate, 
        sort, 
        params, 
        basePath, 
        select, 
        disableCache = false
    }){
        return [
            !disableCache ? redisCachedMiddleware(60) : (req, resp, next)=>{next()},
            (req, resp, next)=>{
                this.basePath = basePath != null ? basePath : `/${model.collection.name}` 
                if(params){
                    params.forEach(element => {
                        condition[element.path] = req.params[element.params]
                    })
                }
                model.findOne(condition).populate(populate).select(select).sort(sort)
                .then(this.render(resp, next))
            }
        ]
    }

    findById({
        model, 
        populate, 
        sort, 
        basePath, 
        select, 
        disableCache = false
    }){
        return [
            !disableCache ? redisCachedMiddleware(60) : (req, resp, next)=>{next()},
            (req, resp, next)=>{
                this.basePath = basePath != null ? basePath : `/${model.collection.name}` 
                model.findById(req.params.id).populate(populate).select(select).sort(sort)
                .then(this.render(resp, next))
            }
        ]
    }
    
    findAll({
        model, 
        condition = {}, 
        populate, 
        sort, 
        params, 
        basePath, 
        skipLinks = false, 
        select, 
        disableCache = false
    }){
        return [
            !disableCache ? redisCachedMiddleware(60) : (req, resp, next)=>{next()},
            (req, resp, next)=>{
                let countQuery = {}
                this.basePath = basePath != null ? basePath : `/${model.collection.name}`   
                this.pageSize = req.query._pageSize != null ? parseInt(req.query._pageSize || 1) : 10
                let page = parseInt(req.query._page || 1)
                page = page > 0 ? page : 1
                const skip = (page - 1) * this.pageSize
                if(params){
                    params.forEach(element => {
                        if(element.user){
                            condition[element.path] = req.user._id
                            countQuery[element.path] = req.user._id
                        }else{
                            condition[element.path] = req.params[element.params]
                            countQuery[element.path] = req.params[element.params]
                        }
                    })
                }
                // query da requisição
                let query = {}
                try {
                    Object.keys(req.query).forEach(element => {
                        if(element == '_query') query = JSON.parse(String(req.query[element]).replace("#", "$"))
                    })
                    if(condition){
                        Object.keys(condition).forEach(element =>{
                            if(!query[element]){
                                query[element] = condition[element]
                            }         
                        })
                    }
                } catch (error) {
                    query = condition
                }

                //sort da requisição
                try {
                    if(req.query._sort){
                        let query = JSON.parse(String(req.query._sort))
                        Object.keys(query).forEach((element)=>{
                            if(query[element] == "asc"){
                                query[element] = 1
                            }
                            if(query[element] == "desc"){
                                query[element] = -1
                            }
                        })
                        sort = query
                    }else{
                        sort = sort
                    }
                } catch (error) {
                   
                }
                // console.log(sort)
                // console.log(query)
                // console.log(this.pageSize)
                countQuery = Object.assign(query, countQuery)
                model.countDocuments(countQuery).exec()
                .then(count=>model.find(query)
                    .populate(populate)
                    .select(select)
                    .sort(sort)
                    .skip(skip)
                    .limit(this.pageSize)
                    .then(this.renderAll(resp , next, {page, count, pageSize: this.pageSize, url: req._parsedUrl.pathname, skipLinks:skipLinks, query: req.query}))
                ).catch(next)
            }
        ]
    }

    delete({
        model, 
        params,
        files = [],
        callback = (data, req)=>{}
    }){
        return (req, resp, next) => {
            let condition = {}
            if(params){
                params.forEach(element => {
                    if(element.user){
                        condition[element.path] = req.user._id
                    }else{
                        condition[element.path] = req.params[element.params]
                    }
                })
            }else{
                condition._id =  req.params.id
            }
            // delete com files
            model.findOne(condition).then((remove)=>{
                if(remove){
                    callback(remove, req)
                    if(files.length > 0){        
                        // Removendo os arquivos
                        files.forEach((item)=>{
                            utils.deleteFolder(env.files.uploadsPath+item.path+condition._id)
                        })
                        model.deleteOne(condition).then((doc)=>{
                            if(doc.n){
                                delPrefixCache(model.collection.name)
                                resp.sendStatus(204)
                            }else{
                                next({name:'NotFound'}) 
                            }
                        }).catch(next) 
                    }else{
                        model.deleteOne(condition).then((doc)=>{
                            delPrefixCache(model.collection.name)
                            resp.sendStatus(204) 
                        })
                    }
                }else{
                    next({name:'NotFound'})
                }
            }).catch(next)
        }
    }

    update({
        model, 
        params,
        file = {
            typeUpload: '', // single | multiple,
            files: []
        },
        callback = (data, req)=>{}
    }){
        return (req, resp, next) => {
            const options = {new: true, runValidators: true}
            let condition = {}
            if(params){
                params.forEach(element => {
                    if(element.user){
                        condition[element.path] = req.user._id
                    }else{
                        condition[element.path] = req.params[element.params]
                    }
                })
            }else{
                condition._id =  req.params.id
            }
            // update com files
            if(file.files.length > 0){
                file.typeUpload = file.typeUpload != null ? file.typeUpload : 'single'
                model.findOneAndUpdate(condition, req.body, options).then(async (doc)=>{
                    if(doc == null){
                        next({name: "NotFound"})
                        return false
                    }
                    // Verificando se existe algum arquivo na requisição
                    if(req.files != undefined){
                        // Tipo de Upload de arquivo
                        switch (file.typeUpload) {
                            case 'single':
                                const files = file.files[0]
                                // Verificando se o field existe ou se esta vázio
                                let field = true
                                if(!req.files[files.field]){
                                    field = false
                                }else{
                                    if(Array.isArray(req.files[files.field])){
                                        req.files[files.field].forEach((itens)=>{
                                            if(itens.size <= 0){
                                                field = false
                                                return false
                                            }
                                        })
                                    }else{
                                        if(req.files[files.field].size <= 0){
                                            field = false
                                        }
                                    }
                                }
                                if(field){
                                    let update = {}
                                    if(Array.isArray(req.files[files.field])){
                                        // Multiple Upload path
                                        await utils.multipleUpload({
                                            files: req.files[files.field], 
                                            path: `${files.path}${condition._id}/`, 
                                            nameFile: condition._id, 
                                            idObjeto: condition._id, 
                                            model: model
                                        }).then((urls)=>{
                                            update[files.field] = urls
                                        }).catch(next)
                                    }else{
                                        // Single Upload path
                                        await utils.singleUpload({
                                            file: req.files[files.field], 
                                            path: `${files.path}${condition._id}/`, 
                                            nameFile: condition._id, 
                                            idObjeto: condition._id, 
                                            model: model
                                        }).then((url)=>{
                                            update[files.field] = url
                                        }).catch(next)	
                                    }
                                    model.findOneAndUpdate(condition, update, options).then((foto) => { 
                                        callback(doc, req)
                                        delPrefixCache(model.collection.name)
                                        resp.json(foto)
                                    }).catch(next)
                                }else{
                                    callback(doc, req)
                                    delPrefixCache(model.collection.name)
                                    resp.json(doc)
                                } 
                                break;
                            case 'multiple':

                                break;
                        }
                    }else{
                        callback(doc, req)
                        delPrefixCache(model.collection.name)
                        resp.json(doc)
                    }
                }).catch(next)
            }else{
                model.findOneAndUpdate(condition, req.body, options).then((doc)=>{
                    if(doc == null){
                        next({name: "NotFound"})
                        return false
                    }
                    callback(doc, req)
                    delPrefixCache(model.collection.name)
                    resp.json(doc)
                }).catch(next)
            } 
        }
    }

    save({
        model, 
        addFields,
        file = {
            typeUpload: '', // single | multiple,
            files: []
        },
        callback = (data, req)=>{}
    }){
        return (req, resp, next)=>{
            const options = {new: true, runValidators: true}
            const _id = mongoose.Types.ObjectId()
            let body = req.body
            if(addFields){
                addFields.forEach(element => {
                    if(element.user){
                        body[element.path] = req.user._id
                    }else if(element.ip){
                        body[element.path] = req.headers['x-real-ip'] || req.connection.remoteAddress;
                    }else{
                        body[element.path] = req.params[element.params]
                    }
                })
            }
            if(body.usuario == undefined) delete body.usuario
            // save com files
            if(file.files.length > 0){
                new model({
                    _id: _id,
                    ...body
                }).save().then(async(doc)=>{
                    file.typeUpload = file.typeUpload != null ? file.typeUpload : 'single'
                    if(req.files != undefined){
                        switch (file.typeUpload) {
                            case 'single':
                                const files = file.files[0]
                                // Verificando se o field existe ou se esta vázio
                                let field = true
                                if(!req.files[files.field]){
                                    field = false
                                }else{
                                    if(Array.isArray(req.files[files.field])){
                                        req.files[files.field].forEach((itens)=>{
                                            if(itens.size <= 0){
                                                field = false
                                                return false
                                            }
                                        })
                                    }else{
                                        if(req.files[files.field].size <= 0){
                                            field = false
                                        }
                                    }
                                }
                                if(field){
                                    if(Array.isArray(req.files[files.field])){
                                        // Multiple Upload path
                                        await utils.multipleUpload({
                                            files: req.files[files.field], 
                                            path: `${files.path}${_id}/`, 
                                            nameFile: _id, 
                                            idObjeto:_id, 
                                            model: model
                                        }).then((urls)=>{
                                            body[files.field] = urls
                                        }).catch(next)
                                    }else{
                                        // Single Upload path
                                        await utils.singleUpload({
                                            file: req.files[files.field], 
                                            path: `${files.path}${_id}/`, 
                                            nameFile: _id, 
                                            idObjeto: _id, 
                                            model: model
                                        }).then((url)=>{
                                            body[files.field] = url
                                        }).catch(next)
                                    }
                                }else{
                                    if(Array.isArray(req.files[files.field])){
                                        if(files.defaultFile){
                                            body[files.field] = [`${env.files.default}`]
                                        }
                                    }else{
                                        if(files.defaultFile){
                                            body[files.field] = env.files.default
                                        }
                                    }
                                }
                                break;
                            case 'multiple':
                                
                                break;
                        } 
                    }else{
                        // Verificar se possui defaul file
                        switch (file.typeUpload) {
                            case 'single':
                                const files = file.files[0]
                                if(files.defaultFile){
                                    body[files.field] = env.files.default
                                }
                                break;
                            case 'multiple':
                                break;
                        }
                    }
                    model.findOneAndUpdate({_id: _id}, body, options).then((foto) => { 
                        callback(foto, req)
                        delPrefixCache(model.collection.name)
                        resp.status(201).json(foto)
                    }).catch(next)
                }).catch(next)
            }else{
                new model(body).save().then((doc)=>{
                    callback(doc, req)
                    delPrefixCache(model.collection.name)
                    resp.status(201).json(doc)
                }).catch(next)
            }
        }
    }
}

export default new ControllerBase()