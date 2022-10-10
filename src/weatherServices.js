import { DateTime } from "luxon";
const API_KEY = "YOUR_API_KEY";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const getWeatherData = (info, searchParams) => {
    const url = new URL(BASE_URL + info );
    url.search = new URLSearchParams({...searchParams,appid:API_KEY});

    return fetch(url).then((res) => res.json()).then((data) => data);
};

const formatCurrWeather = (data) => {
const {
    coord: {lat, lon},
    main: {temp, feels_like, temp_min, temp_max, humidity},
    name,
    dt,
    sys: {country, sunrise, sunset},
    weather,
    wind: {speed}
} = data
const {main: details, icon} = weather[0];
return{lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, details, icon, speed }
}
const formatForecastWeather = (data) => {
    let {timezone, daily, hourly } = data;
    daily = daily.slice(1,6).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'ccc'),
            temp: d.temp.day,
            icon: d.weather[0].icon,
        };
        
    });
    
    hourly = hourly.slice(1,6).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
            temp: d.temp,
            icon: d.weather[0].icon,
        };
    });

    return { timezone, daily, hourly };
}

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrWeather = await getWeatherData('weather',searchParams).then(formatCurrWeather)
    const {lat, lon} = formattedCurrWeather
    const formattedForcastWeather = await getWeatherData('onecall',{
        lat,
        lon,
        exclude: 'current,minutely,alerts',
        units: "metric",
    }).then(formatForecastWeather);

    return {...formattedCurrWeather,...formattedForcastWeather};
}

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconURL = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`

export default getFormattedWeatherData;

export { formatToLocalTime, iconURL }