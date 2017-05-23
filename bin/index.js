require("babel-core/register");

var app = require('./../app.js')

var port = process.env.PORT || 3002;

app.listen(port,()=>{
    console.log(' ********** : App running on:',port);
})