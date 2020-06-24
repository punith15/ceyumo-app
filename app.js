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

// require('dotenv').config()

if(process.env.NODE_ENV){
    console.log("env : "+process.env.NODE_ENV)
    app.use(express.static('client/build'))

    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.use(require('./routers/router'))

app.listen(port,()=>{
    console.log('Server started at port : '+port)
});

module.exports = app;