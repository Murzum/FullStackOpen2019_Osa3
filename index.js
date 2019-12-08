const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

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

    const generateId = (maxId) => {
        return Math.floor(Math.random() * Math.floor(maxId))
    }

    // localhost root
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
      
    // GET ALL
    app.get('/api/persons', (req, res) => {
        res.json(persons)
    })

    // GET person
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

    // DELETE person
    app.delete('/api/persons/:id', (req, res) => {
        const id = Number(req.params.id)
        persons = persons.filter(person => person.id !== id)
        res.status(204).end()
    })


    // POST person  
    app.post('/api/persons', (req, res) => {
        const body = req.body
        
        if (!body.name) {
            return res.status(400).json({ 
            error: 'Name missing!' 
            })
        }
        else if (!body.number) {
            return res.status(400).json({ 
                error: 'Number missing!' 
            })
        }

        const nameexists = persons.find(person => person.name === body.name)
        
        if (!nameexists) {
            const person= {
                name: body.name,
                number: body.number,
                id: generateId(1000000000),
            }
        
            persons = persons.concat(person)
        
            res.json(person)
        }
        else {
            return res.status(400).json({ 
                error: 'Name must be unique!' 
            })
        }
    })

    const PORT = 3001
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })