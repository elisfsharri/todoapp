import { useRef, memo } from 'react'
import { IconButton, Checkbox, Divider, Avatar, Typography } from '@material-ui/core'
import { Draggable } from 'react-beautiful-dnd'
import clsx from 'clsx'
import useStyles from '../Styles/Styles'
import Delete from '../../images/Delete.png'
import Edit from '../../images/Edit.png'
import Check from '../../images/Check.png'
import Uncheck from '../../images/Uncheck.png'

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

  const classes = useStyles()
  const itemRef = useRef(null)

  const editItem = () => {
    getIndex(itemRef.current.id)
    editName(itemRef.current.innerText)
    openModal()
  }

  const deleteItem = () => {
    fetch(`http://localhost:8000/tasks/${itemId}/`,
      {
        method: 'delete'
      }
    )
    .then(handleUpdate)
    .catch(err => console.log(err))
  }

  const editStatus = () => {
    fetch(`http://localhost:8000/tasks/${itemId}/`,
     {
       method: 'put',
       headers: {'Content-Type' : 'application/json'},
       body: JSON.stringify(
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
      data-testid='todoItem'
    >
      {provided => (
        <div 
          className={status ? clsx(classes.todoItem, classes.selected) : classes.todoItem}
          id={index}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Checkbox
            color='primary'
            icon={<img src={Uncheck} alt='Uncheck' />}
            checkedIcon={<img src={Check} alt='Check' />}
            checked={status}
            onChange={editStatus}
          />
          <Avatar
            alt={text}
            src={image}
          />
          <Typography
            variant='body1'
            className={classes.todoText}
            ref={itemRef}
            id={itemId}
          >
            {text}
          </Typography>
          <IconButton onClick={editItem}>
            <img src={Edit} alt='Edit Button' />
          </IconButton>
          <IconButton onClick={deleteItem}>
            <img src={Delete} alt='Delete Button' />
          </IconButton>
          <Divider />
        </div>
      )}
    </Draggable>
  )
}

export default memo(Todo)