import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit, handleChange, password, focusRef, username }) => (
  <div>
    <h2>Log in</h2>
    <form onSubmit={handleSubmit}>
      <div>
        username: <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          ref={focusRef}
        />
      </div>
      <div>
        password: <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">log in</button>
    </form>
  </div>
)

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  focusRef: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}

export default LoginForm
