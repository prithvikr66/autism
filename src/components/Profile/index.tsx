import { useState, useEffect } from "react";
import TreasureChest from "../../assets/TreasureChest.png";
import DegenPoints from "../../assets/DegenPoints.svg";

import { lineSpinner } from "ldrs";
import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import ConnectButton from "./connect";
import DisconnectButton from "./disconnect";
import { EditSVG } from "./icons";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/users";
import DegenLogo from "../../assets/degen-logo.svg";
const Profile = () => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  lineSpinner.register();

  useEffect(() => {
    const image = new Image();
    image.src = DegenPoints;
    image.onload = () => setLoading(false);
  }, []);

  const { publicKey } = useWallet();
  const user = useRecoilValue(userState);
  // useEffect(() => {

  //   setWalletAddress(publicKey?.toString());
  //   setProfilePic(
  //     "https://nftnow.com/wp-content/uploads/2022/10/kiwami-3428.png"
  //   );
  // }, [publicKey]);


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
          <div className=" flex flex-col md:flex-row md:justify-between md:items-center">
            {publicKey && (
              <div className="">
                <div
                  className="relative w-[90%] md:w-[300px]  z-30 mx-auto"
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
                          src={user.profilePic ? user.profilePic : DegenLogo}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div>
                        <p className=" uppercase font-sofia-bold text-[20px] text-[#3d3d3d]">
                          {user.username.length > 15
                            ? `${user.username.slice(
                                0,
                                5
                              )}...${user.username.slice(-5)}`
                            : user.username}
                        </p>
                        <p className=" font-sofia-regular text-[16px] font-black text-[#B280D9]">
                          {user.walletAddress?.slice(0, 4)}...
                          {user.walletAddress?.slice(-4)}
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      onClick={() =>
                        navigate(`/profile/edit/${publicKey.toString()}`)
                      }
                    >
                      <EditSVG />
                    </motion.button>
                  </div>
                </div>
              </div>
            )}
            <div className="relative w-[90%] md:w-[300px] mx-auto mt-[20px]  md:mx-0">
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
            <div className="relative w-[90%] md:w-[300px]  mx-auto rounded-[4px] bg-[#4EAB5E] p-[3px]  mt-[30px]">
              <div
                className="absolute top-[5px] left-[5px] rounded-[4px] border-transparent w-full h-full bg-[#4EAB5E]"
                style={{ zIndex: -1 }}
              ></div>
              <div className="w-full rounded-[4px] h-full bg-[#ffffff] p-[20px] flex items-center justify-between">
                <div className="flex flex-col gap-[8px]">
                  <p className=" font-sofia-bold text-[22px] sm:text-[24px] lg:text-[26px] xl:text-[28px] text-[#F27360]">
                    points calculation
                  </p>
                  <p className="font-sofia-bold font-light text-[20px] sm:text-[22px] lg:text-[24px] xl:text-[26px] text-[#3d3d3d]">
                    1 msg = 1 point
                  </p>
                </div>
                <div>
                  <img src={TreasureChest} alt="Smiley" />
                </div>
              </div>
            </div>
            <div className=" md:hidden">
              {!publicKey && <ConnectButton> Connect & Ape</ConnectButton>}
            </div>
            <div className=" md:hidden">
              {publicKey && <DisconnectButton />}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
