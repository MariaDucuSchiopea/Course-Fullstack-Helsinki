const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  const { parts } = props
  console.log('content component', parts)

  return (
    <div>
      <h1>Courses:</h1>
      <h3>
        <Part parts={parts} />
      </h3>
    </div>
  )
}

const Part = ({ parts }) => {
  console.log('part component', parts)

  return parts.map((course) => (
    <div key={course}>
      <p>
        {course.pname} -- having {course.exercises} exercises
      </p>
    </div>
  ))
}

const Total = ({ parts }) => {
  let res = Number(0)
  console.log('total component', parts)

  const sum = parts.map((course) => {
    console.log('total exe', course.exercises)
    res += parseFloat(course.exercises)
    console.log('res', res)
    return res
  })

  return (
    <div>
      <h1>Total: {res} exercises</h1>
    </div>
  )
}

function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { pname: 'Fundamentals of React', exercises: 10 },
      { pname: 'Using props to pass data', exercises: 7 },
      { pname: 'State of a component', exercises: 14 }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
