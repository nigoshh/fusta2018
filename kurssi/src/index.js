import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]
  }

  return (
    <div>
      <Otsikko kurssi={kurssi.nimi} />
      <Sisalto osat={kurssi.osat} />
      <Yhteensa osat={kurssi.osat} />
    </div>
  )
}

const Otsikko = (props) => {
  return <h1>{props.kurssi}</h1>
}

const Sisalto = (props) => {
  return (
    <div>
      <Osa osa={props.osat[0]} />
      <Osa osa={props.osat[1]} />
      <Osa osa={props.osat[2]} />
    </div>
  )
}

const Yhteensa = (props) => {
  let summa = 0
  props.osat.forEach(osa => {
    summa += osa.tehtavia
  })
  return <p>yhteensä {summa} tehtävää</p>
}

const Osa = (props) => {
  return <p>{props.osa.nimi} {props.osa.tehtavia}</p>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)