const pool = require('../config/database');

const date = require('date-and-time');

let PQRsModel = {};

//Crear una nueva PQRs
PQRsModel.pqrs = (DataPQRs) => {
    return new Promise((resolve, reject) => {
     if (pool) {
         pool.query(
            'INSERT INTO pqrs SET ?', DataPQRs,
             (err, result) => {
                // console.log(err);
                // console.log(result);
                 if (err) {
                     resolve({
                         'error': err
                     })
                 } else {
                     resolve({
                         'result': result
                     })
                 }

             }
         )
         //return resultado;
     }
 })
};

//Crear una nueva PQRs Web
PQRsModel.pqrsweb = (DataPQRs) => {
    return new Promise((resolve, reject) => {
     if (pool) {
         pool.query(
            'INSERT INTO pqrs SET ?', DataPQRs,
             (err, result) => {
                // console.log(err);
                // console.log(result);
                 if (err) {
                     resolve({
                         'error': err
                     })
                 } else {
                     resolve({
                         'result': result
                     })
                 }

             }
         )
         //return resultado;
     }
 })
};


//Crear Respuesta a una  PQRs
PQRsModel.ResponsePQRs = (DataPQRs) => {
    return new Promise((resolve, reject) => {
     if (pool) {
         console.log(DataPQRs);
         pool.query(
            'INSERT INTO responsepqrs SET ?', DataPQRs,
             (err, result) => {
                // console.log(err);
                // console.log(result);
                 if (err) {
                     resolve({
                         'error': err
                     })
                 } else {
                     resolve({
                         'result': result
                     })
                 }

             }
         )
         //return resultado;
     }
 })
};


//lista de PQRs
PQRsModel.ListPQRs = (status) => {
    return new Promise((resolve, reject) => {
     if (pool) {
         let consulta="";
         if(status==0){
            consulta="SELECT * FROM pqrs";
         }else{
            consulta="SELECT * FROM pqrs WHERE status="+status;
         }
         //console.log(status);
         pool.query(
            consulta,
             (err, result) => {
                // console.log(err);
                // console.log(result);
                 if (err) {
                     resolve({
                         'error': err
                     })
                 } else {
                     resolve({
                         'result': result
                     })
                 }

             }
         )
         //return resultado;
     }
 })
};


module.exports = PQRsModel;