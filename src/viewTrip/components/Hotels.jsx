import React from 'react';
import { Link } from 'react-router-dom';

function Hotels({ trip }) {
  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Hotel Recommendations</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {
          trip?.tripData?.tripData?.tripPlan?.hotelOptions?.map((item, index) => (
            
            <Link to={'https://www.google.com/maps/search/?api=1&query='+item.hotelName+","+item.hotelAddress} target='_blank'  rel="noopener noreferrer">
            <div key={index} className='my-4 hover:scale-105 transition-all cursor-pointer'>
              <img src={item.hotelImageUrl} className='rounded-xl w-full h-auto' alt={`Hotel ${index + 1}`} />
              <div className='my-2 flex flex-col gap-2'>
              <h2 className='mt-2 font-medium'>{item.hotelName}</h2>
               <h2 className='text-xs text-gray-500'>📍 {item.hotelAddress}</h2>
               <h2 className='text-sm'>💰 {item.price || item.Price}</h2>
               <h2 className='text-sm'>⭐ {item.rating}</h2>
                </div>
            </div>
            </Link>
          ))
        }
      </div>
    </div>
  );
}

export default Hotels;
