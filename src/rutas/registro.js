const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

router.get('/registrate', (req, res) => {
    res.render('usuarios/registrate');
})
router.post('/registrate', async (req, res) => {

    const datosDeUsuario = { nombre, email, contrasenia, confirmaContrasenia } = req.body;
    const errors=[];
    console.log(req.body.nombre);
    if (req.body.nombre === '' || req.body.email === '' || req.body.contrasenia === '') {
        errors.push({text: 'llene los campos'})
        if (req.body.contrasenia != req.body.confirmaContrasenia) {
            errors.push({text: 'no son iguales'})
        }
    }
    
    if(errors.length > 0){
        res.render('usuarios/registrate', {
            errors
        });}
    else {
        console.log(req.body);
        var nuevoUsuario = new Usuario({
            nombre,
            email,
            contrasenia
        });
        nuevoUsuario.contrasenia = await nuevoUsuario.encriptacion(contrasenia);
        await nuevoUsuario.save();
        res.redirect('/inicioDeSesion');
    }
})

module.exports = router;