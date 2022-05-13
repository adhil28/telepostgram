import { Grid, Paper, Typography, Box } from '@mui/material'
import AppBar from '../AppBar/AppBar'
import * as React from 'react'
import PersonIcon from '@mui/icons-material/Person';
declare global {
  namespace JSX {
    interface IntrinsicElements {
      center: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

function Profile() {
  return (
    <div>
      <AppBar />
      <center style={{ padding: '10px ' }}>
        <Box border={1} padding={2} borderRadius={2} borderColor="rgb(173 173 173)" style={{ background: '#ffffff' }}>
          <Grid>
            <PersonIcon style={{ width: '100px', height: '100px', fill: 'white', background: 'rgb(173 173 173)', borderRadius: '50%', padding: '10px' }} />
            <Typography fontWeight={"bold"} mt={"-5px"} fontSize={"25px"}>Adhil</Typography>
            <Typography fontSize={"19px"} mt={"-7px"} >+918075497228</Typography>
            <Typography fontSize={"15px"} mt={"-5px"} color="grey">@adhilmhdk</Typography>
          </Grid>
          <Grid container padding={2} spacing={1} alignItems="center"
            justifyContent="center">

            <Grid xs={2}>
              <Typography fontWeight={"bold"} fontSize={30} >0</Typography>
              <Typography>Subscribers</Typography>
            </Grid>
            <Grid xs={2} >
              <Typography fontWeight={"bold"} fontSize={30}>0</Typography>
              <Typography>Subscribing</Typography>
            </Grid>
            <Grid xs={2}>
              <Typography fontWeight={"bold"} fontSize={30}>0</Typography>
              <Typography>Posts</Typography>
            </Grid>
          </Grid>

        </Box>
      </center>
    </div >
  )
}

export default Profile