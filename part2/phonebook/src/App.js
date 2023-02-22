import { useState, useEffect } from 'react'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import Numbers from './components/Numbers.js'

import axios from 'axios'

import personService from './services/persons.js'
import PersonEntry from './components/PersonEntry.js'

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
    console.log(currentSearch)
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
      number: newNumber
    }

    // Check if the person being added already exists
    if (persons.some(e => e.name === personObject.name)) {
      const overwriteNumberConfirmed = window.confirm(`${personObject.name} already exists. Replace the old number with a new one?`)

      if(overwriteNumberConfirmed) {
        const overwrittenPerson = persons.find(person => person.name === personObject.name)
        console.log(overwrittenPerson.name)

        // UPDATE THE PERSON WITH A NEW PHONENUMBER
        personService
          .update(overwrittenPerson.id, personObject)
          .then(newPerson => {
            console.log(newPerson)
            const newPersons = persons.filter(person => person.id !== newPerson.id).concat(newPerson)
            setPersons(newPersons)
            setShowPersons(newPersons)
            setSearch('')
          })
        return
      }
    }
    else if (persons.some(e => e.number === personObject.number)) {
      alert(`The number ${personObject.number} already exists!`)
      return
    }
    else {
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
  }


  const handleDeleteName = (id) => {
    const personBeingDeleted = persons.find(person => person.id === id)
    const deleteConfirmed = window.confirm(`Are you sure you wish to delete ${personBeingDeleted.name}?`)

    if(deleteConfirmed) {
      console.log(`Delete ${id}`)
      personService
        .deletePerson(id)
        .then(response => {
          console.debug(response)
          // New obj array with all persons except person with deleted ID
          const newPersons = persons.filter(person => person.id !== id)
          setPersons(newPersons)
          setShowPersons(newPersons)
        })
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearchChange={handleSearchChange} />
      
      <h2>Add a New Entry</h2>
      <PersonForm nameValue={newName} handleNameChange={handleNameChange} numberValue={newNumber} handleNumberChange={handleNumberChange} handleAddName={handleAddName} />

      <h2>Numbers</h2>
      <ul>
        {showPersons.map(person =>
              <PersonEntry
                key={person.id}
                person={person}
                deletePerson={() => handleDeleteName(person.id)}
              />
        )}
      </ul>
    </div>
  )
}

export default App