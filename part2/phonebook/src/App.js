import { useState } from 'react'

const App = () => {
  // STATE VARIABLES //
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])
  const [showPersons, setShowPersons] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')


  // FUNCTIONS //
  // When the name input box changes, update newName state
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


  // COMPONENTS //
  const Numbers = ({persons}) => {
    return (
      <ul>
        {persons.map(person =>
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        )}
      </ul>
    )
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with <input 
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </form>
      <h2>Add a New Entry</h2>
      <form>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit" onClick={handleAddName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={showPersons}/>
    </div>
  )
}

export default App