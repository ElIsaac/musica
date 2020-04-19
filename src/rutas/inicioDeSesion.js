const express=require('express');
const router=express.Router();
const passport=require('passport');

router.get('/inicioDeSesion', (req, res) => {
    res.render('usuarios/inicioDeSesion.hbs');
   
})
router.post('/inicioDeSesion', passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/inicioDeSesion',
    failureFlash: true
}));

router.get('/cerrarSesion', (req, res)=>{
    req.logOut();
    res.redirect('/');
})
module.exports= router;
