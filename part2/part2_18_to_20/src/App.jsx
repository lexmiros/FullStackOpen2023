import { useState, useEffect } from 'react'

import countries from './services/countries'
import weather from './services/weather'

import SearchBar from './components/SearchBar'
import Countries from './components/Countries'
import Country from './components/Country'
import Weather from './components/Weather'


function App() {
  const [allCountries, setAllCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState("")
  const [countriesToShow, setCountiresToShow] = useState([])
  const [capitalCityWeatherData, setCapitalCityWeatherData] = useState();
  

  const countryFilterHandler = (event) => {
    setCountryFilter(event.target.value)
  }

  const showCountryButtonOnClickHandler = (countryForButton) => {
    setCountryFilter(countryForButton)
  }

  const getAllCountries = () => {
    const callResponse = countries.getAllCountries();
    callResponse.then(response => {
      setAllCountries(response)
    })
  }

  const getCapitalCityWeatherData = () => {
    if (countriesToShow.length !== 1) {
      return
    }

    const callReponse = weather.getCityWeatherData(countriesToShow[0].capital)

    callReponse.then(response =>{
      setCapitalCityWeatherData(response)
      console.log(response)}
    )
  }

  const filterCountriesToShow = () => {
    const newCountriesToShow = 
      allCountries.filter(country => 
        country.name.common.toLowerCase().includes(countryFilter.toLowerCase())
      )
   
    setCountiresToShow(newCountriesToShow)
  }

  const checkIfWeatherDataShouldBeRemoved = () => {
    if (countriesToShow !== 1) {
      setCapitalCityWeatherData(null)
    }
  }


  useEffect(getAllCountries, [])
  useEffect(filterCountriesToShow, [countryFilter])
  useEffect(getCapitalCityWeatherData, [countriesToShow])
  useEffect(checkIfWeatherDataShouldBeRemoved, [countryFilter])
  


  
  return (
    <>
      <SearchBar countryFilter={countryFilter} countryFilterHandler={countryFilterHandler}/>
      <Countries countries={countriesToShow} showCountryForButtonHandler={showCountryButtonOnClickHandler}/>
      <Country countries={countriesToShow} /> 
      <Weather weatherData={capitalCityWeatherData}/>
    </>
  )
}

export default App
