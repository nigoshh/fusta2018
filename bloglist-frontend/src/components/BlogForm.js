import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ author, handleSubmit, handleChange, title, url }) => (
  <div>
    <h3>add blog</h3>
    <form onSubmit={handleSubmit}>
      <div>
        title: <input
          name="title"
          value={title}
          onChange={handleChange}
        />
      </div>
      <div>
        author: <input
          name="author"
          value={author}
          onChange={handleChange}
        />
      </div>
      <div>
        url: <input
          name="url"
          value={url}
          onChange={handleChange}
        />
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  </div>
)

BlogForm.propTypes = {
  author: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default BlogForm
