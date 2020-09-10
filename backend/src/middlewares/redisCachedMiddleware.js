//@Author ismael alves
import { redisClient } from '../../config/server'
import env from '../../config/environments'

//duration = segundos
 function redisCachedMiddleware(timeExp = 20){
    return async (req, resp, next)=>{
        if(env.db.cache.enable){
            const key = req.originalUrl || req.url 
            const data = await getCache(key)
            if(data){
                resp.json(data)
                return;
            }else{
                resp.sendResponse = resp.send
                resp.send = (body) => {
                    setCache({key: key, value: body, timeExp: timeExp})
                    resp.sendResponse(body)
                }
                next()
            }
        }else{
            next()
        }
    }
}

function setCache({key, value, timeExp}){
    return redisClient.set(key, value, "EX", timeExp)
}

async function getCache(key){
    const data = await redisClient.get(key)
    return data ? JSON.parse(data) : null
}

function delCache({req, key}){
    if(req){
        return redisClient.del(req.originalUrl || req.url)
    }  
    return redisClient.del(key)
}

async function delPrefixCache(prefix){
    const keys = (await redisClient.keys(`${env.db.cache.prefix}${prefix}:*`)).map((key)=>{
        key.replace(env.db.cache.prefix, "")
    })
    return keys.length > 0 ? redisClient.del(keys) : null
}

export { delCache, setCache, getCache, delPrefixCache, redisCachedMiddleware }