import { useState } from "react";
import Person from "./components/Person";
import AddPerson from "./components/AddPerson";
import SearchFilter from "./components/SearchFilter";

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  
  const [nameFilter, setNameFilter] = useState("")
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("")

  const addPerson = (event) => {
    event.preventDefault();

    const doesNameAlreadyExist = persons.some(
      (person) => person.name === newName
    );

    if (doesNameAlreadyExist) {
      alert(`${newName} is already added to the phonebook`);
      setNewName("")
      return
    }

    const newNameObject = { name: newName, number: newNumber };
    setPersons(persons.concat(newNameObject));
    setNewName(""); 
  };

  const newNameHandler = (event) => {
    setNewName(event.target.value);
  };

  const newNumberHanlder = (event) => {
    setNewNumber(event.target.value)
  }

  const filterNameHandler = (event) => {
    setNameFilter(event.target.value)
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(nameFilter.toLowerCase()))

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <SearchFilter nameFilter={nameFilter} filterNameHandler={filterNameHandler} />
        <AddPerson addPerson={addPerson} newName={newName} newNumber={newNumber} newNameHandler={newNameHandler} newNumberHanlder={newNumberHanlder}/>
        <h2>Numbers</h2>
        <Person persons={personsToShow} />
      </div>
    </>
  );
}

export default App;
