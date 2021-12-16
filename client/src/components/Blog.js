import React, { useState } from 'react'
import PropTypes from 'prop-types'

const FullInfo = ({ blog, addLike, removeBlog, user }) => {

  const like = async () => {
    await addLike(blog)
  }

  const deleteBlog = async () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}???`)) {
      await removeBlog(blog)
    }
  }

  return (
    <div>
      {blog.url}<br />
      likes {blog.likes} <button onClick={like}>like</button><br />
      {blog.user.name}<br />
      {user === blog.user.id && <button onClick={deleteBlog}>remove</button>}
    </div>
  )
}

const Blog = ({ blog, addLike, removeBlog, user }) => {

  const [displayAll, setDisplayAll] = useState(false)

  const toggleDisplay = () => {
    setDisplayAll(!displayAll)
  }

  return (
    <div className='blog'>
      {blog.title} {blog.author} <button onClick={toggleDisplay}>{displayAll ? 'hide' : 'view'}</button>
      {displayAll && <FullInfo blog={blog} addLike={addLike} removeBlog={removeBlog} user={user} />}
    </div>
  )
}

FullInfo.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.string,
}

export default Blog