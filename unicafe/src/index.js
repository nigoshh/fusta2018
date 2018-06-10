import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }
  }

  klik = (propertyName) => () => {
    this.setState({
      [propertyName]: this.state[propertyName] + 1
    })
  }

  render() {
    return (
      <div>
        <Title text='anna palautetta' />
        <div>
          <Button
            handleClick={this.klik('hyva')}
            text='hyvä'
          />
          <Button
            handleClick={this.klik('neutraali')}
            text='neutraali'
          />
          <Button
            handleClick={this.klik('huono')}
            text='huono'
          />
        </div>
        <Title text='statistiikka' />
        <div>
          <Statistics
            hyva={this.state.hyva}
            neutraali={this.state.neutraali}
            huono={this.state.huono}
          />
        </div>
      </div>
    )
  }
}

const Title = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({ hyva, neutraali, huono }) => {

  const kaikki = hyva + neutraali + huono
  if (kaikki === 0)
    return <p>ei yhtään palautetta annettu</p>

  const keskiarvo = (hyva - huono) / kaikki
  const positiivisia = hyva / kaikki * 100 + ' %'

  return (
    <table>
      <tbody>
        <Statistic text='hyvä' number={hyva}/>
        <Statistic text='neutraali' number={neutraali}/>
        <Statistic text='huono' number={huono}/>
        <Statistic text='keskiarvo' number={keskiarvo}/>
        <Statistic text='positiivisia' number={positiivisia}/>
      </tbody>
    </table>
  )
}

const Statistic = ({ text, number}) => (
  <tr><td>{text}</td><td>{number}</td></tr>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
