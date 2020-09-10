//@Author ismael alves

/**
 * @api {get} /produto Listage de Todos
 * @apiGroup Produto
 * @apiHeader {String} Content-Type O Content-Type informa ao cliente qual é o tipo de conteúdo retornado
 * @apiHeaderExample {json} Header
*     {"Content-Type": "application/json"}
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
      {
        "_links": {
          "self": "/produto"
        },
        "items": [
          {
            "_links": {
              "self": "/produto/5f58d067627ca12aa8460256",
              "all": "/produto"
            },
            "fotos": [
              "http://localhost:3000/uploads/system/default.png"
            ],
            "tamanhos": [
              "M"
            ],
            "_id": "5f58d067627ca12aa8460256",
            "nome": "01",
            "dataRegistro": "2020-09-09T12:53:59.301Z",
            "dataAtualizacao": "2020-09-09T12:57:53.284Z",
            "__v": 0
          }
        ]
      }
 */

 /**
 * @api {get} /produto/:id Get por ID
 * @apiGroup Produto
 * @apiHeader {String} Content-Type O Content-Type informa ao cliente qual é o tipo de conteúdo retornado
 * @apiHeaderExample {json} Header
*     {"Content-Type": "application/json"}
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
      {
        "_links": {
          "self": "/produto/5f58d067627ca12aa8460256",
          "all": "/produto"
        },
        "fotos": [
          "http://localhost:3000/uploads/system/default.png"
        ],
        "tamanhos": [
          "M"
        ],
        "_id": "5f58d067627ca12aa8460256",
        "nome": "01",
        "dataRegistro": "2020-09-09T12:53:59.301Z",
        "dataAtualizacao": "2020-09-09T12:57:53.284Z",
        "__v": 0
      }
 */

 /**
 * @api {delete} /produto/:id Deletar Produto
 * @apiGroup Produto
 * @apiHeader {String} Content-Type O Content-Type informa ao cliente qual é o tipo de conteúdo retornado
 * @apiHeaderExample {json} Header
 *     {"Content-Type": "application/json"}
 * @apiParam {String} id ID do Produto (requirido)
 * @apiSuccessExample {json} Success
 *     HTTP/1.1 204 OK
 * @apiErrorExample {json} Documento não encontrado
 *    HTTP/1.1 404 Not Found
 *    "documento não encontrado"
 * @apiErrorExample {json} Verificação de atrelamento
 *    HTTP/1.1 400 Bad Request
 *    {
 *        "nome": "contains",
 *        "mensagem": "Este produto esta em ${count} carrinhos de compra"
 *    }
 */

 /**
 * @api {put} /produto/:id Atualizar Produto
 * @apiGroup Produto
 * @apiHeader {String} Content-Type O Content-Type informa ao cliente qual é o tipo de conteúdo retornado
 * @apiHeaderExample {json} Header
 *     {"Content-Type": "application/json"}
 * @apiParam {String} id ID da produto (requirido)
 * @apiParam {String} nome Nome do produto
 * @apiParam {String} descricao Descricao do produto 
 * @apiParam {Array[File]} fotos Fotos do produto 
 * @apiParam {Array[String]} tamanhos Tamanhos do produto
 * @apiParamExample {json} Input
 *    {
          "fotos": [
              File
          ],
          "tamanhos": [
              "M"
          ],
          "_id": "5f58d067627ca12aa8460256",
          "nome": "produto 01",
          "descricao": "produto 01"
      } 
 * @apiSuccess {String} _id ID do Produto
 * @apiSuccess {String} nome Nome da Produto 
 * @apiSuccess {Array[String]} fotos Fotos do Produto 
 * @apiSuccess {Array[String]} tamanhos Tamanhos do Produto 
 * @apiSuccess {String} dataRegistro Data de Registro do Produto 
 * @apiSuccess {String} dataAtualizacao Data de Atualização do Produto
 * @apiSuccessExample {json} Success
 *     HTTP/1.1 200 OK
 *     {
          "fotos": [
              "http://localhost:3000/uploads/system/default.png"
          ],
          "tamanhos": [
              "M"
          ],
          "_id": "5f58d067627ca12aa8460256",
          "nome": "produto 01",
          "dataRegistro": "2020-09-09T12:53:59.301Z",
          "dataAtualizacao": "2020-09-09T14:26:51.129Z",
          "__v": 0,
          "descricao": "produto 01"
      }
 * @apiErrorExample {json} Documento não encontrado
 *    HTTP/1.1 404 Not Found
 *    "documento não encontrado"
*/

 /**
 * @api {post} /produto Cadastro de Produto
 * @apiGroup Produto
 * @apiHeader {String} Content-Type O Content-Type informa ao cliente qual é o tipo de conteúdo retornado
 * @apiHeaderExample {json} Header
 *     {"Content-Type": "application/json"}
 * @apiParam {String} nome Nome do produto (requirido)
 * @apiParam {String} descricao Descricao do produto 
 * @apiParam {Array[File]} fotos Fotos do produto 
 * @apiParam {Array[String]} tamanhos Tamanhos do produto (requirido)
 * @apiParamExample {json} Input
 *    {
 *      "nome": "produto 01",
 *      "tamanhos": ["M"],
 *      "descricao": "produto 01",
 *      "fotos": [
          File
        ]
 *    }
 * @apiSuccess {String} _id ID do Produto
 * @apiSuccess {String} nome Nome do Produto 
 * @apiSuccess {Array[String]} fotos Fotos do Produto 
 * @apiSuccess {Array[String]} tamanhos Tamanhos do Produto 
 * @apiSuccess {String} dataRegistro Data de Registro do Produto 
 * @apiSuccess {String} dataAtualizacao Data de Atualização do Produto
 * @apiSuccessExample {json} Success
 *     HTTP/1.1 200 OK
 *     {
        "fotos": [
            "http://localhost:3000/uploads/system/default.png"
        ],
        "tamanhos": [
            "M"
        ],
        "_id": "5f58e72ae949664248f77eb8",
        "nome": "produto 01",
        "descricao": "produto 01",
        "dataRegistro": "2020-09-09T14:31:06.719Z",
        "dataAtualizacao": "2020-09-09T14:31:06.735Z",
        "__v": 0
      }
 * @apiErrorExample {json} Campos Incorretos ou inexistentes
 *    HTTP/1.1 400 Bad Request
 *    [
        {
            "nome": "nome",
            "mensagem": "nome e requirido"
        },
        {
            "nome": "tamanhos",
            "mensagem": "tamanhos e requirido"
        }
      ]
 */