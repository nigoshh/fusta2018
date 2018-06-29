import React from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'

const App = ({ store }) =>
  <div>
    <AnecdoteList store={store} />
    <AnecdoteForm store={store} />
  </div>

export default App
