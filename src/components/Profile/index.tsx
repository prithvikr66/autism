import { useState, useEffect } from "react";
import Smiley from "../../assets/Smiley.svg";
import DegenPoints from "../../assets/DegenPoints.svg";

import { lineSpinner } from "ldrs";
import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import ConnectButton from "./connect";
import DisconnectButton from "./disconnect";
import { EditSVG } from "./icons";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>();
  const [walletAddress, setWalletAddress] = useState<string | null>();
  const [profilePic, setProfilePic] = useState<string | undefined>();
  const navigate = useNavigate();
  lineSpinner.register();

  useEffect(() => {
    const image = new Image();
    image.src = DegenPoints;
    image.onload = () => setLoading(false);
  }, []);

  const { publicKey } = useWallet();
  useEffect(() => {
    setUsername("Degen boss");
    setWalletAddress("6YSeXdSk6YbsJNQnmPRvhFgHaBKZQ5cpREv5pz79Swm8");
    setProfilePic(
      "https://nftnow.com/wp-content/uploads/2022/10/kiwami-3428.png"
    );
  });

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
          {publicKey && (
            <div className="">
              <div
                className="relative w-[90vw] sm:w-[50vw] max-w-md z-30 mx-auto"
                style={{ zIndex: 30 }}
              >
                <div
                  className="absolute top-[5px] left-[5px] rounded-[4px] border-[2px] border-transparent w-full h-full bg-black"
                  style={{ zIndex: -1 }}
                ></div>
                <div className="relative rounded-[4px] border-black border-[2px] bg-white text-black p-[20px] flex items-center justify-between">
                  <div className=" flex gap-[20px] items-center">
                    <div className="h-[70px] w-[70px] rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={profilePic}
                        className="w-full h-full object-cover object-center"
                        alt="Profile"
                      />
                    </div>
                    <div>
                      <p className=" uppercase font-sofia-bold text-[20px] text-[#3d3d3d]">
                        {username}
                      </p>
                      <p className=" font-sofia-regular text-[16px] font-black text-[#B280D9]">
                        {walletAddress?.slice(0, 4)}...
                        {walletAddress?.slice(-4)}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    onClick={() => navigate(`/profile/edit/${walletAddress}`)}
                  >
                    <EditSVG />
                  </motion.button>
                </div>
              </div>
            </div>
          )}
          <div className="relative w-[90%] sm:w-[50%] lg:w-[40%] mx-auto mt-[20px]">
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
          <div>{!publicKey && <ConnectButton />}</div>
          <div>{publicKey && <DisconnectButton />}</div>
        </>
      )}
    </div>
  );
};

export default Profile;
