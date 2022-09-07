const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const rutasProtegidas = require('../../lib/rutasprotegidas');
const notifications = require('../../lib/notifications.js');
const config = require('../../config/config');
const { check, validationResult } = require('express-validator');
const userController = require('../../controllers/userscontroller');
const useradmincontroller = require('../../controllers/useradmincontroller');

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

router.post('/prueba2', function (req, res) {
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
 * @apiParam {varchar} fullnameUser required.
 * @apiParam {varchar} datebirthUser optional.
 * @apiParam {varchar} phonenumberUser  unique required.
 * @apiParam {varchar} emailUser  unique  required.
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
    check('idfirebaseUser', 'El idfirebaseUser es obligatorio').not().isEmpty().exists(),
    check('fullnameUser', 'El fullnameUser es obligatorio').not().isEmpty().exists(),
    check('phonenumberUser', 'El phonenumberUser es obligatorio').not().isEmpty().exists(),
    check('emailUser', 'El emailUser el obligatorio').isEmail().not().isEmpty().exists()
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
    "success": true,
    "status": "200",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MTA0OTAxMDAsImV4cCI6MTYxMzA4MjEwMH0.5wtRrcb4xd08T7VlIlzMYTmdwjhLPFdb3rPavquOo7I",
    "Email": "anailysrodriguez@gmail.com",
    "Fullname": "anailys rodriguez",
    "PhoneNumber": null,
    "ImgUrl": "https://lh3.googleusercontent.com/a-/AOh14GghAJLELlkIz090ubKjqqHdki33JMljFn5d3RHVF4Q=s96-c",
    "msg": "Usuario Autenticado con éxito"
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
 * @apiParam {varchar} emailuser  optional.
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
 *   {
    "success": true,
    "status": "200",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MTAwNTM2NzAsImV4cCI6MTYxMjY0NTY3MH0.of4JPq8qP_p7lID3qL-RAGyhzw9x6DSC8GuwLHcitFs",
    "newUser": false,
    "Email": "gusuario124@gmail.com",
    "Fullname": "gusuario12",
    "PhoneNumber": null,
    "ImgUrl": null,
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
    check('fullnameUser', 'El fullnameUser el obligatorio').not().isEmpty().exists()
], async (req, res) => {
    
    // ,
    // check('emailUser', 'El emailuser el obligatorio').isEmail().exists()
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
 * @apiParam {varchar}  idFirebaseUser  required.
 * 
 * @apiSuccess {boolean} success of the User.
 * @apiSuccess {int} status 200 of the User.
 * @apiSuccess {string} msg   of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
    "success": true,
    "status": "200",
    "data": {
        "NameUser": "abuela",
        "EmailUser": "abuela7@gmail.com",
        "ImgUrl": "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/profile%2FRS6rHsPwWxfTaIk92Y65c8pykbb2-2021-02-11%2017%3A13%3A30.145141.jpg?alt=media&token=813f69dd-b62a-460a-a14f-14e40a8da74e",
        "PhonenumberUser": "340660995",
        "memberships": "Free",
        "DatecreatedUser": "11/02/21",
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
    check('idFirebaseUser', 'El idFirebaseUser el obligatorio').not().isEmpty().exists()
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
    "status": "200",
    "UserExist": true,
    "Email": "emailUser3@gmail.com",
    "Fullname": "fullnameUser2",
    "PhoneNumber": "298380983676",
    "memberships": "Free",
    "ImgUrl": "https://n9.cl/zxq61",
    "msg": "Verificación si el usuario existe y si sus campos estan completos"
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
 * @apiParam {smallint}  FlagCharacteristic  requeride  1=Nuevo ó Usado 2=Tamaño 3=Peso y 4= Unidad de Medida. 
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
            "namestatus": "Muy liviano ",
            "filter": 6,
            "namefilter": "Peso Producto"
        },
        {
            "id": 20,
            "namestatus": "Liviano",
            "filter": 6,
            "namefilter": "Peso Producto"
        },
        {
            "id": 21,
            "namestatus": "Normal ",
            "filter": 6,
            "namefilter": "Peso Producto"
        },
        {
            "id": 22,
            "namestatus": "Pesado ",
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
 * @apiParam {int} location.
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
    check('location', ' Debes elegir la locacion del producto').not().isEmpty().exists(),
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
 * @apiParam {int} SizePoduct  required.
 * @apiParam {int} WeightProduct  required.
 * @apiParam {int} ValueWeightProduct  optional.
 * @apiParam {smallint} UnitOfMeasurementP  optional.
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
    "status": "200",
    "idProduct":47,
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
    check('subcategoryProduct', ' la Categoríaes requerida').not().isEmpty().exists(),
    check('SizePoduct', ' El tamaño es requerido').not().isEmpty().exists(),
    check('WeightProduct', ' El Peso es requerido').not().isEmpty().exists(),
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
 * @apiParam {int} valueweight  optional.
 * @apiParam {smallint} unitofmeasurement  optional.
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
    "idoferta":5,
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
    check('typePublication', 'El typePublication es obligatorio').not().isEmpty().exists(),
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
 * @api {put} /user/matchoffer 8 matchoffer
 * @apiName matchoffer - Cambio de estado de una oferta
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
router.put('/matchoffer', rutasProtegidas, [
    check('idOffer', 'El idsPublications es obligatorio').not().isEmpty().exists(),
    check('idUser', 'El idUser es obligatorio').not().isEmpty().exists(),
    check('MatchOffer', 'El Macht es obligatorio').not().isEmpty().exists()
    ],async (req, res) => {
    
        const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }        
        let response = await userController.MatchOffer(req.body);
    
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
            "idSala": "43b8413e2dcbfddce50c8639d17f2916c8f15da0",
            "datecreated": "04/02/2021",
            "idPublicacion": 5,
            "typepublication": 1,
            "namePublication": "Arbolito de navidad",
            "valorComercial": "300000.0000",
            "Userpublication": "8e7PQpRV7ic4jcCuaMm5DDIIOOv2",
            "nameUserPublication": "Ronny Sotillet",
            "imgUserPublication": "https://lh3.googleusercontent.com/a-/AOh14GijzFS1dFSbNMN-anBXC7E8cjZeXBNbtgFx4nGuN-0=s96-c",
            "idoferta": 3,
            "UserOferta": "5FHP1unvc0PXHQlNCY7lid6774H2",
            "nameUserOferta": "Kenneth Rodriguez",
            "imgUserOferta": "https://lh3.googleusercontent.com/a-/AOh14GgSoPi6j7En1ynttbZGGLI0MIuugPr83Z2UAsBG-w=s96-c",
            "ProductImagesPublicacion": [
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-12-16%2014%3A44%3A07.558491.jpg?alt=media&token=fb665fb2-3da3-4c98-bf51-b791839fbc30"
            ],
            "PreferencesPublicacion": [
                1
            ]
        },
        {
            "idSala": "c14858c75f9b1c53d928ce2dc16af614100c2384",
            "datecreated": "04/02/2021",
            "idPublicacion": 59,
            "typepublication": 3,
            "namePublication": "pueba laptop 60",
            "valorComercial": "1200000.0000",
            "Userpublication": "idfirebaseU4534dsaxgg",
            "nameUserPublication": "Carla Rodríguez Gil",
            "imgUserPublication": null,
            "idoferta": 14,
            "UserOferta": "8e7PQpRV7ic4jcCuaMm5DDIIOOv2",
            "nameUserOferta": "Ronny Sotillet",
            "imgUserOferta": "https://lh3.googleusercontent.com/a-/AOh14GijzFS1dFSbNMN-anBXC7E8cjZeXBNbtgFx4nGuN-0=s96-c",
            "ProductImagesPublicacion": [
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc"
            ],
            "PreferencesPublicacion": []
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
        "idSala": "c14858c75f9b1c53d928ce2dc16af614100c2384",
        "status": 24,
        "datecreated": "04/02/2021",
        "idPublicacion": 59,
        "typepublication": 3,
        "namePublication": "pueba laptop 60",
        "ValorPublication": "1200000.0000",
        "Userpublication": "idfirebaseU4534dsaxgg",
        "nameUserPublication": "Carla Rodríguez Gil",
        "imgUserPublication": null,
        "idoferta": 14,
        "iduseroferta": "8e7PQpRV7ic4jcCuaMm5DDIIOOv2",
        "UserOferta": "8e7PQpRV7ic4jcCuaMm5DDIIOOv2",
        "nameUserOferta": "Ronny Sotillet",
        "imgUserOferta": "https://lh3.googleusercontent.com/a-/AOh14GijzFS1dFSbNMN-anBXC7E8cjZeXBNbtgFx4nGuN-0=s96-c",
        "PreferencesPublicacion": [],
        "aFavor": true,
        "Valorferta": "10000.0000",
        "dieferencia": "1190000.0000",
        "ItemOfer": [
            {
                "idpublication": 1,
                "nameproduct": "Kit dental",
                "status": 3,
                "img": "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2FzSiRYTbNbpW5vOQ6K6XpxvpKu2v1-2020-12-15%2014%3A53%3A04.710633.jpg?alt=media&token=536eeaba-ac5b-4b39-a2e0-0a170827cef0",
                "marketvalue": "10000.0000"
            }
        ],
        "isUserPubli": false,
        "match": 0
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
 * @api {put} /user/matchoffercr 5 matchoffercr
 * @apiName matchoffercr - Match de la oferta en la sala de chat
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
 * @apiParam {int} match required.
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
    "idNotificacion": 143,
    "idOferta": 3,
    "TypeNotification": 2,
    "UserPublication": "8e7PQpRV7ic4jcCuaMm5DDIIOOv2",
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
    "status": "500",
    "msg": "Error al intentar hacer mach en la sala de chat"
}
 **/

//CAMBIO DE ESTATUS DE UNA SALA DE CHAT - TAKASTEAR
router.post('/matchoffercr', rutasProtegidas, [
    check('idUser', 'El idUser es obligatorio').not().isEmpty().exists(),
    check('idSala', 'El idSala es obligatorio').not().isEmpty().exists(),
    check('match', 'El match es obligatorio').not().isEmpty().exists()
    ],async (req, res) => {
    
        const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }        
        let response = await userController.MatchOfferCR(req.body);
    
        if (response.status == 'ko') {
            return res.status(500).json({ error: 'Error' })
        }
        //console.log(response);
        return res.status(response.data.status).json(response.data)    
    }) 

/**
 * @api {post} /user/listnotifications 1 listnotifications
 * @apiName listnotifications - Listar los datos de la notificaciones 
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
            "idNotifications": 131,
            "dateNotifications": "05/02/2021",
            "statusNotifications": 1,
            "typenotifications": 2,
            "title": "Haz recibido una  oferta potencial para subastakear",
            "details": "¡En hora buena anailys rodriguez! tú Subastakas  <<Kit dental>> tiene una oferta por valor comercial de 10000",
            "idevento": 18,
            "idrelation": 1,
            "nameProducto": "Kit dental",
            "valueProducto": "10000.0000"
        },
        {
            "idNotifications": 130,
            "dateNotifications": "05/02/2021",
            "statusNotifications": 1,
            "typenotifications": 2,
            "title": "Haz recibido una  oferta potencial para subastakear",
            "details": "¡En hora buena anailys rodriguez! tú Subastakas  <<Kit dental>> tiene una oferta por valor comercial de 10000",
            "idevento": 17,
            "idrelation": 1,
            "nameProducto": "Kit dental",
            "valueProducto": "10000.0000"
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
 * @apiParam {varchar} DetailsPayments required.
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
    "idTTK": 10,
    "pinReference": "ccLctE",
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
    check('DetailsPayments', 'El detalle del pago es obligatorio').not().isEmpty().exists(),
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
        76,
        75,
        73,
        72
    ],
    "ticketsNoDispo": [],
    "DetailsPayments": "Pueden consignar a la siguiente cuenta de ahorros 373797347426 Bancolombia ",
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
 * @apiParam {varchar} flagTTK  optional. 0=Apartados, 1=Aceptadp, 2=Rechazado
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
            "idTombotakas": 5,
            "pinTombotakas": "MwkeQM",
            "timeremaining": 101860.24755,
            "nameTombotakas": "test Nueva Tombotakas",
            "statusTTK": 0,
            "datecreatedTTK": "2021-02-04",
            "pinreferenceTTK": "MwkeQM",
            "datelotTTK": "2020-11-25 19:47",
            "moneyTTK": 1,
            "priceTTK": "10000.0000",
            "imgTTK": [
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc"
            ],
            "numberticketsrs": [
                22
            ],
            "ticketsReservados": [
                {
                    "idNUmbre": 21,
                    "Number": 22,
                    "status": 4,
                    "NameUser": "Ronny Sotillet",
                    "phonenumber": null,
                    "email": "ronny.sotillet777@gmail.com",
                    "img": "https://lh3.googleusercontent.com/a-/AOh14GijzFS1dFSbNMN-anBXC7E8cjZeXBNbtgFx4nGuN-0=s96-c"
                }
            ]
        }
    ],
    "msgprocess": "Lista de los tickets Rechazados",
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
 * @api {post} /user/tombotakasgroup  10 tombotakasgroup
 * @apiName  tombotakasgroup - Grupo de Tombotakas con mis tikets apartados
 * @apiGroup Tombotakas
 * 
 *      
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * 
 *   
 * @apiParam {varchar} idfirebaseUser  required.
 * @apiParam {varchar} flagTTK  optional. 0=Apartados, 1=Aceptadp, 2=Rechazado
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
            "pinTombotakas": "Sx3Ev1",
            "timeremaining": 138204.73436666667,
            "nameTombotakas": "Botella de crema de whisky",
            "statusTTK": 0,
            "datecreatedTTK": "2020-12-16",
            "detailseventTTK": "Juega con la lotería de boyacá, ticket sin pagar no juega",
            "detailsAwardttk": "3 botellas de crema de whisky con su envase original",
            "detailsPayments": null,
            "datelotTTK": "2021-01-09 14:46",
            "moneyTTK": 0,
            "priceTTK": "5000.0000",
            "imgTTK": [
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2FzSiRYTbNbpW5vOQ6K6XpxvpKu2v1-2020-12-15%2015%3A02%3A12.241018.jpg?alt=media&token=d3c864f6-ff3c-44f8-b1f9-35ef1903b4d2",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-12-16%2014%3A48%3A11.734597.jpg?alt=media&token=9303b9b7-e007-4011-9af3-4842159ea2b5"
            ],
            "numberticketsrs": [
                2,
                61,
                62
            ],
            "ticketsReservados": [
                {
                    "idNUmbre": 1,
                    "Number": 2,
                    "status": 0
                },
                {
                    "idNUmbre": 1,
                    "Number": 61,
                    "status": 0
                },
                {
                    "idNUmbre": 1,
                    "Number": 62,
                    "status": 0
                }
            ]
        }
    ],
    "msgprocess": "Lista de todos los tickets",
    "msg": "Lista de tickets agrupados por tombotakas"
}
 *
 * @apiError UserNotFound The id of the Tombotakas was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status": "500",
    "msg": "Error al intentar Listar tickets agrupados por Tombotakas"
}
 */


//Crear Tombotakas- 
router.post('/tombotakasgroup', rutasProtegidas,[
    check('idfirebaseUser', 'El idfirebaseUser es obligatorio').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await userController.TombotakasGroup(req.body);

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

/**
 * @api {post} /user/tombotakasgroupcreator  6.1 tombotakasgroupcreator
 * @apiName  tombotakasgroupcreator -  Tombotakas Ticket reservados por clientes
 * @apiGroup Tombotakas
 * 
 *      
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * 
 *   
 * @apiParam {varchar} idfirebaseUser  required.
 * @apiParam {varchar} flagTTK  optional. 0=Apartados, 1=Aceptadp, 2=Rechazado
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
        "pinTombotakas": "Sx3Ev1",
        "timeremaining": 141356.95853333332,
        "nameTombotakas": "Botella de crema de whisky",
        "statusTTK": 27,
        "datecreatedTTK": "2020-12-16",
        "detailseventTTK": "Juega con la lotería de boyacá, ticket sin pagar no juega",
        "detailsAwardttk": "3 botellas de crema de whisky con su envase original",
        "detailsPayments": null,
        "datelotTTK": "2021-01-09 14:46",
        "moneyTTK": 0,
        "priceTTK": "5000.0000",
        "imgTTK": [
            "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2FzSiRYTbNbpW5vOQ6K6XpxvpKu2v1-2020-12-15%2015%3A02%3A12.241018.jpg?alt=media&token=d3c864f6-ff3c-44f8-b1f9-35ef1903b4d2",
            "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-12-16%2014%3A48%3A11.734597.jpg?alt=media&token=9303b9b7-e007-4011-9af3-4842159ea2b5"
        ],
        "Reservados": [
            {
                "Name": "Kenneth Rodriguez",
                "img": "https://lh3.googleusercontent.com/a-/AOh14GgSoPi6j7En1ynttbZGGLI0MIuugPr83Z2UAsBG-w=s96-c",
                "email": "kennet5h@gmail.com",
                "ticketsReservados": [
                    {
                        "id": 2,
                        "Number": 2,
                        "status": 1
                    },
                    {
                        "id": 10,
                        "Number": 15,
                        "status": 1
                    },
                    {
                        "id": 9,
                        "Number": 16,
                        "status": 1
                    },
                    {
                        "id": 8,
                        "Number": 17,
                        "status": 2
                    },
                    {
                        "id": 11,
                        "Number": 18,
                        "status": 1
                    },
                    {
                        "id": 6,
                        "Number": 61,
                        "status": 1
                    },
                    {
                        "id": 7,
                        "Number": 62,
                        "status": 1
                    }
                ]
            },
            {
                "Name": "Ronny Sotillet",
                "img": "https://lh3.googleusercontent.com/a-/AOh14GijzFS1dFSbNMN-anBXC7E8cjZeXBNbtgFx4nGuN-0=s96-c",
                "email": "ronny.sotillet777@gmail.com",
                "ticketsReservados": [
                    {
                        "id": 4,
                        "Number": 8,
                        "status": 1
                    },
                    {
                        "id": 3,
                        "Number": 9,
                        "status": 1
                    },
                    {
                        "id": 18,
                        "Number": 99,
                        "status": 1
                    }
                ]
            },
            {
                "Name": "Maria Fernanda Posada Jaimes",
                "img": "https://lh6.googleusercontent.com/-1446ykyfZMY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclQfbWnfwhL30c_xdiNJu_g8GHwmQ/s96-c/photo.jpg",
                "email": "asistente.organizacional@comfacundi.com.co",
                "ticketsReservados": [
                    {
                        "id": 5,
                        "Number": 23,
                        "status": 1
                    },
                    {
                        "id": 12,
                        "Number": 35,
                        "status": 1
                    },
                    {
                        "id": 13,
                        "Number": 47,
                        "status": 1
                    },
                    {
                        "id": 15,
                        "Number": 95,
                        "status": 1
                    },
                    {
                        "id": 16,
                        "Number": 96,
                        "status": 1
                    },
                    {
                        "id": 14,
                        "Number": 97,
                        "status": 1
                    },
                    {
                        "id": 17,
                        "Number": 98,
                        "status": 1
                    }
                ]
            }
        ]
    },
    "msgprocess": "Lista de todos los tickets",
    "msg": "Lista de tickets agrupados por Clientes"
}
 *
 * @apiError UserNotFound The id of the Tombotakas was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status": "500",
    "msg": "Error al intentar Listar tickets agrupados por Clientes"
}
 */


//Crear Tombotakas- 
router.post('/tombotakasgroupcreator', rutasProtegidas,[
    check('idfirebaseUser', 'El idfirebaseUser es obligatorio').not().isEmpty().exists(),
    check('idtombola', 'El idtombola es obligatorio').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await userController.TombotakasGroupCreator(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})


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
 * @apiParam {varchar} idfirebaseUserTTK  required.
 * @apiParam {int} Tickets  required Array.
 * @apiParam {int} idttk  required.
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
    "MsgStatus": "Ha aceptado la compra de éste ticket",
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
    "msdErro": "Ustede no es el anfitrión de la tombola",
    "msg": "Error al intentar procesar ticket"
}
 */


//Procesar Solicitud de un ticket- 
router.post('/processrequeststickets', rutasProtegidas,[
    check('idfirebaseUserTTK', 'El id del usuario dueño de la tombola es obligatorio').not().isEmpty().exists(),
    check('Tickets', 'El Array de tickets es obligatorio').not().isEmpty().exists(),
    check('idttk', 'El id de la srotakas a donde pertenece el tiket es obligatorio').not().isEmpty().exists(),
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
        "idTombotakas": 1,
        "pinTombotakas": "Sx3Ev1",
        "pertenece": false,
        "timeremaining": 37847.64008333333,
        "nameTombotakas": "Botella de crema de whisky",
        "statusTTK": 0,
        "datecreatedTTK": "2020-12-16",
        "detailseventTTK": "Juega con la lotería de boyacá, ticket sin pagar no juega",
        "detailsAwardttk": "3 botellas de crema de whisky con su envase original",
        "pinreferenceTTK": "Sx3Ev1",
        "datelotTTK": "2021-01-09 14:46",
        "moneyTTK": 0,
        "priceTTK": "5000.0000",
        "resultTTK": null,
        "imgTTK": [
            "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2FzSiRYTbNbpW5vOQ6K6XpxvpKu2v1-2020-12-15%2015%3A02%3A12.241018.jpg?alt=media&token=d3c864f6-ff3c-44f8-b1f9-35ef1903b4d2",
            "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-12-16%2014%3A48%3A11.734597.jpg?alt=media&token=9303b9b7-e007-4011-9af3-4842159ea2b5"
        ],
        "numberticketsrs": [
            8,
            9,
            15,
            16,
            17,
            18,
            23,
            35,
            47,
            95,
            96,
            97,
            98,
            99
        ],
        "ticketsReservados": [
            {
                "idNUmbre": 4,
                "Number": 8,
                "status": 1,
                "NameUser": "Ronny Sotillet",
                "phonenumber": null,
                "email": "ronny.sotillet777@gmail.com",
                "img": "https://lh3.googleusercontent.com/a-/AOh14GijzFS1dFSbNMN-anBXC7E8cjZeXBNbtgFx4nGuN-0=s96-c"
            },
            {
                "idNUmbre": 3,
                "Number": 9,
                "status": 1,
                "NameUser": "Ronny Sotillet",
                "phonenumber": null,
                "email": "ronny.sotillet777@gmail.com",
                "img": "https://lh3.googleusercontent.com/a-/AOh14GijzFS1dFSbNMN-anBXC7E8cjZeXBNbtgFx4nGuN-0=s96-c"
            },
            {
                "idNUmbre": 10,
                "Number": 15,
                "status": 1,
                "NameUser": "Kenneth Rodriguez",
                "phonenumber": null,
                "email": "kennet5h@gmail.com",
                "img": "https://lh3.googleusercontent.com/a-/AOh14GgSoPi6j7En1ynttbZGGLI0MIuugPr83Z2UAsBG-w=s96-c"
            },
            {
                "idNUmbre": 9,
                "Number": 16,
                "status": 1,
                "NameUser": "Kenneth Rodriguez",
                "phonenumber": null,
                "email": "kennet5h@gmail.com",
                "img": "https://lh3.googleusercontent.com/a-/AOh14GgSoPi6j7En1ynttbZGGLI0MIuugPr83Z2UAsBG-w=s96-c"
            },
            {
                "idNUmbre": 8,
                "Number": 17,
                "status": 2,
                "NameUser": "Kenneth Rodriguez",
                "phonenumber": null,
                "email": "kennet5h@gmail.com",
                "img": "https://lh3.googleusercontent.com/a-/AOh14GgSoPi6j7En1ynttbZGGLI0MIuugPr83Z2UAsBG-w=s96-c"
            },
            {
                "idNUmbre": 11,
                "Number": 18,
                "status": 1,
                "NameUser": "Kenneth Rodriguez",
                "phonenumber": null,
                "email": "kennet5h@gmail.com",
                "img": "https://lh3.googleusercontent.com/a-/AOh14GgSoPi6j7En1ynttbZGGLI0MIuugPr83Z2UAsBG-w=s96-c"
            },
            {
                "idNUmbre": 5,
                "Number": 23,
                "status": 1,
                "NameUser": "Maria Fernanda Posada Jaimes",
                "phonenumber": null,
                "email": "asistente.organizacional@comfacundi.com.co",
                "img": "https://lh6.googleusercontent.com/-1446ykyfZMY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclQfbWnfwhL30c_xdiNJu_g8GHwmQ/s96-c/photo.jpg"
            },
            {
                "idNUmbre": 12,
                "Number": 35,
                "status": 1,
                "NameUser": "Maria Fernanda Posada Jaimes",
                "phonenumber": null,
                "email": "asistente.organizacional@comfacundi.com.co",
                "img": "https://lh6.googleusercontent.com/-1446ykyfZMY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclQfbWnfwhL30c_xdiNJu_g8GHwmQ/s96-c/photo.jpg"
            },
            {
                "idNUmbre": 13,
                "Number": 47,
                "status": 1,
                "NameUser": "Maria Fernanda Posada Jaimes",
                "phonenumber": null,
                "email": "asistente.organizacional@comfacundi.com.co",
                "img": "https://lh6.googleusercontent.com/-1446ykyfZMY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclQfbWnfwhL30c_xdiNJu_g8GHwmQ/s96-c/photo.jpg"
            },
            {
                "idNUmbre": 15,
                "Number": 95,
                "status": 1,
                "NameUser": "Maria Fernanda Posada Jaimes",
                "phonenumber": null,
                "email": "asistente.organizacional@comfacundi.com.co",
                "img": "https://lh6.googleusercontent.com/-1446ykyfZMY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclQfbWnfwhL30c_xdiNJu_g8GHwmQ/s96-c/photo.jpg"
            },
            {
                "idNUmbre": 16,
                "Number": 96,
                "status": 1,
                "NameUser": "Maria Fernanda Posada Jaimes",
                "phonenumber": null,
                "email": "asistente.organizacional@comfacundi.com.co",
                "img": "https://lh6.googleusercontent.com/-1446ykyfZMY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclQfbWnfwhL30c_xdiNJu_g8GHwmQ/s96-c/photo.jpg"
            },
            {
                "idNUmbre": 14,
                "Number": 97,
                "status": 1,
                "NameUser": "Maria Fernanda Posada Jaimes",
                "phonenumber": null,
                "email": "asistente.organizacional@comfacundi.com.co",
                "img": "https://lh6.googleusercontent.com/-1446ykyfZMY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclQfbWnfwhL30c_xdiNJu_g8GHwmQ/s96-c/photo.jpg"
            },
            {
                "idNUmbre": 17,
                "Number": 98,
                "status": 1,
                "NameUser": "Maria Fernanda Posada Jaimes",
                "phonenumber": null,
                "email": "asistente.organizacional@comfacundi.com.co",
                "img": "https://lh6.googleusercontent.com/-1446ykyfZMY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclQfbWnfwhL30c_xdiNJu_g8GHwmQ/s96-c/photo.jpg"
            },
            {
                "idNUmbre": 18,
                "Number": 99,
                "status": 1,
                "NameUser": "Maria Fernanda Posada Jaimes",
                "phonenumber": null,
                "email": "asistente.organizacional@comfacundi.com.co",
                "img": "https://lh6.googleusercontent.com/-1446ykyfZMY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclQfbWnfwhL30c_xdiNJu_g8GHwmQ/s96-c/photo.jpg"
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

//CREAR NUEVA PQRS WEB - 
router.post('/pqrsweb', [
    check('name', 'El nombre es obligatorio').not().isEmpty().exists(),
    check('email', 'El email es obligatorio').not().isEmpty().exists(),
    check('message', 'El mensaje es obligatorio').not().isEmpty().exists(),
    check('flagPQRs', 'El flagPQRs es obligatorio').not().isEmpty().exists()
], async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');


    const error = validationResult(req);
    console.log('pqrsweb');

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await userController.pqrsweb(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})

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
 * @apiParam {int} UseSubastakas  required.
 * @apiParam {int} SizeSubastakas  required.
 * @apiParam {int} WeightSubastakas  optional.
 * @apiParam {int} ValueWeightProduct  optional.
 * @apiParam {smallint} UnitOfMeasurementP  optional.
 * 
 * 
 * 
 * @apiSuccess {boolean} success of the Subastakas.
 * @apiSuccess {int} status 200 of the Subastakas.
 * @apiSuccess {string} msg   of the Subastakas.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   {
    "success": true,
    "status": "200",
    "idsubastakas": 51,
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
    check('subcategorySubastakas', 'Desbes definir la subcategoría es requerida').not().isEmpty().exists(),
    check('SizeSubastakas', 'El tamaño es requerido').not().isEmpty().exists(),
    check('WeightSubastakas', 'El peso es requerido').not().isEmpty().exists(),
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
 *        {
    "success": true,
    "status": "200",
    "data": [
        {
            "idproduct": 60,
            "datecreated": "0NaN-aN-aN aN:aN:aN",
            "activityTime": true,
            "Anfitrion": false,
            "TimeTotal": -718200000,
            "TimeEnd": -624714916,
            "flagInterested": false,
            "started": true,
            "finished": false,
            "begin": "2021-02-03 12:30:00",
            "end": "2021-02-11 20:00:00",
            "iduser": "idfirebaseU4534dsaxgg",
            "nuevo": false,
            "subcategory": 4,
            "name": "pueba laptop 60",
            "details": "Hp Procesador intel core i7",
            "typemoney": 2,
            "marketvalue": "1200000.0000",
            "typepublication": 3,
            "conditions": 1,
            "size": 1,
            "weight": 1,
            "status": 0,
            "editable": true,
            "CantidadOfertas": 0,
            "ProductImages": [
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc"
            ]
        },
        {
            "idproduct": 59,
            "datecreated": "0NaN-aN-aN aN:aN:aN",
            "activityTime": true,
            "Anfitrion": false,
            "TimeTotal": -509400000,
            "TimeEnd": -415914838,
            "flagInterested": false,
            "started": true,
            "finished": false,
            "begin": "2021-02-03 12:30:00",
            "end": "2021-02-09 10:00:00",
            "iduser": "idfirebaseU4534dsaxgg",
            "nuevo": false,
            "subcategory": 4,
            "name": "pueba laptop 60",
            "details": "Hp Procesador intel core i7",
            "typemoney": 2,
            "marketvalue": "1200000.0000",
            "typepublication": 3,
            "conditions": 1,
            "size": 1,
            "weight": 1,
            "status": 0,
            "editable": true,
            "CantidadOfertas": 10,
            "ProductImages": [
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc"
            ]
        }
    ],
    "msg": "Lista de Subastakas"
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
    check('idfirebaseUser', 'El idfirebaseUser es obligatorio').not().isEmpty().exists()
    ],async (req, res) => {
        //
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
 *    {
    "success": true,
    "status": "200",
    "data": [
        {
            "idproduct": 59,
            "datecreated": "0NaN-aN-aN aN:aN:aN",
            "activityTime": true,
            "Anfitrion": true,
            "TimeTotal": -509400000,
            "TimeEnd": -415754770,
            "flagInterested": false,
            "started": true,
            "finished": false,
            "begin": "2021-02-03 12:30:00",
            "end": "2021-02-09 10:00:00",
            "iduser": "idfirebaseU4534dsaxgg",
            "nuevo": false,
            "subcategory": 4,
            "name": "pueba laptop 60",
            "details": "Hp Procesador intel core i7",
            "typemoney": 2,
            "marketvalue": "1200000.0000",
            "typepublication": 3,
            "conditions": 1,
            "size": 1,
            "weight": 1,
            "status": 0,
            "editable": true,
            "CantidadOfertas": 10,
            "ProductImages": [
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc"
            ]
        },
        {
            "idproduct": 60,
            "datecreated": "0NaN-aN-aN aN:aN:aN",
            "activityTime": true,
            "Anfitrion": true,
            "TimeTotal": -718200000,
            "TimeEnd": -624554663,
            "flagInterested": false,
            "started": true,
            "finished": false,
            "begin": "2021-02-03 12:30:00",
            "end": "2021-02-11 20:00:00",
            "iduser": "idfirebaseU4534dsaxgg",
            "nuevo": false,
            "subcategory": 4,
            "name": "pueba laptop 60",
            "details": "Hp Procesador intel core i7",
            "typemoney": 2,
            "marketvalue": "1200000.0000",
            "typepublication": 3,
            "conditions": 1,
            "size": 1,
            "weight": 1,
            "status": 0,
            "editable": true,
            "CantidadOfertas": 0,
            "ProductImages": [
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
    check('idfirebaseUser', 'El idfirebaseUser es obligatorio').not().isEmpty().exists()
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
 * @apiParam {boolean} FlagInterested required.
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
    "Interested": true,
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
    check('IdSubastakas', 'El IdSubastakas es obligatorio').not().isEmpty().exists(),
    check('FlagInterested', 'El FlagInterested es obligatorio').not().isEmpty().exists()
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

router.post('/interestedproduct', rutasProtegidas, [
    check('IdUserProduct', 'El IdUserProduct  es obligatorio').not().isEmpty().exists(),
    check('IdProduct', 'El IdProduct  es obligatorio').not().isEmpty().exists(),
    check('FlagInterested', 'El FlagInterested es obligatorio').not().isEmpty().exists()
    ],async (req, res) => {
    
        const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }
        let response = await userController.InterestedProduct(req.body);
    
        if (response.status == 'ko') {
            return res.status(500).json({ error: 'Error' })
        }
        console.log(response);
        return res.status(response.data.status).json(response.data)
    
    })  ;  

//////////////////

    /**
 * @api {post} /user/interestedproduct 5 interestedproduct
 * @apiName interestedproduct - Me interesa Product
 * @apiGroup Takas
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
 * @apiParam {boolean} FlagInterested required.
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
    "Interested": true,
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
    "msg": "Error al intentar registar Takas como me interesa"
}
 **/

router.post('/interestedproduct2 ', rutasProtegidas, [
    check('IdUserProduct ', 'El IdUserProduct  es obligatorio').not().isEmpty().exists(),
    check('IdProduct ', 'El IdProduct  es obligatorio').not().isEmpty().exists(),
    check('FlagInterested', 'El FlagInterested es obligatorio').not().isEmpty().exists()
    ],async (req, res) => {
    
        const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }
        let response = await userController.InterestedProduct(req.body);
    
        if (response.status == 'ko') {
            return res.status(500).json({ error: 'Error' })
        }
        console.log(response);
        return res.status(response.data.status).json(response.data)
    
    })    

//////////////////

/**
 * @api {post} /user/listodo 6 listodo
 * @apiName listodo - Listar todas Publicaciones
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
    "data": [
        {
            "idproduct": 1,
            "flagInterested": false,
            "datecreated": "2020-12-15 16:40:41",
            "begin": "2020-12-20T17:30:00.000Z",
            "end": "2020-12-22T01:00:00.000Z",
            "iduser": "idfirebaseU4534dsaxgg",
            "nuevo": false,
            "subcategory": 4,
            "name": "pueba laptop 23",
            "details": "Hp Procesador intel core i7",
            "typemoney": 2,
            "marketvalue": "1200000.0000",
            "typepublication": 3,
            "conditions": 1,
            "size": 1,
            "weight": 1,
            "status": 0,
            "editable": false,
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
        {
            "idproduct": 2,
            "flagInterested": false,
            "datecreated": "2020-12-15 16:41:37",
            "begin": "2020-12-20T17:30:00.000Z",
            "end": "2020-12-22T01:00:00.000Z",
            "iduser": "idfirebaseU4534dsaxgg",
            "nuevo": false,
            "subcategory": 4,
            "name": "pueba laptop 23",
            "details": "Hp Procesador intel core i7",
            "typemoney": 2,
            "marketvalue": "1200000.0000",
            "typepublication": 3,
            "conditions": 1,
            "size": 1,
            "weight": 1,
            "status": 0,
            "editable": false,
            "CantidadOfertas": 0,
            "ProductImages": [
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
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
        {
            "idproduct": 3,
            "flagInterested": false,
            "datecreated": "2020-12-15 17:10:54",
            "begin": null,
            "end": null,
            "iduser": "zSiRYTbNbpW5vOQ6K6XpxvpKu2v1",
            "nuevo": false,
            "subcategory": 4,
            "name": "pueba laptop 4",
            "details": "Hp Procesador intel core i7",
            "typemoney": 2,
            "marketvalue": "1200000.0000",
            "typepublication": 1,
            "conditions": 1,
            "size": 18,
            "weight": 19,
            "status": 0,
            "editable": false,
            "CantidadOfertas": 0,
            "ProductImages": [
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc"
            ],
            "Preferences": [
                1
            ]
        },
        {
            "idproduct": 4,
            "flagInterested": false,
            "datecreated": "2020-12-15 17:11:32",
            "begin": null,
            "end": null,
            "iduser": "zSiRYTbNbpW5vOQ6K6XpxvpKu2v1",
            "nuevo": false,
            "subcategory": 4,
            "name": "pueba laptop 4",
            "details": "Hp Procesador intel core i7",
            "typemoney": 2,
            "marketvalue": "1200000.0000",
            "typepublication": 1,
            "conditions": 1,
            "size": 18,
            "weight": 19,
            "status": 0,
            "editable": false,
            "CantidadOfertas": 0,
            "ProductImages": [
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc"
            ],
            "Preferences": [
                1
            ]
        },
        {
            "idproduct": 5,
            "flagInterested": true,
            "datecreated": "2020-12-15 19:08:42",
            "begin": "2020-12-15T17:30:00.000Z",
            "end": "2020-12-22T01:00:00.000Z",
            "iduser": "idfirebaseU4534dsaxgg",
            "nuevo": false,
            "subcategory": 4,
            "name": "pueba laptop 23",
            "details": "Hp Procesador intel core i7",
            "typemoney": 2,
            "marketvalue": "1200000.0000",
            "typepublication": 3,
            "conditions": 1,
            "size": 1,
            "weight": 1,
            "status": 0,
            "editable": false,
            "CantidadOfertas": 0,
            "ProductImages": [
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc"
            ],
            "Preferences": []
        }
    ],
    "msg": "Listar Todas las publicaciones"
}
 *
 * @apiError UserNotFound The id of the Product was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al Listar todas las Publicaciones"
}
 **/

//LISTAR DE DETALLES DE LA SUBASTAKAS
router.post('/listodo', rutasProtegidas, [
    check('IdUserSubastakas', 'El IdUserSubastakas es obligatorio').not().isEmpty().exists()
    ],async (req, res) => {
    
        const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }
        let response = await userController.LisTodo(req.body);
    
        if (response.status == 'ko') {
            return res.status(500).json({ error: 'Error' })
        }
        //console.log(response);
        return res.status(response.data.status).json(response.data)
    
    })

/**
 * @api {post} /user/minterestedsubastakas 7 minterestedsubastakas
 * @apiName minterestedsubastakas - Listar Las Subastakas marcadas como de Interés
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
 * 
 * 
 * @apiSuccess {boolean} success of the Product.
 * @apiSuccess {int} status 200 of the Product.
 * @apiSuccess {string} msg   of the Product.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "success": true,
    "status": "200",
    "data": [
        {
            "idproduct": 59,
            "datecreated": "0NaN-aN-aN aN:aN:aN",
            "activityTime": true,
            "Anfitrion": false,
            "TimeTotal": -509400000,
            "TimeEnd": -405911210,
            "flagInterested": true,
            "started": true,
            "finished": false,
            "begin": "2021-02-03 12:30:00",
            "end": "2021-02-09 10:00:00",
            "iduser": "8e7PQpRV7ic4jcCuaMm5DDIIOOv2",
            "nuevo": false,
            "subcategory": 4,
            "name": "pueba laptop 60",
            "details": "Hp Procesador intel core i7",
            "typemoney": 2,
            "marketvalue": "1200000.0000",
            "typepublication": 3,
            "conditions": 1,
            "size": 1,
            "weight": 1,
            "status": 0,
            "editable": true,
            "CantidadOfertas": 10,
            "ProductImages": [
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc"
            ]
        }
    ],
    "msg": "Lista de Subastakas marcadas como interesantes"
}
 *
 * @apiError UserNotFound The id of the Product was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al Listar Subastakas marcadas como interesantes"
}
 **/

//LISTAR MIS SUABASTAKAS INTERESADAS
router.post('/minterestedsubastakas', rutasProtegidas, [
    check('idfirebaseUser', 'El idfirebaseUser es obligatorio').not().isEmpty().exists()
    ],async (req, res) => {
        
        const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }
    
        let response = await userController.MInterestedSubasTakas(req.body);
    
        if (response.status == 'ko') {
            return res.status(500).json({ error: 'Error' })
        }
        //console.log(response);
        return res.status(response.data.status).json(response.data)
    
    })
    ///////
//SALAS SUBASTAKAS
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
 * @apiParam {int} idUserFirabase required.
 * @apiParam {int} idSubastakas required.
 * 
 * 
 * 
 * @apiSuccess {boolean} success of the Offers.
 * @apiSuccess {int} status 200 of the Offers.
 * @apiSuccess {string} msg   of the Offers.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
    "success": true,
    "status": "200",
    "data": {
        "IdSAla": "a10531f9f302177ecbd30ef97ac9fcbeab88265c",
        "idproduct": 5,
        "datecreated": "2020-12-15 19:08",
        "started": true,
        "finished": false,
        "begin": "2020-12-15 12:30",
        "end": "2020-12-21 20:00",
        "statusSubasta": 43,
        "msg": "Que gane el mejor postor! en la subasta de << pueba laptop 23 >>"
    }
}
 *
 * @apiError UserNotFound The id of the Offers was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *  {
        "success": false,
        "status":: "500",
        "msg": "Error al intentar Obtener la Sala de la Subastakas"
    }
 **/

//CAMBIO DE ESTATUS DE UNA SUBASTAKAS - SUBASTAKAS
router.post('/getchatroomsubastakas', rutasProtegidas, [
    check('idUserFirabase', 'El idUserFirabase es obligatorio').not().isEmpty().exists(),
    check('idSubastakas', 'El idSubastakas es obligatorio').not().isEmpty().exists()
    // check('FlagStatusSubastakas', 'El FlagStatusSubastakas es obligatorio').not().isEmpty().exists()
    ],async (req, res) => {
    
        const error = validationResult(req);

        if (error.array().length != 0) {
            return res.status(422).json({ errores: error.array(), msg: 'Error' });
        }        
        let response = await userController.GetChatRoomSubastakas(req.body);
    
        if (response.status == 'ko') {
            return res.status(500).json({ error: 'Error' })
        }
        //console.log(response);
        return res.status(response.data.status).json(response.data)
    
    }) 
// router.put('/changestatusubastakas', rutasProtegidas, [
//     check('idUserFirabase', 'El idUserFirabase es obligatorio').not().isEmpty().exists(),
//     check('idSubastakas', 'El idSubastakas es obligatorio').not().isEmpty().exists(),
//     check('FlagStatusSubastakas', 'El FlagStatusSubastakas es obligatorio').not().isEmpty().exists()
//     ],async (req, res) => {
    
//         const error = validationResult(req);

//         if (error.array().length != 0) {
//             return res.status(422).json({ errores: error.array(), msg: 'Error' });
//         }        
//         let response = await userController.ChangeStatusOffer(req.body);
    
//         if (response.status == 'ko') {
//             return res.status(500).json({ error: 'Error' })
//         }
//         //console.log(response);
//         return res.status(response.data.status).json(response.data)
    
//     }) 

/*************************************/
/**************** User Admin******************/


/**
 * @api {post} /user/newUser_Admin  
 * @apiName  newUser - Registro De Usuario Admin
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
router.post('/newUser_Admin', [
    check('idfirebaseUser', 'El idfirebase es obligatorio').not().isEmpty().exists(),
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

    let response = await useradmincontroller.newUser_Admin(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    console.log(response);
    return res.status(response.data.status).json(response.data)

})
/******* */

/**
 * @api {post} /user/autenticar_admin
 * @apiName autenticarAdmin - Login UserAdmin
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
    "success": true,
    "status": "200",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MTA0OTAxMDAsImV4cCI6MTYxMzA4MjEwMH0.5wtRrcb4xd08T7VlIlzMYTmdwjhLPFdb3rPavquOo7I",
    "Email": "anailysrodriguez@gmail.com",
    "Fullname": "anailys rodriguez",
    "PhoneNumber": null,
    "ImgUrl": "https://lh3.googleusercontent.com/a-/AOh14GghAJLELlkIz090ubKjqqHdki33JMljFn5d3RHVF4Q=s96-c",
    "msg": "Usuario Autenticado con éxito"
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
router.post('/autenticar_admin', [
    check('idfirebaseUser', 'El idfirebase el obligatorio').not().isEmpty().exists(),
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



   

module.exports = router;