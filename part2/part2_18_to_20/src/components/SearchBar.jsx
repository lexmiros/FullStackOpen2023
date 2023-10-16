const SearchBar = ( { countryFilter, countryFilterHandler } ) => {

    return(
        <>
        Find countries <input value={countryFilter} onChange={countryFilterHandler}/>
        </>
    )
}

export default SearchBar;