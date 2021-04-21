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
  
  test('add to do button exists', () => {
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
  
  test('textfield exists', () => {
    expect(screen.getByTestId('textField')).toBeInTheDocument()
  })
  
  /*
  In the future I want to make sure that when the modal opens the focus moves to testfield.

  test('textfield is focused', () => {
    expect(document.activeElement).toEqual(screen.getByTestId('textField'))
  })
  */

  test('textfield gets the input correctly', () => {
    const textFieldValue = screen.getByTestId('textField')
    fireEvent.change(textFieldValue, {target: {value: 'todo'}})
    expect(textFieldValue.value).toBe('todo')
  })
})