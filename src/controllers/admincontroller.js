const PQRsModel = require('../models/pqrs.js');
const User = require('../models/users.js');
const UserAdmin = require('../models/usersadmin.js');
const Product = require('../models/product.js');
const tombotakas = require('../models/tombotakas.js');

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


let AdminController = {};


//Listar tipos de privilagios
AdminController.ListPrivilege = async () => {
    //existe este usuario? 
    try {

        //console.log(userData.password);
        let response = await UserAdmin.ListPrivilege();

        console.log(response);

        let data = {};
        if (response && response.result) {
            let r = {};
            r = response.result;

            data = {
                success: true,
                status: '200',
                data: response.result,
                msg: 'Lista de Tipo de Privilegios'
                //data: response
            }
        } else {

            console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al Listar Tipo de Privilegios'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

//Create Code
AdminController.CreateCode = async (req) => {
    //existe este usuario? 
    try {       
            let status=0;
           

            let now = new Date();
            let hoy=date.format(now, 'YYYY-MM-DD HH:mm:ss');

            /*GENERAR PIN DE REFERENCIA*/
            let pin="";
            let pinexistr={};
            let pinexist=1;
            //let pinexist=true;
            while (pinexist>0 ) {
                pin= securePin.generateStringSync(17, securePin.defaultCharset);
                pinexistr= await UserAdmin.PinExist(pin);
                pinexist=pinexistr.result;
                console.log("pinexist");
                console.log(pinexist);
            }


            let DataCode={
                code:pin,
                usercreator: req.IdUserCreator,
                privilege: req.Privilegio
            }
           

            console.log(DataCode);                     

            let msgError="";            

             let response ={};

             response = await UserAdmin.CreateCode(DataCode);
            
                    
        
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
                code:pin,
                msg: 'Código creado exitosamente'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgError,
                msg: 'Error al intentar crear una código de registro'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

//NewAdminUser
AdminController.NewAdminUser = async (req,sess) => {
    //existe este usuario? 
    try {       
            let status=0;           

            let now = new Date();
            let hoy=date.format(now, 'YYYY-MM-DD HH:mm:ss');

            /*COMPROBAR CODIGO*/
            let codigo="";

            console.log("codigo");
            
            codigo= await UserAdmin.CheckCode(req.codeAdmin);

            console.log(codigo);
             
            //crear Token
            const payload = {
                ignoreExpiration: true
            };

            var token = jwt.sign(payload, config.llave, {
                expiresIn: 60 * 60 * 720
            });
        //fin de creación de tonken
            let DataUserAdmin={
                //code:req.codeAdmin,
                user:req.userAdmin,
                email:req.emailAdmin,
                password:sha1(req.passwordAdmin),
                phonenumber:req.numberPhoneAdmin,
                token:token,
                status:1
            }
           

           // console.log(DataUserAdmin);                     

            let msgError="";            

             let response ={};
            if(codigo.result==1){
                let idCode=req.codeAdmin;
                response = await UserAdmin.NewAdminUser(DataUserAdmin,idCode); 
                 
            
            }else{
                response= {};
            }
                        
                    
        
        //console.log(msgError);

        let data = {};
        let datar = [];
        if (response.result) {
            //crear variables de sessión
            sess.auth = true;
            sess.IdUser = req.codeAdmin;
            sess.user = req.userAdmin;
            sess.mail = req.emailAdmin;
            sess.jwt  = token;
            sess.admin = true;


            let r = {};
            r = response.result;
            console.log(response.result);
            if(response.result.length>0){
                datar=response.result[0]
            }


            data = {
                success: true,
                status: '200',
                //data:datar,
                msg: 'Usuario Administrativo creado exitosamente'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgError,
                msg: 'Error al intentar crear Nuevo usuario'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

//LoginAdminUser - LOGIN USUARIO
AdminController.LoginAdminUser = async (req,sess) => {
    //existe este usuario? 
    try {
       const userData = {
            user: req.userAdmin,
            password:sha1(req.PasswordAdmin)
        };
        console.log(userData);
        let response = await UserAdmin.LoginAdminUser(userData);

        let data = {};
        if (response && response.result) {
            if(response.result.length>0){
                console.log(response.result);
                //crear variables de sessión
                sess.auth          = true;
                sess.IdUser        = response.result[0].code;
                sess.user          = response.result[0].user;
                sess.mail          = response.result[0].email;
                sess.jwt           = response.result[0].token;
                sess.imagen        = response.result[0].imgurl;
                sess.privilege     = response.result[0].privilege;
            }
         //fin del cración de variables de sesión
            //crear token
            let r = {};
            r = response.result;
            
           if(response.result.length>0){
                data = {
                    success: true,
                    status: '200',
                    idUser: response.result[0].code,
                    token:response.result[0].token,
                    msg: 'Usuario logueado con éxito'
                    //data: response
                }
            }else{
                data = {
                    success: true,
                    status: '500',
                    msg: 'Usuario y password no coinsiden'
                    //data: response
                }
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


//ResponsePQRs
AdminController.ResponsePQRs = async (req) => {
    //existe este usuario? 
    try {       
            let status=0;
            
            if(req.flagPQRs==2){
                status=36;//RESPUESTAS
            }

            let now = new Date();
            let hoy=date.format(now, 'YYYY-MM-DD HH:mm:ss');

            let DataPQRs={
               iduser: req.idfirebaseUser,
               idpqrs: req.idPQRs,
               details: req.detailsPQRs,
               dateresponse: hoy,
               status: status
            }
           

            console.log(DataPQRs);
            //let FlagTTk=req.FlagTTk;
            //let statusTicket=30;                      

            let msgError="";            

             let response ={};

        // && lengthkw<=topeKW 
            if(status!=0){
             response = await PQRsModel.ResponsePQRs(DataPQRs);
             let updatepqrs="UPDATE pqrs SET status = 36 WHERE id="+req.idPQRs;
             let responseupdatepqrs ={};
             let cant_row = {};
             responseupdatepqrs = await User.ListUsersConsole(updatepqrs,'users');
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
                msg: 'La PQRs se ha respondido exitosamente'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgError,
                msg: 'Error al intentar crear una respuesta para  PQRs'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};



//Gestionar Membresías
AdminController.GestionMembership = async (req) => {
    //existe este usuario? 
    try {       
            let status=0;
            
            if(req.flagMembership==1){
                status=39;//APROBADA
            }
            if(req.flagMembership==2){
                status=40;//EXPIRADA
            }
            if(req.flagMembership==3){
                status=41;//CANCELADA
            }
            if(req.flagMembership==4){
                status=42;//RECHAZADA
            }

            let now = new Date();
            let hoy=date.format(now, 'YYYY-MM-DD HH:mm:ss');
            let iduser= req.idfirebaseUser;
            let Datamemberships={
               datememberships: hoy,
               statusmemberships: status
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
                msg: 'Solicitud Procesada con éxito'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgError,
                msg: 'Error al intentar Procesar la solicitud solicitud'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};



//List Users
AdminController.ListUsers = async (req) => {
    //existe este usuario? 
    try {       
            let Consulta="";
            //DEFINIR SATATUS DE MEMBRESÍAS
            let statusMemberships=0;
            if(req.flagstatusMemberships==0){
                statusMemberships=38;//APROBADA
            }
            if(req.flagstatusMemberships==1){
                statusMemberships=39;//APROBADA
            }
            if(req.flagstatusMemberships==2){
                statusMemberships=40;//EXPIRADA
            }
            if(req.flagstatusMemberships==3){
                statusMemberships=41;//CANCELADA
            }
            if(req.flagstatusMemberships==4){
                statusMemberships=42;//RECHAZADA
            }
             //DEFINIR SATATUS DE USERS
             let statusUsers=0;
             if(req.flagStatusUser==0){
                 statusUsers=1;//APROBADA
             }
             if(req.flagStatusUser==1){
                 statusUsers=2;//APROBADA
             }

             //DEFINIR SATATUS DE USERS
             let Memberships=0;
             if(req.Memberships==0){
                 Memberships=1;//FREE
             }
             if(req.Memberships==1){
                 Memberships=2;//SUPRIME
             }
             
            


            //ASIGNAR CONSULTA
            if(req.TypeConsulta==0){
                Consulta="SELECT * FROM users";//SIN FILTRO
            }
            if(req.TypeConsulta==1){
                Consulta="SELECT * FROM users where id='"+req.idfirebaseUser+"'";//FILTRAR POR USUARIO
            }
            if(req.TypeConsulta==2){
                
                Consulta="SELECT * FROM users where statusmemberships='"+statusMemberships+"'";//FILTRAR POR STATUS DE MEMBESÍA
            }
            if(req.TypeConsulta==3){
                Consulta="SELECT * FROM users where status="+statusUsers;//FILTRAR POR STATUS DE USUARIOS

            }
            if(req.TypeConsulta==4){
                Consulta="SELECT * FROM users where statusmemberships="+statusMemberships+" AND status="+statusUsers;//FILTRAR POR STATUS DE MEMBESÍA
            }
            if(req.TypeConsulta==5){
                let datereg = new Date(req.dateRegMem);
                 let dr=date.format(datereg, 'YYYY-MM-DD');
                
                Consulta="SELECT * FROM users where datecreated='"+dr+"' AND status="+statusUsers;//FILTRAR POR STATUS DE MEMBESÍA

            }
            if(req.TypeConsulta==6){
                let dateMember = new Date(req.dateRegMem);
                 let dm=date.format(dateMember, 'YYYY-MM-DD');
                
                Consulta="SELECT * FROM users where datememberships='"+dm+"' AND status="+statusUsers;//FILTRAR POR STATUS DE MEMBESÍA

            }
            if(req.TypeConsulta==7){
                
                Consulta="SELECT * FROM users where memberships="+Memberships; //FILTRAR POR  MEMBESÍA

            }

            // let now = new Date();
            // let hoy=date.format(now, 'YYYY-MM-DD HH:mm:ss');
            // let iduser= req.idfirebaseUser;
            // let Datamemberships={
            //    datememberships: hoy,
            //    statusmemberships: status
            // }
           

            console.log(Consulta);
            //let FlagTTk=req.FlagTTk;
            //let statusTicket=30;                      

            let msgError="";            

             let response ={};

        // && lengthkw<=topeKW 
             response = await User.ListUsers(Consulta);
                 
        
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
                data:r,
                msg: 'Lista de usuarios con éxito'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgError,
                msg: 'Error al intentar Listar Usuarios'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

//List Admins
AdminController.ListAdmins = async (req) => {
    //existe este usuario? 
    try {       
            let Consulta="";           


            //ASIGNAR CONSULTA
            if(req.TypeConsulta==0){
                Consulta="SELECT * FROM usersadmin";//SIN FILTRO
            }
            if(req.TypeConsulta==1){
                Consulta="SELECT * FROM usersadmin where status='"+req.TypeConsulta+"'";//FILTRAR POR USUARIOS ACTIVOS
            }
            if(req.TypeConsulta==2){
                Consulta="SELECT * FROM usersadmin where status!=1";//FILTRAR POR USUARIOS INACTIVOS
            }
            console.log(Consulta);                     

            let msgError="";            

             let response ={};
             response = await User.ListUsers(Consulta);

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
                data:r,
                msg: 'Lista de Admins con éxito'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgError,
                msg: 'Error al intentar Listar Admins'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};


//List ChangeStatusAdmin
AdminController.ChangeStatusAdmin = async (req) => {
    //existe este usuario? 
    try {       
            let Consulta="";           


            //ASIGNAR CONSULTA
            Consulta="UPDATE  usersadmin SET  status='"+req.statusAdmin+"' where code='"+req.codeAdmin+"'";
            
            console.log(Consulta);                     

            let msgError="";            

             let response ={};
             response = await User.ListUsers(Consulta);

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
                statusAdmin:req.statusAdmin,
                msg: 'Cambio de status con éxito'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgError,
                msg: 'Error al intentar Listar Admins'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

// ListPublicationsUserId
AdminController.ListPublicationsUserId = async (req) => {
    //existe este usuario? 
    try {       
            let Consulta="";           


            //ASIGNAR CONSULTA
            Consulta="SELECT * FROM product where status="+req.statusP+" and iduser="+req.idUser;//FILTRAR POR USUARIOS INACTIVOS
            
           // Consulta="UPDATE  usersadmin SET  status='"+req.statusAdmin+"' where code='"+req.codeAdmin+"'";
            
            console.log(Consulta);                     

            let msgError="";            

             let response ={};
             response = await User.ListUsers(Consulta);

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
                statusAdmin:req.statusAdmin,
                data:r,
                msg: 'Lista de Publicaciones por Usuario'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgError,
                msg: 'Error al intentar Listar Publicaciones por Usuarios'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};



// ChangeStatusPublication
AdminController.ChangeStatusPublication = async (req) => {
    //existe este usuario? 
    try {       
            let Consulta=""; 
            let status = 5;   
            let Mensaje = 'El estado de la publicacion ha sido modificada a inhabilitada con exito'       
            if(req.flap_status == true){
                status= 1
                Mensaje = 'El estado de la publicacion ha sido modificada a habilitada con exito'

            }

            //ASIGNAR CONSULTA
             Consulta="UPDATE  product SET  status="+status+" where id="+req.id_publication;
            
            console.log(Consulta);                     

            let msgError="";            

             let response ={};
             response = await User.ListUsers(Consulta);

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
                statusPublication:req.flap_status,
                msg: Mensaje
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgError,
                msg: 'Error al intentar cambiar el  estado de la publicacion ha sido modificada con exito'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};



//List Publicaciones
AdminController.ListPublications = async (req) => {
    //existe este usuario? 
    try {       
            let Consulta="";           


            //ASIGNAR CONSULTA
            if(req.TypeConsulta==0){
                Consulta="SELECT * FROM usersadmin";//SIN FILTRO
            }
            if(req.TypeConsulta==1){
                Consulta="SELECT * FROM usersadmin where status='"+req.TypeConsulta+"'";//FILTRAR POR USUARIOS ACTIVOS
            }
            if(req.TypeConsulta==2){
                Consulta="SELECT * FROM usersadmin where status!=1";//FILTRAR POR USUARIOS INACTIVOS
            }
            console.log(Consulta);                     

            let msgError="";            

             let response ={};
             response = await User.ListUsers(Consulta);

             console.log(response);  

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
                data:r,
                msg: 'Lista de Admins con éxito'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgError,
                msg: 'Error al intentar Listar Admins'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

//List Publicaciones
AdminController.ListPublications2 = async (req) => {
    //existe este usuario? 
    try {       
            let Consulta="";     
           
            console.log("entro");
            Consulta="SELECT * FROM product where status="+req.StatusP+" and typepublication="+req.TypeP;//FILTRAR POR USUARIOS INACTIVOS
            console.log(Consulta);                     

            let msgError="";            

             let response ={};
             response = await User.ListUsers(Consulta);

             console.log(response);  

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
                data:r,
                msg: 'Lista de Publicaciones con éxito'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgError,
                msg: 'Error al intentar Listar Publicaciones'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};


//CreateCategory
AdminController.CreateCategory = async (req) => {
    //existe este usuario? 
    try {       
          
             //DEFINIR SATATUS DE USERS
             let Consulta="";
            
                Consulta="INSERT INTO mastercategory (namec,typepublication,iconc,status) VALUE( '"+ req.name+"', "+ req.TypeP+",'"+ req.icon+"',1)";
             
            let msgError="";            

             let response ={};

        // && lengthkw<=topeKW 
             response = await Product.ListPublications(Consulta);
                 
        
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
               // data:r,
                msg: 'Categoría creada con éxito'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
                data: response.error,
               // data: msgError,
                msg: 'Error al intentar crear una nueva categoría '
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

//UpdateCategory
AdminController.UpdateCategory = async (req) => {
    //existe este usuario? 
    try {       
             let Consulta="UPDATE  mastercategory SET namec = '"+req.nameC+"',typepublication="+req.typePC+",iconc='"+req.iconC+"' WHERE id ="+req.idC;
             
            let msgError="";            

             let response ={};

        // && lengthkw<=topeKW 
             response = await Product.ListPublications(Consulta);
                 
        
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
               // data:r,
                msg: 'Categoría Editada con éxito'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
                data: response.error,
               // data: msgError,
                msg: 'Error al intentar editar una nueva categoría '
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};


//DeleteCategory
AdminController.DeleteCategory = async (req) => {
    //existe este usuario? 
    try {       
             let Consulta="UPDATE  mastercategory SET status = 0 WHERE id ="+req.idC;
             
            let msgError="";            

             let response ={};

        // && lengthkw<=topeKW 
             response = await Product.ListPublications(Consulta);
                 
        
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
               // data:r,
                msg: 'Categoría eliminada con éxito'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
                data: response.error,
               // data: msgError,
                msg: 'Error al intentar eliminar una nueva categoría '
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};


//ListCategorys
AdminController.ListCategorys = async (req) => {
    //existe este usuario? 
    try {       
            let status=0;
            if(req.StatusP==0){
                status=3;
            }
            if(req.StatusP==1){
                status=4;
            }
            if(req.StatusP==2){
                status=5;
            }
            if(req.StatusP==3){
                status=26;
            }
             //DEFINIR SATATUS DE USERS
             let Consulta="";
             if(req.TypeP==1){
                 Consulta="SELECT * FROM mastercategory WHERE typepublication=1 and status =1";//TAKASTEO
             }
             if(req.TypeP==2){
                Consulta="SELECT * FROM mastercategory WHERE typepublication=2 ";//SUBASTAKEAR
             }
             if(req.TypeP==3){
                Consulta="SELECT * FROM mastercategory WHERE typepublication=3 ";//SERVITAKASTEAR
             }

            let msgError="";            

             let response ={};

        // && lengthkw<=topeKW 
             response = await Product.ListPublications(Consulta);
                 
        
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
                data:r,
                msg: 'Lista de Publicaciones con éxito'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgError,
                msg: 'Error al intentar Listar Publicaciones'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

//LisTakasteos
AdminController.LisTakasteos = async (req) => {
    //existe este usuario? 
    try {       
            let status=0;
           let  Consulta="SELECT * FROM mastercategory WHERE typepublication=1 ";//TAKASTEO
            if(req.idUser!=null){
                Consulta="SELECT * FROM mastercategory WHERE typepublication=1 ";//TAKASTEO ID USER 
            }
           
             //DEFINIR SATATUS DE USERS
             if(req.TypeP==1){
                 Consulta="SELECT * FROM mastercategory WHERE typepublication=1 ";//TAKASTEO
             }
             if(req.TypeP==2){
                Consulta="SELECT * FROM mastercategory WHERE typepublication=2 ";//SUBASTAKEAR
             }
             if(req.TypeP==3){
                Consulta="SELECT * FROM mastercategory WHERE typepublication=3 ";//SERVITAKASTEAR
             }

            let msgError="";            

             let response ={};

        // && lengthkw<=topeKW 
             response = await Product.ListPublications(Consulta);
                 
        
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
                data:r,
                msg: 'Lista de Publicaciones con éxito'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgError,
                msg: 'Error al intentar Listar Publicaciones'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

//ListPublications
AdminController.ListPublications = async (req) => {
    //existe este usuario? 
    try {       
            let status=0;
            if(req.StatusP==0){
                status=3;
            }
            if(req.StatusP==1){
                status=4;
            }
            if(req.StatusP==2){
                status=5;
            }
            if(req.StatusP==3){
                status=26;
            }
             //DEFINIR SATATUS DE USERS
             let Consulta="";
             if(req.TypeP==0){
                 Consulta="SELECT * FROM product WHERE typepublication=1 AND status="+status;//TAKASTEO
             }
             if(req.TypeP==1){
                Consulta="SELECT * FROM product WHERE typepublication=2 AND status="+status;//SUBASTAKEAR
             }
             if(req.TypeP==2){
                Consulta="SELECT * FROM product WHERE typepublication=3 AND status="+status;//SERVITAKASTEAR
             }

            let msgError="";            

             let response ={};

        // && lengthkw<=topeKW 
             response = await Product.ListPublications(Consulta);
                 
        
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
                data:r,
                msg: 'Lista de Publicaciones con éxito'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgError,
                msg: 'Error al intentar Listar Publicaciones'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};



//LisTombotakas
AdminController.LisTombotakas = async (req) => {
    //existe este usuario? 
    try {       
            let status=0;
            if(req.StatusT==0){
                status=27;
            }
            if(req.StatusT==1){
                status=28;
            }
          

            let msgError="";            

             let response ={};

        // && lengthkw<=topeKW 
             response = await tombotakas.LisTombotakas(status);
                 
        
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
                data:r,
                msg: 'Lista de Publicaciones con éxito'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgError,
                msg: 'Error al intentar Listar Publicaciones'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};


//LisTombotakas
AdminController.LisTombotakas = async (req) => {
    //existe este usuario? 
    try {       
            let status=0;
            if(req.StatusT==0){
                status=27;
            }
            if(req.StatusT==1){
                status=28;
            }
          

            let msgError="";            

             let response ={};

        // && lengthkw<=topeKW 
             response = await tombotakas.LisTombotakas(status);
                 
        
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
                data:r,
                msg: 'Lista de tombotakas con éxito'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgError,
                msg: 'Error al intentar Listar Tombotakas'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

//Listar PQRs
AdminController.ListPQRs = async (req) => {
    //existe este usuario? 
    try {       
            let status=0;
            if(req.FlagPQRs==0){
                status=34;
            }
            if(req.FlagPQRs==1){
                status=35;
            }
            if(req.FlagPQRs==2){
                status=36;
            }
            if(req.FlagPQRs==3){
                status=37;
            }
            if(req.FlagPQRs==5){
                status=38;
            }
          

            let msgError="";            

             let response ={};

        // && lengthkw<=topeKW 
             response = await PQRsModel.ListPQRs(status);
                 
        
        console.log(status);

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
                data:r,
                msg: 'Lista de PQRs con éxito'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgError,
                msg: 'Error al intentar Listar PQRs'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

//Delete PQRs
AdminController.DeletePQRs = async (req) => {
    //existe este usuario? 
    try {       
            let status=38;
            let msgError="";            

             let response ={};

        // && lengthkw<=topeKW 
             response = await PQRsModel.DeletePQRs(req.idPQRs);

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
                msg: 'PQRs archivada con éxito'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgError,
                msg: 'Error al intentar archivar PQRs'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

//Listar PQRs
AdminController.DeleteSUser = async (req) => {
    //existe este usuario? 
    try {       
            let id=req.idFirebaseUser;
            

            let msgError="";            

             let response ={};

        // && lengthkw<=topeKW 
             response = await User.DeleteSUser(id);
                 
        
        console.log(status);

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
                data:r,
                msg: 'Usuario inhabilitado con éxito'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgError,
                msg: 'Error al intentar inhabilitar usuario'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

///////////////INDICADORES ADMIN//Cantidad de registrados
AdminController.CantUsersRegistrados = async (req) => {
    //existe este usuario? 
    try {       
            let now = new Date();
            let hoy=date.format(now, 'YYYY-MM-DD');
            let inicio=hoy;
            let fin=hoy;
           
            if(req.DateInicio!=null){
                inicio=req.DateInicio;
            }
            if(req.DateFin!=null){
                fin=req.DateFin;
            }

            console.log("DateInicio");
            console.log(req.DateInicio);
            console.log(inicio);
            console.log("DateFin");
            console.log(req.DateFin);
            console.log(fin);

            let msgError="";            

             let response ={};
             response = await User.CantUsersRegistrados(inicio,fin);

        let data = {};
        let datar = [];
        if (response.result) {
            let r = {};
            r = response.result;
            let cantRU = response.result.length;
            console.log(response.result.length);
            if(response.result.length>0){
                datar=response.result[0]
            }


            data = {
                success: true,
                status: '200',
                data:cantRU,
                msg: 'Cantidad de Registrados según fecha'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al intentar Obtener cantidad de registros según fecha'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};///////////////////////////////


//Cantidad de Publicaciones
AdminController.cantPublications = async (req) => {
    //existe este usuario? 
    try {       
            let now = new Date();
            let hoy=date.format(now, 'YYYY-MM-DD');
            let inicio=hoy;
            let fin=hoy;

            if(req.DateInicio!=null){
                inicio=req.DateInicio;
            }
            if(req.DateFin!=null){
                fin=req.DateFin;
            }

            let msgError="";            

             let response ={};

        // && lengthkw<=topeKW 
             response = await Product.cantPublications(inicio,fin);
                 
        
       // console.log(inicio);

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
                data:r,
                msg: 'Cantidad de Publicaciones según fecha'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgError,
                msg: 'Error al intentar Obtener cantidad de Publicaciones según fecha'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};///////////////////////////////


//Cantidad de Cantombotakas
AdminController.canTomboTakas = async (req) => {
    //existe este usuario? 
    try {       
            let now = new Date();
            let hoy=date.format(now, 'YYYY-MM-DD');
            let inicio=hoy;
            let fin=hoy;

            if(req.DateInicio!=null){
                inicio=req.DateInicio;
            }
            if(req.DateFin!=null){
                fin=req.DateFin;
            }

            let msgError="";            

             let response ={};

        // && lengthkw<=topeKW 
             response = await tombotakas.canTomboTakas(inicio,fin);
                 
        
       // console.log(inicio);

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
                data:r,
                msg: 'Cantidad de TomboTakas según fecha'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgError,
                msg: 'Error al intentar Obtener cantidad de TomboTakas según fecha'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};



//Cantidad de Cantombotakas
AdminController.CantMemberShiprequests = async (req) => {
    //existe este usuario? 
    try {       
            let now = new Date();
            let hoy=date.format(now, 'YYYY-MM-DD');
            let inicio=hoy;
            let fin=hoy;

            if(req.DateInicio!=null){
                inicio=req.DateInicio;
            }
            if(req.DateFin!=null){
                fin=req.DateFin;
            }

            let msgError="";            

             let response ={};

        // && lengthkw<=topeKW 
             response = await User.CantMemberShiprequests(inicio,fin);
                 
        
       // console.log(inicio);

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
                data:r,
                msg: 'Cantidad de Solicitudes de Membresías según fecha'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgError,
                msg: 'Error al intentar Obtener cantidad de Solicitudes de Membresías según fecha'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};

/** SERVICIOS PARA SALIR A PRODUCCIÓN */

///////////////Listar Usuarios con paginación
AdminController.ListUsersConsole = async (req) => {
    //existe este usuario? 
    try {       
            let pag = req.pag;
            if(req.pag == 1){
                pag = 0
            }else{
                pag = (req.pag-1) * req.items;
            }
            
            let   sqlData = {
                limit: req.items,
                offset: pag
            };

            let consultaR ="SELECT COUNT(*) AS cant_row FROM users WHERE status ="+req.status;
            let consulta = "SELECT * FROM users WHERE status ="+req.status+" limit "+sqlData.limit+" offset "+sqlData.offset;
            
            if(req.column){
                consulta = "SELECT * FROM users WHERE status ="+req.status+" AND "+req.column+" LIKE '%"+req.value+"%' limit "+sqlData.limit+" offset "+sqlData.offset;
                consultaR = "SELECT COUNT(*) AS cant_row  FROM users WHERE status ="+req.status+" AND  "+req.column+"  LIKE '%"+req.value+"%' ";
            }

            let msgError="";    
             let response ={};
             let cant_row = {};
             response = await User.ListUsersConsole(consulta,'users');
             cant_row = await User.ListUsersConsole(consultaR,'users');
             console.log("cant_row");
             let dataCr = cant_row.result[0].cant_row;
             
             let cantR = dataCr / req.items;
             console.log(cantR);
             let cantRR = Math.ceil(cantR);
             console.log(cantRR);
             
             if (cantRR / 1 == 0) {
                 
            } else {
                if(cantR<1){
                    cantR=cantRR;
                }
                else{
                  cantR=cantRR;  
                }  
            }

        let data = {};
        let datar = [];
        if (response.result) {
            let r = {};
            r = response.result;
            let cantRU = response.result.length;
            console.log(response.result.length);
            if(response.result.length>0){
                datar=response.result[0]
            }

            let data_result = {
                status: req.status,
                items_per_page: req.items,
                total_items: cant_row.result[0].cant_row,
                current_page: req.pag,
                total_pages: cantR,
                list_users: r
                
            }
            data = {
                success: true,
                status: '200',
                data: data_result,
                msg: 'Lista de Usuarios exitosa'
                
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al intentar listar usuarios'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};///////////////////////////////

///////////////Listar publicaciones de un  Usuario específico con paginación
AdminController.listPublicationsUsersConsole = async (req) => {
    try {       
            let pag = req.pag;
            if(req.pag == 1){
                pag = 0
            }else{
                pag = (req.pag-1) * req.items;
            }
            
            let   sqlData = {
                limit: req.items,
                offset: pag
            };

            let consultaR ="SELECT COUNT(*) AS cant_row FROM `product` WHERE iduser="+req.user_id+" AND  status ="+req.status;
            let consulta = "SELECT * FROM `product` AS p INNER JOIN `imgproduct` AS i ON p.`id`=i.`idproduct` WHERE p.iduser="+req.user_id+" AND p.status ="+req.status+" limit "+sqlData.limit+" offset "+sqlData.offset;
            
            if(req.column){
                consulta = "SELECT * FROM `product`AS p INNER JOIN `imgproduct` AS i ON p.`id`=i.`idproduct` WHERE p.iduser="+req.user_id+" AND p.status ="+req.status+" AND p."+req.column+" LIKE '%"+req.value+"%' limit "+sqlData.limit+" offset "+sqlData.offset;
                consultaR = "SELECT COUNT(*) AS cant_row  FROM `product`  WHERE iduser="+req.user_id+" AND status ="+req.status+" AND  "+req.column+"  LIKE '%"+req.value+"%' ";
            }

            let msgError="";    
             let response ={};
             let cant_row = {};
             response = await User.ListUsersConsole(consulta,'listp');
             cant_row = await User.ListUsersConsole(consultaR,'listp');
             console.log("cant_row");
             let dataCr = cant_row.result[0].cant_row;
             
             let cantR = dataCr / req.items;
             console.log(cantR);
             let cantRR = Math.ceil(cantR);
             console.log(cantRR);
             
             if (cantRR / 1 == 0) {
                 
            } else {
                if(cantR<1){
                    cantR=cantRR;
                }
                else{
                  cantR=cantRR;  
                }  
            }

        let data = {};
        let datar = [];
        if (response.result) {
            let r = {};
            r = {
              publicatinos: response.result
            };
            
            let cantRU = response.result.length;
            console.log(response.result.length);
            if(response.result.length>0){
                datar=response.result[0]
            }

            let data_result = {
                status: req.status,
                items_per_page: req.items,
                total_items: cant_row.result[0].cant_row,
                current_page: req.pag,
                total_pages: cantR,
                list_publications: r
                
            }
            data = {
                success: true,
                status: '200',
                data: data_result,
                msg: 'Lista de Publicaciones por  Usuario especifico exitosa'
                
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al intentar Listar publicaciones por usuario'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};///////////////////////////////


///////////////Listar top match (takasteos) con paginación
AdminController.topMatch = async (req) => {
    try {       
            let pag = req.pag;
            if(req.pag == 1){
                pag = 0
            }else{
                pag = (req.pag-1) * req.items;
            }
            
            let   sqlData = {
                limit: req.items,
                offset: pag
            };
           

            let consultaR ="SELECT o.`id` AS idoffer,o.`status` AS statusoffer, p.`id` AS idpublucation, p.`iduser` AS userpublication,u.`fullname`, COUNT(*) AS cant_row FROM offers AS o INNER JOIN product AS p ON o.`idproduct`=p.`id` INNER JOIN users AS u ON u.`idnumbre`=p.`iduser` WHERE o.status=7 GROUP BY userpublication ORDER BY cant_row DESC LIMIT 10  OFFSET 0";
            let consulta = "SELECT o.`id` AS idoffer,o.`status` AS statusoffer, p.`id` AS idpublucation, p.`iduser` AS userpublication,u.`fullname`, COUNT(*) AS cant_row FROM offers AS o INNER JOIN product AS p ON o.`idproduct`=p.`id` INNER JOIN users AS u ON u.`idnumbre`=p.`iduser` WHERE o.status=7 GROUP BY userpublication ORDER BY cant_row DESC LIMIT 10  OFFSET 0";
            if(req.user_id){
                 consultaR ="SELECT o.`id` AS idoffer,o.`status` AS statusoffer, p.`id` AS idpublucation, p.`iduser` AS userpublication,u.`fullname`, COUNT(*) AS cant_row FROM offers AS o INNER JOIN product AS p ON o.`idproduct`=p.`id` INNER JOIN users AS u ON u.`idnumbre`=p.`iduser` WHERE o.status=7 AND p.`iduser` = "+req.user_id+" GROUP BY userpublication ORDER BY cant_row DESC LIMIT 10  OFFSET 0";
                 consulta = "SELECT o.`id` AS idoffer,o.`status` AS statusoffer, p.`id` AS idpublucation, p.`iduser` AS userpublication,u.`fullname`, COUNT(*) AS cant_row FROM offers AS o INNER JOIN product AS p ON o.`idproduct`=p.`id` INNER JOIN users AS u ON u.`idnumbre`=p.`iduser` WHERE o.status=7 AND p.`iduser` = "+req.user_id+" GROUP BY userpublication ORDER BY cant_row DESC LIMIT 10  OFFSET 0";    
            }
            
            let msgError="";    
             let response ={};
             let cant_row = {};
             response = await User.ListUsersConsole(consulta,'users');
             cant_row = await User.ListUsersConsole(consultaR,'users');
             console.log("cant_row");
             let dataCr = cant_row.result[0].cant_row;
             
             let cantR = dataCr / req.items;
             console.log(cantR);
             let cantRR = Math.ceil(cantR);
             console.log(cantRR);
             
             if (cantRR / 1 == 0) {
                 
            } else {
                if(cantR<1){
                    cantR=cantRR;
                }
                else{
                  cantR=cantRR;  
                }  
            }

        let data = {};
        let datar = [];
        if (response.result) {
            let r = {};
            r = response.result;
            let cantRU = response.result.length;
            console.log(response.result.length);
            if(response.result.length>0){
                datar=response.result[0]
            }

            let data_result = {
                status: req.status,
                items_per_page: req.items,
                total_items: cant_row.result.length,
                current_page: req.pag,
                total_pages: cantR,
                top_taksteos: r
                
            }
            data = {
                success: true,
                status: '200',
                data: data_result,
                msg: 'top de takasteos'
                
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al intentar obtener el top de takasteos'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};///////////////////////////////

///////////////Detalle del takasteo
AdminController.detailMatch = async (req) => {
    try {       
           
            let consulta = "SELECT o.`id` AS offer,(SELECT fullname FROM users WHERE idnumbre = o.`iduser`) AS user_offer, o.`idproduct` AS id_offer, (SELECT NAME FROM product WHERE id = o.`idproduct`) AS product_offer, o.`publication` AS id_publication,(SELECT NAME FROM product WHERE id = o.`publication`) AS publication, (SELECT fullname FROM users WHERE idnumbre = p.`iduser`) AS user_publication FROM offers AS o INNER JOIN product AS p ON o.`idproduct`=p.`id` WHERE o.status=7 AND o.`id` = "+req.idoffer;
            
            
            let msgError="";    
             let response ={};
             let cant_row = {};
             response = await User.ListUsersC(consulta,'listp');
            
        let data = {};
        let datar = [];
        if (response.result) {
            let r = {};
            r = response.result;
            
            let cantRU = response.result.length;
            console.log(response.result.length);
            if(response.result.length>0){
                datar=response.result[0]
            }

            let data_result =  r;
            data = {
                success: true,
                status: '200',
                detail_taksteo: data_result,
                msg: 'Detalle del takasteo exitosa'
                
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al intentar obtener el detalle de un takasteo'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};///////////////////////////////

///////////////Listar PQRS
AdminController.PqrsList = async (req) => {
    //existe este usuario? 
    try {       
            let pag = req.pag;
            if(req.pag == 1){
                pag = 0
            }else{
                pag = (req.pag-1) * req.items;
            }
            
            let   sqlData = {
                limit: req.items,
                offset: pag
            };

            let consultaR ="SELECT COUNT(*) AS cant_row FROM pqrs WHERE status ="+req.status;
            let consulta = "SELECT * FROM pqrs WHERE status ="+req.status+" limit "+sqlData.limit+" offset "+sqlData.offset;
            
            if(req.column){
                consulta = "SELECT * FROM pqrs WHERE status ="+req.status+" AND "+req.column+" LIKE '%"+req.value+"%' limit "+sqlData.limit+" offset "+sqlData.offset;
                consultaR = "SELECT COUNT(*) AS cant_row  FROM pqrs WHERE status ="+req.status+" AND  "+req.column+"  LIKE '%"+req.value+"%' ";
            }

            let msgError="";    
             let response ={};
             let cant_row = {};
             response = await User.ListUsersConsole(consulta,'users');
             cant_row = await User.ListUsersConsole(consultaR,'users');
             console.log("cant_row");
             let dataCr = cant_row.result[0].cant_row;
             
             let cantR = dataCr / req.items;
             console.log(cantR);
             let cantRR = Math.ceil(cantR);
             console.log(cantRR);
             
             if (cantRR / 1 == 0) {
                 
            } else {
                if(cantR<1){
                    cantR=cantRR;
                }
                else{
                  cantR=cantRR;  
                }  
            }

        let data = {};
        let datar = [];
        if (response.result) {
            let r = {};
            r = response.result;
            let cantRU = response.result.length;
            console.log(response.result.length);
            if(response.result.length>0){
                datar=response.result[0]
            }

            let data_result = {
                status: req.status,
                items_per_page: req.items,
                total_items: cant_row.result[0].cant_row,
                current_page: req.pag,
                total_pages: cantR,
                list_pqrs: r
                
            }
            data = {
                success: true,
                status: '200',
                data: data_result,
                msg: 'Lista de PQRS exitosa'
                
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al intentar listar usuarios'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};///////////////////////////////

///////////////Listar Categorias
AdminController.CategoryList = async (req) => {
    //existe este usuario? 
    try {       
            let pag = req.pag;
            if(req.pag == 1){
                pag = 0
            }else{
                pag = (req.pag-1) * req.items;
            }
            
            let   sqlData = {
                limit: req.items,
                offset: pag
            };

            let consultaR ="SELECT COUNT(*) AS cant_row FROM mastercategory WHERE status ="+req.status;
            let consulta = "SELECT * FROM mastercategory WHERE status ="+req.status+" limit "+sqlData.limit+" offset "+sqlData.offset;
            
            if(req.column){
                consulta = "SELECT * FROM mastercategory WHERE status ="+req.status+" AND "+req.column+" LIKE '%"+req.value+"%' limit "+sqlData.limit+" offset "+sqlData.offset;
                consultaR = "SELECT COUNT(*) AS cant_row  FROM mastercategory WHERE status ="+req.status+" AND  "+req.column+"  LIKE '%"+req.value+"%' ";
            }

            let msgError="";    
             let response ={};
             let cant_row = {};
             response = await User.ListUsersConsole(consulta,'users');
             cant_row = await User.ListUsersConsole(consultaR,'users');
             console.log("cant_row");
             let dataCr = cant_row.result[0].cant_row;
             
             let cantR = dataCr / req.items;
             console.log(cantR);
             let cantRR = Math.ceil(cantR);
             console.log(cantRR);
             
             if (cantRR / 1 == 0) {
                 
            } else {
                if(cantR<1){
                    cantR=cantRR;
                }
                else{
                  cantR=cantRR;  
                }  
            }

        let data = {};
        let datar = [];
        if (response.result) {
            let r = {};
            r = response.result;
            let cantRU = response.result.length;
            console.log(response.result.length);
            if(response.result.length>0){
                datar=response.result[0]
            }

            let data_result = {
                status: req.status,
                items_per_page: req.items,
                total_items: cant_row.result[0].cant_row,
                current_page: req.pag,
                total_pages: cantR,
                list_categorys: r
                
            }
            data = {
                success: true,
                status: '200',
                data: data_result,
                msg: 'Lista de Categorias exitosa'
                
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al intentar listar usuarios'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};///////////////////////////////

///////////////Listar usuarios administrativos
AdminController.UsersAdminList = async (req) => {
    //existe este usuario? 
    try {       
            let pag = req.pag;
            if(req.pag == 1){
                pag = 0
            }else{
                pag = (req.pag-1) * req.items;
            }
            
            let   sqlData = {
                limit: req.items,
                offset: pag
            };

            let consultaR ="SELECT COUNT(*) AS cant_row FROM usersadmin WHERE status ="+req.status;
            let consulta = "SELECT * FROM usersadmin WHERE status ="+req.status+" limit "+sqlData.limit+" offset "+sqlData.offset;
            
            if(req.column){
                consulta = "SELECT * FROM usersadmin WHERE status ="+req.status+" AND "+req.column+" LIKE '%"+req.value+"%' limit "+sqlData.limit+" offset "+sqlData.offset;
                consultaR = "SELECT COUNT(*) AS cant_row  FROM usersadmin WHERE status ="+req.status+" AND  "+req.column+"  LIKE '%"+req.value+"%' ";
            }

            let msgError="";    
             let response ={};
             let cant_row = {};
             response = await User.ListUsersConsole(consulta,'users');
             cant_row = await User.ListUsersConsole(consultaR,'users');
             console.log("cant_row");
             let dataCr = cant_row.result[0].cant_row;
             
             let cantR = dataCr / req.items;
             console.log(cantR);
             let cantRR = Math.ceil(cantR);
             console.log(cantRR);
             
             if (cantRR / 1 == 0) {
                 
            } else {
                if(cantR<1){
                    cantR=cantRR;
                }
                else{
                  cantR=cantRR;  
                }  
            }

        let data = {};
        let datar = [];
        if (response.result) {
            let r = {};
            r = response.result;
            let cantRU = response.result.length;
            console.log(response.result.length);
            if(response.result.length>0){
                datar=response.result[0]
            }

            let data_result = {
                status: req.status,
                items_per_page: req.items,
                total_items: cant_row.result[0].cant_row,
                current_page: req.pag,
                total_pages: cantR,
                list_categorys: r
                
            }
            data = {
                success: true,
                status: '200',
                data: data_result,
                msg: 'Lista de Categorias exitosa'
                
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al intentar listar usuarios'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};///////////////////////////////


///////////////Listar las categorias con mas publicaciones
AdminController.TopCategoryPublications = async (req) => {
    //existe este usuario? 
    try {       
            let pag = req.pag;
            if(req.pag == 1){
                pag = 0
            }else{
                pag = (req.pag-1) * req.items;
            }
            
            let   sqlData = {
                limit: req.items,
                offset: pag
            };
            //+req.status
            let consultaR ="SELECT COUNT(*) AS cant_row , p.`subcategory`, msc.`name`, msc.`category`, mc.`namec` FROM `product` AS p INNER JOIN mastersubcategory AS msc ON p.`subcategory` = msc.`idsc` INNER JOIN mastercategory AS mc ON mc.`id`= msc.`category`  GROUP BY p.`subcategory` ORDER BY cant_row DESC";
            let consulta = "SELECT COUNT(*) AS cant_row, p.`subcategory`, msc.`name`, msc.`category`, mc.`namec` FROM `product` AS p INNER JOIN mastersubcategory AS msc ON p.`subcategory` = msc.`idsc` INNER JOIN mastercategory AS mc ON mc.`id`= msc.`category`  GROUP BY p.`subcategory` ORDER BY cant_row DESC limit "+sqlData.limit+" offset "+sqlData.offset;
            
            if(req.column){
                consulta = "SELECT * FROM usersadmin WHERE "+req.column+" LIKE '%"+req.value+"%' limit "+sqlData.limit+" offset "+sqlData.offset;
                consultaR = "SELECT COUNT(*) AS cant_row  FROM usersadmin WHERE  "+req.column+"  LIKE '%"+req.value+"%' ";
            }

            let msgError="";    
             let response ={};
             let cant_row = {};
             response = await User.ListUsersConsole(consulta,'users');
             cant_row = await User.ListUsersConsole(consultaR,'users');
             console.log("cant_row");
             let dataCr = cant_row.result[0].cant_row;
             
             let cantR = dataCr / req.items;
             console.log(cantR);
             let cantRR = Math.ceil(cantR);
             console.log(cantRR);
             
             if (cantRR / 1 == 0) {
                 
            } else {
                if(cantR<1){
                    cantR=cantRR;
                }
                else{
                  cantR=cantRR;  
                }  
            }

        let data = {};
        let datar = [];
        if (response.result) {
            let r = {};
            r = response.result;
            let cantRU = response.result.length;
            console.log(response.result.length);
            if(response.result.length>0){
                datar=response.result[0]
            }

            let data_result = {
                status: req.status,
                items_per_page: req.items,
                total_items: response.result.length,
                current_page: req.pag,
                total_pages: cantR,
                list_categorys: r
                
            }
            data = {
                success: true,
                status: '200',
                data: data_result,
                msg: 'top de Categorias con mas publicaciones exitosa'
                
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al intentar listar top de categorias con mas publicaciones'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};///////////////////////////////


///////////////Listar las categorias con mas me interesa
AdminController.TopCategoryInterested = async (req) => {
    //existe este usuario? 
    try {       
            let pag = req.pag;
            if(req.pag == 1){
                pag = 0
            }else{
                pag = (req.pag-1) * req.items;
            }
            
            let   sqlData = {
                limit: req.items,
                offset: pag
            };
            //+req.status
            let consultaR ="SELECT COUNT(*) AS cant_row, p.`subcategory`, msc.`name`, mc.`namec` FROM `interested` AS i INNER JOIN `product` AS p ON p.`id`=i.`idproduct` INNER JOIN `mastersubcategory` AS msc ON msc.`idsc`=p.`subcategory` INNER JOIN `mastercategory` AS mc ON mc.`id`=msc.`category` GROUP BY p.`subcategory` ORDER BY cant_row DESC";
            let consulta = "SELECT COUNT(*) AS cant_row, p.`subcategory`, msc.`name`, mc.`namec` FROM `interested` AS i INNER JOIN `product` AS p ON p.`id`=i.`idproduct` INNER JOIN `mastersubcategory` AS msc ON msc.`idsc`=p.`subcategory` INNER JOIN `mastercategory` AS mc ON mc.`id`=msc.`category` GROUP BY p.`subcategory` ORDER BY cant_row DESC limit "+sqlData.limit+" offset "+sqlData.offset;
            
            if(req.column){
                consulta = "SELECT * FROM usersadmin WHERE "+req.column+" LIKE '%"+req.value+"%' limit "+sqlData.limit+" offset "+sqlData.offset;
                consultaR = "SELECT COUNT(*) AS cant_row  FROM usersadmin WHERE  "+req.column+"  LIKE '%"+req.value+"%' ";
            }

            let msgError="";    
             let response ={};
             let cant_row = {};
             response = await User.ListUsersConsole(consulta,'users');
             cant_row = await User.ListUsersConsole(consultaR,'users');
             console.log("cant_row");
             let dataCr = cant_row.result[0].cant_row;
             
             let cantR = dataCr / req.items;
             console.log(cantR);
             let cantRR = Math.ceil(cantR);
             console.log(cantRR);
             
             if (cantRR / 1 == 0) {
                 
            } else {
                if(cantR<1){
                    cantR=cantRR;
                }
                else{
                  cantR=cantRR;  
                }  
            }

        let data = {};
        let datar = [];
        if (response.result) {
            let r = {};
            r = response.result;
            let cantRU = response.result.length;
            console.log(response.result.length);
            if(response.result.length>0){
                datar=response.result[0]
            }

            let data_result = {
                status: req.status,
                items_per_page: req.items,
                total_items: cant_row.result[0].cant_row,
                current_page: req.pag,
                total_pages: cantR,
                list_categorys: r
                
            }
            data = {
                success: true,
                status: '200',
                data: data_result,
                msg: 'top de Categorias con mas publicaciones exitosa'
                
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
                msg: 'Error al intentar listar top de categorias con mas publicaciones'
            }
        }
        //validar si esta llegado vacio
        return { status: 'ok', data: data };
    } catch (e) {
        console.log(e);
        return { status: 'ko' };
    }

};///////////////////////////////


/** FIN  */





module.exports = AdminController;