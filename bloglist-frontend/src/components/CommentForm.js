import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { newComment } from '../reducers/blogReducer'

export class CommentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: ''
    }
  }

  addComment = event => {
    event.preventDefault()
    this.props.newComment(
      this.props.blogId, this.state.comment, this.cleanForm, this.props.history
    )
  }

  cleanForm = () => this.setState({ comment: '' })

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value })

  render() {
    return (
      <form onSubmit={this.addComment}>
        <input
          type="text"
          name="comment"
          value={this.state.comment}
          onChange={this.handleChange}
        />
        <button type="submit">add comment</button>
      </form>
    )
  }
}

CommentForm.propTypes = {
  blogId: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  newComment: PropTypes.func.isRequired
}

export default connect(null, { newComment })(CommentForm)
