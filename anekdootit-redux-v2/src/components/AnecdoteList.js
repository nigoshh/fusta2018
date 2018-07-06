import React from 'react'
import { connect } from 'react-redux'
import Filter from './Filter'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = props =>
  <div>
    <h2>Anecdotes</h2>
    <Filter />
    {props.visibleAnecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => props.voteAnecdote(anecdote)}>
            vote
          </button>
        </div>
      </div>
    )}
  </div>

const anecdotesToShow = ({ anecdotes, filter }) =>
  anecdotes
    .filter(a => a.content.includes(filter))
    .sort((a, b) => b.votes - a.votes)

const mapStateToProps = state => ({ visibleAnecdotes: anecdotesToShow(state) })

export default connect(mapStateToProps,
  { voteAnecdote })(AnecdoteList)
