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
      {loading? (
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
          <div className="relative w-[90%] sm:w-[50%] lg:w-[40%] mx-auto">
            <img
              src={DegenPoints}
              className="w-full h-auto"
              alt="Degen Points"
            />
            <div className="absolute inset-0 p-[20px]">
              <h2 className="font-sofia-bold font-black text-white text-[40px]">
                XXXX
              </h2>
              <p className="font-sofia-bold text-white font-light">
                degen points
              </p>
            </div>
          </div>
          <div className="relative w-[90%] mx-auto rounded-[4px] bg-[#F8D75A] p-[3px] sm:w-[50%] lg:w-[40%] mt-[30px]">
            <div
              className="absolute top-[5px] left-[5px] rounded-[4px] border-transparent w-full h-full bg-[#F8D75A]"
              style={{ zIndex: -1 }}
            ></div>
            <div className="w-full rounded-[4px] h-full bg-[#4EAB5E] p-[20px] flex items-center justify-between">
              <div className="flex flex-col gap-[8px]">
                <p className="font-abzee-italic text-[22px] sm:text-[24px] lg:text-[26px] xl:text-[28px] text-[#3D3D3D]">
                  points calculation
                </p>
                <p className="font-sofia-bold font-light text-[20px] sm:text-[22px] lg:text-[24px] xl:text-[26px] text-[#F8D75A]">
                  1 msg = 1 point
                </p>
                <p className="font-sofia-bold font-light text-[20px] sm:text-[22px] lg:text-[24px] xl:text-[26px] text-[#F8D75A]">
                  u spam? u gay!
                </p>
                <p className="font-sofia-bold font-light text-[20px] sm:text-[22px] lg:text-[24px] xl:text-[26px] text-[#FFFFFF]">
                  there might be a drop :-)
                </p>
              </div>
              <div>
                <img src={Smiley} alt="Smiley" />
              </div>
            </div>
          </div>
          <div>
            <motion.button
              className="flex justify-center w-full mt-[40px]"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <ConnectButton />
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
