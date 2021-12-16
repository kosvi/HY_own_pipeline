import React, { useState } from 'react'

const BlogForm = ({ addBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    await addBlog(newBlog)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        title: <input id='title' type='text' value={title} onChange={({ target }) => setTitle(target.value)} /><br />
        author: <input id='author' type='text' value={author} onChange={({ target }) => setAuthor(target.value)} /><br />
        url: <input id='url' type='text' value={url} onChange={({ target }) => setUrl(target.value)} /><br />
        <button id='createBlogButton'>create</button>
      </form>
    </div>
  )
}

export default BlogForm