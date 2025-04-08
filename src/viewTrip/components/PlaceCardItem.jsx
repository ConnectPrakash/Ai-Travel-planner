import React from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';

function PlaceCardItem({place}) {
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place.placeName} target='_blank'  rel="noopener noreferrer">
<div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
      <img src={place.placeImageUrl}
      className='w-[130px] h-[130px] rounded-xl'></img>
      <img
  src={place.placeImageUrl}
  alt={place.placeName}
  onError={(e) => {
    // Try fallback search or replace with default
    e.target.src = `https://source.unsplash.com/400x300/?${place.placeName}`;
  }}
  className="rounded-lg object-cover"
/>

      <div>
        <h2 className='font-bold text-lg'>{place.placeName}</h2>
        <p className='text-sm text-gray-400'>{place.placeDetails}</p>
        <h2 className='mt-2'> ⏰ {place.timeToTravel}</h2>
        <Button size="sm"><FaMapLocationDot />

        </Button>
      </div>
    </div>
    </Link>

  )
}

export default PlaceCardItem
