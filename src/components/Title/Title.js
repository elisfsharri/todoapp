import useStyles from '../Styles/Styles'
import Logo from '../../images/Logo.png'
import Language from '../Language/Language'

const Title = () => {

  const classes = useStyles()

  return (
    <div className={classes.titleBar}>
      <div className={classes.emptyBar} />
      <div className={classes.logo} >
       <img src={Logo} alt='Lasting Dynamics' />
      </div>
      <div className={classes.languageBar} >
        <Language />
      </div>
    </div>
  )
}

export default Title