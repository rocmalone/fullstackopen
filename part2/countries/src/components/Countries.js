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
        console.log(`More than one country`)
        console.log(`Weather state: ${weather}`)
        return(
            <div>
                <CountryInfo />
                <h2>weather in {infoCountry.capital}</h2>
                <div>temperature: {}</div>
            </div>
        )
    }
    else {
        console.log(`showCountries.length = ${showCountries.length}`)
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

        if(weather.length > 1){
            console.log(`showCountries.length = ${showCountries.length}`)
            console.log("One country")
            const key = '10f0b1c36901b47073ac5d58c57e3e79'
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${key}`

            axios.get(url)
                .then(response => {
                    const data = response.data
                    console.log(data)
                    console.log(`data: ${data}`)
                    setWeather([data])
                }).catch(error => {
                    console.log(error)
                })

            const request = axios.get(url)
            request.then((response) => setWeather(response.data)).then(() => console.debug(`Weather: ${weather}`))


            return(
                // <div>
                //     <h1>{infoCountry.name.common}</h1>
                //     <div>capital {infoCountry.capital}</div>
                //     <div>area {infoCountry.area}</div>
                //     <h3>languages:</h3>
                //     <ul>
                //         {
                //         // (1) Create array containing values of each sub-property of infoCountry.language
                //         // (2) Iterate through the value array creating a list element for each
                //         Object.values(infoCountry.languages).map(language =>
                //             <li key={language}>{language}</li>
                //         )}
                //     </ul>
                //     <img className="flag" src={infoCountry.flags.png}/>

                // </div>
                <div>
                    <CountryInfo />
                    <h2>weather in {infoCountry.capital}</h2>
                    <div>Loading ... </div>
                </div>
            )
        }

        

    }
        

    // COUNTRY LIST CASE
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

export default Countries