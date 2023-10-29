const Country = ( { countries } ) => {
    if (countries.length !== 1) {
        return null
    }

    const foundCountry = countries[0]
    const languages = Object.values(foundCountry.languages)

    return (
        <div>
        <h1>{foundCountry.name.common}</h1><br/>
        Capital : {foundCountry.capital}<br/>
        Area : {foundCountry.area}<br/><br/>
        <h3>Languages:</h3>
        <ul>
           {languages.map(language =>
                <li key={language}>
                    {language}
                </li>
            )}
        </ul>
        <img src={foundCountry.flags.png} />
        <h1>Weather in {foundCountry.capital}</h1>
        </div>
    )
}

export default Country;