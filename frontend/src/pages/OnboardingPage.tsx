// import React from "react";
import PhotoSlide from "../components/PhotoSlide";
import GivvaIcon from "../images/GIVVAIcon.svg";
import VendorIcon from "../images/vendorIcon.svg";
import GifterIcon from "../images/gifterIcon.svg";
import RecieverIcon from "../images/recieverIcon.svg";
// import { useState } from "react";
// Define the interface for the role cards
// interface RoleCardProps {
//   title: string;
//   description: string;
// }

// Custom hook to manage selected role (if needed)
// function useSelectedRole() {
//   const [selectedRole, setSelectedRole] = useState<string | null>(null);
//   return { selectedRole, setSelectedRole };
// }


export default function Onboarding() {
  return (
    <>
      <main className="flex gap-2 bg-white container">
        {/* {div for the right and left side of the page} */}
        {/* left div */}
        <div className="w-[45%]">
          {/* icon div */}
          <div>
            <img src={GivvaIcon} alt="Ogivva Logo" className=""/>
          </div>
          {/* header texts */}
          <div>
            <h1>Let’s get you started</h1>
            <p>Tell us what you’d like to do on GIVVA. You can always switch roles later.</p>
          </div>
          {/* role cards */}
          <div>

          </div>
          {/* link to sign in */}
          <p><a href=""></a></p>
        </div>
        {/* right div */}
        <div className='w-[50%]'>
          <PhotoSlide />
        </div>
      </main>
    </>
  )
}