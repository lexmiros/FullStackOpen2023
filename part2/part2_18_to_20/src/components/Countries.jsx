import ShowCountryButton from "./ShowCountryButton";

const Countries = ({ countries, showCountryForButtonHandler }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specificy another filter.</div>;
  }

  if (countries.length === 1) {
    return null;
  }

  return (
    <div>
      {countries.map((country) => (
        <div key={country.name.official}>
          {country.name.common} <ShowCountryButton showCountryButtonHandler={showCountryForButtonHandler} 
          countryForButton={country.name.common}/>
        </div>
      ))}
    </div>
  );
};

export default Countries;
