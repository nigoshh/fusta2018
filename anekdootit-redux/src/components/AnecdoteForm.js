import React from 'react'
import PropTypes from 'prop-types'
import { create } from '../actionCreators'

class AnecdoteForm extends React.Component {

  createNew = event => {
    event.preventDefault()
    const content = event.target.content.value
    const ids = this.context.store.getState().map(a => a.id)
    this.context.store.dispatch(create(content, ids))
    event.target.content.value = ''
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.createNew}>
          <div><input name="content"/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

AnecdoteForm.contextTypes = { store: PropTypes.object }

export default AnecdoteForm
