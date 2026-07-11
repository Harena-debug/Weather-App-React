import '../styles/WeatherDaily.css'
import { useState , useEffect } from 'react'
import { getWeatherDaily } from '../datas/data'
import getWeatherCode from './WeatherCode'

const WeatherDaily = ({city , unit , setUnit}) => {
    const [temperatureMax , setTemperatureMax] = useState([]);
    const [temperatureMin , setTemperatureMin] = useState([]);
    const [weatherCode , setWeatherCode] = useState([]);
    const [date , setDate] = useState([]);
    useEffect(() => {
        if(!city) return;
        const dataDaily = async () => {
            try{
                const data = await getWeatherDaily(city.latitude , city.longitude);
                setTemperatureMax(data?.daily?.temperature_2m_max ?? []);
                setTemperatureMin(data?.daily?.temperature_2m_min ?? []);
                setDate(data?.daily?.time ?? []);
                setWeatherCode(data?.daily?.weather_code ?? []);
            }
            catch(error){
                console.error(error.message);
            }
        }
        dataDaily();

        const idInterval = setInterval(() => {
            dataDaily()
        } , 60000);

        return (() => clearInterval(idInterval));
    } , [city]);
    return (
        <section className="daily">
            <h3 className="dailyTitle">Daily forecast</h3>
                {city ? (
                    <section className="seven__days">
                        {date.map((day , index) => (
                            <section className='day' key={day}>
                                <p className='weekday'>
                                    {new Date(`${day}T12:00:00`).toLocaleDateString('en-US' , {
                                        weekday : 'short'
                                    })}
                                </p>
                                <img src={getWeatherCode(weatherCode[index])} alt="" className='icon'/>
                                <div className='day__temperature'>
                                    <p className='max'>
                                        {unit === 'Imperial' ? `${Math.round(temperatureMax[index])}°` : `${Math.round((temperatureMax[index] * 9 / 5) + 32)}°`}
                                    </p>
                                    <p className='min'>{unit === 'Imperial' ? `${Math.round(temperatureMin[index])}°` : `${Math.round((temperatureMin[index] * 9 / 5) + 32)}°`}</p>
                                </div>
                            </section>
                        ))}
                    </section>
                ):(
                    <div className='emptyData'>
                        <section className="empty"></section>
                        <section className="empty"></section>
                        <section className="empty"></section>
                        <section className="empty"></section>
                        <section className="empty"></section>
                        <section className="empty"></section>
                        <section className="empty"></section>
                    </div>
                )}
        </section>
    )
}

export default WeatherDaily;