import React from 'react'

function TopNavbar({setQuery}) {
    const cities = [
        {
            id: 1,
            title : 'New York'
        },
        {
            id: 2,
            title : 'London'
        },
        {
            id: 3,
            title : 'Tokyo'
        },
        {
            id: 4,
            title : 'Spain'
        },
        {
            id: 5,
            title : 'Navsari'
        },
    ]
  return (
    <div className='flex items-center justify-around my-6'>
        {cities.map((cityName)=>(
            <button key={cityName.id} className='text-white text-lg font-medium' onClick={() => setQuery({ q: cityName.title, units:"metric" })}>{cityName.title}</button>
        ))}
    </div>
  )
}

export default TopNavbar