import React from 'react'

const Filter = ({ filterName, handleFilterChange }) => {
  return (
    <div>
      Search for name:
      <input
        type='text'
        value={filterName}
        onChange={handleFilterChange}
      />
    </div>
  )
}

export default Filter
