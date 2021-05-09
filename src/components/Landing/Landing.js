import { Typography, Button } from '@material-ui/core'
import useStyles from '../Styles/Styles'
import AcademyLogo from '../../images/AcademyLogo.png'

const Landing = ({ changeRoute }) => {

  const classes = useStyles()

  return (
    <div className={classes.landing} >
      <img src={AcademyLogo} alt='Lasting Dynamics' className={classes.academyLogo} />
      <div className={classes.academyText} >
        <Typography variant='h2' gutterBottom >
          Lasting Dynamics March 2021 Academy project
        </Typography>
        <Typography variant='body2' >
          The academy project has been modified a little. <br/>
          Normally there would be a local API. <br/>
          However, right now a public API has been provided. <br/>
          Because of that many actions don't work for now. <br/>
          Will add local storage soon to solve that issue. <br/>
        </Typography>
      </div>
      <Button
        variant='outlined'
        color='primary'
        onClick={changeRoute}
      >
        Continue
      </Button>
    </div>
  )
}

export default Landing