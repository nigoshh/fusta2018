import React from 'react'
import personService from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      message: null
    }
  }

  componentDidMount = () =>
    personService.getAll().then(persons => this.setState({ persons }))

  addOrUpdatePerson = (event) => {
    event.preventDefault()
    const name = this.state.newName
    const person = this.state.persons.find((p) => p.name === name)
    const number = this.state.newNumber
    if (person !== undefined && window.confirm(
        `${name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
      this.updatePerson({ ...person, number })
    } else {
      this.addPerson({ name, number })
    }
  }

  addPerson = (person) =>
    personService.create(person)
      .then(newPerson => {
        const persons = this.state.persons.concat(newPerson)
        const message = `lisättiin ${newPerson.name}`
        this.setState({ persons, newName: '', newNumber: '', message })
        this.messageTimeout(message)
      })

  updatePerson = (person) =>
    personService.update(person)
      .then(updated => {
        const message = `päivitettiin henkilön ${updated.name} numero`
        this.setState({
          persons: this.state.persons
            .map(p => p.id === updated.id ? updated : p),
          newName: '', newNumber: '', message
        })
        this.messageTimeout(message)
      })
      .catch(error => {
        personService.create(person)
          .then(updated => {
            const message = `päivitettiin henkilön ${updated.name} numero`
            this.setState({
              persons: this.state.persons
                .map(p => p.id === updated.id ? updated : p),
              newName: '', newNumber: '', message
            })
            this.messageTimeout(message)
          })
      })

  removePerson = (person) => () => {
    if (window.confirm(`poistetaanko ${person.name}?`))
      personService.remove(person.id)
        .then(() => {
          const message = `poistettiin ${person.name}`
          this.setState({
            persons: this.state.persons.filter(p => p.id !== person.id),
            message
          })
          this.messageTimeout(message)
        })
        .catch(error => {
          const message = `${person.name} oli jo poistettu palvelimelta`
          this.setState({
            persons: this.state.persons.filter(p => p.id !== person.id),
            message
          })
          this.messageTimeout(message)
        })
  }

  messageTimeout = (message) =>
    setTimeout(() => {
      if (this.state.message === message)
        this.setState({ message: null})
    }, 5000)

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
        <Notification message={this.state.message} />
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
    <td className='cell'>{person.name}</td>
    <td className='cell'>{person.number}</td>
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

const Notification = ({ message }) => {
  if (message === null)
    return null
  return <div className='notification'>{message}</div>
}

export default App
