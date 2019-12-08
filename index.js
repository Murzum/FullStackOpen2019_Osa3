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

        const notesCount = () =>  {
            
            return (
                '<h2>Phonebook has info for ' + persons.length + ' people</h2>'           
            )
        }

        const getTimeInfo = () => {

            const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

            const today = new Date()
            const weekday = days[today.getDay()]
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
            const datetime = date+' '+time

            return ('<h2>Today is: ' + weekday + ' ' + datetime + '</h2>')
        }

        res.send( notesCount() + getTimeInfo() )

    })
      
    app.get('/api/persons', (req, res) => {
        res.json(persons)
    })
    
    const PORT = 3001
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })