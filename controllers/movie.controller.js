const movieModel = require('../models/movie.models')


function httpGetAllMovies(req, res) {
    res.status(200).json(movieModel.getAllMovies())
}

function httpRentMovie(req, res) {
    let { email, title } = req.body
    if (email && title) {
        let stat = movieModel.createNewRentEntry(email, title)
        if (stat)
            res.status(201).json({ msg: "rent entry created" })
        else
            res.status(200).json({ msg: "Rented Already!" })
    } else {
        res.status(400).json({ msg: "Params missing" })
    }
}

function httpGetPopular(req, res) {
    res.status(200).json(movieModel.getPopularMovies())
}

function httpGetSearchRes(req, res) {
    let query = req.body.query
    if (query) {
        res.status(200).json(movieModel.getSearchResults(query))
    } else {
        res.status(400).json({ msg: 'Params missing!!' })
    }
}

function httpGetRented(req, res) {
    let email = req.body.email
    if (email) {
        res.status(200).json(movieModel.getRentsUser(email))
    } else {
        res.status(400).json({ msh: "Params Missing!!" })
    }
}

function httpLoginCheck(req, res) {
    let { email, pass } = req.body
    if (email && pass) {
        if (movieModel.loginCheck(email, pass)) {
            res.status(200).json({ isValid: true })
        } else {
            res.status(200).json({ isValid: false })
        }
    } else {
        res.status(400).json({ msg: "Params missing!!" })
    }
}

function httpReturnMovie(req, res) {
    let { email, title } = req.body
    if (email && title) {
        movieModel.returnMovie(email, title)
        res.status(200).json({ msg: "return success!" })
    } else {
        res.status(400).json({ msg: "Failed to return!" })
    }
}

module.exports = {
    httpGetAllMovies,
    httpRentMovie,
    httpGetPopular,
    httpGetSearchRes,
    httpGetRented,
    httpLoginCheck,
    httpReturnMovie
}