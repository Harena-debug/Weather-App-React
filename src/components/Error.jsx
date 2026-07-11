import '../styles/Error.css'
import iconError from '../assets/images/icon-error.svg'

const Error = ({error , setError , city , handleSelectCity}) =>  {
    return (
        <section className={error ? 'error showLayout' : 'error'}>
            <img src={iconError} alt="icon error" className='icon__error'/>
            <h3 className='wrong__title'>Something went wrong</h3>
            <p className='wrong__p'>We couldn't connect to the server (API error). Please try again in a few moments</p>
            <button type='button' className='btnReset' onClick={() => handleSelectCity(city)}>Retry</button>
        </section>
    )
}

export default Error;