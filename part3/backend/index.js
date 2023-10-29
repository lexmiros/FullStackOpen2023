require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
const { default: mongoose } = require("mongoose");
const app = express();
const PORT = process.env.PORT;

morgan.token("req-body", function (req, res) {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return "-";
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({error: "Incorrect ID format"})
  }

  if (error.name === "ValidationError") {
    return response.status(400).send({error: error.message})
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({error : "Unknown endpoint"})
}


const customFormat =
  ":method :url :status :res[content-length] - :response-time ms :req-body";

app.use(express.static("dist"));
app.use(express.json());
app.use(morgan(customFormat));
app.use(cors());

app.get("/info", (request, response, next) => {
  const currentDateTime = new Date();
  Person.find({})
    .then(persons => {
      response.send(`There are currently ${persons.length} people as of ${currentDateTime}`)
    })
    .catch(error => next(error))
});

app.get("/api/persons", (request, response) => {
  Person.find({}).
    then(people => {
      response.json(people)
    })
    .catch(error => next(error))
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id

  Person.findById(request.params.id)
  .then(person => {
    if (person) {
      response.json(person)
    } else {
      console.log(`Unable to find person with ID ${request.params.id}`)
      response.status(404).json({error:`404 No person with id ${request.params.id} found`})
    }
  })
  .catch(error => next(error))
  
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id

  Person.findByIdAndDelete(id)
    .then(deletedPerson => {
      console.log(`Person with id ${id} deleted`)
      response.status(204).end();
    })
    .catch(error => next(error))
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      response.status(201).json(savedPerson)
    })
    .catch(error => next(error))
});

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    {name, number},
    {new: true, runValidators: true, context: "query"}
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`);
});
