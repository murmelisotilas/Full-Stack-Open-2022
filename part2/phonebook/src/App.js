import { useState, useEffect } from 'react'
import './index.css'
import React from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Person from './components/Person'
import fileService from './services/communication'
import Notification from './services/Notification'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)
  const [message, setMessage] = useState(null)
  const [state, setState] = useState(1)
  

  


  useEffect(() => {
    fileService
      .getAll()
      .then((initialPersons) => {
        console.log('received')
        setPersons(initialPersons)
        setPersonsToShow(initialPersons)
      })
  }, [])


  const handleDeletion = (id, name) => {
    if (window.confirm(`Delete ${name}`)){
      fileService
        .deletion(id)
        .then((response) => {
          const updatePersons = persons.filter((person) => person.id !== id)
          setPersons(updatePersons)
          setPersonsToShow(updatePersons)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewPerson(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const currentPerson = persons.filter((person) => person.name === newPerson);

    const nameObject = {
      name: newPerson,
      number: newNumber,
    }

    if (currentPerson.length === 0) {
      
      fileService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setPersonsToShow(persons.concat(returnedPerson))
          setState(1)
          setMessage(`Added ${newPerson}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch((error) => {
          setState(0)
          setMessage(`${newPerson} was already removed from the server`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    } 
    else {
      if(window.confirm(`${newPerson} is already added to phonebook, replace the old number with a new one`)){
        fileService
          .update(currentPerson[0].id, nameObject)
          .then((response) => {
            setPersons(persons.map((person) =>
            person.id !== response.id ? person : response
          ))
            setPersonsToShow(persons.map((person) =>
            person.id !== response.id ? person : response
          ))
          })
          .catch((error) => {
            setState(0)
            setMessage(`${newPerson} was already removed from the server`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
      })
    }
  }
    setNewPerson('')
    setNewNumber('')
  }

  const Filtration = (event) => {
    setFilter(event.target.value)
    setPersonsToShow(persons.filter((person) => person.name.toLowerCase().includes(event.target.value)))
  }


  return (
    <div>
      <Notification message={message} state={state}/> 
      <h2>Phonebook</h2>
       <Filter filter={filter} Filtration= {Filtration}/>
      <h2>add a new</h2>
      <PersonForm 
      addPerson={addPerson} 
      newPerson={newPerson} 
      handleNameChange={handleNameChange} 
      newNumber={newNumber} 
      handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Person personsToShow={personsToShow} handleDeletion={handleDeletion}/>
    </div>
  )
}

export default App