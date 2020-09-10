//@Author ismael alves

//db config
let userDB
let passDB
let hostDB
let portDB
let databaseDB

//server config
let port
let url
let throttling

let enviroment = process.env.ENVIROMENT || 'TEST'
switch (enviroment) {
  case 'DEV':
    url = process.env.SERVER_URL  || 'http://localhost:3000'
    port = process.env.SERVER_PORT || 3000
    throttling = process.env.SERVER_THROTTLING || false
    userDB = process.env.DB_USER || 'root'
    passDB = process.env.DB_PASS || 'advance2020'
    hostDB = process.env.DB_HOST || 'localhost'
    portDB = process.env.DB_PORT || 27017
    databaseDB = process.env.DB_DATABASE|| 'advance_dev'
    break; 
  case 'TEST':
    url = process.env.SERVER_URL  || 'http://localhost:3000'
    port = process.env.SERVER_PORT || 3000
    throttling = process.env.SERVER_THROTTLING || false
    userDB = process.env.DB_USER || 'test'
    passDB = process.env.DB_PASS || 'advance2020'
    hostDB = process.env.DB_HOST || 'localhost'
    portDB = process.env.DB_PORT || 27017
    databaseDB = process.env.DB_DATABASE|| 'advance_test'
    break;
  case 'PROD':
    url = process.env.SERVER_URL  || 'http://localhost:3000'
    port = process.env.SERVER_PORT || 3000
    throttling = process.env.SERVER_THROTTLING || true
    userDB = process.env.DB_USER || 'root'
    passDB = process.env.DB_PASS || 'advance2020'
    hostDB = process.env.DB_HOST || 'localhost'
    portDB = process.env.DB_PORT || 27017
    databaseDB = process.env.DB_DATABASE|| 'advance'
    break;
  default:
    url = process.env.SERVER_URL  || 'http://localhost:3000'
    port = process.env.SERVER_PORT || 3000
    throttling = process.env.SERVER_THROTTLING || false
    userDB = process.env.DB_USER || 'dev'
    passDB = process.env.DB_PASS || 'advance2020'
    hostDB = process.env.DB_HOST || 'localhost'
    portDB = process.env.DB_PORT || 27017
    databaseDB = process.env.DB_DATABASE|| 'advance_dev'
}

export default {
  enviroment: enviroment,
  server: { 
    port: port,
    url: url,
    throttling: throttling
  },
  files:{
    default: url+'/uploads/system/default.png',
    user: url+'/uploads/system/user.png',
    uploadsPath: './src/public/uploads/',
    uploadsUrl: url+'/uploads/'
  },
  db: {
    url: `mongodb://${userDB}:${passDB}@${hostDB}:${portDB}/${databaseDB}`,
    user: userDB,
    pass: passDB,
    host: hostDB,
    port: portDB,
    database: databaseDB,
    clearBackup: process.env.DB_CLEAR_BACKUP || true,
    daysClearBackup: process.env.DB_DAYS_CLEAR_BACKUP || 10,
    cache: {
      enable: process.env.DB_CACHE_ENABLE || false,
      pass: process.env.DB_CACHE_PASS || 'events2019',
      host: process.env.DB_CACHE_HOST || 'localhost',
      port: process.env.DB_CACHE_USER || 6379,
      prefix: process.env.DB_CACHE_PREFIX|| 'cache:',
    }
  }
}
