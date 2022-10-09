import React from 'react'
import Country from './Country'
import Onecountry from './Onecountry'

const Countries = ({
  countries,
  handleShowOneCountry,
  countrySelected
}) => {
  switch (true) {
    case countries.length <= 10 && countries.length !== 1:
      return (
        <div>
          <Country
            countries={countries}
            handleShowOneCountry={handleShowOneCountry}
          />
        </div>
      )
    case countries.length > 10:
      return (
        <div>
          <p>To many matches, specify another filter </p>
        </div>
      )
    case countries.length === 1:
      return <Onecountry countries={countries} />
    default:
      return (
        <div>
          <p>To many matches, specify another filter </p>
        </div>
      )
  }
}

export default Countries
