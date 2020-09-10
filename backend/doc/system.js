//@Author ismael alves

/**
 * @api {get} /system/healthcheck Analise da saúde da API
 * @apiGroup System
 * @apiHeader {String} Content-Type O Content-Type informa ao cliente qual é o tipo de conteúdo retornado
 * @apiHeaderExample {json} Header
 *     {"Content-Type": "application/json"}
 * @apiSuccessExample {json} Success
 *      HTTP/1.1 200 OK
       {
            "process": 17792,
            "uptime": 35.936233801,
            "dataBase": {
                "status": "connected"
            }
        }
 * @apiErrorExample {json} Erro
 *    HTTP/1.1 503 Service Unavailable
 *    "pilha de possiveis problemas"
 */