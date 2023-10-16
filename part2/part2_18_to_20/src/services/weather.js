import axios from "axios";

const apiKey = import.meta.env.VITE_SOME_KEY
const baseUrlPrefix = "https://api.openweathermap.org/data/2.5/weather?q="
const baseUrlSuffix = `&appid=${apiKey}`

const getCityWeatherData = cityName => {
    const request = axios.get(`${baseUrlPrefix}${cityName}${baseUrlSuffix}`)
    return request.then(response => response.data)
}

export default {getCityWeatherData}