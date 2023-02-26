const Search = ({ search, handleChange }) => {
    return(
        <form>
            <div>find countries<input
                    value={search}
                    onChange={handleChange}
                />
            </div>
        </form>
    )

}

export default Search