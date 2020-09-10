//@Author ismael alves

/**
 * @api {get} /carrinho Listage de Todos
 * @apiGroup Carrinho
 * @apiHeader {String} Content-Type O Content-Type informa ao cliente qual é o tipo de conteúdo retornado
 * @apiHeaderExample {json} Header
*     {"Content-Type": "application/json"}
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
      {
        "items": [
          {
            "_id": "5f58e9aef0f7ea42a4ec29b3",
            "produto": {
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
            },
            "quantidade": 10,
            "tamanho": "M",
            "dataRegistro": "2020-09-09T14:41:50.534Z",
            "dataAtualizacao": "2020-09-09T14:41:50.534Z",
            "__v": 0
          }
        ]
      }
 */

 /**
 * @api {delete} /carrinho/:id Deletar Produto do Carrinho
 * @apiGroup Carrinho
 * @apiHeader {String} Content-Type O Content-Type informa ao cliente qual é o tipo de conteúdo retornado
 * @apiHeaderExample {json} Header
 *     {"Content-Type": "application/json"}
 * @apiParam {String} id ID do Carrinho (requirido)
 * @apiSuccessExample {json} Success
 *     HTTP/1.1 204 OK
 * @apiErrorExample {json} Documento não encontrado
 *    HTTP/1.1 404 Not Found
 *    "documento não encontrado"
 */

 /**
 * @api {put} /carrinho/:id Atualizar Produto do Carrinho
 * @apiGroup Carrinho
 * @apiHeader {String} Content-Type O Content-Type informa ao cliente qual é o tipo de conteúdo retornado
 * @apiHeaderExample {json} Header
 *     {"Content-Type": "application/json"}
 * @apiParam {String} id ID da produto (requirido)
 * @apiParam {String} quantidade Quantidade do produto (requirido)
 * @apiParamExample {json} Input
 *  {
      "quantidade": 9
    }
 * @apiSuccess {String} _id ID do Carrinho
 * @apiSuccess {String} produto ID do Produto 
 * @apiSuccess {String} quantidade Quantidade do Produto no carrinho
 * @apiSuccess {String} tamanho Tamanho escolhido do Produto
 * @apiSuccessExample {json} Success
 *     HTTP/1.1 200 OK
 *     {
          "_id": "5f58e9aef0f7ea42a4ec29b3",
          "produto": "5f58e72ae949664248f77eb8",
          "quantidade": 9,
          "tamanho": "M",
          "dataRegistro": "2020-09-09T14:41:50.534Z",
          "dataAtualizacao": "2020-09-09T14:44:22.849Z",
          "__v": 0
        }
 * @apiErrorExample {json} Documento não encontrado
 *    HTTP/1.1 404 Not Found
 *    "documento não encontrado"
 * @apiErrorExample {json} Campos Incorretos
 *    HTTP/1.1 400 Bad Request
 *    [
        {
            "nome": "produto",
            "mensagem": "produto deve ser vázio"
        },
        {
            "nome": "tamanho",
            "mensagem": "tamanho deve ser vázio"
        }
      ]
*/

 /**
 * @api {post} /carrinho Cadastro do Produto no Carrinho
 * @apiDescription 
 * Atenção não serão cadastrados produtos onde possui ID do produto e TAMANHO iguais 
 * já cadastrado no carrinho, será somado a quantidade já cadastrada do produto no carrinho 
 * com a quantidade passada na requisição deste metodo
 * @apiGroup Carrinho
 * @apiHeader {String} Content-Type O Content-Type informa ao cliente qual é o tipo de conteúdo retornado
 * @apiHeaderExample {json} Header
 *     {"Content-Type": "application/json"}
 * @apiParam {String} produto ID do Produto (requirido)
 * @apiParam {String} quantidade Quantidade do produto (requirido)
 * @apiParam {String} tamanho Tamanho escolhido do Produto (requirido)
 * @apiParamExample {json} Input
 *    {
        "produto": "5f58e72ae949664248f77eb8",
        "quantidade": 18,
        "tamanho": "M"
      }
 * @apiSuccess {String} _id ID do Produto no Carrinho
 * @apiSuccess {String} produto ID do Produto
 * @apiSuccess {String} quantidade Quantidade do produto 
 * @apiSuccess {String} tamanho Tamanho escolhido do Produto
 * @apiSuccess {String} dataRegistro Data de Registro do Produto 
 * @apiSuccess {String} dataAtualizacao Data de Atualização do Produto
 * @apiSuccessExample {json} Success
 *     HTTP/1.1 200 OK || HTTP/1.1 201 OK
 *     {
        "_id": "5f58e9aef0f7ea42a4ec29b3",
        "produto": "5f58e72ae949664248f77eb8",
        "quantidade": 18,
        "tamanho": "M",
        "dataRegistro": "2020-09-09T14:41:50.534Z",
        "dataAtualizacao": "2020-09-09T14:52:54.569Z",
        "__v": 0
      }
 * @apiErrorExample {json} Campos Incorretos ou inexistentes
 *    HTTP/1.1 400 Bad Request
 *    [
        {
            "nome": "produto",
            "mensagem": "produto e requirido"
        },
        {
            "nome": "quantidade",
            "mensagem": "quantidade e requirido"
        },
        {
            "nome": "tamanho",
            "mensagem": "tamanho e requirido"
        }
      ]
 */