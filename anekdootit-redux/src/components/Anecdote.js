import React from 'react'

const Anecdote = ({ anecdote, onClick }) =>
  <div>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={onClick}>vote</button>
    </div>
  </div>

export default Anecdote
