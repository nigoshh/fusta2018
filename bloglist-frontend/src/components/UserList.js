import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export const UserList = ({ users }) =>
  <div>
    <h2>users</h2>
    <table>
      <thead>
        <tr><th>user</th><th>blogs added</th></tr>
      </thead>
      <tbody>
        {users.map(u =>
          <tr key={u.id}>
            <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
            <td>{u.blogs.length}</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

UserList.propTypes = {
  users: PropTypes.array.isRequired
}

export default connect(({ users }) => ({ users }))(UserList)
