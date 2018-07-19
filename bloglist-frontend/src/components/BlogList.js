import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { f } from './Blog'

export const BlogList = ({ blogs }) =>
  blogs.map(b =>
    <div className="box" key={b.id}>
      <Link to={`/blogs/${b.id}`}>
        <span style={f('italic')}>{b.title}</span> – {b.author}
      </Link>
    </div>
  )

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired
}

export default connect(({ blogs }) => ({ blogs }))(BlogList)
