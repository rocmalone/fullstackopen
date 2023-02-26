import { useState, useEffect } from 'react'
import Search from './components/Search.js'
import CountryService from './services/CountryService.js'
import Countries from './components/Countries.js'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [showCountries, setShowCountries] = useState([])

  const handleSearchChange = (event) => {
    // SYNCHRONIZE INPUT WITH STATE VAR
    const currentSearch = event.target.value
    setSearch(currentSearch)

    // SET SHOW COUNTRIES

    const newShowCountries = countries.filter(country => country.name.common.toLowerCase().includes(currentSearch.toLowerCase()) === true)

    console.debug(newShowCountries)

    setShowCountries(newShowCountries)
  }

  const handleShowClick = (country) => {
    console.log(`Show clicked!`)
    console.log(country)
    setShowCountries([country])
  }

  // Fetch country data on first render
  useEffect( () => {
    CountryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
        setShowCountries(initialCountries)
       })
  }, [])

  return (
    <div>
      <Search value={search} handleChange={handleSearchChange} />
      <Countries showCountries={showCountries} showClick={(country) => handleShowClick(country)}/>
    </div>
  )
}

export default App;