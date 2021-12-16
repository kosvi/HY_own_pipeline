import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, addLike, removeBlog, userId }) => (
  <div id='blogList'>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog} user={userId} />
    )}
  </div>
)

export default Blogs