import { Box } from '@material-ui/core'
import { Droppable } from 'react-beautiful-dnd'
import Todo from '../Todo/Todo'

const TodoList = ({ 
  currentPage,
  pageSize,
  filter,
  openModal,
  handleUpdate,
  editName,
  getIndex,
  data,
  filterValue
}) => {

  const dataArray = data.map((entry, i) => {
    if (!filter || (filterValue === entry.complete)) {
      return entry
    }
    return null
  })

  const filteredDataArray = dataArray.filter(el => {
    return el !== null && el !== '';
  })

  const filteredArray = filteredDataArray.map((entry, i) => {
    if (i>=(currentPage-1)*pageSize && i<currentPage*pageSize)
      return <Todo 
        key={i}
        index={i}
        itemId={entry.id}
        text={entry.title}
        status={entry.complete}
        dragStatus={filter}
        openModal={openModal}
        handleUpdate={handleUpdate}
        editName={editName}
        getIndex={getIndex}
      />
    return null
  }).filter(el => {
    return el !== null && el !== '';
  })

  return (
    <Droppable droppableId='droppable-1'>
      {provided => (
        <Box 
          data-testid='todoList'
          mx='auto' 
          width='95%' 
          minHeight='17.5rem'
          ref={provided.innerRef}
          {...provided.droppableProps} 
        >
          {filteredArray}
          {provided.placeholder}
        </Box>
      )}
   </Droppable>
  )
}

export default TodoList