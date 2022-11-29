const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const rutasProtegidas = require('../../lib/rutasprotegidas');
const notifications = require('../../lib/notifications.js');
const config = require('../../config/config');
const {isLoggedIn} = require('../../lib/auth');
const { check, validationResult } = require('express-validator');
const AdminController = require('../../controllers/admincontroller');

var sess; 
//let AdminController = {};

/**
 * @api {get} /user/listprivilege 1.0 listprivilege
 * @apiName listprivilege - Listar Tipo de Privilegios
 * @apiGroup NewUser
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
    "status": "200",
    "data": [
        {
            "id": 1,
            "privilege": "Admin",
            "status": 1
        },
        {
            "id": 2,
            "privilege": "Aux",
            "status": 1
        },
        {
            "id": 3,
            "privilege": "PQRS",
            "status": 1
        }
    ],
    "msg": "Lista de Tipo de Privilegios"
}
 *
 * @apiError UserNotFound The id of the Category was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status":: "500",
    "msg": "Error al Listar Tipo de Privilegios"
}
 */
//Listar tipos de privilegios
router.get('/listprivilege', rutasProtegidas, async (req, res) => {


    let response = await AdminController.ListPrivilege();

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})


router.post('/autenticar', (req, res) => {
    if(req.body.usuario === "asfo" && req.body.contrasena === "holamundo") {
  const payload = {
   check:  true
  };
  const token = jwt.sign(payload, app.get('llave'), {
   expiresIn: 1440
  });
  res.json({
   mensaje: 'Autenticación correcta',
   token: token
  });
    } else {
        res.json({ mensaje: "Usuario o contraseña incorrectos"})
    }
});

//Crear códogo de registro nuevo usuario
/**
 * @api {post} /admin/createcode  1.1 createcode
 * @apiName  createcode - Crear código de registro de nuevo usuario
 * @apiGroup NewUser
 * 
 *      
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * 
 *   
 * @apiParam {varchar} IdUserCreator  required..
 * @apiParam {int} Privilegio  required..
 
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
    "code": "DYLUxwrHQvWssN5x9",
    "msg": "Código creado exitosamente"
}
 *
 * @apiError UserNotFound The id of the PQRs was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status": "500",
    "msg": "Error al intentar crear una código de registro"
}
 */

//CREAR CÓDIGO PARA REISTRO DE NUEVO USUARIO
router.post('/createcode',[
    check('IdUserCreator', 'El ID del usuario creador del código es obligatorio').not().isEmpty().exists(),
    check('Privilegio', 'El privilegio es obligatorio').not().isEmpty().exists()
  ], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await AdminController.CreateCode(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})

//Crear  nuevo usuario administrativo
/**
 * @api {post} /admin/newadminuser  1.2 newadminuser
 * @apiName  newadminuser - Crear nuevo usuario administrativo
 * @apiGroup NewUser
 * 
 *      
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * 
 *   
 * @apiParam {varchar} codeAdmin  required..
 * @apiParam {varchar} userAdmin  required.
 * @apiParam {varchar} emailAdmin required.
 * @apiParam {varchar} passwordAdmin  required.
 * @apiParam {varchar} numberPhoneAdmin  required.
 * @apiParam {varchar} imgUrlAdmin  optional.
 
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
    "msg": "Usuario Administrativo creado exitosamente"
}
 *
 * @apiError UserNotFound The id of the PQRs was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status": "500",
    "msg": "Error al intentar crear Nuevo usuario"
}
 */

//CREAR CÓDIGO PARA REISTRO DE NUEVO USUARIO
router.post('/newadminuser',[
    check('codeAdmin', 'El ID del codeAdmin creador del código es obligatorio').not().isEmpty().exists(),
    check('userAdmin', 'El userAdmin es obligatorio').not().isEmpty().exists(),
    check('emailAdmin', 'El emailAdmin es obligatorio').not().isEmpty().exists(),
    check('passwordAdmin', 'El passwordAdmin es obligatorio').not().isEmpty().exists(),
    check('numberPhoneAdmin', 'El numberPhoneAdmin es obligatorio').not().isEmpty().exists()
  ], async (req, res) => {

    sess=req.session;
    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await AdminController.NewAdminUser(req.body,sess);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    console.log("sess");
    console.log(sess);
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})

/**
 * @api {post} /admin/loginadminuser  1.3 loginadminuser
 * @apiName  loginadminuser - Login usuario administrativo
 * @apiGroup NewUser
 * 
 *      
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * @apiHeaderExample {varchar} access-token 
 *                 "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MTE4NTk3NjUsImV4cCI6MTYxNDQ1MTc2NX0.Mn0SRK9PFH67fT-3r24IdaT4VqeFhT7OHC7reMldLgo" 
 *
 * 
 *   
 * @apiParam {varchar} User unique required.
 * @apiParam {varchar} passwordUser  required .
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
    "status": "200",
    "idUser": "H0ex4LYkUlqqcVJ2m",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ25vcmVFeHBpcmF0aW9uIjp0cnVlLCJpYXQiOjE2MjA1MDA2OTIsImV4cCI",
    "msg": "Usuario logueado con éxito"
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

        router.post('/loginadminuser',[
             check('userAdmin', 'El userAdmin es obligatorio').not().isEmpty().exists(),
             check('PasswordAdmin', ' La contraseña es obligatoria').not().isEmpty().exists()
         
         ], async (req, res) => {
        
            //console.log(req.session.auth);
         
             const error = validationResult(req);
         
             if (error.array().length != 0) {
                 return res.status(422).json({ errores: error.array(), msg: 'Error' });
             }
             sess=req.session;
             // console.log("Members");
             // res.send({'string':'Anailys','proyecto':'QUICKK','number':1,'boolean':true});
             let response = await AdminController.LoginAdminUser(req.body,sess);
         
             if (response.status == 'ko') {
                 return res.status(500).json({ error: 'Error' })
             }
        
             //sess=req.session;
            //req.session.auth=true;
            console.log(req.session);
        
             //console.log(response);
             return res.status(response.data.status).json(response.data)
         })

//Respuesta pqrs
/**
 * @api {post} /admin/responsepqrs  2 responsepqrs
 * @apiName  responsepqrs - Crear respuesta de nueva PQRs
 * @apiGroup PQRs
 * 
 *      
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * 
 *   
 * @apiParam {varchar} idPQRs  required.
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
    "msg": "Se ha creado respuesta a la PQRs exitosamente"
}
 *
 * @apiError UserNotFound The id of the PQRs was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status": "500",
    "msg": "Error al intentar crear una respuesta para  PQRs"
}
 */

//CREAR RESPUESTA DE PQRs- 
router.post('/responsepqrs', [
    check('idPQRs', 'El idPQRs es obligatorio').not().isEmpty().exists(),
    check('idfirebaseUser', 'El idfirebaseUser es obligatorio').not().isEmpty().exists(),
    check('detailsPQRs', 'El detailsPQRs es obligatorio').not().isEmpty().exists(),
    check('flagPQRs', 'El flagPQRs es obligatorio').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await AdminController.ResponsePQRs(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})



//Respuesta pqrs
/**
 * @api {post} /admin/gestionmembership  2 gestionmembership
 * @apiName  gestionmembership - Gestionar Membresías
 * @apiGroup Memberships
 * 
 *      
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * 
 *   
 * @apiParam {varchar} idfirebaseUser  required.
 * @apiParam {int} flagMembership required. Aprobada=1, Expirada=2, Cancelada=3, Rechazada=4
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
    "msg": "Solicitud Procesada con éxito"
}
 *
 * @apiError UserNotFound The id of the Memberships was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status": "500",
    "msg": "Error al intentar Procesar la solicitud solicitud"
}
 */

//Gestionar membresías- 
router.post('/gestionmembership', rutasProtegidas,[
    check('idfirebaseUser', 'El idfirebaseUser es obligatorio').not().isEmpty().exists(),
    check('flagMembership', 'El flagMembership es obligatorio').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await AdminController.GestionMembership(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})


//List Users
/**
 * @api {post} /admin/listusers  8 listusers
 * @apiName  listusers - Gestionar Membresías
 * @apiGroup User
 * 
 *      
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * 
 *   
 * @apiParam {varchar} TypeConsulta  Reqired. Sin Filtro = 0, Filtro por Usuario=1, Filtro Membresía=2, Filtro Status User=3, Filtro Membresía y status=4, Filtro por fecha de registro=5, Filtro por fecha de Membresía=6, Filtro por Membresía=7
 * @apiParam {varchar} idfirebaseUser  Optional.
 * @apiParam {varchar} dateRegMem  Optional.
 * @apiParam {int} Memberships Optional. Free=0, Suprime=1
 * @apiParam {int} flagstatusMemberships Optional. Solicitud en revisión=0, Aprobada=1, Expirada=2, Cancelada=3, Rechazada=4
 * @apiParam {int} flagStatusUser Optional. Activo=0, Inactivo=1
 * 
 *
 * @apiSuccess {boolean} success of the Users.
 * @apiSuccess {int} status 200 of the Users.
 * @apiSuccess {string} msg   of the Users.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
{
    "success": true,
    "status": "200",
    "data": [
        {
            "id": "8e7PQpRV7ic4jcCuaMm5DDIIOOv2",
            "idcity": null,
            "tokenpush": "d9wYESVb9q8:APA91bGmzQ5ZjRgZwRfd7zTJr_XWsI6NY0NkMsrEV7E05uIZhwEK-S1ktWqsMZCI0EL85iuweAyTYze49xm9fAdIuA-lhPFsmSokW_JiM9Wi-gr_jONk4TiXVXQM0Mt0vqhJKM4FbY8o",
            "email": "ronny.sotillet777@gmail.com",
            "memberships": 2,
            "datememberships": "2020-11-27T05:01:17.000Z",
            "statusmemberships": 39,
            "phonenumber": null,
            "phonenumber2": null,
            "datebirth": null,
            "country": null,
            "department": null,
            "address": null,
            "fullname": "Ana",
            "firstname": null,
            "secondname": null,
            "firstsurname": null,
            "secondsurname": null,
            "password": null,
            "imgurl": "https://scontent.fbog9-1.fna.fbcdn.net/v/t1.0-9/123087363_10224035495334302_417571382738385553_o.jpg?_nc_cat=103&ccb=2&_nc_sid=09cbfe&_nc_ohc=VGrhqTFkWmwAX-Zxk-R&_nc_ht=scontent.fbog9-1.fna&oh=a65b30d",
            "score": null,
            "online": null,
            "role": 2,
            "status": null,
            "datecreated": null,
            "tyc": 1
        },
        {
            "id": "EVln0Vj6DNOtTXQVS2fN9P68Gl13",
            "idcity": null,
            "tokenpush": null,
            "email": "rafael@faria.com",
            "memberships": null,
            "datememberships": null,
            "statusmemberships": null,
            "phonenumber": "3116623665",
            "phonenumber2": null,
            "datebirth": null,
            "country": null,
            "department": null,
            "address": null,
            "fullname": "ronny",
            "firstname": null,
            "secondname": null,
            "firstsurname": null,
            "secondsurname": null,
            "password": "8bc5de83cf1daf79ed5b2f13f93d7c05d01d0388",
            "imgurl": "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/profile%2FEVln0Vj6DNOtTXQVS2fN9P68Gl13-2020-10-23%2014%3A30%3A07.496425.jpg?alt=media&token=62aeb4a7-a7fc-444d-9b3e-9550d216d499",
            "score": null,
            "online": null,
            "role": 2,
            "status": null,
            "datecreated": "2020-10-24T00:30:13.000Z",
            "tyc": 1
        },
        {
            "id": "idfirebaseU4534dsaxgg",
            "idcity": 1,
            "tokenpush": null,
            "email": "emailUser12@gmail.com",
            "memberships": null,
            "datememberships": null,
            "statusmemberships": null,
            "phonenumber": null,
            "phonenumber2": null,
            "datebirth": null,
            "country": null,
            "department": null,
            "address": null,
            "fullname": "gusuario12",
            "firstname": null,
            "secondname": null,
            "firstsurname": null,
            "secondsurname": null,
            "password": null,
            "imgurl": null,
            "score": null,
            "online": null,
            "role": 2,
            "status": null,
            "datecreated": null,
            "tyc": 1
        },
        {
            "id": "idfirebaseU4534dsaxgg4",
            "idcity": null,
            "tokenpush": null,
            "email": "gusuario124@gmail.com",
            "memberships": null,
            "datememberships": null,
            "statusmemberships": null,
            "phonenumber": null,
            "phonenumber2": null,
            "datebirth": null,
            "country": null,
            "department": null,
            "address": null,
            "fullname": "gusuario12",
            "firstname": null,
            "secondname": null,
            "firstsurname": null,
            "secondsurname": null,
            "password": null,
            "imgurl": null,
            "score": null,
            "online": null,
            "role": 2,
            "status": null,
            "datecreated": null,
            "tyc": 1
        }
    ],
    "msg": "Lista de usuarios con éxito"
}
 *
 * @apiError UserNotFound The id of the Users was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status": "500",
    "msg": "Error al intentar Listar Usuarios"
}
 */

//Listar Usuarios- 
router.post('/listusers',[
    check('TypeConsulta', 'El TypeConsulta es obligatorio').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await AdminController.ListUsers(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})

//Listar Admin- 
router.post('/listadmin',[
    check('TypeConsulta', 'El TypeConsulta es obligatorio').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await AdminController.ListAdmins(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})

//Cambiar status Admin- 
router.post('/changestatusadmin',[
    check('statusAdmin', 'El statusAdmin es obligatorio').not().isEmpty().exists(),
    check('codeAdmin', 'El codeAdmin es obligatorio').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await AdminController.ChangeStatusAdmin(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})


//listar las publicaciones de un User- 
router.post('/listpublicationsuser',[
    check('idUser', 'El idUser es obligatorio').not().isEmpty().exists(),
    check('statusPublications', 'El statusPublications es obligatorio').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await AdminController.ChangeStatusAdmin(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})

//listar las publicaciones de un User- 
router.post('/listpublicationsuserid',[
    check('idUser', 'El idUser es obligatorio').not().isEmpty().exists(),
    check('statusP', 'El statusPublications es obligatorio').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await AdminController.ListPublicationsUserId(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})





//Listar Publicaciones 
/**
 * @api {post} /admin/listpublications  12 listpublications
 * @apiName  listpublications - Listar Publicaciones 
 * @apiGroup Product
 * 
 *      
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * 
 *   
 * @apiParam {varchar} TypeP  Reqired. Takastear = 0, Subastakear=1, Servitakastear=2
 * @apiParam {varchar} StatusP  Reqired. ACTIVA = 0, TAKASTEADO=1, DESHABILITADA=2, EDITADA=2

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
    "data": [
        {
            "id": 1,
            "new": null,
            "datepublication": "2020-10-24T00:32:10.000Z",
            "iduser": "EVln0Vj6DNOtTXQVS2fN9P68Gl13",
            "name": "Estufa de 4 hornillas",
            "details": "Estufa de 4 hornillas color blanco ",
            "typemoney": 3,
            "marketvalue": 200000,
            "conditions": null,
            "size": null,
            "weight": null,
            "datecreated": "2020-10-24T00:32:10.000Z",
            "subcategory": 4,
            "level": null,
            "typepublication": 1,
            "idclient": null,
            "scorev": null,
            "scorec": null,
            "status": 1
        }
    ],
    "msg": "Lista de Publicaciones con éxito"
}
 *
 * @apiError UserNotFound The id of the Product was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status": "500",
    "msg": "Error al intentar Listar Publicaciones"
}
 */

//Listar Usuarios- 
router.post('/listpublications',[
    check('TypeP', 'El TypeP es obligatorio').not().isEmpty().exists(),
    check('StatusP', 'El StatusP es obligatorio').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }
    
    let response = await AdminController.ListPublications2(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})


//Cambuar status publications- 
router.post('/changestatuspublication',[
    check('id_publication', 'El idUser es obligatorio').not().isEmpty().exists(),
    check('flap_status', 'El statusPublications es obligatorio').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await AdminController.ChangeStatusPublication(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})

//crear Categorias- 
router.post('/createcategory',[
    check('name', 'El nombre es obligatorio').not().isEmpty().exists(),
    check('TypeP', 'El TypeP es obligatorio').not().isEmpty().exists(),
    check('icon', 'El link de icon es obligatorio').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await AdminController.CreateCategory(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

}) 

//Listar Categorias- 
router.post('/listcategorys',[
    check('TypeP', 'El TypeP es obligatorio').not().isEmpty().exists(),
    check('StatusP', 'El StatusP es obligatorio').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await AdminController.ListCategorys(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

}) 

//Listar Takaesos - 
router.post('/Takasteos', async (req, res) => {
    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await AdminController.LisTakasteos(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

}) 

//Listar Tombotakas 
/**
 * @api {post} /admin/listombotakas  9 listombotakas
 * @apiName  listombotakas - Listar Publicaciones 
 * @apiGroup Tombotakas
 * 
 *      
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * 
 * @apiParam {varchar} StatusT  Reqired. ACTIVA = 0, TAKASTEADO=1, DESHABILITADA=2, EDITADA=2

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
            "detailseventTTK": "Para canche 25/11/20 8:00 pm",
            "detailsAwardttk": "La imagen que voy a cargar en este momento",
            "pinreferenceTTK": "ibxJu2",
            "datelotTTK": "25/11/2020 19:47",
            "moneyTTK": 1,
            "priceTTK": "10000.0000",
            "resultTTK": null,
            "imgTTK": [
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc"
            ],
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
                    "status": 4,
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
        {
            "idTombotakas": 3,
            "nameTombotakas": "test Nueva Tombotakas",
            "statusTTK": 0,
            "datecreatedTTK": "19/11/2020",
            "detailseventTTK": "Para canche 25/11/20 8:00 pm",
            "detailsAwardttk": "La imagen que voy a cargar en este momento",
            "pinreferenceTTK": "YuYMXs",
            "datelotTTK": "25/11/2020 19:47",
            "moneyTTK": 1,
            "priceTTK": "10000.0000",
            "resultTTK": null,
            "imgTTK": [
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc"
            ],
            "numberticketsrs": [],
            "ticketsReservados": []
        },
        {
            "idTombotakas": 4,
            "nameTombotakas": "test Nueva Tombotakas",
            "statusTTK": 0,
            "datecreatedTTK": "19/11/2020",
            "detailseventTTK": "Para canche 25/11/20 8:00 pm",
            "detailsAwardttk": "La imagen que voy a cargar en este momento",
            "pinreferenceTTK": "hBKyxU",
            "datelotTTK": "25/11/2020 19:47",
            "moneyTTK": 1,
            "priceTTK": "10000.0000",
            "resultTTK": null,
            "imgTTK": [
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc"
            ],
            "numberticketsrs": [],
            "ticketsReservados": []
        },
        {
            "idTombotakas": 5,
            "nameTombotakas": "test Nueva Tombotakas",
            "statusTTK": 0,
            "datecreatedTTK": "19/11/2020",
            "detailseventTTK": "Para canche 25/11/20 8:00 pm",
            "detailsAwardttk": "La imagen que voy a cargar en este momento",
            "pinreferenceTTK": "J3uxSU",
            "datelotTTK": "25/11/2020 19:47",
            "moneyTTK": 1,
            "priceTTK": "10000.0000",
            "resultTTK": null,
            "imgTTK": [
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc"
            ],
            "numberticketsrs": [],
            "ticketsReservados": []
        },
        {
            "idTombotakas": 6,
            "nameTombotakas": "test Nueva Tombotakas",
            "statusTTK": 0,
            "datecreatedTTK": "19/11/2020",
            "detailseventTTK": "Para canche 25/11/20 8:00 pm",
            "detailsAwardttk": "La imagen que voy a cargar en este momento",
            "pinreferenceTTK": "8JGthr",
            "datelotTTK": "25/11/2020 19:47",
            "moneyTTK": 1,
            "priceTTK": "10000.0000",
            "resultTTK": null,
            "imgTTK": [
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc",
                "https://firebasestorage.googleapis.com/v0/b/takas-a720c.appspot.com/o/products%2F8e7PQpRV7ic4jcCuaMm5DDIIOOv2-2020-10-23%2014%3A38%3A52.408985.jpg?alt=media&token=391bfb84-ac9f-4353-9384-f57b5117bdbc"
            ],
            "numberticketsrs": [],
            "ticketsReservados": []
        }
    ],
    "msg": "Lista de tombotakas con éxito"
}
 *
 * @apiError UserNotFound The id of the Tombotakas was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status": "500",
    "msg": "Error al intentar Listar Tombotakas"
}
 */

//Listar las tombotakas- 
router.post('/listombotakas', rutasProtegidas,[
    check('StatusT', 'El StatusP es obligatorio').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await AdminController.LisTombotakas(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})


//Listar Tombotakas 
/**
 * @api {post} /admin/listpqrs  3 listpqrs
 * @apiName  listpqrs - Listar PQRs 
 * @apiGroup PQRs
 * 
 *      
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * 
 * @apiParam {varchar} FlagPQRs  Reqired. PREGUNTA = 0, QUEJAS=1, RESPUESTAS=2, SUGERENCIAS=3,TODO=4, ARCHIVADO= 5

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
    "data": [
        {
            "id": 1,
            "iduser": "EVln0Vj6DNOtTXQVS2fN9P68Gl13",
            "details": "Puedo pagar en línea?",
            "datecreated": "2020-11-27T03:50:30.000Z",
            "status": 34
        },
        {
            "id": 2,
            "iduser": "EVln0Vj6DNOtTXQVS2fN9P68Gl13",
            "details": "El vendedor tarda mucho en contestar!",
            "datecreated": "2020-11-27T03:51:26.000Z",
            "status": 35
        },
        {
            "id": 3,
            "iduser": "EVln0Vj6DNOtTXQVS2fN9P68Gl13",
            "details": "Sería genial tener un panel de preguntas frecuentes",
            "datecreated": "2020-11-27T03:52:03.000Z",
            "status": 37
        }
    ],
    "msg": "Lista de PQRs con éxito"
}
 *
 * @apiError UserNotFound The id of the PQRs was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status": "500",
    "msg": "Error al intentar Listar PQRs"
}
 */

//Listar las tombotakas- 
router.post('/listpqrs',[
    check('FlagPQRs', 'El FlagPQRs es obligatorio').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await AdminController.ListPQRs(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})

/**
 * @api {post} /admin/listpqrs  3 listpqrs
 * @apiName  listpqrs - Listar PQRs 
 * @apiGroup PQRs
 * 
 *      
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * 
 * @apiParam {varchar} idFirebaseUser  Reqired. 

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
    "data": [
        {
            "id": 1,
            "iduser": "EVln0Vj6DNOtTXQVS2fN9P68Gl13",
            "details": "Puedo pagar en línea?",
            "datecreated": "2020-11-27T03:50:30.000Z",
            "status": 34
        },
        {
            "id": 2,
            "iduser": "EVln0Vj6DNOtTXQVS2fN9P68Gl13",
            "details": "El vendedor tarda mucho en contestar!",
            "datecreated": "2020-11-27T03:51:26.000Z",
            "status": 35
        },
        {
            "id": 3,
            "iduser": "EVln0Vj6DNOtTXQVS2fN9P68Gl13",
            "details": "Sería genial tener un panel de preguntas frecuentes",
            "datecreated": "2020-11-27T03:52:03.000Z",
            "status": 37
        }
    ],
    "msg": "Lista de PQRs con éxito"
}
 *
 * @apiError UserNotFound The id of the PQRs was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status": "500",
    "msg": "Error al intentar Listar PQRs"
}
 */

//Archivar pqrs
router.post('/deletepqrs',[
    check('idPQRs', 'El idPQRs es obligatorio').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await AdminController.DeletePQRs(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})


//Eliminación Lógica de Usuario 
router.post('/DeleteSUser', rutasProtegidas,[
    check('idFirebaseUser', 'El idFirebaseUser es obligatorio').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await AdminController.DeleteSUser(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})

//Editar Categoría
router.post('/updatecategory',[
    check('idC', 'El idC es obligatorio').not().isEmpty().exists(),
    check('nameC', 'El nameC es obligatorio').not().isEmpty().exists(),
    check('typePC', 'El typePC es obligatorio').not().isEmpty().exists(),
    check('iconC', 'El iconC es obligatorio').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await AdminController.UpdateCategory(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})

//Eliminar Categoría
router.post('/deletecategory',[
    check('idC', 'El idC es obligatorio').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await AdminController.DeleteCategory(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})


///////////////INDICADORES//////////////////////////////

/**
 * @api {post} /admin/cantusersregistrados  1 cantusersregistrados
 * @apiName  cantusersregistrados - Cantidad de Usuarios registrados 
 * @apiGroup Indicadores
 * 
 *      
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * 
 * @apiParam {varchar} DateInicio  Reqired. 
 * @apiParam {varchar} DateFin  Reqired. 
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
    "data": {
        "CantRegistros": 1
    },
    "msg": "Cantidad de Registrados según fecha"
}
 *
 * @apiError UserNotFound The id of the PQRs was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status": "500",
    "msg": "Error al intentar Obtener cantidad de registros según fecha"
}
 */
router.post('/cantusersregistrados', async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await AdminController.CantUsersRegistrados(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})
/**
 * SERVICIOS CONSOLA ACORDADA PARA SALIR A PRODUCCIÓN
 */
/**
 * Listar Usuarios del app
 * con busqueda por campos email y fullname
 * filtrando por estatus
 */
 router.post('/listusersconsole',[
    check('status', 'El estatus es obligatorio').not().isEmpty().exists(),
    check('items', 'la cantidad de items por pagina  es obligatorio').not().isEmpty().exists(),
    check('pag', 'La pagina a consultar es obligatorio').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await AdminController.ListUsersConsole(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

});

/**
 * Listar Publicaciones de un Usuario especifico
 * con busqueda por categoría  y nombre
 * filtrando por estatus
 */
 router.post('/listpublicationsusersconsole',[
    check('user_id', 'El user id es obligatorio').not().isEmpty().exists(),
    check('status', 'El estatus es obligatorio').not().isEmpty().exists(),
    check('items', 'la cantidad de items por pagina  es obligatorio').not().isEmpty().exists(),
    check('pag', 'La pagina a consultar es obligatorio').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await AdminController.listPublicationsUsersConsole(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})


/**
 * Listar el top match de los uaurios que de sus publicaciones concrean takasteos
 * filtrando por estatus
 */
 router.post('/topmatch',[
    check('user_id', 'El user id es obligatorio').not().isEmpty().exists(),
    check('status', 'El estatus es obligatorio').not().isEmpty().exists(),
    check('items', 'la cantidad de items por pagina  es obligatorio').not().isEmpty().exists(),
    check('pag', 'La pagina a consultar es obligatorio').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await AdminController.topMatch(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})

/**
 * Detalle Match
 * filtrando por estatus
 */
 router.post('/matchdetail',[
    check('idoffer', 'El user id es obligatorio').not().isEmpty().exists()
], async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await AdminController.detailMatch(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})



/** FIN DE LOS SERVICIO PARA SALIR A PRODUCCIÓN */

/**
 * @api {post} /admin/cantpublications  2 cantpublications
 * @apiName  cantpublications - Cantidad de Publications
 * @apiGroup Indicadores
 * 
 *      
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * 
 * @apiParam {varchar} DateInicio  Reqired. 
 * @apiParam {varchar} DateFin  Reqired. 
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
    "data": {
        "CantPublications": 1
    },
    "msg": "Cantidad de Registrados según fecha"
}
 *
 * @apiError UserNotFound The id of the PQRs was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status": "500",
    "msg": "Error al intentar Obtener cantidad de registros según fecha"
}
 */
router.post('/cantpublications', rutasProtegidas, async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await AdminController.cantPublications(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})


/**
 * @api {post} /admin/cantombotakas  3 cantombotakas
 * @apiName  cantombotakas - Cantidad de Tombotakas
 * @apiGroup Indicadores
 * 
 *      
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * 
 * @apiParam {varchar} DateInicio  Reqired. 
 * @apiParam {varchar} DateFin  Reqired. 
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
    "data": {
        "CantTomboTakas": 1
    },
    "msg": "Cantidad de Tombotakas según fecha"
}
 *
 * @apiError UserNotFound The id of the PQRs was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status": "500",
    "msg": "Error al intentar Obtener cantidad de Tombotakas según fecha"
}
 */
router.post('/cantombotakas', rutasProtegidas, async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await AdminController.canTomboTakas(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})

/**
 * @api {post} /admin/cantmembershiprequests  4 cantmembershiprequests
 * @apiName  cantmembershiprequests - Cantidad de Solicitudes de Membresías
 * @apiGroup Indicadores
 * 
 *      
 * 
 * @apiHeaderExample {varchar}Content-Type:
 *                 "value": "application/json" 
 * 
 * @apiParam {varchar} DateInicio  Reqired. 
 * @apiParam {varchar} DateFin  Reqired. 
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
    "data": {
        "CantRM": 1
    },
    "msg": "Cantidad de Solicitudes de Membresías según fecha"
}
 *
 * @apiError UserNotFound The id of the PQRs was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
    "success": false,
    "status": "500",
    "msg": "Error al intentar Obtener cantidad de Solicitudes de Membresías según fecha"
}
 */
router.post('/cantmembershiprequests', rutasProtegidas, async (req, res) => {

    const error = validationResult(req);

    if (error.array().length != 0) {
        return res.status(422).json({ errores: error.array(), msg: 'Error' });
    }

    let response = await AdminController.CantMemberShiprequests(req.body);

    if (response.status == 'ko') {
        return res.status(500).json({ error: 'Error' })
    }
    //console.log(response);
    return res.status(response.data.status).json(response.data)

})











module.exports = router;