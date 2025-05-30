import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../service/firebaseConfig';
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

function ViewTrip() {

    const {tripId} = useParams();
    console.log(tripId);
    const [trip,setTrip] = useState([]);

    useEffect(()=>{
       GetTripData();
    },[tripId])

//   Used to get Trip Information from Firebase
     
    const GetTripData = async() =>{
        const docRef = doc(db,'AiTravel',tripId);
        const docSnap = await getDoc(docRef); 
       
        if(docSnap.exists()){
            console.log("Document:",docSnap.data());
            setTrip(docSnap.data());
         
        }
        
        else{
            console.log("No Such Document");
            toast("No trip Found!")
        }
        console.log("setTrip",trip);
    }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
     {/* Information Section */}
     <InfoSection trip={trip} />

     {/* Recommented Hotels */}
     <Hotels trip={trip}/>

     {/* Daily Play */}
     <PlacesToVisit trip={trip}/>

    {/* footer */}
    <Footer trip={trip}/>
    </div>
  )
}

export default ViewTrip
