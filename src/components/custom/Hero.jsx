import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex flex-col items-center mx-46 gap-9">
      <h2 className="font-extrabold text-[60px] text-center mt-16">
        <span className="text-[#f56551]">
          Discover Your Next Adventure with Ai:{" "}
        </span>
        <br></br> Personalized Itineraries at Your FingerTips
      </h2>

      <p className="text-xl text-gray-500 text-center">Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
      <Link to={"/create-trip"}>
        <Button>Get Strarted,it's Free</Button>
      </Link>
    </div>
  );
}

export default Hero;
