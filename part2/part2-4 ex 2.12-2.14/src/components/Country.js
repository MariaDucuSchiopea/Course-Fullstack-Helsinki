import React from 'react'

const Country = ({ countries, handleShowOneCountry }) => {
  return countries.map((country) => (
    <div key={country.name.common} id={country.name.common}>
      <h2 style={{ display: 'inline-block' }}>
        {country.name.common}
      </h2>
      <button
        onClick={handleShowOneCountry}
        style={{ display: 'inline-block' }}
      >
        Show
      </button>
    </div>
  ))
}

export default Country
