const express=require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');


//inicializaciones
const app=express();
require('./coneccion');

//configuraciones
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
  }));
app.set('view engine', '.hbs');

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')
app.use(flash());

//variables locales
app.use((req, res, next) => {
    res.locals.succes_msg = req.flash('succes_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user;
    next();
}); 

//rutas
app.use(require('./rutas/inicioDeSesion'));
app.use(require('./rutas/registro'));
app.use(require('./rutas/musica'));
app.use(require('./rutas/extras'));

//static
app.use(express.static(path.join(__dirname, 'public')));

//listen del servidor
app.listen(app.get('port'), () =>{
    console.log('servidor en el puerto: ', app.get('port'));
});