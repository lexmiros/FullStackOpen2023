import DeletePersonButton from "./DeletePersonButton"

const Person = ( {persons, onClickDeletePerson} ) => {

    return(
        <div>
        {persons.map(person =>
          <div key={person.name}>{person.name} : {person.number} <DeletePersonButton onClickDeletePerson={onClickDeletePerson} 
          id={person.id}/></div> 
        )}
        </div>
    )
}

export default Person