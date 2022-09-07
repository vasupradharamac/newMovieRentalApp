import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { getAssetString } from '../backend-requests/requests'
import './globalstyles.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 300,
  borderRadius: "10px"
  // p: 4,
};

export default function MoviePopup(props) {

  // for debug
  let open = props.open
  let handleClose = props.handleClose

  console.log(props)


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack sx={style} direction="row">
          <Box sx={{ width: 1 / 3, bgcolor: 'red' }}>
            <img
              src={getAssetString()+props.movie.imgUrl}
              width="100%"
              height="100%"
              marginTop="10%"
              alt="nice image" />
          </Box>
          <Box sx={{ width: 2 / 3 }} backgroundColor="white" overflowY="auto">
            <Stack m={2} height={"90%"}  direction="row">
              <Box sx={{ width: 0.3 ,fontSize:"18px"}} spacing={1}>
                <Box>Movie</Box>
                <Box>Genre</Box>
                <Box>Cast</Box>
                <Box>Director</Box>
                <Box>Plot</Box>
              </Box>
              <Box sx={{ width: 0.7 ,fontSize:"16px" }}>
                <Box>{props.movie.title}</Box>
                <Box>{props.movie.genre}</Box>
                <Box>{props.movie.cast}</Box>
                <Box>{props.movie.director}</Box>
                <Box>{props.movie.desc}</Box>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Modal>
    </div>
  );
}
