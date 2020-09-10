//@Author ismael alves
import { delCache } from './redisCachedMiddleware'

export default function handlerErroMiddleware(e, req, resp, next){
    // console.log(e)
    let messages = []
    switch (e.name) {
        case 'Throttling':
            messages.push({nome: e.name, mensagem: e.mensagem != null ? e.mensagem : 'Token inválido ou incorreto'})
            resp.status(429).json(messages)
            break;
        case 'Forbidden':
            messages.push({nome: e.name, mensagem: e.mensagem != null ? e.mensagem : 'Token inválido ou incorreto'})
            resp.status(403).json(messages)
            break;
        case 'NotFound':
            messages.push({nome: e.name, mensagem: e.mensagem != null ? e.mensagem : 'Documento não encontrado'})
            resp.status(404).json(messages);
            break;
        case 'Unauthorized':
            messages.push({nome: e.name, mensagem: e.mensagem != null ? e.mensagem : 'Seu perfil não tem acesso a isso'})
            resp.status(401).json(messages);
            break;
        case 'backup':
            messages.push({nome: e.name, mensagem: e.message})
            resp.status(400).json(messages)
            break;
        case 'validate':
            messages.push({nome: e.name, mensagem: e.message})
            resp.status(400).json(messages)
            break;
        case 'contains':
            messages.push({nome: e.name, mensagem: e.message})
            resp.status(400).json(messages)
            break;
        case 'email':
            console.log(e.mensagem)
            messages.push({nome:'email', mensagem:'configurações das credenciais de email estão incorretas'})
            resp.status(403).json(messages)
            break;
        case 'express-validator':
            for (let erro in e.errors){
                let name = e.errors[erro].param
                let message = e.errors[erro].msg
                if(!messages.some(msg => name.indexOf(msg.nome) != -1)){
                    messages.push({nome:name, mensagem:message})
                }
            }
            resp.status(400).json(messages)
            break;
        case 'BadRequestError':
            messages.push({nome:'body', mensagem:'corpo da requisição não pode ser vazio'})
            resp.status(400).json(messages)
            break;
        case 'ValidationError':
            for (let field in e.errors) {      
                let name = e.errors[field].properties.path
                let message = e.errors[field].reason != null ? e.errors[field].reason : e.errors[field].properties.message
                messages.push({nome:name, mensagem:message})  
            }
            resp.status(400).json(messages)
            break;
        case 'MongoError':
            if(e.codeName === 'BadValue'){
                messages.push({nome: "BadValue", mensagem: e.errmsg})
            }else{
                var value = e.errmsg.split('{ : ')[1]
                value = value.split(' }')[0]
                value = value.replace(/^"(.+(?="$))"$/, '$1') // remover aspas duplas
          
                var field = e.errmsg.split('index: ')[1]
                field = field.split(' dup key')[0]
                field = field.substring(0, field.lastIndexOf('_')) // retornado valor do field
                let name = field
                let message = ''
                if(e.code = 11000){
                    message = `o ${field} ${value} já cadastrado no sistema` 
                }
                messages.push({nome:name, mensagem:message})
            }
           
            resp.status(400).json(messages)
            break;
        case 'CastError':
            messages.push({nome: e.path, mensagem: 'Documento não encontrado'})
            resp.status(400).json(messages)
            break;
        default:
            //aqui voçê pode enviar um email com a pilha do erro
            console.log(e)
            delCache({req: req})
            resp.status(500).json([
                {
                    nome: 'Erro Interno', 
                    message:`lamentamos por isso ter acontecido :( \n Seu id do erro é ${req.id}`
                }
            ])
    }
}
