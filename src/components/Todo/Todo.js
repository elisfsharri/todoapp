import { useRef, memo } from 'react'
import { IconButton, Checkbox, Divider, Avatar } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import { Draggable } from 'react-beautiful-dnd'

const Todo = ({ 
  index,
  itemId,
  text,
  image,
  status,
  dragStatus,
  openModal,
  editName,
  getIndex,
  handleUpdate
}) => {

  const itemRef = useRef(null)

  const editItem = () => {
    getIndex(itemRef.current.id)
    editName(itemRef.current.innerText)
    openModal()
  }

  const deleteItem = () => {
    fetch(`http://localhost:8000/tasks/${itemId}/`,
      {
        method : 'delete'
      }
    )
    .then(handleUpdate)
    .catch(err => console.log(err))
  }

  const editStatus = () => {
    fetch(`http://localhost:8000/tasks/${itemId}/`,
     {
       method : 'put',
       headers : {'Content-Type' : 'application/json'},
       body : JSON.stringify(
          { 
            title : itemRef.current.innerText,
            complete : !status
          }
        )
      }
    )
    .then(handleUpdate)
    .catch(err => console.log(err))
  }

  return (
    <Draggable
      isDragDisabled={dragStatus}
      draggableId={`draggable-${index}`}
      index={index} 
    >
      {provided => (
        <div 
          className={status?'todoItem selected':'todoItem'}
          id={index}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Checkbox
            color='primary'
            icon={<CheckCircleIcon />}
            checkedIcon={<CheckCircleIcon />}
            checked={status}
            onChange={editStatus}
          />
          <Avatar 
            alt={text}
            src={image}
          />
          <p 
            className='todoText'
            ref={itemRef}
            id={itemId}
          >
            {text}
          </p>
          <IconButton onClick={editItem}>
            <EditIcon color='primary'/>
          </IconButton>
          <IconButton onClick={deleteItem}>
            <DeleteIcon color='secondary'/>
          </IconButton>
          <Divider />
        </div>
      )}
  </Draggable>
  )
}

export default memo(Todo)