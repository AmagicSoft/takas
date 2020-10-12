const pool = require('../config/database');
let OffersModel = {};

//CERAR UNA OFERTA SOBRE UNA PUBLICACIÓN
OffersModel.NewOffer = (OfferData,IdOfferData,callback) => {
    //let resultado = {};
    return new Promise((resolve, reject) => {
        if (pool) {
            pool.query(
                'INSERT INTO offers SET ?',[OfferData],
                (err, resut) => {
                    console.log(resut);
                    if (err) {
                        resolve({
                            'error': err
                        })
                    } else {
                        if(IdOfferData.length!=0){
                            for(var atr2 in IdOfferData){  
                                pool.query(
                                    'INSERT INTO offersproductservices (idpublication,idoffers) value( ?, ?) ', [
                                        IdOfferData[atr2],
                                        resut.insertId
                                    ],
                                    (err, resut) => {
                                        //console.log(resut);
                                        if (err) {
                                            resolve({
                                                'error': err
                                            })
                                        } else {
                                            resolve({
                                                'result': resut
                                            })                                       
                                        }
                    
                                    }
                                )
                                
                            }
                        }
                       
                    }

                }
            )
            //return resultado;
        }
    })
};



module.exports = OffersModel;