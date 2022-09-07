import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRef } from 'react';
import {getAssetString} from '../backend-requests/requests'
import { Box } from '@mui/system';
import {NotificationContainer, NotificationManager} from 'react-notification';
import MovieCard from './movieCard.component';
import {getSearchResults} from "../backend-requests/requests"

function SearchPage(props) {
    let movies=props.movies
    let searchRef=useRef("")
    const onSearchChange=()=>{
        console.log(searchRef.current.value)
        props.search(searchRef.current.value)
    }
    console.log(props)
    return (
        <div className="col">
            <div className='row centerDiv' style={{width:"80%",marginLeft:"10%",marginTop:"2%"}}>
                <div class="input-group centerDiv" >
                    <div class="form-outline"  style={{width:"80%"}}>
                        <input onChange={onSearchChange} ref={searchRef} type="search" id="form1" class="form-control" placeholder='Search for movies etc'  style={{width:"100%"}}/>
                    </div>
                    <button type="button" class="btn btn-primary">
                        Search
                    </button>
                </div>
            </div>
            <Box className='row centerDiv'>
                {movies.length>0&&movies.map(movie=>(
                <MovieCard movie={movie} btnEn={true} refresh={onSearchChange}  getdetails={props.getdetails}/>
                ))}
            </Box>
        </div>
    )
}

export default SearchPage