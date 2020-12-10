const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const rutasProtegidas = require('../../lib/rutasprotegidas');
const notifications = require('../../lib/notifications.js');
const config = require('../../config/config');
const { check, validationResult } = require('express-validator');
const userController = require('../../controllers/userscontroller');
//app.express();




router.get('/prueba', function (req, res) {
    //res.send('Inicio');
    let data={
        "title": "test",
        "body": "mi descripcion",
        "type": 0,
        "status": 0,
        "id": "hello",
        "click_action": "FLUTTER_NOTIFICATION_CLICK"
    };
    let token="efTmlTE3uzA:APA91bFSLY9NlzIS0xeRjx0OoCsJdH3NQGI7E-yrU6OAx2VRqQeDd2WZR9CEzWg_BPlGf1H_nIO15L-GYmqHs3l4tc_8wgJf1l3RBTj7BxppuBQr8EYz43O6W3IPFCcRT4rUbV50UwFJ";
    let titulo="Notificaciones Takas";
    let detalle="Pruebas con primeras Notificaciones Takas";
    notifications(token,titulo,detalle,data);
    
    res.send('Inicio');

});



/**
 * @api {post} /user/newUser  1 newUser
 * @apiName  newUser - Registro De Usuario
 * @apiGroup User
 * 
 *      
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * 
 *   
 * @apiParam {varchar} idfirebaseUser unique required.
 * @apiParam {varchar} imgUser unique required.
 * @apiParam {int} codCity  optional. 
 * @apiParam {varchar} fullnameUser required.
 * @apiParam {varchar} phonenumberUser  unique required.
 * @apiParam {varchar} emailUser   required.
 * @apiParam {varchar} passwordUser  required .
 * @apiParam {varchar} tycUser  required .
 * @apiParam {varchar} urlimgUser  optional .
 * 
 *
 * @apiSuccess {boolean} success of the User.
 * @apiSuccess {int} status 200 of the User.
 * @apiSuccess {string} msg   of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
    "success": true,
    "status":: "200",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDE5MTYzMjUsImV4cCI6MTYwMjAwMjcyNX0.KBsaWobyOo2_NRmrbhFDisMfvvD9oddNFwfK0D6imC0",
    "msg": "Usuario Registrado con éxito"
}
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
                success: false,
                status: '500',
                msgerr: 'response.error.sqlMessage',
                codeerr: 'response.error.code',
                noerr: 'response.error.errno'
        }
 */
//Crear newUser- 
router.post('/newUser', [
    check('idfirebaseUser', 'El idfirebase es obligatorio').not().isEmpty().exists(),
    check('imgUser', 'El imgUser es obligatorio').not().isEmpty().exists(),
    check('fullnameUser', 'El Nombre del usuario es obligatorio').not().isEmpty().exists(),
    check('phonenumberUser', 'El númeto telefónico es obligatorio').not().isEmpty().exists(),
    check('emailUser', 'El email no puede estra vacio y debe corresponder al formato').isEmail().exists(),
    check('passwordUser', ' La contraseña es obligatoria').not().isEmpty().exists(),
    check('tycUser', ' Es requerido aceptar términos y condisiones').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await userController.newUser(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    console.log(response);
    return res.status(response.data.status).json(response.data)

})

/**
 * @api {post} /user/updateperfil  6 updateperfil
 * @apiName  updateperfil - Completar o actualizar perfil de usuario De Usuario
 * @apiGroup User
 * 
 *      
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * 
 *   
 * @apiParam {varchar} idfirebaseUser unique required.
 * @apiParam {varchar} imgUser unique optional.
 * @apiParam {int} codCity  optional. 
 * @apiParam {varchar} fullnameUser optional.
 * @apiParam {varchar} datebirthUser optional.
 * @apiParam {varchar} phonenumberUser  unique optional.
 * @apiParam {varchar} emailUser  unique  optional.
 * @apiParam {varchar} passwordUser  optional .
 * @apiParam {varchar} tycUser  optional .
 * @apiParam {varchar} urlimgUser  optional .
 * @apiParam {varchar} countryUser  optional .
 * @apiParam {varchar} departmentUser  optional .
 * @apiParam {varchar} membershipsUser  optional .
 * @apiParam {varchar} dirUser  optional .
 * @apiParam {varchar} dirUser  optional .
 * @apiParam {varchar} versionTYC  optional .
 * @apiParam {varchar} versionApp  optional .
 * 
 *
 * @apiSuccess {boolean} success of the User.
 * @apiSuccess {int} status 200 of the User.
 * @apiSuccess {string} msg   of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
    "success": true,
    "status":: "200",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDE5MTYzMjUsImV4cCI6MTYwMjAwMjcyNX0.KBsaWobyOo2_NRmrbhFDisMfvvD9oddNFwfK0D6imC0",
    "msg": "Usuario Registrado con éxito"
}
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
                success: false,
                status: '500',
                msgerr: 'response.error.sqlMessage',
                codeerr: 'response.error.code',
                noerr: 'response.error.errno'
        }
 */
//Completar perfilUser- 
router.post('/updateperfil',rutasProtegidas, [
    check('idfirebaseUser', 'El idfirebase es obligatorio').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await userController.UpdatePerfil(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    console.log(response);
    return res.status(response.data.status).json(response.data)

})

router.get('/datos', rutasProtegidas, (req, res) => {
    const datos = [
        { id: 1, nombre: "Asfo" },
        { id: 2, nombre: "Denisse" },
        { id: 3, nombre: "Carlos" }
    ];

    res.json(datos);
});

/**
 * @api {post} /user/autenticar 2 autenticar
 * @apiName autenticar - Login User
 * @apiGroup User
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * 
 *
 * @apiParam {varchar}  idfirebase  required.
 * @apiParam {varchar} passworduser  required.
 * @apiParam {varchar} emailuser  required.
 
 *
 * @apiSuccess {boolean} success of the User.
 * @apiSuccess {int} status 200 of the User.
 * @apiSuccess {string} msg   of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "{
    "success": true,
    "status":: "200",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwMDU0NDQsImV4cCI6MTYwMTA5MTg0NH0.lzwyWiplFVyIYIc_TVI_vAindzOXTFuuIE7oLdAvo2U",
    "msg": "Usuario Autenticado con éxito"
}
}
 *
 * @apiError UserNotFound The id of the Domiciliary was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al Autenticar"
}
 */
router.post('/autenticar', [
    check('idfirebaseUser', 'El idfirebase el obligatorio').not().isEmpty().exists(),
    check('passwordUser', 'El passworduser el obligatorio').not().isEmpty().exists(),
    check('emailUser', 'El emailuser el obligatorio').isEmail().exists()
], async (req, res) => {

    const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }

    let response = await userController.Autenticar(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})



/**
 * @api {post} /user/gautenticar 3 gautenticar
 * @apiName gautenticar - Login User
 * @apiGroup User
 * 
 *
* @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 *
 * 
 * 
 * @apiParam {varchar}  idfirebase  required.
 * @apiParam {varchar} emailuser  required.
 * @apiParam {varchar} fullnameUser  required.
 * @apiParam {varchar} imgUser  optional.
 * @apiParam {varchar} tycUser  optional.
 
 *
 * @apiSuccess {boolean} success of the User.
 * @apiSuccess {int} status 200 of the User.
 * @apiSuccess {string} msg   of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    {
    "success": true,
    "status":: "200",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDE5MjA0NTcsImV4cCI6MTYwMjAwNjg1N30.GNL6njKiUfPvUSKh4ba7QwokYcs2osMltd0zAJ3dkvU",
    "newUser": true,
    "msg": "Usuario Autenticado con éxito"
}
 *
 * @apiError UserNotFound The id of the Users was not found.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 500 Not Found
 *     {
    "success": false,
    "status":: "500",
    "newUser": true,
    "msg": "Debe aceptar terminos y condiciones"
}
 */
router.post('/gautenticar', [
    check('idfirebaseUser', 'El idfirebase el obligatorio').not().isEmpty().exists(),
    check('fullnameUser', 'El fullnameUser el obligatorio').not().isEmpty().exists(),
    check('emailUser', 'El emailuser el obligatorio').isEmail().exists()
], async (req, res) => {

    const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }

    let response = await userController.GAutenticar(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})


/**
 * @api {post} /user/perfiluser 7 perfiluser
 * @apiName perfiluser - Perfil de un usuario
 * @apiGroup User
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                { "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" 
 *
 *
 * @apiParam {varchar}  idfirebaseUser  required.
 * 
 * @apiSuccess {boolean} success of the User.
 * @apiSuccess {int} status 200 of the User.
 * @apiSuccess {string} msg   of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "success": true,
    "status": "200",
    "data": {
        "NameUser": "Anailys Rodríguez",
        "EmailUser": "anailysrodriguez@gmail.com",
        "PhonenumberUser": "3174723818",
        "DatecreatedUser": "07/09/20",
        "Reputation Vendedor": 4,
        "Reputation Cliente": 0
    },
    "msg": "Perfil de Usuario"
}
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status": "500",
    "msg": "Error al intentar obtener perfil de usuario"
}
 */
//PERFIL DE USUARIO
router.post('/perfiluser', rutasProtegidas, [
    check('idfirebaseUser', 'El idfirebaseUser el obligatorio').not().isEmpty().exists()
], async (req, res) => {

//console.log(req.body);
    let response = await userController.PerfilUser(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})



/**
 * @api {get} /user/LisTypePublication 1 LisTypePublication
 * @apiName LisTypePublication - Listar Categorias filtrado por tipo de publicación
 * @apiGroup TypePublication
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                { "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" 
 *
 *
 * @apiSuccess {boolean} success of the TypePublication.
 * @apiSuccess {int} status 200 of the TypePublication.
 * @apiSuccess {string} msg   of the TypePublication.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "success": true,
    "status":: "200",
    "data": [
        {
            "id": 1,
            "name": "Takastear",
            "description": "Publicar Productos",
            "status":: 1
        },
        {
            "id": 2,
            "name": "ServiTakastear",
            "description": "Publicar Servicios",
            "status":: 1
        },
        {
            "id": 3,
            "name": "SubasTakear",
            "description": "Publicar Subastas",
            "status":: 1
        }
    ],
    "msg": "Lista de Tipo de Publicación"
}
 *
 * @apiError UserNotFound The id of the Category was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al Listar Categoría"
}
 */
//MASTER TYPE PUBLICATION
router.get('/listypepublication', rutasProtegidas, async (req, res) => {


    let response = await userController.LisTypePublication();

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})

/**
 * @api {post} /user/listcategory 1 listcategory
 * @apiName listcategory - Listar Categorias filtrado por tipo de publicación
 * @apiGroup Category
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                { "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" 
 *
 * @apiParam {smallint}  typepublicCategory  required. 
 *
 * @apiSuccess {boolean} success of the Category.
 * @apiSuccess {int} status 200 of the Category.
 * @apiSuccess {string} msg   of the Category.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "success": true,
    "status":: "200",
    "data": [
        {
            "id": 1,
            "namec": "Bebés",
            "iconc": "https://n9.cl/c1z78",
            "SubCategory": [
                {
                    "idsc": 1,
                    "name": "Ropa de bebes",
                    "icon": "",
                    "category": 1,
                    "status":: 1
                }
            ]
        },
        {
            "id": 2,
            "namec": "Arte",
            "iconc": "https://n9.cl/pbmd1",
            "SubCategory": []
        },
        {
            "id": 3,
            "namec": "Música",
            "iconc": "https://n9.cl/hgan",
            "SubCategory": []
        },
        {
            "id": 4,
            "namec": "indefinidas",
            "iconc": null,
            "SubCategory": [
                {
                    "idsc": 2,
                    "name": "Accesorios para Vehículos",
                    "icon": "wheel",
                    "category": 4,
                    "status":: 1
                },
                {
                    "idsc": 3,
                    "name": "Vehículos",
                    "icon": "car",
                    "category": 4,
                    "status":: 1
                },
                {
                    "idsc": 4,
                    "name": "Alimentos y Bebidas",
                    "icon": "eat",
                    "category": 4,
                    "status":: 1
                },
                {
                    "idsc": 5,
                    "name": "Mascotas",
                    "icon": "dog",
                    "category": 4,
                    "status":: 1
                }
            ]
        }
    ],
    "msg": "Lista de Categoría"
}
 *
 * @apiError UserNotFound The id of the Category was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al Listar Categoría"
}
 */
//MASTER CATEGORY
router.post('/listcategory', rutasProtegidas, [
    check('typepublicCategory', 'Se requiere el tipo de publicación').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }

    let response = await userController.ListCategory(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})

/**
 * @api {post} /user/listcities 1 listcities
 * @apiName listcities - Listar Ciudades
 * @apiGroup Cities
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                { "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" 
 *
 * 
 * 
 * @apiParam {varchar}  idfirebaseUser  required. 
 *
 * @apiSuccess {boolean} success of the Cities.
 * @apiSuccess {int} status 200 of the Cities.
 * @apiSuccess {string} msg   of the Cities.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "success": true,
    "status": "200",
    "data": [
        {
            "idfirebase": "idfirebaseUsers77wqedsaxgg",
            "city": "Bogotá DC",
            "idcity": 1,
            "ListCities": [
                {
                    "id": 1,
                    "name": "Bogotá DC",
                    "status": 1
                },
                {
                    "id": 2,
                    "name": "Medellín",
                    "status": 1
                },
                {
                    "id": 3,
                    "name": "Cali",
                    "status": 1
                },
                {
                    "id": 4,
                    "name": "Barranquilla",
                    "status": 1
                },
                {
                    "id": 5,
                    "name": "Cartagena",
                    "status": 1
                },
                {
                    "id": 6,
                    "name": "Bucaramanga",
                    "status": 1
                },
                {
                    "id": 7,
                    "name": "Manizales",
                    "status": 1
                },
                {
                    "id": 8,
                    "name": "Santa Marta",
                    "status": 1
                },
                {
                    "id": 9,
                    "name": "Pereira",
                    "status": 1
                },
                {
                    "id": 10,
                    "name": "Cúcuta",
                    "status": 1
                }
            ]
        }
    ],
    "msg": "Lista de Ciudades"
}
 *
 * @apiError UserNotFound The id of the Cities was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al Listar Categoría"
}
 */

//MASTER LIST CITIES
router.post('/listcities', rutasProtegidas,[
    check('idfirebaseUser', 'El idfirebase el obligatorio').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await userController.ListCities(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})

/**
 * @api {post} /user/liststatusproduct 1 liststatusproduct
 * @apiName liststatusproduct - Listar status ce características de Productos 
 * @apiGroup Status
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                { "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" 
 *
 * @apiParam {smallint}  idfilter  required. 
 *
 * @apiSuccess {boolean} success of the Status.
 * @apiSuccess {int} status 200 of the Status.
 * @apiSuccess {string} msg   of the Status.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "success": true,
    "status": "200",
    "data": [
        {
            "id": 9,
            "namestatus": "Nuevo ",
            "filter": 4,
            "namefilter": "Estado Producto "
        },
        {
            "id": 10,
            "namestatus": "Usado (Como nuevo)",
            "filter": 4,
            "namefilter": "Estado Producto "
        },
        {
            "id": 11,
            "namestatus": "Usado (Buen estado)",
            "filter": 4,
            "namefilter": "Estado Producto "
        },
        {
            "id": 12,
            "namestatus": "Usado (Funcional)",
            "filter": 4,
            "namefilter": "Estado Producto "
        },
        {
            "id": 13,
            "namestatus": "Usado (con detalles)",
            "filter": 4,
            "namefilter": "Estado Producto "
        }
    ],
    "msg": "Lista de Tipo de Publicación"
}
 *
 * @apiError UserNotFound The id of the Status was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al Listar status de productos según filtros"
}
 */
//MASTER STATUS DE PRODUCTOS 
router.post('/liststatusproduct', rutasProtegidas, [
    check('idfilter', 'Se requiere el idfilter de la publicación').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }

    let response = await userController.listStatusProduct(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})







/**
 * @api {put} /user/tokenpush 4 tokenpush
 * @apiName tokenpush - Registar o Actualizar TokenPushs
 * @apiGroup User
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                { "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" 
 *
 * @apiParam {smallint}  idfirebaseUser  required. 
 * @apiParam {smallint}  tokenpushUser  required. 
 *
 * @apiSuccess {boolean} success of the User.
 * @apiSuccess {int} status 200 of the User.
 * @apiSuccess {string} msg   of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
{
    "success": true,
    "status":: "200",
    "msg": "Token Push Actualizado"
}
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al Listar Categoría"
}
 */
///tokenpush
router.put('/tokenpush', rutasProtegidas, [
    check('idfirebaseUser', 'El idfirebase el obligatorio').not().isEmpty().exists(),
    check('tokenpushUser', 'El tokenpush el obligatorio').not().isEmpty().exists()
], async (req, res) => {
    const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }

    let response = await userController.Updatetokenpush(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})


/**
 * @api {post} /user/userexist 5 userexist
 * @apiName userexist - Verficación si un usuario existe en la DB del Backend
 * @apiGroup User
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                { "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" 
 *
 * @apiParam {smallint}  idfirebaseUser  required. 
 *
 * @apiSuccess {boolean} success of the User.
 * @apiSuccess {int} status 200 of the User.
 * @apiSuccess {string} msg   of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
{
    "success": true,
    "status":: "200",
    "msg": "Token Push Actualizado"
}
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al Listar Categoría"
}
 */
///tokenpush
router.post('/userexist', rutasProtegidas, [
    check('idfirebaseUser', 'El idfirebaseUser el obligatorio').not().isEmpty().exists()
], async (req, res) => {
    const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }

    let response = await userController.UserExist(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})



/**
 * @api {get} /user/listypepreferences 1 Listypepreferences
 * @apiName Listypepreferences - Listar Preferencias de negociación que puede tener una publicación
 * @apiGroup Preferences
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                { "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" 
 *
 *
 * 
 * @apiParam {smallint}  typePublicarion  optional. 
 * 
 * @apiSuccess {boolean} success of the Preferences.
 * @apiSuccess {int} status 200 of the Preferences.
 * @apiSuccess {string} msg   of the Preferences.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "success": true,
    "status":: "200",
    "data": [
        {
            "id": 1,
            "name": "Efectivo",
            "typepublication": null,
            "icon": "money",
            "status":: 1
        },
        {
            "id": 2,
            "name": "Takasteo",
            "typepublication": null,
            "icon": "takas",
            "status":: 1
        }
    ],
    "msg": "Lista de Tipo de Preferencias"
}
 *
 * @apiError UserNotFound The id of the Preferences was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al Listar los tipos de preferencias"
}
 */
//MASTER PREFERENCES
router.get('/listypepreferences', rutasProtegidas, async (req, res) => {


    let response = await userController.LisTypePreference();

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})



/**
 * @api {post} /user/listcharacteristicpublication 2 listcharacteristicpublication
 * @apiName listcharacteristicpublication - Listar Caracter´sticas de una publicación según bandera
 * @apiGroup Status
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                { "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" 
 *
 *
 * 
 * @apiParam {smallint}  FlagCharacteristic  requeride  1=Nuevo o Usado 2=Tamaño 3=Peso. 
 * 
 * @apiSuccess {boolean} success of the Status.
 * @apiSuccess {int} status 200 of the Status.
 * @apiSuccess {string} msg   of the Status.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "success": true,
    "status": "200",
    "data": [
        {
            "id": 19,
            "namestatus": "Muy liviano (0-1kg)",
            "filter": 6,
            "namefilter": "Peso Producto"
        },
        {
            "id": 20,
            "namestatus": "Liviano (1-3kg)",
            "filter": 6,
            "namefilter": "Peso Producto"
        },
        {
            "id": 21,
            "namestatus": "Normal (3 a 7kg)",
            "filter": 6,
            "namefilter": "Peso Producto"
        },
        {
            "id": 22,
            "namestatus": "Pesado (7-15kg)",
            "filter": 6,
            "namefilter": "Peso Producto"
        }
    ],
    "msg": "Lista de Características para una publicación sengún bandera"
}
 *
 * @apiError UserNotFound The id of the Status was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al Listar los tipos de preferencias"
}
 */
//MASTER CARACTERÍSTICAS DE PESOS DE UNA PUBLICACIÓN
router.post('/listcharacteristicpublication', rutasProtegidas, [
    check('FlagCharacteristic', 'El FlagCharacteristic es obligatorio').not().isEmpty().exists()
    ], async (req, res) => {


    let response = await userController.CharacteristicPublication(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})

/**
 * @api {get} /user/listmoney 1 listmoney
 * @apiName listmoney - Listar tipos de monedas
 * 
 * @apiGroup Money
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                { "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" 
 *
 *
 * 
 * @apiSuccess {boolean} success of the Money.
 * @apiSuccess {int} status 200 of the Money.
 * @apiSuccess {string} msg   of the Money.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "success": true,
    "status":: "200",
    "data": [
        {
            "id": 2,
            "name": "Dólar Americano",
            "shortname": "USD",
            "status": 1
        },
        {
            "id": 3,
            "name": "Pesos Colombianos",
            "shortname": "COP",
            "status": 1
        }
    ],
    "msg": "Lista de Tipo de Monedas"
}
 *
 * @apiError UserNotFound The id of the Money was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al Listar los tipos de Monedas"
}
 **/
//MASTERMONEY
router.get('/listmoney', rutasProtegidas, async (req, res) => {


    let response = await userController.ListMoney();

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})

/**
 * @api {get} /user/listsubcategory 1 listsubcategory
 * @apiName listsubcategory - Listar Preferencias de negociación que puede tener una publicación
 * @apiGroup SubCategory
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                 {"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" }
 *
 *
 * 
 * @apiSuccess {boolean} success of the SubCategory.
 * @apiSuccess {int} status 200 of the SubCategory.
 * @apiSuccess {string} msg   of the SubCategory.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "success": true,
    "status":: "200",
    "data": [
        {
            "idsc": 1,
            "name": "Bicicletas y Eléctricos",
            "icon": "bike",
            "category": 1,
            "status": 1,
            "namec": "Vehículos",
            "typepublication": 1
        },
        {
            "idsc": 2,
            "name": "Automóviles",
            "icon": "car",
            "category": 1,
            "status": 1,
            "namec": "Vehículos",
            "typepublication": 1
        },
        {
            "idsc": 3,
            "name": "Náutica",
            "icon": "ancle",
            "category": 1,
            "status": 1,
            "namec": "Vehículos",
            "typepublication": 1
        },
        {
            "idsc": 4,
            "name": "Accesorios para vehiculos",
            "icon": "wheel",
            "category": 1,
            "status": 1,
            "namec": "Vehículos",
            "typepublication": 1
        }
    ],
    "msg": "Lista de Subcategorías"
}
 *
 * @apiError UserNotFound The id of the SubCategory was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al Listar Subcategorías"
}
 **/
//MASTER SUBCATEGORY
router.get('/listsubcategory', rutasProtegidas, async (req, res) => {


    let response = await userController.ListSubCategory();

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})

/// TAKASTEAR 


/**
 * @api {post} /user/newproduct  1 newproduct
 * @apiName  newproduct - Registro De Producto TAKASTEAR
 * @apiGroup Product
 * 
 *      
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                 "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" 
 *
 * 
 * 
 * @apiParam {varchar} iduserProduct required.
 * @apiParam {varchar} nameProduct required.
 * @apiParam {varchar} detailsProduct  unique required.
 * @apiParam {smallint} typemoneyProduct   required.
 * @apiParam {decimal} marketvalueProduct  required .
 * @apiParam {int} subcategoryProduct  required .
 * @apiParam {array} PreferecesProduct  optional array de enteros .
 * @apiParam {array} ImagesProduct  optional arrays de varchar .
 * 
 * 
 * 
 * @apiSuccess {boolean} success of the Product.
 * @apiSuccess {int} status 200 of the Product.
 * @apiSuccess {string} msg   of the Product.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    {
    "success": true,
    "status":: "200",
    "msg": "Producto registrado con éxito"
}
 *
 * @apiError UserNotFound The id of the Product was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "data": "Ha superdo el límite de imagenes",
    "msg": "Error al registrar producto"
}
 *
 *
 **/

//Crear newproduct
router.post('/newproduct', rutasProtegidas,[
    check('iduserProduct', 'El idfirebase es obligatorio').not().isEmpty().exists(),
    check('nameProduct', 'El Nombre del producto es obligatorio').not().isEmpty().exists(),
    check('detailsProduct', 'El detalle del producto es obligatorio').not().isEmpty().exists(),
    check('typemoneyProduct', 'El tipo de moneda estar vacio ').not().isEmpty().exists(),
    check('marketvalueProduct', ' El precio es obligatoria').not().isEmpty().exists(),
    check('subcategoryProduct', ' la Contraseña es requerida').not().isEmpty().exists(),
    check('PreferecesProduct', ' Debes elegir al menos una preferencia de negocio').not().isEmpty().exists(),
    check('ImagesProduct', 'Debes cargar al menos 1 Foto').not().isEmpty().exists()
], async (req, res) => {

    /*,
    check('PreferecesProduct', ' Las Preferencias son requerido aceptar términos y condisiones').not().isEmpty().exists(),
    check('ImagesProduct', ' Es requerido aceptar términos y condisiones').not().isEmpty().exists() */
    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await userController.NewProduct(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    console.log(response);
    return res.status(response.data.status).json(response.data)

})





/**
 * @api {post} /user/listmisproductos 2 listmisproductos
 * @apiName listmisproductos - Listar Las plublicaciones de un usuario
 * @apiGroup Product
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                 {"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" }
 *
 *
 * @apiParam {varchar} idfirebaseUser required.
 * @apiParam {varchar} statusProduct optional.
 * 
 * 
 * 
 * @apiSuccess {boolean} success of the Product.
 * @apiSuccess {int} status 200 of the Product.
 * @apiSuccess {string} msg   of the Product.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   {
    "success": true,
    "status": "200",
    "data": [
        {
            "idproduct": 5,
            "datecreated": "23/10/2020",
            "iduser": "8e7PQpRV7ic4jcCuaMm5DDIIOOv2",
            "nuevo": false,
            "subcategory": 1,
            "name": "Camisas de Among Us",
            "details": "camisas muy creativas",
            "typemoney": 3,
            "marketvalue": "50000.0000",
            "typepublication": 1,
            "status": 1,
            "CantidadOfertas": 1,
            "ProductImages": [
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A51.015093.jpg?alt=media&token=0a56f3d1-55f0-46ed-ab6c-2e91b83fd6c1"
            ],
            "Preferences": [
                1,
                2
            ]
        },
        {
            "idproduct": 6,
            "datecreated": "26/10/2020",
            "iduser": "8e7PQpRV7ic4jcCuaMm5DDIIOOv2",
            "nuevo": false,
            "subcategory": 1,
            "name": "Plancha para el pelo",
            "details": "maraca baby liz",
            "typemoney": 3,
            "marketvalue": "80000.0000",
            "typepublication": 1,
            "status": 1,
            "CantidadOfertas": 0,
            "ProductImages": [
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-26%2013%3A47%3A42.386738.jpg?alt=media&token=8184ec1a-b122-4076-a539-0890214e6b9d"
            ],
            "Preferences": [
                2
            ]
        }
    ],
    "msg": "Lista de mis productos"
}
 *
 * @apiError UserNotFound The id of the Product was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al Listar Mis Productos"
}
 **/
//LISTAR MIS PUBLICACIONES
router.post('/listmisproductos', rutasProtegidas, [
check('idfirebaseUser', 'El idfirebaseUser es obligatorio').not().isEmpty().exists()
],async (req, res) => {

        const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }

    let response = await userController.ListMisProductos(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})

/**
 * @api {post} /user/listproductos 3 listproductos
 * @apiName listproductos - Listar Los productos pubicados por otros usuarios
 * @apiGroup Product
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                 {"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" }
 *
 *
 * @apiParam {varchar} idfirebaseUser required.
 * @apiParam {varchar} FlagProduct required 0=Activa, 1=Takasteada, 2=Eliminada(deshabilitada), 3=Editada.
 * 
 * 
 * 
 * @apiSuccess {boolean} success of the Product.
 * @apiSuccess {int} status 200 of the Product.
 * @apiSuccess {string} msg   of the Product.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *             {{
    "success": true,
    "status": "200",
    "data": [
        {
            "idproduct": 1,
            "datecreated": "05/10/2020 13:46:27",
            "iduser": "idfirebaseUsers77wqedsaxgg",
            "nuevo": false,
            "subcategory": 1,
            "name": "Mameluco para bebé",
            "details": "Producto disponible de 0 a 24 meses",
            "typemoney": 2,
            "marketvalue": 30000,
            "typepublication": 1,
            "status": 1,
            "ProductImages": [
                "https://n9.cl/vt0n"
            ],
            "Preferences": []
        },
        {
            "idproduct": 7,
            "datecreated": "05/10/2020 13:25:07",
            "iduser": "idfirebaseUsers77wqedsaxgg",
            "name": "Gorros para bebés",
            "nuevo": false,
            "subcategory": 1,
            "details": "Gorros termicos y confortables",
            "typemoney": 1,
            "marketvalue": 10000,
            "typepublication": 1,
            "status": 1,
            "ProductImages": [
                "https://n9.cl/vt0n"
            ],
            "Preferences": []
        },
        {
            "idproduct": 11,
            "datecreated": "06/09/2021 17:27:47",
            "iduser": "idfirebaseUsers77wqedsaxgg",
            "nuevo": false,
            "subcategory": 1,
            "name": "Gorros para bebés",
            "details": "Gorros termicos y confortables",
            "typemoney": 1,
            "marketvalue": 10000,
            "typepublication": 1,
            "status": 1,
            "ProductImages": [
                "https://n9.cl/vt0n"
            ],
            "Preferences": []
        }
    ],
    "msg": "Lista de productos"
}
 *
 * @apiError UserNotFound The id of the Product was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al Listar Productos"
}
 **/
//LISTAR MIS PUBLICACIONES
router.post('/listproductos', rutasProtegidas, [
    check('idfirebaseUser', 'El idfirebaseUser es obligatorio').not().isEmpty().exists(),
    check('FlagProduct', 'El FlagProduct es obligatorio').not().isEmpty().exists()
    ],async (req, res) => {
        
        const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }
    
        let response = await userController.ListProductos(req.body);
    
        if (response.status == 'ko') {
            return res.status(500).json({ error: 'Error' })
        }
        //console.log(response);
        return res.status(response.data.status).json(response.data)
    
    })


    ///////
    
/**
 * @api {post} /user/findproductos 7 findproductos
 * @apiName findproductos - Buscar articulos por nombre
 * @apiGroup Product
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                 {"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" }
 *
 *
 * @apiParam {varchar} IdUserProduct required.
 * @apiParam {varchar} nameProduct required.
 * 
 * 
 * 
 * @apiSuccess {boolean} success of the Product.
 * @apiSuccess {int} status 200 of the Product.
 * @apiSuccess {string} msg   of the Product.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *             {{
    "success": true,
    "status": "200",
    "data": [
        {
            "idproduct": 1,
            "datecreated": "05/10/2020 13:46:27",
            "iduser": "idfirebaseUsers77wqedsaxgg",
            "nuevo": false,
            "subcategory": 1,
            "name": "Mameluco para bebé",
            "details": "Producto disponible de 0 a 24 meses",
            "typemoney": 2,
            "marketvalue": 30000,
            "typepublication": 1,
            "status": 1,
            "ProductImages": [
                "https://n9.cl/vt0n"
            ],
            "Preferences": []
        },
        {
            "idproduct": 7,
            "datecreated": "05/10/2020 13:25:07",
            "iduser": "idfirebaseUsers77wqedsaxgg",
            "name": "Gorros para bebés",
            "nuevo": false,
            "subcategory": 1,
            "details": "Gorros termicos y confortables",
            "typemoney": 1,
            "marketvalue": 10000,
            "typepublication": 1,
            "status": 1,
            "ProductImages": [
                "https://n9.cl/vt0n"
            ],
            "Preferences": []
        },
        {
            "idproduct": 11,
            "datecreated": "06/09/2021 17:27:47",
            "iduser": "idfirebaseUsers77wqedsaxgg",
            "nuevo": false,
            "subcategory": 1,
            "name": "Gorros para bebés",
            "details": "Gorros termicos y confortables",
            "typemoney": 1,
            "marketvalue": 10000,
            "typepublication": 1,
            "status": 1,
            "ProductImages": [
                "https://n9.cl/vt0n"
            ],
            "Preferences": []
        }
    ],
    "msg": "Busqueda de productos éxitosa"
}
 *
 * @apiError UserNotFound The id of the Product was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al Buscar Productos"
}
 **/
//BUSCAR PUBLICACUONES SEGÚN NOMBRE DEL ARTÍCULO
router.post('/findproductos', rutasProtegidas, [
    check('IdUserProduct', 'El IdUserProduct es obligatorio').not().isEmpty().exists(),
    check('nameProduct', 'El nameProduct es obligatorio').not().isEmpty().exists()
    ],async (req, res) => {
        
        const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }
    
        let response = await userController.findProductos(req.body);
    
        if (response.status == 'ko') {
            return res.status(500).json({ error: 'Error' })
        }
        //console.log(response);
        return res.status(response.data.status).json(response.data)
    
    })
    //////
    

/**
 * @api {post} /user/listproductsubcategory 4 listproductsubcategory
 * @apiName listproductsubcategory - Listar Los productos pubicados por otros usuarios
 * @apiGroup Product
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                 {"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" }
 *
 *
 * @apiParam {varchar} SubCategoriaProduct required.
 * @apiParam {varchar} idFirebaseUser required.
 * @apiParam {varchar} statusProduct required.
 * 
 * 
 * 
 * @apiSuccess {boolean} success of the Product.
 * @apiSuccess {int} status 200 of the Product.
 * @apiSuccess {string} msg   of the Product.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *             {
    "success": true,
    "status": "200",
    "data": [
        {
            "idproduct": 1,
            "datecreated": "05/10/2020 13:46:27",
            "iduser": "idfirebaseUsers77wqedsaxgg",
            "nuevo": false,
            "subcategory": 1,
            "name": "Mameluco para bebé",
            "details": "Producto disponible de 0 a 24 meses",
            "typemoney": 2,
            "marketvalue": 30000,
            "typepublication": 1,
            "status": 1,
            "ProductImages": [
                "https://n9.cl/vt0n"
            ],
            "Preferences": []
        },
        {
            "idproduct": 7,
            "datecreated": "05/10/2020 13:25:07",
            "iduser": "idfirebaseUsers77wqedsaxgg",
            "nuevo": false,
            "subcategory": 1,
            "name": "Gorros para bebés",
            "details": "Gorros termicos y confortables",
            "typemoney": 1,
            "marketvalue": 10000,
            "typepublication": 1,
            "status": 1,
            "ProductImages": [
                "https://n9.cl/vt0n"
            ],
            "Preferences": []
        },
        {
            "idproduct": 11,
            "datecreated": "06/09/2021 17:27:47",
            "iduser": "idfirebaseUsers77wqedsaxgg",
            "nuevo": false,
            "subcategory": 1,
            "name": "Gorros para bebés",
            "details": "Gorros termicos y confortables",
            "typemoney": 1,
            "marketvalue": 10000,
            "typepublication": 1,
            "status": 1,
            "ProductImages": [
                "https://n9.cl/vt0n"
            ],
            "Preferences": []
        },
        {
            "idproduct": 17,
            "datecreated": "06/09/2021 18:06:37",
            "iduser": "idfirebaseU4534dsaxgg",
            "nuevo": false,
            "subcategory": 1,
            "name": "Gorros para bebés",
            "details": "Gorros termicos 1",
            "typemoney": 1,
            "marketvalue": 10000,
            "typepublication": 1,
            "status": 1,
            "ProductImages": [
                "https://n9.cl/vt0n"
            ],
            "Preferences": [
                1,
                2
            ]
        }
    ],
    "msg": "Lista de productos filtrados por subcategorías"
}
 *
 * @apiError UserNotFound The id of the Product was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al Listar Productos filtrados por subcategoría"
}
 **/
//LISTAR PRODRUCTOS FILTRADOS POR SUBCATEGORÍA
router.post('/listproductsubcategory', rutasProtegidas, [
    check('SubCategoriaProduct', 'El SubCategoriaProduct es obligatorio').not().isEmpty().exists(),
    check('idFirebaseUser', 'El idFirebaseUser es obligatorio').not().isEmpty().exists(),
    check('statusProduct', 'El statusProduct es obligatorio').not().isEmpty().exists()
    ],async (req, res) => {

        const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }
    
        let response = await userController.ListProductSubCategory(req.body);
    
        if (response.status == 'ko') {
            return res.status(500).json({ error: 'Error' })
        }
        //console.log(response);
        return res.status(response.data.status).json(response.data)
    
    })    

/**
 * @api {post} /user/detailsproduct 5 detailsproduct
 * @apiName detailsproduct - Detalle del producto
 * @apiGroup Product
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                 {"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" }
 *
 *
 * @apiParam {int} IdUserProduct required.
 * @apiParam {int} IdProduct required.
 * 
 * 
 * 
 * @apiSuccess {boolean} success of the Product.
 * @apiSuccess {int} status 200 of the Product.
 * @apiSuccess {string} msg   of the Product.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   {
    "success": true,
    "status": "200",
    "data": {
        "idproduct": 61,
        "datecreated": "14/11/2020",
        "iduser": "idfirebaseU4534dsaxgg",
        "nuevo": false,
        "subcategory": 4,
        "name": "pueba laptop 2",
        "details": "Hp Procesador intel core i7",
        "typemoney": 2,
        "marketvalue": "1200000.0000",
        "typepublication": 1,
        "conditions": 1,
        "size": null,
        "weight": null,
        "status": 0,
        "CantidadOfertas": 0,
        "ProductImages": [
            "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
            "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
            "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
            "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
            "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc"
        ],
        "Preferences": [
            1
        ]
    },
    "msg": "Listar detalles de un producto"
}
 *
 * @apiError UserNotFound The id of the Product was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al intentar obtener Cantidad de notificaciones según bandera"
}
 **/

//LISTAR DE DETALLES DEL PRODUCTO
router.post('/detailsproduct', rutasProtegidas, [
    check('IdUserProduct', 'El IdUserProduct es obligatorio').not().isEmpty().exists(),
    check('IdProduct', 'El IdProduct es obligatorio').not().isEmpty().exists()
    ],async (req, res) => {
    
        const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }
        let response = await userController.DetailsProduct(req.body);
    
        if (response.status == 'ko') {
            return res.status(500).json({ error: 'Error' })
        }
        //console.log(response);
        return res.status(response.data.status).json(response.data)
    
    })    


    /**
 * @api {post} /user/newproductkw  6 newproductkw
 * @apiName  newproductkw - Registro De Producto con keywords TAKASTEAR
 * @apiGroup Product
 * 
 *      
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                 "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" 
 *
 * 
 * 
 * @apiParam {varchar} iduserProduct required.
 * @apiParam {varchar} nameProduct required.
 * @apiParam {boolean} NewProduct required.
 * @apiParam {varchar} detailsProduct  unique required.
 * @apiParam {smallint} typemoneyProduct   required.
 * @apiParam {decimal} marketvalueProduct  required .
 * @apiParam {int} subcategoryProduct  required .
 * @apiParam {array} PreferecesProduct  required array de enteros .
 * @apiParam {array} ImagesProduct  required arrays de varchar .
 * @apiParam {array} KeyWordsProduct  optional array de varchar .
 * @apiParam {int} SizePoduct  optional.
 * @apiParam {int} WeightProduct  optional.
 * 
 * 
 * 
 * @apiSuccess {boolean} success of the Product.
 * @apiSuccess {int} status 200 of the Product.
 * @apiSuccess {string} msg   of the Product.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    {
    "success": true,
    "status":: "200",
    "msg": "Producto registrado con éxito"
}
 *
 * @apiError UserNotFound The id of the Product was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "data": "Ha superdo el límite de imagenes",
    "msg": "Error al registrar producto"
}
 *
 *
 **/

//Crear newproduct
router.post('/newproductkw', rutasProtegidas,[
    check('iduserProduct', 'El idfirebase es obligatorio').not().isEmpty().exists(),
    check('NewProduct', 'El NewProduct es obligatorio').not().isEmpty().exists(),
    check('nameProduct', 'El Nombre del producto es obligatorio').not().isEmpty().exists(),
    check('detailsProduct', 'El detalle del producto es obligatorio').not().isEmpty().exists(),
    check('typemoneyProduct', 'El tipo de moneda estar vacio ').not().isEmpty().exists(),
    check('marketvalueProduct', ' El precio es obligatoria').not().isEmpty().exists(),
    check('subcategoryProduct', ' la Contraseña es requerida').not().isEmpty().exists(),
    check('PreferecesProduct', ' Debes elegir al menos una preferencia de negocio').not().isEmpty().exists(),
    check('ImagesProduct', 'Debes cargar al menos 1 Foto').not().isEmpty().exists()
], async (req, res) => {

    /*,
    check('PreferecesProduct', ' Las Preferencias son requerido aceptar términos y condisiones').not().isEmpty().exists(),
    check('ImagesProduct', ' Es requerido aceptar términos y condisiones').not().isEmpty().exists() */
    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await userController.NewProductKW(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    console.log(response);
    return res.status(response.data.status).json(response.data)

})
/////





 /**
 * @api {post} /user/newproductckw  8 newproductckw
 * @apiName  newproductckw - Registro De Producto con Características
 * @apiGroup Product
 * 
 *      
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                 "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" 
 *
 * 
 * 
 * @apiParam {varchar} iduserProduct required.
 * @apiParam {varchar} nameProduct required.
 * @apiParam {boolean} NewProduct optional.
 * @apiParam {varchar} detailsProduct  unique required.
 * @apiParam {smallint} typemoneyProduct   required.
 * @apiParam {decimal} marketvalueProduct  required .
 * @apiParam {int} subcategoryProduct  required .
 * @apiParam {array} PreferecesProduct  required array de enteros .
 * @apiParam {array} ImagesProduct  required arrays de varchar .
 * @apiParam {array} KeyWordsProduct  optional array de varchar .
 * @apiParam {int} UsePoduct  optional.
 * @apiParam {int} SizePoduct  optional.
 * @apiParam {int} WeightProduct  optional.
 * 
 * 
 * 
 * @apiSuccess {boolean} success of the Product.
 * @apiSuccess {int} status 200 of the Product.
 * @apiSuccess {string} msg   of the Product.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    {
    "success": true,
    "status":: "200",
    "msg": "Producto registrado con éxito"
}
 *
 * @apiError UserNotFound The id of the Product was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "data": "Ha superdo el límite de imagenes",
    "msg": "Error al registrar producto"
}
 *
 *
 **/

//Crear newproduct
router.post('/newproductckw', rutasProtegidas,[
    check('iduserProduct', 'El iduserProduct es obligatorio').not().isEmpty().exists(),check('nameProduct', 'El Nombre del producto es obligatorio').not().isEmpty().exists(),
    check('detailsProduct', 'El detalle del producto es obligatorio').not().isEmpty().exists(),
    check('typemoneyProduct', 'El tipo de moneda estar vacio ').not().isEmpty().exists(),
    check('marketvalueProduct', ' El precio es obligatoria').not().isEmpty().exists(),
    check('subcategoryProduct', ' la Contraseña es requerida').not().isEmpty().exists(),
    check('PreferecesProduct', ' Debes elegir al menos una preferencia de negocio').not().isEmpty().exists(),
    check('ImagesProduct', 'Debes cargar al menos 1 imagen del producto').not().isEmpty().exists()
], async (req, res) => {

    /*,
    check('PreferecesProduct', ' Las Preferencias son requerido aceptar términos y condisiones').not().isEmpty().exists(),
    check('ImagesProduct', ' Es requerido aceptar términos y condisiones').not().isEmpty().exists() */
    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await userController.NewProductCKW(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    console.log(response);
    return res.status(response.data.status).json(response.data)

})
/////

/**
 * @api {post} /user/editproductckw  9 editproductckw
 * @apiName  editproductckw - Editar Producto con Características
 * @apiGroup Product
 * 
 *      
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                 "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" 
 *
 * 
 * 
 * @apiParam {varchar} iduserProduct required.
 * @apiParam {varchar} idProduct required.
 * @apiParam {varchar} nameProduct required.
 * @apiParam {varchar} detailsProduct  unique required.
 * @apiParam {smallint} typemoneyProduct   required.
 * @apiParam {decimal} marketvalueProduct  required .
 * @apiParam {int} subcategoryProduct  required .
 * @apiParam {array} PreferecesProduct  required array de enteros .
 * @apiParam {array} ImagesProduct  required arrays de varchar .
 * @apiParam {array} KeyWordsProduct  optional array de varchar .
 * @apiParam {int} UsePoduct  optional.
 * @apiParam {int} SizePoduct  optional.
 * @apiParam {int} WeightProduct  optional.
 * 
 * 
 * 
 * @apiSuccess {boolean} success of the Product.
 * @apiSuccess {int} status 200 of the Product.
 * @apiSuccess {string} msg   of the Product.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    {
    "success": true,
    "status":: "200",
    "msg": "Producto registrado con éxito"
}
 *
 * @apiError UserNotFound The id of the Product was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "data": "Ha superdo el límite de imagenes",
    "msg": "Error al registrar producto"
}
 *
 *
 **/

//Crear newproduct
router.post('/editproductckw', rutasProtegidas,[
    check('iduserProduct', 'El iduserProduct es obligatorio').not().isEmpty().exists(),
    check('idProduct', 'El idProduct     si un producto es nuo o usado es obligatorio').not().isEmpty().exists(),
    check('nameProduct', 'El Nombre del producto es obligatorio').not().isEmpty().exists(),
    check('detailsProduct', 'El detalle del producto es obligatorio').not().isEmpty().exists(),
    check('typemoneyProduct', 'El tipo de moneda estar vacio ').not().isEmpty().exists(),
    check('marketvalueProduct', ' El precio es obligatoria').not().isEmpty().exists(),
    check('subcategoryProduct', ' la Contraseña es requerida').not().isEmpty().exists(),
    check('PreferecesProduct', ' Debes elegir al menos una preferencia de negocio').not().isEmpty().exists(),
    check('ImagesProduct', 'Debes cargar al menos 1 imagen del producto').not().isEmpty().exists()
], async (req, res) => {

    /*,
    check('PreferecesProduct', ' Las Preferencias son requerido aceptar términos y condisiones').not().isEmpty().exists(),
    check('ImagesProduct', ' Es requerido aceptar términos y condisiones').not().isEmpty().exists() */
    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await userController.EditProductCKW(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})
/////


/**
 * @api {post} /user/newquestion 1 newquestion
 * @apiName newquestion - Pregunta de un producto
 * @apiGroup Questions
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                 {"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" }
 *
 *
 * @apiParam {varchar} idFirebaseUser required.
 * @apiParam {int} idPublication required.
 * @apiParam {varchar} descriptionQuestion required.
 * @apiParam {int} typeQuestion required.
 * 
 * 
 * 
 * @apiSuccess {boolean} success of the Product.
 * @apiSuccess {int} status 200 of the Product.
 * @apiSuccess {string} msg   of the Product.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *             {
    "success": true,
    "status": "200",
    "msg": "Pregunta creada con éxito"
}
 *
 * @apiError UserNotFound The id of the Product was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al intentar crear pregunta"
}
 **/

//CREAR UNA PREGUNTA - PUBLICACIÓN
router.post('/newquestion', rutasProtegidas, [
    check('idFirebaseUser', 'El idFirebaseUser es obligatorio').not().isEmpty().exists(),
    check('idPublication', 'El idPublication es obligatorio').not().isEmpty().exists(),
    check('descriptionQuestion', 'El IdProduct es obligatorio').not().isEmpty().exists(),
    check('typeQuestion', 'El typeQuestion es obligatorio').not().isEmpty().exists()
    ],async (req, res) => {
    
        const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }
        let response = await userController.NewQuestion(req.body);
    
        if (response.status == 'ko') {
            return res.status(500).json({ error: 'Error' })
        }
        //console.log(response);
        return res.status(response.data.status).json(response.data)
    
    }) 

/**
 * @api {post} /user/answerquestion 2 answerquestion
 * @apiName answerquestion - Respuesta del una pregunta de unproducto
 * @apiGroup Questions
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                 {"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" }
 *
 *
 * @apiParam {int} idQuestion required.
 * @apiParam {int} idPublication required.
 * @apiParam {varchar} descriptionAnswer required.
 * @apiParam {int} typeQuestion required.
 * 
 * 
 * 
 * @apiSuccess {boolean} success of the Product.
 * @apiSuccess {int} status 200 of the Product.
 * @apiSuccess {string} msg   of the Product.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *             {
    "success": true,
    "status": "200",
    "msg": "Respuesta creada exitosamente"
}
 *
 * @apiError UserNotFound The id of the Product was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al intentar crear una Respuesta"
}
 **/

//CREAR UNA RESPUESTA A UNA PREGUNTA - PUBLICACIÓN
router.post('/answerquestion', rutasProtegidas, [
    check('idfirebaseUser', 'El idfirebaseUser es obligatorio').not().isEmpty().exists(),
    check('idQuestion', 'El idQuestion es obligatorio').not().isEmpty().exists(),
    check('idPublication', 'El idPublication es obligatorio').not().isEmpty().exists(),
    check('descriptionAnswer', 'El descriptionAnswer es obligatorio').not().isEmpty().exists(),
    check('typeQuestion', 'El IdProduct es obligatorio').not().isEmpty().exists()
    ],async (req, res) => {
    
        const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }
        let response = await userController.AnswerQuestion(req.body);
    
        if (response.status == 'ko') {
            return res.status(500).json({ error: 'Error' })
        }
        //console.log(response);
        return res.status(response.data.status).json(response.data)
    
    })


    /**
 * @api {post} /user/listquestionanswer 3 listquestionanswer
 * @apiName listquestionanswer - Preguntas y Respuestaa de un producto
 * @apiGroup Questions
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                 {"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" }
 *
 *
 * @apiParam {int} idtypePublicationQA required.
 * @apiParam {int} idPublicationQA required.
 * 
 * 
 * 
 * @apiSuccess {boolean} success of the Questions.
 * @apiSuccess {int} status 200 of the Questions.
 * @apiSuccess {string} msg   of the Questions.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *           {
    "success": true,
    "status": "200",
    "data": [
        {
            "idquiestions": 1,
            "iduser": "idfirebaseUser2374687234t8t2348t8",
            "Pregunta": "Son modelos Unisex?",
            "isquestions": 1,
            "publication": 1,
            "idproduct": 7,
            "idservice": 1,
            "idauction": 1,
            "datecreated": "12/10/2020 16:10:00",
            "status": 1,
            "Answers": {
                "idPregunta": 1,
                "Respuesta": "Si Nuestra línea de bebé en su mayoría son Unisexs",
                "publication": 1,
                "idproduct": 7,
                "datecreated": "30/09/2020 13:09:00",
                "status": 1
            }
        },
        {
            "idquiestions": 2,
            "iduser": "idfirebaseUser2374687234t8t2348t8",
            "Pregunta": "Son modelos Unisex?",
            "isquestions": 1,
            "publication": 1,
            "idproduct": 7,
            "idservice": 1,
            "idauction": 1,
            "datecreated": "30/09/2020 13:09:00",
            "status": 1,
            "Answers": {
                "idPregunta": 2,
                "Respuesta": "Si Nuestra línea de bebé en su mayoría son Unisexs",
                "publication": 1,
                "idproduct": 7,
                "datecreated": "30/09/2020 13:09:00",
                "status": 1
            }
        }
    ],
    "msg": "Lista de preguntas y respuestas de un producto"
}
 *
 * @apiError UserNotFound The id of the Questions was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status": "500",
    "msg": "Error al intentar Listar de pregunta y respuestas de un producto"
}
 **/

//LISTAR PREGUNTAS Y RESPUESTAS DE UN PRODUCTO- PUBLICACIÓN
router.post('/listquestionanswer', rutasProtegidas, [
    check('idtypePublicationQA', 'El idtypePublicationQA es obligatorio').not().isEmpty().exists(),
    check('idPublicationQA', 'El idPublicationQA es obligatorio').not().isEmpty().exists()
    ],async (req, res) => {
    
        const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }
        let response = await userController.ListQuestionAnswer(req.body);
    
        if (response.status == 'ko') {
            return res.status(500).json({ error: 'Error' })
        }
        //console.log(response);
        return res.status(response.data.status).json(response.data)
    
    })

/**
 * @api {post} /user/newoffer 1 newoffer
 * @apiName newoffer - Crear Oferta
 * @apiGroup Offers
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                 {"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" }
 *
 *
 * @apiParam {varchar} idFirebaseUser required.
 * @apiParam {int} typePublication required.
 * @apiParam {int} idPublication required.
 * @apiParam {varchar} descriptionOffer optional.
 * @apiParam {array}  idsPublications array Int required.
 * 
 * 
 * 
 * @apiSuccess {boolean} success of the Offers.
 * @apiSuccess {int} status 200 of the Offers.
 * @apiSuccess {string} msg   of the Offers.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *             {
    "success": true,
    "status": "200",
    "msg": "Oferta creada exitosamente"
}
 *
 * @apiError UserNotFound The id of the Offers was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al intentar crear Oferta"
}
 **/

//CREAR UNA OFERTA - PUBLICACIÓN
router.post('/newoffer', rutasProtegidas, [
    check('idFirebaseUser', 'El idFirebaseUser es obligatorio').not().isEmpty().exists(),
    check('typePublication', 'El typePublication es obligatorio').not().isEmpty().exists(),
    check('idPublication', 'El idPublication es obligatorio').not().isEmpty().exists(),
    check('idsPublications', 'El idsPublications es obligatorio').not().isEmpty().exists()
    ],async (req, res) => {
    
        const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }
        let response = await userController.NewOffer(req.body);
    
        if (response.status == 'ko') {
            return res.status(500).json({ error: 'Error' })
        }
        //console.log(response);   


        return res.status(response.data.status).json(response.data)
    
    }) 


    /**
 * @api {post} /user/listoffer 2 listoffer
 * @apiName listoffer - Listar Oferta
 * @apiGroup Offers
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                 {"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" }
 *
 *
 * 
 * @apiParam {int} typePublication required.
 * @apiParam {int} Int idPublication required.
 * @apiParam {int} Int flagstatus optional CANCELADA = 0, RECHZADA = 1, ACEPTADA = 2
 * 
 * 
 * 
 * @apiSuccess {boolean} success of the Offers.
 * @apiSuccess {int} status 200 of the Offers.
 * @apiSuccess {string} msg   of the Offers.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "success": true,
    "status": "200",
    "data": [
        {
            "idproduct": 5,
            "datecreated": "23/10/2020",
            "iduser": "8e7PQpRV7ic4jcCuaMm5DDIIOOv2",
            "nuevo": false,
            "subcategory": 1,
            "name": "Camisas de Among Us",
            "details": "camisas muy creativas",
            "typemoney": 3,
            "marketvalue": "50000.0000",
            "typepublication": 1,
            "conditions": null,
            "size": null,
            "weight": null,
            "status": 0,
            "editable": false,
            "CantidadOfertas": 30,
            "ProductImages": [
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A51.015093.jpg?alt=media&token=0a56f3d1-55f0-46ed-ab6c-2e91b83fd6c1"
            ],
            "Preferences": [
                1,
                2
            ]
        },
        {
            "idproduct": 6,
            "datecreated": "26/10/2020",
            "iduser": "8e7PQpRV7ic4jcCuaMm5DDIIOOv2",
            "nuevo": false,
            "subcategory": 1,
            "name": "Plancha para el pelo",
            "details": "maraca baby liz",
            "typemoney": 3,
            "marketvalue": "80000.0000",
            "typepublication": 1,
            "conditions": null,
            "size": null,
            "weight": null,
            "status": 0,
            "editable": false,
            "CantidadOfertas": 0,
            "ProductImages": [
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-26%2013%3A47%3A42.386738.jpg?alt=media&token=8184ec1a-b122-4076-a539-0890214e6b9d"
            ],
            "Preferences": [
                2
            ]
        }
    ],
    "msg": "Lista de mis productos"
}
 *
 * @apiError UserNotFound The id of the Offers was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al intentar listar Oferta"
}
 **/

//CREAR UNA OFERTA - PUBLICACIÓN
router.post('/listoffer', rutasProtegidas, [
    check('typePublication', 'El idPublication es obligatorio').not().isEmpty().exists(),
    check('idPublication', 'El idPublication es obligatorio').not().isEmpty().exists()
    ],async (req, res) => {
    
        const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }
        let response = await userController.ListOffer(req.body);
    
        if (response.status == 'ko') {
            return res.status(500).json({ error: 'Error' })
        }
        //console.log(response);
        return res.status(response.data.status).json(response.data)
    
    }) 


      /**
 * @api {post} /user/detailsoffer 3 detailsoffer
 * @apiName detailsoffer - Listar Oferta
 * @apiGroup Offers
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                 {"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" }
 *
 *
 * @apiParam {varchar}  idFirebaseUser required.
 * @apiParam {int} typePublication required.
 * @apiParam {int} Int idOferta required.
 * 
 * 
 * 
 * @apiSuccess {boolean} success of the Offers.
 * @apiSuccess {int} status 200 of the Offers.
 * @apiSuccess {string} msg   of the Offers.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    {
    "success": true,
    "status": "200",
    "data": {
        "idoffer": 7,
        "iduseroffer": "8e7PQpRV7ic4jcCuaMm5DDIIOOv2",
        "statusoffer": 7,
        "idSala": null,
        "idproduct": 1,
        "namepublication": "Estufa de 4 hornillas",
        "img": [
            "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2FEVln0Vj6DNOtTXQVS2fN9P68Gl13-2020-10-23%2014%3A31%3A56.674044.jpg?alt=media&token=0665a846-5f05-4ebc-8a34-bad46b7d6722"
        ],
        "observation": "-",
        "valorpublication": "200000.0000",
        "sumitemsoffer": "130000.0000",
        "differenceoffer": "70000.0000",
        "infavor": true,
        "itemsoffer": [
            {
                "idpublication": 5,
                "imgpublicacion": "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "nameproduct": "Camisas de Among Us",
                "status": 1,
                "img": "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "marketvalue": "50000.0000"
            },
            {
                "idpublication": 6,
                "imgpublicacion": "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-26%2013%3A47%3A42.386738.jpg?alt=media&token=8184ec1a-b122-4076-a539-0890214e6b9d",
                "nameproduct": "Plancha para el pelo",
                "status": 1,
                "img": "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-26%2013%3A47%3A42.386738.jpg?alt=media&token=8184ec1a-b122-4076-a539-0890214e6b9d",
                "marketvalue": "80000.0000"
            }
        ]
    },
    "msg": "Detalles de la oferta listado exitosamente"
}
 *
 * @apiError UserNotFound The id of the Offers was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al intentar listar detalles de la oferta"
}
 **/

//DETALLE DE LA OFERTA - PUBLICACIÓN
router.post('/detailsoffer', rutasProtegidas, [
    check('idFirebaseUser', 'El idFirebaseUser es obligatorio').not().isEmpty().exists(),
    check('typePublication', 'El typePublication es obligatorio').not().isEmpty().exists(),
    check('idOferta', 'El idOferta es obligatorio').not().isEmpty().exists()
    ],async (req, res) => {
    
        const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }
        let response = await userController.DetailsOffer(req.body);
    
        if (response.status == 'ko') {
            return res.status(500).json({ error: 'Error' })
        }
        //console.log(response);
        return res.status(response.data.status).json(response.data)
    
    }) 




          /**
 * @api {post} /user/caldifference 4 caldifference
 * @apiName caldifference - Listar Oferta
 * @apiGroup Offers
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                 {"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" }
 *
 *
 * 
 * @apiParam {int} Int idPublication required.
 * @apiParam {decimal} marketvalueP required.
 * @apiParam {json} Publications required.
 * 
 * 
 * 
 * @apiSuccess {boolean} success of the Offers.
 * @apiSuccess {int} status 200 of the Offers.
 * @apiSuccess {string} msg   of the Offers.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
    "success": true,
    "status": "200",
    "data": {
        "idPublication": 4,
        "marketvalueP": "50000.0000",
        "SumItemsOffer": "20000.0000",
        "differenceoffer": "30000.0000",
        "infavor": false
    },
    "msg": "Diferencia calculada exitosamente"
}
 *
 * @apiError UserNotFound The id of the Offers was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al Calcular diferencia"
}
 **/

//CARLCULAR DIFERENCIAS - OFFERS
router.post('/caldifference', rutasProtegidas, [
    check('idPublication', 'El idPublication es obligatorio').not().isEmpty().exists(),
    check('marketvalueP', 'El marketvalueP es obligatorio').not().isEmpty().exists(),
    check('Publications', 'El Publications es obligatorio').not().isEmpty().exists()
    ],async (req, res) => {
    
        const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }
        let response = await userController.CalDifference(req.body);
    
        if (response.status == 'ko') {
            return res.status(500).json({ error: 'Error' })
        }
        //console.log(response);
        return res.status(response.data.status).json(response.data)
    
    }) 

  /**
 * @api {post} /user/listmyoffer 5 listmyoffer
 * @apiName listmyoffer - Listar MIs Oferta
 * @apiGroup Offers
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                 {"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" }
 *
 *
 * @apiParam {int} Int idFirebaseUser required.
 * @apiParam {int} typePublication required.
 * @apiParam {int} Int flagstatus optional CANCELADA = 0, RECHZADA = 1, ACEPTADA = 2.
 * 
 * 
 * @apiSuccess {boolean} success of the Offers.
 * @apiSuccess {int} status 200 of the Offers.
 * @apiSuccess {string} msg   of the Offers.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
    "success": true,
    "status": "200",
    "data": [
        {
            "idproduct": 5,
            "datecreated": "23/10/2020",
            "iduser": "8e7PQpRV7ic4jcCuaMm5DDIIOOv2",
            "nuevo": false,
            "subcategory": 1,
            "name": "Camisas de Among Us",
            "details": "camisas muy creativas",
            "typemoney": 3,
            "marketvalue": "50000.0000",
            "typepublication": 1,
            "conditions": null,
            "size": null,
            "weight": null,
            "status": 0,
            "editable": false,
            "CantidadOfertas": 30,
            "ProductImages": [
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A51.015093.jpg?alt=media&token=0a56f3d1-55f0-46ed-ab6c-2e91b83fd6c1"
            ],
            "Preferences": [
                1,
                2
            ]
        },
        {
            "idproduct": 6,
            "datecreated": "26/10/2020",
            "iduser": "8e7PQpRV7ic4jcCuaMm5DDIIOOv2",
            "nuevo": false,
            "subcategory": 1,
            "name": "Plancha para el pelo",
            "details": "maraca baby liz",
            "typemoney": 3,
            "marketvalue": "80000.0000",
            "typepublication": 1,
            "conditions": null,
            "size": null,
            "weight": null,
            "status": 0,
            "editable": false,
            "CantidadOfertas": 0,
            "ProductImages": [
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-26%2013%3A47%3A42.386738.jpg?alt=media&token=8184ec1a-b122-4076-a539-0890214e6b9d"
            ],
            "Preferences": [
                2
            ]
        }
    ],
    "msg": "Lista de mis productos"
}
 *
 * @apiError UserNotFound The id of the Offers was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al intentar listar mis ofertas"
}
 **/

//CREAR UNA OFERTA - PUBLICACIÓN
router.post('/listmyoffer', rutasProtegidas, [
    check('idFirebaseUser', 'El idFirebaseUser es obligatorio').not().isEmpty().exists(),
    check('typePublication', 'El idPublication es obligatorio').not().isEmpty().exists()
    ],async (req, res) => {
    
        const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }
        let response = await userController.ListMyOffer(req.body);
    
        if (response.status == 'ko') {
            return res.status(500).json({ error: 'Error' })
        }
        //console.log(response);
        return res.status(response.data.status).json(response.data)
    
    }) 



    /**
 * @api {put} /user/changestatusoffer 6 changestatusoffer
 * @apiName changestatusoffer - Cambio de estado de una oferta
 * @apiGroup Offers
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                 {"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" }
 *
 *
 * @apiParam {int} idOffer required.
 * @apiParam {int} idUser required.
 * @apiParam {int} FlagStatusOffer required. CANCELAR = 0, RECHAZAR = 1, ACEPTAR = 2
 * 
 * 
 * 
 * @apiSuccess {boolean} success of the Offers.
 * @apiSuccess {int} status 200 of the Offers.
 * @apiSuccess {string} msg   of the Offers.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    {
    "success": true,
    "status": "200",
    "match": true,
    "sala": "6340c299f4d9eb3d797b6a54f779cf616d0b0cdb",
    "msg": "Cambio de estatus de una oferta ejecutdos exitosamente"
}
 *
 * @apiError UserNotFound The id of the Offers was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al intentar cambiar el estatus de una Oferta"
}
 **/

//CAMBIO DE ESTATUS DE UNA PFERTA - OFFERS
router.put('/changestatusoffer', rutasProtegidas, [
    check('idOffer', 'El idsPublications es obligatorio').not().isEmpty().exists(),
    check('idUser', 'El idUser es obligatorio').not().isEmpty().exists(),
    check('FlagStatusOffer', 'El FlagStatusOffer es obligatorio').not().isEmpty().exists()
    ],async (req, res) => {
    
        const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }        
        let response = await userController.ChangeStatusOffer(req.body);
    
        if (response.status == 'ko') {
            return res.status(500).json({ error: 'Error' })
        }
        //console.log(response);
        return res.status(response.data.status).json(response.data)
    
    }) 

/**
 * @api {post} /user/listchatroomstatus 1 listchatroomstatus
 * @apiName listchatroomstatus - Listar los datos de la sala de chat según status
 * @apiGroup Chatrooms
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                 {"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" }
 *
 *
 * @apiParam {varchar} statuSalaChat required Sala cativa = 24 Sala cerrada = 25. 
 * @apiParam {varchar} idUder required. 
 * 
 * 
 * 
 * @apiSuccess {boolean} success of the Chatrooms.
 * @apiSuccess {int} status 200 of the Chatrooms.
 * @apiSuccess {string} msg   of the Chatrooms.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    {
    "success": true,
    "status": "200",
    "data": [
        {
            "idSala": "949bdc81078b49cd604b6622ddd762054ca8963a",
            "datecreated": "28/10/2020",
            "idPublicacion": 1,
            "namePublication": "Estufa de 4 hornillas",
            "valorComercial": "200000.0000",
            "Userpublication": "8e7PQpRV7ic4jcCuaMm5DDIIOOv2",
            "nameUserPublication": "Ana",
            "imgUserPublication": "https://scontent.fbog9-1.fna.fbcdn.net/v/t1.0-9/123087363_10224035495334302_417571382738385553_o.jpg?_nc_cat=103&ccb=2&_nc_sid=09cbfe&_nc_ohc=VGrhqTFkWmwAX-Zxk-R&_nc_ht=scontent.fbog9-1.fna&oh=a65b30d",
            "idoferta": 7,
            "UserOferta": "EVln0Vj6DNOtTXQVS2fN9P68Gl13",
            "nameUserOferta": "ronny",
            "imgUserOferta": "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/profile%2FEVln0Vj6DNOtTXQVS2fN9P68Gl13-2020-10-23%2014%3A30%3A07.496425.jpg?alt=media&token=62aeb4a7-a7fc-444d-9b3e-9550d216d499",
            "ProductImagesPublicacion": [
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2FEVln0Vj6DNOtTXQVS2fN9P68Gl13-2020-10-23%2014%3A31%3A56.674044.jpg?alt=media&token=0665a846-5f05-4ebc-8a34-bad46b7d6722"
            ],
            "PreferencesPublicacion": [
                1,
                2
            ]
        }
    ],
    "msg": "Lista de salas de chat según status"
}
 *
 * @apiError UserNotFound The id of the Chatrooms was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al Listar Productos"
}
 **/
//LISTAR LOS DATOS DE LA SALA DE CHAT 

router.post('/listchatroomstatus', rutasProtegidas, [
    check('idUder', 'El idUder es obligatorio').not().isEmpty().exists(),
    check('statuSalaChat', 'El statuSalaChat es obligatorio').not().isEmpty().exists()
    ],async (req, res) => {
        
        const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }
    
        let response = await userController.listChatRoomStatus(req.body);
    
        if (response.status == 'ko') {
            return res.status(500).json({ error: 'Error' })
        }
        //console.log(response);
        return res.status(response.data.status).json(response.data)
    
    })


    /**
 * @api {post} /user/listdatachatroom 2 listdatachatroom
 * @apiName listdatachatroom - Listar los datos de la sala de chat por idSala
 * @apiGroup Chatrooms
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                 {"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" }
 *
 *
 * @apiParam {varchar} idUser required.
 * @apiParam {varchar} idSalaChat required.
 * 
 * 
 * 
 * @apiSuccess {boolean} success of the Chatrooms.
 * @apiSuccess {int} status 200 of the Chatrooms.
 * @apiSuccess {string} msg   of the Chatrooms.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   {
    "success": true,
    "status": "200",
    "data": {
        "idSala": "13cd8cceaa9b25a4cfbf364c585f89639ebd1aae",
        "status": 24,
        "datecreated": "03/11/2020",
        "idPublicacion": 3,
        "namePublication": "Reloj Alarma",
        "ValorPublication": "12000.0000",
        "Userpublication": "zSiRYTbNbpW5vOQ6K6XpxvpKu2v1",
        "nameUserPublication": "Anailys Rodríguez",
        "imgUserPublication": null,
        "idoferta": 180,
        "iduseroferta": "8e7PQpRV7ic4jcCuaMm5DDIIOOv2",
        "UserOferta": "8e7PQpRV7ic4jcCuaMm5DDIIOOv2",
        "nameUserOferta": "Ana",
        "imgUserOferta": "https://scontent.fbog9-1.fna.fbcdn.net/v/t1.0-9/123087363_10224035495334302_417571382738385553_o.jpg?_nc_cat=103&ccb=2&_nc_sid=09cbfe&_nc_ohc=VGrhqTFkWmwAX-Zxk-R&_nc_ht=scontent.fbog9-1.fna&oh=a65b30d",
        "PreferencesPublicacion": [
            2,
            1
        ],
        "aFavor": true,
        "Valorferta": "10000.0000",
        "dieferencia": "2000.0000",
        "ItemOfer": [
            {
                "idpublication": 4,
                "nameproduct": "Blusas ",
                "status": 4,
                "img": "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2FEVln0Vj6DNOtTXQVS2fN9P68Gl13-2020-10-23%2014%3A36%3A46.808593.jpg?alt=media&token=44c54278-2aae-451d-a307-d2f821b3286c",
                "marketvalue": "10000.0000"
            }
        ],
        "isUserPubli": true,
        "match": 3
    },
    "msg": "Data completa de la sala de chat"
}
 *
 * @apiError UserNotFound The id of the Chatrooms was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al Listar Productos"
}
 **/
//LISTAR LOS DATOS DE LA SALA DE CHAT 
router.post('/listdatachatroom', rutasProtegidas, [
    check('idUser', 'El idUser es obligatorio').not().isEmpty().exists(),
    check('idSalaChat', 'El idSalaChat es obligatorio').not().isEmpty().exists()
    ],async (req, res) => {
        
        const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }
    
        let response = await userController.listDataChatRoom(req.body);
    
        if (response.status == 'ko') {
            return res.status(500).json({ error: 'Error' })
        }
        //console.log(response);
        return res.status(response.data.status).json(response.data)
    
    })

 /**
 * @api {put} /user/closechatroom 3 closechatroom
 * @apiName closechatroom - Cambio de estado de una oferta
 * @apiGroup Chatrooms
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                 {"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" }
 *
 *
 * @apiParam {int} idSala required.
 * 
 * 
 * 
 * @apiSuccess {boolean} success of the Chatrooms.
 * @apiSuccess {int} status 200 of the Chatrooms.
 * @apiSuccess {string} msg   of the Chatrooms.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    {
    "success": true,
    "status": "200",
    "takasteo": false,
    "msg": "Cambio de estatus de la sala de chat ejecutdos exitosamente"
}
 *
 * @apiError UserNotFound The id of the Chatrooms was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al intentar cambiar el estatus de una Oferta"
}
 **/

//CAMBIO DE ESTATUS DE UNA SALA DE CHAT - TAKASTEAR
router.put('/closechatroom', rutasProtegidas, [
    check('idSala', 'El idSala es obligatorio').not().isEmpty().exists()
    ],async (req, res) => {
    
        const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }        
        let response = await userController.CloseChatRoom(req.body);
    
        if (response.status == 'ko') {
            return res.status(500).json({ error: 'Error' })
        }
        //console.log(response);
        return res.status(response.data.status).json(response.data)
    
    }) 

    /**
 * @api {put} /user/matchofferchatroom 4 matchofferchatroom
 * @apiName matchofferchatroom - Match de la oferta en la sala de chat
 * @apiGroup Chatrooms
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                 {"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" }
 *
 *
 * @apiParam {int} idUser required.
 * @apiParam {int} idSala required.
 * 
 * 
 * 
 * @apiSuccess {boolean} success of the Chatrooms.
 * @apiSuccess {int} status 200 of the Chatrooms.
 * @apiSuccess {string} msg   of the Chatrooms.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    {
    "success": true,
    "status": "200",
    "idNotificacion": 79,
    "idOferta": 180,
    "TypeNotification": 2,
    "UserPublication": "zSiRYTbNbpW5vOQ6K6XpxvpKu2v1",
    "takasteo": true,
    "msg": "¡TAKASTEO EXITOSO!"
}
 *
 * @apiError UserNotFound The id of the Chatrooms was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al intentar cambiar el estatus de una Oferta"
}
 **/

//CAMBIO DE ESTATUS DE UNA SALA DE CHAT - TAKASTEAR
router.post('/matchofferchatroom', rutasProtegidas, [
    check('idUser', 'El idUser es obligatorio').not().isEmpty().exists(),
    check('idSala', 'El idSala es obligatorio').not().isEmpty().exists()
    ],async (req, res) => {
    
        const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }        
        let response = await userController.MatchOfferChatRoom(req.body);
    
        if (response.status == 'ko') {
            return res.status(500).json({ error: 'Error' })
        }
        //console.log(response);
        return res.status(response.data.status).json(response.data)    
    }) 



     /**
 * @api {post} /user/listnotifications 1 listnotifications
 * @apiName listnotifications - Listar los datos de la sala de chat por idSala
 * @apiGroup Notifications
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                 {"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" }
 *
 *
 * @apiParam {varchar} idUser required.
 * 
 * 
 * 
 * @apiSuccess {boolean} success of the Notifications.
 * @apiSuccess {int} status 200 of the Notifications.
 * @apiSuccess {string} msg   of the Notifications.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
    "success": true,
    "status": "200",
    "data": [
        {
            "idNotifications": 11,
            "dateNotifications": "31/10/2020",
            "statusNotifications": 1,
            "typenotifications": 2,
            "title": "Haz recibido un takasteo potencial",
            "details": "¡En hora buena Anailys Rodríguez! tú publicación  <<Reloj Alarma>> tiene un takasteo potencial con un valor comercial de 130000",
            "idevento": 145,
            "idrelation": 3,
            "name": "Reloj Alarma",
            "nameProducto": 12000
        },
        {
            "idNotifications": 10,
            "dateNotifications": "31/10/2020"",
            "statusNotifications": 1,
            "typenotifications": 2,
            "title": "Haz recibido un takasteo potencial",
            "details": "¡En hora buena Anailys Rodríguez! tú publicación  <<Reloj Alarma>> tiene un takasteo potencial con un valor comercial de 130000",
            "idevento": 144,
            "idrelation": 3,
            "name": "Reloj Alarma",
            "nameProducto": 12000
        }
    ],
    "msg": "Lista detallada de notificaciones  con éxito"
}
 *
 * @apiError UserNotFound The id of the Notifications was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al Listar notificaciones"
}
 **/

//LISTAR NOTIFICACIONES DETALLADAS
router.post('/listnotifications', [
    check('idUser', 'El idUser es obligatorio').not().isEmpty().exists()
    ], rutasProtegidas,async (req, res) => {
        
        const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }
    
        let response = await userController.listNotifications(req.body);
        //let response = await userController.listNotifications();
    
        if (response.status == 'ko') {
            return res.status(500).json({ error: 'Error' })
        }
        //console.log(response);
        return res.status(response.data.status).json(response.data)
    
    })


     /**
 * @api {post} /user/cantnotifications 2 cantnotifications
 * @apiName cantnotifications - Obtener la cantidad de notificaciones según bandera
 * @apiGroup Notifications
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                 {"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" }
 *
 *
 * @apiParam {varchar} idUder Optional Sin leer=1 y Vista = 0.
 * @apiParam {varchar} flagNotifications Optional Sin leer=1 y Vista = 0.
 * 
 * 
 * 
 * @apiSuccess {boolean} success of the Notifications.
 * @apiSuccess {int} status 200 of the Notifications.
 * @apiSuccess {string} msg   of the Notifications.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "success": true,
    "status": "200",
    "data": {
        "CantNoti": 11
    },
    "msg": "Cantidad de notificaciones según bandera obtenida con éxito"
}
 *
 * @apiError UserNotFound The id of the Notifications was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al Listar notificaciones"
}
 **/

// Obtener la cantidad de notificaciones según bandera
router.post('/cantnotifications', [
    check('idUder', 'El idUder es obligatorio').not().isEmpty().exists()
    ], rutasProtegidas,async (req, res) => {
        
    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    //let response = await userController.listNotifications(req.body);
    let response = await userController.cantNotifications(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})

 /**
 * @api {put} /user/changestatusnotifications 3 changestatusnotifications
 * @apiName changestatusnotifications - Cambio de estado de una oferta
 * @apiGroup Notifications
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                 {"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" }
 *
 *
 * @apiParam {int} idNotifications required.
 * @apiParam {int} idUder required.
 * @apiParam {int} FlagStatus required. Sin leer = 1, vista = 0
 * 
 * 
 * 
 * @apiSuccess {boolean} success of the Chatrooms.
 * @apiSuccess {int} status 200 of the Chatrooms.
 * @apiSuccess {string} msg   of the Chatrooms.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    {
    "success": true,
    "status": "200",
    "msg": "Cambio de la notificación exitosamente"
}
 *
 * @apiError UserNotFound The id of the Chatrooms was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al intentar cambiar el estatus de la notificación"
}
 **/

//CAMBIO DE ESTATUS DE UNA NOTIFICACIÓN
router.put('/changestatusnotifications', rutasProtegidas, [
    check('idNotifications', 'El idNotifications es obligatorio').not().isEmpty().exists(),
    check('idUder', 'El idUder es obligatorio').not().isEmpty().exists(),
    check('FlagStatus', 'El FlagStatus es obligatorio').not().isEmpty().exists()
    ],async (req, res) => {
    
        const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }        
        let response = await userController.changeStatusNotifications(req.body);
    
        if (response.status == 'ko') {
            return res.status(500).json({ error: 'Error' })
        }
        //console.log(response);
        return res.status(response.data.status).json(response.data)
    
    }) 

     /**
 * @api {post} /user/cantnofertaspublications 7 cantnofertaspublications
 * @apiName cantnofertaspublications - Obtener la cantidad de notificaciones según bandera
 * @apiGroup Offers
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                 {"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" }
 *
 *
 * @apiParam {varchar} idPublication requeride .
 * 
 * 
 * 
 * @apiSuccess {boolean} success of the Offers.
 * @apiSuccess {int} status 200 of the Offers.
 * @apiSuccess {string} msg   of the Offers.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "success": true,
    "status": "200",
    "CantOfertas": 13,
    "msg": "Cantidad de Ofertas a una publicación obtenidas con éxito"
}
 *
 * @apiError UserNotFound The id of the Offers was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al intentar obtener Cantidad de Ofertas a una publicación"
}
 **/

// Obtener la cantidad de ofertas realizadas a una publicación
router.post('/cantnofertaspublications', [
    check('idPublication', 'El idPublication es obligatorio').not().isEmpty().exists()
    ], rutasProtegidas,async (req, res) => {
        
    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    //let response = await userController.listNotifications(req.body);
    let response = await userController.cantnOfertasPublications(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})


     /**
 * @api {post} /user/deletepublication 10 deletepublication
 * @apiName deletepublication - Eliminación lógica de un producto
 * @apiGroup Product
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                 {"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" }
 *
 *
 * @apiParam {varchar} idfirebaseUser requeride .
 * @apiParam {varchar} idPublication requeride .
 * 
 * 
 * 
 * @apiSuccess {boolean} success of the Offers.
 * @apiSuccess {int} status 200 of the Offers.
 * @apiSuccess {string} msg   of the Offers.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "success": true,
    "status": "200",
    "msg": "publicación eliminada con éxito"
}
 *
 * @apiError UserNotFound The id of the Offers was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al intentar eliminar una publicación"
}
 **/

// Eliminación lógica de una publicación
router.post('/deletepublication', rutasProtegidas,[
    check('idfirebaseUser', 'El idfirebaseUser es obligatorio').not().isEmpty().exists(),
    check('idPublication', 'El idPublication es obligatorio').not().isEmpty().exists()
    ], rutasProtegidas,async (req, res) => {
        
    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    //let response = await userController.listNotifications(req.body);
    let response = await userController.DeletePublication(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})


/**
 * @api {post} /user/newtombotakas  1 newtombotakas
 * @apiName  newtombotakas - Registro De TOMBOTAKAS
 * @apiGroup Tombotakas
 * 
 *      
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * 
 *   
 * @apiParam {varchar} idfirebaseUser unique required.
 * @apiParam {varchar} namettk  required.
 * @apiParam {varchar} DetailsEventtk required.
 * @apiParam {varchar} DetailsAwardttk  required.
 * @apiParam {datetime} DateLottk  required.
 * @apiParam {int} moneyttk  required. 
 * @apiParam {double} pricettk  required. 
 * @apiParam {array} ImagesLot  required arrays de varchar.
 * 
 *
 * @apiSuccess {boolean} success of the Tombotakas.
 * @apiSuccess {int} status 200 of the Tombotakas.
 * @apiSuccess {string} msg   of the Tombotakas.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
    "success": true,
    "status": "200",
    "pinReference": "h8dGBL",
    "msg": "Tombotakas se ha creado con éxito"
}
 *
 * @apiError UserNotFound The id of the Tombotakas was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status": "500",
    "data": "Se ha superado el límite de imagenes",
    "msg": "Error al intentar registrar la Tombotakas"
}
 */
//Crear Tombotakas- 
router.post('/newtombotakas',rutasProtegidas, [
    check('idfirebaseUser', 'El idfirebase es obligatorio').not().isEmpty().exists(),
    check('namettk', 'El namettk es obligatorio').not().isEmpty().exists(),
    check('DetailsEventtk', 'El Detaille del evento  es obligatorio').not().isEmpty().exists(),
    check('DetailsAwardttk', 'El detalle del premio es obligatorio').not().isEmpty().exists(),
    check('DateLottk', 'La fecha del sorteo es obligatoria').not().isEmpty().exists(),
    check('moneyttk', 'El moneyttk es obligatorio').not().isEmpty().exists(),
    check('pricettk', 'El precio es obligatorio').not().isEmpty().exists(),
    check('ImagesLot', 'Debe ingresar al menos una imagen').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await userController.NewTomboTakas(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})

/**
 * @api {post} /user/mytombotakas  2 mytombotakas
 * @apiName  mytombotakas - Lista de mis tombolas
 * @apiGroup Tombotakas
 * 
 *      
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * 
 *   
 * @apiParam {varchar} idfirebaseUser  required.
 * @apiParam {int} flagTTK optional.
 * 
 *
 * @apiSuccess {boolean} success of the Tombotakas.
 * @apiSuccess {int} status 200 of the Tombotakas.
 * @apiSuccess {string} msg   of the Tombotakas.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
{
    "success": true,
    "status": "200",
    "data": [
        {
            "idTombotakas": 2,
            "statusTTK": 0,
            "nameTTK": "test Nueva Tombotakas",
            "datecreatedTTK": "19/11/2020",
            "detailseventTTK": "Para canche 25/11/20 8:00 pm",
            "detailsAwardttk": "La imagen que voy a cargar en este momento",
            "pinreferenceTTK": "ibxJu2",
            "datelotTTK": "25/11/2020 19:47",
            "moneyTTK": 1,
            "priceTTK": "10000.0000",
            "resultTTK": null,
            "imgTTk": [
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc"
            ]
        },
        {
            "idTombotakas": 3,
            "statusTTK": 0,
            "nameTTK": "test Nueva Tombotakas",
            "datecreatedTTK": "19/11/2020",
            "detailseventTTK": "Para canche 25/11/20 8:00 pm",
            "detailsAwardttk": "La imagen que voy a cargar en este momento",
            "pinreferenceTTK": "YuYMXs",
            "datelotTTK": "25/11/2020 19:47",
            "moneyTTK": 1,
            "priceTTK": "10000.0000",
            "resultTTK": null,
            "imgTTk": [
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc"
            ]
        },
        {
            "idTombotakas": 4,
            "statusTTK": 0,
            "nameTTK": "test Nueva Tombotakas",
            "datecreatedTTK": "19/11/2020",
            "detailseventTTK": "Para canche 25/11/20 8:00 pm",
            "detailsAwardttk": "La imagen que voy a cargar en este momento",
            "pinreferenceTTK": "hBKyxU",
            "datelotTTK": "25/11/2020 19:47",
            "moneyTTK": 1,
            "priceTTK": "10000.0000",
            "resultTTK": null,
            "imgTTk": [
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc"
            ]
        },
        {
            "idTombotakas": 5,
            "statusTTK": 0,
            "nameTTK": "test Nueva Tombotakas",
            "datecreatedTTK": "19/11/2020",
            "detailseventTTK": "Para canche 25/11/20 8:00 pm",
            "detailsAwardttk": "La imagen que voy a cargar en este momento",
            "pinreferenceTTK": "J3uxSU",
            "datelotTTK": "25/11/2020 19:47",
            "moneyTTK": 1,
            "priceTTK": "10000.0000",
            "resultTTK": null,
            "imgTTk": [
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc"
            ]
        },
        {
            "idTombotakas": 6,
            "statusTTK": 0,
            "nameTTK": "test Nueva Tombotakas",
            "datecreatedTTK": "19/11/2020",
            "detailseventTTK": "Para canche 25/11/20 8:00 pm",
            "detailsAwardttk": "La imagen que voy a cargar en este momento",
            "pinreferenceTTK": "8JGthr",
            "datelotTTK": "25/11/2020 19:47",
            "moneyTTK": 1,
            "priceTTK": "10000.0000",
            "resultTTK": null,
            "imgTTk": [
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc"
            ]
        }
    ],
    "msg": "Lista de Tombotakas creada  con éxito"
}
 *
 * @apiError UserNotFound The id of the Tombotakas was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status": "500",
    "msg": "Error al intentar Listar las Tombotakas del usuario"
}
 */


//Listar Tombotakas- 
router.post('/mytombotakas', rutasProtegidas,[
    check('idfirebaseUser', 'El idfirebase es obligatorio').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await userController.MyTomboTakas(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})


/**
 * @api {post} /user/comprarapartartickets  3 comprarapartartickets
 * @apiName  comprarapartartickets - Comprar o apartar tickets
 * @apiGroup Tombotakas
 * 
 *      
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * 
 *   
 * @apiParam {varchar} idfirebaseUser  required.
 * @apiParam {int} idTombotaka   int required.
 * @apiParam {array} tickets  array int required.
 * @apiParam {int} accionTTK optional.
 * 
 *
 * @apiSuccess {boolean} success of the Tombotakas.
 * @apiSuccess {int} status 200 of the Tombotakas.
 * @apiSuccess {string} msg   of the Tombotakas.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
{
    "success": true,
    "status": "200",
    "tickets": [
        "01"
    ],
    "ticketsNoDispo": [
        "00",
        "21",
        "31"
    ],
    "msg": "Los tickets disponibles fueron procesados con éxito"
}
 *
 * @apiError UserNotFound The id of the Tombotakas was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status": "500",
    "data": "Los tickets nos están disponibles",
    "msg": "Error al intentar Procesar tickets"
}
 */


//COMPRAR O APARTAR Tombotakas- 
router.post('/comprarapartartickets', rutasProtegidas,[
    check('idfirebaseUser', 'El idfirebase es obligatorio').not().isEmpty().exists(),
     check('idTombotaka', 'El idTombotaka es obligatorio').not().isEmpty().exists(),
     check('tickets', 'Debe elegir al menos un Ticket').not().isEmpty().exists(),
    check('accionTTK', 'El accionTTK es obligatorio, debe definir si es compra o apartado').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await userController.ComprarApartarTickets(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})


/**
 * @api {post} /user/findtombotakaspin  4 findtombotakaspin
 * @apiName  findtombotakaspin - Buscar tombotakas por pin de referencia
 * @apiGroup Tombotakas
 * 
 *      
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * 
 *   
 * @apiParam {varchar} pinttk  required.
 *
 * @apiSuccess {boolean} success of the Tombotakas.
 * @apiSuccess {int} status 200 of the Tombotakas.
 * @apiSuccess {string} msg   of the Tombotakas.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
{
    "success": true,
    "status": "200",
    "data": {
        "idTombotakas": 2,
        "nameTombotakas": "test Nueva Tombotakas",
        "statusTTK": 0,
        "datecreatedTTK": "19/11/2020",
        "detailseventTTK": "Para canche 25/11/20 8:00 pm",
        "detailsAwardttk": "La imagen que voy a cargar en este momento",
        "pinreferenceTTK": "ibxJu2",
        "datelotTTK": "25/11/2020 19:47",
        "moneyTTK": 1,
        "priceTTK": "10000.0000",
        "resultTTK": null,
        "numberticketsrs": [
            31,
            40,
            21,
            1,
            10,
            32,
            22,
            2
        ],
        "ticketsReservados": [
            {
                "idNUmbre": 1,
                "Number": 31,
                "status": 1,
                "NameUser": "gusuario12",
                "phonenumber": null,
                "email": "emailUser12@gmail.com"
            },
            {
                "idNUmbre": 2,
                "Number": 40,
                "status": 1,
                "NameUser": "gusuario12",
                "phonenumber": null,
                "email": "emailUser12@gmail.com"
            },
            {
                "idNUmbre": 3,
                "Number": 21,
                "status": 1,
                "NameUser": "gusuario12",
                "phonenumber": null,
                "email": "emailUser12@gmail.com"
            },
            {
                "idNUmbre": 4,
                "Number": 1,
                "status": 1,
                "NameUser": "gusuario12",
                "phonenumber": null,
                "email": "emailUser12@gmail.com"
            },
            {
                "idNUmbre": 5,
                "Number": 10,
                "status": 1,
                "NameUser": "gusuario12",
                "phonenumber": null,
                "email": "emailUser12@gmail.com"
            },
            {
                "idNUmbre": 6,
                "Number": 32,
                "status": 1,
                "NameUser": "gusuario12",
                "phonenumber": null,
                "email": "emailUser12@gmail.com"
            },
            {
                "idNUmbre": 7,
                "Number": 22,
                "status": 1,
                "NameUser": "gusuario12",
                "phonenumber": null,
                "email": "emailUser12@gmail.com"
            },
            {
                "idNUmbre": 8,
                "Number": 2,
                "status": 1,
                "NameUser": "gusuario12",
                "phonenumber": null,
                "email": "emailUser12@gmail.com"
            }
        ]
    },
    "msg": "Tombotakas ha sido encontrada con éxito"
}

 *
 * @apiError UserNotFound The id of the Tombotakas was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status": "500",
    "msg": "Error al intentar buscar Tombotakas"
}
 */


//Crear Tombotakas- 
router.post('/findtombotakaspin', rutasProtegidas,[
    check('pinttk', 'El pinttk es obligatorio').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await userController.FindTomboTakasPin(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})


/**
 * @api {post} /user/mytickets  5 mytickets
 * @apiName  mytickets - Listar mis tickets
 * @apiGroup Tombotakas
 * 
 *      
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * 
 *   
 * @apiParam {varchar} idfirebaseUser  required.
 * @apiParam {varchar} flagTTK  optional.
 *
 * @apiSuccess {boolean} success of the Tombotakas.
 * @apiSuccess {int} status 200 of the Tombotakas.
 * @apiSuccess {string} msg   of the Tombotakas.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
{
    "success": true,
    "status": "200",
    "data": [
        {
            "idTombotakas": 2,
            "nameTombotakas": "test Nueva Tombotakas",
            "statusTTK": 0,
            "datecreatedTTK": "19/11/2020",
            "datelotTTK": "25/11/2020 19:47",
            "moneyTTK": 1,
            "priceTTK": "10000.0000",
            "numberticketsrs": [
                31,
                40,
                21,
                1,
                10,
                32,
                22,
                2
            ],
            "ticketsReservados": [
                {
                    "idNUmbre": 1,
                    "Number": 31,
                    "status": 1,
                    "NameUser": "gusuario12",
                    "phonenumber": null,
                    "email": "emailUser12@gmail.com"
                },
                {
                    "idNUmbre": 2,
                    "Number": 40,
                    "status": 1,
                    "NameUser": "gusuario12",
                    "phonenumber": null,
                    "email": "emailUser12@gmail.com"
                },
                {
                    "idNUmbre": 3,
                    "Number": 21,
                    "status": 1,
                    "NameUser": "gusuario12",
                    "phonenumber": null,
                    "email": "emailUser12@gmail.com"
                },
                {
                    "idNUmbre": 4,
                    "Number": 1,
                    "status": 1,
                    "NameUser": "gusuario12",
                    "phonenumber": null,
                    "email": "emailUser12@gmail.com"
                },
                {
                    "idNUmbre": 5,
                    "Number": 10,
                    "status": 1,
                    "NameUser": "gusuario12",
                    "phonenumber": null,
                    "email": "emailUser12@gmail.com"
                },
                {
                    "idNUmbre": 6,
                    "Number": 32,
                    "status": 1,
                    "NameUser": "gusuario12",
                    "phonenumber": null,
                    "email": "emailUser12@gmail.com"
                },
                {
                    "idNUmbre": 7,
                    "Number": 22,
                    "status": 1,
                    "NameUser": "gusuario12",
                    "phonenumber": null,
                    "email": "emailUser12@gmail.com"
                },
                {
                    "idNUmbre": 8,
                    "Number": 2,
                    "status": 1,
                    "NameUser": "gusuario12",
                    "phonenumber": null,
                    "email": "emailUser12@gmail.com"
                }
            ]
        }
    ],
    "msg": "Lista de tickets"
}
 *
 * @apiError UserNotFound The id of the Tombotakas was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status": "500",
    "msg": "Error al intentar Listar tickets"
}
 */


//Crear Tombotakas- 
router.post('/mytickets', rutasProtegidas,[
    check('idfirebaseUser', 'El idfirebaseUser es obligatorio').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await userController.MyTickets(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})


/**
 * @api {post} /user/requeststickets  6 requeststickets
 * @apiName  requeststickets - Listar Solicitudes de compra de tickets
 * @apiGroup Tombotakas
 * 
 *      
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * 
 *   
 * @apiParam {varchar} idfirebaseUser  required.
 * 
 *
 * @apiSuccess {boolean} success of the Tombotakas.
 * @apiSuccess {int} status 200 of the Tombotakas.
 * @apiSuccess {string} msg   of the Tombotakas.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
{
    "success": true,
    "status": "200",
    "data": [
        {
            "idTombotakas": 2,
            "nameTombotakas": "test Nueva Tombotakas",
            "statusTTK": 0,
            "datecreatedTTK": "19/11/2020",
            "datelotTTK": "25/11/2020 19:47",
            "moneyTTK": 1,
            "priceTTK": "10000.0000",
            "ticketsReservados": [
                {
                    "idNUmbre": 1,
                    "Number": 31,
                    "status": 1,
                    "NameUser": "gusuario12",
                    "phonenumber": null,
                    "email": "emailUser12@gmail.com"
                },
                {
                    "idNUmbre": 2,
                    "Number": 40,
                    "status": 1,
                    "NameUser": "gusuario12",
                    "phonenumber": null,
                    "email": "emailUser12@gmail.com"
                },
                {
                    "idNUmbre": 3,
                    "Number": 21,
                    "status": 1,
                    "NameUser": "gusuario12",
                    "phonenumber": null,
                    "email": "emailUser12@gmail.com"
                },
                {
                    "idNUmbre": 4,
                    "Number": 1,
                    "status": 1,
                    "NameUser": "gusuario12",
                    "phonenumber": null,
                    "email": "emailUser12@gmail.com"
                },
                {
                    "idNUmbre": 5,
                    "Number": 10,
                    "status": 1,
                    "NameUser": "gusuario12",
                    "phonenumber": null,
                    "email": "emailUser12@gmail.com"
                },
                {
                    "idNUmbre": 6,
                    "Number": 32,
                    "status": 1,
                    "NameUser": "gusuario12",
                    "phonenumber": null,
                    "email": "emailUser12@gmail.com"
                },
                {
                    "idNUmbre": 7,
                    "Number": 22,
                    "status": 1,
                    "NameUser": "gusuario12",
                    "phonenumber": null,
                    "email": "emailUser12@gmail.com"
                },
                {
                    "idNUmbre": 8,
                    "Number": 2,
                    "status": 1,
                    "NameUser": "gusuario12",
                    "phonenumber": null,
                    "email": "emailUser12@gmail.com"
                }
            ]
        }
    ],
    "msg": "Solicitudes de tickets"
}
 *
 * @apiError UserNotFound The id of the Tombotakas was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status": "500",
    "msg": "Error al intentar Listar solicitudes tickets"
}
 */


//Listar Solicitudes- 
router.post('/requeststickets', rutasProtegidas,[
    check('idfirebaseUser', 'El idfirebaseUser es obligatorio').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await userController.RequestsTickets(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})



/**
 * @api {post} /user/processrequeststickets  7 processrequeststickets
 * @apiName  processrequeststickets - Procesar Solicitudes de compra de tickets
 * @apiGroup Tombotakas
 * 
 *      
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * 
 *   
 * @apiParam {varchar} idfirebaseUser  required.
 * @apiParam {int} idticket  required.
 * @apiParam {int} FlagTTk  required 2=COMPRADO(VENDER) 4=RECHAZADO.
 * 
 *
 * @apiSuccess {boolean} success of the Tombotakas.
 * @apiSuccess {int} status 200 of the Tombotakas.
 * @apiSuccess {string} msg   of the Tombotakas.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
{
    "success": true,
    "status": "200",
    "msg": "Ticket procesado exitosamente"
}
 *
 * @apiError UserNotFound The id of the Tombotakas was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status": "500",
    "msg": "Error al intentar procesar ticket"
}
 */


//Procesar Solicitud de un ticket- 
router.post('/processrequeststickets', rutasProtegidas,[
    check('idfirebaseUser', 'El idfirebaseUser es obligatorio').not().isEmpty().exists(),
    check('idticket', 'El idticket es obligatorio').not().isEmpty().exists(),
    check('FlagTTk', 'El FlagTTk es obligatorio').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await userController.ProcessRequestsTickets(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})

/**
 * @api {post} /user/detailstombotakas  8 detailstombotakas
 * @apiName  detailstombotakas - Detalle Tombotakas
 * @apiGroup Tombotakas
 * 
 *      
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * 
 *   
 * @apiParam {varchar} idfirebaseUser  required.
 * @apiParam {int} idTTK  required.
 * 
 *
 * @apiSuccess {boolean} success of the Tombotakas.
 * @apiSuccess {int} status 200 of the Tombotakas.
 * @apiSuccess {string} msg   of the Tombotakas.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
{
    "success": true,
    "status": "200",
    "data": {
        "idTombotakas": 2,
        "pertenece": false,
        "nameTombotakas": "test Nueva Tombotakas",
        "statusTTK": 0,
        "datecreatedTTK": "19/11/2020",
        "detailseventTTK": "Para canche 25/11/20 8:00 pm",
        "detailsAwardttk": "La imagen que voy a cargar en este momento",
        "pinreferenceTTK": "ibxJu2",
        "datelotTTK": "25/11/2020 19:47",
        "moneyTTK": 1,
        "priceTTK": "10000.0000",
        "resultTTK": null,
        "numberticketsrs": [
            31,
            40,
            21,
            1,
            10,
            32,
            22,
            2
        ],
        "ticketsReservados": [
            {
                "idNUmbre": 1,
                "Number": 31,
                "status": 1,
                "NameUser": "gusuario12",
                "phonenumber": null,
                "email": "emailUser12@gmail.com"
            },
            {
                "idNUmbre": 2,
                "Number": 40,
                "status": 1,
                "NameUser": "gusuario12",
                "phonenumber": null,
                "email": "emailUser12@gmail.com"
            },
            {
                "idNUmbre": 3,
                "Number": 21,
                "status": 1,
                "NameUser": "gusuario12",
                "phonenumber": null,
                "email": "emailUser12@gmail.com"
            },
            {
                "idNUmbre": 4,
                "Number": 1,
                "status": 1,
                "NameUser": "gusuario12",
                "phonenumber": null,
                "email": "emailUser12@gmail.com"
            },
            {
                "idNUmbre": 5,
                "Number": 10,
                "status": 1,
                "NameUser": "gusuario12",
                "phonenumber": null,
                "email": "emailUser12@gmail.com"
            },
            {
                "idNUmbre": 6,
                "Number": 32,
                "status": 1,
                "NameUser": "gusuario12",
                "phonenumber": null,
                "email": "emailUser12@gmail.com"
            },
            {
                "idNUmbre": 7,
                "Number": 22,
                "status": 1,
                "NameUser": "gusuario12",
                "phonenumber": null,
                "email": "emailUser12@gmail.com"
            },
            {
                "idNUmbre": 8,
                "Number": 2,
                "status": 1,
                "NameUser": "gusuario12",
                "phonenumber": null,
                "email": "emailUser12@gmail.com"
            }
        ]
    },
    "msg": "Detalle de Tombotakas encontrado exitosamente"
}
 *
 * @apiError UserNotFound The id of the Tombotakas was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status": "500",
    "msg": "Error al intentar buscar detalles de Tombotakas"
}
 */

//Score
/**
 * @api {post} /user/scorepublication  11 scorepublication
 * @apiName  scorepublication - Puntuación de la publicación
 * @apiGroup Product
 * 
 *      
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * 
 *   
 * @apiParam {varchar} idfirebaseUser  required.
 * @apiParam {int} idPublication  required.
 * @apiParam {int} scoreUser  required.
 * 
 *
 * @apiSuccess {boolean} success of the Product.
 * @apiSuccess {int} status 200 of the Product.
 * @apiSuccess {string} msg   of the Product.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
{
    "success": true,
    "status": "200",
    "msg": "Se ha calificado exitosamente"
}
 *
 * @apiError UserNotFound The id of the Product was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status": "500",
    "msg": "Error al intentar calificar"
}
 */

//PUNTICAIÓN PARA UNA PUBLICACIÓN - 
router.post('/scorepublication', rutasProtegidas,[
    check('idfirebaseUser', 'El idfirebaseUser es obligatorio').not().isEmpty().exists(),
    check('idPublication', 'El idPublication es obligatorio').not().isEmpty().exists(),
    check('scoreUser', 'El scoreUser es obligatorio').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await userController.scorePublication(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})


//pqrs
/**
 * @api {post} /user/pqrs  1 pqrs
 * @apiName  pqrs - Crear nueva PQRs
 * @apiGroup PQRs
 * 
 *      
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * 
 *   
 * @apiParam {varchar} idfirebaseUser  required.
 * @apiParam {varchar} detailsPQRs  required.
 * @apiParam {int} flagPQRs  required. Preguntas=0, Quejas=1, Respuestas=2, Sugerencias=3
 * 
 *
 * @apiSuccess {boolean} success of the PQRs.
 * @apiSuccess {int} status 200 of the PQRs.
 * @apiSuccess {string} msg   of the PQRs.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
{
    "success": true,
    "status": "200",
    "msg": "Se ha creado la PQRs exitosamente"
}
 *
 * @apiError UserNotFound The id of the PQRs was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status": "500",
    "msg": "Error al intentar crear una nueva PQRs"
}
 */

//CREAR NUEVA PQRS - 
router.post('/pqrs', rutasProtegidas,[
    check('idfirebaseUser', 'El idfirebaseUser es obligatorio').not().isEmpty().exists(),
    check('detailsPQRs', 'El detailsPQRs es obligatorio').not().isEmpty().exists(),
    check('flagPQRs', 'El flagPQRs es obligatorio').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await userController.pqrs(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})


//Solicitud Membresía
/**
 * @api {post} /user/solicitarmembresia  1 solicitarmembresia
 * @apiName  solicitarmembresia - Crear nueva PQRs
 * @apiGroup Memberships
 * 
 *      
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * 
 *   
 * @apiParam {varchar} idfirebaseUser  required.
 * @apiParam {int} typeMemberships  required.
 * 
 *
 * @apiSuccess {boolean} success of the Memberships.
 * @apiSuccess {int} status 200 of the Memberships.
 * @apiSuccess {string} msg   of the Memberships.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
{
    "success": true,
    "status": "200",
    "msg": "Solicitud ha sido enviada"
}
 *
 * @apiError UserNotFound The id of the Memberships was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status": "500",
    "msg": "Error al intentar enviar solicitud"
}
 */

//SOLICITUD DE COMPRA DE MEMBRESÍA - 
router.post('/solicitarmembresia', rutasProtegidas,[
    check('idfirebaseUser', 'El idfirebaseUser es obligatorio').not().isEmpty().exists(),
    check('typeMemberships', 'El typeMemberships es obligatorio').not().isEmpty().exists(),
    //check('flagPQRs', 'El flagPQRs es obligatorio').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await userController.SolicitarMembresia(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})



//DETALLE DE LA TOMBOTAKAS- 
router.post('/detailstombotakas', rutasProtegidas,[
    check('idfirebaseUser', 'El idfirebaseUser es obligatorio').not().isEmpty().exists(),
    check('idTTK', 'El idTTK es obligatorio').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await userController.DetailsTombotakas(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})


//////////////SUBASTAKEAR////////////////////
/**
 * @api {post} /user/newsubastakasckw  1 newsubastakasckw
 * @apiName  newsubastakasckw - Registro De Subastakas con Características
 * @apiGroup Subastakas
 * 
 *      
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                 "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" 
 *
 * 
 * 
 * @apiParam {varchar} iduserSubastakas required.
 * @apiParam {varchar} nameSubastakas required.
 * @apiParam {datetime} beginSubastakas required.
 * @apiParam {datetime} endSubastakas required.
 * @apiParam {boolean} NewSubastakas optional.
 * @apiParam {varchar} detailsSubastakas  unique required.
 * @apiParam {smallint} typemoneySubastakas   required.
 * @apiParam {decimal} marketvalueSubastakas  required .
 * @apiParam {int} subcategorySubastakas  required .
 * @apiParam {array} ImagesSubastakas  required arrays de varchar .
 * @apiParam {array} KeyWordsSubastakas  optional array de varchar .
 * @apiParam {int} UseSubastakas  optional.
 * @apiParam {int} SizeSubastakas  optional.
 * @apiParam {int} WeightSubastakas  optional.
 * 
 * 
 * 
 * @apiSuccess {boolean} success of the Subastakas.
 * @apiSuccess {int} status 200 of the Subastakas.
 * @apiSuccess {string} msg   of the Subastakas.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    {
    "success": true,
    "status": "200",
    "msg": "Subastakas registrada con éxito"
}
 *
 * @apiError UserNotFound The id of the Product was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status": "500",
    "data": "Se ha superado el límite de imagenes ó palabras claves",
    "msg": "Error al registrar Subastakas"
}
 *
 *
 **/

//Crear newproduct
router.post('/newsubastakasckw', rutasProtegidas,[
    check('iduserSubastakas', 'El iduserSubastakas es obligatorio').not().isEmpty().exists(),
    check('nameSubastakas', 'El Nombre de la Subastakas es obligatorio').not().isEmpty().exists(),
    check('beginSubastakas', 'Es obligatorio determinar la fecha de inicio de las Subastakas').not().isEmpty().exists(),
    check('endSubastakas', 'Es obligatorio determinar la feca de finalización de la Subastakas').not().isEmpty().exists(),
    check('detailsSubastakas', 'El detalle de la Subastakas es obligatorio').not().isEmpty().exists(),
    check('typemoneySubastakas', 'El tipo de moneda estar vacio ').not().isEmpty().exists(),
    check('marketvalueSubastakas', ' El precioinicial es obligatoria').not().isEmpty().exists(),
    check('subcategorySubastakas', ' la Contraseña es requerida').not().isEmpty().exists(),
    check('ImagesSubastakas', 'Debes cargar al menos 1 imagen del producto').not().isEmpty().exists()
], async (req, res) => {

    /*,
    check('PreferecesProduct', ' Las Preferencias son requerido aceptar términos y condisiones').not().isEmpty().exists(),
    check('ImagesProduct', ' Es requerido aceptar términos y condisiones').not().isEmpty().exists() */
    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await userController.NewSubasTakasCKW(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    console.log(response);
    return res.status(response.data.status).json(response.data)

})
/////

/**
 * @api {post} /user/listsubastakas 2 listsubastakas
 * @apiName listsubastakas - Listar Las Subastakas pubicadas por otros usuarios
 * @apiGroup Subastakas
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                 {"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" }
 *
 *
 * @apiParam {varchar} idfirebaseUser required.
 * @apiParam {varchar} FlagProduct required 0=Activa, 1=Takasteada, 2=Eliminada(deshabilitada), 3=Editada.
 * 
 * 
 * 
 * @apiSuccess {boolean} success of the Product.
 * @apiSuccess {int} status 200 of the Product.
 * @apiSuccess {string} msg   of the Product.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *             {
    "success": true,
    "status": "200",
    "data": [
        {
            "idproduct": 1,
            "datecreated": "09/12/2020",
            "begin": "0000-00-00 00:00:00",
            "end": "0000-00-00 00:00:00",
            "iduser": "idfirebaseU4534dsaxgg",
            "nuevo": true,
            "subcategory": 4,
            "name": "pueba laptop 2",
            "details": "Hp Procesador intel core i7",
            "typemoney": 2,
            "marketvalue": "1200000.0000",
            "typepublication": 3,
            "conditions": 1,
            "size": null,
            "weight": null,
            "status": 0,
            "editable": false,
            "CantidadOfertas": 0,
            "ProductImages": [
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc"
            ]
        }
    ],
    "msg": "Lista de productos"
}
 *
 * @apiError UserNotFound The id of the Product was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al Listar Productos"
}
 **/

//LISTAR SUBASTAKAS
router.post('/listsubastakas', rutasProtegidas, [
    check('idfirebaseUser', 'El idfirebaseUser es obligatorio').not().isEmpty().exists(),
    check('FlagSubastakas', 'El FlagSubastakas es obligatorio').not().isEmpty().exists()
    ],async (req, res) => {
        
        const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }
    
        let response = await userController.ListSubasTakas(req.body);
    
        if (response.status == 'ko') {
            return res.status(500).json({ error: 'Error' })
        }
        //console.log(response);
        return res.status(response.data.status).json(response.data)
    
    })

    ///////

/**
 * @api {post} /user/listmisubastakas 3 listmisubastakas
 * @apiName listmisubastakas - Listar mis Subastakas publicadas 
 * @apiGroup Subastakas
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                 {"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" }
 *
 *
 * @apiParam {varchar} idfirebaseUser required.
 * @apiParam {varchar} FlagProduct required 0=Activa, 1=Takasteada, 2=Eliminada(deshabilitada), 3=Editada.
 * 
 * 
 * 
 * @apiSuccess {boolean} success of the Product.
 * @apiSuccess {int} status 200 of the Product.
 * @apiSuccess {string} msg   of the Product.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *            {
    "success": true,
    "status": "200",
    "data": [
        {
            "idproduct": 1,
            "datecreated": "09/12/2020",
            "begin": "0000-00-00 00:00:00",
            "end": "0000-00-00 00:00:00",
            "iduser": "idfirebaseU4534dsaxgg",
            "nuevo": true,
            "subcategory": 4,
            "name": "pueba laptop 2",
            "details": "Hp Procesador intel core i7",
            "typemoney": 2,
            "marketvalue": "1200000.0000",
            "typepublication": 3,
            "conditions": 1,
            "size": null,
            "weight": null,
            "status": 0,
            "editable": false,
            "CantidadOfertas": 0,
            "ProductImages": [
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc"
            ]
        }
    ],
    "msg": "Lista de mis subastakas"
}
 *
 * @apiError UserNotFound The id of the Product was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "'Error al Listar mis subastakas"
}
 **/

//LISTAR SUBASTAKAS
router.post('/listmisubastakas', rutasProtegidas, [
    check('idfirebaseUser', 'El idfirebaseUser es obligatorio').not().isEmpty().exists(),
    check('FlagSubastakas', 'El FlagSubastakas es obligatorio').not().isEmpty().exists()
    ],async (req, res) => {
        
        const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }
    
        let response = await userController.ListMiSubasTakas(req.body);
    
        if (response.status == 'ko') {
            return res.status(500).json({ error: 'Error' })
        }
        //console.log(response);
        return res.status(response.data.status).json(response.data)
    
    })
    ///////

    /**
 * @api {post} /user/detailsubastakas 4 detailsubastakas
 * @apiName detailsubastakas - Detalle de la Subastakas
 * @apiGroup Subastakas
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                 {"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" }
 *
 *
 * @apiParam {int} IdUserSubastakas required.
 * @apiParam {int} IdSubastakas required.
 * 
 * 
 * 
 * @apiSuccess {boolean} success of the Product.
 * @apiSuccess {int} status 200 of the Product.
 * @apiSuccess {string} msg   of the Product.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   {
    "success": true,
    "status": "200",
    "data": {
        "idproduct": 6,
        "datecreated": "09/12/2020",
        "iduser": "idfirebaseU4534dsaxgg",
        "nuevo": true,
        "subcategory": 4,
        "name": "pueba laptop 2",
        "details": "Hp Procesador intel core i7",
        "typemoney": 2,
        "marketvalue": "1200000.0000",
        "typepublication": 3,
        "conditions": 1,
        "size": null,
        "weight": null,
        "status": 0,
        "editable": false,
        "CantidadOfertas": 0,
        "ProductImages": [
            "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
            "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
            "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
            "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
            "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc"
        ]
    },
    "msg": "Listar detalles de un producto"
}
 *
 * @apiError UserNotFound The id of the Product was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al intentar obtener Cantidad de notificaciones según bandera"
}
 **/

//LISTAR DE DETALLES DE LA SUBASTAKAS
router.post('/detailsubastakas', rutasProtegidas, [
    check('IdUserSubastakas', 'El IdUserSubastakas es obligatorio').not().isEmpty().exists(),
    check('IdSubastakas', 'El IdSubastakas es obligatorio').not().isEmpty().exists()
    ],async (req, res) => {
    
        const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }
        let response = await userController.DetailSubasTakas(req.body);
    
        if (response.status == 'ko') {
            return res.status(500).json({ error: 'Error' })
        }
        //console.log(response);
        return res.status(response.data.status).json(response.data)
    
    })    
//////////////////

    /**
 * @api {post} /user/interestedsubastakas 5 interestedsubastakas
 * @apiName interestedsubastakas - Me interesa Subastakas
 * @apiGroup Subastakas
 * 
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token:
 *                 {"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MDEwNDkzNjIsImV4cCI6MTYwMTEzNTc2Mn0.-UiJBviqct6ZD-IIa29VeKuaIfd783YXSrPIuveiSkY" }
 *
 *
 * @apiParam {int} IdUserSubastakas required.
 * @apiParam {int} IdSubastakas required.
 * 
 * 
 * 
 * @apiSuccess {boolean} success of the Product.
 * @apiSuccess {int} status 200 of the Product.
 * @apiSuccess {string} msg   of the Product.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   {
    "success": true,
    "status": "200",
    "msg": "Se ha registrado Me interesa"
}
 *
 * @apiError UserNotFound The id of the Product was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al intentar registar Subastakas como me interesa"
}
 **/

router.post('/interestedsubastakas', rutasProtegidas, [
    check('IdUserSubastakas', 'El IdUserSubastakas es obligatorio').not().isEmpty().exists(),
    check('IdSubastakas', 'El IdSubastakas es obligatorio').not().isEmpty().exists()
    ],async (req, res) => {
    
        const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }
        let response = await userController.InterestedSubasTakas(req.body);
    
        if (response.status == 'ko') {
            return res.status(500).json({ error: 'Error' })
        }
        //console.log(response);
        return res.status(response.data.status).json(response.data)
    
    })    
//////////////////





   

module.exports = router;