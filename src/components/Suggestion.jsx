import '../styles/Suggestion.css'
import { useState } from 'react';
import MainMeteo from './MainMeteo';
import loading from '../assets/images/icon-loading.svg'

const Suggestion = ({suggestion , closeSuggestion , setCloseSuggestion , onSelectCity , isLoading , input}) => {
    const [isSuggestion , setIsSuggestion] = useState(true)
    if(closeSuggestion){
        return null;
    }
    return (
        isLoading ? (
            <section className={input === '' ? 'loader' : 'loader showProgress'}>
                <img src={loading} alt="" className={isLoading ? 'icon__progress turnLoader' : 'icon__progress'}/>
                <p className='loader__p'>Search in progress</p>
            </section>
        ) : (
         <ul className={closeSuggestion || input === '' ? "suggestion__list removeSuggestion" : "suggestion__list"}>
            
            {suggestion.length === 0 ? (
                <li>No search result found !</li>
            ) : (
                suggestion.map((city) => (
                <li key={city.id} onClick={() => {
                    setCloseSuggestion(true);
                    onSelectCity(city);
                }}>
                    {city.name} , {city.country}
                </li>
            ))
            )
        }
        </ul>
        )
    )
}

export default Suggestion;