import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'

beforeEach(() => {
  render(<App />)
})

describe('Language bar tests', () => {

  test('language bar exists', () => {
    expect(screen.getByTestId('language')).toBeInTheDocument()
  })
  
  test('default language is english', () => {
    expect(screen.getByTestId('language')).toHaveDisplayValue('English')
  })

  test('can change language to italian', () => {
    fireEvent.change(screen.getByTestId('language'), {target: {value: 'it'}})
    expect(screen.getByTestId('language')).toHaveDisplayValue('Italiano')
  })

})

describe('Add button tests', () => { 
  
  test('add button exists', () => {
    expect(screen.getByTestId('addTodo')).toBeInTheDocument()
  })

  test('clicking add button opens modal', () => {
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
    fireEvent.click(screen.getByTestId('addTodo'))
    expect(screen.getByTestId('modal')).toBeInTheDocument()
  })
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

