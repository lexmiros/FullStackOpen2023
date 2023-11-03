import { useEffect, useState } from "react";
import Login from "./components/Login";
import Note from "./components/Note";
import NoteForm from "./components/NoteForm";
import noteService from "./services/notes";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import loginService from "./services/login";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const getAllNotesHook = () => {
    noteService.getAll().then((response) => {
      setNotes(response);
    });
  };

  useEffect(getAllNotesHook, []);

  const [showAll, setShowAll] = useState(false);
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random < 0.5,
    };

    noteService.create(noteObject).then((response) => {
      setNotes(notes.concat(response));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const showAllToggleHandler = () => {
    setShowAll(!showAll);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((note) => note.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((response) => {
        setNotes(notes.map((note) => (note.id != id ? note : response)));
      })
      .catch((error) => {
        setErrorMessage(`Note ${note.content} was already removed from server`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  return (
    <div>
      <h1>Notes +++</h1>
      <Notification message={errorMessage} />
      {user === null && (
        <Login
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )}
      {user !== null && (
        <NoteForm
          addNote={addNote}
          newNote={newNote}
          handleNoteChange={handleNoteChange}
        />
      )}
      <br />
      <button onClick={showAllToggleHandler}>
        Show {showAll ? "Important" : "All"}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <Footer />
    </div>
  );
};

export default App;
