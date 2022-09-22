const pool = require('../config/database');
const { serializeUser } = require('passport');
const { database } = require('../config/keys');
const { Result } = require('express-validator');
const date = require('date-and-time');




let userModel = {};

//ListUsers  - obtenemos lista de usuarios segun el rol
userModel.getUsersRole = (role, callback) => {
    //let resultado = {};
    return new Promise((resolve, reject) => {
        if (pool) {
            pool.query(
                'SELECT * FROM users where role= ?', [role],
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
            //return resultado;
        }
    })
};

//List Usuario por id
userModel.getUser = (iduser) => {
    //let resultado = {};
    return new Promise((resolve, reject) => {
        if (pool) {
            pool.query(
                'SELECT * FROM users where ?', iduser,
                (err, resut) => {
                    console.log(resut);
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
            //return resultado;
        }
    })
};

//CreateUser
userModel.createUser = (userData, callback) => {
    return new Promise((resolve, reject) => {
        if (pool)
            if (userData.tyc == true) {
                pool.query(
                    'INSERT INTO users SET ?', userData,
                    (err, resut) => {
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
            } else {
                resolve({
                    'result': "Debe aceptar términos y condiciones"
                })
            }
    }
    )


};


//Actualizar Usuario
userModel.UpdatePerfil = (userData, iduser) => {
    return new Promise((resolve, reject) => {
        if (pool)
            console.log('UPDATE users SET ? WHERE id="' + iduser + '"', userData);
        // if(userData.tyc==true){
        pool.query(
            'UPDATE users SET ? WHERE id="' + iduser + '"', userData,
            (err, result) => {
                if (err) {
                    console.log(err);
                    resolve({
                        'error': err
                    })
                } else {
                    console.log(result);

                    resolve({
                        'result': result
                    })
                }

            }
        )
        // }else {
        //     resolve({
        //         'result': "Debe aceptar términos y condiciones"
        //     })
        // }
    }
    )


};

//LoginUser
userModel.loginUser = (userData, callback) => {
    return new Promise((resolve, reject) => {
        if (pool)
            pool.query(
                'SELECT * FROM users where `id`=?  AND email=?', [
                userData.id,
                userData.email
            ],
                (err, result) => {
                    if (result && Object.entries(result).length != 0) {
                        resolve({
                            'Email': result[0].email,
                            'Fullname': result[0].fullname,
                            'PhoneNumber': result[0].phonenumber,
                            'ImgUrl': result[0].imgurl,
                            'result': result
                        })
                    } else {
                        resolve({
                            'error': err
                        })
                    }

                }
            )
    }
    )


};

//LoginUser
userModel.PerfilUser = (idUser, callback) => {
    return new Promise((resolve, reject) => {
        if (pool)
            pool.query(
                'SELECT u.email,u.fullname,u.phonenumber,u.imgurl,u.datecreated,m.name AS memberships FROM users AS u INNER JOIN mastermemberships AS m  ON u.memberships=m.id WHERE u.id="' + idUser + '"',
                (err, result) => {
                    //console.log(result);
                    if (result && Object.entries(result).length != 0) {
                        let registro = new Date(result[0].datecreated);
                        let regis = date.format(registro, 'DD/MM/YY');
                        let calfClient = 0;
                        if (result[0].calfClient != null) {
                            calfClient = result[0].calfClient;
                        }
                        let calfVendedor = 0;
                        if (calfVendedor != null) {
                            calfVendedor = result[0].calfVendedor;
                        }
                        resolve({
                            'result': {
                                'NameUser': result[0].fullname,
                                'EmailUser': result[0].email,
                                'ImgUrl': result[0].imgurl,
                                'PhonenumberUser': result[0].phonenumber,
                                'memberships': result[0].memberships,
                                'DatecreatedUser': regis,
                                'ReputationVendedor': calfVendedor,
                                'ReputationCliente': calfClient,
                            }
                        })
                    } else {
                        resolve({
                            'error': err
                        })
                    }

                }
            )
    }
    )


};

//GloginUser
userModel.GloginUser = (userData, callback) => {
    return new Promise((resolve, reject) => {
        if (pool) {

            //Verificar si un usuario existe

            pool.query(
                'SELECT * FROM users where `id`=? AND email=?', [
                userData.id,
                userData.email
            ],
                (err, result) => {
                    //console.log(err)
                    //
                    if (result && Object.entries(result).length != 0) {
                        resolve({
                            'newUser': false,
                            'Email': result[0].email,
                            'Fullname': result[0].fullname,
                            'PhoneNumber': result[0].phonenumber,
                            'ImgUrl': result[0].imgurl,
                            'result': result
                        })
                    } else {

                        // resolve({
                        //     'error': err
                        // })
                        //Ragistrar nuevo usuario
                        if (userData.tyc == true) {
                            console.log(userData);
                            pool.query(
                                'INSERT INTO users SET ?', userData,
                                (err, result) => {

                                    //
                                    if (err) {
                                        resolve({
                                            'newUser': false,
                                            'error': err
                                        })
                                    } else {
                                        console.log(result);
                                        resolve({
                                            'newUser': true,
                                            'Email': result.email,
                                            'Fullname': result.fullname,
                                            'PhoneNumber': result.phonenumber,
                                            'ImgUrl': result.imgurl,
                                            'result': result
                                        })
                                    }
                                })
                        } //if para verificar si aceptó terminos y condiciones
                        else {
                            resolve({
                                'newUser': true,
                                'error': "Debe aceptar terminos y condiciones"
                            })
                        }
                    }

                }
            )
        }//fin if
    }
    )


};


//updatetokenpush
userModel.updatetokenpush = (userData, callback) => {
    return new Promise((resolve, reject) => {
        if (pool)
            // let now = new Date();
            // let hoytp=date.format(now, 'YYYY-MM-DD HH:mm:ss');
            //let tokeprovisional=userData.tokenpush+" "+userData.id+"asdas";
            //let tokeprovisional="userData.tokenpush";
            //Buscar si sexiste token
            pool.query(
                'SELECT  * FROM `users` WHERE tokenpush= ?', [
                userData.tokenpush
            ],
                (err, result) => {
                    if (err) {
                        console.log(err);

                        resolve({
                            'error': err
                        })
                    } else {
                        console.log(result);
                        let eselmismo = false;
                        let tokenrexist = false;
                        console.log(result.length);
                        //Verificar si el usuario del token es el mismo
                        if (result.length != 0) {
                            tokenrexist = true;
                            if (result[0].id == userData.id) {

                                eselmismo = true;
                                resolve({
                                    'result': result,
                                    'eselmismo': eselmismo
                                })

                            }
                            else {
                                //eliminamos token de otro usurio
                                
                                pool.query(
                                    'UPDATE `users` SET tokenpush=(NULL) where id= ?', [
                                    userData.id
                                ],
                                    (err, resut) => {
                                        console.log(err);
                                        if (err) {
                                            resolve({
                                                'error': err
                                            })
                                        } else {
                                            //ACTUALIZAMOS TOKEN
                                            pool.query(
                                                'UPDATE `users` SET tokenpush= ? where id= ?', [
                                                userData.tokenpush,
                                                userData.id
                                            ],
                                                (err, resut) => {
                                                    console.log(err);
                                                    if (err) {
                                                        resolve({
                                                            'error': err
                                                        })
                                                    } else {
                                                        resolve({
                                                            'result': resut,
                                                            'eselmismo': eselmismo
                                                        })
                                                    }

                                                }
                                            )
                                        }

                                    }
                                )

                            }

                        }//
                        else{
                            //ACTUALIZAMOS TOKEN
                            pool.query(
                                'UPDATE `users` SET tokenpush= ? where id= ?', [
                                userData.tokenpush,
                                userData.id
                            ],
                                (err, resut) => {
                                    console.log(err);
                                    if (err) {
                                        resolve({
                                            'error': err
                                        })
                                    } else {
                                        resolve({
                                            'result': resut,
                                            'eselmismo': eselmismo
                                        })
                                    }

                                }
                            )
                        

                    
                
                        }

                        // console.log(result[0].id);
                        // console.log(userData.id);
                        // console.log(eselmismo);

                        // resolve({
                        //     'result': result
                        // })
                    }

                }
            )
   
    }
    )


};

///VERIFICAR SI UN USUARIO SE ENCUENTRA REGISTRADO EN LA BASE DE DATOS EL BACKEND
userModel.UserExist = (userData, callback) => {
    return new Promise((resolve, reject) => {
        if (pool)
            pool.query(
                'SELECT u.email,u.fullname,u.phonenumber,u.imgurl,m.name AS memberships FROM users AS u INNER JOIN mastermemberships AS m  ON u.memberships=m.id WHERE u.id=?', [userData.id],
                (err, result) => {
                    console.log(result);
                    if (err) {
                        resolve({
                            'error': err
                        })
                    } else {
                        resolve({
                            'UserExist': true,
                            'Email': result[0].email,
                            'Fullname': result[0].fullname,
                            'PhoneNumber': result[0].phonenumber,
                            'memberships': result[0].memberships,
                            'ImgUrl': result[0].imgurl

                        })
                    }

                }
            )
    }
    )


};



///TOMAR LA INFORMACION DE UN USUARIO SEGÚN UNA PUBICACIÓN 
userModel.DataUserPublication = (idproduct, callback) => {
    return new Promise((resolve, reject) => {
        if (pool)
            console.log("idproduct " + idproduct);
        pool.query(
            'SELECT u.id AS UserPublication,u.tokenpush,u.email, u.fullname as NameUser,p.`name` AS nameProducto,p.`marketvalue`,p.typepublication,p.status FROM `users` AS u INNER JOIN `product` AS p ON u.`id`=p.`iduser` WHERE p.`id`=' + idproduct,
            (err, result) => {
                console.log(err);
                if (err) {
                    resolve({
                        'error': err
                    })
                } else {
                    console.log("result DataUserPublication");
                    console.log(result);
                    resolve({
                        'result': result
                    })
                }

            }
        )
    }
    )


};


///TOMAR LA INFORMACION DE UN USUARIO SEGÚN UNA OFERTA 
userModel.DataUserOferta = (idOferta) => {
    return new Promise((resolve, reject) => {
        if (pool)
            pool.query(
                'SELECT o.idproduct,u.id AS UserOferta,u.tokenpush,u.email, u.fullname AS NameUser FROM offers AS o INNER JOIN users AS u ON u.id=o.iduser WHERE o.id=' + idOferta,
                (err, result) => {
                    console.log(err);
                    if (err) {
                        resolve({
                            'error': err
                        })
                    } else {
                        //console.log(result);
                        resolve({
                            'result': result,
                            'idproduct': result[0].idproduct
                        })
                    }

                }
            )
    }
    )


};


//SolicitarMembresia
userModel.SolicitarMembresia = (userData, iduser) => {
    return new Promise((resolve, reject) => {
        if (pool)
            pool.query(
                'UPDATE users SET ? WHERE id="' + iduser + '"', userData,
                (err, resut) => {
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
    )


};


//ListUsers  - obtenemos lista de usuarios segun filtros
userModel.ListUsers = (Consulta) => {
    //let resultado = {};
    return new Promise((resolve, reject) => {
        if (pool) {
            pool.query(
                Consulta,
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
            //return resultado;
        }
    })
};


//Eliminación lógia o suspención de Usuario
userModel.DeleteSUser = (id) => {
    return new Promise((resolve, reject) => {
        if (pool)
            pool.query(
                'UPDATE `users` SET status= 2 where id=' + id,
                (err, resut) => {
                    console.log(err);
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
    )


};

//Obtener la cantidad de regisrados por rango de fecha
userModel.CantUsersRegistrados = (inicio, fin) => {
    return new Promise((resolve, reject) => {
        if (pool)
        console.log("SELECT COUNT(id) AS CantRegistros FROM users WHERE  datecreated  BETWEEN '" + inicio + "' AND '" + fin + "' GROUP BY id");
            pool.query(
                "SELECT COUNT(id) AS CantRegistros FROM users WHERE  datecreated  BETWEEN '" + inicio + "' AND '" + fin + "' GROUP BY id",
                (err, result) => {
                    //console.log(err);
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
    }
    )


};


//Obtener la cantidad de Solicitudes de Membresías  por rango de fecha
userModel.CantMemberShiprequests = (inicio, fin) => {
    return new Promise((resolve, reject) => {
        if (pool)
            pool.query(
                "SELECT COUNT(id) AS CantRM FROM users WHERE statusmemberships=38 AND datememberships  BETWEEN '" + inicio + "' AND '" + fin + "' GROUP BY id",
                (err, result) => {
                    console.log(err);
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
    }
    )


};







module.exports = userModel;


