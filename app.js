var express = require("express");
var app = express();
var bodyparser = require('body-parser');
require('dotenv').config();

const { createWorker } = require('tesseract.js');

var axios = require("axios").default;
const { response } = require("express");



app.set("view engine", "ejs");



app.use(bodyparser.urlencoded({ extended: true }));


app.get('/', function (req, res) {
    res.render('home.ejs');

});

app.get('/image2', function (req, res) {
    res.render('image2.ejs');
})

app.post('/image', function (req, res) {

    var key1 = 'a75370633amshf7849dba7403f10p1520c9jsn334d3e484ce4';
    var key2 = 'fac38de8d6mshbc3293d3897d0c4p123175jsn3ac40d352544';

    var options = {
        method: 'GET',
        url: 'https://ocrly-image-to-text.p.rapidapi.com/',
        params: {
            filename: 'sample.jpg',
            imageurl: req.body.url
        },
        headers: {
            'x-rapidapi-key': key1,
            'x-rapidapi-host': 'ocrly-image-to-text.p.rapidapi.com'
        }
    };

    

    axios.request(options).then(function (response) {
        console.log(response.data);
        let image = {
            url: req.body.url,
            text: response.data
        }
        res.render('image.ejs',{image})

    }).catch(function (error) {
        console.error(error);
    });
})
/*

app.get('/ab', async (req, res) => {

    try {
        

        const worker = createWorker();
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } } = await worker.recognize('yogesh_i.png');
        console.log(text);

        await worker.terminate();
        res.send(text);


    } catch (error) {
        console.log(error.message);
    }
    
})
app.get('/a', async (req, res) => {
    var axios = require("axios").default;

    var options = {
        method: 'POST',
        url: 'https://google-ai-vision.p.rapidapi.com/cloudVision/imageToText',
        headers: {
            'content-type': 'application/json',
            'x-rapidapi-key': 'fac38de8d6mshbc3293d3897d0c4p123175jsn3ac40d352544',
            'x-rapidapi-host': 'google-ai-vision.p.rapidapi.com'
        },
        data: {
            source: 'https://ocr-demo.abtosoftware.com/uploads/handwritten2.jpg',
            sourceType: 'url'
        }
    };

    axios.request(options).then(function (response) {
        res.send(response.data.text);
    }).catch(function (error) {
        console.error(error.message);
    });
     
});
app.get('/abc', async (req, res) => {
    res.send("yes");
})



*/


app.listen(process.env.PORT || 3000, function () {
    console.log("App Started");
});
