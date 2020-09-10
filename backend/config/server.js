//@Author ismael alves
import express from 'express'
import bodyParser from 'body-parser'
import multiparty from 'connect-multiparty'
import compression from 'compression'
import morgan from 'morgan'
import helmet from 'helmet'
import csp from 'helmet-csp'
import hidePoweredBy from 'hide-powered-by'
import hsts from 'hsts'
import ienoopen from 'ienoopen'
import frameguard from 'frameguard'
import xssFilter from 'x-xss-protection'
import fs from 'fs'
import cors from 'cors'
import throttlingResquestMiddleware from '../src/middlewares/throttlingResquestMiddleware'
import assignResquestMiddleware from '../src/middlewares/assignResquestMiddleware'
import handlerErroMiddleware from '../src/middlewares/handlerErroMiddleware'
import utils from '../src/utils/utils'
import locale from 'date-fns/locale/pt-BR'
import { format } from 'date-fns'
import mongoose from 'mongoose'
import env from './environments'
import http from 'http'
import { requestCounters, responseCounters, injectMetricsRoute, startCollection } from '../src/utils/metric'
import path from 'path'
import Redis from 'ioredis'

//instancia
const app = express()
const server = http.createServer(app)

const redisClient = new Redis({
    host: env.db.cache.host,
    port: env.db.cache.port,
    keyPrefix: env.db.cache.prefix,
    retryStrategy: function(options){
        if(env.db.cache.enable){
            shell.env["DB_CACHE_ENABLE"] = false
            env.db.cache.enable = false
        }
        // reconnect after
        return 1000;
    }
})

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(multiparty())
app.use(compression())
app.use(cors())
app.use(helmet())
app.use(csp({
    directives: {
        fontSrc: ["'self'", 'fonts.com'],
        sandbox: ['allow-forms', 'allow-scripts'],
        reportUri: '/report-violation',
        objectSrc: ["'none'"],
        upgradeInsecureRequests: true,
        workerSrc: false 
    },
    loose: false,
    reportOnly: false,
    setAllHeaders: false,
    disableAndroid: false,
    browserSniff: true
}))
app.use(hidePoweredBy())
app.use(hsts({
    maxAge: 31536000,
    includeSubDomains: true, 
    preload: true
}))
app.use(ienoopen())
app.use(frameguard())
app.use(xssFilter())
app.use(assignResquestMiddleware)
app.use(responseCounters)
app.use(requestCounters)
if(env.server.throttling){
    app.use(throttlingResquestMiddleware)
}

//create folders default
utils.defaultFolder('./logs')

// metrics endpoint
injectMetricsRoute(app)

//loggers
morgan.token('id', function getId (req) {
    return req.id
})
morgan.token('user', function getUser (req) {
    return req.user ? req.user._id : undefined
})
app.use(morgan(':id :user :remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', {
    skip: function (req, res) { return res.statusCode < 404 },
    stream: fs.createWriteStream(`./logs/erros-${format(new Date(), 'dd-MM-yyyy', locale)}.log`, {flags: 'a'})
}))
app.use(morgan(':id :user :remote-addr ":method :url HTTP/:http-version" :response-time', {
    skip: function (req, res) { return res.statusCode > 400 },
    stream: fs.createWriteStream(`./logs/access-${format(new Date(), 'dd-MM-yyyy', locale)}.log`, {flags: 'a'})
}))

//engine view
app.set('view engine', 'ejs')
app.set('views', './src/views')

//assets
app.use(express.static('./src/public'))

//auto import
fs.readdirSync('./src/controllers/').forEach((file)=>{
    require(path.join(__dirname, '..', 'src/controllers', file ))(app)
})

// NotFound router
app.get('*', (req, resp)=>{
    resp.status(404).json([{nome:"NotFound", mensagem:"rota não foi encontrada :("}])
})    

function mongoConnect(resolve){
    server.listen(env.server.port, ()=>{
        startCollection()
        app.use(handlerErroMiddleware)
        console.log('servidor online', env.server.port)
        resolve({url:env.server.url, server:server})
    })
}

// start application
function startup(port){
    return new Promise((resolve, reject)=>{
        env.server.port = port != null ? port : env.server.port
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology:true,
            useCreateIndex: true
        }
        mongoose.Promise = global.Promise
        mongoose.set('useFindAndModify', false)
        mongoose.connect(env.db.url, opts).then(()=>mongoConnect(resolve)).catch(reject)
        // Events Mongo DB
        const mongoDb = mongoose.connection
        let retry = 1
        mongoDb.on('disconnected', function() {
            console.log(`Não foi possivel estabelecer a conexão com o banco, tentativa ${retry}º`)
            if(retry < 6){
                mongoose.connect(env.db.url, opts).then(()=>{
                    shutdown()
                    require('./server').startup()
                }).catch(()=> shutdown())
            }else{
                process.exit(0)
            }
            retry++
        });
    })
}

// stop application
async function shutdown(){
    return mongoose.disconnect().then(() => server.close())
}

export { startup, shutdown, app, redisClient } // exporta somente o necessário