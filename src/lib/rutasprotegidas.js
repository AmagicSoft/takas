const express = require('express');
//const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/config');


const rutasProtegidas = express.Router(); 

rutasProtegidas.use((req, res, next) => {
    const token = req.headers['access-token'];
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
          mensaje: 'Token no proveída.' 
      });
    }
 });

 module.exports =rutasProtegidas;