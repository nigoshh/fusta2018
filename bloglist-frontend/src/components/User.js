import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { f } from './Blog'
import NoMatch from './NoMatch'

export const User = ({ user }) => user ?
  <div>
    <h2>{user.name}</h2>
    <div className="box">
      <h3>added blogs</h3>
      <ul>
        {user.blogs.sort(sortByTitle).map(b =>
          <li key={b.id}>
            <span style={f('italic')}>{b.title}</span> – {b.author}
          </li>
        )}
      </ul>
    </div>
  </div>
  : <NoMatch />

const sortByTitle = (blog1, blog2) => {
  const title1 = blog1.title.toLowerCase()
  const title2 = blog2.title.toLowerCase()
  if (title1 < title2)
    return -1
  if (title1 > title2)
    return 1
  return 0
}

const mapStateToProps = ({ users }, { id }) =>
  ({ user: users.find(u => u.id === id) })

User.propTypes = {
  user: PropTypes.object
}

export default connect(mapStateToProps)(User)
