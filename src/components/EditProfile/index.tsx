import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { SolanaSVG } from "../Profile/icons";
import GreenButton from "../Buttons/GreenButton";
import WhiteButton from "../Buttons/WhiteButton";
import { CancelSVG, SaveSVG } from "./icons";
const EditProfile = () => {
  const { walletAddress } = useParams();
  const [username, setUsername] = useState<string | null>();
  const [newWalletAddress, setNewWalletAddress] = useState<string | null>();
  const [profilePic, setProfilePic] = useState<string | undefined>();
  useEffect(() => {
    setUsername("Degen boss");
    setProfilePic(
      "https://nftnow.com/wp-content/uploads/2022/10/kiwami-3428.png"
    );
  }, []);
  const navigate = useNavigate();
  return (
    <div className=" w-full mt-[20px] sm:mt-[40px]">
      <div className="">
        <div className="relative w-[90vw] sm:w-[50vw] max-w-md  mx-auto">
          <div
            className="absolute top-[5px] left-[5px] rounded-[4px] border-[2px] border-transparent w-full h-full bg-black"
            style={{ zIndex: -1 }}
          ></div>
          <div className="relative rounded-[4px] border-black border-[2px] bg-white text-black p-[20px]">
            <div className=" rounded-[16px] border-[4px] border-[#4EAB5E] flex items-center gap-[10px] w-[95%] mx-auto p-[10px]">
              <SolanaSVG color="#3d3d3d" />
              <p className=" uppercase font-sofia-bold text-[16px] text-[#3d3d3d] flex items-center gap-[10px]">
                {walletAddress?.slice(0, 4)}....{walletAddress?.slice(-4)}{" "}
                <span className=" text-[12px] font-sofia-regular font-black lowercase">
                  {" "}
                  (connected)
                </span>
              </p>
            </div>
            <div className=" mt-[20px] flex items-center gap-[20px]">
              <div className="h-[70px] w-[70px] rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={profilePic}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div>
                <p className=" uppercase font-sofia-bold text-[20px] text-[#3d3d3d]">
                  {username}
                </p>
                <p className=" font-sofia-regular text-[16px] font-black text-[#8F95B2]">
                  Image/gif less than 10 MB
                </p>
              </div>
            </div>
            <div className=" mt-[20px]">
              <input
                type="text"
                placeholder="username"
                className="w-full text-[20px] text-[#3d3d3d] placeholder-[#8F95B2] uppercase font-sofia-bold focus:outline-none py-1 "
              />
              <div className="w-[80%] bg-gradient-to-r from-[#3D3D3D] to-[#ffffff] h-[2px] mt-[px] mb-[15px] " />
            </div>
            <div className=" flex items-center justify-between">
              <WhiteButton onclick={() => navigate(-1)}>
                <CancelSVG />
                Cancel
              </WhiteButton>
              <GreenButton onclick={() => {}} disabled>
                <SaveSVG />
                Save
              </GreenButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
