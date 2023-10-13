import { useEffect, useState } from "react";

import Person from "./components/Person";
import AddPerson from "./components/AddPerson";
import SearchFilter from "./components/SearchFilter";
import phonebook from "./services/phonebook";

function App() {
  const [persons, setPersons] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [personsToShow, setPersonsToShow] = useState([...persons]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  //Get all people for the phonebook
  const getPersonsHook = () => {
    const callResponse = phonebook.getAll();
    callResponse.then((response) => {
      setPersons(response);
      setPersonsToShow(response);
    });
  };

  //Add someone to the phonebook
  const addPerson = (event) => {
    event.preventDefault();

    const doesNameAlreadyExist = persons.some(
      (person) => person.name === newName
    );

    if (doesNameAlreadyExist) {
      const existingPersonObject = persons.find(
        (person) => person.name === newName
      );
      const updatedExistingPersonObject = {
        ...existingPersonObject,
        number: newNumber,
      };
      console.log(updatedExistingPersonObject);
      const updatedNumberConfirmation = window.confirm(
        `${newName} is already added to the phonebook, replace their old number with a new one?`
      );

      if (!updatedNumberConfirmation) {
        setNewName("");
        setNewNumber("");
        return;
      }

      phonebook
        .updatePhoneNumber(
          updatedExistingPersonObject.id,
          updatedExistingPersonObject
        )
        .then((response) => {
          setPersons(
            persons.map((person) =>
              person.id !== response.id ? person : response
            )
          );
          setPersonsToShow(
            persons.map((person) =>
              person.id !== response.id ? person : response
            )
          );
          setNewName("");
          setNewNumber("");
        });
      return;
    }

    const newNameObject = { name: newName, number: newNumber };
    phonebook.addPerson(newNameObject).then((response) => {
      setPersons(persons.concat(response));
      setPersonsToShow(
        persons.concat(response)
      );
      setNewName("");
      setNewNumber("");
    });
  };

  const newNameHandler = (event) => {
    setNewName(event.target.value);
  };

  const newNumberHanlder = (event) => {
    setNewNumber(event.target.value);
  };

  const filterNameHandler = (event) => {
    const filterValue = event.target.value.toLowerCase();
    setNameFilter(filterValue);
    const newPersonsToShow = persons.filter((person) =>
      person.name.toLowerCase().includes(filterValue)
    );

    setPersonsToShow(newPersonsToShow);
  };

  const onClickDeletePerson = (id) => {
    phonebook.deletePerson(id)
      .then(() => {
        const updatedPersons = persons.filter(person => person.id !== id);
        setPersons(updatedPersons);
        setPersonsToShow(updatedPersons);
      })
      .catch(error => {
        console.error("Error deleting person:", error);
      });
  }
  
  useEffect(getPersonsHook, []);

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <SearchFilter
          nameFilter={nameFilter}
          filterNameHandler={filterNameHandler}
        />
        <AddPerson
          addPerson={addPerson}
          newName={newName}
          newNumber={newNumber}
          newNameHandler={newNameHandler}
          newNumberHanlder={newNumberHanlder}
        />
        <h2>Numbers</h2>
        <Person
          persons={personsToShow}
          onClickDeletePerson={onClickDeletePerson}
        />
      </div>
    </>
  );
}

export default App;
