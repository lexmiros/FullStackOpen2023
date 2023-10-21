let phonebookData = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];


const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

morgan.token('req-body', function (req, res) {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
  return '-';
});

const customFormat = ':method :url :status :res[content-length] - :response-time ms :req-body';

app.use(express.static('dist'))
app.use(express.json());
app.use(morgan(customFormat))
app.use(cors())


const PORT =  process.env.PORT || 3001

const createNewMaxId = () => {
    return Math.floor(Math.random() * 1000000000)
}


app.get("/info", (request, response) => {
    const numberOfPhonebookEntries = phonebookData.length;
    const currentDateTime = new Date();

    response.send(
        `Phonebook has info for ${numberOfPhonebookEntries} people <br/>
        ${currentDateTime}
        `
    )

})

app.get("/api/persons", (request, response) => {
    response.json(phonebookData)
})

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const person = phonebookData.find(entry => entry.id === id)

    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    phonebookData = phonebookData.filter(entry => entry.id !== id)

    response.status(204).end()
})

app.post("/api/persons", (request, response) => {
    const newEntry = request.body
    const isNameUnique = phonebookData.some(entry => entry.name === newEntry.name)
    
    const id = createNewMaxId()
    newEntry.id = id

    phonebookData = phonebookData.concat(newEntry)

    response.json(newEntry)

})


app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`)
})

