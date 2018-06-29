import React from 'react'
import PropTypes from 'prop-types'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: false
    }
  }

  setSelected = selected => this.setState({ selected })

  toggleSelected = () => this.setState({ selected: !this.state.selected })

  render() {

    const { blog, handleLike, loggedInUser, remove } = this.props
    const { author, likes, title, url, user } = blog
    const f = fontStyle => ({ fontStyle })
    const deleteButton = <button onClick={remove}>delete</button>
    const showWhenSelected = { display: this.state.selected ? '' : 'none' }
    const superUser =
      <span style={{ textDecoration: 'line-through' }}>secret user</span>

    return (
      <div className="blog">
        <div onClick={this.toggleSelected}>
          <span style={f('italic')}>{title}</span> – {author}
        </div>
        <div className="tab" style={showWhenSelected}>
          <a href={url}>{url}<br /></a>
          {likes} likes <button onClick={handleLike}>like</button><br/>
          added by {user ? user.name : superUser}<br/>
          {(!user || user.id === loggedInUser.id) ? deleteButton : ''}
        </div>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  loggedInUser: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired
}

export default Blog
