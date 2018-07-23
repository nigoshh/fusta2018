import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import CommentForm from './CommentForm'
import NoMatch from './NoMatch'

export const Blog = ({ blog, history, like, loggedInUser, remove }) => {

  if (!blog)
    return <NoMatch />

  const { author, comments, id, likes, title, url, user } = blog
  const deleteButton =
    <button onClick={() => remove(blog, history)}>delete</button>
  const likeButton = <button onClick={() => like(id, history)}>like</button>
  const superUser =
    <span style={{ textDecoration: 'line-through' }}>secret user</span>
  const commentList = () =>
    <ul>
      {comments.map(c => <li key={c}>{c}</li>)}
    </ul>

  return (
    <div>
      <h2><span style={f('italic')}>{title}</span> – {author}</h2>
      <div className="box">
        <a href={url}>{url}</a><br/>
        {likes} likes {likeButton}<br/>
        added by {user ? user.name : superUser}<br/>
        {(!user || user.id === loggedInUser.id) ? deleteButton : ''}
        <h3>comments</h3>
        {comments ? commentList() : null}
        <CommentForm blogId={id} history={history} />
      </div>
    </div>
  )
}

export const f = fontStyle => ({ fontStyle })

Blog.propTypes = {
  blog: PropTypes.object,
  history: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  loggedInUser: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired
}

const mapStateToProps = ({ blogs, loggedInUser }, { history, id }) =>
  ({ blog: blogs.find(b => b.id === id), history, loggedInUser })

const mapDispatchToProps = { like: likeBlog, remove: removeBlog }

export default connect(mapStateToProps, mapDispatchToProps)(Blog)
