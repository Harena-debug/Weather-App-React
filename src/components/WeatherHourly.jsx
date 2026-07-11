import '../styles/WeatherHourly.css'
import { useState , useEffect } from 'react'
import { getWeatherHourly } from '../datas/data'
import Sun from '../assets/images/icon-sunny.webp'
import getWeatherCode from './WeatherCode'

const WeatherHourly = ({city , unit , setUnit}) => {
    const [isOpen , setIsOpen] = useState(false);
    const [dayValue , setDayValue] = useState('');
    const [temperatureList , setTemperatureList] = useState([]);
    const [weatherCode , setWeatherCode] = useState([]);
    const [dateList , setDateList] = useState([]);
    const myDate = new Date();
    const today = myDate.toLocaleDateString('en-US' , {
        weekday : 'long'
    });
    const changeRadio = (e) => {
        console.log(e.target.value);
        setDayValue(e.target.value);
        setIsOpen(false);
    }
    const days = ['Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' , 'Sunday']
    useEffect(() => {
        if(!city) return;
        const loaderData = async () => {
            try{
                const data = await getWeatherHourly(city.latitude , city.longitude , dayValue === '' ? today : dayValue);
                setTemperatureList(data?.hourly?.temperature_2m ?? []);
                setWeatherCode(data?.hourly?.weather_code ?? []);
                setDateList(data?.hourly?.time ?? [])
            }
            catch(error){
                console.error(error.message);
            }
        }

        loaderData();

        const idInterval = setInterval(() => {
            loaderData()
        } , 60000);

        return (() => clearInterval(idInterval));
    } , [city , dayValue]);
    return (
        <section className="hourly">
            <section className="hourly__header">
                <h3 className="hourlyTitle">Hourly forecast</h3>
                <button className="hourly__day" onClick={() => {
                    isOpen ? setIsOpen(false) : setIsOpen(true);
                }}>{dayValue === '' ? today : dayValue}</button>
                <section className={isOpen ? 'days showDays' : 'days'}>
                    {days.map((day) => (
                        <label key={day}>
                            <input 
                            type="radio" 
                            name='days' 
                            value={day} 
                            onChange={changeRadio} 
                            checked={dayValue === day}
                        />{day}
                        </label>
                    ))}
                </section>
            </section>
            <section className="hourly__data">
               {city ? (
                dateList.map((date , index) => (
                <section className="hours" key={date}>
                    <div className="time">
                        <img src={getWeatherCode(weatherCode[index])} alt="" className='icon'/>
                        <p className="heure">
                            {new Date(date).toLocaleTimeString('en-US' , {
                                hour : 'numeric',
                                hour12 : true
                            })}
                        </p>
                    </div>
                    <div className="hour__temperature">
                        {unit === 'Imperial' ? `${Math.round(temperatureList[index])}°` : `${Math.round((temperatureList[index] * 9 / 5) + 32)}°`}
                    </div>
                </section>
               ))
               ) : (
                <div className="hourEmpty">
                    <section className="hours"></section>
                    <section className="hours"></section>
                    <section className="hours"></section>
                    <section className="hours"></section>
                    <section className="hours"></section>
                    <section className="hours"></section>
                    <section className="hours"></section>
                    <section className="hours"></section>
                </div>
               )}
            </section>
        </section>
    )
}

export default WeatherHourly;