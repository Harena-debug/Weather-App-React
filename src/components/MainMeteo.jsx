import '../styles/MainMeteo.css'
import { getWeatherMain } from '../datas/data';
import { useState , useEffect } from 'react';
import getWeatherCode from './WeatherCode';
import Icon from '../assets/images/icon-loading.svg'

const MainMeteo = ({city , unit , setUnit}) => {
    const [temperature , setTemperature] = useState(null)
    const [weatherCode , setWeatherCode] = useState(null)
    const [isLoading , setIsLoading] = useState(true)
    const date = new Date()
    const today = date.toLocaleDateString('en-US' , {
    weekday : 'long',
    day : 'numeric',
    month : 'long',
    year : 'numeric' 
    });
    useEffect(() => {
        if(!city){
            setTemperature(null);
            setWeatherCode(null);
            setIsLoading(false)
            return;
        }
        const loaderData = async () => {
            setIsLoading(true)
            try{
                const data = await getWeatherMain(city.latitude , city.longitude);
                setTemperature(data?.current?.temperature_2m ?? null)
                setWeatherCode(data?.current?.weather_code ?? null)
            }
            finally{
                setIsLoading(false)
            }
        }

        loaderData();

        const idInterval = setInterval(() => {
            loaderData()
        } , 300000);

        return (() => clearInterval(idInterval));

    } , [city]);
    const changeData = () => {
        if(temperature !== null){
            if(unit === 'Imperial'){
               return `${Math.round(temperature)}°`
            }
            else{
               return `${Math.round((temperature * 9 / 5) + 32)}°`
            }
        }
        else{
           return ''
        }
    }
    return (
        <section className={!city ? 'main__meteo' : 'main__meteo received'}>
            {isLoading ? (
                <section className='load'>
                    <img src={Icon} alt="" className={isLoading ? 'load__progress turnLoader' : 'load__progress'}/>
                    <p className='load__p'>Loading...</p>
                </section>
            ) : (
                <>
                    <div className='city'>
                        <h3 className='country'>{city ? `${city.name} , ${city.country}` : ''}</h3>
                        <p className='date'>{city ? today : ''}</p>
                    </div>
                    <div className='temperature'>
                        {weatherCode !== null ? (
                            <img src={getWeatherCode(weatherCode)} alt="Weather icon" className='main__icon'/>
                        ) : ''}
                        <p className='temperature__value'>{changeData()}</p>
                    </div>
                </>
            )}
        </section>
    )
}

export default MainMeteo;