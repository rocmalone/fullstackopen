import axios from 'axios'

const baseUrl = 'https://restcountries.com/v3.1/all'

const getAll = () => {
    const request = axios.get(baseUrl)
    const data = request.then(response => response.data)
    console.debug(`Country data: ${data}`)
    return data
}

export default { getAll }