const express = require('express');
const app = express();
const scrape = require('metatag-crawler');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/', function(req, res) {

    let url = req.body.url;
    scrape(url, function(err, data) {
        if (err) res.json(err);
        let meta;
        if (err) return console.log(err);
        if(data.og) {
            meta = {
                title: data.og.title,
                description: data.og.description,
                url: data.og.url,
                image: data.og.images[0].url
            }
            res.json(meta);
        } else {
            meta = {
                title: data.meta.title,
                description: data.meta.description,
                url: data.meta.canonical,
                image: data.images[0].url
            }
            res.json(meta);
        }
    });
    
});

app.listen(PORT, function(){
    console.log("http://localhost:3000");
});