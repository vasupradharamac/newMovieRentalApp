const express = require('express')
const movieController = require('../controllers/movie.controller')

const movieRouter = express.Router()

movieRouter.get('/movies', movieController.httpGetAllMovies)
movieRouter.post('/movies', movieController.httpGetSearchRes)

movieRouter.post('/rented', movieController.httpGetRented)
movieRouter.post('/rent', movieController.httpRentMovie)


movieRouter.post('/login', movieController.httpLoginCheck)

movieRouter.get('/popular', movieController.httpGetPopular)

movieRouter.post('/return', movieController.httpReturnMovie)

module.exports = movieRouter

