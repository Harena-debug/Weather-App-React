import './styles/App.css'
import { useState } from 'react'
import Header from './components/Header'
import Title from './components/title'
import SearchBar from './components/SearchBar'
import { searchCity , getWeatherMain} from './datas/data'
import MainMeteo from './components/MainMeteo'
import Position from './components/Position'
import WeatherDaily from './components/WeatherDaily'
import WeatherHourly from './components/WeatherHourly'
import Error from './components/Error'

const App = () => {
  const [city , setCity] = useState(null)
  const [cityList , setCityList] = useState([])
  const [isLoading , setIsLoading] = useState(false);
  const [unit , setUnit] = useState('Metric');
  const [error , setError] = useState(false)
  const handleCity = async (cityValue) => {
    if(!cityValue.trim()){
      setCityList([]);
      return;
    }
    setIsLoading(true);
    try{
      const data = await searchCity(cityValue);
      setCityList(data?.results ?? []);
    }
    catch(error){
      console.error(error.message);
      setError(true);
    }
    finally{
      setIsLoading(false)
    }
    console.log(cityList);
  }
  const handleSelectCity = (SelectCity) => {
    setCity(SelectCity);
    setCityList([]);
  }
  return (
    <div className='container'>
      <Header unit={unit} setUnit={setUnit}/>
      <Error error={error} setError={setError} city={city} handleSelectCity={handleSelectCity}/>
      <main className='main'>
        <Title/>
        <SearchBar onSearch={handleCity} suggestion={cityList} onSelectCity={handleSelectCity} isLoading={isLoading}/>
        <section className='meteo'>
          <MainMeteo city={city} unit={unit} setUnit={setUnit}/>
          <Position unit={unit} setUnit={setUnit}/>
          <WeatherDaily city={city} unit={unit} setUnit={setUnit}/>
          <WeatherHourly city={city} unit={unit} setUnit={setUnit}/>
        </section>
      </main>
    </div>
  )
}

export default App;