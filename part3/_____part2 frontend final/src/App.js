import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/person'
import Notification from './components/Notification'
import './index.css'

function App() {
  const [person, setPerson] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorMesageType, setErrorMessageType] = useState('success')

  useEffect(() => {
    console.log('effect')
    axios.get('/api/persons').then((response) => {
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
          .then((returnedPerson) => {
            setPerson(person.concat(returnedPerson))
            setErrorMessage(
              `Person ${newName} was added to the phonebook`
            )
            setErrorMessageType('success')
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch((error) => {
            setErrorMessage(error.response.data.error)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
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
            .then((returnedPerson) => {
              setPerson(
                person.map((p) => (p.id !== id ? p : returnedPerson))
              )
              setErrorMessage(
                `Person ${newName} - updated number to ${newNumber}`
              )
              setErrorMessageType('success')
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)

              setNewName('')
              setNewNumber('')
            })
            .catch((error) => {
              setErrorMessage(error.response.data.error)
              setErrorMessageType('success')
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            })
        }
      }
    } else {
      setErrorMessage(`Enter a name and a number`)
      setErrorMessageType('fail')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
      const personid = event.currentTarget.id
      const personNameDeleted = person.find((x) => x.id === personid)
      console.log(personid, 'person id')
      personService.deletePerson(personid)
      const arrFiltered = person.filter((p) => p.id !== personid)
      console.log(arrFiltered, 'arr filtered')
      setPerson(arrFiltered)
      setErrorMessage(
        `Person ${personNameDeleted.name} was deleted from the phonebook`
      )
      setErrorMessageType('fail')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const personToShow = person.filter((one) =>
    one.name.toLowerCase().includes(filterName)
  )

  return (
    <div className='App'>
      <header className='App-header'>
        <h2>Phonebook</h2>
        <Notification
          message={errorMessage}
          messageType={errorMesageType}
        />
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
