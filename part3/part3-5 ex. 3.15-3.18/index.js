const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()
const Person = require('./models/person')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(
  morgan(
    ':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'
  )
)

app.use(express.json())
app.use(requestLogger)

app.use(cors())
app.use(express.static('build'))

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'name missing' })
  }

  // if (Person.findById(request.params.id)) {
  //   console.log('name exist', response)
  //   app.put('/api/persons/:id', (request, response, next) => {
  //     const body = request.body

  //     const person = {
  //       name: body.name,
  //       number: body.number
  //     }

  //     Person.findByIdAndUpdate(request.params.id, person, {
  //       new: true
  //     })
  //       .then((updatedPerson) => {
  //         response.json(updatedPerson)
  //       })
  //       .catch((error) => next(error))
  //   })
  // } else {
  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then((savedPerson) => {
    response.json(savedPerson)
  })
  //}
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

app.get('/info', async (request, response) => {
  try {
    const number = await Person.estimatedDocumentCount()
    console.log(number)
    const infoDate = new Date()
    response.send(
      `<h1>Phonebook has info for ${number}  people</h1><p>${infoDate}</p>`
    )
  } catch (error) {
    throw error
  }
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`)
})
