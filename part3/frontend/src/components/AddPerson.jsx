const AddPerson = ( {addPerson, newName, newNumber, newNameHandler, newNumberHanlder} ) => {

  return (
    <>
      <h2>Add a new person</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={newNameHandler} />
        </div>
        <div>
          number: <input value={newNumber} onChange={newNumberHanlder}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
    </>
  )
}

export default AddPerson;