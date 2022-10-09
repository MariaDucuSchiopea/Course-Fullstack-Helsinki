import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/person'

function App() {
  const [person, setPerson] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons').then((response) => {
      console.log('promise fulfilled')
      setPerson(response.data)
    })
  }, [])
  console.log('render', person.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    const newPersonObject = {
      name: newName,
      number: newNumber
    }
    const checkName = person.some((el) => el.name === newName)

    if (newName.length > 0 && newNumber.length > 0) {
      if (!checkName) {
        personService
          .create(newPersonObject)
          .then((returnedPerson) =>
            setPerson(person.concat(returnedPerson))
          )
        setNewName('')
        setNewNumber('')
      } else {
        const id = person.find((p) => p.name === newName).id
        console.log('update id', id)
        if (
          window.confirm(
            `Person ${newName} already exist, update the number?`
          )
        ) {
          personService
            .update(id, newPersonObject)
            .then((returnedPerson) =>
              setPerson(
                person.map((p) => (p.id !== id ? p : returnedPerson))
              )
            )
          setNewName('')
          setNewNumber('')
        }
      }
    } else {
      alert(`Enter a name and number`)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

  const handleDeletePerson = (event) => {
    if (window.confirm('Do you want to delete?')) {
      const personid = parseInt(event.currentTarget.id)
      console.log(personid, 'person id')
      personService.deletePerson(personid)
      const arrFiltered = person.filter((p) => p.id !== personid)
      console.log(arrFiltered, 'arr filtered')
      setPerson(arrFiltered)
    }
  }

  const personToShow = person.filter((one) =>
    one.name.toLowerCase().includes(filterName)
  )

  return (
    <div className='App'>
      <header className='App-header'>
        <h2>Phonebook</h2>
        <h3>Filter</h3>
        <Filter
          filterName={filterName}
          handleFilterChange={handleFilterChange}
        />
        <h3>Add a new contact person</h3>
        <PersonForm
          addPerson={addPerson}
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
        />
        <h3>Numbers</h3>
        <Persons
          numbers={personToShow}
          handleDeletePerson={handleDeletePerson}
        />
      </header>
    </div>
  )
}

export default App
