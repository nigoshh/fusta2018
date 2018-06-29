import React from 'react'
import PropTypes from 'prop-types'
import Anecdote from './Anecdote'
import { vote } from '../actionCreators'

class AnecdoteList extends React.Component {

  componentDidMount() {
    this.unsubscribe = this.context.store.subscribe(() => this.forceUpdate())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  voteAnecdote = id => () => this.context.store.dispatch(vote(id))

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.context.store.getState().map(a =>
          <Anecdote
            key={a.id}
            anecdote={a}
            onClick={this.voteAnecdote(a.id)}
          />
        )}
      </div>
    )
  }
}

AnecdoteList.contextTypes = { store: PropTypes.object }

export default AnecdoteList
