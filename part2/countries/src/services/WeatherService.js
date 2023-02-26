import axios from 'axios'

const key = '10f0b1c36901b47073ac5d58c57e3e79'

const getWeather = (latlng) => {
    // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${key}`
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${key}`

    const request = axios.get(url)    
    const data = request
        .then(response => response.data)
        // .then((res) => console.log(res))


    return data

    // const data = request.then((response) => {
    //     return response.data
    // })
    // request.then((response) => {
    //     console.log("response recieved")
    //     return response 
    // }).catch(() => console.error("NO RESPONSE FROM OPENWEATHERMAP.ORG"))

    // const response = await request
    // console.log(response.data)
    // return response.data


}

export default { getWeather }



