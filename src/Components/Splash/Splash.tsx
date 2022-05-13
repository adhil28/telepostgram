import { Grid } from '@mui/material'
import Logo from '../../Assets/Logo'

function Splash() {

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <Logo size={130}/>
      </Grid>
    </Grid>
  )
}

export default Splash