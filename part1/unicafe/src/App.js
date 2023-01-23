import { useState } from 'react'

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = ({text, count}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{count}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  let average = (good+neutral+bad)/3
  let positive = good/(good+neutral+bad)*100

  return(
    <table>
      <tbody>
        <StatisticLine text="good" count={good} />
        <StatisticLine text="neutral" count={neutral} />
        <StatisticLine text="bad" count={bad} />
        <StatisticLine text="all" count={good+neutral+bad} />
        <StatisticLine text="average" count={average} />
        <StatisticLine text="positive" count={positive + '%'} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // Function to increment a counter using a setState function
  const increaseByOne = (currentCount, setFunction) => {
    // console.log("Increased ", currentCount, " by one")
    let newCount = currentCount + 1
    setFunction(newCount)
  }

  // If no feedback is given
  if(good+neutral+bad == 0) {
    return (
      <div>
        <h2>give feedback</h2>
        <Button text="good" handleClick={() => increaseByOne(good, setGood)} />
        <Button text="neutral" handleClick={() => increaseByOne(neutral, setNeutral)} />
        <Button text="bad" handleClick={() => increaseByOne(bad, setBad)} />
        <h2>statistics</h2>
        <div>No feedback given</div>
      </div>
    )
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button text="good" handleClick={() => increaseByOne(good, setGood)} />
      <Button text="neutral" handleClick={() => increaseByOne(neutral, setNeutral)} />
      <Button text="bad" handleClick={() => increaseByOne(bad, setBad)} />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App