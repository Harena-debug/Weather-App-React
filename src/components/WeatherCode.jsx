import drizzle from '../assets/images/icon-drizzle.webp'
import fog from '../assets/images/icon-fog.webp'
import overcast from '../assets/images/icon-overcast.webp'
import cloud from '../assets/images/icon-partly-cloudy.webp'
import rain from '../assets/images/icon-rain.webp'
import snow from '../assets/images/icon-snow.webp'
import sun from '../assets/images/icon-sunny.webp'
import storm from '../assets/images/icon-storm.webp'

const getWeatherCode = (weatherCode) => {
    const weatherCodes = {
        0: sun,

        1: cloud,
        2: cloud,
        3: overcast,

        45: fog,
        48: fog,

        51: drizzle,
        53: drizzle,
        55: drizzle,

        56: rain,
        57: rain,
        61: rain,
        63: rain,
        65: rain,
        66: rain,
        67: rain,

        71: snow,
        73: snow,
        75: snow,
        77: snow,

        80: rain,
        81: rain,
        82: rain,

        85: snow,
        86: snow,

        95: storm,
        96: storm,
        99: storm
    }
    return weatherCodes[weatherCode] ?? cloud
}

export default getWeatherCode;