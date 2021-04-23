import { useState, useEffect } from 'react'
import { Box } from '@material-ui/core'
import { DragDropContext } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import Logo from '../../images/Logo.png'
import Language from '../Language/Language'
import Header from '../Header/Header'
import Navigation from '../Navigation/Navigation'
import TodoList from '../TodoList/TodoList'
import Footer from '../Footer/Footer.tsx'
import Popup from '../Popup/Popup'

function App() {

  const [modalStatus, setModalStatus] = useState(false)
  const [update, setUpdate] = useState(false)
  const [text, setText] = useState('')
  const [initialName, setInitialName] = useState(text)
  const [editMode, setEditMode] = useState(false)
  const [index, setIndex] = useState()
  const [data, setData] = useState([])
  const [filter, setFilter] = useState(false)
  const [filterValue, setFilterValue] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  const { t } = useTranslation()

  const handleUpdate = () => {
    setUpdate(!update)
  }
   
  const todoData = () => {
    fetch('http://localhost:8000/tasks/')
    .then(response => response.json())
    .then(res => setData(res))
    .catch(err => console.log(err))
  }

  useEffect(todoData, [update])

  /*
  
  Works fine with public URL but not with the one from the backend

  const todoData = async () => {
    try {
      const fetchResponse = await fetch('https://jsonplaceholder.typicode.com/todos')
      const dataResponse = await fetchResponse.json()
      setData(dataResponse)  
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    todoData()
  }, [update])

  */

  var arraySize = 0

  data.map((entry) => {
    if (!filter || filterValue === entry.complete) arraySize++
    return null
  })

  const onNameChange = (event) => {
    setText(event.target.value)
  }

  const openModal = () => {
    setModalStatus(true)
  }

  const closeModal = () => {
    setModalStatus(false)
    setInitialName('')
    setText('')
    setEditMode(false)
  }

  const editName = (input) => {
    setText(input)
    setInitialName(input)
    setEditMode(true)
  }

  const getIndex = (input) => {
    setIndex(input)
  }

  const onPageChange = (event, value) => {
    setCurrentPage(value)
  }

  const changePageSize = (event, value) => {
    setCurrentPage(1)
    setPageSize(event.target.value)
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
  
    return result
  }

  const onDragEnd = ({ destination, source }) => {

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const newArray = reorder(data, source.index, destination.index)

    setData(newArray)
  }


  return (
    <div className='app'>
      <img src={Logo} alt='Lasting Dynamics' className='logo' />
      <Box
        mx='auto'
        width='80%'
        minWidth={400}
        minHeight={600}
        borderRadius={15}
      >
        <Language />
        <Header 
          openModal={openModal}
        />
       
        <Navigation 
          setFilter={setFilter}
          setFilterValue={setFilterValue}
          setCurrentPage={setCurrentPage}
          arraySize={arraySize}
        />
        <DragDropContext onDragEnd={onDragEnd}>
          {
          data.length
          ?
          <TodoList 
            data={data}
            filter={filter}
            filterValue={filterValue}         
            currentPage={currentPage}
            pageSize={pageSize}
            openModal={openModal}
            handleUpdate={handleUpdate}
            editName={editName}
            getIndex={getIndex}
          />
          :
          <div className='emptyList' >
            {t('emptyList')}
          </div>
          }
        </DragDropContext>
        <Footer 
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={onPageChange}
          changePageSize={changePageSize}
          arraySize={arraySize}
        />
        <Popup 
          index={index}
          text={text}
          initialName={initialName}
          editMode={editMode}
          modalStatus={modalStatus}
          openModal={openModal}
          closeModal={closeModal}
          onNameChange={onNameChange}
          handleUpdate={handleUpdate}
        />
      </Box>
    </div>
  )
}

export default App

/*
  Drag is disabled when filter is on because the index of the items changes during that time, 
  either having non-consecutive indices resulting in bugs within react-beautiful-dnd 
  and also having one item bypass some invisible items (that corespond to the other filter status) 
  or we totally have new arrays in filter state, meaning the indices of the filtered arrays 
  are different from the indices of the first array.
  One way to solve that issue is to disable filtering when drag starts, so that all items appear,
  reorder and reenable filter when drag ends, by keeping the focus on the current item.
  That could be done but it is an unnecessary complexity for the time being,
  especially considering that react-beautiful-dnd only supports virtual lists
  when it comes to rendering while dragging.
*/
