import React from 'react'
import PropTypes from 'prop-types'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className="sBlogInfo">
      {blog.title} {blog.author}
    </div>
    <div className="sBlogLikes">
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

SimpleBlog.propTypes = {
  blog: PropTypes.object.isRequired,
  onClick: PropTypes.func
}

export default SimpleBlog
