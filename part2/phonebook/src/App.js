import { useState, useEffect } from 'react'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import Numbers from './components/Numbers.js'

import axios from 'axios'

import personService from './services/persons.js'

const App = () => {
  // STATE VARIABLES //

  const [persons, setPersons] = useState([])
  const [showPersons, setShowPersons] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  // LOAD INITIAL DATA FROM SERVER
  useEffect( () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setShowPersons(initialPersons)
      })
  }, [])


  // --- EVENT HANDLERS ---
  // SYNCHRONIZE NAME TEXT FIELD AND STATE VARIABLE
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // SYNCHRONIZE NUMBER TEXT FIELD AND STATE VARIABLE
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  // SYNCHRONIZE SEARCH TEXT FIELD AND STATE VARIABLE
  // PERFORM SEARCH FUNCTIONALITY
  const handleSearchChange = (event) => {
    const currentSearch = event.target.value
    setSearch(currentSearch)

    // Search functionality
    const newShowPersons = persons.filter(person => person.name.toLowerCase().includes(currentSearch.toLowerCase()) === true)

    setShowPersons(newShowPersons)    
  }
  


  const handleAddName = (event) => {
    event.preventDefault() // Prevent page refresh

    // Create the new person object to have the name and number corresponding to the state vars (which are sync'd with text fields)
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    // Check if the person being added already exists
    if (persons.some(e => e.name === personObject.name)) {
      alert(`${personObject.name} already exists!`)
      return
    }
    else if (persons.some(e => e.number === personObject.number)) {
      alert(`The number ${personObject.number} already exists!`)
      return
    }

    // CREATE NEW PERSON OBJECT ON SERVER
    personService
      .create(personObject)
      // Update the state var with the new person
      // NOTE: this .then only executes if the promise was fulfilled
      // The post request in personService.create() returns the single new person object
      .then(newPerson => {
        console.log(newPerson)
        setPersons(persons.concat(newPerson))
        setShowPersons(persons.concat(newPerson))
        setSearch('')
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearchChange={handleSearchChange} />
      
      <h2>Add a New Entry</h2>
      <PersonForm nameValue={newName} handleNameChange={handleNameChange} numberValue={newNumber} handleNumberChange={handleNumberChange} handleAddName={handleAddName} />

      <h2>Numbers</h2>
      <Numbers persons={showPersons}/>
    </div>
  )
}

export default App