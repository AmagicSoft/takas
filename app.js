const express = require('express');
const morgan = require('morgan');
const path = require('path');
const http = require('http');
const realtime = require("./src/socket/realtime");

const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session); //agregamos esta linea
const {database} = require('./src/config/keys');

//* Initialization
const port = 1111;
const app = express();
const server = http.createServer(app);

//* Socket
realtime(server);



//* Settings
app.set('port', process.env.PORT || port);
app.set('views', path.join(__dirname, 'doc'));

//* Interpreta html simples
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


//* Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || '7opz&&#YNZotjUj67', 
    resave: false, 
    store: new MySQLStore(database),
    saveUninitialized: true

}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Global Variables
app.use((req,res,next)=>{
    app.locals.user=req.user;
    app.locals.error = req.flash('error');
    app.locals.success = req.flash('success');
    app.locals.warning = req.flash('warning');

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

//* Routes 
app.use(require('./src/routes'));
////app.use(require('./routes/delivery/usersdomiciliaryroutes'));
app.use('/admin', require('./src/routes/admin/adminroutes'));
app.use('/user', require('./src/routes/user/usersroutes'));
app.use('/subastakas', require('./src/routes/subastakas/subastakasroutes'));
app.use('/epayco', require('./src/routes/epayco/epaycoroutes'));
////app.use('/subastakas',require('./src/routes/subastakas/subastakasroutes'));
app.use('/notifications', require('./src/routes/notifications/notificationsroutes'));


//* Publics Paths
app.use('/consola', express.static(path.join(__dirname, 'src/public')));
app.use(express.static(path.join(__dirname, 'doc')));


//* Starting the server
server.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})