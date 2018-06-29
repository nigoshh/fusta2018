import React from 'react'
import { create } from '../actionCreators'

const AnecdoteForm = ({ store }) => {

  const createNew = event => {
    event.preventDefault()
    const content = event.target.content.value
    const ids = store.getState().map(a => a.id)
    store.dispatch(create(content, ids))
    event.target.content.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNew}>
        <div><input name="content"/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
