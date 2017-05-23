import express from 'express';
import bodyParser from 'body-parser';
var request = require('request');


let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*', function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "X-Requested-With");
       res.header('Access-Control-Allow-Headers', 'Content-Type');
       next();
});


app.get('/',(req,res,next)=>{
    var options = {
        url: 'http://'+req.originalUrl.substring(6),
        headers: req.headers
    };
    request(options,(err,response,body)=>{
        if(!err){
            res.data = JSON.parse(body);
        }else{
            next(err);
        }
        next();
    })
})

app.use( (req, res, next) => {
        if (!res.data) {
            res.status(404).send({
                status:false,
                response:'404 Not Found!'
            });
            return;
        }
        res.status(200).send( res.data );
    });

module.exports = app;