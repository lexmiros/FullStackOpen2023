import { useEffect, useState } from "react";

import Person from "./components/Person";
import AddPerson from "./components/AddPerson";
import SearchFilter from "./components/SearchFilter";
import phonebook from "./services/phonebook";
import Notification from "./components/Notification";

function App() {
  const [persons, setPersons] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [personsToShow, setPersonsToShow] = useState([...persons]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [popupMessages, setPopupMessages] = useState(null);
  const [popupMessagesType, setPopupMessagesType] = useState("message");

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
          setPopupMessagesType("message");
          setPopupMessages(`Added ${response.name}`);
          setTimeout(() => {
            setPopupMessages(null);
          }, 5000);
        })
        .catch((error) => {
          setPopupMessagesType("error");
          setPopupMessages(error.response.data.error);
          setTimeout(() => {
            setPopupMessages(null);
          }, 5000);
        });
      return;
    }

    const newNameObject = { name: newName, number: newNumber };
    
    phonebook
      .addPerson(newNameObject)
      .then((response) => {
        setPersons(persons.concat(response));
        setPersonsToShow(persons.concat(response));
        setNewName("");
        setNewNumber("");
        setPopupMessagesType("message");
        setPopupMessages(`Added ${response.name}`);
        setTimeout(() => {
          setPopupMessages(null);
        }, 5000);
      })
      .catch((error) => {
        setPopupMessagesType("error");
        setPopupMessages(error.response.data.error);
        setTimeout(() => {
          setPopupMessages(null);
        }, 5000);
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
    const personToDelete = persons.filter((person) => person.id === id);
    const personToDeleteName = personToDelete[0].name;
    phonebook
      .deletePerson(id)
      .then(() => {
        const updatedPersons = persons.filter((person) => person.id !== id);
        setPersons(updatedPersons);
        setPersonsToShow(updatedPersons);
      })
      .catch((error) => {
        const updatedPersons = persons.filter((person) => person.id !== id);
        setPersons(updatedPersons);
        setPersonsToShow(updatedPersons);
        setPopupMessagesType("error");
        setPopupMessages(
          `Information of ${personToDeleteName} has already been removed from the server`
        );
        setTimeout(() => {
          setPopupMessages(null);
        }, 5000);
      });
  };

  useEffect(getPersonsHook, []);

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <Notification message={popupMessages} type={popupMessagesType} />
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
