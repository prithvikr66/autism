import React, { useMemo } from "react";
import DefaultProfilePic from "../../assets/degen-logo.svg";
import LaughingEmoji from "../../assets/Emojis/LaughingEmoji.svg";
import AngryEmoji from "../../assets/Emojis/AngryEmoji.svg";
import CryingEmoji from "../../assets/Emojis/CryingEmoji.svg";
import PoopEmoji from "../../assets/Emojis/PoopEmoji.svg";
import ClownEmoji from "../../assets/Emojis/ClownEmoji.svg";
import FireEmoji from "../../assets/Emojis/FireEmoji.svg";

interface ReactionsType {
  floor_rolling_laugh: number;
  fire: number;
  crying_face: number;
  angry_sad_unhappy: number;
  poop: number;
  clown: number;
}

interface MessageProps {
  id?: string;
  username: any;
  text: string;
  sender_pfp: string;
  walletAddress?: string;
  reactions: ReactionsType;
  timestamp?: string;
}

const Message: React.FC<MessageProps> = ({
  text,
  username,
  sender_pfp,
  reactions,
}) => {
  const colors = [
    "#B280D9",
    "#FF69B4",
    "#F27360",
    "#3D3D3D",
    "#4EAB5E",
    "#F2A7B0",
    "#0000FF",
  ];

  const randomColor = useMemo(() => {
    const index =
      username.split("").reduce((acc: any, char: any) => {
        return acc + char.charCodeAt(0);
      }, 0) % colors.length;

    return colors[index];
  }, [username]);

  const truncatedMessage =
    text.length > 220 ? `${text.substring(0, 220)}...` : text;

  return (
    <div className="flex gap-[10px] md:gap-[20px] mt-[15px] md:w-[50%] md:mx-auto ">
      <div
        className={`h-[40px] w-[40px] rounded-full overflow-hidden flex-shrink-0 ${
          !sender_pfp ? "border border-black" : ""
        }`}
      >
        <img
          src={sender_pfp ? sender_pfp : DefaultProfilePic}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className=" w-full flex flex-col ">
        <p
          style={{ color: randomColor }}
          className=" font-sofia-bold uppercase font-semibold text-[14px] sm:text-[20px]"
        >
          {username}
        </p>
        <p className="font-sofia-regular  font-black text-[18px] sm:text-[22px] text-[#3D3D3D]">
          {truncatedMessage}
        </p>
        <div className=" flex items-center sm:gap-[10px] md:gap-[15px] w-full gap-[5px]">
          {reactions?.floor_rolling_laugh > 0 && (
            <div className=" px-[5px]  border-[1px] border-[#F8D75A] rounded-[3px] p-[2px] flex gap-[2px] items-center  ">
              <img src={LaughingEmoji} className=" w-[15px] h-[15px]" />
              <p className=" font-sofia-bold text-[12px] font-light text-[#3d3d3d]">
                {reactions?.floor_rolling_laugh > 0 &&
                  reactions?.floor_rolling_laugh}
              </p>
            </div>
          )}
          {reactions?.fire > 0 && (
            <div className=" px-[5px]  border-[1px] border-[#4EAB5E] rounded-[3px] p-[2px] flex gap-[2px] items-center  ">
              <img src={FireEmoji} className=" w-[15px] h-[15px]" />
              <p className=" font-sofia-bold text-[12px] font-light text-[#3d3d3d]">
                {reactions?.fire > 0 && reactions?.fire}
              </p>
            </div>
          )}
          {reactions?.crying_face > 0 && (
            <div className=" px-[5px]  border-[1px] border-[#A7AAF2] rounded-[3px] p-[2px] flex gap-[2px] items-center  ">
              <img src={CryingEmoji} className=" w-[15px] h-[15px]" />
              <p className=" font-sofia-bold text-[12px] font-light text-[#3d3d3d]">
                {reactions?.crying_face > 0 && reactions?.crying_face}
              </p>
            </div>
          )}
          {reactions?.angry_sad_unhappy > 0 && (
            <div className=" px-[5px]  border-[1px] border-[#F27360] rounded-[3px] p-[2px] flex gap-[2px] items-center  ">
              <img src={AngryEmoji} className=" w-[15px] h-[15px]" />
              <p className=" font-sofia-bold text-[12px] font-light text-[#3d3d3d]">
                {reactions?.angry_sad_unhappy > 0 &&
                  reactions?.angry_sad_unhappy}
              </p>
            </div>
          )}
          {reactions?.poop > 0 && (
            <div className=" px-[5px]  border-[1px] border-[#EFB03D] rounded-[3px] p-[2px] flex gap-[2px] items-center  ">
              <img src={PoopEmoji} className=" w-[15px] h-[15px]" />
              <p className=" font-sofia-bold text-[12px] font-light text-[#3d3d3d]">
                {reactions?.poop > 0 && reactions?.poop}
              </p>
            </div>
          )}
          {reactions?.clown > 0 && (
            <div className=" px-[5px]  border-[1px] border-[#F2A7B0] rounded-[3px] p-[2px] flex gap-[2px] items-center  ">
              <img src={ClownEmoji} className=" w-[15px] h-[15px]" />
              <p className=" font-sofia-bold text-[12px] font-light text-[#3d3d3d]">
                {reactions?.clown > 0 && reactions?.clown}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
