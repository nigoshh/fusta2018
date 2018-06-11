import React from 'react'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  componentDidMount() {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        this.setState({ persons: response.data })
      })
  }

  addPerson = (event) => {
    event.preventDefault()
    const name = this.state.newName
    if (this.state.persons.find((p) => p.name === name) !== undefined) {
      alert('name already taken: choose another one')
      return
    }
    const number = this.state.newNumber
    const persons = this.state.persons.concat({ name, number })
    this.setState({ persons, newName: '', newNumber: ''})
  }

  handleFilterChange = (event) =>
    this.setState({ filter: event.target.value.toLowerCase()})

  handleNameChange = (event) =>
    this.setState({ newName: event.target.value})

  handleNumberChange = (event) =>
    this.setState({ newNumber: event.target.value})

  render() {
    const personsToShow = this.state.persons.filter(
      p => p.name.toLowerCase().includes(this.state.filter))

    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <div>
          rajaa näytettäviä <input
          value={this.state.filter}
          onChange={this.handleFilterChange}
          />
        </div>
        <NewPersonForm
          addPerson={this.addPerson}
          newName={this.state.newName}
          handleNameChange={this.handleNameChange}
          newNumber={this.state.newNumber}
          handleNumberChange={this.handleNumberChange}
        />
        <h2>Numerot</h2>
        <table>
          <tbody>
            {personsToShow.map(p => <Person key={p.name} person={p} />)}
          </tbody>
        </table>
      </div>
    )
  }
}

const Person = ({ person }) =>
  <tr><td>{person.name}</td><td>{person.number}</td></tr>

const NewPersonForm = (props) => (
  <div>
    <h2>Lisää uusi</h2>
    <form onSubmit={props.addPerson}>
      <div>
        nimi: <input
        value={props.newName}
        onChange={props.handleNameChange}
        />
      </div>
      <div>
        numero: <input
        value={props.newNumber}
        onChange={props.handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  </div>
)

export default App
