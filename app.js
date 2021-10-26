const express = require('express')
const app = express();
const bodyparser = require('body-parser')
const mongoose =  require('mongoose')
const userroutes = require('./routes/userroutes')
const questionroute =require('./routes/questionroutes')
const institutionroutes = require('./routes/institutionroutes')
const facultyroutes = require('./routes/facultyroutes')
const scoreroutes = require('./routes/scoresroutes')
require('dotenv').config({path: __dirname + '/.env'})


app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
});

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use('/user', userroutes)
app.use('/question',questionroute )
app.use('/institution', institutionroutes)
app.use('/faculty', facultyroutes)
app.use('/score', scoreroutes)


app.use((req, res, next) => {
    const err = new Error('page not found')
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    res.status(err.status).json({
        error : err.message
    })
})

mongoose.connect('mongodb+srv://'+process.env['DATABASE_USERNAME']+':'+process.env['DATABASE_PWD']+'@shop.kqlba.mongodb.net/Waltersamapp?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true})
.then((_) => console.log('connected')).catch( (err) => console.log(err))

module.exports = app