import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const blog = {
    title: 'Learn React',
    author: 'Sensei Luukkainen',
    url: 'http://reactblog.example.com',
    likes: 100,
    user: {
      username: 'senpai_foo',
      name: 'Nimetön Sankari',
      id: 'abc123'
    }
  }

  const mockAddLike = jest.fn()
  const mockRemoveBlog = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} addLike={mockAddLike} removeBlog={mockRemoveBlog} user={blog.user.id} />
    )
  })

  test('author and title is shown', () => {
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
  })

  test('url and likes in now shown by default', () => {
    expect(component.container).not.toHaveTextContent(blog.url)
    expect(component.container).not.toHaveTextContent('likes')
  })

  test('url and likes is shown when \'view\' is clicked', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(`likes ${blog.likes}`)
    fireEvent.click(button)
    expect(component.container).not.toHaveTextContent(blog.url)
    expect(component.container).not.toHaveTextContent(`likes ${blog.likes}`)
  })

  test('addLikes is called once when \'like\' is called', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    expect(mockAddLike.mock.calls).toHaveLength(1)
    fireEvent.click(likeButton)
    expect(mockAddLike.mock.calls).toHaveLength(2)
  })
})