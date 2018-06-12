import React from 'react'
import personService from './services/persons'

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

  componentDidMount = () =>
    personService.getAll().then(persons => this.setState({ persons }))

  addOrUpdatePerson = (event) => {
    event.preventDefault()
    const name = this.state.newName
    const person = this.state.persons.find((p) => p.name === name)
    const number = this.state.newNumber
    if (person !== undefined) {
      const msg = `${name} on jo luettelossa, korvataanko vanha numero uudella?`
      if (window.confirm(msg))
        personService.update({ ...person, number })
          .then(updated => this.setState({
            persons: this.state.persons
              .map(p => p.id === updated.id ? updated : p),
            newName: '', newNumber: ''
          }))
    } else {
      personService.create({ name, number })
        .then(newPerson => {
          const persons = this.state.persons.concat(newPerson)
          this.setState({ persons, newName: '', newNumber: ''})
        })
    }
  }

  removePerson = (person) => () => {
    if (window.confirm(`poistetaanko ${person.name}?`))
      personService.remove(person.id)
        .then(() => this.setState({
          persons: this.state.persons.filter(p => p.id !== person.id)
        }))
  }

  handleFilterChange = (event) =>
    this.setState({ filter: event.target.value})

  handleNameChange = (event) =>
    this.setState({ newName: event.target.value})

  handleNumberChange = (event) =>
    this.setState({ newNumber: event.target.value})

  render = () => {
    const personsToShow = this.state.persons
      .filter(p => p.name.toLowerCase()
      .includes(this.state.filter.toLowerCase()))

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
          addOrUpdatePerson={this.addOrUpdatePerson}
          newName={this.state.newName}
          handleNameChange={this.handleNameChange}
          newNumber={this.state.newNumber}
          handleNumberChange={this.handleNumberChange}
        />
        <Persons
          persons={personsToShow}
          remove={this.removePerson}
        />
      </div>
    )
  }
}

const Persons = ({ persons, remove }) =>
  <div>
    <h2>Numerot</h2>
    <table>
      <tbody>
        {persons.map(p =>
          <Person key={p.id} person={p} remove={remove(p)} />
        )}
      </tbody>
    </table>
  </div>

const Person = ({ person, remove }) =>
  <tr>
    <td>{person.name}</td>
    <td>{person.number}</td>
    <td><button onClick={remove}>poista</button></td>
  </tr>

const NewPersonForm = (props) => (
  <div>
    <h2>Lisää uusi</h2>
    <form onSubmit={props.addOrUpdatePerson}>
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
        <button type='submit'>lisää</button>
      </div>
    </form>
  </div>
)

export default App
