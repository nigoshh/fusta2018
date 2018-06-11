import React from 'react'

const Kurssi = ({ kurssi }) => (
  <div>
    <Otsikko nimi={kurssi.nimi} />
    <Sisalto osat={kurssi.osat} />
    <Yhteensa osat={kurssi.osat} />
  </div>
)

const Otsikko = ({ nimi }) => <h1>{nimi}</h1>

const Sisalto = ({ osat }) => (
  <div>
    {osat.map(osa => <Osa key={osa.id} osa={osa} />)}
  </div>
)

const Osa = ({ osa }) => <p>{osa.nimi} {osa.tehtavia}</p>

const Yhteensa = ({ osat }) => {
  const summa = osat.reduce((sum, osa) => sum + osa.tehtavia, 0)
  return <p>yhteensä {summa} tehtävää</p>
}

export default Kurssi
