const Weather = ( { weatherData } ) => {
    if (!weatherData) {
        return null
    }

    console.log(weatherData.weather[0].icon)
    console.log(`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}d@2x.png`)
    const kelvinToCelsius = temperatureInKelvin => (temperatureInKelvin - 273.15).toFixed(2)

    return (
        <div>
            Temperature: {kelvinToCelsius(weatherData.main.temp)} celcius<br/>
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/><br/>
            Wind: {weatherData.wind.speed} m/s
       </div>
    ) 
}

export default Weather;