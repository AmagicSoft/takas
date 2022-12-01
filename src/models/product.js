const pool = require('../config/database');
const chatroomsModel = require('../models/chatrooms.js');
const keywords = require('../models/keywords.js');
let ProductModel = {};
const sha1 = require('sha1');
const date = require('date-and-time');


//ListUsers  - obtenemos lista de usuarios segun el rol
ProductModel.NewProduct = (ProductData,PreferecesProduct,ImagesProduct,callback) => {
    //let resultado = {};
    return new Promise((resolve, reject) => {
        if (pool) {
            pool.query(
                'INSERT INTO product SET ?', ProductData,
                (err, resut) => {
                    //console.log(resut);
                    if (err) {
                        resolve({
                            'error': err
                        })
                    } else {
                        if(ImagesProduct.length!=0){
                        for(var atr2 in ImagesProduct){  
                            pool.query(
                                'INSERT INTO imgproduct (url,idproduct) value( ?, ?) ', [
                                    ImagesProduct[atr2],
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
                            
                        }//fin for reforrido imagenes
                    }//fin if ImagesProduct.length!=0
                    if(PreferecesProduct.length!=0){
                        for(var atr3 in PreferecesProduct){  
                            pool.query(
                                'INSERT INTO preferences_product (preference,idproduct) value( ?, ?) ', [
                                    PreferecesProduct[atr3],
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
                            
                        }//fin for reforrido Preferencias
                    }//fin if PreferecesProduct.length!=0
                    }//

                }
            )
            //return resultado;
        }
    })
};

//ListUsers  - obtenemos lista de usuarios segun el rol
ProductModel.NewProductKW = (ProductData,PreferecesProduct,ImagesProduct,KeyWordsProduct,callback) => {
    //let resultado = {};
    console.log("KeyWordsProduct");
    console.log(KeyWordsProduct);
    return new Promise((resolve, reject) => {
        if (pool) {
            pool.query(
                'INSERT INTO product SET ?', ProductData,
                (err, resut) => {
                    //console.log(resut);
                    if (err) {
                        resolve({
                            'error': err
                        })
                    } else {
                        if(ImagesProduct.length!=0){
                        for(var atr2 in ImagesProduct){  
                            pool.query(
                                'INSERT INTO imgproduct (url,idproduct) value( ?, ?) ', [
                                    ImagesProduct[atr2],
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
                            
                        }//fin for reforrido imagenes
                    }//fin if ImagesProduct.length!=0
                    if(PreferecesProduct.length!=0){
                        for(var atr3 in PreferecesProduct){  
                            pool.query(
                                'INSERT INTO preferences_product (preference,idproduct) value( ?, ?) ', [
                                    PreferecesProduct[atr3],
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
                            
                        }//fin for reforrido Preferencias
                    }//fin if PreferecesProduct.length!=0
                    if(KeyWordsProduct.length!=0){
                        for(var atr3 in KeyWordsProduct){  

                            console.log(KeyWordsProduct[atr3]);
                            // pool.query(
                            //     'INSERT INTO  keywords_product (idwords,idproduct) value( ?, ?) ', [
                            //         KeyWordsProduct[atr3],
                            //         resut.insertId
                            //     ],
                            //     (err, resut) => {
                            //         //console.log(resut);
                            //         if (err) {
                            //             resolve({
                            //                 'error': err
                            //             })
                            //         } else {
                            //             resolve({
                            //                 'result': resut
                            //             })
                            //         }
                
                            //     }
                            // )
                            
                        }//fin for reforrido KeyWords
                    }//fin if KeyWords.length!=0

                    }//

                }
            )
            //return resultado;
        }
    })
};

ProductModel.ExistKeyWords = (KW,callback) => {

    if (pool) {
        let armaresult={};
        pool.query(
            "SELECT * keywords where word='"+KW+"'",
            (err, result) => {
               // console.log(err);                 
                
                if (err) {
                    resolve({
                        'error': err
                    })
                } else {  
                    //armaresult = await ProductModel.armaresult(result);  
                    resolve({
                        'result': armaresult
                    })
                }

            }
        )
        //return resultado;
    }

}

ProductModel.DeletePublication = (idfirebaseUser,idPublication) => {
    return new Promise((resolve, reject) => {
    if (pool) {
       // let armaresult={};
        pool.query(
            "UPDATE product SET status = 5 where id="+idPublication+" AND iduser='"+idfirebaseUser+"'",
            (err, result) => {
                console.log(result);                 
                
                if (err) {
                    resolve({
                        'error': err
                    })
                } else {  
                    //armaresult = await ProductModel.armaresult(result);  
                    resolve({
                        'result': result
                    })
                }

            }
        )
        //return resultado;
    }
    })

}

//ListUsers  - obtenemos lista de usuarios segun el rol
ProductModel.NewProductCKW = (ProductData,PreferecesProduct,ImagesProduct,KeyWordsProduct) => {
    //let resultado = {};
    // console.log("KeyWordsProduct");
    // console.log(KeyWordsProduct);
    return new Promise((resolve, reject) => {
        if (pool) {
            let createdkeywords={};
            pool.query(
                'INSERT INTO product SET ?', ProductData,
                async(err, resut) => {
                    //console.log(resut);
                    if (err) {
                        resolve({
                            'error': err
                        })
                    } else {
                        // console.log("resut reg product");
                        // console.log(resut.insertId);
                        // console.log(KeyWordsProduct);
                        // console.log(KeyWordsProduct.length);
                        if(KeyWordsProduct!=undefined){
                            if(KeyWordsProduct.length!=0){
                                // console.log(KeyWordsProduct);
                                // console.log(KeyWordsProduct.length);
                                createdkeywords = await keywords.newkeywords(KeyWordsProduct,ProductData.subcategory,resut.insertId);
                            }
                        }
                            //console.log(createdkeywords);
                        if(ImagesProduct.length!=0){
                        for(var atr2 in ImagesProduct){  
                            pool.query(
                                'INSERT INTO imgproduct (url,idproduct) value( ?, ?) ', [
                                    ImagesProduct[atr2],
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
                                            'result': resut,
                                            'id':resut.insertId
                                        })                                       
                                    }
                
                                }
                            )
                            
                        }//fin for reforrido imagenes
                    }//fin if ImagesProduct.length!=0
                    if(PreferecesProduct.length!=0){
                        for(var atr3 in PreferecesProduct){  
                            pool.query(
                                'INSERT INTO preferences_product (preference,idproduct) value( ?, ?) ', [
                                    PreferecesProduct[atr3],
                                    resut.insertId
                                ],
                                (err, resu2t) => {
                                    //console.log(resut);
                                    if (err) {
                                        resolve({
                                            'error': err
                                        })
                                    } else {
                                        resolve({
                                            'result': resu2t,
                                            'id':resut.insertId
                                        })
                                    }
                
                                }
                            )
                            
                        }//fin for reforrido Preferencias
                    }//fin if PreferecesProduct.length!=0     
                    

                    }//

                }
            )
            //return resultado;
        }
    })
};


////ListUsers  - obtenemos lista de usuarios segun el rol
ProductModel.EditProductCKW = (ProductData,idproduct,PreferecesProduct,ImagesProduct,KeyWordsProduct) => {
    let createdkeywords = {};
    // console.log("KeyWordsProduct");
    // console.log(KeyWordsProduct);
    return new Promise((resolve, reject) => {
        if (pool) {
            let createdkeywords={};
            pool.query(
                'Update product SET ? where id='+idproduct, ProductData,
                async(err, resut) => {
                    //console.log(resut);
                    if (err) {
                        resolve({
                            'error': err
                        })
                    } else {
                        // console.log("resut reg product");
                        // console.log(resut.insertId);
                        createdkeywords = await keywords.newkeywords(KeyWordsProduct,ProductData.subcategory,idproduct);
                        //console.log(createdkeywords);
                        if(ImagesProduct.length!=0){
                        for(var atr2 in ImagesProduct){  
                            pool.query(
                                'INSERT INTO imgproduct (url,idproduct) value( ?, ?) ', [
                                    ImagesProduct[atr2],
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
                            
                        }//fin for reforrido imagenes
                    }//fin if ImagesProduct.length!=0
                    if(PreferecesProduct.length!=0){
                        for(var atr3 in PreferecesProduct){  
                            pool.query(
                                'INSERT INTO preferences_product (preference,idproduct) value( ?, ?) ', [
                                    PreferecesProduct[atr3],
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
                            
                        }//fin for reforrido Preferencias
                    }//fin if PreferecesProduct.length!=0     
                    

                    }//

                }
            )
            //return resultado;
        }
    })
};


//FindProductCKW  - Buscar productos
ProductModel.FindProductCKW = (idUserProduct,idProduct) => {
    //let resultado = {};
    console.log(idProduct);
    return new Promise((resolve, reject) => {
        if (pool) {
            pool.query(
                'SELECT * FROM product WHERE id=?', idProduct,
                (err, result) => {
                    //console.log(resut);
                    if (err) {
                        resolve({
                            'error': err
                        })
                    } else {
                        console.log("result "+result);
                        resolve({
                            'result': result
                        })  
                    }//fin if ImagesProduct.length!=0
                      

                }
            )
            //return resultado;
        }
    })
};

//FindProductCKW  - Buscar productos
ProductModel.FindNameCategory = (idCategory) => {
    //let resultado = {};
    return new Promise((resolve, reject) => {
        if (pool) {
            pool.query(
                'SELECT name FROM mastersubcategory WHERE idsc= ?', idCategory,
                (err, result) => {
                    //console.log(resut);
                    if (err) {
                        resolve({
                            'error': err
                        })
                    } else {
                        console.log("result "+result);
                        resolve({
                            'result': result
                        })  
                    }//fin if ImagesProduct.length!=0
                      

                }
            )
            //return resultado;
        }
    })
};
//FindNameTypeMoney  - Buscar nombre de tipo de moneda
ProductModel.FindNameTypeMoney = (idMoney) => {
    //let resultado = {};
    return new Promise((resolve, reject) => {
        if (pool) {
            pool.query(
                'SELECT name FROM mastermoney WHERE id= ?', idMoney,
                (err, result) => {
                    console.log(result);
                    if (err) {
                        resolve({
                            'error': err
                        })
                    } else {
                        //console.log("result "+result);
                       // console.log("Money");
                    let mresult = result[0];
                   // console.log(mresult.preference);
                        resolve({
                            'result': mresult.name
                        })  
                    }//fin if ImagesProduct.length!=0
                      

                }
            )
            //return resultado;
        }
    })
};



//LISTAR LOS PRODUCTOS PUBLICADOS POR UN USUARIO - TAKASTEAR 
ProductModel.ListMisProductos = (UserData,ProductData,estatus,callback) => {
    //let resultado = {};
    //console.log('SELECT * FROM  product AS p INNER JOIN imgproduct ON p.id=idproduct  WHERE iduser= "'+UserData.iduser+'" AND status='+ProductData.status);
    return new Promise((resolve, reject) => {
        if (pool) {

            let armaresult={};
            let consulta="";
            if(estatus!=0){
                consulta="SELECT DISTINCT idproduct,datepublication,iduser,name,details,location,typemoney,marketvalue,subcategory,typepublication,p.conditions,p.size,p.weight,status FROM product AS p INNER JOIN  imgproduct AS i ON p.id=idproduct  WHERE iduser='"+UserData.iduser+"' AND status="+estatus+" AND p.id=idproduct AND typepublication=1";
            }else{
                consulta="SELECT DISTINCT idproduct,datepublication,iduser,name,details,location,typemoney,marketvalue,subcategory,typepublication,status FROM product AS p INNER JOIN  imgproduct AS i ON p.id=idproduct  WHERE iduser='"+UserData.iduser+"' AND p.id=idproduct AND typepublication=1";
            }
            pool.query(consulta,
                async(err, result) => {
                   // console.log(err);                 
                    
                    if (err) {
                        resolve({
                            'error': err
                        })
                    } else {  
                        armaresult = await ProductModel.armaresult(result);  
                        resolve({
                            'result': armaresult
                        })
                    }

                }
            )
            //return resultado;
        }
    })
};

//LISTAR LOS PRODUCTOS PUBLICADOS POR OTROS USUARIOS - TAKASTEAR 
ProductModel.ListProductos = (UserData,ProductData,callback) => {
    //let resultado = {};
    //console.log('SELECT * FROM  product AS p INNER JOIN imgproduct ON p.id=idproduct  WHERE iduser= "'+UserData.iduser+'" AND status='+ProductData.status);
    return new Promise((resolve, reject) => {
        if (pool) {

            let armaresult={};
            pool.query(
                "SELECT DISTINCT RAND(idproduct),idproduct, datepublication ,DATE_FORMAT(datepublication, '%d/%m/%Y %H:%i:%s') AS datecreated,iduser,name,details,typemoney,marketvalue,subcategory,typepublication,p.conditions,p.location,p.size,p.weight,status FROM product AS p INNER JOIN  imgproduct AS i ON p.id=idproduct WHERE iduser<>'"+UserData.iduser+"' AND status="+ProductData.status+" AND p.id=idproduct AND typepublication=1   ORDER BY datepublication DESC LIMIT 50",
                async(err, result) => {
                    console.log(result);                  
                   
                    if (err) {
                        resolve({
                            'error': err
                        })
                    } else {   
                        armaresult = await ProductModel.armaresult(result);  
                        resolve({
                            'result': armaresult
                        })
                    }

                }
            )
            //return resultado;
        }
    })
};
///

////BURCAR PUBLICACUONES SEGÚN NOMBRE DEL ARTÍCULO
ProductModel.findProductos = (nameProduct,IdUserProduct) => {
    //let resultado = {};
    //console.log('SELECT * FROM  product AS p INNER JOIN imgproduct ON p.id=idproduct  WHERE iduser= "'+UserData.iduser+'" AND status='+ProductData.status);
    return new Promise((resolve, reject) => {
        if (pool) {

            let armaresult={};
            //consulta para buscar por palabra clave
            // "SELECT * FROM keywords AS k INNER JOIN keyword_product AS kp ON k.id=kp.idword INNER JOIN product AS p ON kp.idproduct=p.id INNER JOIN  imgproduct AS i ON p.id=i.idproduct WHERE (k.word LIKE '%Intel%' OR p.NAME LIKE '%"+nameProduct+"%')  AND STATUS=3 AND iduser<>'"+IdUserProduct+"' ORDER BY p.datecreated DESC"
            console.log("SELECT * FROM product as p WHERE p.NAME LIKE ('%"+nameProduct+"%')  AND p.status=3 AND p.iduser<>'"+IdUserProduct+"' ORDER BY p.datecreated DESC");
            pool.query(
                "SELECT *,id AS idproduct FROM product as p WHERE name LIKE ('%"+nameProduct+"%')  AND status=3 AND iduser<>'"+IdUserProduct+"' ORDER BY datepublication DESC",
                async(err, result) => {
                                     
                   
                    if (err) {
                        resolve({
                            'error': err
                        })
                    } else { 
                        console.log(result);   //datepublication
                        armaresult = await ProductModel.armaresult(result); 
                        //console.log("armaresult: "+armaresult); 
                        resolve({
                            'result': armaresult
                        })
                    }

                }
            )
            //return resultado;
        }
    })
};

////BURCAR PUBLICACUONES SEGÚN NOMBRE DEL ARTÍCULO
ProductModel.findProduct = (IdUserProduct) => {
    //let resultado = {};
    //console.log('SELECT * FROM  product AS p INNER JOIN imgproduct ON p.id=idproduct  WHERE iduser= "'+UserData.iduser+'" AND status='+ProductData.status);
    return new Promise((resolve, reject) => {
        if (pool) {

            let armaresult={};
            //consulta para buscar por palabra clave
            // "SELECT * FROM keywords AS k INNER JOIN keyword_product AS kp ON k.id=kp.idword INNER JOIN product AS p ON kp.idproduct=p.id INNER JOIN  imgproduct AS i ON p.id=i.idproduct WHERE (k.word LIKE '%Intel%' OR p.NAME LIKE '%"+nameProduct+"%')  AND STATUS=3 AND iduser<>'"+IdUserProduct+"' ORDER BY p.datecreated DESC"
            console.log("SELECT * FROM product as p WHERE   p.id="+IdUserProduct);
            pool.query(
                "SELECT *,id AS idproduct FROM product as p WHERE    p.id="+IdUserProduct,
                async(err, result) => {
                                     
                   
                    if (err) {
                        resolve({
                            'error': err
                        })
                    } else { 
                        console.log(result);   //datepublication
                        armaresult = await ProductModel.armaresultDetailProduct(result); 
                        //console.log("armaresult: "+armaresult); 
                        resolve({
                            'result': armaresult
                        })
                    }

                }
            )
            //return resultado;
        }
    })
};
///
ProductModel.armaresultDetailProduct = (result) => {

    return new Promise(async (resolve, reject) => {
        let arr = [];
        
        
        try{
            
            let img={};
            let prefe={};
            let interested={};
            let CantidadOfertas=0;
            let idproducs=0;
            //console.log(result);
            for (const element of result) {
                //console.log(element.idproduct+" - "+idproducs);
                if(element.idproduct!=idproducs){
                    //console.log("idproducs - "+element.idproduct);
                    idproducs=element.idproduct;
                    img=await ProductModel.ListImagesProduct(element);
                    prefe=await ProductModel.ListPrefrencesProduct(element);
                    CantidadOfertas=await ProductModel.CantidadOfertas(element);
                    let Precio=Number.parseFloat(element.marketvalue).toFixed(4);

                    let now = new Date();
                    let servidor=date.format(now, 'YYYY-MM-DD HH:mm:ss');
                    //let registro=element.registro;
                    let registro = new Date(element.datepublication);
                    let regis = date.format(registro, 'YYYY-MM-DD HH:mm:ss');

                    //console.log(now+" - "+registro);

                    let comprobar_fecha=date.isSameDay(now, registro); 
                    // console.log(comprobar_fecha+" - ");
                    // console.log("//////");
                    console.log(element.conditions);
                    let nuevo=false;
                    if (element.conditions==9){
                         nuevo=true;
                    }
                    console.log(nuevo);

                    let FlagProduct=element.status;
                    let statusProduct="Activa"; //Publicación activa
                    let Editable=true; //Publicación activa
                    if(FlagProduct==4){
                        statusProduct="Takasteada"; // Publicación Takasteada
                    }
                    if(FlagProduct==5 ){
                        statusProduct="Deshabilitada";//Publicación Elimidada ó Deshabilitada
                    }
                    if(FlagProduct==0 ){
                        statusProduct="Deshabilitada";//Publicación Elimidada ó Deshabilitada
                    }
                    if(FlagProduct==26){
                        statusProduct="Editada";//Publicación Editada
                    
                    }

                    let rp = await ProductModel.FindProductCKW(element.iduser,element.idproduct);
                   // console.log(rp);
                    //console.log(horaServidor);
                    //console.log(rp.result);
                    let datepublication = new Date(rp.result.datepublication);
                    //console.log(datepublication);
                    ////fecha de creación de producto
                    let fechacp = date.format(datepublication, 'YYYY-MM-DD HH:mm:ss');
                    //console.log(now);
                    let Diferenciafechas=date.subtract(now, datepublication).toMinutes();

                    if(Diferenciafechas>20){
                        Editable=false;
                    }

                    //Transformar
                    let datecreatedt = new Date(element.datecreated);
                    let datecreated = date.format(datecreatedt, 'YYYY-MM-DD HH:mm:ss');
                    //location
                    console.log("location");
                    console.log(element.location);
                    let location = element.location;
                    
                    let subcategory = await ProductModel.FindNameCategory(element.subcategory);
                    console.log("subcategory");
                    let scresult = subcategory.result[0];
                    console.log(scresult.name);

                    console.log(element.iduser);
                    interested=false;
                    //Preferences
                    let typemoney = await ProductModel.FindNameTypeMoney(element.typemoney);
                    //console.log("typemoney");
                    //console.log(typemoney.name);
                    if(element.typepublication==1){   
                        arr.push({
                            "idproduct": element.idproduct,
                            "datecreated":datecreated,
                            "iduser": element.iduser,
                            "nuevo":nuevo,
                            "subcategory": scresult.name,
                            "name": element.name,
                            "details": element.details,
                            "typemoney": typemoney.result,
                            "marketvalue": Precio,
                            "typepublication": "Takasteo", //element.typepublication,
                            "conditions": element.conditions,
                            "size": element.size,
                            "weight": element.weight,
                            "status": statusProduct,//element.status,//statusProduct,
                            //"editable": Editable,
                            "location": location,
                            //"CantidadOfertas":CantidadOfertas.CantOfertas,
                            "ProductImages":img.ImagesProduct,
                            "Preferences":prefe.Preferences
                            
                        });
                    }
                    if(element.typepublication==3){ 
                        let now2 = new Date();
                        let servidor2=date.format(now, 'YYYY-MM-DD HH:mm:ss');  
                        let beginSubastakas = new Date(element.datebeginst);
                        let begin=date.format(beginSubastakas, 'YYYY-MM-DD HH:mm:ss');
                        let endSubastakas = new Date(element.dateendst);
                        let end=date.format(endSubastakas, 'YYYY-MM-DD HH:mm:ss');
                        let valStarted=date.subtract(now2,beginSubastakas).toMinutes();
                        console.log("valStarted: "+valStarted);
                        let started=false;
                        if(valStarted > 0){
                            started=true;
                        }
                        let finished=false;
                        let valFinished=date.subtract(now2,endSubastakas).toMinutes();
                        if(valFinished > 0){
                            finished=true;
                        }
                        

                        let fechaserver = new Date();
                        let fechactual=date.format(fechaserver, 'YYYY-MM-DD HH:mm:ss');
                        //DETERMINAR SI ES EL TIEMPO DE ACTIVIDAD
                        let timeActive=false;
                        let DiferenciafechasInicio=date.subtract(fechaserver, beginSubastakas).toMinutes();
                        console.log("DiferenciafechasInicio: "+DiferenciafechasInicio );
                        let DiferenciafechasFin=date.subtract(fechaserver, endSubastakas).toMinutes();
                        console.log("DiferenciafechasFin: "+DiferenciafechasFin );
                        let TimeTotal=date.subtract(beginSubastakas, endSubastakas).toMilliseconds();;
                        let DiferenciafechasFin2=date.subtract(fechaserver, endSubastakas).toMilliseconds();

                        if(DiferenciafechasInicio>=0 && DiferenciafechasFin<0){
                            timeActive=true;
                        }
                        
//
                        arr.push({
                            "idproduct": element.idproduct,
                            "datecreated":datecreated,                           
                            "activityTime":timeActive,
                            "TimeTotal":TimeTotal,
                            "TimeEnd":DiferenciafechasFin2,
                            "flagInterested":flagInterested,
                            "started":started,
                            "finished":finished,
                            "begin":begin,
                            "end":end,
                            "iduser": element.iduser,
                            "nuevo": nuevo,
                            "subcategory": element.subcategory,
                            "name": element.name,
                            "details": element.details,
                            "typemoney": element.typemoney,
                            "marketvalue": Precio,
                            "typepublication": element.typepublication,
                            "conditions": element.conditions,
                            "size": element.size,
                            "weight": element.weight,
                            "status": statusProduct,
                            "editable": Editable,
                            "location": location,
                            "CantidadOfertas":CantidadOfertas.CantOfertas,
                            "ProductImages":img.ImagesProduct
                            
                        });
                    }
                   
                }
            }//fin for 
            resolve(arr)
        }
        catch(e){
            console.log(e);
        }
    }
    )

} 

///
ProductModel.armaresult = (result) => {

    return new Promise(async (resolve, reject) => {
        let arr = [];
        
        
        try{
            
            let img={};
            let prefe={};
            let interested={};
            let CantidadOfertas=0;
            let idproducs=0;
            //console.log(result);
            for (const element of result) {
                //console.log(element.idproduct+" - "+idproducs);
                if(element.idproduct!=idproducs){
                    //console.log("idproducs - "+element.idproduct);
                    idproducs=element.idproduct;
                    img=await ProductModel.ListImagesProduct(element);
                    prefe=await ProductModel.ListPrefrencesProduct(element);
                    CantidadOfertas=await ProductModel.CantidadOfertas(element);
                    let Precio=Number.parseFloat(element.marketvalue).toFixed(4);

                    let now = new Date();
                    let servidor=date.format(now, 'YYYY-MM-DD HH:mm:ss');
                    //let registro=element.registro;
                    let registro = new Date(element.datepublication);
                    let regis = date.format(registro, 'YYYY-MM-DD HH:mm:ss');

                    //console.log(now+" - "+registro);

                    let comprobar_fecha=date.isSameDay(now, registro); 
                    // console.log(comprobar_fecha+" - ");
                    // console.log("//////");
                    console.log(element.conditions);
                    let nuevo=false;
                    if (element.conditions==9){
                         nuevo=true;
                    }
                    console.log(nuevo);

                    let FlagProduct=element.status;
                    let statusProduct=0; //Publicación activa
                    let Editable=true; //Publicación activa
                    if(FlagProduct==4){
                        statusProduct=1; // Publicación Takasteada
                    }
                    if(FlagProduct==5){
                        statusProduct=2;//Publicación Elimidada ó Deshabilitada
                    }
                    if(FlagProduct==26){
                        statusProduct=3;//Publicación Editada
                    
                    }

                    let rp = await ProductModel.FindProductCKW(element.iduser,element.idproduct);
                   // console.log(rp);
                    //console.log(horaServidor);
                    //console.log(rp.result);
                    let datepublication = new Date(rp.result.datepublication);
                    //console.log(datepublication);
                    ////fecha de creación de producto
                    let fechacp = date.format(datepublication, 'YYYY-MM-DD HH:mm:ss');
                    //console.log(now);
                    let Diferenciafechas=date.subtract(now, datepublication).toMinutes();

                    if(Diferenciafechas>20){
                        Editable=false;
                    }

                    //Transformar
                    let datecreatedt = new Date(element.datecreated);
                    let datecreated = date.format(datecreatedt, 'YYYY-MM-DD HH:mm:ss');
                    //location
                    console.log("location");
                    console.log(element.location);
                    let location = element.location;
                    //Interested
                    console.log(element.iduser);
                    interested=await ProductModel.interestedSubastacas(element.iduser);
                        console.log("interested: "+interested.interested[0]);
                        let flagInterested=false;
                        if(interested.interested[0]!= undefined){
                            flagInterested=true;
                        }
                    //console.log(element.typepublication);
                   
                    if(element.typepublication==1){   
                        arr.push({
                            "idproduct": element.idproduct,
                            "datecreated":datecreated,
                            "interested":interested,
                            "iduser": element.iduser,
                            "nuevo":nuevo,
                            "subcategory": element.subcategory,
                            "name": element.name,
                            "details": element.details,
                            "typemoney": element.typemoney,
                            "marketvalue": Precio,
                            "typepublication": element.typepublication,
                            "conditions": element.conditions,
                            "size": element.size,
                            "weight": element.weight,
                            "status": statusProduct,
                            "editable": Editable,
                            "location": location,
                            "CantidadOfertas":CantidadOfertas.CantOfertas,
                            "ProductImages":img.ImagesProduct,
                            "Preferences":prefe.Preferences
                            
                        });
                    }
                    if(element.typepublication==3){ 
                        let now2 = new Date();
                        let servidor2=date.format(now, 'YYYY-MM-DD HH:mm:ss');  
                        let beginSubastakas = new Date(element.datebeginst);
                        let begin=date.format(beginSubastakas, 'YYYY-MM-DD HH:mm:ss');
                        let endSubastakas = new Date(element.dateendst);
                        let end=date.format(endSubastakas, 'YYYY-MM-DD HH:mm:ss');
                        let valStarted=date.subtract(now2,beginSubastakas).toMinutes();
                        console.log("valStarted: "+valStarted);
                        let started=false;
                        if(valStarted > 0){
                            started=true;
                        }
                        let finished=false;
                        let valFinished=date.subtract(now2,endSubastakas).toMinutes();
                        if(valFinished > 0){
                            finished=true;
                        }
                        

                        let fechaserver = new Date();
                        let fechactual=date.format(fechaserver, 'YYYY-MM-DD HH:mm:ss');
                        //DETERMINAR SI ES EL TIEMPO DE ACTIVIDAD
                        let timeActive=false;
                        let DiferenciafechasInicio=date.subtract(fechaserver, beginSubastakas).toMinutes();
                        console.log("DiferenciafechasInicio: "+DiferenciafechasInicio );
                        let DiferenciafechasFin=date.subtract(fechaserver, endSubastakas).toMinutes();
                        console.log("DiferenciafechasFin: "+DiferenciafechasFin );
                        let TimeTotal=date.subtract(beginSubastakas, endSubastakas).toMilliseconds();;
                        let DiferenciafechasFin2=date.subtract(fechaserver, endSubastakas).toMilliseconds();

                        if(DiferenciafechasInicio>=0 && DiferenciafechasFin<0){
                            timeActive=true;
                        }
                        
//
                        arr.push({
                            "idproduct": element.idproduct,
                            "datecreated":datecreated, 
                            "interested":interested,                           
                            "activityTime":timeActive,
                            "TimeTotal":TimeTotal,
                            "TimeEnd":DiferenciafechasFin2,
                            "flagInterested":flagInterested,
                            "started":started,
                            "finished":finished,
                            "begin":begin,
                            "end":end,
                            "iduser": element.iduser,
                            "nuevo": nuevo,
                            "subcategory": element.subcategory,
                            "name": element.name,
                            "details": element.details,
                            "typemoney": element.typemoney,
                            "marketvalue": Precio,
                            "typepublication": element.typepublication,
                            "conditions": element.conditions,
                            "size": element.size,
                            "weight": element.weight,
                            "status": statusProduct,
                            "editable": Editable,
                            "location": location,
                            "CantidadOfertas":CantidadOfertas.CantOfertas,
                            "ProductImages":img.ImagesProduct
                            
                        });
                    }
                   
                }
            }//fin for 
            resolve(arr)
        }
        catch(e){
            console.log(e);
        }
    }
    )

} 


ProductModel.ListImagesProduct = (element) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'SELECT  url FROM imgproduct WHERE idproduct=? ',[element.idproduct],
            (err2, result2) => {
                 
                //console.log(element.id);   
                //console.log(element.namec);   
                //console.log(result2[1].preference);
                if (err2) {
                    resolve({
                        'error': err2
                    })
                } else {     
                    //console.log(result2); 
                    // console.log(result2.length);
                    let ImagesProduct= []; 
                    for(var atr2 in result2){
                    ImagesProduct.push(result2[atr2].url); 
                    };  
                    //console.log(element.idproduct);  
                   // console.log(ImagesProduct);
                    resolve({
                        
                        "ImagesProduct": ImagesProduct
                    });
                }  
                
                //console.log(CatgySubCatg);
                //CatgySubCatg.Subcategory=result2;
                //console.log("//////SUBCATEGORÍA///////");
                // console.log(result2);

            })
    })
}
////////


ProductModel.ListPrefrencesProduct = (element) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'SELECT mp.`name` AS preference FROM `preferences_product` AS pp   INNER JOIN  `masterpreferences` AS mp ON pp.`preference`=mp.`id` WHERE pp.`idproduct`=?', [element.idproduct],
            (err2, result2) => {
                //console.log(element.id);   
                //console.log(element.namec);   
                //console.log(result2[1].preference);
                if (err2) {
                    resolve({
                        'error': err2
                    })
                } else {     
                    console.log(result2); 
                    // console.log(result2.length);
                    let preferences= []; 
                    for(var atr2 in result2){
                    preferences.push(result2[atr2].preference);
                    };  
                    console.log(preferences);
                    resolve({                        
                        "Preferences": preferences
                    });
                }  
                
                //console.log(CatgySubCatg);
                //CatgySubCatg.Subcategory=result2;
                //console.log("//////SUBCATEGORÍA///////");
                // console.log(result2);

            })
    })
}


ProductModel.CantidadOfertas = (element) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'SELECT COUNT(*) AS cantofertas FROM offers WHERE idproduct=? ',[element.idproduct],
            (err2, result2) => {
                 
               
                if (err2) {
                    resolve({
                        'error': err2
                    })
                } else {     
                    // console.log(result2.length);
                   
                    //console.log(element.idproduct);  
                  // console.log(result2.cantofertas);
                    resolve({
                        
                        "CantOfertas": result2[0].cantofertas
                    });
                }  
                
                //console.log(CatgySubCatg);
                //CatgySubCatg.Subcategory=result2;
                //console.log("//////SUBCATEGORÍA///////");
                // console.log(result2);

            })
    })
}
////////
//LISTAR PRODRUCTOS FILTRADOS POR SUBCATEGORÍA- TAKASTEAR 
ProductModel.ListProductSubCategory = (ProductData,callback) => {
    //let resultado = {};
    //console.log('SELECT * FROM  product AS p INNER JOIN imgproduct ON p.id=idproduct  WHERE iduser= "'+UserData.iduser+'" AND status='+ProductData.status);
    return new Promise((resolve, reject) => {
        if (pool) {
            let armaresult={};
            pool.query(
                "SELECT DISTINCT idproduct,idproduct,datebeginst,dateendst,DATE_FORMAT(datepublication, '%d/%m/%Y') AS registro,DATE_FORMAT(datepublication, '%d/%m/%Y %H:%i:%s') AS datecreated,iduser,name,details,typemoney,marketvalue,subcategory,typepublication,status FROM product AS p INNER JOIN  imgproduct AS i ON p.id=idproduct WHERE subcategory='"+ProductData.subcategory+"' AND status="+ProductData.status+" AND p.id=idproduct AND iduser<>'"+ProductData.iduser+"' GROUP BY idproduct  LIMIT 50",
                async(err, result) => {
                    console.log(result);
                   
                    if (err) {
                        resolve({
                            'error': err
                        })
                    } else {     
                        armaresult = await ProductModel.armaresult(result);  
                        resolve({
                            'result': armaresult
                        })
                    }

                }
            )
            //return resultado;
        }
    })
};


//LISTAR DETALLE DE UN PRODRUCTO - TAKASTEAR 
ProductModel.DetailsProduct = (ProductData,callback) => {
    //let resultado = {};
    //console.log('SELECT * FROM  product AS p INNER JOIN imgproduct ON p.id=idproduct  WHERE iduser= "'+UserData.iduser+'" AND status='+ProductData.status);
    return new Promise((resolve, reject) => {
        if (pool) {
            let armaresult={};
            pool.query(
                "SELECT id as idproduct,datepublication ,datepublication AS datecreated,iduser,name,details,typemoney,marketvalue,subcategory,typepublication,conditions,size,weight,status FROM  product  WHERE id="+ProductData.id,
                async(err, result) => {
                    //console.log(result);
                   
                    if (err) {
                        resolve({
                            'error': err
                        })
                    } else {     
                        armaresult = await ProductModel.armaresult(result);  
                        resolve({
                            'result': armaresult
                        })
                        
                    }

                }
            )
            //return resultado;
        }
    })
};

//ACTUALIZAMOS STATUS DE LA PUBLICACIÓN
ProductModel.UpdateStatusPublication = (idPubli) => {
    //let resultado = {};
    return new Promise((resolve, reject) => {
        if (pool) {
            //let FindDatOffer={};
            let  consulta="UPDATE  product SET  status=4 WHERE id="+idPubli;
        
            pool.query(
                consulta,
                async(err, result) => {
                    //console.log(result);
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

//ACTUALIZAMOS STATUS DE LAS PUBLICACIONES DE UNA OFERTA
ProductModel.UpdateStatusPublicationOffer = (idOffer) => {
    //let resultado = {};
    return new Promise((resolve, reject) => {
        if (pool) {
            //let FindDatOffer={};
            let  consulta="SELECT o.id, ops.idpublication FROM offers AS o  INNER JOIN offersproductservices AS ops ON o.id=ops.idoffers WHERE o.id="+idOffer;
        
            pool.query(
                consulta,
                async(err, result) => {
                    //console.log(result);
                    if (err) {
                        resolve({
                            'error': err
                        })
                    } else {    
                        ///DETERMINAR DE QUE USUARIO ES LA ACCIÓN DEL MATCH 
                        let response=await ProductModel.RecorridoPublicationOffer(result);                     
                                             
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

//UPDATE ITEMS DE PUBLICACIONES QUE PERTENECEN A UNA OFERTA 
ProductModel.RecorridoPublicationOffer = async(element) => {

    if(element.length>0){
        // console.log(SumItemsOffer);
        for(var atr2 in element){
            // "iduser": element[0].iduser,
            let response=await ProductModel.UpdateStatusPublication(element[atr2].idpublication);               
            
        }; // fin for                    
    }; //fin if

};

ProductModel.scorePublication = (idfirebaseUser,idPublication,scoreUser) => {
    return new Promise((resolve, reject) => {
    if (pool) {
        let Puntuar={};
        pool.query(
            "SELECT * FROM product where id="+idPublication,
            async(err, result) => {
                console.log(result);                 
                
                if (err) {
                    resolve({
                        'error': err
                    })
                } else {  
                    let consulta="";
                    if(result[0].iduser==idfirebaseUser){
                        consulta="UPDATE product SET scorev = "+scoreUser+"  where status=4 AND id='"+idPublication+"'"; 
                    }
                    else{
                        consulta="UPDATE product SET scorev = "+scoreUser+", idclient='"+idfirebaseUser+"'  where status=4 AND id='"+idPublication+"'"; 
                    }
                    //console.log(result);
                    Puntuar = await ProductModel.Calificar(consulta);  

                    resolve({
                        'result': Puntuar
                    })
                }

            }
        )
        //return resultado;
    }
    })

}

ProductModel.Calificar = (consulta) => {
    return new Promise((resolve, reject) => {
    if (pool) {
        //let Puntuar={};
        //console.log("SELECT * FROM product where id="+idPublication);
        pool.query(
            consulta,
            (err, result) => {
                console.log(result);                 
                
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

}


ProductModel.ListPublications = (consulta) => {
    return new Promise((resolve, reject) => {
    if (pool) {
        //let Puntuar={};
        //console.log("SELECT * FROM product where id="+idPublication);
        pool.query(
            consulta,
            (err, result) => {
                console.log(result);                 
                
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

}


ProductModel.cantPublications = (inicio,fin) => {
    return new Promise((resolve, reject) => {
    if (pool) {
        //let Puntuar={};
        consulta="SELECT COUNT(id) AS CantPublications FROM product WHERE datepublication  BETWEEN '"+inicio+"' AND '"+fin+"' GROUP BY id";
        console.log(consulta);
        pool.query(
            consulta,
            (err, result) => {
                console.log(result);                 
                
                if (err) {
                    resolve({
                        'error': err
                    })
                } else {                      

                    resolve({
                        'result': result[0]
                    })
                }

            }
        )
        //return resultado;
    }
    })

}


ProductModel.cantPublications = (inicio,fin) => {
    return new Promise((resolve, reject) => {
    if (pool) {
        //let Puntuar={};
        consulta="SELECT COUNT(id) AS CantPublications FROM product WHERE datepublication  BETWEEN '"+inicio+"' AND '"+fin+"' GROUP BY id";
        console.log(consulta);
        pool.query(
            consulta,
            (err, result) => {
                console.log(result);                 
                
                if (err) {
                    resolve({
                        'error': err
                    })
                } else {                      

                    resolve({
                        'result': result[0]
                    })
                }

            }
        )
        //return resultado;
    }
    })

}



//SUBASTAKAS
ProductModel.NewSubasTakasCKW = (SubastakasData,ImagesSubastakas,KeyWordsSubastakas) => {
    //let resultado = {};
    // console.log("KeyWordsProduct");
    // console.log(KeyWordsProduct);
    return new Promise((resolve, reject) => {
        if (pool) {
            let createdkeywords={};
            pool.query(
                'INSERT INTO product SET ?', SubastakasData,
                async(err, result) => {
                    //console.log(resut);
                    if (err) {
                        resolve({
                            'error': err
                        })
                    } else {
                        // console.log("resut reg product");
                        // console.log(resut.insertId);
                        if(KeyWordsSubastakas!=undefined){
                            if(KeyWordsSubastakas.length!=0){
                                //console.log(SubastakasData);
                                console.log(SubastakasData.length);
                                createdkeywords = await keywords.newkeywords(KeyWordsSubastakas,SubastakasData.subcategory,result.insertId);
                            }
                        }
                        // if(KeyWordsProduct.length!=0){
                        //     createdkeywords = await keywords.newkeywords(KeyWordsSubastakas,SubastakasData.subcategory,resut.insertId);
                        // }
                            //console.log(createdkeywords);
                        if(ImagesSubastakas.length!=0){
                        for(var atr2 in ImagesSubastakas){  
                            pool.query(
                                'INSERT INTO imgproduct (url,idproduct) value( ?, ?) ', [
                                    ImagesSubastakas[atr2],
                                    result.insertId
                                ],
                                (err, result2) => {
                                    //console.log(resut);
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
                            
                        }//fin for reforrido imagenes
                    }//fin if ImagesSubastakas.length!=0
                    
                    

                    }//

                }
            )
            //return resultado;
        }
    })
};

//LISTAR LAS SUBASTAKAS PUBLICADAS POR OTROS USUARIOS - SUBASTAKEAR 
ProductModel.ListSubasTakas = (UserData,SubastakasData) => {
    //let resultado = {};
    //console.log('SELECT * FROM  product AS p INNER JOIN imgproduct ON p.id=idproduct  WHERE iduser= "'+UserData.iduser+'" AND status='+SubastakasData.status);
    return new Promise((resolve, reject) => {
        if (pool) {

            let armaresult={};
            pool.query(
                "SELECT DISTINCT RAND(id),id as idproduct, datepublication ,DATE_FORMAT(datepublication, '%d/%m/%Y %H:%i:%s') AS datecreated,iduser,name,details,datebeginst,dateendst,typemoney,marketvalue,subcategory,typepublication,p.conditions,p.size,p.weight,status FROM product  as p WHERE iduser<>'"+UserData.iduser+"' AND status="+SubastakasData.status+" AND typepublication=3 ORDER BY datepublication DESC LIMIT 50",
                async(err, result) => {
                    //console.log(result);                  
                   
                    if (err) {
                        resolve({
                            'error': err
                        })
                    } else {   
                        armaresult = await ProductModel.armaresult2(result,UserData.iduser);  
                        resolve({
                            'result': armaresult
                        })
                    }

                }
            )
            //return resultado;
        }
    })
};
///
//Arma el resultado de la subasta y determina propiedad
ProductModel.armaresult2 = (result,iduser) => {

    return new Promise(async (resolve, reject) => {
        let arr = [];
        
        
        try{
            
            let img={};
            let prefe={};
            let interested={};
            let CantidadOfertas=0;
            let idproducs=0;
            let Anfitrion={};
            let Pertenece={}
            //console.log(result);
            for (const element of result) {
                //console.log(element.idproduct+" - "+idproducs);
                if(element.idproduct!=idproducs){
                    //console.log("idproducs - "+element.idproduct);
                    idproducs=element.idproduct;
                    img=await ProductModel.ListImagesProduct(element);
                    prefe=await ProductModel.ListPrefrencesProduct(element);
                    CantidadOfertas=await ProductModel.CantidadOfertas(element);
                    
                    let Precio=Number.parseFloat(element.marketvalue).toFixed(4);

                    let now = new Date();
                    let servidor=date.format(now, 'YYYY-MM-DD HH:mm:ss');
                    //let registro=element.registro;
                    let registro = new Date(element.datepublication);
                    let regis = date.format(registro, 'YYYY-MM-DD HH:mm:ss');

                    //console.log(now+" - "+registro);

                    let comprobar_fecha=date.isSameDay(now, registro); 
                    // console.log(comprobar_fecha+" - ");
                    // console.log("//////");
                    console.log(element.conditions);
                    let nuevo=false;
                    if (element.conditions==9){
                         nuevo=true;
                    }
                    console.log(nuevo);

                    let FlagProduct=element.status;
                    let statusProduct=0; //Publicación activa
                    let Editable=true; //Publicación activa
                    if(FlagProduct==4){
                        statusProduct=1; // Publicación Takasteada
                    }
                    if(FlagProduct==5){
                        statusProduct=2;//Publicación Elimidada ó Deshabilitada
                    }
                    if(FlagProduct==26){
                        statusProduct=3;//Publicación Editada
                    
                    }
                    Anfitrion= await ProductModel.VerificarAnfitrionSubasta(iduser,element.idproduct,);
                    Pertenece= await ProductModel.VerificarPerteneceProduct(iduser,element.idproduct,);
                    
                    console.log("Anfitrion");
                    console.log(Anfitrion);
                    let rp = await ProductModel.FindProductCKW(element.iduser,element.idproduct);
                   // console.log(rp);
                    //console.log(horaServidor);
                    //console.log(rp.result);
                    let datepublication = new Date(rp.result.datepublication);
                    //console.log(datepublication);
                    ////fecha de creación de producto
                    let fechacp = date.format(datepublication, 'YYYY-MM-DD HH:mm:ss');
                    //console.log(now);
                    let Diferenciafechas=date.subtract(now, datepublication).toMinutes();

                    if(Diferenciafechas>20){
                        Editable=false;
                    }

                    //Transformar
                    let datecreatedt = new Date(element.datecreated);
                    let datecreated = date.format(datecreatedt, 'YYYY-MM-DD HH:mm:ss');
                    //location
                    let location = element.location
                    //interested
                    //Interested
                    interested=await ProductModel.interestedSubastacas(element,iduser);
                        console.log("interested: "+interested.interested[0]);
                        let flagInterested=false;
                        if(interested.interested[0]!= undefined){
                            flagInterested=true;
                        }
                    //console.log(element.typepublication);
                   
                    if(element.typepublication==1){   
                        arr.push({
                            "idproduct": element.idproduct,
                            "datecreated":datecreated,
                            "location":location,
                            "activityTime":null,
                            "Anfitrion":null,
                            "TimeTotal":null,
                            "TimeEnd":null,
                            "flagInterested":flagInterested,
                            "started":null,
                            "finished":null,
                            "begin":null,
                            "end":null,
                            "iduser": element.iduser,
                            "Pertenece":Pertenece.Anfitrion,
                            "nuevo":nuevo,
                            "subcategory": element.subcategory,
                            "name": element.name,
                            "details": element.details,
                            "typemoney": element.typemoney,
                            "marketvalue": Precio,
                            "typepublication": element.typepublication,
                            "conditions": element.conditions,
                            "size": element.size,
                            "weight": element.weight,
                            "status": statusProduct,
                            "editable": Editable,
                            "CantidadOfertas":CantidadOfertas.CantOfertas,
                            "ProductImages":img.ImagesProduct,
                            "Preferences":prefe.Preferences
                            
                        });
                    }
                    if(element.typepublication==3){ 
                        let now2 = new Date();
                        let servidor2=date.format(now, 'YYYY-MM-DD HH:mm:ss');  
                        let beginSubastakas = new Date(element.datebeginst);
                        let begin=date.format(beginSubastakas, 'YYYY-MM-DD HH:mm:ss');
                        let endSubastakas = new Date(element.dateendst);
                        let end=date.format(endSubastakas, 'YYYY-MM-DD HH:mm:ss');
                        let valStarted=date.subtract(now2,beginSubastakas).toMinutes();
                        console.log("valStarted: "+valStarted);
                        let started=false;
                        if(valStarted > 0){
                            started=true;
                        }
                        let finished=false;
                        let valFinished=date.subtract(now2,endSubastakas).toMinutes();
                        if(valFinished > 0){
                            finished=true;
                        }
                        /*interested=await ProductModel.interestedSubastacas(element);
                        console.log("interested: "+interested.interested[0]);
                        let flagInterested=false;
                        if(interested.interested[0]!= undefined){
                            flagInterested=true;
                        }*/

                        let fechaserver = new Date();
                        let fechactual=date.format(fechaserver, 'YYYY-MM-DD HH:mm:ss');
                        //DETERMINAR SI ES EL TIEMPO DE ACTIVIDAD
                        let timeActive=false;
                        let DiferenciafechasInicio=date.subtract(fechaserver, beginSubastakas).toMinutes();
                        console.log("DiferenciafechasInicio: "+DiferenciafechasInicio );
                        let DiferenciafechasFin=date.subtract(fechaserver, endSubastakas).toMinutes();
                        console.log("DiferenciafechasFin: "+DiferenciafechasFin );
                        let TimeTotal=date.subtract(beginSubastakas, endSubastakas).toMilliseconds();;
                        let DiferenciafechasFin2=date.subtract(fechaserver, endSubastakas).toMilliseconds();

                        if(DiferenciafechasInicio>=0 && DiferenciafechasFin<0){
                            timeActive=true;
                        }
                        
//
                        arr.push({
                            "idproduct": element.idproduct,
                            "datecreated":datecreated,                            
                            "activityTime":timeActive,
                            "Anfitrion":Anfitrion.Anfitrion,
                            "TimeTotal":TimeTotal,
                            "TimeEnd":DiferenciafechasFin2,
                            "flagInterested":flagInterested,
                            "started":started,
                            "finished":finished,
                            "begin":begin,
                            "end":end,
                            "iduser": element.iduser,
                            "nuevo": nuevo,
                            "subcategory": element.subcategory,
                            "name": element.name,
                            "details": element.details,
                            "typemoney": element.typemoney,
                            "marketvalue": Precio,
                            "typepublication": element.typepublication,
                            "conditions": element.conditions,
                            "size": element.size,
                            "weight": element.weight,
                            "status": statusProduct,
                            "editable": Editable,
                            "CantidadOfertas":CantidadOfertas.CantOfertas,
                            "ProductImages":img.ImagesProduct
                            
                        });
                    }
                   
                }
            }//fin for 
            resolve(arr)
        }
        catch(e){
            console.log(e);
        }
    }
    )

} 

ProductModel.VerificarAnfitrionSubasta = (userSTK,idSTK) => {
    return new Promise((resolve, reject) => {
    if (pool) {
        //let Puntuar={};
        //console.log("SELECT * FROM product where id="+idPublication);
        pool.query(
            'SELECT COUNT(*) as Anfitrion FROM product  WHERE typepublication=3 AND  iduser=? AND id=? ', [
                userSTK,
                idSTK
            ],
            (err, result) => {
                              
                
                if (err) {
                    resolve({
                        'error': err
                    })
                } else {    
                    let A=false;
                    if(result[0].Anfitrion==1){
                        A=true;
                    }

                    resolve({
                        'Anfitrion': A
                    })
                }

            }
        )
        //return resultado;
    }
    })

}

ProductModel.VerificarPerteneceProduct = (userSTK,idSTK) => {
    return new Promise((resolve, reject) => {
    if (pool) {
        //let Puntuar={};
        //console.log("SELECT * FROM product where id="+idPublication);
        pool.query(
            'SELECT COUNT(*) as Anfitrion FROM product  WHERE typepublication=1 AND  iduser=? AND id=? ', [
                userSTK,
                idSTK
            ],
            (err, result) => {
                              
                
                if (err) {
                    resolve({
                        'error': err
                    })
                } else {    
                    let A=false;
                    if(result[0].Anfitrion==1){
                        A=true;
                    }

                    resolve({
                        'Anfitrion': A
                    })
                }

            }
        )
        //return resultado;
    }
    })

}

ProductModel.ListMiSubasTakas = (UserData,SubastakasData) => {
    //let resultado = {};
    //AND status="+SubastakasData.status+"
    //console.log('SELECT * FROM  product AS p INNER JOIN imgproduct ON p.id=idproduct  WHERE iduser= "'+UserData.iduser+'" AND status='+SubastakasData.status);
    return new Promise((resolve, reject) => {
        if (pool) {

            let armaresult={};
            pool.query(
                "SELECT DISTINCT idproduct, datepublication ,DATE_FORMAT(datepublication, '%d/%m/%Y %H:%i:%s') AS datecreated,iduser,name,details,datebeginst,dateendst,typemoney,marketvalue,subcategory,typepublication,p.conditions,p.size,p.weight,status FROM product AS p INNER JOIN  imgproduct AS i ON p.id=idproduct WHERE iduser='"+UserData.iduser+"' AND p.id=idproduct AND typepublication=3  LIMIT 50",
                async(err, result) => {
                    //console.log(result);                  
                   
                    if (err) {
                        resolve({
                            'error': err
                        })
                    } else {   
                        armaresult = await ProductModel.armaresult2(result,UserData.iduser); 
                        resolve({
                            'result': armaresult
                        })
                    }

                }
            )
            //return resultado;
        }
    })
};
///

ProductModel.DetailSubasTakas = (SubasTakasData) => {
    //let resultado = {};
    //console.log('SELECT * FROM  product AS p INNER JOIN imgproduct ON p.id=idproduct  WHERE iduser= "'+UserData.iduser+'" AND status='+SubasTakasData.status);
    return new Promise((resolve, reject) => {
        if (pool) {
            let armaresult={};
            pool.query(
                "SELECT id as idproduct,datepublication ,datepublication AS datecreated,iduser,name,details,typemoney,marketvalue,subcategory,typepublication,conditions,size,weight,status FROM  product  WHERE id="+SubasTakasData.id,
                async(err, result) => {
                    //console.log(result);
                   
                    if (err) {
                        resolve({
                            'error': err
                        })
                    } else {     
                        armaresult = await ProductModel.armaresult(result);  
                        resolve({
                            'result': armaresult
                        })
                        
                    }

                }
            )
            //return resultado;
        }
    })
};
///////////////
ProductModel.LisTodo = (SubasTakasData) => {
    //let resultado = {};
    //console.log('SELECT * FROM  product AS p INNER JOIN imgproduct ON p.id=idproduct  WHERE iduser= "'+UserData.iduser+'" AND status='+SubasTakasData.status);
    return new Promise((resolve, reject) => {
        if (pool) {
            let armaresult={};
           // console.log("SELECT DISTINCT RAND(id),id, p.datepublication ,DATE_FORMAT(datepublication, '%d/%m/%Y %H:%i:%s') AS datecreated,iduser,name,details,datebeginst,dateendst,typemoney,marketvalue,subcategory,typepublication,p.conditions,p.size,p.location,p.weight,status FROM product AS p WHERE iduser<>'"+SubasTakasData.iduser+"' AND status IN (1,5,2,3,26) ORDER BY datepublication DESC LIMIT 50");
            pool.query(
                "SELECT DISTINCT RAND(id),id as idproduct, p.datepublication ,DATE_FORMAT(datepublication, '%d/%m/%Y %H:%i:%s') AS datecreated,iduser,name,details,datebeginst,dateendst,typemoney,marketvalue,subcategory,typepublication,p.conditions,p.size,p.location,p.weight,status FROM product AS p WHERE iduser<>'"+SubasTakasData.iduser+"' AND status IN (1,5,2,3,26) ORDER BY datepublication DESC LIMIT 50",
                async(err, result) => {
                    console.log(result);
                   
                    if (err) {
                        resolve({
                            'error': err
                        })
                    } else {     
                        armaresult = await ProductModel.armaresult2(result,SubasTakasData.iduser); 
                        resolve({
                            'result': armaresult
                        })
                        
                    }

                }
            )
            //return resultado;
        }
    })
};
///////////////

///
ProductModel.armaresulT = (result) => {

    return new Promise(async (resolve, reject) => {
        let arr = [];
        
        
        try{
            
            let img={};
            let prefe={};
            let CantidadOfertas=0;
            let idproducs=0;
            //console.log(result);
            for (const element of result) {
                //console.log(element.idproduct+" - "+idproducs);
                if(element.idproduct!=idproducs){
                    //console.log("idproducs - "+element.idproduct);
                    idproducs=element.idproduct;
                    img=await ProductModel.ListImagesProduct(element);
                    prefe=await ProductModel.ListPrefrencesProduct(element);
                    CantidadOfertas=await ProductModel.CantidadOfertas(element);
                    let Precio=Number.parseFloat(element.marketvalue).toFixed(4);

                    let now = new Date();
                    let servidor=date.format(now, 'YYYY-MM-DD HH:mm:ss');
                    //let registro=element.registro;
                    let registro = new Date(element.datepublication);
                    let regis = date.format(registro, 'YYYY-MM-DD HH:mm:ss');

                    //console.log(now+" - "+registro);

                    let comprobar_fecha=date.isSameDay(now, registro); 
                    // console.log(comprobar_fecha+" - ");
                    // console.log("//////");
                    let nuevo=false;

                    console.log(element.conditions);
                    //let nuevo=false;
                    if (element.conditions==9){
                         nuevo=true;
                    }
                    console.log(nuevo);

                    let FlagProduct=element.status;
                    let statusProduct=0; //Publicación activa
                    let Editable=true; //Publicación activa
                    if(FlagProduct==4){
                        statusProduct=1; // Publicación Takasteada
                    }
                    if(FlagProduct==5){
                        statusProduct=2;//Publicación Elimidada ó Deshabilitada
                    }
                    if(FlagProduct==26){
                        statusProduct=3;//Publicación Editada
                    
                    }

                    let rp = await ProductModel.FindProductCKW(element.iduser,element.idproduct);
                   // console.log(rp);
                    //console.log(horaServidor);
                    let datepublication = new Date(rp.result.datepublication);
                    console.log(datepublication);
                    //fecha de creación de producto
                    let fechacp = date.format(datepublication, 'YYYY-MM-DD HH:mm:ss');
                    //console.log(now);
                    let Diferenciafechas=date.subtract(now, datepublication).toMinutes();

                    if(Diferenciafechas>20){
                        Editable=false;
                    }
                    interested=await ProductModel.interestedSubastacas(element,iduser);
                    console.log("interested: "+interested.interested[0]);
                    let flagInterested=false;
                    if(interested.interested[0]!= undefined){
                        flagInterested=true;
                    }
                    console.log(element.idproduct);
                       
                        arr.push({
                            "idproduct": element.idproduct,
                            "flagInterested":flagInterested,
                            "datecreated":regis,
                            "begin":element.datebeginst,
                            "end":element.dateendst,
                            "iduser": element.iduser,
                            "nuevo": nuevo,
                            "subcategory": element.subcategory,
                            "name": element.name,
                            "details": element.details,
                            "typemoney": element.typemoney,
                            "marketvalue": Precio,
                            "typepublication": element.typepublication,
                            "conditions": element.conditions,
                            "size": element.size,
                            "weight": element.weight,
                            "status": statusProduct,
                            "editable": Editable,
                            "CantidadOfertas":CantidadOfertas.CantOfertas,
                            "ProductImages":img.ImagesProduct,
                            "Preferences":prefe.Preferences
                            
                        });
                    
                   
                }
            }//fin for 
            resolve(arr)
        }
        catch(e){
            console.log(e);
        }
    }
    )

} 
///////////////////////////
ProductModel.interestedSubastacas = (element,iduser) => {
    return new Promise((resolve, reject) => {
        console.log('SELECT id FROM interested WHERE iduser="'+iduser+'" AND idproduct='+element.idproduct+' AND status=1');
        pool.query(
            'SELECT id FROM interested WHERE iduser=? AND idproduct=? AND status=1',
            [iduser,
            element.idproduct
            ],
            (err2, result2) => {
                 
                console.log(iduser);   
                console.log(element.idproduct);   
                //console.log(result2[1].preference);
                if (err2) {
                    resolve({
                        'error': err2
                    })
                } else {     
                    console.log(result2); 
                    // console.log(result2.length);
                    // let ImagesProduct= []; 
                    // for(var atr2 in result2){
                    // ImagesProduct.push(result2[atr2].url); 
                    // };  
                    //console.log(element.idproduct);  
                   // console.log(ImagesProduct);
                    resolve({                        
                        "interested": result2
                    });
                }  
                
                //console.log(CatgySubCatg);
                //CatgySubCatg.Subcategory=result2;
                //console.log("//////SUBCATEGORÍA///////");
                // console.log(result2);

            })
    })
}



//LISTAR LAS SUBASTAKAS PUBLICADAS POR OTROS USUARIOS - SUBASTAKEAR 
ProductModel.MInterestedSubasTakas = (UserData,SubastakasData) => {
    //let resultado = {};
    //console.log('SELECT * FROM  product AS p INNER JOIN imgproduct ON p.id=idproduct  WHERE iduser= "'+UserData.iduser+'" AND status='+SubastakasData.status);
    return new Promise((resolve, reject) => {
        if (pool) {

            let armaresult={};
            pool.query(
                "SELECT DISTINCT idproduct,idproduct,i.id, datepublication ,DATE_FORMAT(datepublication, '%d/%m/%Y %H:%i:%s') AS datecreated,i.iduser,name,details,datebeginst,dateendst,typemoney,marketvalue,subcategory,typepublication,p.conditions,p.size,p.weight,p.status  FROM interested AS i INNER JOIN product AS p ON i.idsubastakas=p.id  INNER JOIN  imgproduct AS im ON p.id=idproduct WHERE i.iduser='"+UserData.iduser+"' AND p.status<>4 AND p.id=idproduct AND typepublication=3 AND i.status=1 LIMIT 50",
                async(err, result) => {
                    //console.log(result);                  
                   
                    if (err) {
                        resolve({
                            'error': err
                        })
                    } else {   
                        armaresult = await ProductModel.armaresult2(result,UserData.iduser);
                        resolve({
                            'result': armaresult
                        })
                    }

                }
            )
            //return resultado;
        }
    })
};
///
ProductModel.GetSubasTakas = (SubastakasData) => {
    //let resultado = {};
    //console.log('SELECT * FROM  product AS p INNER JOIN imgproduct ON p.id=idproduct  WHERE iduser= "'+UserData.iduser+'" AND status='+SubastakasData.status);
    return new Promise((resolve, reject) => {
        if (pool) {
            let armaresult={};
            let IdSAla="";
            let ExistChatroom={};
            let Msg="";
            pool.query(
                "SELECT * FROM product AS p  WHERE p.id="+SubastakasData.idSubastakas,
                async(err, result) => {
                    console.log(result);                  
                   
                    if (err) {
                        resolve({
                            'error': err
                        })
                    } else {   
                        
                        let now = new Date();
                        let servidor=date.format(now, 'YYYY-MM-DD HH:mm:ss'); 
                        let datepublication= new Date(result[0].datepublication);
                        let dateCreated=  date.format(datepublication, 'YYYY-MM-DD HH:mm');

                        IdSAla=sha1(result[0].id+result[0].iduser+result[0].datepublication+result[0].typepublication,result[0].subcategory+result[0].name+now);
                        console.log("IdSAla: "+IdSAla);

                        let datebeginst= new Date(result[0].datebeginst);
                        let dateInicio=  date.format(datebeginst, 'YYYY-MM-DD HH:mm');
                        let dateendst= new Date(result[0].dateendst);
                        let dateFin=  date.format(dateendst, 'YYYY-MM-DD HH:mm');
                        //AQUÍ COMIENZAN LAS CONDICIONES PARA CREAR LA SALA
                        //DETERMINAR SI YA DEBIÓ HABER COMENZADO
                        let valStarted=date.subtract(now,datebeginst).toMinutes();

                        //console.log("valStarted: "+valStarted);
                        let finished=false;
                        let valFinished=date.subtract(now,dateendst).toMinutes();
                        if(valFinished > 0){
                            finished=true;
                        }
                        let started=false;
                        if(valStarted > 0){
                            started=true;
                        }
                        console.log("started: "+started+" finished: "+finished);
                        //Si ya es tiempo de iniciar 
                        if(started==true && finished==false){
                            //se compueda si ya la sala exisite
                            ExistChatroom = await chatroomsModel.ExistChatRooms(IdSAla);
                            //console.log(ExistChatroom);
                             // NO Extiste = Se crea la sala y se pasa la información
                            if(ExistChatroom.result.length==0){
                                console.log("NO existe");
                                Msg="Que gane el mejor postor! en la subasta de <<"+result[0].name+">>";
                                DataSalas = await chatroomsModel.newChatRooms(IdSAla,IdSAla,result[0].iduser,result[0].id,result[0].id,servidor,43);
                                armaresult={
                                    "IdSAla":IdSAla,
                                    "idproduct": result[0].id,
                                    "datecreated":dateCreated,
                                    "started":started,
                                    "finished":finished,
                                    "begin":dateInicio,
                                    "end":dateFin,
                                    "statusSubasta":43,
                                    "msg":Msg
                                }  
                            }
                            //SI existe = se pasa la información de la sala
                            if(ExistChatroom.result.length!=0){
                                Msg="Que gane el mejor postor! en la subasta de << "+result[0].name+" >>";
                                console.log("Existe");
                                console.log("ExistChatroom: "+ExistChatroom.result.id);
                                armaresult={
                                    "IdSAla":ExistChatroom.result.id,
                                    "idproduct": result[0].id,
                                    "datecreated":dateCreated,
                                    "started":started,
                                    "finished":finished,
                                    "begin":dateInicio,
                                    "end":dateFin,
                                    "statusSubasta":ExistChatroom.result.status,
                                    "msg":Msg
                                }
                            }
                           

                        }
                        //Si aún NO inicia 
                        if(started==false && finished==false){
                            Msg="¡Pronto! Aún no es tiempo de comenzar la subasta de <<"+result[0].name+">>";
                            armaresult={
                                "IdSAla":null,
                                "idproduct": result[0].id,
                                "datecreated":dateCreated,
                                "started":started,
                                "finished":finished,
                                "begin":dateInicio,
                                "end":dateFin,
                                "statusSubasta":null,
                                "msg":Msg
                            }                           
                        }
                        //Si Ya finalizó
                        if(started==true && finished==true){
                            Msg="¡Suerte en la proxima! Ya finalizó la subasta de <<"+result[0].name+">>";
                            armaresult={
                                "IdSAla":null,
                                "idproduct": result[0].id,
                                "datecreated":dateCreated,
                                "started":started,
                                "finished":finished,
                                "begin":dateInicio,
                                "end":dateFin,
                                "statusSubasta":null,
                                "msg":Msg
                            }                           
                        }
                        //console.log(started);
                        
                        //armaresult = await ProductModel.armaresult(result);  
                        resolve({
                            'result': armaresult
                        })
                    }

                }
            )
            //return resultado;
        }
    })
};







module.exports = ProductModel;