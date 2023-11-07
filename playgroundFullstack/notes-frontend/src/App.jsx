import { useEffect, useState, useRef } from "react";
import Login from "./components/Login";
import Note from "./components/Note";
import NoteForm from "./components/NoteForm";
import noteService from "./services/notes";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import loginService from "./services/login";
import Togglable from "./components/Toggleable";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);
  const noteFormRef = useRef()

  const getAllNotesHook = () => {
    noteService.getAll().then((response) => {
      setNotes(response);
    });
  };

  const checkForLoggedInUser = () => {
    const loggedUserJosn = window.localStorage.getItem("loggedNoteappUser");

    if (loggedUserJosn) {
      const user = JSON.parse(loggedUserJosn);
      setUser(user);
      noteService.setToken(user.token);
    }
  };

  const logout = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    window.location.reload();
  };

  useEffect(getAllNotesHook, []);
  useEffect(checkForLoggedInUser, []);

  const [showAll, setShowAll] = useState(false);
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const createNote = async (noteObject) => {
    noteFormRef.current.toggleVisibility()
    const newNote = await noteService.create(noteObject);
    setNotes(notes.concat(newNote));
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

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));

      setUser(user);
      setUsername("");
      setPassword("");
      noteService.setToken(user.token);
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

  const showLoginHandler = () => {
    const inverseShowLogin = !loginVisible;
    setLoginVisible(inverseShowLogin);
  };

  return (
    <div>
      <h1>Notes +++</h1>
      <Notification message={errorMessage} />
      {!user && (
        <Togglable buttonLabel="login">
          <Login
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </Togglable>
      )}

      {user && (
        <div>
          <p>{user.name} logged in</p>
          <div />
          <Togglable buttonLabel="new note" ref={noteFormRef}>
            <NoteForm createNote={createNote} />
          </Togglable>
          <button onClick={logout}>Logout</button>
        </div>
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
