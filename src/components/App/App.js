import { useState, useEffect } from 'react'
import { ThemeProvider, Container, Typography } from '@material-ui/core'
import { DragDropContext } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import Theme from '../Styles/Theme'
import useStyles from '../Styles/Styles'
import Title from '../Title/Title'
import Header from '../Header/Header.tsx'
import Navigation from '../Navigation/Navigation'
import TodoList from '../TodoList/TodoList'
import Footer from '../Footer/Footer.tsx'
import Popup from '../Popup/Popup'

function App() {

  const classes = useStyles()
  const { t } = useTranslation()

  const [modalStatus, setModalStatus] = useState(false)
  const [update, setUpdate] = useState(false)
  const [text, setText] = useState('')
  const [initialText, setInitialText] = useState(text)
  const [editMode, setEditMode] = useState(false)
  const [index, setIndex] = useState()
  const [data, setData] = useState([])
  const [filter, setFilter] = useState(false)
  const [filterValue, setFilterValue] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)

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

  var initialArraySize = data.length
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
    setInitialText('')
    setText('')
    setEditMode(false)
  }

  const editName = (input) => {
    setText(input)
    setInitialText(input)
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
    <ThemeProvider theme={Theme}>
      <Container className={classes.app}>
        <Title />
        <Container>
          <Header
            openModal={openModal}
          />
          <Navigation 
            setFilter={setFilter}
            setFilterValue={setFilterValue}
            setCurrentPage={setCurrentPage}
            initialArraySize={initialArraySize}
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
              <div className={classes.emptyList} >
                <Typography variant='h5' >
                  {t('emptyList')}
                </Typography>
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
        </Container>
        <Popup 
          index={index}
          text={text}
          setText={setText}
          initialText={initialText}
          editMode={editMode}
          modalStatus={modalStatus}
          openModal={openModal}
          closeModal={closeModal}
          onNameChange={onNameChange}
          handleUpdate={handleUpdate}
        />
      </Container>
    </ThemeProvider>
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
