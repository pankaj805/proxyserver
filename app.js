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

    let reqHeaders = req.headers;
    if(reqHeaders.host){
        delete reqHeaders['host'];
    }
    if(reqHeaders.connection){
        delete reqHeaders['connection'];
    }
    if(reqHeaders.accept){
        delete reqHeaders['accept'];
    }
    if(reqHeaders.cookie){
        delete reqHeaders['cookie'];
    }

    let urlPresent = req.query.url;

    if(!urlPresent){
        console.log(' ********** : Url Blank');
        res.data={err:'No Url Given'}
        next();
    }

    let options = {
        url: 'http://'+req.originalUrl.substring(6),
        headers : reqHeaders
    };

    console.log(' ********** : options:',options);
    request(options,(err,response,body)=>{
        if(!err){
            res.data = JSON.parse(body);
        }else{
            next(err);
        }
        next();
    })
})

app.post('/',(req,res,next)=>{

    let reqHeaders = req.headers;
    if(reqHeaders.host){
        delete reqHeaders['host'];
    }
    if(reqHeaders.connection){
        delete reqHeaders['connection'];
    }
    if(reqHeaders.accept){
        delete reqHeaders['accept'];
    }
    if(reqHeaders.cookie){
        delete reqHeaders['cookie'];
    }
    if(reqHeaders.origin){
        delete reqHeaders['origin'];
    }
    if(reqHeaders['content-length']){
        delete reqHeaders['content-length']
    }

    console.log(' ********** : reqHeaders',reqHeaders);

    let urlPresent = req.query.url;

    if(!urlPresent){
        console.log(' ********** : Url Blank');
        res.data={err:'No Url Given'}
        next();
    }

    let options = {
        method: 'post',
        url: 'http://'+req.originalUrl.substring(6),
        headers : reqHeaders,
        body:req.body,
        json: true
    };

    console.log(' ********** : options:',options);
    request(options,(err,response,body)=>{
        if(!err){
            res.data = body;
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