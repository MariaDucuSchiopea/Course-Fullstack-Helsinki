import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import Languages from './Languages'

const Onecountry = ({ countries }) => {
  console.log(countries, 'one country - countries')
  const [oneCountry] = countries
  const [weather, setWeather] = useState([])
  const [description, setDescription] = useState('')
  const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${oneCountry.capital}&limit=5&appid=${process.env.REACT_APP_API_KEY}`

  const obtainWeather = async (url) => {
    try {
      const weatherData = await axios.get(url)
      if (weatherData) {
        console.log(weatherData, 'weather data')
        setWeather(weatherData.data.main)
        setDescription(weatherData.data.weather[0])
      } else {
        setWeather([])
      }
    } catch (error) {
      console.log('Eroare', error.response)
    }
  }

  useEffect(() => {
    obtainWeather(weatherUrl)
  }, [])

  const temperature = (weather.temp - 273.15).toFixed(2)
  const imageUrl = `http://openweathermap.org/img/wn/${description.icon}@2x.png`

  return (
    <div>
      <h2>{oneCountry.name.common}</h2>
      <p>Capital: {oneCountry.capital}</p>
      <p>Area: {oneCountry.area}</p>
      <Languages lang={oneCountry.languages} />
      <p style={{ fontSize: '150px', margin: '0' }}>
        {oneCountry.flag}
      </p>
      <h3>Weather</h3>
      <p>Temperature {temperature} Celsius</p>
      <p>Description: {description.description}</p>
      <img alt='icon' src={imageUrl} width='100' height='100' />
    </div>
  )
}

export default Onecountry
