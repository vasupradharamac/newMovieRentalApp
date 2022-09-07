import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAssetString, postRentalReq, returnMovie } from '../backend-requests/requests'
import { Box } from '@mui/system';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import MoviePopup from './modal.component'



function MovieCard(props) {
    let movie = props.movie
    let btnEn = props.btnEn
    let refresh = props.refresh
    let email = props.getdetails()[0]
    let [open, setOpen] = useState(false)
    const onBtnClicked = () => {
        if (btnEn) {
            postRentalReq((d) => {
                if (d?.msg.includes("created"))
                    NotificationManager.success('Renting Success!')
                else
                    NotificationManager.error('Already Rented!')
            }, email, movie.title)
        } else {
            returnMovie((d) => {
                if (d?.msg.includes("success"))
                    NotificationManager.success('Return Success!')
                else
                    NotificationManager.error('Rented Failed!')
            }, email, movie.title)
        }
        refresh()
    }
    return (
        <div className='card' style={{
            "width": "300px",
            margin: "20px",
            alignContent: "center",
            display: 'flex'
        }}>
            <div className='card-body row'>
                <div className='column' onClick={() => setOpen(!open)}>
                    <img src={getAssetString() + movie.imgUrl} style={{ width: "200px", height: '200px', marginLeft: "15%" }} />
                </div>

                <div className='column'>
                    {movie.title}<br />
                    total rents : {movie.rentedBy}<br />
                    <button className="btn btn-primary" onClick={onBtnClicked}>
                        {btnEn ? "Rent" : "Return"}
                    </button>
                </div>
                <MoviePopup open={open} handleClose={() => setOpen(false)} movie={movie} />
            </div>

        </div>
    )
}

export default MovieCard