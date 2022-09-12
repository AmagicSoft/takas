  /*module.exports = {
     database:{
         host:'localhost',
         user:'root',
         password:'',
         database:'takas'
     }
 }*/

   



var config = {
    user: process.env.SQL_USER,
    database: process.env.SQL_DATABASE,
    password: process.env.SQL_PASSWORD
}

if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
    config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
  }

  module.exports={
      database:config
  }