import { Typography, Modal, TextField, Button } from '@material-ui/core'
import { useRef, useState } from 'react'
import Dropzone from 'react-dropzone'
import { useTranslation } from 'react-i18next'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import clsx from 'clsx'
import useStyles from '../Styles/Styles'

const Popup = ({
  modalStatus,
  closeModal,
  text,
  setText,
  image,
  setImage,
  initialText,
  index,
  onNameChange,
  handleUpdate,
  editMode
}) => {

  const classes = useStyles()
  const { t } = useTranslation()

  const [message, setMessage] = useState('')

  const textRef = useRef(null)
  
  const resetFile = () => {
    setImage([])
  }

  const submitData = () => {
    if (text && text !== initialText) {
      fetch('http://localhost:8000/tasks/',
        {
          method: 'post',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({ title : text })
        }
      )
      .then(handleUpdate)
      .catch(err => console.log(err))
    }
  }

  const editData = () => {
    if (text && text !== initialText) {
      fetch(`http://localhost:8000/tasks/${index}/`,
        {
          method: 'put',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({ title: text })
        }
      )
      .then(handleUpdate)
      .catch(err => console.log(err))
    }
  }

  const handleClose = () => {
    resetFile()
    setMessage('')
    closeModal()
  }

  const clearField = () => {
    setText('')
  }

  const handleSubmit = () => {
    setMessage(t('emptySubmit'))
    if (text) {
      submitData()
      setMessage('')
      resetFile()
      closeModal()
    }
  }

  const handleEdit = () => {
    setMessage(t('emptyEdit'))
    if (text && text !== initialText) {
      editData()
      setMessage('')
      resetFile()
      closeModal()
    }
  }
  
  return (
    <Modal
      data-testid='modal'
      open={modalStatus}
    >
      <div className={classes.popup}>
        <Typography 
          variant='h4'
          gutterBottom
        >
          {t('createTitle')}
        </Typography>
        <h4
          className={clsx(classes.closeButton, classes.xButton)}
          onClick={handleClose}
        >
          ✕
        </h4>
        <div className={text.length ? clsx(classes.textInput, classes.fullInput) : classes.textInput} >
          <TextField
            required
            fullWidth
            multiline
            rowsMax={3}
            label={t('nameTodo')}
            value={text}
            ref={textRef}
            onChange={onNameChange}
            inputProps={{ 'data-testid': 'textField' }}
          />
          {
            text.length
            ?
            <p
              className={classes.xButton}
              onClick={clearField}
            >
              ✕
            </p>
            :
            null
          }
        </div>
        
        <Typography 
          variant='caption'
          className={classes.disabledNav}
        >
          {message}
        </Typography>
        {
          image.length===0
          ?
          <Dropzone
            multiple={false}
            accept="image/*"
            onDrop={
              acceptedFiles => {
                setImage(
                  Object.assign(acceptedFiles[0], 
                    {
                      preview: URL.createObjectURL(acceptedFiles[0])
                    }
                  )
                )
              }
            }
          >
            {({getRootProps, getInputProps}) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className={classes.input}>
                    <Typography variant='h3' >
                      +
                    </Typography>
                    <Typography variant='body2' >
                      {t('insertImage')}
                    </Typography>
                  </div>
                </div>
              </section>
            )}
          </Dropzone>
          :
          <div className={classes.imageUploaded}>
            <img 
              src={image.preview} 
              alt='uploaded' 
              className={clsx(classes.uploadDiv, classes.uploadImage)} 
              style = {{
                height : '100%',
                objectFit : 'cover',
              }}
            />
            <div className={classes.uploadDiv}>
              <div className={classes.uploadUpper}>
                <CheckCircleIcon color='primary' />
                <Typography variant='body2' >
                  {t('imageUploaded')}
                </Typography>
              </div>
              <div className={classes.uploadLower}>
                <Button onClick={resetFile}
                >
                  {t('resetFile')}
                </Button>
              </div>
            </div>
          </div>
        }
        {
          !editMode
          ?
          <Button 
            data-testid='createButton'
            variant='contained'
            color='primary'
            onClick={handleSubmit}
          >
            {t('createButton')}
          </Button>
          :
          <Button 
            data-testid='editButton'
            variant='contained'
            color='primary'
            onClick={handleEdit}
          >
            {t('editButton')}
          </Button>
        }
      </div>
    </Modal>
  )
}

export default Popup