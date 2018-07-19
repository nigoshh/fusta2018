import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from '../reducers/userReducer'

export class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  cleanForm = () => this.setState({ username: '', password: '' })

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value })

  login = event => {
    event.preventDefault()
    const { username, password } = this.state
    const { history, url } = this.props
    this.props.login({ username, password }, this.cleanForm, history, url)
  }

  render() {
    const { username, password } = this.state
    return (
      <div>
        <h2>log in</h2>
        <form onSubmit={this.login}>
          <div>
            username: <input
              type="text"
              name="username"
              value={username}
              onChange={this.handleChange}
              ref={this.props.focusRef}
            />
          </div>
          <div>
            password: <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit">log in</button>
        </form>
      </div>
    )
  }
}

LoginForm.propTypes = {
  focusRef: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired
}

export default connect(null, { login })(LoginForm)
