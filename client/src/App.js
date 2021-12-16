import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)

  const sortSetBlogs = (blogs) => {
    const sortedList = blogs.sort((a, b) => b.likes - a.likes)
    setBlogs(sortedList)
  }

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      sortSetBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setNotification({
        message: 'learn to type!',
        type: 'error'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
  }

  const addBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const response = await blogService.addBlog(newBlog)
      const newBlogList = blogs.concat(response)
      sortSetBlogs(newBlogList)
      setNotification({
        message: `a new blog ${response.title} by ${response.author} added`,
        type: 'success'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (error) {
      setNotification({
        message: 'error in saving new blog entry',
        type: 'error'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const addLike = async (blog) => {
    try {
      const response = await blogService.likeBlog(blog)
      const blogList = blogs.map(b => b.id === response.id ? { ...response, user: blog.user } : b)
      sortSetBlogs(blogList)
      setNotification({
        message: `${response.title} by ${response.author} was liked`,
        type: 'success'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (error) {
      setNotification({
        message: 'could not add a like',
        type: 'error'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const removeBlog = async (blog) => {
    try {
      const blogId = blog.id
      await blogService.deleteBlog(blog)
      const blogList = blogs.filter(b => b.id !== blogId)
      sortSetBlogs(blogList)
      setNotification({
        message: `${blog.title} by ${blog.author} deleted succesfully`,
        type: 'success'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (error) {
      setNotification({
        message: error.message,
        type: 'error'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        {
          notification !== null && <Notification notification={notification} />
        }
        <h2>log in to application</h2>
        <Login
          user={username}
          pwd={password}
          setUser={setUsername}
          setPwd={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    )
  }
  if (user !== null) {
    return (
      <div>
        {
          notification !== null && <Notification notification={notification} />
        }
        <h2>blogs</h2>
        logged in as {user.name} <button onClick={handleLogout}>logout</button> <br /><br />
        <Togglable buttonLabel='add new blog' ref={blogFormRef}>
          <BlogForm
            addBlog={addBlog}
          />
        </Togglable><br /><br />
        <Blogs blogs={blogs} addLike={addLike} removeBlog={removeBlog} userId={user.id} />
      </div>
    )
  }
}

export default App