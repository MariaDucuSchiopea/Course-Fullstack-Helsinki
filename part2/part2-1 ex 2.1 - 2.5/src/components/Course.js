import React from 'react'

const Course = ({ courses }) => {
  console.log('course component', courses)
  return courses.map((course) => (
    <div key={course.id}>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  ))
}

const Header = ({ course }) => {
  return (
    <div>
      <h3>{course}</h3>
    </div>
  )
}

const Content = ({ parts }) => {
  console.log('part component', parts)

  return parts.map((part) => (
    <div key={part.id}>
      <p>
        {part.name} -- having {part.exercises} exercises
      </p>
    </div>
  ))
}

const Total = ({ parts }) => {
  console.log('total component', parts)

  const result = parts.reduce(
    (sum, course) => sum + parseFloat(course.exercises),
    0
  )

  return (
    <div>
      <h4>Total: {result} exercises</h4>
    </div>
  )
}

export default Course
