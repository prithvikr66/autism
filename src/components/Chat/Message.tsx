interface MessageProps {
  message: string;
  username: string;
  pfp: string;
}
const Message: React.FC<MessageProps> = ({ message, username, pfp }) => {
  const colors = [
    "#B280D9",
    "#FF69B4",
    "#F27360",
    "#3D3D3D",
    "#4EAB5E",
    "#F2A7B0",
    "#0000FF",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className=" flex gap-[20px] ">
      <div className=" h-[40px] w-[40px] rounded-full overflow-hidden flex-shrink-0 ">
        <img src={pfp} className=" w-full h-full object-cover object-center" />
      </div>
      <div>
        <p
          style={{ color: randomColor }}
          className=" font-suisse-regular uppercase italic text-[14px]"
        >
          {username}
        </p>
        <p className=" font-sofia-regular text-[18px] text-[#3D3D3D]">
          {message}
        </p>
      </div>
    </div>
  );
};

export default Message;
