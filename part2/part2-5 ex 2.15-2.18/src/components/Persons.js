import React from 'react'
import Person from './Person'

const Persons = ({ numbers, handleDeletePerson }) => {
  return (
    <div>
      <ul>
        <Person
          numbers={numbers}
          handleDeletePerson={handleDeletePerson}
        />
      </ul>
    </div>
  )
}

export default Persons
