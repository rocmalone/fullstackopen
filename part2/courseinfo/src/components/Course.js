const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => {
  return (
    <p style={{ fontWeight: 'bold' }}>total of {sum} exercises</p>
  )
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
} 


const Content = ({ parts }) => {
  const initialValue = 0
  const total = parts.reduce((accumulator, currentPart) => {
    // console.log("Sum: ", accumulator, "Part: ", currentPart.exercises)
    return accumulator + currentPart.exercises
  }, initialValue)

  return (
    <div>
      {parts.map(part => 
          <Part key={part.id} part={part}/>
      )}

      <Total sum={total}/>

    </div>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </>
  )
}

export default Course