import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'

function App() {
  const [country, setCountries] = useState([])
  const [filterName, setFilterName] = useState('')
  const [filteredCountry, setFilteredCountry] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    const fcy = country.filter((one) =>
      one.name.common.includes(filterName)
    )
    //console.log(fcy, 'includes')
    setFilteredCountry(fcy)
  }, [filterName])

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

  const handleShowOneCountry = (event) => {
    console.log(event.currentTarget.parentElement.id, 'event target')
    setFilterName(event.currentTarget.parentElement.id)
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <h3>Filter</h3>
        <Filter
          filterName={filterName}
          handleFilterChange={handleFilterChange}
        />
        <Countries
          countries={filteredCountry}
          handleShowOneCountry={handleShowOneCountry}
        />
      </header>
    </div>
  )
}

export default App
