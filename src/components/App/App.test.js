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
