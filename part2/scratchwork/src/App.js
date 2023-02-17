// Stopped at "You did remember to install React devtools, right?"
import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)


  // FUNC:  TOGGLE IMPORTANCE OF A NOTE.
  // Passed to the <Note> component.
  const toggleImportanceOf = (id) => {
    // Define the unique URL of each note via its id.
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    // Create a new object from the original note and overwrite the 
    // 'important' property by assigning it again.
    const changedNote = { ...note, important: !note.important }

    // HTTP PUT replaces an entire note with a new note.
    axios
      .put(url, changedNote)
      .then(response => {
        // Create a new array by mapping every item from the old array into an item in the new array. If note.id !== id is true, we copy the item from the old array into the new array. If false, then the note object returned by the server is added to the array instead.
        setNotes(notes.map(n => n.id !== id ? n : response.data))
      })
    console.debug(`Importance of ${id} is toggled`)
  }


  // FUNC:  LOAD INITIAL NOTES FROM db.json FILE ON SERVER
  // The hook is executed as an effect with useEffect
  const hook = () => {
    // HTTP GET NOTES FROM db.json
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.debug("Axios response from loading initial notes:", response)
        setNotes(response.data)
      })
  }
  useEffect(hook, []) // Effects occur once at the end of rendering


  // FUNC:  ADD NOTE ON CLICK 'save' BUTTON
  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    // HTTP POST NEW NOTE INTO db.json
    axios
      .post('http://localhost:3001/notes', noteObject)
      .then(response => {
        console.debug("Axios response from adding note:", response)
        setNotes(notes.concat(noteObject))
        setNewNote('')
      })
  }


  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }


  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)


  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
          
          />
        )}
      </ul>
      <form onSubmit={addNote}> 
        <input 
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App