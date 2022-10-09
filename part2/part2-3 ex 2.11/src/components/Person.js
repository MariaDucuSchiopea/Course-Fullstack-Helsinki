import React from 'react'

const Person = ({ numbers }) => {
  return numbers.map((person) => (
    <tr key={person.name}>
      <td width='150'>{person.name}</td>
      <td width='150'>{person.number}</td>
    </tr>
  ))
}

export default Person
