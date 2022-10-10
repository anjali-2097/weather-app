import './App.css';
import TopNavbar from './components/TopNavbar';
import SearchInputs from './components/SearchInputs';
import LocationAndTime from './components/LocationAndTime';
import TemperatureDetails from './components/TemperatureDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './weatherServices';
import { useEffect, useState } from 'react';

function App() {
  const threshold = 45;
  const [query,setQuery] = useState({q: 'windsor',units: "metric"})
  const [weather,setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({...query}).then((data) => {
        setWeather(data);
      });
     }
     fetchWeather();
  },[query])
  
  const formatBg =() => {
    if(!weather) return "from-cyan-700 to-blue-700";
    return (weather.temp <= threshold) ? "from-cyan-700 to-blue-700" : "from-yellow-700 to-orange-700" 
  }

  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br ${formatBg()} h-fit shadow-xl shadow-gray-400`}>
      <TopNavbar setQuery={setQuery}/>
      <SearchInputs setQuery={setQuery}/>
      {weather && (
        <>
      <LocationAndTime weather={weather}/>
      <TemperatureDetails weather={weather}/>
      <Forecast title="Hourly forecast" items={weather.hourly}/>
      <Forecast title="Daily forecast" items={weather.daily}/>
      </>
      )}
    </div>
  );
}

export default App;
