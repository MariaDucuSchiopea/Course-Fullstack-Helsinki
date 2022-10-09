import React from 'react'

const Person = ({ numbers, handleDeletePerson }) => {
  return numbers.map((person) => (
    <li key={person.id}>
      {person.name} {person.number}{' '}
      <button id={person.id} onClick={handleDeletePerson}>
        Delete
      </button>
    </li>
  ))
}

export default Person
