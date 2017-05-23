require("babel-core/register");

var app = require('./../app.js')

app.listen(3002,()=>{
    console.log(' ********** : App running on 3002');
})