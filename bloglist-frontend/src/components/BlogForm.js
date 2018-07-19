import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { newBlog } from '../reducers/blogReducer'

export class BlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      author: '',
      title: '',
      url: ''
    }
  }

  addBlog = async (event) => {
    event.preventDefault()
    const { author, title, url } = this.state
    this.props.newBlog(
      { author, title, url }, this.cleanForm, this.props.history
    )
  }

  cleanForm = () => this.setState({ author: '', title: '', url: '' })

  handleChange = (event) =>
    this.setState({ [event.target.name]: event.target.value })

  render() {
    const { author, title, url } = this.state
    return (
      <div>
        <h3>add blog</h3>
        <form onSubmit={this.addBlog}>
          <div>
            title: <input
              name="title"
              value={title}
              onChange={this.handleChange}
            />
          </div>
          <div>
            author: <input
              name="author"
              value={author}
              onChange={this.handleChange}
            />
          </div>
          <div>
            url: <input
              name="url"
              value={url}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button type="submit">create</button>
          </div>
        </form>
      </div>
    )
  }
}

BlogForm.propTypes = {
  newBlog: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default connect(null, { newBlog })(BlogForm)
