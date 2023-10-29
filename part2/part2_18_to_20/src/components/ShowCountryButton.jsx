const ShowCountryButton = ( { showCountryButtonHandler, countryForButton } ) => {

    return (
        <>
        <button onClick={() => showCountryButtonHandler(countryForButton)}>Show Details</button>
        </>
    )
}

export default ShowCountryButton;