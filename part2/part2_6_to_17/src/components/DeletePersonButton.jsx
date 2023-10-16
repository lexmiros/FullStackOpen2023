const DeletePersonButton = ( {onClickDeletePerson, id} ) => {
    return (
        <>
        <button onClick={() => onClickDeletePerson(id)}>Delete</button>
        </>
    )
}

export default DeletePersonButton