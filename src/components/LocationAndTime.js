import React from 'react'
import { formatToLocalTime } from '../weatherServices'

function LocationAndTime({weather:{dt, timezone, name, country}}) {
  return (
    <div>
        <div className='flex items-center justify-center my-6'>
            <p className='text-white text-xl font-extralight'>
                {formatToLocalTime(dt, timezone)}
            </p>
        </div>
        <div className='flex items-center justify-center my-6'>
            <p className='text-white text-2xl font-medium'>
                {name}, {country}
            </p>
        </div>
    </div>
  )
}

export default LocationAndTime