import { useState } from "react";
import '../styles/SearchBar.css'
import Suggestion from "./Suggestion";

const SearchBar = ({onSearch , suggestion , onSelectCity , isLoading}) => {
    const [input , setInput] = useState('');
    const [closeSuggestion , setCloseSuggestion] = useState(false);
    const handleCity = (selectedCity) => {
        setInput(`${selectedCity.name} , ${selectedCity.country}`);
        setCloseSuggestion(true);
        onSelectCity(selectedCity);
    }
    return (
        <section className="search">
            <input 
                type="search" 
                value={input} 
                onChange={(e) => {
                    const value = e.target.value;
                    setInput(value);
                    onSearch(value);
                    setCloseSuggestion(false);
                }} 
                placeholder="Search for a city, e.g., New York"
            />
            <button className="btnSearch" onClick={() => onSearch(input)}>Search</button>
            <Suggestion 
            suggestion={suggestion} 
            closeSuggestion={closeSuggestion} 
            setCloseSuggestion={setCloseSuggestion} 
            onSelectCity={handleCity}
            isLoading={isLoading}
            input={input}/>
            
        </section>
    )
}

export default SearchBar;