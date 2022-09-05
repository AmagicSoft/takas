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



let userAdminController = {};

//newUser - REGISTRAR USUARIO
userAdminController.newUser = async (req) => {
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


module.exports = userAdminController;