import { useState, useEffect } from "react";
import Smiley from "../../assets/Smiley.svg";
import DegenPoints from "../../assets/DegenPoints.svg";
import ConnectButton from "./connect";
import { motion } from "framer-motion";
import { lineSpinner } from "ldrs";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  lineSpinner.register();

  useEffect(() => {
    const image = new Image();
    image.src = DegenPoints;
    image.onload = () => setLoading(false);
  }, []);

  return (
    <div className="w-full mt-[20px]">
      {loading ? (
        <div className="flex justify-center items-center h-[500px] ">
          <l-line-spinner
            size="40"
            stroke="3"
            speed="1"
            color="black"
          ></l-line-spinner>
        </div>
      ) : (
        <>
          <div className="fixed inset-0 z-20 flex items-center justify-center">
            <div className="fixed inset-0 bg-white bg-opacity-70 backdrop-filter"></div>
            <div
              className="relative w-[90vw] sm:w-[50vw] max-w-md z-30"
              style={{ zIndex: 30 }}
            >
              <div
                className="absolute top-[5px] left-[5px] rounded-[4px] border-[2px] border-transparent w-full h-full bg-black"
                style={{ zIndex: -1 }}
              ></div>
              <div className="relative rounded-[4px] border-black border-[2px] bg-white text-black p-[20px]"></div>
            </div>
          </div>
          <div className="h-[50px] w-[50px] sm:h-[60px] sm:w-[60px] lg:w-[70px] lg:h-[70px] xl:w-[80px] xl:h-[80px] rounded-full overflow-hidden flex-shrink-0">
          <img
            src={pfp}
            className="w-full h-full object-cover object-center"
            alt="Profile"
          />
        </div>
        </>
      )}
    </div>
  );
};

export default Profile;
