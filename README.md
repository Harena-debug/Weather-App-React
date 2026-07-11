#Mentor Frontend -Weather App Solution

This is a solution to the [Weather App Challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

-[Preview](#preview)
  -[The challenge](#the-challenge)
  -[Screenshot](#screenshot)
  -[Links](#links)
-[My process](#my-process)
  -[Built with](#built-with)
-[What I learned](#what I learned)
-[Continued development](#continued-development)
  -[Useful resources](#useful-resources)
  -[AI collaboration](#ai-collaboration)
-[Author](#author)
-[Acknowledgments](#acknowledgments)

## Overview

Weather application developed with React.

### The challenge

The challenge is to create a weather app that can perform the following functions:

-Search weather information by entering a location in the search bar
-View current weather conditions including temperature, weather icon and location details
-View additional weather metrics such as temperature, humidity percentage, wind speed, and precipitation amounts.
-Browse a 7-day weather forecast with daily high/low temperatures and weather icons
-View an hourly forecast showing temperature changes throughout the day
-Switch between different days of the week using the day switcher in the hourly forecast section
-Switch between imperial and metric units of measurement via the units drop-down list
-Switch between specific temperature units (Celsius and Fahrenheit) and units of measurement for wind speed (km/h and mph) and precipitation (millimeters) via the units drop-down list.
-View the optimal interface layout based on the screen size of their device
-See hover and focus states for all interactive elements on the page

### Screenshot

![Weather](image.png)

### Links
-Solution URL: [GitHub](https://github.com/Harena-debug/Weather-App-React)
-Live Site URL: [Live Demo](https://harena-debug.github.io/Weather-App-React/)

## My process

### Built with

I carried out this project with the following tools:

-HTML5 semantic markup
-CSS variables
-CSS flex box
-CSS Grid
-Mobile-first workflow
-React JS

### What I learned
I learned several important concepts in this project, here are a few:
-Gérer les composants avec React

```jsx
import Header from './components/Header'
import Title from './components/title'
import SearchBar from './components/SearchBar'
import { searchCity , getWeatherMain} from './datas/data'
import MainMeteo from './components/MainMeteo'
import Position from './components/Position'
import WeatherDaily from './components/WeatherDaily'
import WeatherHourly from './components/WeatherHourly'
import Error from './components/Error'
```
-Utilisation des states React
```jsx
  const [city , setCity] = useState(null)
  const [cityList , setCityList] = useState([])
  const [isLoading , setIsLoading] = useState(false);
  const [unit , setUnit] = useState('Metric');
  const [error , setError] = useState(false)
```
-Utilisation de UseEffect React :

```jsx
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
```

### Continuous development

In future projects, I will consider starting to learn Tailwind CSS to make my development journey easier.

### Useful resources

-[Open Classroom](https://openclassrooms.com/fr/courses/8710331-debutez-avec-react) -My starting resource for getting started with React
-[W3 Schools](https://www.w3schools.com/) -My resource to consolidate each concept

### AI collaboration

I collaborated with AIs in the following ways:
-I used Chatgpt and Claude AI in this project
-I used them mainly for code reviews, small corrections in case there were any

## Author

-Website -[Harena](https://github.com/Harena-debug)
-Mentor Frontend -[@Harena-debug](https://www.frontendmentor.io/profile/Harena-debug)

## Acknowledgments
Really thank you to Frontend Mentor for giving me this challenge even though it was not easy, thank you also to AI for helping me during this journey, also thank you to the Lord for supporting me during this project.