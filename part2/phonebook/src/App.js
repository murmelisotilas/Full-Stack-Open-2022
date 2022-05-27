import { useState, useEffect } from 'react'
import React from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Person from './components/Person'
import fileService from './services/communication'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)

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
        .catch((error) => alert(error.response.data.error))
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

    if (currentPerson.length === 0) {
      const nameObject = {
        name: newPerson,
        number: newNumber,
      }
      fileService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setPersonsToShow(persons.concat(returnedPerson))
        })
        .catch((error) => alert(error.response.data.error))
    } 
    else {
      alert(`${newPerson} is already added to phonebook`)
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