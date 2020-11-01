const pool = require('../config/database');

let notificationModel = {};


//CREAR NOTIFICACIÓN 
notificationModel.cearnotificacion = (TypeNotification,idrelation,UserPublication,titulo,detalles,idOferta) => {
    return new Promise((resolve, reject) => {
        pool.query(
            "INSERT INTO notifications (typenotifications,title,details,iduser,idrelation,idevento,STATUS) VALUES ("+TypeNotification+",'"+titulo+"','"+detalles+"','"+UserPublication+"',"+idrelation+","+idOferta+",1)",
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
                    // let ImagesProduct= []; 
                    // for(var atr2 in result2){
                    // ImagesProduct.push(result2[atr2].url); 
                    // };  
                    //console.log(element.idproduct);  
                   // console.log(ImagesProduct);
                    resolve({                        
                        'result': result2
                    });
                }  
                
                //console.log(CatgySubCatg);
                //CatgySubCatg.Subcategory=result2;
                //console.log("//////SUBCATEGORÍA///////");
                // console.log(result2);

            })
    })
}

//LISTAR  NOTIFICACIONES DETALLADAS 
notificationModel.listNotifications = (idOferta) => {
    return new Promise((resolve, reject) => {
        pool.query(
            "SELECT n.id AS idNotifications,DATE_FORMAT(n.datecreated, '%d/%m/%Y') AS dateNotifications,n.status AS statusNotifications,n.typenotifications, n.title,n.details,n.idevento,n.idrelation,p.name,p.marketvalue AS nameProducto FROM notifications AS n INNER JOIN product AS p ON n.idrelation=p.id ORDER BY n.datecreated DESC",
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
                    // let ImagesProduct= []; 
                    // for(var atr2 in result2){
                    // ImagesProduct.push(result2[atr2].url); 
                    // };  
                    //console.log(element.idproduct);  
                   // console.log(ImagesProduct);
                    resolve({                        
                        'result': result2
                    });
                }  
                
                //console.log(CatgySubCatg);
                //CatgySubCatg.Subcategory=result2;
                //console.log("//////SUBCATEGORÍA///////");
                // console.log(result2);

            })
    })
}



module.exports = notificationModel;