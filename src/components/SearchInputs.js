import React, { useState } from 'react'
import { UilSearch, UilLocationPinAlt } from '@iconscout/react-unicons'

function SearchInputs({setQuery}) {
  const [city, setCity] = useState("");
  const handleSearchCity = () => {
    if (city !== "") setQuery({q: city, units:"metric"})
  }
  const handleSearchLocation = () => {
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setQuery({lat, lon, units:"metric"});
      })
    }
  }
  return (
    <div className='flex flex-row justify-center my-6'>
        <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
            <input type="text" value={city} onChange={(e) => setCity(e.currentTarget.value)} className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase" placeholder="Search for city..."></input>
            <UilSearch size={25} onClick={handleSearchCity} className="text-white transition ease-out hover:scale-150"/>
            <UilLocationPinAlt size={25} onClick={handleSearchLocation} className="text-white transition ease-out hover:scale-150"/>
        </div>
    </div>
  )
}

export default SearchInputs