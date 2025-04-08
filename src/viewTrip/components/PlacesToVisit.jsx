import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  console.log('trip:', trip); // Debug: Log the trip prop to understand its structure

  // Try accessing the itinerary safely
  const daysPlan = trip?.tripData?.tripData?.tripPlan?.itinerary;

  if (!Array.isArray(daysPlan)) {
    return (
      <div>
        <h2 className='font-bold text-lg'>Places to Visit</h2>
        <p className='text-sm text-gray-500 mt-2'>No itinerary available.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className='font-bold text-lg'>Places to Visit</h2>
      <div>
        {daysPlan.map((item, index) => (
          <div key={index} className='mt-5'>
            <h2 className='font-bold text-lg'>Day: {item.day}</h2>
            <div className='grid grid-cols-2 gap-5 mt-2'>
              {item.places?.map((plan, planIndex) => (
                <div key={planIndex}>
                  <h2 className='font-medium text-sm text-orange-600'>{plan.planTime}</h2>
                  <PlaceCardItem place={plan} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
