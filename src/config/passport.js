const passport=require('passport');
const localStrategy= require('passport-local').Strategy

const Usuario = require('../models/Usuario');

passport.use(new localStrategy({
    usernameField:'email',
    passwordField: 'contrasenia'},
    async (email, contrasenia, done)=>{
        const usuario=await Usuario.findOne({email});
        if(!usuario){
            return done(null, false, {message: 'Usuario no encontrado'});
        }else{
            const usuarioEncontrado=usuario.matchPassword(contrasenia);
            if(usuarioEncontrado){
                return done(null, usuario)
            }
            else{
                return done(null, false, {message: 'Contraseña incorrecta'})
            }
        }
    }
));

passport.serializeUser((usuario, done) =>{
    done(null, usuario._id);
});

passport.deserializeUser((id, done) => {
    Usuario.findById(id, (err, usuario) => {
      done(err, usuario);
    });
});