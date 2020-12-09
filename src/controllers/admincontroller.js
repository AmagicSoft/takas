const PQRsModel = require('../models/pqrs.js');
const User = require('../models/users.js');
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
                msg: 'Se ha creado respuesta a la PQRs exitosamente'
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

            let msgError="";            

             let response ={};

        // && lengthkw<=topeKW 
             response = await User.CantUsersRegistrados(inicio,fin);
                 
        
        console.log(inicio);

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
                msg: 'Cantidad de Registrados según fecha'
                //data: response
            }
        } else {
            //console.log(response);
            data = {
                success: false,
                status: '500',
               // data: response.error,
               // data: msgError,
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





module.exports = AdminController;