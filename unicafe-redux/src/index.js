import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const Statistiikka = ({ onClick }) => {

  const { good, ok, bad } = store.getState()
  const palautteita = good + ok + bad
  if (palautteita === 0)
    return (
      <div>
        <h2>Statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )

  return (
    <div>
      <h2>Statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{(good - bad) / palautteita}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{good / palautteita * 100} %</td>
          </tr>
        </tbody>
      </table>
      <button onClick={onClick}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = type => () => store.dispatch({ type })
  render() {
    return (
      <div>
        <h2>Anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka onClick={this.klik('ZERO')}/>
      </div>
    )
  }
}

const renderApp = () =>
  ReactDOM.render(<App />, document.getElementById('root'))

renderApp()
store.subscribe(renderApp)
