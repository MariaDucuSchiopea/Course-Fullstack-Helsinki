import React from 'react'
import Person from './Person'

const Persons = ({ numbers }) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th width='150' style={{ textAlign: 'left' }}>
              Name
            </th>
            <th width='150' style={{ textAlign: 'left' }}>
              Number
            </th>
          </tr>
          <Person numbers={numbers} />
        </tbody>
      </table>
    </div>
  )
}

export default Persons
