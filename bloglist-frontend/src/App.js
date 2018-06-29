import React from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      error: '',
      message: '',
      username: '',
      password: '',
      author: '',
      title: '',
      url: ''
    }
    this.textInput = null
    this.setTextInputRef = element => {
      this.textInput = element
    }
    this.focusTextInput = () => {
      if (this.textInput) this.textInput.focus()
    }
  }

  async componentDidMount() {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      const blogs = await this.getAllBlogs()
      this.setState({ user, blogs })
    }
    this.focusTextInput()
  }

  addBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create({
        author: this.state.author,
        title: this.state.title,
        url: this.state.url
      })
      const blogs = this.state.blogs.concat(newBlog)
      blogs.sort(this.sortByLikes)
      const message = `new blog added: ${newBlog.title} by ${newBlog.author}`
      this.blogFormRef.toggleVisibility()
      await this.setState({ blogs, author: '', title: '', url: '', message })
      this.messageTimeout(message, 'message')
    } catch(e) {
      let error = e.response.data.error
      error = typeof error === 'string' ? error : JSON.stringify(error)
      this.showMessage(error, 'error')
    }
  }

  blogsRefs = []

  getAllBlogs = async () => {
    const blogs = await blogService.getAll()
    blogs.sort(this.sortByLikes)
    return blogs
  }

  handleChange = (event) =>
    this.setState({ [event.target.name]: event.target.value })

  like = ({ author, id, likes, title, user, url }) => async () => {
    try {
      likes++
      const blog = { author, id, likes, title, url }
      if (user)
        blog.user = user.id
      const updatedBlog = await blogService.update(id, blog)
      const blogs = this.state.blogs.filter(b => b.id !== id)
      blogs.push(updatedBlog)
      blogs.sort(this.sortByLikes)
      this.setState({ blogs })
    } catch(e) {
      let error = e.response.data.error
      error = typeof error === 'string' ? error : JSON.stringify(error)
      if (e.response.status === 404) {
        const blogs = this.state.blogs.filter(b => b.id !== id)
        await this.setState({ blogs, error })
        this.messageTimeout(error, 'error')
      } else
        this.showMessage(error, 'error')
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedBlogListUser', JSON.stringify(user))
      blogService.setToken(user.token)
      const blogs = await this.getAllBlogs()
      this.setState({ username: '', password: '', error: '', user, blogs })
    } catch(e) {
      this.showMessage('wrong username or password', 'error')
    }
  }

  logout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogListUser')
    blogService.setToken('')
    const message = 'you logged out successfully'
    await this.setState({
      user: null, username: '', password: '', error: '', message
    })
    this.messageTimeout(message, 'message')
    this.focusTextInput()
  }

  messageTimeout = (message, type) => {
    setTimeout(() => {
      if (this.state[type] === message)
        this.setState({ [type]: '' })
    }, 5000)
    window.scrollTo(0, 0)
  }

  removeBlog = blog => async () => {
    if (window.confirm(`delete "${blog.title}" by ${blog.author}?`))
      try {
        await blogService.remove(blog.id)
        const message = `successfully deleted "${blog.title}"`
        const blogs = this.state.blogs.filter(b => b.id !== blog.id)
        await this.setState({ message, blogs })
        this.messageTimeout(message, 'message')
      } catch(e) {
        if (e.response.status === 404) {
          const message = `"${blog.title}" was already deleted from the server`
          const blogs = this.state.blogs.filter(b => b.id !== blog.id)
          await this.setState({ blogs, message })
          this.messageTimeout(message, 'message')
        } else {
          let error = e.response.data.error
          error = typeof error === 'string' ? error : JSON.stringify(error)
          this.showMessage(error, 'error')
        }
      }
  }

  saveRef = variableName => component => {
    if (component)
      this[variableName] = component
  }

  showBlogsInfo = selected => () =>
    this.blogsRefs.forEach(br => br.setSelected(selected))

  showMessage = async (message, type) => {
    await this.setState({ [type]: message })
    this.messageTimeout(message, type)
  }

  sortByLikes = (blog1, blog2) => blog2.likes - blog1.likes

  render() {

    this.blogsRefs = []

    const loginForm = () =>
      <LoginForm
        handleSubmit={this.login}
        handleChange={this.handleChange}
        password={this.state.password}
        focusRef={this.setTextInputRef}
        username={this.state.username}
      />

    const showBlogs = () =>
      this.state.blogs.map(b =>
        <Blog
          key={b.id}
          ref={c => {if (c) this.blogsRefs.push(c)}}
          blog={b}
          loggedInUser={this.state.user}
          handleLike={this.like(b)}
          remove={this.removeBlog(b)}
        />)

    const blogList = () => (
      <div>
        <h2>blogs</h2>
        <p>
          <span>{this.state.user.name} logged in </span>
          <button onClick={this.logout}>log out</button>
        </p>
        <Togglable buttonLabel="add blog" ref={this.saveRef('blogFormRef')}>
          <BlogForm
            author={this.state.author}
            handleSubmit={this.addBlog}
            handleChange={this.handleChange}
            title={this.state.title}
            url={this.state.url}
          />
        </Togglable>
        <hr />
        <button onClick={this.showBlogsInfo(true)}>expand all</button>
        <button onClick={this.showBlogsInfo(false)}>collapse all</button>
        {showBlogs()}
      </div>
    )

    return (
      <div>
        <Notification message={this.state.error} className="error" />
        <Notification message={this.state.message} className="message" />
        {this.state.user ? blogList() : loginForm()}
      </div>
    )
  }
}

export default App
