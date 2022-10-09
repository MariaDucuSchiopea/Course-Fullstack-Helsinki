import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

function App() {
  const [person, setPerson] = useState([
    { name: 'Bogdan', number: '077-xxx-xxx' },
    { name: 'Maria', number: '077-xxx-xxx' },
    { name: 'Sofia', number: '077-222-xxx' },
    { name: 'Diana', number: '077-111-xxx' },
    { name: 'Mamaie', number: '077-333-xxx' }
  ])
  //console.log(person)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const newPersonObject = {
      name: newName,
      number: newNumber
    }
    const checkName = person.some((el) => el.name === newName)
    //console.log('check', checkName)
    if (newName.length > 0 && newNumber.length > 0) {
      if (!checkName) {
        setPerson(person.concat(newPersonObject))
        setNewName('')
        setNewNumber('')
      } else {
        console.info('name exist')
        alert(`${newName} is already added to phonebook!!!`)
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
        <Persons numbers={personToShow} />
      </header>
    </div>
  )
}

export default App
