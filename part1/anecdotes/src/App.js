import { useState } from 'react'


function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}


const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)

  // Array to store points, created same size as anecdotes, filled with 0's
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0, 0, anecdotes.length))

  return (
    <div>
      <h2>Anecdote of the day</h2> 
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>

      <Button text="vote" handleClick={() => {
          const newPoints = [...points]
          newPoints[selected] += 1
          setPoints(newPoints)
        }
      } />

      <Button text="next anecdote"  handleClick={() => setSelected(getRandomIntInclusive(0,anecdotes.length-1))} />

      <h2>Anecdote with the most votes</h2>
      <div>{anecdotes[points.indexOf(Math.max(...points))]}</div>

    </div>

  )
}

export default App