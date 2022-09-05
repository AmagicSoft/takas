const pool = require('../config/database');
let InterestedModel = {};
const date = require('date-and-time');

InterestedModel.InterestedSubasTakas = (DataInterested,FlagInterested) => {
    return new Promise(async(resolve, reject) => {
     if (pool) {
        let Exist= await InterestedModel.VerificarExistInterested (DataInterested.iduser,DataInterested.idsubastakas);
        let consulta="UPDATE interested SET status="+DataInterested.status+" WHERE idsubastakas="+DataInterested.idsubastakas+" AND iduser='"+DataInterested.iduser+"'"
        
         if(Exist.exist==false){
            consulta="INSERT INTO interested SET status="+DataInterested.status+",idsubastakas="+DataInterested.idsubastakas+",iduser='"+DataInterested.iduser+"'";

         }
         console.log(consulta);
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


InterestedModel.InterestedProduct = (DataInterested,FlagInterested) => {
    return new Promise(async(resolve, reject) => {
     if (pool) {
        let Exist= await InterestedModel.VerificarExistInterested2 (DataInterested.iduser,DataInterested.idproduct);
        
        console.log(Exist);
        let consulta="UPDATE interested SET status="+DataInterested.status+" WHERE idproduct="+DataInterested.idproduct+" AND iduser='"+DataInterested.iduser+"'"
        
         if(Exist.exist==false){
            consulta="INSERT INTO interested SET status="+DataInterested.status+",idproduct="+DataInterested.idproduct+",iduser='"+DataInterested.iduser+"'";

         }
         console.log(consulta);
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



InterestedModel.VerificarExistInterested= (idfirebaseUserSTK,idSTK) => {
    return new Promise((resolve, reject) => {
    if (pool) {
        //let Puntuar={};
        //console.log("SELECT * FROM product where id="+idPublication);
        pool.query(
            'SELECT COUNT(*)AS exist FROM interested  WHERE  iduser=? AND idsubastakas=? ', [
                idfirebaseUserSTK,
                idSTK
            ],
            (err, result) => {
                              
                
                if (err) {
                    resolve({
                        'error': err
                    })
                } else {    
                    let E=false;
                    if(result[0].exist==1){
                        E=true;
                    }

                    resolve({
                        'exist': E
                    })
                }

            }
        )
        //return resultado;
    }
    })

}


InterestedModel.VerificarExistInterested2 = (idfirebaseUserSTK,idSTK) => {
    return new Promise((resolve, reject) => {
    if (pool) {
        //let Puntuar={};
        //console.log("SELECT * FROM product where id="+idPublication);
        pool.query(
            'SELECT COUNT(*)AS exist FROM interested   WHERE iduser=? AND idproduct=? ', [
                idfirebaseUserSTK,
                idSTK
            ],
            (err, result) => {
                              
                
                if (err) {
                    resolve({
                        'error': err
                    })
                } else {    
                    let E=false;
                    if(result[0].exist==1){
                        E=true;
                    }

                    resolve({
                        'exist': E
                    })
                }

            }
        )
        //return resultado;
    }
    })

}


module.exports = InterestedModel;