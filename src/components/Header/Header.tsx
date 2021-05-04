import { FC, MouseEventHandler } from 'react'
import { Grid, Typography, Button } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import useStyles from '../Styles/Styles'

type HeaderProps = {
  openModal: MouseEventHandler
}

const Header: FC<HeaderProps> = ({ openModal }) => {

  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Grid container className={classes.todoHeader}>
      <Grid item xs={12} sm={12} md={5} lg={4} xl={3} >
        <Typography
          variant='h4'
          className={classes.todoTitle}
        >
          {t('title')}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={3} lg={2} xl={2} className={classes.addContainer}>
        <Button
          data-testid='addTodo'
          className={classes.addButton}
          variant='contained'
          color='primary'
          onClick={openModal}
        >
          {t('addbutton')}
        </Button>
      </Grid>
    </Grid>
  )
}

export default Header