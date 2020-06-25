const express = require('express')
const app = express();
const path = require('path')
const port = process.env.PORT || 5000;

var cors = require('cors');
// use it before all route definitions
app.use(cors());

app.use( '/images' ,express.static(path.join(__dirname, './images')));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ 
    extended: true
}))

require('dotenv').config()

app.use(require('./routers/router'))

if(process.env.NODE_ENV){
    console.log("env : "+process.env.NODE_ENV)
    app.use(express.static('client/build'))

    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    // Pass to next layer of middleware
    next();
    });

app.listen(port,()=>{
    console.log('Server started at port : '+port)
});

module.exports = app;