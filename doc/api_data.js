define({ "api": [
  {
    "type": "post",
    "url": "/user/listcategory",
    "title": "1 listcategory",
    "name": "listcategory_-_Listar_Categorias_filtrado_por_tipo_de_publicación",
    "group": "Category",
    "header": {
      "examples": [
        {
          "title": "Content-Type:",
          "content": "\"value\": \"application/json\"",
          "type": "varchar"
        },
        {
          "title": "access-token:",
          "content": "{ \"value\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY\"",
          "type": "varchar"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "smallint",
            "optional": false,
            "field": "typepublicCategory",
            "description": "<p>required.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>of the Category.</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "status",
            "description": "<p>200 of the Category.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "msg",
            "description": "<p>of the Category.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"success\": true,\n    \"status\": \"200\",\n    \"data\": [\n        {\n            \"id\": 1,\n            \"namec\": \"Bebés\",\n            \"iconc\": \"https://n9.cl/c1z78\",\n            \"SubCategory\": [\n                {\n                    \"idsc\": 1,\n                    \"name\": \"Ropa de bebes\",\n                    \"icon\": \"\",\n                    \"category\": 1,\n                    \"status\": 1\n                }\n            ]\n        },\n        {\n            \"id\": 2,\n            \"namec\": \"Arte\",\n            \"iconc\": \"https://n9.cl/pbmd1\",\n            \"SubCategory\": []\n        },\n        {\n            \"id\": 3,\n            \"namec\": \"Música\",\n            \"iconc\": \"https://n9.cl/hgan\",\n            \"SubCategory\": []\n        },\n        {\n            \"id\": 4,\n            \"namec\": \"indefinidas\",\n            \"iconc\": null,\n            \"SubCategory\": [\n                {\n                    \"idsc\": 2,\n                    \"name\": \"Accesorios para Vehículos\",\n                    \"icon\": \"wheel\",\n                    \"category\": 4,\n                    \"status\": 1\n                },\n                {\n                    \"idsc\": 3,\n                    \"name\": \"Vehículos\",\n                    \"icon\": \"car\",\n                    \"category\": 4,\n                    \"status\": 1\n                },\n                {\n                    \"idsc\": 4,\n                    \"name\": \"Alimentos y Bebidas\",\n                    \"icon\": \"eat\",\n                    \"category\": 4,\n                    \"status\": 1\n                },\n                {\n                    \"idsc\": 5,\n                    \"name\": \"Mascotas\",\n                    \"icon\": \"dog\",\n                    \"category\": 4,\n                    \"status\": 1\n                }\n            ]\n        }\n    ],\n    \"msg\": \"Lista de Categoría\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the Category was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 404 Not Found\n    {\n    \"success\": false,\n    \"status\": \"500\",\n    \"msg\": \"Error al Listar Categoría\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/user/usersroutes.js",
    "groupTitle": "Category"
  },
  {
    "type": "post",
    "url": "/user/LisTypePublication",
    "title": "1 LisTypePublication",
    "name": "LisTypePublication_-_Listar_Categorias_filtrado_por_tipo_de_publicación",
    "group": "TypePublication",
    "header": {
      "examples": [
        {
          "title": "Content-Type:",
          "content": "\"value\": \"application/json\"",
          "type": "varchar"
        },
        {
          "title": "access-token:",
          "content": "{ \"value\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY\"",
          "type": "varchar"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>of the TypePublication.</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "status",
            "description": "<p>200 of the TypePublication.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "msg",
            "description": "<p>of the TypePublication.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"success\": true,\n    \"status\": \"200\",\n    \"data\": [\n        {\n            \"id\": 1,\n            \"name\": \"Takastear\",\n            \"description\": \"Publicar Productos\",\n            \"status\": 1\n        },\n        {\n            \"id\": 2,\n            \"name\": \"ServiTakastear\",\n            \"description\": \"Publicar Servicios\",\n            \"status\": 1\n        },\n        {\n            \"id\": 3,\n            \"name\": \"SubasTakear\",\n            \"description\": \"Publicar Subastas\",\n            \"status\": 1\n        }\n    ],\n    \"msg\": \"Lista de Tipo de Publicación\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the Category was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 404 Not Found\n    {\n    \"success\": false,\n    \"status\": \"500\",\n    \"msg\": \"Error al Listar Categoría\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/user/usersroutes.js",
    "groupTitle": "TypePublication"
  },
  {
    "type": "post",
    "url": "/user/autenticar",
    "title": "2 autenticar",
    "name": "autenticar_-_Login_User",
    "group": "User",
    "header": {
      "examples": [
        {
          "title": "Content-Type:",
          "content": "\"value\": \"application/json\"",
          "type": "varchar"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "idfirebase",
            "description": "<p>required.</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "passworduser",
            "description": "<p>required.</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "emailuser",
            "description": "<p>required.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "status",
            "description": "<p>200 of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "msg",
            "description": "<p>of the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"{\n    \"success\": true,\n    \"status\": \"200\",\n    \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwMDU0NDQsImV4cCI6MTYwMTA5MTg0NH0.lzwyWiplFVyIYIc_TVI_vAindzOXTFuuIE7oLdAvo2U\",\n    \"msg\": \"Usuario Autenticado con éxito\"\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the Domiciliary was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 404 Not Found\n    {\n    \"success\": false,\n    \"status\": \"500\",\n    \"msg\": \"Error al Autenticar\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/user/usersroutes.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/gautenticar",
    "title": "3 gautenticar",
    "name": "gautenticar_-_Login_User",
    "group": "User",
    "header": {
      "examples": [
        {
          "title": "Content-Type:",
          "content": "\"value\": \"application/json\"",
          "type": "varchar"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "idfirebase",
            "description": "<p>required.</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "emailuser",
            "description": "<p>required.</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "fullnameUser",
            "description": "<p>optional.</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "tycUser",
            "description": "<p>optional.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "status",
            "description": "<p>200 of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "msg",
            "description": "<p>of the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"{\n    \"success\": true,\n    \"status\": \"200\",\n    \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwMDU0NDQsImV4cCI6MTYwMTA5MTg0NH0.lzwyWiplFVyIYIc_TVI_vAindzOXTFuuIE7oLdAvo2U\",\n    \"msg\": \"Usuario Autenticado con éxito\"\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the Domiciliary was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 404 Not Found\n    {\n    \"success\": false,\n    \"status\": \"500\",\n    \"msg\": \"Error al Autenticar\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/user/usersroutes.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/newUser",
    "title": "1 newUser",
    "name": "newUser_-_Registro_De_Usuario",
    "group": "User",
    "header": {
      "examples": [
        {
          "title": "Content-Type:",
          "content": "\"value\": \"application/json\"",
          "type": "varchar"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "idfirebaseUser",
            "description": "<p>unique required.</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "fullnameUser",
            "description": "<p>required.</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "phonenumberUser",
            "description": "<p>unique required.</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "emailUser",
            "description": "<p>required.</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "passwordUser",
            "description": "<p>required .</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "tycUser",
            "description": "<p>required .</p>"
          },
          {
            "group": "Parameter",
            "type": "varchar",
            "optional": false,
            "field": "urlimgUser",
            "description": "<p>optional .</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "status",
            "description": "<p>200 of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "msg",
            "description": "<p>of the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"success\": true,\n    \"status\": \"200\",\n    \"msg\": \"Usuario registrado con éxito\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n            success: false,\n            status: '500',\n            msgerr: 'response.error.sqlMessage',\n            codeerr: 'response.error.code',\n            noerr: 'response.error.errno'\n    }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/user/usersroutes.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/user/tokenpush",
    "title": "4 tokenpush",
    "name": "tokenpush_-_Registar_o_Actualizar_TokenPushs",
    "group": "User",
    "header": {
      "examples": [
        {
          "title": "Content-Type:",
          "content": "\"value\": \"application/json\"",
          "type": "varchar"
        },
        {
          "title": "access-token:",
          "content": "{ \"value\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY\"",
          "type": "varchar"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "smallint",
            "optional": false,
            "field": "idfirebaseUser",
            "description": "<p>required.</p>"
          },
          {
            "group": "Parameter",
            "type": "smallint",
            "optional": false,
            "field": "tokenpushUser",
            "description": "<p>required.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "status",
            "description": "<p>200 of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "msg",
            "description": "<p>of the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"success\": true,\n    \"status\": \"200\",\n    \"msg\": \"Token Push Actualizado\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 404 Not Found\n    {\n    \"success\": false,\n    \"status\": \"500\",\n    \"msg\": \"Error al Listar Categoría\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/user/usersroutes.js",
    "groupTitle": "User"
  }
] });
