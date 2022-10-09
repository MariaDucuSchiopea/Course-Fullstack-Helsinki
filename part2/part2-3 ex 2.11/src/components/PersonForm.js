import React from 'react'

const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        Name:{' '}
        <input
          type='text'
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        Number:{' '}
        <input
          type='text'
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      {/* <div>debug: {newName}</div> */}
      <div>
        <button type='submit'>Add</button>
      </div>
    </form>
  )
}

export default PersonForm
