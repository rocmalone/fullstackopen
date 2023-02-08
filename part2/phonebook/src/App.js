import { useState, useEffect } from 'react'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import Numbers from './components/Numbers.js'

import axios from 'axios'

const App = () => {
  // STATE VARIABLES //
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456', id: 1 },
  //   { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  //   { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  // ])
  const [persons, setPersons] = useState([])
  const [showPersons, setShowPersons] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  // EFFECT
  const hook = () => {
    console.log('effect run')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        setShowPersons(response.data)
      })
  }
  
  useEffect(hook, [])


  // EVENT HANDLERS //

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    const currentSearch = event.target.value
    console.log(event.target.value)
    setSearch(currentSearch)

    // Persons to show, ignoring search case
    const newShowPersons = persons.filter(person => person.name.toLowerCase().includes(currentSearch.toLowerCase()) === true)

    console.log(newShowPersons)
    setShowPersons(newShowPersons)

    
  }
  
  // When the 'add' button is clicked, add a new name to the 'persons' state object
  const handleAddName = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    // console.log(persons.some(e => e.name === personsObject.name))
    // Check if the person being added already exists
    if (persons.some(e => e.name === personObject.name)) {
      alert(`${personObject.name} already exists!`)
      return
    }
    else if (persons.some(e => e.number === personObject.number)) {
      alert(`The number ${personObject.number} already exists!`)
      return
    }

    setPersons(persons.concat(personObject))
    setShowPersons(persons.concat(personObject))
    setSearch('')
    console.log(persons)
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