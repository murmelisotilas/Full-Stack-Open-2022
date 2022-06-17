import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'


import { useState } from 'react'
import { About } from './components/About'
import { AnecdoteList } from './components/AnecdoteList'
import { Footer } from './components/Footer'
import { CreateNew } from './components/CreateNew'
import { SpesifiedAnecdote } from './components/Anecdote'



const App = () => {
  const [notification, setNotification] = useState('')
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  
  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

const padding = {
  paddingRight: 5
};

  return (
    <Router>
      <h1>Software anecdotes</h1>
      <div>
        <Link style={padding} to="/">anecdotes</Link>
        <Link style={padding} to="/create">create new</Link>
        <Link style={padding} to="/about">about</Link>
      </div>

      <Routes>

        <Route path="/:id" element={<SpesifiedAnecdote anecdotes={anecdotes}/>} />
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes}/>} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <div>
        <Footer/>
      </div> 
    </Router>
  )
}

export default App
