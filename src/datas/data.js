export async function searchCity(cityName){
    try{
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`;
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Response Status : ${response.status}`);
            return;
        }
        const data = await response.json();
        return data;
    }
    catch(error){
        console.error(error.message);
        return null;
    }
}

export async function getWeatherMain(latitude , longitude) {
    try{
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`;
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Response Status : ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
    catch(error){
        console.error(error.message);
        return null;
    }
}

export async function getWeatherCurrent(latitude , longitude){
    try{
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation`;
        const response = await fetch(url);
        if(!response.ok){
            throw new Error (`Response Status : ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
    catch(error){
        console.error(error.message);
        return null;
    }
}

export async function getWeatherDaily(latitude , longitude) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=7&hourly=temperature_2m,weather_code&forecast_hours=7&timezone=auto`;
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Response status : ${response.status}`);
        }
        const data = await response.json();
        return data;
    }catch(error){
        console.error(error.message);
        return null;
    }
}

export async function getWeatherHourly(latitude , longitude , day) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&day=${day}&hourly=temperature_2m,weather_code&forecast_hours=8&timezone=auto`;
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Response status : ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch(error){
        console.log(error.message);
        return null;
    }
}