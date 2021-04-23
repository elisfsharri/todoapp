import { useState } from 'react'
import { useTranslation } from 'react-i18next'
      
const Navigation = ({ setFilter, setFilterValue, setCurrentPage, arraySize }) => {

  const [dotAll, setDotAll] = useState('●')
  const [dotComplete, setDotComplete] = useState('')
  const [dotIncomplete, setDotIncomplete] = useState('')
  const [allStyle, setAllStyle] = useState('activeNav')
  const [completeStyle, setCompleteStyle] = useState('nav')
  const [incompleteStyle, setIncompleteStyle] = useState('nav')

  const { t } = useTranslation()

  const filterAll = () => {
    setFilter(false)
    setDotAll('●')
    setDotComplete('')
    setDotIncomplete('')
    setAllStyle('activeNav')
    setCompleteStyle('nav')
    setIncompleteStyle('nav')
    setCurrentPage(1)
  }

  const filterComplete = () => {
    setFilter(true)
    setFilterValue(true)
    setDotAll('')
    setDotComplete('●')
    setDotIncomplete('')
    setAllStyle('nav')
    setCompleteStyle('activeNav')
    setIncompleteStyle('nav')
    setCurrentPage(1)
  }

  const filterIncomplete = () => {
    setFilter(true)
    setFilterValue(false)
    setDotAll('')
    setDotComplete('')
    setDotIncomplete('●')
    setAllStyle('nav')
    setCompleteStyle('nav')
    setIncompleteStyle('activeNav')
    setCurrentPage(1)
  }

  return (
    <div className='filter'>
      <div className='filterElement' >
        <p 
          onClick={filterAll} 
          className={arraySize ? allStyle : 'disabledNav'}
        >
          {t('all')}
        </p>
        <h3>{arraySize ? dotAll : null}</h3>
      </div>
      <div className='filterElement' >
        <p 
          onClick={filterComplete} 
          className={arraySize ? completeStyle : 'disabledNav'}
        >
          {t('complete')}
        </p>
        <h3>{arraySize ? dotComplete : null}</h3>
      </div>
      <div className='filterElement' >
        <p 
          onClick={filterIncomplete} 
          className={arraySize ? incompleteStyle : 'disabledNav'}
        >
          {t('incomplete')}
        </p>
        <h3>{arraySize ? dotIncomplete : null}</h3>
      </div>
    </div>
  )
}

export default Navigation