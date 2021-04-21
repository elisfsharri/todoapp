import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Select, Avatar } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Britain from '../../images/Britain.png'
import Italy from '../../images/Italy.png'
import i18n from './i18n'

const Language = () => {

  const [language, setLanguage] = useState(i18n.language)
  const [icon, setIcon] = useState(Britain)

  const { t } = useTranslation()

  const setAvatar = () => {
    i18n.language==='en'
    ?
    setIcon(Britain)
    :
    setIcon(Italy)
  }

  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value)
    setLanguage(event.target.value)
    setAvatar()
  }

  return (
    <div className='language'>
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