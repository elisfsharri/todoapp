import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Select, Avatar } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import useStyles from '../Styles/Styles'
import Britain from '../../images/Britain.png'
import Italy from '../../images/Italy.png'
import i18n from './i18n'

const Language = () => {

  const classes = useStyles()
  const { t } = useTranslation()

  const [language, setLanguage] = useState(i18n.language)
  const [icon, setIcon] = useState(Britain)

  const setAvatar = () => {
    i18n.language==='en'
    ?
    setIcon(Britain)
    :
    setIcon(Italy)
  }

  const handleChange = (event: ChangeEvent<{value: unknown}>): void => {
    i18n.changeLanguage(event.target.value as string)
    setLanguage(event.target.value as string)
    setAvatar()
  }

  return (
    <div className={classes.language}>
      <Avatar
        alt={language}
        src={icon}
      />
      <Select
        native
        color='secondary'
        IconComponent={ExpandMoreIcon}
        value={language}
        onChange={handleChange}
        inputProps={{ 'data-testid': 'language' }}
      >
        <option value='en'>
          {t('english')}
        </option>
        <option value='it'>
          {t('italian')}
        </option>
      </Select>
    </div>
  )
}

export default Language