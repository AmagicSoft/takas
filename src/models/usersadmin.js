const pool = require('../config/database');
const { serializeUser } = require('passport');
const { database } = require('../config/keys');
const { Result } = require('express-validator');
const date = require('date-and-time');




let userAdminModel = {};

//ListUsers  - obtenemos lista de usuarios segun el rol
userAdminModel.getUsersRole = (role, callback) => {
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



userAdminModel.PinExist = (pin) => {
    return new Promise((resolve, reject) => {
     if (pool) {
         pool.query(
            'SELECT * FROM usersadmin WHERE code=?', pin,
             (err, result) => {
                 console.log(err);
                 console.log("result.length");
                 console.log(result.length);
                 if (err) {
                     resolve({
                         'error': err
                     })
                 } else {
                    
                     resolve({
                         'result': result.length
                     })
                 }

             }
         )
         //return resultado;
     }
 })
};

//CreateUser
userAdminModel.CreateCode = (DataCode, callback) => {
    return new Promise((resolve, reject) => {
        if (pool)
                

                pool.query(
                    'INSERT INTO usersadmin SET ?', DataCode,
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

userAdminModel.CheckCode = (code) => {
    return new Promise((resolve, reject) => {
     if (pool) {
         
         pool.query(
            'SELECT * FROM usersadmin WHERE code=?  ', code,
             (err, result) => {
                 console.log(err);
                 console.log("result.length");
                 console.log(result.length);
                 if (err) {
                     resolve({
                         'error': err
                     })
                 } else {
                    
                     resolve({
                         'result': result.length
                     })
                 }

             }
         )
         //return resultado;
     }
 })
};

//NewAdminUser
userAdminModel.NewAdminUser = (DataUserAdmin,idCode) => {
    return new Promise((resolve, reject) => {
        if (pool)
        console.log("DataUserAdmin");
        console.log(DataUserAdmin);
                pool.query(
                    'UPDATE usersadmin SET ? WHERE code="'+idCode+'"', DataUserAdmin,
                    (err, result) => {
                        if (err) {
                            console.log(err);
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

userAdminModel.LoginAdminUser = (userData) => {
    return new Promise((resolve, reject) => {
        if (pool)
            console.log(userData);
        pool.query(
            'SELECT * FROM usersadmin  WHERE (email="'+userData.user+'" OR user="'+userData.user+'"  OR phonenumber="'+userData.user+'") AND password=?',userData.password,
            (err, result) => {
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

//ListPrivilege
userAdminModel.ListPrivilege = () => {
    //let resultado = {};
    return new Promise((resolve, reject) => {
        if (pool) {
            pool.query(
                'SELECT * FROM privileges WHERE status=1 ', 
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








module.exports = userAdminModel;


