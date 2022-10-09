const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(cors())

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(
  morgan(
    ':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'
  )
)

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122'
  }
]

app.use(express.json())

const generateId = () => {
  const maxId = Math.floor(Math.random() * 100000)
  // persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0
  return maxId
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  const checkName = persons.some((p) => p.name === body.name)

  if (!checkName) {
    if (!body.name) {
      return response.status(400).json({
        error: 'name missing'
      })
    }

    if (!body.number) {
      return response.status(400).json({
        error: 'number missing'
      })
    }

    const person = {
      id: generateId(),
      name: body.name,
      number: body.number
    }

    persons = persons.concat(person)

    response.json(person)
  } else {
    return response.status(400).json({
      error: 'name already exist'
    })
  }
})

app.put('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const updatedPerson = {
    id: id,
    name: body.name,
    number: body.number
  }
  persons = persons.map((p) => (p.id !== id ? p : updatedPerson))

  response.status(204).end()
})

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const peopleNumber = Number(persons.length)
  const infoDate = new Date()
  response.send(
    `<h1>Phonebook has info for ${peopleNumber} people</h1><p>${infoDate}</p>`
  )
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((p) => p.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((p) => p.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`)
})
