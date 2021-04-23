import { fireEvent, render, screen } from '@testing-library/react'
import Modal from '@material-ui/core/Modal'
import Popup from './Popup'

beforeEach(() => {
  render(<Popup />)
})

describe('Modal tests', () => { 

  beforeEach(() => {
    fireEvent.click(screen.getByTestId('addTodo'))
  })

  describe('Text field tests', () => {

    test('textfield exists', () => {
      expect(screen.getByTestId('textField')).toBeInTheDocument()
    })

    /*
    In the future I want to make sure that when the modal opens the focus moves to textfield.

    test('textfield is focused', () => {
      expect(document.activeElement).toEqual(screen.getByTestId('textField'))
    })
    */
    
    test('textfield gets the input correctly', () => {
      const textFieldValue = screen.getByTestId('textField')
      fireEvent.change(textFieldValue, {target: {value: 'to do'}})
      expect(textFieldValue.value).toBe('to do')
      fireEvent.change(textFieldValue, {target: {value: 'not to do'}})
      expect(textFieldValue.value).toBe('not to do')
    })
  })

  describe('Create button tests', () => {

    test('create button exists', () => {
      expect(screen.getByTestId('createButton')).toBeInTheDocument()
    })
    
    test('create button with no input keeps modal open', () => {
      fireEvent.click(screen.getByTestId('createButton'))
      expect(screen.getByTestId('modal')).toBeInTheDocument()
    })

    test('create button with input closes modal', () => {
      fireEvent.change(screen.getByTestId('textField'), {target: {value: 'to do'}})
      fireEvent.click(screen.getByTestId('createButton'))
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
    })
    
    describe('Create button creates new element', () => {
      
      test('element does not exists before clicking create button', () => {
        expect(screen.queryByTestId('todoItem')).not.toBeInTheDocument()
      })

      test('create button with input creates new element', () => {
        expect(screen.queryByTestId('todoItem')).not.toBeInTheDocument()
      })

    })
  })
})

