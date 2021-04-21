import { useTranslation } from 'react-i18next'

const Header = ({ openModal }) => {

  const { t } = useTranslation()

  return (
    <div className='todoHeader'>
      <h2 className='todoTitle'>
        {t('title')}
      </h2>
      <button 
        data-testid='addTodo'
        className='addTodo'
        onClick={openModal}
      >
        {t('addbutton')}
      </button>
    </div>
  )
}

export default Header