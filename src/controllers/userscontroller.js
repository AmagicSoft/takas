//models
const User = require('../models/users.js');
const MasterCategory = require('../models/mastercategory.js');
const MasterTypePublication = require('../models/mastertypepublication.js');
const MasterTypePreferences = require('../models/masterpreferences.js');
const MasterMoney = require('../models/mastermoney.js');
const MasterSubCategory = require('../models/mastersubcategory.js');
const Product = require('../models/product.js');
const Question = require('../models/questions.js');
const Offer = require('../models/offers.js');
const MasterCities = require('../models/mastercities.js');
const MasterStatus = require('../models/masterstatus.js');
const ChatRooms = require('../models/chatrooms.js');
const notificationModel = require('../models/notifications.js');
const tombotakas = require('../models/tombotakas.js');
const PQRsModel = require('../models/pqrs.js');
const Interested = require('../models/interested.js');
//const Domiciliary = require('../models/domiciliary.js');
//const TeamWork = require('../models/teamwork.js');
const notifications = require('../lib/notifications.js');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const sha1 = require('sha1');
const securePin = require("secure-pin");
const date = require('date-and-time');
//var redis = require('redis');
const { resolveInclude } = require('ejs');
const { report } = require('../routes/index.js');



let userController = {};

//newUser - REGISTRAR USUARIO
userController.newUser = async (req) => {
    //existe este usuario? 
    try {
        let now = new Date();
        let hoy=date.format(now, 'YYYY-MM-DD HH:mm:ss');
        const userData = {
            id: req.idfirebaseUser,
            idcity: req.codCity,
            fullname: req.fullnameUser,
            email: req.emailUser,
            memberships: 1,
            phonenumber: req.phonenumberUser,
            imgurl: req.urlimgUser,
            role: 2,
            password: sha1(req.passwordUser),
            datecreated: hoy,
            tyc: req.tycUser
        };
        ///console.log(userData.password);
        let response = await User.createUser(userData);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            const payload = {
                ignoreExpiration: true
            };

            var token = jwt.sign(payload, config.llave, {
                expiresIn: 60 * 60 * 720
            });
            // var refreshToken = randtoken.uid(256) ;
            // refreshTokens[refreshToken] = {token: 'JWT ' + token, refreshToken: refreshToken};

            // const token = jwt.sign(payload, config.llave, {
            //     expiresIn: 60 * 60 * 720
            // });
            data = {
                success: true,
                status: '200',
                token: token,
                //refreshTokens: refreshTokens,
                msg: 'Usuario Registrado con éxito'
                //data: response
            }
        } else {

            console.log(response);
            data = {
                success: false,
                status: '500',
                msgerr: response.error.sqlMessage,
                codeerr: response.error.code,
                noerr: response.error.errno
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};



//Completar o actualizar perfil del Usuario
userController.UpdatePerfil = async (req) => {
    //existe este usuario? 
    try {
        let now = new Date();
        let hoy=date.format(now, 'YYYY-MM-DD HH:mm:ss');
        let idUser= req.idfirebaseUser;
        let memberships=1;
        if(req.membershipsUser!=null){
            let memberships=req.membershipsUser;
        }
        const userData = {
            // idcity: req.codCity,
            fullname: req.fullnameUser,
            email: req.emailUser,
            phonenumber: req.phonenumberUser,
            imgurl: req.urlimgUser,
            datebirth:req.datebirthUser,
            role: 2,
            // password: sha1(req.passwordUser),
            datecreated: hoy,
            country:req.countryUser,
            department:req.departmentUser,
            memberships:1, //memberships
            address: req.dirUser,
            // tyc: req.tycUser,
            // versiontyc: req.versionTYC,
            // versionapp: req.versionApp
        };
        ///console.log(userData.password);
        let response = await User.UpdatePerfil(userData,idUser);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;
            console.log(response.result);

            const payload = {
                ignoreExpiration: 0
            };

            var token = jwt.sign(payload, config.llave, {
                // expiresIn: 0
            });
            // var refreshToken = randtoken.uid(256) ;
            // refreshTokens[refreshToken] = {token: 'JWT ' + token, refreshToken: refreshToken};

            // const token = jwt.sign(payload, config.llave, {
            //     expiresIn: 60 * 60 * 720
            // });
            data = {
                success: true,
                status: '200',
                token: token,
                //refreshTokens: refreshTokens,
                msg: 'Usuario Actualizado con éxito'
                //data: response
            }
        } else {

            console.log(response);
            data = {
                success: false,
                status: '500',
                msgerr: response.error.sqlMessage,
                codeerr: response.error.code,
                noerr: response.error.errno
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};



//Login 
userController.Autenticar = async (req) => {
    //existe este usuario? 
    try {
        const userData = {
            id: req.idfirebaseUser,
            email: req.emailUser,
            //password: sha1(req.passwordUser),
            role: 2
        };
        //console.log(userData.password);
        let response = await User.loginUser(userData, 1);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            const payload = {
                ignoreExpiration: true
            };
            const token = jwt.sign(payload, config.llave, {
                expiresIn: 60 * 60 * 720
            });
            data = {
                success: true,
                status: '200',
                token: token,
                newUser: response.newUser,
                Email:response.Email,
                Fullname:response.Fullname,
                PhoneNumber:response.PhoneNumber,
                ImgUrl:response.ImgUrl,
                msg: 'Usuario Autenticado con éxito'
                //data: response
            }
        } else {

            console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al Autenticar'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

//Login Google
userController.GAutenticar = async (req) => {
    //existe este usuario? 
    try {  
        const userData = {
            id: req.idfirebaseUser,
            email: req.emailUser,
            fullname: req.fullnameUser,
            imgurl: req.imgUser,
            tyc: req.tycUser,
            memberships: 1,
            role: 2
        };
        //console.log(userData.password);
        let response = await User.GloginUser(userData, 1);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            const payload = {
                ignoreExpiration: true
            };
            const token = jwt.sign(payload, config.llave, {
                expiresIn: 60 * 60 * 720
            });
            data = {
                success: true,
                status: '200',
                token: token,                
                newUser: response.newUser,
                Email:response.Email,
                Fullname:response.Fullname,
                PhoneNumber:response.PhoneNumber,
                ImgUrl:response.ImgUrl,
                msg: 'Usuario Autenticado con éxito'
                //data: response
            }
        } else {

            console.log(response);
            data = {
                success: false,
                status: '500',
                newUser: response.newUser,
                msg: response.error
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

//Listar Categorías según publicación 
userController.LisTypePublication = async () => {
    //existe este usuario? 
    try {

        //console.log(userData.password);
        let response = await MasterTypePublication.LisTypePublication();

        console.log(response);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                data: response.result,
                msg: 'Lista de Tipo de Publicación'
                //data: response
            }
        } else {

            console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al Listar Tipo de Publicación'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};


//Listar datos del perfil de usuario
userController.PerfilUser = async (req) => {
    //existe este usuario? 
    try {
        let idUser=req.idFirebaseUser;
        //idUser='zSiRYTbNbpW5vOQ6K6XpxvpKu2v1';
        //console.log(idUser);
        //console.log(userData.password);
        let response = await User.PerfilUser(idUser);

        //console.log(response);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                data: response.result,
                msg: 'Perfil de Usuario'
                //data: response
            }
        } else {

            console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al intentar obtener perfil de usuario'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};



//Listar Categorías según publicación 
userController.ListCategory = async (req) => {
    //existe este usuario? 
    try {
        const userData = {
            typepublication: req.typepublicCategory
        };
        //console.log(userData.password);
        let response = await MasterCategory.ListCategory(userData);

        console.log(response);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                data: response.result,
                msg: 'Lista de Categoría'
                //data: response
            }
        } else {

            console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al Listar Caterías'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};


///tokenpush
userController.Updatetokenpush = async (req) => {
    //console.log('response');
    try {
        const userData = {
            id: req.idfirebaseUser,
            tokenpush: req.tokenpushUser
        };


        let resp = await User.updatetokenpush(userData);
        console.log('resultado ', resp);
        let data = {};
        if (resp && resp.result) {
            data = {
                success: true,
                status: '200',
                eselmismo: resp.eselmismo,
                msg: 'Token Push Actualizado'
            }

        } else {
            data = {
                success: false,
                status: '500',
                msgerr: resp.error.sqlMessage,
                codeerr: resp.error.code,
                noerr: resp.error.errno
            }

        }
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

///VERIFICAR SI UN USUARIO SE ENCUENTRA REGISTRADO EN LA BASE DE DATOS EL BACKEND
userController.UserExist = async (req) => {
    //console.log('response');
    try {
        const userData = {
            id: req.idfirebaseUser
        };
        let resp = await User.UserExist(userData);
        console.log('resultado ', resp);
        let data = {};
        if (resp && resp.UserExist) {
            data = {
                success: true,
                status: '200',
                UserExist:resp.UserExist,
                Email:resp.Email,
                Fullname:resp.Fullname,
                PhoneNumber:resp.PhoneNumber,
                memberships:resp.memberships,
                ImgUrl:resp.ImgUrl,
                msg: 'Verificación si el usuario existe y si sus campos estan completos'
            }

        } else {
            data = {
                success: false,
                status: '500',
                msgerr: resp.error.sqlMessage,
                codeerr: resp.error.code,
                noerr: resp.error.errno
            }

        }
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }
    
};


//Listar tipo de preferencias que puede tener una publicación según publicación 
userController.LisTypePreference = async () => {
    //existe este usuario? 
    try {

        //console.log(userData.password);
        let response = await MasterTypePreferences.LisTypePreference();

        console.log(response);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                data: response.result,
                msg: 'Lista de Tipo de Preferencias'
                //data: response
            }
        } else {

            console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al Listar Tipo de Prefencias'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};


//Listar tipo de preferencias que puede tener una publicación según publicación 
userController.CharacteristicPublication = async (req) => {
    //existe este usuario? 
    try {

        let filter=4;
        if(req.FlagCharacteristic==2){
            filter=5;
        }
        if(req.FlagCharacteristic==3){
            filter=6;
        }
        if(req.FlagCharacteristic==4){
            filter=13;
        }
        //console.log(userData.password);
        let response = await MasterStatus.CharacteristicPublication(filter);

        console.log(response);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                data: response.result,
                msg: 'Lista de Características para una publicación sengún bandera'
                //data: response
            }
        } else {

            console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al Listar Características para una publicación sengún bandera'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};


//Listar tipo de Monedas 
userController.ListMoney = async () => {
    //existe este usuario? 
    try {

        //console.log(userData.password);
        let response = await MasterMoney.ListMoney();

        console.log(response);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                data: response.result,
                msg: 'Lista de Tipo de Monedas'
                //data: response
            }
        } else {

            console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al Listar Tipo de Monedas'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

//Listar SubCategorías 
userController.ListSubCategory = async () => {
    //existe este usuario? 
    try {

        //console.log(userData.password);
        let response = await MasterSubCategory.ListSubCategory();

        console.log(response);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                data: response.result,
                msg: 'Lista de Subcategorías'
                //data: response
            }
        } else {

            console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al Listar Subcategorías'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

//Listar Ciudades
userController.ListCities = async (req) => {
    //existe este usuario? 
    try {
        const citiesdata = {
            id: req.idfirebaseUser,
            status:1
        };

        console.log(citiesdata.id);
        let response = await MasterCities.ListCities(citiesdata);

        console.log(response);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                data: response.result,
                msg: 'Lista de Ciudades'
                //data: response
            }
        } else {

            console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al Listar Ciudades'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};


//Nuevo Producto (TAKASTEAR)
userController.NewProduct = async (req) => {
    //existe este usuario? 
    try {

            let now = new Date();
            let hoy=date.format(now, 'YYYY-MM-DD HH:mm:ss');
            console.log(now+" - "+hoy);
            const ProductData = {
                iduser: req.iduserProduct,
                datepublication: hoy,
                name: req.nameProduct,
                details: req.detailsProduct,
                typemoney: req.typemoneyProduct,
                marketvalue: req.marketvalueProduct,
                subcategory:req.subcategoryProduct,
                datecreated: hoy,
                location:req.location,
                typepublication:1,
                status:1
            };
            const topeimg=10;      
            const ImagesProduct = {};
            //console.log(req.ImagesProduct.length);
            if(req.ImagesProduct.length!=0){
                for(var atr1 in req.ImagesProduct){
                    ImagesProduct[atr1] = req.ImagesProduct[atr1];     
                };
            }

            const PreferecesProduct = {};
            console.log(req.PreferecesProduct.length);
            let ValidarPreferencer=false;
            if(req.PreferecesProduct.length>1){
                ValidarPreferencer=true;
            }
            if(req.PreferecesProduct.length!=0){
                for(var atr2 in req.PreferecesProduct){
                    PreferecesProduct[atr2] = req.PreferecesProduct[atr2]; 
                };
            }
       
        let response ="";
        
        if(req.ImagesProduct.length<=topeimg && ValidarPreferencer==false){
             response = await Product.NewProduct(ProductData,PreferecesProduct,ImagesProduct);
        }else{
            if(req.ImagesProduct.length<=topeimg){
                response ={
                    'error': "Ha superdo el límite de imagenes"
                };
            }
            if(ValidarPreferencer==false){
                response ={
                    'error': "Ha superdo el límite de Preferencias, sólo se permite una"
                };
            }
        }
       // console.log(response);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                msg: 'Producto registrado con éxito'
                //data: response
            }
        } else {

            //console.log(response);
            data = {
                success: false,
                status: '500',
                data: response.error,
                msg: 'Error al registrar producto'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};


//Nuevo Producto (TAKASTEAR)
userController.NewProductKW = async (req) => {
    //existe este usuario? 
    try {

            let now = new Date();
            let hoy=date.format(now, 'YYYY-MM-DD HH:mm:ss');
            console.log(now+" - "+hoy);
            const ProductData = {
                iduser: req.iduserProduct,
                datepublication: hoy,
                new: req.NewProduct,
                size: req.SizePoduct,
                weight: req.WeightProduct,
                name: req.nameProduct,
                details: req.detailsProduct,
                typemoney: req.typemoneyProduct,
                marketvalue: req.marketvalueProduct,
                subcategory:req.subcategoryProduct,
                datecreated: hoy,
                typepublication:1,
                status:3
            };
            const topeimg=10;      
            const ImagesProduct = {};
            //console.log(req.ImagesProduct.length);
            if(req.ImagesProduct.length!=0){
                for(var atr1 in req.ImagesProduct){
                    ImagesProduct[atr1] = req.ImagesProduct[atr1];     
                };
            }

            const PreferecesProduct = {};
            //console.log(req.PreferecesProduct.length);
            if(req.PreferecesProduct.length!=0){
                for(var atr2 in req.PreferecesProduct){
                    PreferecesProduct[atr2] = req.PreferecesProduct[atr2]; 
                };
            }

            const topeKW=10;      
            const KeyWordsProduct = {};
            //console.log(req.ImagesProduct.length);
            if(req.KeyWordsProduct.length!=0){
                for(var atr1 in req.KeyWordsProduct){
                    KeyWordsProduct[atr1] = req.KeyWordsProduct[atr1];     
                };
                console.log(KeyWordsProduct);
            }
            

        let response ="";
        
        if(req.ImagesProduct.length<=topeimg && req.KeyWordsProduct.length<=topeKW){
            //response = await Product.NewProductKW(ProductData,PreferecesProduct,ImagesProduct,KeyWordsProduct);
        }else{
             response ={
                'error': "Ha superdo el límite de imagenes o palabras claves"
            };
        }
       // console.log(response);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                msg: 'Producto registrado con éxito'
                //data: response
            }
        } else {

            //console.log(response);
            data = {
                success: false,
                status: '500',
                data: response.error,
                msg: 'Error al registrar producto'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};


//Nuevo Producto (TAKASTEAR)
userController.NewProductCKW = async (req) => {
    //existe este usuario? 
    try {

            let now = new Date();
            let hoy=date.format(now, 'YYYY-MM-DD HH:mm:ss');

            //buscar fecha de creación del producto

           // console.log(now+" - "+hoy);
            let UsePoduct = null;
            if(req.UsePoduct!=null){               
                 UsePoduct= req.UsePoduct;  
                //  console.log("UsePoduct");
                //  console.log(UsePoduct);                
            }

            let SizePoduct = null;
            if(req.SizePoduct!=null){               
                SizePoduct= req.SizePoduct;  
                 //console.log("SizePoduct");
                // console.log(SizePoduct);                
            }

            let WeightProduct = null;
            if(req.WeightProduct!=null){
                if(req.WeightProduct!=null){               
                    WeightProduct= req.WeightProduct;  
                    // console.log("WeightProduct");
                    // console.log(WeightProduct);                
                }
            }
            let ProductData = {
                iduser: req.iduserProduct,
                datepublication: hoy,
                new: req.NewProduct,
                conditions:UsePoduct,
                size: SizePoduct,
                weight: WeightProduct,
                valueweight:req.ValueWeightProduct,
                unitofmeasurement: req.UnitOfMeasurementP,
                name: req.nameProduct,
                details: req.detailsProduct,
                typemoney: req.typemoneyProduct,
                marketvalue: req.marketvalueProduct,
                subcategory:req.subcategoryProduct,
                datecreated: hoy,
                typepublication:1,
                status:3
            };
            const topeimg=10;      
            const ImagesProduct = {};
            //console.log(req.ImagesProduct.length);
            if(req.ImagesProduct.length!=0){
                for(var atr1 in req.ImagesProduct){
                    ImagesProduct[atr1] = req.ImagesProduct[atr1];     
                };
            }

            const PreferecesProduct = {};
            //console.log(req.PreferecesProduct.length);
            let valReferencia=false;
            if(req.PreferecesProduct.length!=0){
                if(req.PreferecesProduct.length==1){
                    for(var atr2 in req.PreferecesProduct){
                        PreferecesProduct[atr2] = req.PreferecesProduct[atr2]; 
                    };
                    valReferencia=true;
                }
            }

            const topeKW=10;      
            const KeyWordsProduct = [];
            let lengthkw=0;
            //console.log(req.ImagesProduct.length);
            if(req.KeyWordsProduct!=null && req.KeyWordsProduct!=undefined){
                lengthkw=req.KeyWordsProduct.length;
                if(req.KeyWordsProduct.length!=0){
                    for(var atr1 in req.KeyWordsProduct){
                        KeyWordsProduct[atr1] = req.KeyWordsProduct[atr1];     
                    };
                   
                }
            }
            else{

            }
            //console.log(req.KeyWordsProduct);

            
            // console.log(req.ImagesProduct.length);
            // console.log(lengthkw);
            // console.log(topeKW);
            // console.log(valReferencia);

            let msgError="";
            

        let response ={};

        // && lengthkw<=topeKW 

        if(req.ImagesProduct.length<=topeimg && valReferencia==true){
            response = await Product.NewProductCKW(ProductData,PreferecesProduct,ImagesProduct,KeyWordsProduct);
            // response = await Product.NewProductCKW(ProductData,PreferecesProduct,ImagesProduct);

        }else{               
            msgError = "Se ha superado el límite de imagenes , palabras claves ó preferencias";
        }
        
        //console.log(msgError);

        let data = {};

        console.log(response);
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                idProduct:response.id, 
                msg: 'Producto registrado con éxito'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
                //data: response.error,
                data: msgError,
                msg: 'Error al registrar producto'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};



//Editar Producto (TAKASTEAR)
userController.EditProductCKW = async (req) => {
    //existe este usuario? 
    try {

            let now = new Date();
            //fecha actual del servidor
            let hoy=date.format(now, 'YYYY-MM-DD HH:mm:ss');
            let horaServidor=date.format(now, 'HH:mm:ss');

            let rp = await Product.FindProductCKW(req.iduserProduct,req.idProduct);
            //console.log(rp);
            console.log(horaServidor);
            let datepublication = new Date(rp.result.datepublication);
            //fecha de creación de producto
            let fechacp = date.format(datepublication, 'YYYY-MM-DD HH:mm:ss');
            //console.log(now);
            let Diferenciafechas=date.subtract(now, datepublication).toMinutes();

            let UsePoduct = null;
            if(req.UsePoduct!=null){               
                 UsePoduct= req.UsePoduct;  
                //  console.log("UsePoduct");
                //  console.log(UsePoduct);                
            }

            let SizePoduct = null;
            if(req.SizePoduct!=null){               
                SizePoduct= req.SizePoduct;  
                // console.log("SizePoduct");
                // console.log(SizePoduct);                
            }

            let WeightProduct = null;
            if(req.WeightProduct!=null){
                if(req.WeightProduct!=null){               
                    WeightProduct= req.WeightProduct;  
                    // console.log("WeightProduct");
                    // console.log(WeightProduct);                
                }
            }
            let ProductData = {
                iduser: req.iduserProduct,
                datepublication: hoy,
                new: req.NewProduct,
                condition:UsePoduct,
                size: SizePoduct,
                weight: WeightProduct,
                valueweight:req.ValueWeightProduct,
                unitofmeasurement: req.UnitOfMeasurementP,
                name: req.nameProduct,
                details: req.detailsProduct,
                typemoney: req.typemoneyProduct,
                marketvalue: req.marketvalueProduct,
                subcategory:req.subcategoryProduct,
                datecreated: hoy,
                typepublication:1,
                status:26
            };
            const topeimg=10;      
            const ImagesProduct = {};
            //console.log(req.ImagesProduct.length);
            if(req.ImagesProduct.length!=0){
                for(var atr1 in req.ImagesProduct){
                    ImagesProduct[atr1] = req.ImagesProduct[atr1];     
                };
            }

            const PreferecesProduct = {};
            //console.log(req.PreferecesProduct.length);
            let valReferencia=false;
            if(req.PreferecesProduct.length!=0){
                if(req.PreferecesProduct.length==1){
                    for(var atr2 in req.PreferecesProduct){
                        PreferecesProduct[atr2] = req.PreferecesProduct[atr2]; 
                    };
                    valReferencia=true;
                }
            }

            const topeKW=10;      
            const KeyWordsProduct = {};
            let lengthkw=0;
            //console.log(req.ImagesProduct.length);
            if(req.KeyWordsProduct!=null){
                lengthkw=req.KeyWordsProduct.length;
                if(req.KeyWordsProduct.length!=0){
                    for(var atr1 in req.KeyWordsProduct){
                        KeyWordsProduct[atr1] = req.KeyWordsProduct[atr1];     
                    };
                    console.log(KeyWordsProduct);
                }
                
            }

            
            // console.log(req.ImagesProduct.length);
            // console.log(lengthkw);
            // console.log(topeKW);
            // console.log(valReferencia);

            let msgError="";
            

        let response ={};

        // && lengthkw<=topeKW 

        if(req.ImagesProduct.length<=topeimg && valReferencia==true){
            if(Diferenciafechas<=20){
            //////response = await Product.NewProductKW(ProductData,PreferecesProduct,ImagesProduct,KeyWordsProduct,UsePoduct,WeightProduct,SizePoduct);
            response = await Product.EditProductCKW(ProductData,req.idProduct,PreferecesProduct,ImagesProduct,KeyWordsProduct);

            //let rp = await Product.FindProductCKW(req.iduserProduct,req.idProduct);
            }
            else{
                msgError = "Ha superado el límite de tiempo máximo disponible para editar";
            }
        }else{               
            msgError = "Se ha superado el límite de imagenes , palabras claves ó preferencias";
        }
        
        //console.log(msgError);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                msg: 'Producto Editado  con éxito'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
                //data: response.error,
                data: msgError,
                msg: 'Error al Editar producto'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};



//Listar status de un producto
userController.listStatusProduct = async (req) => {
    //existe este usuario? 
    
    try {
        let idfilter=4;// ESTADO DEL PRODUCTO  NUEVO Ó USADO
        if(req.idfilter=1){
            idfilter=5;// TAMAÑO DEL PRODUCTO 
        }
        if(req.idfilter=2){
            idfilter=6; //PESO DEL PRODUCTO
        }
        //console.log(userData.password);
        let response = await MasterStatus.listStatusProduct(idfilter);

        console.log(response);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                data: response.result,
                msg: 'Lista de sataus de productos según filtro'
                //data: response
            }
        } else {

            console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al Listar status de productos según filtros'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};



//Listar Mis publicaciones  - TAKASTEAR 
userController.ListMisProductos = async (req) => {
    try {
        let estatus=0;
        //let  iduser= req.idfirebaseUser
        const UserData = {
            iduser: req.idfirebaseUser
        };
        const ProductData = {
            status: req.statusProduct
        };
        if(req.statusProduct!=null){
                estatus=req.statusProduct;    
        }
        
        console.log(UserData.iduser);
        let response = await Product.ListMisProductos(UserData,ProductData,estatus);

       console.log(response);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                data: response.result,
                msg: 'Lista de mis productos'
                //data: response
            }
        } else {

           // console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al Listar mis productos'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

//Listar las publicaciones  de otros usuarios- TAKASTEAR 
userController.ListProductos = async (req) => {
    try {

        let FlagProduct=req.FlagProduct;
        let statusProduct=3; //Publicación activa
        if(FlagProduct==1){
            statusProduct=4; // Publicación Takasteada
        }
        if(FlagProduct==2){
            statusProduct=5;//Publicación Elimidada ó Deshabilitada
        }
        if(FlagProduct==3){
            statusProduct=26;//Publicación Editada
        }

        const UserData = {
            iduser: req.idfirebaseUser
        };
        const ProductData = {
            status: statusProduct
        };
        //console.log(ProductData.status);
        let response = await Product.ListProductos(UserData,ProductData);

       //console.log(response);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                data: response.result,
                msg: 'Lista de productos'
                //data: response
            }
        } else {

           // console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al Listar productos'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        //console.log(e);
        return { status: 'ko' };
    }

};



////BUSCAR PUBLICACUONES SEGÚN NOMBRE DEL ARTÍCULO
userController.findProductos = async (req) => {
    try {
        
          let IdUserProduct=req.IdUserProduct;
          let nameProduct=req.nameProduct;
        console.log(IdUserProduct);
        console.log(nameProduct);
        let response = await Product.findProductos(nameProduct,IdUserProduct);

       //console.log(response);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                data: response.result,
                msg: 'Busqueda de productos éxitosa'
                //data: response
            }
        } else {

           // console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al Buscar Productos'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

////BUSCAR PUBLICACIONES SEGÚN ID DE LA PUBLICACIÓN
userController.findProduct = async (req) => {
    try {
        
          let IdProduct=req.IdProduct;
          let nameProduct=req.nameProduct;
        console.log(IdProduct);
        let response = await Product.findProduct(IdProduct);

       //console.log(response);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                data: response.result,
                msg: 'detalle del producto éxitosa'
                //data: response
            }
        } else {

           // console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al Buscar Productos'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};




//LISTAR PRODRUCTOS FILTRADOS POR SUBCATEGORÍA - TAKASTEAR 
userController.ListProductSubCategory = async (req) => {
    try {
        const ProductData = {
            subcategory: req.SubCategoriaProduct,
            iduser: req.idFirebaseUser,
            status: req.statusProduct
        };
        //console.log(userData.password);
        let response = await Product.ListProductSubCategory(ProductData);

       //console.log(response);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                data: response.result,
                msg: 'Lista de productos filtrados por subcategorías'
                //data: response
            }
        } else {

           // console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al Listar productos filtrados por subcategorías'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};


//LISTAR DETTALLES DE UN PRODUCTO - TAKASTEAR 
userController.DetailsProduct = async (req) => {
    try {
        const ProductData = {
            id: req.IdProduct,
            iduser: req.IdUserProduct
            
        };
        //console.log(userData.password);
        let response = await Product.DetailsProduct(ProductData);

       //console.log(response);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                data: response.result[0],
                images: response.images,
                msg: 'Listar detalles de un producto'
                //data: response
            }
        } else {

           console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al Listar detalles de un producto'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

//CREAR PREGUNTA A UNA PUBLICACIÓ - GENERAL 
userController.NewQuestion = async (req) => {
    try {


        let now = new Date();
        let hoy=date.format(now, 'YYYY-MM-DD HH:mm:ss');

        let QuestionData ={};
       // console.log(req.typeQuestion);
        if(req.typeQuestion==1){
            QuestionData = {
                iduser: req.idFirebaseUser,
                idproduct: req.idPublication,
                description: req.descriptionQuestion,
                datecreated:hoy,
                publication:1,
                status: 3,
                isquestions: true
            };
        }if(req.typeQuestion==2){
            QuestionData = {
                iduser: req.idFirebaseUser,
                idservice: req.idPublication,
                description: req.descriptionQuestion,
                datecreated:hoy,
                publication:2,
                status: 3,
                isquestions: true
            };
        }if(req.typeQuestion==3){
            QuestionData = {
                iduser: req.idFirebaseUser,
                idauction: req.idPublication,
                description: req.descriptionQuestion,
                datecreated:hoy,
                publication:3,
                status: 3,
                isquestions: true
            };
        }
        //console.log(userData.password);
        let response = await Question.NewQuestion(QuestionData);

       //console.log(response);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                msg: 'Pregunta creada exitosamente'
                //data: response
            }
        } else {

           console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al intentar crear una pregunta'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};



//CREAR RESPUESTA A UNA PUBLICACIÓ - GENERAL 
userController.AnswerQuestion = async (req) => {
    try {

        let now = new Date();
        let hoy=date.format(now, 'YYYY-MM-DD HH:mm:ss');

        let QuestionData ={};
       // console.log(req.typeQuestion);
        if(req.typeQuestion==1){
            QuestionData = {
                questions: req.idQuestion,
                iduser: req.idfirebaseUser,
                idproduct: req.idPublication,
                description: req.descriptionAnswer,
                datecreated:hoy,
                publication:1,
                status: 1,
                isquestions: false
            };
        }if(req.typeQuestion==2){
            QuestionData = {
                questions: req.idQuestion,
                iduser: req.idfirebaseUser,
                idservice: req.idPublication,
                description: req.descriptionAnswer,
                datecreated:hoy,
                publication:2,
                status: 1,
                isquestions: false
            };
        }if(req.typeQuestion==3){
            QuestionData = {
                questions: req.idQuestion,
                iduser: req.idfirebaseUser,
                idauction: req.idPublication,
                description: req.descriptionAnswer,
                datecreated:hoy,
                publication:3,
                status: 1,
                isquestions: false
            };
        }
        //console.log(userData.password);
        let response = await Question.NewQuestion(QuestionData);

       //console.log(response);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                msg: 'Respuesta creada exitosamente'
                //data: response
            }
        } else {

           console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al intentar crear una Respuesta'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

//LISTAR PREGUNTAS Y RESPUESTA DE UNA PUBLICACIÓN - GENERAL 
userController.ListQuestionAnswer = async (req) => {
    try {

        let now = new Date();
        let hoy=date.format(now, 'YYYY-MM-DD HH:mm:ss');

        let QuestionData ={};
       // console.log(req.typeQuestion);
        if(req.idtypePublicationQA==1){
            QuestionData = {
                idproduct: req.idPublicationQA
            };
        }if(req.idtypePublicationQA==2){
            QuestionData = {
                idservice: req.idPublicationQA
            };
        }if(req.idtypePublicationQA==3){
            QuestionData = {
                idauction: req.idPublicationQA
            };
        }
        //console.log(userData.password);
        let response = await Question.ListQuestionAnswer(QuestionData);

       //console.log(response);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                data:response.result,
                msg: 'Lista de preguntas y respuestas de un producto'
                //data: response
            }
        } else {

           console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al intentar Listar de preguntas y respuestas de un producto'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};


//
//CREAR OFERTAS A UNA PUBLICACIÓ - GENERAL 
userController.NewOffer = async (req) => {
    try {

        let dt = new Date();//getMonth   getDate

        let now = new Date();
        let hoy=date.format(now, 'YYYY-MM-DD HH:mm:ss');

        let OfferData ={};
       // console.log(req.typeQuestion);
        if(req.typePublication==1){
            OfferData = {
                iduser: req.idFirebaseUser,
                idproduct: req.idPublication,
                observation: req.descriptionOffer,
                dateoffers:hoy,
                publication:1,
                status:6,
            };
        }if(req.typePublication==2){
            OfferData = {
                iduser: req.idFirebaseUser,
                idservice: req.idPublication,
                observation: req.descriptionOffer,
                dateoffers:hoy,
                publication:2,
                status:6,
            };
        }if(req.typePublication==3){
            OfferData = {
                iduser: req.idFirebaseUser,
                idauction: req.idPublication,
                observation: req.descriptionOffer,
                dateoffers:hoy,
                publication:3,
                status:6,
            };
        }

        const IdOfferData = {};
            //console.log(req.idsPublications.length);
            if(req.idsPublications.length!=0){
                for(var atr1 in req.idsPublications){
                    
                    IdOfferData[atr1] = req.idsPublications[atr1]; 
                    //IdOfferData[atr1] = req.IdOfferData[atr1]; 
                    
                };
            }

        console.log(IdOfferData);
        //console.log(userData.password);
        let response={};
        if(req.idsPublications.length!=0){
            response = await Offer.NewOffer(OfferData,IdOfferData);
        }
        else{
            response = resolve({
                'error': "Publicaciones vacias.",
                'msg':"Debe ofertar con al menos una publicación"
            })
        }

    //    console.log(response);
       console.log(response.OkPacket);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',                
                idoferta:response.idOferta,
                // idnotification:response.idNotificacion,
                // Typenotification:response.TypeNotification,
                // titulo:response.titulo,
                // detalles:response.detalles,
                msg: 'Oferta creada exitosamente'
                //data: response
            }
            //Envío de notificaciones al dueño de la publicación a la que se le hizo la oferta
            /****NOTIFICACIÓN NUEVA OFERTA****/
            
            // 'idOferta':idOferta,
            //                                         'idNotificacion':respCrearPush.result.insertId,
            //                                         'idrelation':idrelation,
            //                                         'TypeNotification':TypeNotification,
            //                                         'tokenpush':tokenpush,
            //                                         'titulo':titulo,
            //                                         'detalles':detalles
        let token=response.tokenpush;
        let titulo=response.titulo;
        let detalle=response.detalles;
       //let descripción="Haz recibido una nueva oferta para la publicación de Gorrros de bebes.";
    //   console.log("response.tokenpush");
    //   console.log(response.tokenpush);
    //    console.log(response);
       let datanoti={
        "title": response.titulo,
        "body": response.detalles,
        "idOffer":response.idOferta,
        "idNotification":response.idNotificacion,
        "idrelation":response.idrelation,
        "TypeNotification":response.TypeNotification,
        "UserPublication":response.UserPublication,
        "type": 0,
        "status": 0,
        "click_action": "FLUTTER_NOTIFICATION_CLICK"
    };
        
      notifications(token,titulo,detalle,datanoti);




        } else {

           //console.log(response);
            data = {
                success: false,
                status: '500',
                error:response.msg,
                msg: 'Error al intentar crear una Oferta'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};


//LISTAR OFERTAS - GENERAL 
userController.ListOffer = async (req) => {
    try {
        let status=null;
        if(req.flagstatus!=null){
            if(req.flagstatus==0){
                status=23;  //  OFERTA CANCELADA
            }
            if(req.flagstatus==1){
                status=8;  //  OFERTA RECHAZADA
            }
            if(req.flagstatus==2){
                status=7;  //  OFERTA ACAPTADA
            }
            //status=req.flagstatus;
        }
        //console.log(status);
        let OfferData ={};
       // console.log(req.typeQuestion);
        if(req.typePublication==1){
            OfferData = {
                idproduct: req.idPublication,
                publication: req.typePublication
            };
        }if(req.typePublication==2){
            OfferData = {
                iduser: req.idFirebaseUser,
                idproduct: req.idPublication,
                publication: req.typePublication
            };
        }if(req.typePublication==3){
            OfferData = {
                idauction: req.idPublication,
                publication: req.typePublication
            };
        }
        //console.log(userData.password);
        let response = await Offer.ListOffer(OfferData,status);

       //console.log(response);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                data: r,
                msg: 'Listar Ofertas exitosamente'
                //data: response
            }
        } else {

           //console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al intentar listar ofertas'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};


//DETALLES DE LA OFERTA - GENERAL 
userController.DetailsOffer = async (req) => {
    try {

        let dt = new Date();//getMonth   getDate

        let now = new Date();
        let hoy=date.format(now, 'YYYY-MM-DD HH:mm:ss');
        let UserConsulta= req.idFirebaseUser;

        let OfferData ={};
       // console.log(req.typeQuestion);
        if(req.typePublication==1){
            OfferData = {                
                id: req.idOferta,
                publication: req.typePublication
            };
        }if(req.typePublication==2){
            OfferData = {
                id: req.idOferta,
                publication: req.typePublication
            };
        }if(req.typePublication==3){
            OfferData = {
                id: req.idOferta,
                publication: req.typePublication
            };
        }
        //console.log(userData.password);
        let response = await Offer.DetailsOffer(OfferData,UserConsulta);

       //console.log(response);

        let data = {};
        if (response && response.result) {

            console.log("response.result.length");
            console.log(response.result.length);
            let r = {};
            if(response.result.length>0){
            
            r = response.result[0];
            // console.log("response.result");
            // console.log(response.result[0]);
            // console.log("response.result");
        }else{
            r = [];
        }

            data = {
                success: true,
                status: '200',
                data: r,
                msg: 'Detalles de la oferta listado exitosamente'
                //data: response
            }
        } else {

           console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al intentar listar detalles de la oferta'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};



//CALCULAR DIFERENCIAS- OFFERS 
userController.CalDifference = async (req) => {
    try {


        let OfferData ={};
       // console.log(req.typeQuestion);
            OfferData = {
                id: req.idPublication,
                marketvalueP: req.marketvalueP
            };
                console.log(req.Publications.length);

                //const IdOfferData = {};
                let SumItemsOffer= 0; 
                let Afavor=false;
                if(req.Publications.length!=0){
                    for(var atr1 in req.Publications){
                        
                        // IdOfferData={
                        //    "idPublication": req.Publications[atr1].idPublication,
                        //    "marketvalueO": req.Publications[atr1].marketvalueO,
                        // } 
                        //IdOfferData[atr1] = req.IdOfferData[atr1]; 
                        SumItemsOffer+=req.Publications[atr1].marketvalueO;
                        
                    };
                   
                }

                if(SumItemsOffer>OfferData.marketvalueP){
                    DiferenciaOffer= SumItemsOffer-OfferData.marketvalueP;
                    Afavor=true;
               }else{
                   DiferenciaOffer= OfferData.marketvalueP-SumItemsOffer;
                   Afavor=false;
               }

                // console.log("IdOfferData");
                // console.log(IdOfferData);
        
        //console.log(userData.password);
        //let response = await Offer.DetailsOffer(OfferData);
        let response ={
            "result":{
                "idPublication":OfferData.id,
                "marketvalueP":Number.parseFloat(OfferData.marketvalueP).toFixed(4),
                "SumItemsOffer":Number.parseFloat(SumItemsOffer).toFixed(4),
                "differenceoffer":Number.parseFloat(DiferenciaOffer).toFixed(4),
                "infavor":Afavor
            }
        };
       //console.log(response);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                data: r,
                msg: 'Diferencia calculada exitosamente'
                //data: response
            }
        } else {

           console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al Calcular diferencia'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};





//LISTAR  MIS OFERTAS - GENERAL 
userController.ListMyOffer = async (req) => {
    try {

        let OfferData ={};

        let status=null;
        
        if(req.flagstatus!=null){
            if(req.flagstatus==0){
                status=23;  //  OFERTA CANCELADA
            }
            if(req.flagstatus==1){
                status=8;  //  OFERTA RECHAZADA
            }
            if(req.flagstatus==2){
                status=7;  //  OFERTA ACAPTADA
            }
            //status=req.flagstatus;
        }
       // console.log(req.typeQuestion);
        if(req.typePublication==1){
            OfferData = {
                iduser: req.idFirebaseUser,
                idproduct: req.idPublication,
                publication: req.typePublication
            };
        }if(req.typePublication==2){
            OfferData = {
                iduser: req.idFirebaseUser,
                idproduct: req.idPublication,
                publication: req.typePublication
            };
        }if(req.typePublication==3){
            OfferData = {
                iduser: req.idFirebaseUser,
                idauction: req.idPublication,
                publication: req.typePublication
            };
        }
        //console.log(userData.password);
        let response = await Offer.ListMyOffer(OfferData,status);

       //console.log(response);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                data: r,
                msg: 'Lista de mis Ofertas exitosamente'
                //data: response
            }
        } else {

           console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al intentar listar mis ofertas'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

//
//CAMBIAR EL ESTADO DE UNA OFERTA- OFFERS 
userController.ChangeStatusOffer = async (req) => {
    try {
        let match=false;
        let OfferData ={};
       // console.log(req.typeQuestion);
            let statusOffer=23;//ODERTA CANCELADA
            let TitleNoti="cancelado una oferta";
            if(req.FlagStatusOffer==1){
                statusOffer=8;// OFERTA RECHAZADA
                let TitleNoti="Han rechazado una oferta";
            }
            if(req.FlagStatusOffer==2){
                statusOffer=7;// OFERTA ACEPTADA
                let TitleNoti="Han Aceptado una oferta";
                match=true;
                //let response2 =  Offer.FindDatOffer(OfferData);
                //console.log(response2);
            }

            OfferData = {
                id: req.idOffer,
                idUser: req.idUser,
                status:statusOffer
            };
       
        
        //let response = await Offer.FindDatOffer(OfferData);
       let response = await Offer.ChangeStatusOffer(OfferData,req.FlagStatusOffer);

       //console.log(response);
      // console.log(response.sala);

        let data = {};
        if (response && response.result) {
            let r = {};
            let sala='';
            r = response.result;
            if(response.sala){
                sala=response.sala;
            }
            data = {
                success: true,
                status: '200',
                match:match,
                sala:sala,
                msg: 'Cambio de estatus de una oferta ejecutdo exitosamente'
                //data: response
            }
        } else {

           console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al intentar cambiar el estatus de una Oferta'
            }
        }

        //////////ENVIAMOS NOTIFICACIÓN////////////
        let token=response.tokenpush;
        let titulo=response.titulo;
        let detalle=response.detalles;
        let datanoti={
            "title": response.titulo,
            "body": response.detalles,
            "idOffer":response.idOferta,
            "idNotification":response.idNotificacion,
            "idrelation":response.idrelation,
            "TypeNotification":response.TypeNotification,
            "UserPublication":response.UserPublication,
            "type": 0,
            "status": 0,
            "click_action": "FLUTTER_NOTIFICATION_CLICK"
         };
        
      notifications(token,titulo,detalle,datanoti);
        /////////////////////

        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

//MATCH DE UNA OFERTA- OFFERS 
userController.MatchOffer = async (req) => {
    try {
        let match=req.match;
        let OfferData ={};
       // console.log(req.typeQuestion);
            let statusOffer=23;//ODERTA CANCELADA
            let TitleNoti="cancelado una oferta";
            if(match!=true){
                statusOffer=8;// OFERTA RECHAZADA
                let TitleNoti="Han rechazado una oferta";
            }
            if(match==true){
                statusOffer=7;// OFERTA ACEPTADA
                let TitleNoti="Han Aceptado una oferta";
                
            }

            OfferData = {
                id: req.idOffer,
                idUser: req.idUser,
                match:match,
                status:statusOffer
            };
       
        
        //let response = await Offer.FindDatOffer(OfferData);
       let response = await Offer.MatchOffer(OfferData,match);

       //console.log(response);
      // console.log(response.sala);

        let data = {};
        if (response && response.result) {
            let r = {};
            let sala='';
            r = response.result;
            if(response.sala){
                sala=response.sala;
            }
            data = {
                success: true,
                status: '200',
                match:match,
                sala:sala,
                msg: 'Cambio de estatus de una oferta ejecutdo exitosamente'
                //data: response
            }
        } else {

           console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al intentar cambiar el estatus de una Oferta'
            }
        }

        //////////ENVIAMOS NOTIFICACIÓN////////////
        let token=response.tokenpush;
        let titulo=response.titulo;
        let detalle=response.detalles;
        let datanoti={
            "title": response.titulo,
            "body": response.detalles,
            "idOffer":response.idOferta,
            "idNotification":response.idNotificacion,
            "idrelation":response.idrelation,
            "TypeNotification":response.TypeNotification,
            "UserPublication":response.UserPublication,
            "type": 0,
            "status": 0,
            "click_action": "FLUTTER_NOTIFICATION_CLICK"
         };
        
      notifications(token,titulo,detalle,datanoti);
        /////////////////////

        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};


//Listar los datos de la sala de chat segú status- TAKASTEAR 
userController.listChatRoomStatus = async (req) => {
    try {
        
            let statuSala= req.statuSalaChat;
            let idUder= req.idUder;
            if(req.statuSalaChat==1){
                statuSala=24
            }
            if(req.statuSalaChat==0){
                statuSala=25
            }

       
        //console.log(userData.password);
        let response = await ChatRooms.listChatRoomStatus(statuSala,idUder);

       //console.log(response);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                data: response.result,
                msg: 'Lista de salas de chat según status'
                //data: response
            }
        } else {

           // console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al Listar de  salas de Chat según status'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};


//
//CAMBIAR EL ESTADO DE UNA SALA DE CHAT- TAKASTEAR 
userController.CloseChatRoom = async (req) => {
    try {
        let takasteo=false;
        let OfferData ={};
       // console.log(req.typeQuestion);
            let status=25//SALA ACTIVA = 24 SALA CERRADA = 25
            
            ChatRoomData = {
                id: req.idSala,
                status:status
            };
       
        //console.log(OfferData);
        
        //let response = await Offer.FindDatOffer(OfferData);
       let response = await ChatRooms.CloseChatRoom(ChatRoomData);

       //console.log(response);
      // console.log(response.sala);

        let data = {};
        if (response && response.result) {
            let r = {};
            let sala='';
            r = response.result;
            if(response.sala){
                sala=response.sala;
            }
            data = {
                success: true,
                status: '200',
                takasteo:false,
                msg: 'sala de chat cerrada exitosamente'
                //data: response
            }
        } else {

           console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al intentar cerrar sala de chat'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};


// TAKASTEAR : 
///DETERMINAR DE QUE USUARIO ES LA ACCIÓN DEL MATCH 
// VERIFICAR QUE LOS DOS USUARIOS ESTEN DE ACUERO
// CAMBIAR DE ESTATUS A LA SALA - CERRARLA
// CAMBIAR DE ESTATUS LA PUBLICACIÓN
//CAMBIAR DE ESTATUS LOS ITEMS DE LA OFERTA (LA PUBLICACIONES DE CONFORMAN LA OFERTA)
userController.MatchOfferChatRoom = async (req) => {
    try {
        let takasteo=false;
        let OfferData ={};
       // console.log(req.typeQuestion);
            let status=25//SALA ACTIVA = 24 SALA CERRADA = 25

            ChatRoomData = {
                id: req.idSala,
                idUser:req.idUser,
                status:status
            };
       
        //console.log(OfferData);

        //let response = await Offer.FindDatOffer(OfferData);
        let isUserPubli=false; //si es usasuario de la publicación
        let pertenece =false; 
        let confirMatch =false; 
        let MsgMatch="";
        let titulo2="";
        let UserNotification2="";
        let detalles2="";

        ///DETERMINAR DE QUE USUARIO ES LA ACCIÓN DEL MATCH 
        let response=await ChatRooms.MatchOfferChatRoom(ChatRoomData,isUserPubli,confirMatch,MsgMatch,titulo2,UserNotification2,detalles2);
        //console.log(quien.result);        

       //console.log(response);
      // console.log(response.sala);

        let data = {};
        if (response && response.result) {
            let r = {};
            let sala='';
            r = response.result;
            if(response.sala){
                sala=response.sala;
            }
            
            data = {
                success: true,
                status: '200',
                idNotificacion:response.idNotificacion,
                idOferta:response.idOferta,
                TypeNotification:response.TypeNotification,
                UserPublication:response.UserPublication,
                takasteo:response.confirMatch,
                msg: response.MsgMatch
                //data: response
            }
        } else {

           console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al intentar hacer mach en la sala de chat'
            }
        }

        //////////ENVIAMOS NOTIFICACIÓN////////////
        let token=response.tokenPush;
        //console.log(token);
        let titulo=response.titulo;
        let detalle=response.detalles;
        let datanoti={
            "title": response.titulo,
            "body": response.detalles,
            "idOffer":response.idOferta,
            "idNotification":response.idNotificacion,
            "idrelation":response.idrelation,
            "TypeNotification":response.TypeNotification,
            "UserPublication":response.UserPublication,
            "type": 0,
            "status": 0,
            "click_action": "FLUTTER_NOTIFICATION_CLICK"
         };
        
         console.log(datanoti);
      notifications(token,titulo,detalle,datanoti);
        /////////////////////


        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

userController.MatchOfferCR = async (req) => {
    try {
        let takasteo=false;
        let OfferData ={};
       // console.log(req.typeQuestion);
            let status=25//SALA ACTIVA = 24 SALA CERRADA = 25

            ChatRoomData = {
                id: req.idSala,
                idUser:req.idUser,                
                match:req.match,
                status:status
            };
       
        //console.log(OfferData);

        //let response = await Offer.FindDatOffer(OfferData);
        let isUserPubli=false; //si es usasuario de la publicación
        let pertenece =false; 
        let confirMatch =req.match; 
        let MsgMatch="";
        let titulo2="";
        let UserNotification2="";
        let detalles2="";

        ///DETERMINAR DE QUE USUARIO ES LA ACCIÓN DEL MATCH 
        let response=await ChatRooms.MatchOfferCR(ChatRoomData,isUserPubli,confirMatch,MsgMatch,titulo2,UserNotification2,detalles2);
        //console.log(quien.result);        

       //console.log(response);
      // console.log(response.sala);

        let data = {};
        if (response && response.result) {
            let r = {};
            let sala='';
            r = response.result;
            if(response.sala){
                sala=response.sala;
            }
            
            data = {
                success: true,
                status: '200',
                idNotificacion:response.idNotificacion,
                idOferta:response.idOferta,
                TypeNotification:response.TypeNotification,
                UserPublication:response.UserPublication,
                takasteo:response.confirMatch,
                msg: response.MsgMatch
                //data: response
            }
        } else {

           console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al intentar hacer mach en la sala de chat'
            }
        }

        //////////ENVIAMOS NOTIFICACIÓN////////////
        let token=response.tokenPush;
        //console.log(token);
        let titulo=response.titulo;
        let detalle=response.detalles;
        let datanoti={
            "title": response.titulo,
            "body": response.detalles,
            "idOffer":response.idOferta,
            "idNotification":response.idNotificacion,
            "idrelation":response.idrelation,
            "TypeNotification":response.TypeNotification,
            "UserPublication":response.UserPublication,
            "type": 0,
            "status": 0,
            "click_action": "FLUTTER_NOTIFICATION_CLICK"
         };
        
         console.log(datanoti);
         //notifications(token,titulo,detalle,datanoti);
        /////////////////////


        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};



//Listar los datos de la sala de chat- TAKASTEAR 
userController.listDataChatRoom = async (req) => {
    try {
        
            let idSala= req.idSalaChat;
            let idUser=req.idUser;
       
        console.log(idUser);
        console.log(idSala);
        let response = await ChatRooms.listDataChatRoom(idSala,idUser);

       //console.log(response);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result[0];

            data = {
                success: true,
                status: '200',
                isUserPubli:response.isUserPubli,
                match:response.match,
                data: response.result[0],
                msg: 'Data completa de la sala de chat'
                //data: response
            }
        } else {

           // console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al Listar la data de la sala de Chat'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};



//Listar notificaciones detalladas
userController.listNotifications = async (req) => {
    try {
        
          let idUser= req.idUser;
       
        //console.log(userData.password);
        let response = await notificationModel.listNotifications(idUser);

       //console.log(response);

        let data = {};
        if (response) {
            let r = [];
            if(response.result!=undefined){
                r = response.result;
            }
            console.log(r);
            data = {
                success: true,
                status: '200',
                data: r,
                msg: 'Lista detallada de notificaciones  con éxito'
                //data: response
            }
            console.log(response);

        } else {

            console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al Listar notificaciones'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};
///cantNotifications



//Obtener la cantidad de notifaciación SEGÚN BANDERA
userController.cantNotifications = async (req) => {
    try {
        
          let status= req.flagNotifications;
          let idUder= req.idUder;
          status=1;
       
        //console.log(userData.password);
        let response = await notificationModel.cantNotifications(status,idUder);

       //console.log(response);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result[0];

            data = {
                success: true,
                status: '200',
                data: r,
                msg: 'Cantidad de notificaciones según bandera obtenida con éxito'
                //data: response
            }
        } else {

           // console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al intentar obtener Cantidad de notificaciones según bandera'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};


// Obtener la cantidad de ofertas realizada a una publicación
userController.cantnOfertasPublications = async (req) => {
    try {
        
          let idPublication= req.idPublication;
       
        //console.log(userData.password);
        let response = await notificationModel.cantnOfertasPublications(idPublication);

       //console.log(response);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;


            data = {
                success: true,
                status: '200',
                CantOfertas: response.CantOfertas,
                msg: 'Cantidad de Ofertas a una publicación obtenidas con éxito'
                //data: response
            }
        } else {

           // console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al intentar obtener Cantidad de Ofertas a una publicación'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};



// Eliminación lógica de una publicación
userController.DeletePublication = async (req) => {
    try {
        
          let idfirebaseUser= req.idfirebaseUser;
          let idPublication= req.idPublication;
       
        //console.log(userData.password);
        let response = await Product.DeletePublication(idfirebaseUser,idPublication);

       console.log(response);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;


            data = {
                success: true,
                status: '200',                
                msg: 'publicación eliminada con éxito'
                //data: response
            }
        } else {

           // console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al intentar eliminar una publicación'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};


//CAMBIAR EL ESTADO DE UNA SALA DE CHAT- TAKASTEAR 
userController.changeStatusNotifications = async (req) => {
    try {
        let takasteo=false;
        let OfferData ={};
       // console.log(req.typeQuestion);
            let status=true;//ODERTA CANCELADA
            if(req.FlagStatus==0){
                status=false;// OFERTA ACTIVA
            }

            NotificationsData = {
                id: req.idNotifications,
                status:status
            };
       
        //console.log(OfferData);
        
        //let response = await Offer.FindDatOffer(OfferData);
       let response = await notificationModel.changeStatusNotifications(NotificationsData);

       //console.log(response);
      // console.log(response.sala);

        let data = {};
        if (response && response.result) {
            let r = {};
            let sala='';
            r = response.result;
            if(response.sala){
                sala=response.sala;
            }
            data = {
                success: true,
                status: '200',
                msg: 'Cambio de la notificación exitosamente'
                //data: response
            }
        } else {

           console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al intentar cambiar el estatus de la notificación'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

//////////////////TOMBOTAKAS////////////////////////////

//Nuevo Producto (TAKASTEAR)
userController.NewTomboTakas = async (req) => {
    //existe este usuario? 
    try {

            let now = new Date();
            let hoy=date.format(now, 'YYYY-MM-DD HH:mm:ss');
            let DLottk = new Date(req.DateLottk);
            let DateLottk = date.format(DLottk, 'YYYY-MM-DD HH:mm');


               console.log(DLottk) ;
            //buscar fecha de creación del producto
            /////
            /*GENERAR PIN DE REFERENCIA*/
            let pin="";
            let pinexistr={};
            let pinexist=1;
            //let pinexist=true;
            while (pinexist!=0 ) {
                pin= securePin.generateStringSync(6, securePin.defaultCharset);
                pinexistr= await tombotakas.PinExist(pin);
                pinexist=pinexistr.result;
                console.log("pinexist");
                console.log(pinexist);
            }
            //console.log(pin);
            ////

           // console.log(now+" - "+hoy);
            let dataTTK = {
                iduser: req.idfirebaseUser,
                name: req.namettk,
                datecreated: hoy,
                detailsevent: req.DetailsEventtk,
                detailspayments: req.DetailsPayments,
                detailsaward: req.DetailsAwardttk,
                datelot: DateLottk,
                pinreference:pin,
                money: req.moneyttk,
                price: req.pricettk,
                status:27
            };

            //console.log(dataTTK);

            const topeimg=10;      
            const ImagesLot = {};
            //console.log(req.ImagesLot.length);
            if(req.ImagesLot.length!=0){
                for(var atr1 in req.ImagesLot){
                    ImagesLot[atr1] = req.ImagesLot[atr1];     
                };
            }
        
         
            // console.log(req.ImagesProduct.length);
            // console.log(lengthkw);

            let msgError="";            

        let response ={};

        // && lengthkw<=topeKW 

        if(req.ImagesLot.length<=topeimg ){
            if(req.ImagesLot.length!=0){
                response = await tombotakas.NewTomboTakas(dataTTK,ImagesLot);
            }else{               
                msgError = "Una TomboTakas debe tener al menos una imagen";
            }

        }else{               
            msgError = "Se ha superado el límite de imagenes";
        }        
        
        //console.log(msgError);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                idTTK:r.insertId,
                pinReference:pin,
                msg: 'Tombotakas se ha creado con éxito'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
                //data: response.error,
                data: msgError,
                msg: 'Error al intentar registrar la Tombotakas'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

//Lista de mis Tombotakas
userController.MyTomboTakas = async (req) => {
    //existe este usuario? 
    try {       
         
            // console.log(req.ImagesProduct.length);
            // console.log(lengthkw);
            let idUser=req.idfirebaseUser;
            let Status=null;
            if(req.flagTTK!=null){
                if(req.flagTTK==0){
                    Status=27;
                }
                if(req.flagTTK==1){
                    Status=28;
                }

            }

            let msgError="";            

             let response ={};

        // && lengthkw<=topeKW 

            response = await tombotakas.MyTomboTakas(idUser,Status);
                    
        
        //console.log(msgError);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                data:response.result,
                msg: 'Lista de Tombotakas creada  con éxito'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgError,
                msg: 'Error al intentar Listar las Tombotakas del usuario'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

//Comprar o Apartar un ticket
userController.ComprarApartarTickets = async (req) => {
    //existe este usuario? 
    try {       

            let now = new Date();
            let hoy=date.format(now, 'YYYY-MM-DD HH:mm:ss');

            let idUser=req.idfirebaseUser;
            let idTombotaka=req.idTombotaka;
            let tickets=[];
            let ticketsNoDispo=[];
            let ticketsr=[];
            let ticketsNoDispor=[];
            let accionTTK=req.accionTTK;

            let ticketdispo=0;

            let t="";
            //const ImagesLot = {};
            if(req.tickets.length!=0){
                for(var atr1 in req.tickets){
                    ticketdispo= await tombotakas.TicketsDispo(idTombotaka,req.tickets[atr1]);
                    if(req.tickets[atr1]>=0 && req.tickets[atr1]<=99){   
                        if(req.tickets[atr1]<=9){
                            t="0"+req.tickets[atr1];
                            
                        } 
                        else{
                            t=""+req.tickets[atr1];
                        }  
                        

                        if(ticketdispo.result==0){
                            tickets.push(t);
                            ticketsr.push(req.tickets[atr1]);
                            //tickets[atr1] = req.tickets[atr1];
                        }else{
                            ticketsNoDispo.push(t);
                            ticketsNoDispor.push(req.tickets[atr1]);
                            //ticketsNoDispo[atr1]= req.tickets[atr1];
                        }
                    }                  
                        
                };

            }

            let msgError="";            

             let response ={};
             
            //COMPROBAR SI ESTÁN DISPONIBLES
            console.log(tickets.length);
            
            if(tickets.length!=0){
                response = await tombotakas.comprarapartartickets(idUser,idTombotaka,tickets,accionTTK,hoy);
            } 
            else{
                msgError="Los tickets nos están disponibles";
            }       
        
        //console.log(msgError);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                tickets:ticketsr,
                ticketsNoDispo:ticketsNoDispor,
                DetailsPayments:response.detailspayments,
                msg: 'Los tickets disponibles fueron procesados con éxito'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
                data: msgError,
                msg: 'Error al intentar Procesar tickets'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};


//Lista de mis Tombotakas
userController.FindTomboTakasPin = async (req) => {
    //existe este usuario? 
    try {       
         
            // console.log(req.ImagesProduct.length);
            // console.log(lengthkw);
            let pinttk=req.pinttk;
            

            let msgError="";            

             let response ={};

        // && lengthkw<=topeKW 

            response = await tombotakas.FindTomboTakasPin(pinttk);
                    
        
        //console.log(msgError);

        let data = {};
        let datar = [];
        if (response && response.result) {
            let r = {};
            r = response.result;
            if(response.result.length>0){
                datar=response.result[0]
            }

            data = {
                success: true,
                status: '200',
                data:datar,
                msg: 'Tombotakas ha sido encontrada con éxito'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgError,
                msg: 'Error al intentar buscar Tombotakas'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};


//Lista de mis Tombotakas
userController.MyTickets = async (req) => {
    //existe este usuario? 
    try {       
         
            // console.log(req.ImagesProduct.length);
            // console.log(lengthkw);
            let idfirebaseUser=req.idfirebaseUser;
            let Status=null;
            let MsgLista="Lista de todos los tickets";
            if(req.flagTTK!=null){
                if(req.flagTTK==0){
                    Status=30;
                    MsgLista="Lista de los tickets Apartados";
                }
                if(req.flagTTK==1){
                    Status=31;
                    MsgLista="Lista de los tickets Aceptados";
                }
                if(req.flagTTK==2){
                    Status=33;
                    MsgLista="Lista de los tickets Rechazados";
                }

            }
            

            let msgError="";            

             let response ={};

        // && lengthkw<=topeKW 

            response = await tombotakas.MyTickets(idfirebaseUser,Status);
                    
        
        //console.log(msgError);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                data:response.result,
                msgprocess:MsgLista,
                msg: 'Lista de tickets'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgError,
                msg: 'Error al intentar Listar tickets'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

//Lista de mis Tombotakas
userController.TombotakasGroup = async (req) => {
    //existe este usuario? 
    try {       
         
            // console.log(req.ImagesProduct.length);
            // console.log(lengthkw);
            let idfirebaseUser=req.idfirebaseUser;
            let Status=null;
            let MsgLista="Lista de todos los tickets";
            if(req.flagTTK!=null){
                if(req.flagTTK==0){
                    Status=30;
                    MsgLista="Lista de los tickets Apartados";
                }
                if(req.flagTTK==1){
                    Status=31;
                    MsgLista="Lista de los tickets Aceptados";
                }
                if(req.flagTTK==2){
                    Status=33;
                    MsgLista="Lista de los tickets Rechazados";
                }

            }
            

            let msgError="";            

             let response ={};

        // && lengthkw<=topeKW 

            response = await tombotakas.TombotakasGroup(idfirebaseUser,Status);
                    
        
        //console.log(msgError);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                data:response.result,
                msgprocess:MsgLista,
                msg: 'Lista de tickets agrupados por tombotakas'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgError,
                msg: 'Error al intentar Listar tickets agrupados por Tombotakas'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};



//Solicitudes de Tickets
userController.RequestsTickets = async (req) => {
    //existe este usuario? 
    try {       
         
            // console.log(req.ImagesProduct.length);
            // console.log(lengthkw);
            let idfirebaseUser=req.idfirebaseUser;
            // let Status=null;
            // if(req.flagTTK!=null){
            //     if(req.flagTTK==0){
            //         Status=27;
            //     }
            //     if(req.flagTTK==1){
            //         Status=28;
            //     }

            // }
            

            let msgError="";            

             let response ={};

        // && lengthkw<=topeKW 

            response = await tombotakas.RequestsTickets(idfirebaseUser);
                    
        
        //console.log(msgError);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                data:response.result,
                msg: 'Solicitudes de tickets'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgError,
                msg: 'Error al intentar Listar solicitudes tickets'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

//Lista de mis Tombotakas
userController.TombotakasGroupCreator = async (req) => {
    //existe este usuario? 
    try {       
         
            // console.log(req.ImagesProduct.length);
            // console.log(lengthkw);
            let idfirebaseUser=req.idfirebaseUser;
            let idtombola=req.idtombola;
            let Status=null;
            let MsgLista="Lista de todos los tickets";
            if(req.flagTTK!=null){
                if(req.flagTTK==0){
                    Status=30;
                    MsgLista="Lista de los tickets Apartados";
                }
                if(req.flagTTK==1){
                    Status=31;
                    MsgLista="Lista de los tickets Aceptados";
                }
                if(req.flagTTK==2){
                    Status=33;
                    MsgLista="Lista de los tickets Rechazados";
                }

            }
            

            let msgError="";            

             let response ={};

        // && lengthkw<=topeKW 

            response = await tombotakas.TombotakasGroupCreator(idfirebaseUser,idtombola,Status);
                    
        
        //console.log(msgError);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                data:response.result,
                msgprocess:MsgLista,
                msg: 'Lista de tickets agrupados por Clientes'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgError,
                msg: 'Error al intentar Listar tickets agrupados por Clientes'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

//Solicitudes de Tickets
userController.ProcessRequestsTickets = async (req) => {
    //existe este usuario? 
    try {       
         
            // console.log(req.ImagesProduct.length);
            // console.log(lengthkw);
            let idfirebaseUserTTK=req.idfirebaseUserTTK;
            let idticket=req.idticket;
            let idttk=req.idttk;
            //let FlagTTk=req.FlagTTk;
            console.log(req.FlagTTk);
            let statusTicket=30;
            let MsgStatus="";
            // let Status=null;
            
                if(req.FlagTTk==2){
                    statusTicket=31;//COMPRADO (VENDER )
                    MsgStatus="Ha aceptado la compra de éste ticket";
                }
                if(req.FlagTTk==4){
                  
                    statusTicket=33;//RECHAZADO
                    MsgStatus="Ha rechazado la compra de éste ticket";;
                }

            console.log(statusTicket);         

            let msgError="";            

             let response ={};

        // && lengthkw<=topeKW 


            const Tickets = {};
            //console.log(req.ImagesProduct.length);
            if(req.Tickets.length!=0){               
                for(var atr1 in req.Tickets){
                    Tickets[atr1] = req.Tickets[atr1];     
                };
            }

            response = await tombotakas.ProcessRequestsTickets(idfirebaseUserTTK,Tickets,statusTicket,idttk);
                    
        
        //console.log(msgError);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                MsgStatus:MsgStatus,
                //data:response.result,
                msg: 'Ticket procesado exitosamente'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgErr,
                msdErro:response.msgErr,
                msg: 'Error al intentar procesar ticket'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};


//Detalles Tombotakas
userController.DetailsTombotakas = async (req) => {
    //existe este usuario? 
    try {       
         
            // console.log(req.ImagesProduct.length);
            // console.log(lengthkw);
            let idfirebaseUser=req.idfirebaseUser;
            let idTTK=req.idTTK;
            //let FlagTTk=req.FlagTTk;
            let statusTicket=30;
            // let Status=null;
            // if(req.flagTTK!=null){
            //     if(req.flagTTK==2){
            //         statusTicket=31;//COMPRADO (VENDER )
            //     }
            //     if(req.flagTTK==4){
            //         statusTicket=33;//RECHAZADO
            //     }
            // }            

            let msgError="";            

             let response ={};

        // && lengthkw<=topeKW 

            response = await tombotakas.DetailsTombotakas(idfirebaseUser,idTTK);
                    
        
        //console.log(msgError);

        let data = {};
        let datar = [];
        if (response && response.result) {
            let r = {};
            r = response.result;

            if(response.result.length>0){
                datar=response.result[0]
            }


            data = {
                success: true,
                status: '200',
                data:r,
                msg: 'Detalle de Tombotakas encontrado exitosamente'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgError,
                msg: 'Error al intentar buscar detalles de Tombotakas'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};




//PUNTUACIÓN A UNA PUBLICACIÓN
userController.scorePublication = async (req) => {
    //existe este usuario? 
    try {       

            let idfirebaseUser=req.idfirebaseUser;
            let idPublication=req.idPublication;
            let scoreUser=req.scoreUser;
            console.log(scoreUser);
            //let FlagTTk=req.FlagTTk;
            let statusTicket=30;                      

            let msgError="";            

             let response ={};

        // && lengthkw<=topeKW 

            response = await Product.scorePublication(idfirebaseUser,idPublication,scoreUser);
                    
        
        //console.log(msgError);

        let data = {};
        let datar = [];
        if (response.result) {
            let r = {};
            r = response.result;
            //console.log(response.result);
            if(response.result.length>0){
                datar=response.result[0]
            }


            data = {
                success: true,
                status: '200',
                //data:datar,
                msg: 'Se ha calificado exitosamente'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgError,
                msg: 'Error al intentar calificar '
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};





//PQRs
userController.pqrs = async (req) => {
    //existe este usuario? 
    try {       
            let status=0;
            if(req.flagPQRs==0){
                status=34;//PREGUNTAS
            }
            if(req.flagPQRs==1){
                status=35;//QUEJAS
            }
            // if(req.flagPQRs==2){
            //     status=36;//RESPUESTAS
            // }
            if(req.flagPQRs==3){
                status=37;//SUGERENCIAS
            }
            let now = new Date();
            let hoy=date.format(now, 'YYYY-MM-DD HH:mm:ss');

            let DataPQRs={
               iduser: req.idfirebaseUser,
               details: req.detailsPQRs,
               datecreated: hoy,
               status: status
            }
           

            console.log(DataPQRs);
            //let FlagTTk=req.FlagTTk;
            //let statusTicket=30;                      

            let msgError="";            

             let response ={};

        // && lengthkw<=topeKW 
            if(status!=0){
             response = await PQRsModel.pqrs(DataPQRs);
            }
            else{
                response==null;
            }
                    
        
        //console.log(msgError);

        let data = {};
        let datar = [];
        if (response.result) {
            let r = {};
            r = response.result;
            //console.log(response.result);
            if(response.result.length>0){
                datar=response.result[0]
            }


            data = {
                success: true,
                status: '200',
                //data:datar,
                msg: 'Se ha creado la PQRs exitosamente'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgError,
                msg: 'Error al intentar crear una nueva PQRs'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

//PQRs Web
userController.pqrsweb = async (req) => {
    //existe este usuario? 
    try {       
            let status=0;
            if(req.flagPQRs==0){
                status=34;//PREGUNTAS
            }
            if(req.flagPQRs==1){
                status=35;//QUEJAS
            }
            // if(req.flagPQRs==2){
            //     status=36;//RESPUESTAS
            // }
            if(req.flagPQRs==3){
                status=37;//SUGERENCIAS
            }
            let now = new Date();
            let hoy=date.format(now, 'YYYY-MM-DD HH:mm:ss');

            let DataPQRs={
                name: req.name,
                email: req.email,
                details: req.message,
                datecreated: hoy,
                status: status
            }
           

            console.log(DataPQRs);
            //let FlagTTk=req.FlagTTk;
            //let statusTicket=30;                      

            let msgError="";            

             let response ={};

        // && lengthkw<=topeKW 
            if(status!=0){
             response = await PQRsModel.pqrsweb(DataPQRs);
            }
            else{
                response==null;
            }
                    
        
        //console.log(msgError);

        let data = {};
        let datar = [];
        if (response.result) {
            let r = {};
            r = response.result;
            //console.log(response.result);
            if(response.result.length>0){
                datar=response.result[0]
            }


            data = {
                success: true,
                status: '200',
                //data:datar,
                msg: 'Se ha creado la PQRs exitosamente'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgError,
                msg: 'Error al intentar crear una nueva PQRs'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};


//List PQRs Web
userController.listpqrs = async (req) => {
    //existe este usuario? 
    try {   
            let msgError="";            

             let response ={};
             response = await PQRsModel.listpqrs();

        let data = {};
        let datar = [];
        if (response.result) {
            let r = {};
            r = response.result;
            console.log(response.result);
            if(response.result.length>0){
                datar=response.result[0]
            }


            data = {
                success: true,
                status: '200',
                data:response.result,
                msg: 'Lista de PQRS'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgError,
                msg: 'Error al intentar crear una nueva PQRs'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

//SolicitarMembresia
userController.SolicitarMembresia = async (req) => {
    //existe este usuario? 
    try {       
            //let status=0;
            // if(req.flagPQRs==0){
            //     status=34;//PREGUNTAS
            // }
            // if(req.flagPQRs==1){
            //     status=35;//QUEJAS
            // }
            // if(req.flagPQRs==2){
            //     status=36;//RESPUESTAS
            // }
            // if(req.flagPQRs==3){
            //     status=37;//SUGERENCIAS
            // }
            let now = new Date();
            let hoy=date.format(now, 'YYYY-MM-DD HH:mm:ss');
            let iduser= req.idfirebaseUser;
            let Datamemberships={
                memberships: req.typeMemberships,
               datememberships: hoy,
               statusmemberships: 38
            }
           

            console.log(Datamemberships);
            //let FlagTTk=req.FlagTTk;
            //let statusTicket=30;                      

            let msgError="";            

             let response ={};

        // && lengthkw<=topeKW 
             response = await User.SolicitarMembresia(Datamemberships,iduser);
                 
        
        //console.log(msgError);

        let data = {};
        let datar = [];
        if (response.result) {
            let r = {};
            r = response.result;
            //console.log(response.result);
            if(response.result.length>0){
                datar=response.result[0]
            }


            data = {
                success: true,
                status: '200',
                //data:datar,
                msg: 'Solicitud ha sido enviada'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgError,
                msg: 'Error al intentar enviar solicitud'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

/////////////SUBASTAKAS//////////////////////

//Nueva Subastakas (SUBASTAKAS)
userController.NewSubasTakasCKW = async (req) => {
    //existe este usuario? 
    try {

            let now = new Date();
            let hoy=date.format(now, 'YYYY-MM-DD HH:mm:ss');

            let beginSubastakas = new Date(req.beginSubastakas);
            let begin=date.format(beginSubastakas, 'YYYY-MM-DD HH:mm:ss');

            let endSubastakas = new Date(req.endSubastakas);
            let end=date.format(new Date(req.endSubastakas), 'YYYY-MM-DD HH:mm:ss');
            

            // let DLottk = new Date(req.DateLottk);
            // let DateLottk = date.format(DLottk, 'YYYY-MM-DD HH:mm');

            // console.log(req.beginSubastakas+" - "+beginSubastakas+" - "+begin);
            // console.log(req.endSubastakas+" - "+endSubastakas+" - "+end);

            // console.log(req.beginSubastakas+" - "+beginSubastakas+" - "+begin);
            // console.log(req.endSubastakas+" - "+endSubastakas+" - "+end);

            // let datepublication = new Date(rp.result.datepublication);
            // //fecha de creación de producto
            // let fechacp = date.format(datepublication, 'YYYY-MM-DD HH:mm:ss');
            // //console.log(now);
            // let Diferenciafechas=date.subtract(beginSubastakas, endSubastakas).toMinutes();
            // console.log("Diferenciafechas: "+Diferenciafechas);

            //buscar fecha de creación del producto

           // console.log(now+" - "+hoy);
            let UseSubastakas = null;
            if(req.UseSubastakas!=null){               
                 UseSubastakas= req.UseSubastakas;  
                //  console.log("UsePoduct");
                //  console.log(UsePoduct);                
            }

            let SizeSubastakas = null;
            if(req.SizeSubastakas!=null){               
                SizeSubastakas= req.SizeSubastakas;  
                 console.log("SizeSubastakas");
                // console.log(SizePoduct);                
            }

            let WeightSubastakas = null;
            if(req.WeightSubastakas!=null){
                if(req.WeightSubastakas!=null){               
                    WeightSubastakas= req.WeightSubastakas;  
                    // console.log("WeightSubastakas");
                    // console.log(WeightSubastakas);                
                }
            }

            let SubastakasData = {
                iduser: req.iduserSubastakas,
                datepublication: hoy,
                datebeginst: begin,
                dateendst: end,
                new: req.NewSubastakas,
                conditions:UseSubastakas,
                size: SizeSubastakas,
                weight: WeightSubastakas,
                valueweight:req.ValueWeightProduct,
                unitofmeasurement: req.UnitOfMeasurementP,
                name: req.nameSubastakas,
                details: req.detailsSubastakas,
                typemoney: req.typemoneySubastakas,
                marketvalue: req.marketvalueSubastakas,
                subcategory:req.subcategorySubastakas,
                datecreated: hoy,
                typepublication:3,
                status:3
            };
            const topeimg=10;      
            const ImagesSubastakas = {};
            let NoImg=false;
            //console.log(req.ImagesProduct.length);
            if(req.ImagesSubastakas.length!=0){
               
                for(var atr1 in req.ImagesSubastakas){
                    ImagesSubastakas[atr1] = req.ImagesSubastakas[atr1];     
                };
                NoImg=true;
            }

           

            const topeKW=10;      
            const KeyWordsSubastakas = [];
            let lengthkw=0;
            //console.log(req.ImagesProduct.length);
            if(req.KeyWordsSubastakas!=null && req.KeyWordsSubastakas!=undefined){
                lengthkw=req.KeyWordsSubastakas.length;
                if(req.KeyWordsSubastakas.length!=0){
                    for(var atr1 in req.KeyWordsSubastakas){
                        KeyWordsSubastakas[atr1] = req.KeyWordsSubastakas[atr1];     
                    };
                   // console.log(KeyWordsSubastakas);
                }
            }
            console.log(KeyWordsSubastakas);
            
            // console.log(req.ImagesProduct.length);
            // console.log(lengthkw);
            // console.log(topeKW);
            // console.log(valReferencia);

            let msgError="";
            

        let response ={};

        // && lengthkw<=topeKW 

        if(req.ImagesSubastakas.length<=topeimg && NoImg==true){//<
            response = await Product.NewSubasTakasCKW(SubastakasData,ImagesSubastakas,KeyWordsSubastakas);
            // response = await Product.NewProductCKW(ProductData,PreferecesProduct,ImagesProduct);

        }else{               
            msgError = "Se ha superado el límite de imagenes ó no ingresó imagenes";
        }
        
        //console.log(msgError);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result[0];
//console.log(response);
            data = {
                success: true,
                status: '200',
                idsubastakas: response.result.insertId, 
                msg: 'Subastakas registrada con éxito'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
                //data: response.error,
                data: msgError,
                msg: 'Error al registrar Subastakas'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};



//Listar las publicaciones  de otros usuarios- TAKASTEAR 
userController.ListSubasTakas = async (req) => {
    try {

        let FlagSubastakas=req.FlagSubastakas;
        let statuSubastakas=3; //Publicación activa
        if(FlagSubastakas==1){
            statuSubastakas=4; // Publicación Takasteada
        }
        if(FlagSubastakas==2){
            statuSubastakas=5;//Publicación Elimidada ó Deshabilitada
        }
        if(FlagSubastakas==3){
            statuSubastakas=26;//Publicación Editada
        }

        const UserData = {
            iduser: req.idfirebaseUser
        };
        const SubastakasData = {
            status: statuSubastakas
        };
        //console.log(ProductData.status);
        //
        let response = await Product.ListSubasTakas(UserData,SubastakasData);

       console.log(response);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                data: response.result,
                msg: 'Lista de Subastakas'
                //data: response
            }
        } else {

           // console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al Listar Subastakas'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

//Listar las publicaciones  de otros usuarios- TAKASTEAR 
userController.ListMiSubasTakas = async (req) => {
    try {

        let FlagSubastakas=req.FlagSubastakas;
        let statuSubastakas=3; //Publicación activa
        if(FlagSubastakas==1){
            statuSubastakas=4; // Publicación Takasteada
        }
        if(FlagSubastakas==2){
            statuSubastakas=5;//Publicación Elimidada ó Deshabilitada
        }
        if(FlagSubastakas==3){
            statuSubastakas=26;//Publicación Editada
        }

        const UserData = {
            iduser: req.idfirebaseUser
        };
        const SubastakasData = {
            status: statuSubastakas
        };
        //console.log(ProductData.status);
        let response = await Product.ListMiSubasTakas(UserData,SubastakasData);

       console.log(response);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                data: response.result,
                msg: 'Lista de mis subastakas'
                //data: response
            }
        } else {

           // console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al Listar mis subastakas'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};


userController.DetailSubasTakas = async (req) => {
    try {
        const SubasTakasData = {
            id: req.IdSubastakas,
            iduser: req.IdUserSubastakas
            
        };
        //console.log(userData.password);
        let response = await Product.DetailSubasTakas(SubasTakasData);

       //console.log(response);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                data: response.result[0],
                images: response.images,
                msg: 'Listar detalles de un producto'
                //data: response
            }
        } else {

           console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al Listar detalles de un producto'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};


userController.InterestedSubasTakas = async (req) => {
    try {
        let msg="Se ha registrado Me interesa";
        let FlagInterested= req.FlagInterested;
        let status= 1;
        if(FlagInterested==false){
            status= 2;
            msg="Se ha eliminado la indicación de Me interesa";
        }
        const DataInterested = {
            idsubastakas: req.IdSubastakas,
            iduser: req.IdUserSubastakas,
            status: status
            
        };
        console.log(DataInterested);
        let response = await Interested.InterestedSubasTakas(DataInterested,FlagInterested);

       //console.log(response);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                Interested:req.FlagInterested,
                msg: msg
                //data: response
            }
        } else {

           console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al intentar registar Subastakas como me interesa'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};


userController.InterestedProduct = async (req) => {
    try {
        let msg="Se ha registrado Me interesa";
        let FlagInterested= req.FlagInterested;
        let status= 1;
        if(FlagInterested==false){
            status= 2;
            msg="Se ha eliminado la indicación de Me interesa";
        }
        const DataInterested = {
            idproduct: req.IdProduct,
            iduser: req.IdUserProduct,
            status: status
            
        };
        console.log(DataInterested);
        let response = await Interested.InterestedProduct(DataInterested,FlagInterested);

       console.log(response);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                Interested:req.FlagInterested,
                msg: msg
                //data: response
            }
        } else {

           console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al intentar registar Takas como me interesa'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

userController.LisTodo = async (req) => {
    try {
        const SubasTakasData = {
            iduser: req.IdUserSubastakas            
        };
        //console.log(userData.password);
        let response = await Product.LisTodo(SubasTakasData);

       //console.log(response);

       let data = {};
       if (response && response.result) {
           let r = {};
           r = response.result;

           data = {
               success: true,
               status: '200',
               data: r,
               images: response.images,
               msg: 'Listar Todas las publicaciones'
               //data: response
           }
       } else {

          console.log(response);
           data = {
               success: false,
               status: '500',
               msg: 'Error al Listar todas las Publicaciones'
           }
       }
       //validar si esta llegado vacio
       return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

//Listar las Subastakas que me interesan  
userController.MInterestedSubasTakas = async (req) => {
    try {

        let FlagSubastakas=req.FlagSubastakas;
        let statuSubastakas=3; //Publicación activa
        if(FlagSubastakas==1){
            statuSubastakas=4; // Publicación Takasteada
        }
        if(FlagSubastakas==2){
            statuSubastakas=5;//Publicación Elimidada ó Deshabilitada
        }
        if(FlagSubastakas==3){
            statuSubastakas=26;//Publicación Editada
        }

        const UserData = {
            iduser: req.idfirebaseUser
        };
        const SubastakasData = {
            status: statuSubastakas
        };
        //console.log(ProductData.status);
        let response = await Product.MInterestedSubasTakas(UserData,SubastakasData);

       console.log(response);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                data: response.result,
                msg: 'Lista de Subastakas marcadas como interesantes'
                //data: response
            }
        } else {

           // console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al Listar Subastakas marcadas como interesantes'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};
 

userController.GetChatRoomSubastakas = async (req) => {
    try {
        let match=false;
        let OfferData ={};
       // console.log(req.typeQuestion);
            let statusChatroomSubastakas=43;
            

            SubastakasData = {
                idUser: req.idUserFirabase,
                idSubastakas: req.idSubastakas,
                status:statusChatroomSubastakas
            };
       
        //console.log(OfferData);
        
        //let response = await Offer.FindDatOffer(OfferData);
       let response = await Product.GetSubasTakas(SubastakasData);

       //console.log(response);
      // console.log(response.sala);

        let data = {};
        if (response && response.result) {
            let r = {};
            let sala='';
            r = response.result;
            console.log(response);
            if(response.sala){
                sala=response.sala;
            }
            data = {
                success: true,
                status: '200',
                data:r,
                //msg: r.msg
                //data: response
            }
        } else {

           console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al intentar Obtener la Sala de la Subastakas'
            }
        }

        //////////ENVIAMOS NOTIFICACIÓN////////////
        let token=response.tokenpush;
        let titulo=response.titulo;
        let detalle=response.detalles;
        let datanoti={
            "title": response.titulo,
            "body": response.detalles,
            "idOffer":response.idOferta,
            "idNotification":response.idNotificacion,
            "idrelation":response.idrelation,
            "TypeNotification":response.TypeNotification,
            "UserPublication":response.UserPublication,
            "type": 0,
            "status": 0,
            "click_action": "FLUTTER_NOTIFICATION_CLICK"
         };
        
     notifications(token,titulo,detalle,datanoti);
        /////////////////////

        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

module.exports = userController;