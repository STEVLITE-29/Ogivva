import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import GivvaIcon from "../images/GIVVAIcon.svg";
import Confetti from "../images/confetti 1.svg";
import PhotoSlide from "../components/PhotoSlide";

export default function EmailVerified() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(30); // now 30 seconds before redirect

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/login");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <main className="flex w-screen bg-white p-4 h-screen">
      {/* Left Panel */}
      <div className="w-[40%] px-8 py-5 flex flex-col">
        <img src={GivvaIcon} alt="Givva Logo" className="mb-5 w-20 mx-auto" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col justify-center items-center my-auto"
        >
          <img src={Confetti} alt="Confetti" className="w-28 mb-5" />
          <h1 className="text-xl font-semibold text-[#191D23] mb-1">
            Email Verified
          </h1>
          <p className="text-[#64748B] text-sm w-80 text-center">
            Your email has been verified successfully. You will be redirected
            to the sign in page in{" "}
            <span className="font-semibold text-black">
              {`00:${countdown.toString().padStart(2, "0")}`}
            </span>.
          </p>
        </motion.div>
      </div>

      {/* Right Panel */}
      <div className="flex-grow h-full rounded-2xl overflow-hidden">
        <PhotoSlide />
      </div>
    </main>
  );
}
