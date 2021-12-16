import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {

  let submitAction, component, titleInput, authorInput, urlInput

  beforeEach(() => {
    submitAction = jest.fn()
    component = render(
      <BlogForm addBlog={submitAction} />
    )
    titleInput = component.container.querySelector('#title')
    authorInput = component.container.querySelector('#author')
    urlInput = component.container.querySelector('#url')
  })
  test('fill form and submit', () => {
    fireEvent.change(titleInput, {
      target: { value: 'Learn FullStack' }
    })
    fireEvent.change(authorInput, {
      target: { value: 'Sensei Luukkainen' }
    })
    fireEvent.change(urlInput, {
      target: { value: 'http://fullstack.example.com' }
    })
    const form = component.container.querySelector('form')
    fireEvent.submit(form)
    expect(submitAction.mock.calls).toHaveLength(1)
    expect(submitAction.mock.calls[0][0].title).toBeDefined()
    expect(submitAction.mock.calls[0][0].author).toBeDefined()
    expect(submitAction.mock.calls[0][0].url).toBeDefined()
    expect(submitAction.mock.calls[0][0].likes).not.toBeDefined()
    expect(submitAction.mock.calls[0][0].title).toBe('Learn FullStack')
    expect(submitAction.mock.calls[0][0].author).toBe('Sensei Luukkainen')
    expect(submitAction.mock.calls[0][0].url).toBe('http://fullstack.example.com')
  })
})