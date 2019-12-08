const express = require('express')
const app = express()

let persons = [
      { 
        "name": "Arto Hellas", 
        "number": "040-123456",
        "id": 1
      },
      { 
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
        "id": 2
      },
      { 
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        "id": 3
      },
      { 
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "id": 4
      },
      { 
        "name": "Jombe", 
        "number": "666",
        "id": 5
      }
    ]


    app.get('/', (req, res) => {
        res.send('<h1>Hello World!</h1>')
      })

    app.get('/info', (req, res) => {

        const notesCount = () =>  persons.length

        const getTimeInfo = () => {

            const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

            const today = new Date()
            const weekday = days[today.getDay()]
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
            const datetime = date+' '+time

            return (weekday + ' ' + datetime)
        }

        res.send( '<h2>Phonebook has info for ' + notesCount() + ' people</h2><h2>Today is: ' + getTimeInfo() + '</h2>' )

    })
      
    app.get('/api/persons', (req, res) => {
        res.json(persons)
    })

    app.get('/api/persons/:id', (req, res) => {
        const id = Number(req.params.id)
        const person = persons.find(person => person.id === id)
        if (person) {
            res.json(person)
        } 
        else {
            res.status(404).end()
        }
    })

    app.delete('/api/persons/:id', (request, response) => {
        const id = Number(request.params.id)
        persons = persons.filter(person => person.id !== id)
        response.status(204).end()
    })
  
    const PORT = 3001
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })