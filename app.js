const express = require('express');
const passport = require('passport');

const app = express()

app.use(passport.initialize())  //To use passport in an express app. 
app.use(express.urlencoded({ extended: false })) //For parsing url encoded data
app.use(express.json()) //replaces body parser


const authRouter = require('./Routes/auth')
const listRouter = require('./Routes/todoList')

app.use('/auth', authRouter)
app.use('/list', listRouter)


//To handle error
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Interna Server Error";
    return res.status(statusCode).json({status: "Error !", message})

})

module.exports = app 