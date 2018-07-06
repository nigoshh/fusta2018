import React from 'react'
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom'
import { Button, Container, Divider, Form, Grid, Header, Icon, Image, Label, Popup, Table } from 'semantic-ui-react'

const Menu = () => {
  const baseStyle = { padding: 10 }
  const style = { ...baseStyle, backgroundColor: '#99FFCC' }
  const active = {
    ...baseStyle,
    backgroundColor: '#009966',
    color: 'black',
    fontStyle: 'italic'
  }
  return (
    <div style={style}>
      <NavLink exact to="/" style={style} activeStyle={active}>
        anecdotes
      </NavLink>&nbsp;
      <NavLink exact to="/create" style={style} activeStyle={active}>
        create new
      </NavLink>&nbsp;
      <NavLink exact to="/about" style={style} activeStyle={active}>
        about
      </NavLink>&nbsp;
    </div>
  )
}

const Anecdote = ({ anecdote }) => {
  const { author, content, info, votes } = anecdote
  return (
    <Table basic="very" padded>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Header as="h2" color="pink">{`"${content}"`} by {author}</Header>
          </Table.Cell>
        </Table.Row>
        <Table.Row><Table.Cell>has {votes} votes</Table.Cell></Table.Row>
        <Table.Row>
          <Table.Cell>for more info see <a href={info}>{info}</a></Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <Header as="h2" color="pink">Anecdotes</Header>
    <Table striped>
      <Table.Body>
        {anecdotes.map(anecdote =>
          <Table.Row key={anecdote.id} >
            <Table.Cell>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  </div>
)

const About = () =>
  <div>
    <Header as="h2" color="pink">About anecdote app</Header>
    <Grid padded>
      <Grid.Row>
        <Grid.Column width={11}>
          <p>According to Wikipedia:</p>

          <em>An anecdote is a brief, revealing account of an individual person or an incident.
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
            such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
            An anecdote is &quot;a story with a point.&quot;</em>

          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </Grid.Column>
        <Grid.Column width={5}>
          <Image src='https://upload.wikimedia.org/wikipedia/commons/f/fc/Annie_Easley.jpg' />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>

const Footer = () => (
  <div>
    <Icon name="fire extinguisher" />
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

const Notification = ({ text }) => {
  if (!text)
    return null
  const style = {
    color: 'white',
    background: '#0099cc',
    fontSize: 23,
    borderRadius: 7,
    padding: 10,
    margin: 10
  }
  return <div style={style}>{text}</div>
}

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value })

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <Header as="h2" color="pink">create a new anecdote</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <Popup
              trigger={
                <input
                  name="content"
                  placeholder="content"
                  value={this.state.content}
                  onChange={this.handleChange}
                />
              }
              header="content"
              content="the anecdote itself"
              on="focus"
            />
            <Label pointing>Please enter a value</Label>
          </Form.Field>
          <Form.Field>
            <Popup
              trigger={
                <input
                  name="author"
                  placeholder="author"
                  value={this.state.author}
                  onChange={this.handleChange}
                />
              }
              header="author"
              content="the anecdote's author"
              on="focus"
            />
            <Label pointing>Please enter a</Label>
          </Form.Field>
          <Form.Field>
            <Popup
              trigger={
                <input
                  name="info"
                  placeholder="url for more info"
                  value={this.state.info}
                  onChange={this.handleChange}
                />
              }
              header="url for more info"
              content="a link"
              on="focus"
            />
            <Label pointing>Please</Label>
          </Form.Field>
          <Button type="submit">create</Button>
        </Form>
      </div>
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    const notification = `new anecdote created! "${anecdote.content}"`
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote), notification
    })
    setTimeout(() => this.setState({ notification: '' }), 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <Container>
        <Router>
          <div>
            <Divider hidden />
            <Header as="h1" color="violet">Software anecdotes</Header>
            <Menu />
            <Divider hidden />
            <Notification text={this.state.notification} />
            <Route exact path="/" render={() =>
              <AnecdoteList anecdotes={this.state.anecdotes} />}
            />
            <Route path="/about" render={() => <About />} />
            <Route path="/create" render={({ history }) =>
              <CreateNew addNew={this.addNew} history={history} />}
            />
            <Route exact path="/anecdotes/:id" render={({ match }) =>
              <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
            />
          </div>
        </Router>
        <Divider section />
        <Footer />
      </Container>
    )
  }
}

export default App
