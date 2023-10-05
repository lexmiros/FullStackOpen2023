import { useEffect, useState } from "react";
import axios from "axios"

import Person from "./components/Person";
import AddPerson from "./components/AddPerson";
import SearchFilter from "./components/SearchFilter";

function App() {
  const [persons, setPersons] = useState([])
  const [nameFilter, setNameFilter] = useState("")
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("")

  const getPersonsHook = () => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(getPersonsHook, [])

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
