import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: this.randomInt(this.props.anecdotes.length),
      votes: this.props.anecdotes.map((a) => 0)
    }
  }

  nextAnecdote = () => {
    this.setState({
      selected: this.randomInt(this.props.anecdotes.length)
    })
  }

  getAnecdote = (i) => this.props.anecdotes[i]

  randomInt = (max) => Math.floor(Math.random() * max)

  vote = () => {
    const votesCopy = this.state.votes.slice()
    votesCopy[this.state.selected] += 1
    this.setState({votes: votesCopy})
  }

  getVotes = (i) => 'has ' + this.state.votes[i] + ' votes'

  maxWithIndex = (x) => x.reduce(
    (acc, xi, i) => (xi > acc.max) ? { max: xi, i: i } : acc,
    { max: x[0], i: 0 })

  mostVoted = () => this.maxWithIndex(this.state.votes).i

  render() {
    return (
      <div>
        <Anecdote
          text={this.getAnecdote(this.state.selected)}
          votes={this.getVotes(this.state.selected)}
        />
        <div>
          <Button
            handleClick={this.vote}
            text='vote'
          />
          <Button
            handleClick={this.nextAnecdote}
            text='next anecdote'
          />
        </div>
        <Title text='anecdote with most votes:' />
        <Anecdote
          text={this.getAnecdote(this.mostVoted())}
          votes={this.getVotes(this.mostVoted())}
        />
      </div>
    )
  }
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Anecdote = ({ text, votes }) => (
  <div>
    <Text text={text} />
    <Text text={votes} />
  </div>
)

const Text = ({ text }) => <div>{text}</div>

const Title = ({ text }) => <h1>{text}</h1>

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
