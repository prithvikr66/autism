import WalletConnect from "../../utils/wallet-connect";
import Message from "./Message";
import { messages } from "./data";

const Chat = () => {
  return (
    <div className="h-full w-[90%] mx-auto">
      {messages.map((msg, index) => {
        return (
          <div className="">
            <Message
              key={index}
              username={msg.username}
              message={msg.message}
              pfp={msg.profilePic}
            />
            <div className=" w-[80%] bg-gradient-to-r from-[#3D3D3D] to-[#ffffff] h-[2px] mt-[15px] mb-[15px] " />
          </div>
        );
      })}
      <WalletConnect />
    </div>
  );
};

export default Chat;
