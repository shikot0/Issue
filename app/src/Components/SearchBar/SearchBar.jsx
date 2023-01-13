import './SearchBar.css';

function SearchBar({query, setQuery}) {
    return (
        <input value={query} onInput={e => {setQuery(e.target.value)}} type="search" placeholder="Search for a website..." className='searchbar'/>
    )
}

export default SearchBar;