import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { motion } from "framer-motion";
import { userState } from "../../atoms/users";
import { EditSVG, SolanaSVG } from "./icons";
import ConnectButton from "./connect";
import DisconnectButton from "./disconnect";
import TreasureChest from "../../assets/TreasureChest.png";
import DegenPoints from "../../assets/DegenPoints.svg";
import DegenLogo from "../../assets/degen-logo.svg";
import { degenPoints } from "../../atoms/degen-points";
import { formatPoints } from "../../utils/format";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { publicKey } = useWallet();
  const user = useRecoilValue(userState);
  const points = useRecoilValue(degenPoints);

  useEffect(() => {
    const image = new Image();
    image.src = DegenPoints;
    image.onload = () => setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[500px]">
        <l-line-spinner size="40" stroke="3" speed="1" color="black" />
      </div>
    );
  }

  return (
    <div className="w-full lg:w-[90%] lg:mx-auto mt-[20px] lg:flex  lg:flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] px-4">
        {/* Section 1 - Profile Card */}
        {publicKey && (
          <div className="w-full lg:h-[100%]">
            <div
              className="relative w-full lg:h-[90%] z-30"
              style={{ zIndex: 30 }}
            >
              <div
                className="absolute top-[5px] left-[5px] rounded-[4px] border-[2px] border-transparent w-full h-full bg-black"
                style={{ zIndex: -1 }}
              ></div>
              <div className="relative rounded-[4px] border-black border-[2px] bg-white text-black p-[20px] flex items-center justify-between lg:h-[100%]">
                <div className="flex gap-[20px] items-center">
                  <div className="h-[70px] w-[70px] lg:h-[90px] lg:w-[90px] rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={user.profilePic ? user.profilePic : DegenLogo}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <p className="uppercase font-sofia-bold text-[20px] lg:text-[25px] xl:text-[30px] text-[#3d3d3d]">
                      {user.username.length > 15
                        ? `${user.username.slice(0, 5)}...${user.username.slice(
                            -5
                          )}`
                        : user.username}
                    </p>
                    <p className="font-sofia-regular text-[16px] lg:text-[20px] font-black text-[#B280D9]">
                      {user.walletAddress?.slice(0, 4)}...
                      {user.walletAddress?.slice(-4)}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
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

        {/* Section 2 - Degen Points Card */}
        <div className="w-full ">
          <div className="relative w-full ">
            <img src={DegenPoints} className="w-full h-auto " />
            <div className="absolute inset-0 p-[20px]">
              <h2 className=" font-microgemma font-black text-white text-[30px] md:text-[40px]">
                {formatPoints(points)}
              </h2>
              <p className="font-sofia-bold text-white font-light text-[16px] md:text-[20px]">
                degen points
              </p>
            </div>
          </div>
        </div>

        {/* Section 3 - Points Calculation Card */}
        <div className="w-full lg:h-full">
          <div className="relative w-full lg:h-[90%] rounded-[4px] bg-[#4EAB5E] p-[3px]">
            <div
              className="absolute top-[5px] left-[5px] rounded-[4px] border-transparent w-full h-full bg-[#4EAB5E]"
              style={{ zIndex: -1 }}
            ></div>
            <div className="w-full rounded-[4px] h-full bg-[#ffffff] p-[20px] flex items-center justify-between">
              <div className="flex flex-col gap-[8px]">
                <p className="font-sofia-bold text-[22px] sm:text-[24px] lg:text-[26px] xl:text-[28px] text-[#F27360]">
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
        </div>
      </div>

      {/* Wallet Buttons - Mobile Only */}
      <div className="mt-[20px] md:hidden">
        {!publicKey ? (
          <ConnectButton>Connect & Ape</ConnectButton>
        ) : (
          <DisconnectButton />
        )}
      </div>

      <div>
        {publicKey && (
          <div className=" w-[50%] mx-auto hidden md:block mt-[200px] lg:mt-[300px]">
            <div className=" w-[90%]  mx-auto border-[4px] rounded-[16px] border-[#4EAB5E] flex items-center p-[10px] gap-[20px] font-sofia-bold uppercase font-semibold text-[#3d3d3d]">
              <SolanaSVG color="#3d3d3d" />
              {publicKey.toString().slice(0, 5)}...
              {publicKey.toString().slice(-5)}
              <span className=" font-sofia-regular lowercase">(connected)</span>
            </div>
            <DisconnectButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
