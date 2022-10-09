import React from 'react'

const Filter = ({ filterName, handleFilterChange }) => {
  return (
    <div>
      Find countries:
      <input
        type='text'
        value={filterName}
        onChange={handleFilterChange}
      />
    </div>
  )
}

export default Filter
