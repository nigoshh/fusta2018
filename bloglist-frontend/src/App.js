import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { notifyError, notifyMessage } from './reducers/notificationReducer'
import { initUsers, logout } from './reducers/userReducer'
import blogService from './services/blogs'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import NavBar from './components/NavBar'
import NoMatch from './components/NoMatch'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import User from './components/User'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.textInput = null
    this.setTextInputRef = element => {
      this.textInput = element
    }
    this.focusTextInput = () => {
      if (this.textInput) this.textInput.focus()
    }
  }

  componentDidMount() {
    if (this.props.loggedInUser) {
      blogService.setToken(this.props.loggedInUser.token)
      this.props.initBlogs()
      this.props.initUsers()
    }
    else
      this.focusTextInput()
  }

  render() {

    const blogsView = history =>
      <div>
        <h2>blogs</h2>
        <Togglable buttonLabel="add blog">
          <BlogForm history={history} />
        </Togglable>
        <hr/>
        <BlogList />
      </div>

    const loginInfo = () =>
      <span>{this.props.loggedInUser.name} logged in </span>

    const loginRoute = () =>
      <Route exact path="/login" render={({ history }) => {
        const query = history.location.search
        const i = query.indexOf('?next=')
        return (
          <LoginForm
            focusRef={this.setTextInputRef}
            history={history}
            url={i >= 0 ? query.substr(i+6) : '/blogs'}
          />
        )}}
      />

    const logoutButton = history =>
      <button onClick={() => this.props.logout(this.focusTextInput, history)}>
        log out
      </button>

    const loggedInRoutes = () =>
      <div>
        <Route path="/" render={({ history }) =>
          <NavBar loginInfo={loginInfo()} logoutButton={logoutButton(history)} />
        } />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/blogs" />} />
          <Route exact path="/blogs" render={({ history }) => blogsView(history)} />
          <Route exact path="/blogs/:id" render={({ history, match }) =>
            <Blog history={history} id={match.params.id} />
          } />
          {loginRoute()}
          <Route exact path="/users" component={UserList} />
          <Route exact path="/users/:id" render={({ match }) =>
            <User id={match.params.id} />
          } />
          <Route component={NoMatch} />
        </Switch>
      </div>

    const loggedOutRoutes = () =>
      <Switch>
        {loginRoute()}
        <Route path="*" render={({ match }) =>
          <Redirect to={`/login?next=${match.url}`} />
        } />
      </Switch>

    return (
      <div>
        <Notification message={this.props.error} className="error" />
        <Notification message={this.props.message} className="message" />
        <h1>blog app</h1>
        <Router>
          <div>
            {this.props.loggedInUser ? loggedInRoutes() : loggedOutRoutes()}
          </div>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = ({ error, loggedInUser, message }) => {
  error = error.error
  message = message.message
  return { error, loggedInUser, message }
}

const mapDispatchToProps = {
  initBlogs, initUsers, logout, notifyError, notifyMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
