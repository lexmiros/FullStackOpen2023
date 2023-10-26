const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? "Change note to not-important"
    : "Change note to important"
  return (
    <li className="note">
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note