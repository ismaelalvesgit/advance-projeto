define({ "api": [
  {
    "type": "delete",
    "url": "/carrinho/:id",
    "title": "Deletar Produto do Carrinho",
    "group": "Carrinho",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>O Content-Type informa ao cliente qual é o tipo de conteúdo retornado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"Content-Type\": \"application/json\"}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID do Carrinho (requirido)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 204 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Documento não encontrado",
          "content": "HTTP/1.1 404 Not Found\n\"documento não encontrado\"",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "doc/carrinho.js",
    "groupTitle": "Carrinho",
    "name": "DeleteCarrinhoId"
  },
  {
    "type": "get",
    "url": "/carrinho",
    "title": "Listage de Todos",
    "group": "Carrinho",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>O Content-Type informa ao cliente qual é o tipo de conteúdo retornado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"Content-Type\": \"application/json\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n   {\n     \"items\": [\n       {\n         \"_id\": \"5f58e9aef0f7ea42a4ec29b3\",\n         \"produto\": {\n           \"fotos\": [\n             \"http://localhost:3000/uploads/system/default.png\"\n           ],\n           \"tamanhos\": [\n             \"M\"\n           ],\n           \"_id\": \"5f58e72ae949664248f77eb8\",\n           \"nome\": \"produto 01\",\n           \"descricao\": \"produto 01\",\n           \"dataRegistro\": \"2020-09-09T14:31:06.719Z\",\n           \"dataAtualizacao\": \"2020-09-09T14:31:06.735Z\",\n           \"__v\": 0\n         },\n         \"quantidade\": 10,\n         \"tamanho\": \"M\",\n         \"dataRegistro\": \"2020-09-09T14:41:50.534Z\",\n         \"dataAtualizacao\": \"2020-09-09T14:41:50.534Z\",\n         \"__v\": 0\n       }\n     ]\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "doc/carrinho.js",
    "groupTitle": "Carrinho",
    "name": "GetCarrinho"
  },
  {
    "type": "post",
    "url": "/carrinho",
    "title": "Cadastro do Produto no Carrinho",
    "description": "<p>Atenção não serão cadastrados produtos onde possui ID do produto e TAMANHO iguais já cadastrado no carrinho, será somado a quantidade já cadastrada do produto no carrinho com a quantidade passada na requisição deste metodo</p>",
    "group": "Carrinho",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>O Content-Type informa ao cliente qual é o tipo de conteúdo retornado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"Content-Type\": \"application/json\"}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "produto",
            "description": "<p>ID do Produto (requirido)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "quantidade",
            "description": "<p>Quantidade do produto (requirido)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tamanho",
            "description": "<p>Tamanho escolhido do Produto (requirido)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"produto\": \"5f58e72ae949664248f77eb8\",\n     \"quantidade\": 18,\n     \"tamanho\": \"M\"\n   }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID do Produto no Carrinho</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "produto",
            "description": "<p>ID do Produto</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "quantidade",
            "description": "<p>Quantidade do produto</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tamanho",
            "description": "<p>Tamanho escolhido do Produto</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataRegistro",
            "description": "<p>Data de Registro do Produto</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataAtualizacao",
            "description": "<p>Data de Atualização do Produto</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK || HTTP/1.1 201 OK\n{\n    \"_id\": \"5f58e9aef0f7ea42a4ec29b3\",\n    \"produto\": \"5f58e72ae949664248f77eb8\",\n    \"quantidade\": 18,\n    \"tamanho\": \"M\",\n    \"dataRegistro\": \"2020-09-09T14:41:50.534Z\",\n    \"dataAtualizacao\": \"2020-09-09T14:52:54.569Z\",\n    \"__v\": 0\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Campos Incorretos ou inexistentes",
          "content": "HTTP/1.1 400 Bad Request\n[\n     {\n         \"nome\": \"produto\",\n         \"mensagem\": \"produto e requirido\"\n     },\n     {\n         \"nome\": \"quantidade\",\n         \"mensagem\": \"quantidade e requirido\"\n     },\n     {\n         \"nome\": \"tamanho\",\n         \"mensagem\": \"tamanho e requirido\"\n     }\n   ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "doc/carrinho.js",
    "groupTitle": "Carrinho",
    "name": "PostCarrinho"
  },
  {
    "type": "put",
    "url": "/carrinho/:id",
    "title": "Atualizar Produto do Carrinho",
    "group": "Carrinho",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>O Content-Type informa ao cliente qual é o tipo de conteúdo retornado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"Content-Type\": \"application/json\"}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID da produto (requirido)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "quantidade",
            "description": "<p>Quantidade do produto (requirido)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"quantidade\": 9\n   }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID do Carrinho</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "produto",
            "description": "<p>ID do Produto</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "quantidade",
            "description": "<p>Quantidade do Produto no carrinho</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tamanho",
            "description": "<p>Tamanho escolhido do Produto</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n      \"_id\": \"5f58e9aef0f7ea42a4ec29b3\",\n      \"produto\": \"5f58e72ae949664248f77eb8\",\n      \"quantidade\": 9,\n      \"tamanho\": \"M\",\n      \"dataRegistro\": \"2020-09-09T14:41:50.534Z\",\n      \"dataAtualizacao\": \"2020-09-09T14:44:22.849Z\",\n      \"__v\": 0\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Documento não encontrado",
          "content": "HTTP/1.1 404 Not Found\n\"documento não encontrado\"",
          "type": "json"
        },
        {
          "title": "Campos Incorretos",
          "content": "HTTP/1.1 400 Bad Request\n[\n     {\n         \"nome\": \"produto\",\n         \"mensagem\": \"produto deve ser vázio\"\n     },\n     {\n         \"nome\": \"tamanho\",\n         \"mensagem\": \"tamanho deve ser vázio\"\n     }\n   ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "doc/carrinho.js",
    "groupTitle": "Carrinho",
    "name": "PutCarrinhoId"
  },
  {
    "type": "delete",
    "url": "/produto/:id",
    "title": "Deletar Produto",
    "group": "Produto",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>O Content-Type informa ao cliente qual é o tipo de conteúdo retornado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"Content-Type\": \"application/json\"}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID do Produto (requirido)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 204 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Documento não encontrado",
          "content": "HTTP/1.1 404 Not Found\n\"documento não encontrado\"",
          "type": "json"
        },
        {
          "title": "Verificação de atrelamento",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"nome\": \"contains\",\n    \"mensagem\": \"Este produto esta em ${count} carrinhos de compra\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "doc/produtos.js",
    "groupTitle": "Produto",
    "name": "DeleteProdutoId"
  },
  {
    "type": "get",
    "url": "/produto",
    "title": "Listage de Todos",
    "group": "Produto",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>O Content-Type informa ao cliente qual é o tipo de conteúdo retornado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"Content-Type\": \"application/json\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n   {\n     \"_links\": {\n       \"self\": \"/produto\"\n     },\n     \"items\": [\n       {\n         \"_links\": {\n           \"self\": \"/produto/5f58d067627ca12aa8460256\",\n           \"all\": \"/produto\"\n         },\n         \"fotos\": [\n           \"http://localhost:3000/uploads/system/default.png\"\n         ],\n         \"tamanhos\": [\n           \"M\"\n         ],\n         \"_id\": \"5f58d067627ca12aa8460256\",\n         \"nome\": \"01\",\n         \"dataRegistro\": \"2020-09-09T12:53:59.301Z\",\n         \"dataAtualizacao\": \"2020-09-09T12:57:53.284Z\",\n         \"__v\": 0\n       }\n     ]\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "doc/produtos.js",
    "groupTitle": "Produto",
    "name": "GetProduto"
  },
  {
    "type": "get",
    "url": "/produto/:id",
    "title": "Get por ID",
    "group": "Produto",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>O Content-Type informa ao cliente qual é o tipo de conteúdo retornado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"Content-Type\": \"application/json\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n   {\n     \"_links\": {\n       \"self\": \"/produto/5f58d067627ca12aa8460256\",\n       \"all\": \"/produto\"\n     },\n     \"fotos\": [\n       \"http://localhost:3000/uploads/system/default.png\"\n     ],\n     \"tamanhos\": [\n       \"M\"\n     ],\n     \"_id\": \"5f58d067627ca12aa8460256\",\n     \"nome\": \"01\",\n     \"dataRegistro\": \"2020-09-09T12:53:59.301Z\",\n     \"dataAtualizacao\": \"2020-09-09T12:57:53.284Z\",\n     \"__v\": 0\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "doc/produtos.js",
    "groupTitle": "Produto",
    "name": "GetProdutoId"
  },
  {
    "type": "post",
    "url": "/produto",
    "title": "Cadastro de Produto",
    "group": "Produto",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>O Content-Type informa ao cliente qual é o tipo de conteúdo retornado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"Content-Type\": \"application/json\"}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome do produto (requirido)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "descricao",
            "description": "<p>Descricao do produto</p>"
          },
          {
            "group": "Parameter",
            "type": "Array[File]",
            "optional": false,
            "field": "fotos",
            "description": "<p>Fotos do produto</p>"
          },
          {
            "group": "Parameter",
            "type": "Array[String]",
            "optional": false,
            "field": "tamanhos",
            "description": "<p>Tamanhos do produto (requirido)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"nome\": \"produto 01\",\n  \"tamanhos\": [\"M\"],\n  \"descricao\": \"produto 01\",\n  \"fotos\": [\n       File\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID do Produto</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome do Produto</p>"
          },
          {
            "group": "Success 200",
            "type": "Array[String]",
            "optional": false,
            "field": "fotos",
            "description": "<p>Fotos do Produto</p>"
          },
          {
            "group": "Success 200",
            "type": "Array[String]",
            "optional": false,
            "field": "tamanhos",
            "description": "<p>Tamanhos do Produto</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataRegistro",
            "description": "<p>Data de Registro do Produto</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataAtualizacao",
            "description": "<p>Data de Atualização do Produto</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n    \"fotos\": [\n        \"http://localhost:3000/uploads/system/default.png\"\n    ],\n    \"tamanhos\": [\n        \"M\"\n    ],\n    \"_id\": \"5f58e72ae949664248f77eb8\",\n    \"nome\": \"produto 01\",\n    \"descricao\": \"produto 01\",\n    \"dataRegistro\": \"2020-09-09T14:31:06.719Z\",\n    \"dataAtualizacao\": \"2020-09-09T14:31:06.735Z\",\n    \"__v\": 0\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Campos Incorretos ou inexistentes",
          "content": "HTTP/1.1 400 Bad Request\n[\n     {\n         \"nome\": \"nome\",\n         \"mensagem\": \"nome e requirido\"\n     },\n     {\n         \"nome\": \"tamanhos\",\n         \"mensagem\": \"tamanhos e requirido\"\n     }\n   ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "doc/produtos.js",
    "groupTitle": "Produto",
    "name": "PostProduto"
  },
  {
    "type": "put",
    "url": "/produto/:id",
    "title": "Atualizar Produto",
    "group": "Produto",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>O Content-Type informa ao cliente qual é o tipo de conteúdo retornado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"Content-Type\": \"application/json\"}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID da produto (requirido)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome do produto</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "descricao",
            "description": "<p>Descricao do produto</p>"
          },
          {
            "group": "Parameter",
            "type": "Array[File]",
            "optional": false,
            "field": "fotos",
            "description": "<p>Fotos do produto</p>"
          },
          {
            "group": "Parameter",
            "type": "Array[String]",
            "optional": false,
            "field": "tamanhos",
            "description": "<p>Tamanhos do produto</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n       \"fotos\": [\n           File\n       ],\n       \"tamanhos\": [\n           \"M\"\n       ],\n       \"_id\": \"5f58d067627ca12aa8460256\",\n       \"nome\": \"produto 01\",\n       \"descricao\": \"produto 01\"\n   }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID do Produto</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome da Produto</p>"
          },
          {
            "group": "Success 200",
            "type": "Array[String]",
            "optional": false,
            "field": "fotos",
            "description": "<p>Fotos do Produto</p>"
          },
          {
            "group": "Success 200",
            "type": "Array[String]",
            "optional": false,
            "field": "tamanhos",
            "description": "<p>Tamanhos do Produto</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataRegistro",
            "description": "<p>Data de Registro do Produto</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dataAtualizacao",
            "description": "<p>Data de Atualização do Produto</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n      \"fotos\": [\n          \"http://localhost:3000/uploads/system/default.png\"\n      ],\n      \"tamanhos\": [\n          \"M\"\n      ],\n      \"_id\": \"5f58d067627ca12aa8460256\",\n      \"nome\": \"produto 01\",\n      \"dataRegistro\": \"2020-09-09T12:53:59.301Z\",\n      \"dataAtualizacao\": \"2020-09-09T14:26:51.129Z\",\n      \"__v\": 0,\n      \"descricao\": \"produto 01\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Documento não encontrado",
          "content": "HTTP/1.1 404 Not Found\n\"documento não encontrado\"",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "doc/produtos.js",
    "groupTitle": "Produto",
    "name": "PutProdutoId"
  },
  {
    "type": "get",
    "url": "/system/healthcheck",
    "title": "Analise da saúde da API",
    "group": "System",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>O Content-Type informa ao cliente qual é o tipo de conteúdo retornado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{\"Content-Type\": \"application/json\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n  {\n       \"process\": 17792,\n       \"uptime\": 35.936233801,\n       \"dataBase\": {\n           \"status\": \"connected\"\n       }\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Erro",
          "content": "HTTP/1.1 503 Service Unavailable\n\"pilha de possiveis problemas\"",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "doc/system.js",
    "groupTitle": "System",
    "name": "GetSystemHealthcheck"
  }
] });
