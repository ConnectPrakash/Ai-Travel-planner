export const SelectTravelesList=[
    {
        id:1,
        title:'Just Me',
        desc:'A sole traveles in exploration',
        icon:'🙎',
        people:'1'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two traveles in tandem',
        icon:'👩‍❤️‍👨',
        people:'2 People'
    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun loying ady',
        icon:'👨‍👩‍👧',
        people:'5 People'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seekes',
        icon:'👥',
        people:'5 to 10 people'
    }
]

export const SelectBudgetOptions =[
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:'🙂'
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep const on the average side',
        icon:'😃'
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont worry about cost',
        icon:'😁'
    }
]

export const AI_PROMPT = `Generate a detailed travel plan for the following:

- 📍 Location: {location}
- 📆 Duration: {totalDays} days
- 👥 Traveler Type: {traveler}
- 💰 Budget: {budget}

Provide the result in **valid JSON** under the structure:
tripData -> tripPlan -> hotelOptions, itinerary

Include:

1. 🏨 Hotel Options:
   - hotelName
   - hotelAddress
   - price
   - hotelImageUrl (**MUST be a direct working origin image URL** that opens in the browser without login or redirects)
   - geoCoordinates
   - rating
   - description

2. 📅 Day-wise Itinerary:
   - placeName
   - placeDetails
   - placeImageUrl (**MUST be a valid, origin image URL — no placeholders or AI-generated URLs**)
   - planTime
   - geoCoordinates
   - ticketPricing
   - timeToTravel
   - bestTimeToVisit
   
   🔐 Image Rules:
- All images MUST come from **public sources like Unsplash, Wikimedia, Pexels, or direct CDNs**.
- The URLs **must not return 404, be broken, or require auth**.
- ✅ Examples of valid sources:
   - https://images.unsplash.com/
   - https://upload.wikimedia.org/
   - phtts://cdn.pixabay.com/
- ❌ DO NOT include placeholder images, base64 links, "image-not-found" URLs, or any fake image.

🍽️ include lunch/dining locations. Include **all time table visitable places** (tourist spots, nature, monuments, etc.).
`;
