import React from 'react'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: '',
      selectOne: false
    }
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }

  handleFilterChange = (event) =>
    this.setState({ filter: event.target.value, selectOne: false})

  selectOne = (name) => () =>
    this.setState({ filter: name, selectOne: true})

  render() {
    const countriesToShow = this.state.selectOne
      ? this.state.countries
        .filter(c => c.name === this.state.filter)
      : this.state.countries
        .filter(c => c.name.toLowerCase()
        .includes(this.state.filter.toLowerCase()))
    return (
      <div>
        <div>
          find countries: <input
          value={this.state.filter}
          onChange={this.handleFilterChange}
          />
        </div>
        <Countries
          countries={countriesToShow}
          selectOne={this.selectOne}
        />
      </div>
    )
  }
}

const Countries = ({ countries, selectOne }) => {
  const countriesCount = countries.length
  if (countriesCount > 10)
    return <div>too many matches, specify another filter</div>
  else if (countriesCount <= 10 && countriesCount > 1)
    return (
      <div>
        {countries.map(c =>
          <div key={c.name} onClick={selectOne(c.name)}>{c.name}</div>
        )}
      </div>
    )
  else if (countriesCount === 1)
    return <Country country={countries[0]} />
  else
    return <div>no matches, specify another filter</div>
}

const Country = ({ country }) => {
  const altText = country.name + "'s flag"
  return (
    <div>
      <h1>{country.name} {country.nativeName}</h1>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <img src={country.flag} alt={altText} height="50%" width="50%"></img>
    </div>
  )
}

export default App
