import React from "react";
import { Button } from "@/components/ui/button";
import { FiShare } from "react-icons/fi";

function InfoSection({ trip }) {
  console.log("info", trip);
  return (
    <div>
      <img
        src="/Travel.jpg"
        className="h-[340px] w-full object-cover rounded-xl"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.UserSelection?.location}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xl md:text-md">
              📅 {trip?.UserSelection?.noOfDays} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xl md:text-md">
              💰 {trip?.UserSelection?.budget}{" "}
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xl md:text-md">
              🍾 NO.Of Traveler: {trip?.UserSelection?.traveler} Day
            </h2>
          </div>
        </div>

        <Button><FiShare /></Button>
      </div>
    </div>
  );
}

export default InfoSection;
