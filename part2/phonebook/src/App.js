import { useState } from 'react'

const App = () => {
  // STATE VARIABLES //
  const [persons, setPersons] = useState([
    { name: 'Sasha Conger' }
  ])
  const [newName, setNewName] = useState('')


  // FUNCTIONS //
  // When the name input box changes, update newName state
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  
  // When the 'add' button is clicked, add a new name to the 'persons' state object
  const handleAddName = (event) => {
    event.preventDefault()

    const personsObject = {
      name: newName
    }

    // console.log(persons.some(e => e.name === personsObject.name))
    // Check if the person being added already exists
    if (persons.some(e => e.name === personsObject.name)) {
      alert(`${personsObject.name} already exists!`)
      return
    }

    setPersons(persons.concat(personsObject))
    // console.log(persons)
  }


  // COMPONENTS //
  const Numbers = ({persons}) => {
    return (
      <ul>
        {persons.map(person =>
          <li key={person.name}>
            {person.name}
          </li>
        )}
      </ul>
    )
  }

  // const Number = ({persons}) => {
  //   return (
  //     <>
  //       {persons.map(person )}
  //     </>
  //   )
  // }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit" onClick={handleAddName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons}/>
    </div>
  )
}

export default App