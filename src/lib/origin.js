const express = require('express');
//const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/config');



const originSecurity = express.Router(); 

originSecurity.use((req, res, next) => {
    const origin = req.headers['Access-Control-Allow-Origin'];
    console.log("req.session");
    console.log(req.session);
    console.log("token");
    console.log(token);
 
    if (token) {
      jwt.verify(token, config.llave, (err, decoded) => {      
        if (err) {   
          return res.json({ mensaje: 'Token inválida' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          code: 106,
          mensaje: 'Token no proveída.' 
      });
    }
 });

 module.exports =originSecurity;