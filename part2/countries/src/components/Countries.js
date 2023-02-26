import WeatherService from '../services/WeatherService'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Countries = ( { showCountries, showClick} ) => {
    const [weather, setWeather] = useState([])


    if (showCountries === null) {
        return
    }

    // TOO MANY MATCHES CASE
    else if (showCountries.length > 10) {
        return(
        <div>Too many matches, specify another filter</div>
        )
    }

    // SINGLE COUNTRY CASE
    else if (showCountries.length === 1) {
        // console.log(`More than one country`)
        // console.log(`Weather state: ${weather}`)
   

        // console.log(`showCountries.length = ${showCountries.length}`)
        const infoCountry = showCountries[0]

        // Country info block, data already fetched
        const CountryInfo = () => {
            return (
                <div>
                    <h1>{infoCountry.name.common}</h1>
                    <div>capital {infoCountry.capital}</div>
                    <div>area {infoCountry.area}</div>
                    <h3>languages:</h3>
                    <ul>
                        {
                        // (1) Create array containing values of each sub-property of infoCountry.language
                        // (2) Iterate through the value array creating a list element for each
                        Object.values(infoCountry.languages).map(language =>
                            <li key={language}>{language}</li>
                        )}
                    </ul>
                    <img className="flag" src={infoCountry.flags.png}/>
                </div>
            )
        }
        console.log(`Weather length: ${weather.length}`)
        if(weather.length > 0){
            console.log(`Weather length is greater than 0!`)
            console.log(weather)
            console.log(weather[0].weather[0].icon)

            // const request = axios.get(url)
            // request.then((response) => setWeather(response.data)).then(() => console.debug(`Weather: ${weather}`))

            return(
                <div>
                    <CountryInfo />
                    <h2>weather in {infoCountry.capital}</h2>
                    <div>Temperature: {weather[0].main.temp} °C</div>
                    <img src={`http://openweathermap.org/img/wn/${weather[0].weather[0].icon}@2x.png`} />
                    <div>Wind: {weather[0].wind.speed} m/s</div>
                </div>
            )
        } else if (weather.length === 0) {
            console.log(`showCountries.length = ${showCountries.length}`)
            console.log("One country")
            // const key = '10f0b1c36901b47073ac5d58c57e3e79'
            const key = process.env.REACT_APP_API_KEY
            const latlng = infoCountry.capitalInfo.latlng
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${key}&units=metric`

            axios.get(url)
                .then(response => {
                    const data = response.data
                    console.log(data)
                    console.log(`data: ${data}`)
                    setWeather([data])
                }).catch(error => {
                    console.log(error)
                })

            return(
                <div>
                    <CountryInfo />
                    <h2>weather in {infoCountry.capital}</h2>
                    <div>Loading ... </div>
                </div>
            )
        }
    }



    // COUNTRY LIST CASE
    else {
        if(weather.length > 0) {
            setWeather([])
        }
        return(
            <ul>
            {showCountries.map(country =>
                <li key={country.name.common}>
                    {country.name.common}
                    <button onClick={() => showClick(country)}>show</button>
                </li>
            )}
            </ul>
        )
    }
        



}

export default Countries