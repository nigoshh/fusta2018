import React from 'react'
import Anecdote from './Anecdote'
import { vote } from '../actionCreators'

class AnecdoteList extends React.Component {

  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(() => this.forceUpdate())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  voteAnecdote = id => () => this.props.store.dispatch(vote(id))

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.store.getState().map(a =>
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

export default AnecdoteList
