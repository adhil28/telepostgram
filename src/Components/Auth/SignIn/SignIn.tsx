import { Button, Grid, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import Logo from '../../../Assets/Logo'
import CountryCodePicker from '../../SpecialComponents/CountryCodePicker'
import Progress from '../../SpecialComponents/Progress'
import { RoundTextFiled } from '../../SpecialComponents/RoundComponents'
import { Telegram } from "../../../Helpers/Telegram"
import env from "../../../react-app-env.d"
import { getItem } from '../../../Helpers/StorageHandler'
import config from '../../../Helpers/Global'
import { useNavigate } from 'react-router-dom'
import { asyncButtonClickListner, getInputValueWithId } from './HtmlCommunicator'
function SignIn() {

  let [currentStates, setCurrentStates] = useState({
    phone: true,
    otp: false,
    password: false
  })
  const [countryCode, setCountryCode] = useState('+91')
  const [openProgress, setopenProgress] = useState(true)
  const nav = useNavigate();


  useEffect(() => {
    if (config.telegram == null) {
      const apiId: string | undefined = env.REACT_APP_API_ID
      const apiHash: string | undefined = env.REACT_APP_API_HASH
      getItem('token').then((ss) => {
        if (ss == null) { ss = "" }
        if (apiId != null && apiHash != null) {

          const telegram = new Telegram({
            apiHash: apiHash,
            apiId: parseInt(apiId),
            stringSession: ss
          })
          config.telegram = telegram
          telegram.signIn({
            async onInputPassword() {
              setopenProgress(false)
              setCurrentStates({
                otp: false,
                password: true,
                phone: false
              })

              await asyncButtonClickListner('signInNextBtn')
              let password = getInputValueWithId('password')
              if (password == null) { password = "" }
              setopenProgress(true)
              return password
            },
            async onInputPhoneCode() {
              setopenProgress(false)
              setCurrentStates({
                otp: true,
                password: false,
                phone: false
              })

              await asyncButtonClickListner('signInNextBtn')
              let otp = getInputValueWithId('otp')
              console.log(otp);

              if (otp == null) { otp = "" }
              setopenProgress(true)
              return otp
            },
            async onInputPhoneNumber() {
              setopenProgress(false)
              setCurrentStates({
                otp: false,
                password: false,
                phone: true
              })

              await asyncButtonClickListner('signInNextBtn')
              let phone = getInputValueWithId('phone')
              if (phone == null) { phone = "" }
              setopenProgress(true)
              phone = countryCode + phone
              console.log(phone);

              return phone
            },
          }).then((r) => {
            nav('/')
          })
        }
      })
    }
  }, [])




  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >

        <Grid item xs={3} style={{ textAlign: "center", width: '300px' }}>
          <Logo size={130}/>
          <br />
          <Typography style={{ fontSize: '35px', fontWeight: 'bold' }}>Sign in to Telepost</Typography>
          <Typography style={{ fontSize: '18px', color: 'grey' }}>Enter your phone number</Typography>
          <br />
          {currentStates.phone ? <CountryCodePicker onChangeListener={(c) => { setCountryCode(c); }} /> : <CountryCodePicker onChangeListener={(c) => { setCountryCode(c); }} disabled />}
          {currentStates.phone ? <RoundTextFiled id='phone' name='phone' style={{ marginTop: '10px', borderRadius: '20px' }} label="Phone number" fullWidth /> : <RoundTextFiled name='phone' style={{ marginTop: '10px', borderRadius: '20px' }} label="Phone number" fullWidth disabled />}
          {currentStates.otp ? <RoundTextFiled id='otp' name='otp' style={{ marginTop: '10px', borderRadius: '20px' }} label="OTP" fullWidth /> : <div></div>}
          {currentStates.password ? <RoundTextFiled id='password' name='password' style={{ marginTop: '10px', borderRadius: '20px' }} label="password" fullWidth /> : <div></div>}
          <Button id='signInNextBtn' type='submit' variant="contained" fullWidth style={{ padding: '10px', marginTop: '5px', borderRadius: '10px' }}>Next</Button>
        </Grid>
      </Grid>
      <Progress open={openProgress} />

    </div>
  )
}

export default SignIn