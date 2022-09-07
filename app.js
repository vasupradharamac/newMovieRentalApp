//express MVC pattern model view controller

// controller  => express equiv is a route handler function
// view => express equiz is the return data / api itself
// model => express equiv is the data / DB express works on



const express=require('express')
const path=require('path')
const app=express()
const cors=require('cors')
const movieRouter=require('./routes/movie.router')
app.use(cors())
app.use(express.json())

// serving static images
app.use('/staticimages',express.static('./public/images/'))
app.use('/moviesApi',movieRouter)

const root = require('path').join(__dirname, 'client-app','rental-store','build')

app.use(express.static(root));

app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
})

module.exports=app