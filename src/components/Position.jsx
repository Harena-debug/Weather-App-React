import '../styles/Position.css'
import { useState , useEffect } from 'react';
import Geolocation from './Geolocation';
import { getWeatherCurrent } from '../datas/data';

const Position = ({unit , setUnit}) => {
    const [location , setLocation] = useState(null);
    const [dataCurrent , setDataCurrent] = useState(null);
    useEffect(() => {
        const handleLocation = async () => {
            try{
                const userLocation = await Geolocation();
                setLocation(userLocation);
            }
            catch(error){
                console.error(error.message);
            }
        }

        handleLocation();
    } , []);

    useEffect(() => {
        const loaderData = async () => {
            if(!location){
                console.log("Location error");
                return;
            }
            try{
                const data = await getWeatherCurrent(location.latitude , location.longitude);
                console.log(data);
                setDataCurrent({
                    temperature : data?.current?.temperature_2m ?? null ,
                    humidity : data?.current?.relative_humidity_2m ?? null ,
                    wind : data?.current?.wind_speed_10m ?? null ,
                    precipitation : data?.current?.precipitation ?? null
                });
            }
            catch(error){
                console.error(error.message);
            }
        }

        loaderData();

        const idInterval = setInterval(() => {
            loaderData();
        } , 60000);

        return (() => clearInterval(idInterval));
    } , [location]);

    return (
        <section className="dataMeteo">
            <section className="feel">
                <h3 className="feel__title">Feels like</h3>
                <p className="feel__data">
                    {!dataCurrent ? '_' : unit === 'Imperial' ? `${Math.round(dataCurrent.temperature)}°C` : `${Math.round((dataCurrent.temperature * 9 / 5) + 32)}°F`}
                </p>
            </section>
            <section className="humidity">
                <h3 className="humidity__title">Humidity</h3>
                <p className="humidity__data">{dataCurrent ? `${Math.round(dataCurrent.humidity)}%` : '_'}</p>
            </section>
            <section className="wind">
                <h3 className="wind__title">Wind</h3>
                <p className="wind__data">
                    {!dataCurrent ? '_' : unit === 'Imperial' ? `${Math.round(dataCurrent.wind)} km/h` : `${Math.round(dataCurrent.wind / 1.60934)} mph`}
                </p>
            </section>
            <section className="precipitation">
                <h3 className="precipitation__title">Precipitation</h3>
                <p className="precipitation__data">
                    {!dataCurrent ? '_' : unit === 'Imperial' ? `${Math.round(dataCurrent.precipitation)} mm` : `${Math.round(dataCurrent.precipitation / 25.4)} in`}
                </p>
            </section>
        </section>
    )
}

export default Position;