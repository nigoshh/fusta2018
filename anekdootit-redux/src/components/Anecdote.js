import React from 'react'

const Anecdote = ({ anecdote, onClick }) =>
  <div>
    <div>
      {anecdote.content}
    </div>
    <div>
      <span>has {anecdote.votes} votes </span>
      <button onClick={onClick}>vote</button>
    </div>
  </div>

export default Anecdote
