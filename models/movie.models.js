// let rawData=require('../data/rawDataJson.json')
const dbFuncs = require('./conn')
// let rawData=require('./data/newRawMovieData.json')
// let rawUserData=require('./data/rawUserData.json')
let movies = []
let rents = []
let users = []

// 3 collections needed => movies , rent , user
// rent stories (movie,email) pairs ie a relation

let isProd = false


function getMoviesFromDb() {
    let newData = dbFuncs.getDbo().movies.find()

    console.log(newData)
    // let newData=rawData // fetch from DB here
    let rawData = newData.map(movie => {
        // added for debugging!
        console.log(movie.imgUrl)
        movie.imgUrl = "staticimages/" + movie.imgUrl
        // movie.cast=movie.cast.map(actorObj=>actorObj['name'])
        // write as array to 
        movie.cast = movie.cast.split(', ')
        movie.genre = movie.genre.split('|')
        return movie
    })
    movies = rawData
    console.log(movies)
}

function getUsersFromDb() {
    let res = dbFuncs.getDbo().users.find()
    users = res
    console.log(users)
}

function writeRentsToDB(entry) {
    // write to DB here and set here
    let newRents = dbFuncs.getDbo().rents.find()
    rent = newRents
    console.log(rents)
}

function removeRentEntry(rentObj) {
    dbFuncs.getDbo().rents.remove(rentObj)
}



function preProcess() {
    if (!isProd) {
        console.log("Load start")
        // await dbFuncs.connectDb()
        getMoviesFromDb()
        writeRentsToDB()
        getUsersFromDb()
        console.log("Load finished")
        // rawData=rawData.map(movie=>{
        //     // added for debugging!
        //     console.log(movie.imgUrl)
        //     movie.imgUrl="staticimages/"+movie.imgUrl
        //     // movie.cast=movie.cast.map(actorObj=>actorObj['name'])
        //     movie.cast=movie.cast.split(', ')
        //     movie.genre=movie.genre.split('|')
        //     return movie
        // })
    }
}

// ironman

// for each user movielist for each movie in movielist
// rents rentetyr {email,title=="ironman"} 

function getAllMovies() {
    if (!isProd) {
        return movies.map(movie => {
            // computed property 
            movie.rentedBy = getRentedCount(movie.title)
            return movie
        })
    }
}

function getSearchResults(queryString) {
    // let queryString=queryString.split(' ')
    // fix to support combined search
    console.log(queryString)
    if (!isProd) {
        queryString = queryString.toLowerCase()
        queryTokens = queryString.split(' ')
        // "scarlett","robert" => ironman , avennger and lucy =>""
        // 

        return movies.filter(movie => {
            return queryTokens.some(queryToken =>
                movie.director.toLowerCase().includes(queryToken) ||
                movie.genre.map(s => s.toLowerCase()).includes(queryToken) ||
                movie.title.toLowerCase().includes(queryToken) ||
                movie.cast.some(actor => actor.toLowerCase().includes(queryToken))
            )
        })
    }
}

function getPopularMovies() {
    return getAllMovies().sort((mv1, mv2) => mv1.rentedBy - mv2.rentedBy)
}

function getRentedCount(movieTitle) {
    if (!isProd) {
        let cnt = 0
        rents.forEach(rentEntry => {
            if (rentEntry.title == movieTitle)
                cnt++
        })
        return cnt
    }
}

function createNewRentEntry(email, movieTitle) {
    let rentEntry = { email: email, title: movieTitle }
    if (!isProd) {
        if (!rents.find(entry => entry.email == email && entry.title == movieTitle)) {
            rents.push(rentEntry)
            writeRentsToDB(rentEntry)
            return true
        }
        return false
    }
}

function loginCheck(email, pass) {
    return users.some(user => user.email == email && user.pass == pass)
}

function getRentsUser(email) {
    return rents.filter(rentEntry => rentEntry.email == email)
        .map(rentEntry => rentEntry.title)
    // [{email,title},{},{}] 
    // [title,title,title]
}

function returnMovie(email, title) {
    console.log(rents)
    let rentEntry = { email: email, title: title }
    rents.splice(rents.indexOf(rentEntry), 1)
    removeRentEntry(rentEntry)
    console.log(rents)
    return true
}

preProcess()

module.exports = {
    getSearchResults,
    getAllMovies,
    getPopularMovies,
    loginCheck,
    createNewRentEntry,
    getRentsUser,
    returnMovie
}