import { Modal, TextField } from '@material-ui/core'
import { useRef, useState } from 'react'
import Dropzone from 'react-dropzone'
import { useTranslation } from 'react-i18next'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

const Popup = ({
  modalStatus,
  closeModal,
  text,
  initialName,
  index,
  onNameChange,
  handleUpdate,
  editMode
}) => {

  const [file, setFile] = useState([])
  const [message, setMessage] = useState('')

  const textRef = useRef(null)

  const { t } = useTranslation()
  
  const resetFile = () => {
    setFile([])
  }

  const submitData = () => {
    if (text && text !== initialName) {
      fetch('http://localhost:8000/tasks/',
        {
          method : 'post',
          headers : {'Content-Type' : 'application/json'},
          body : JSON.stringify({ title : text })
        }
      )
      .then(handleUpdate)
      .catch(err => console.log(err))
    }
  }

  const editData = () => {
    if (text && text !== initialName) {
      fetch(`http://localhost:8000/tasks/${index}/`,
        {
          method : 'put',
          headers : {'Content-Type' : 'application/json'},
          body : JSON.stringify({ title : text })
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

  const handleSubmit = () => {
    setMessage(t('emptySubmit'))
    if (text) {
      submitData()
      setMessage('')
      closeModal()
    }
  }

  const handleEdit = () => {
    setMessage(t('emptyEdit'))
    if (text && text !== initialName) {
      editData()
      setMessage('')
      closeModal()
     }
  }
  
  return (
    <Modal
      data-testid='modal'
      open={modalStatus}
    >
      <div className='popup'>
        <h2>{t('createTitle')}</h2>
        <h4
          className='closeButton'
          onClick={handleClose}
        >
          ✕
        </h4>
        <div className='disabledNav'>
          {message}
        </div>
        <TextField
          required
          fullWidth
          label={t('nameTodo')}
          variant="outlined"
          value={text}
          ref={textRef}
          onChange={onNameChange}
          inputProps={{ 'data-testid': 'textField' }}
        />
        {
          file.length===0
          ?
          <Dropzone
            multiple={false}
            accept="image/*"
            onDrop={
              acceptedFiles => {
                setFile(
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
                  <div className='input'>
                    <h1>+</h1>
                    <p>{t('insertImage')}</p>
                  </div>
                </div>
              </section>
            )}
          </Dropzone>
          :
          <div className='imageUploaded'>
            <img 
              src={file.preview} 
              alt='uploaded' 
              className='uploadDiv' 
              style = {{
                height : '100%',
                objectFit : 'cover',
              }}
            />
            <div className='uploadDiv'>
              <CheckCircleIcon color='primary' />
              <p>{t('imageUploaded')}</p>
              <button onClick={resetFile}>{t('resetFile')}</button>
            </div>
          </div>
        }
        {
          !editMode
          ?
          <button 
            data-testid='createButton'
            className='formButton'
            onClick={handleSubmit}
          >
            {t('createButton')}
          </button>
          :
          <button 
            data-testid='editButton'
            className='formButton'
            onClick={handleEdit}
          >
            {t('editButton')}
          </button>
        }
      </div>
    </Modal>
  )
}

export default Popup