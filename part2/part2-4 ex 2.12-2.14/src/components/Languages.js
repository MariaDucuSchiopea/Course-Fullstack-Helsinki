import React from 'react'

const Languages = ({ lang }) => {
  console.log(lang, 'lang')
  const arrLang = Object.values(lang)
  console.log(arrLang, 'languages array')
  //return `Languages: ${Object.values(lang)}`
  return (
    <div>
      <p>Languages:</p>
      <ul>
        {arrLang.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </div>
  )
}

export default Languages
