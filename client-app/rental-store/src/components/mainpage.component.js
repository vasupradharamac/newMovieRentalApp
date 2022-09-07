import React, { useState, useEffect } from 'react'
// import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { getMovies, getSearchResults } from '../backend-requests/requests'
import './globalstyles.css'
import SearchPage from './search.component';
import Login from './login.component';
import Rentals from './rentals.component';
import Profile from './profile.component';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';


function MainPage() {
    let email = '', pass = ''
    const isLoggedIn = () => {
        if (localStorage.getItem('login')) {
            email = localStorage.getItem('email')
            pass = localStorage.getItem('pass')
            return 1
        }
        return 0
    }

    let [movies, setMovies] = useState([])
    let [actInd, setActInd] = useState(isLoggedIn())
    // let [actInd, setActInd] = useState(-1)
    let [resetMovies, setReset] = useState(true)

    let prevTimerId = null

    const changePage = (ind) => {
        setActInd(ind)
    }

    const getdetails = () => {
        return [email, pass]
    }


    const handleLogout = () => {
        localStorage.clear()
        setActInd(0)
    }


    const setLogin = (em, ps) => {
        localStorage.setItem('login', true)
        localStorage.setItem('email', em)
        localStorage.setItem('pass', ps)
        email = em
        pass = ps
        setActInd(1)
    }


    const handleSearchQuery = (queryString = '') => {
        if (queryString == "") {
            setReset(!resetMovies)
            return
        }
        if (prevTimerId)
            clearInterval(prevTimerId)
        // timer used to wait for typing finished by user
        prevTimerId = setTimeout(() => {
            getSearchResults((d) => setMovies(d), queryString)
        }, 500)
    }


    useEffect(() => {
        getMovies((d) => { console.log(d); setMovies(d) })
    }, [resetMovies])

    return (
        <div>
            {actInd != 0 && <div>
                <div className="navbar">
                    <div className="navitem" onClick={e => changePage(1)}><a className={actInd == 1 ? "active" : ""} href="#home">Home</a></div>
                    <div className="navitem" onClick={e => changePage(2)}><a className={actInd == 2 ? "active" : ""}>My Rentals</a></div>
                    <div className="navitem" onClick={e => changePage(3)}><a className={actInd == 3 ? "active" : ""}>Profile</a></div>
                    <div className="navitem" onClick={e => handleLogout()}><a className="">Logout</a></div>
                </div>
                <div className='centerDiv'>
                    {actInd == 1 && <SearchPage movies={movies} search={handleSearchQuery} getdetails={getdetails} />}
                    {actInd == 2 && <Rentals getdetails={getdetails} movies={movies} />}
                    {actInd == 3 && <Profile getdetails={getdetails} />}
                </div>
                <NotificationContainer />
            </div>}
            <div className='centerDiv'>
                {actInd == 0 && <Login setLogin={setLogin} />}
            </div>
        </div>
    )
}

export default MainPage