const SearchFilter = ( {nameFilter, filterNameHandler} ) => {
    return (
        <>
        <div>
          Filter by name: <input value={nameFilter} onChange={filterNameHandler}/>
        </div>
        </>
    )
}

export default SearchFilter;