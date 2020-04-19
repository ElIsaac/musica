const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth');
const fs = require('fs')

const YoutubeMp3Downloader = require("youtube-mp3-downloader");

function descargar() {

}

router.get('/musica/:id', isAuthenticated, (req, res) => {
    res.render('musica/cancion');
})
router.get('/musica', isAuthenticated, (req, res) => {
    res.render('musica/canciones');
});
router.get('/agregarMusica', isAuthenticated, (req, res) => {
    res.render('musica/agregarCancion');
});
router.post('/agregarMusica', isAuthenticated, async (req, res) => {

    //Configure YoutubeMp3Downloader with your settings
    var YD = new YoutubeMp3Downloader({
        "ffmpegPath": "C:\ffmpeg\bin",        // Where is the FFmpeg binary located?
        "outputPath": "C:\Users\Isaac\Desktop\musica-online\src\descargas",    // Where should the downloaded and encoded files be stored?
        "youtubeVideoQuality": "highest",       // What video quality should be used?
        "queueParallelism": 2,                  // How many parallel downloads/encodes should be started?
        "progressTimeout": 2000                 // How long should be the interval of the progress reports
    });

    //Download video and save as MP3 file
    YD.download(req.body.link, req.body.artista+" - "+req.body.nombre+".mp3");

    YD.on("finished", function (err, data) {
        console.log(JSON.stringify(data));
    });

    YD.on("error", function (error) {
        console.log("error: "+error);
    });

    YD.on("progress", function (progress) {
        console.log(JSON.stringify(progress));
    });
})
module.exports = router;