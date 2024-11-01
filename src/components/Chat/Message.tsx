import React, { useMemo } from "react";
import DefaultProfilePic from "../../assets/degen-logo.svg";
interface MessageProps {
  text: string;
  username: string;
  sender_pfp: string;
}

const Message: React.FC<MessageProps> = ({ text, username, sender_pfp }) => {
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
      username.split("").reduce((acc, char) => {
        return acc + char.charCodeAt(0);
      }, 0) % colors.length;

    return colors[index];
  }, [username]);

  const truncatedMessage =
    text.length > 220 ? `${text.substring(0, 220)}...` : text;

  return (
    <div className="flex gap-[20px] mt-[15px] md:w-[50%] md:mx-auto">
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
      <div>
        <p
          style={{ color: randomColor }}
          className=" font-sofia-bold uppercase font-semibold text-[14px] sm:text-[20px]"
        >
          {username}
        </p>
        <p className="font-sofia-regular  font-black text-[18px] sm:text-[22px] text-[#3D3D3D]">
          {truncatedMessage}
        </p>
      </div>
    </div>
  );
};

export default Message;
