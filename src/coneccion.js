const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/musica-online',{
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(db => console.log('base de datos conectada'))
.catch(err => console.log(err));