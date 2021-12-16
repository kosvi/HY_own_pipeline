import axios from 'axios'
const baseUrl = '/api/blogs'

let token = 'null'

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const likeBlog = async (blog) => {
  const blogId = blog.id
  const newBlog = {
    user: blog.user.id,
    likes: blog.likes + 1,
    author: blog.author,
    title: blog.title,
    url: blog.url
  }
  const response = await axios.put(`${baseUrl}/${blogId}`, newBlog)
  return response.data
}

const deleteBlog = async (blog) => {
  const blogId = blog.id
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data
}

export default { setToken, getAll, addBlog, likeBlog, deleteBlog }