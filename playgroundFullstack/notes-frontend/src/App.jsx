import { useEffect, useState } from "react";
import axios from "axios";


import Note from "./components/Note"
import noteService from "./services/notes"
import Notification from "./components/Notification";
import Footer from "./components/Footer";

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("")
  const [errorMessage, setErrorMessage]= useState(null)

  const getAllNotesHook =  () => {
    noteService
      .getAll()
      .then(response => {
        setNotes(response)
      })
  }
  
  useEffect(getAllNotesHook, [])


  console.log("render", notes.length, "notes")

  const [showAll, setShowAll] = useState(false)
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random < 0.5,
    }

    noteService
      .create(noteObject)
      .then(response => {
        setNotes(notes.concat(response))
        setNewNote("")
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const showAllToggleHandler = () => {
    setShowAll(!showAll)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(note => note.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then(response => {
        setNotes(notes.map(note => note.id != id ? note : response))
      })
      .catch(error => {
        setErrorMessage (
          `Note ${note.content} was already removed from server`
        )
        setTimeout (() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  return (
    <div>
      <h1>Notes ++</h1>
      <Notification message={errorMessage}/>
      <button onClick={showAllToggleHandler}>Show {showAll ? "Important" : "All"}</button>
      <ul>
        {notesToShow.map(note => (
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
