import React, { useMemo } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
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
  username: string;
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
    const index = username.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  }, [username]);

  const truncatedMessage = text.length > 220 ? `${text.substring(0, 220)}...` : text;

  const reactionConfigs = [
    { key: "floor_rolling_laugh", emoji: LaughingEmoji, color: "#F8D75A" },
    { key: "fire", emoji: FireEmoji, color: "#4EAB5E" },
    { key: "crying_face", emoji: CryingEmoji, color: "#A7AAF2" },
    { key: "angry_sad_unhappy", emoji: AngryEmoji, color: "#F27360" },
    { key: "poop", emoji: PoopEmoji, color: "#EFB03D" },
    { key: "clown", emoji: ClownEmoji, color: "#F2A7B0" },
  ];

  return (
    <div className="flex gap-[10px] md:gap-[20px] mt-[15px] md:w-[50%] md:mx-auto">
      <div className={`h-[40px] w-[40px] rounded-full overflow-hidden flex-shrink-0 ${!sender_pfp ? "border border-black" : ""}`}>
        <img src={sender_pfp || DefaultProfilePic} className="w-full h-full object-cover object-center" />
      </div>
      <div className="w-full flex flex-col">
        <p style={{ color: randomColor }} className="font-sofia-bold uppercase font-semibold text-[14px] sm:text-[20px]">
          {username}
        </p>
        <p className="font-sofia-regular font-black text-[18px] sm:text-[22px] text-[#3D3D3D]">
          {truncatedMessage}
        </p>
        <div className="flex items-center sm:gap-[10px] md:gap-[15px] w-full gap-[5px]">
          {reactionConfigs.map(({ key, emoji, color }) => 
            reactions[key as keyof ReactionsType] > 0 && (
              <div key={key} className="px-[5px] border-[1px] rounded-[3px] p-[2px] flex gap-[2px] items-center" style={{ borderColor: color }}>
                <img src={emoji} className="w-[15px] h-[15px]" />
                {/* Motion.div with slot-machine effect for reaction count */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="font-sofia-bold text-[12px] font-light text-[#3d3d3d]"
                >
                  {reactions[key as keyof ReactionsType]}
                </motion.div>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Message;
