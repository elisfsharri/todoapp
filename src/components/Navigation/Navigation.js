import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '@material-ui/core/Typography'
import useStyles from '../Styles/Styles'

const Navigation = ({ setFilter, setFilterValue, setCurrentPage, initialArraySize }) => {

  const classes = useStyles()
  const { t } = useTranslation()

  const [dotAll, setDotAll] = useState('●')
  const [dotComplete, setDotComplete] = useState('')
  const [dotIncomplete, setDotIncomplete] = useState('')
  const [allStyle, setAllStyle] = useState(classes.activeNav)
  const [completeStyle, setCompleteStyle] = useState(classes.nav)
  const [incompleteStyle, setIncompleteStyle] = useState(classes.nav)

  const filterAll = () => {
    setFilter(false)
    setDotAll('●')
    setDotComplete('')
    setDotIncomplete('')
    setAllStyle(classes.activeNav)
    setCompleteStyle(classes.nav)
    setIncompleteStyle(classes.nav)
    setCurrentPage(1)
  }

  const filterComplete = () => {
    setFilter(true)
    setFilterValue(true)
    setDotAll('')
    setDotComplete('●')
    setDotIncomplete('')
    setAllStyle(classes.nav)
    setCompleteStyle(classes.activeNav)
    setIncompleteStyle(classes.nav)
    setCurrentPage(1)
  }

  const filterIncomplete = () => {
    setFilter(true)
    setFilterValue(false)
    setDotAll('')
    setDotComplete('')
    setDotIncomplete('●')
    setAllStyle(classes.nav)
    setCompleteStyle(classes.nav)
    setIncompleteStyle(classes.activeNav)
    setCurrentPage(1)
  }

  return (
    <div className={classes.filter}>
      <div className={classes.filterElement} >
        <Typography
          variant='h6'
          onClick={filterAll}
          className={initialArraySize ? allStyle : classes.disabledNav}
        >
          {t('all')}
        </Typography>
        <h3>{initialArraySize ? dotAll : null}</h3>
      </div>
      <div className={classes.filterElement} >
        <Typography
          variant='h6'
          onClick={filterComplete}
          className={initialArraySize ? completeStyle : classes.disabledNav}
        >
          {t('complete')}
        </Typography>
        <h3>{initialArraySize ? dotComplete : null}</h3>
      </div>
      <div className={classes.filterElement} >
        <Typography
          variant='h6'
          onClick={filterIncomplete}
          className={initialArraySize ? incompleteStyle : classes.disabledNav}
        >
          {t('incomplete')}
        </Typography>
        <h3>{initialArraySize ? dotIncomplete : null}</h3>
      </div>
    </div>
  )
}

export default Navigation