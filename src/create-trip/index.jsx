// import React, { useState } from 'react';
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// import AddressAutocomplete from "@rottitime/react-address-autocomplete";
// function CreateTrip() {
// const [place, setPlace] = useState(null);

// function handlePlaceSelect(value) {
//   setPlace(value);
//   console.log(value);
// }

// return (
//   <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
//     <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
//     <p className='mt-3 text-gray-500 text-xl'>
//       Just provide some basic information, and our trip planner will do the rest.
//     </p>

//     <div className='mt-20'>
//       <div>
//         <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
//         {/* <GooglePlacesAutocomplete
//             apiKey={import.meta.env.VITE_GOOGLE}
//             selectPrimport
// ops={{
//               value: place,
//               onChange: handlePlaceSelect,
//             }}
//           /> */}

{
  /* <AddressAutocomplete style={{width:500}}/>
        </div>
      </div>
    </div>
  );
}

export default CreateTrip; */
}
import React, { useEffect, useState } from "react";
import AddressAutocomplete from "@rottitime/react-address-autocomplete";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "../constants/options";
import { toast } from "sonner";
import { chatSession } from "../service/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  // ✅ Google Login Redirect Flow
  const login = useGoogleLogin({
    flow: "implicit", // Uses popup instead of redirect
    onSuccess: (tokenResponse) => GetUserProfile(tokenResponse),
    onError: (error) => console.log(error),
  });
  

  // ✅ Listen for login success message
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data === "login_successful") {
        console.log("User logged in successfully!");
        setOpenDialog(false);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!formData?.location || !formData?.budget || !formData?.traveler) {
      toast("Please fill all details");
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT
      .replace("{location}", formData?.location)
      .replace("{totalDays}", formData?.noOfDays || "3")
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget);

    console.log("AI Prompt:", FINAL_PROMPT);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const aiResponse = await result.response.text();
      console.log("AI Response:",aiResponse);
      setLoading(false);
      SaveAiTrip(aiResponse);
    } catch (error) {
      console.error("Error generating trip:", error);
      toast("Something went wrong. Try again.");
    }
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
  
    // Step 1: Clean TripData string before parsing
    let cleanedTripData = TripData.trim();
    const firstBraceIndex = cleanedTripData.indexOf("{");
  
    if (firstBraceIndex > 0) {
      // Remove any unwanted characters before the first `{`
      cleanedTripData = cleanedTripData.slice(firstBraceIndex);
    }
  
    let parsedTripData;
    try {
      parsedTripData = JSON.parse(cleanedTripData);
    } catch (e) {
      console.error("TripData is not valid JSON, storing as plain text instead:", TripData);
      parsedTripData = TripData; // fallback: store it as a string
    }
  
    // Step 2: Store in Firestore
    await setDoc(doc(db, "AiTravel", docId), {
      UserSelection: formData,
      tripData: parsedTripData,
      userEmail: user?.email,
      id: docId,
    });
  
    setLoading(false);
    navigate("/view-trip/" + docId);
  };
  
  const GetUserProfile = (tokeninfo) =>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokeninfo?.access_token}`,{
      headers:{
        Authorization:`Bearer ${tokeninfo?.access_token}`,
        Accept:'Application/json'
      }
    }).then((res) =>{
      console.log("res",res.data);
      localStorage.setItem('user',JSON.stringify(res.data));
      setOpenDialog(false);
      OnGenerateTrip();
    })
      
  }

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences 🏕️🌴</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will do the rest.
      </p>

      <div className="mt-10 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">What is your destination of choice?</h2>
          <AddressAutocomplete
            style={{ width: 500 }}
            onChange={(value) => handleInputChange("location", value.target.value)}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">How many days are you planning?</h2>
          <Input
            placeholder="Ex. 3"
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                formData?.budget === item.title ? "shadow-xl border-black" : ""
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">Who are you traveling with?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelesList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("traveler", item.people)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                formData?.traveler === item.people ? "shadow-xl border-black" : ""
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 justify-end flex">
        <Button
        disabled={loading}
        onClick={OnGenerateTrip}>
          {loading ? 
          <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin"/>:" Generate Trip"
       
        }
         </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="Logo" />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to the App with Google Authentication securely</p>
              <Button 
              onClick={login}
              
              className="w-full mt-5 flex gap-4 items-center">
           
                <FcGoogle className="h-7 w-7" />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
