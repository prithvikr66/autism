import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import WalletConnect from "../../utils/wallet-connect";
import Message from "./Message";
import MessageModal from "./modal";
import { messages } from "./data";

const Chat = () => {
  const { connected } = useWallet();
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleOpenModal = (msg:any) => {
    setSelectedMessage(msg);
  };

  const handleCloseModal = () => {
    setSelectedMessage(null);
  };

  return (
    <div className="h-full w-[90%] mx-auto">
      {messages.map((msg, index) => (
        <div key={index} onClick={() => handleOpenModal(msg)} className="cursor-pointer">
          <Message username={msg.username} message={msg.message} pfp={msg.profilePic} />
          <div className="w-[80%] bg-gradient-to-r from-[#3D3D3D] to-[#ffffff] h-[2px] mt-[15px] mb-[15px]" />
        </div>
      ))}
      {connected ? <div></div> : <WalletConnect />}

      <MessageModal
        toggleModal={handleCloseModal}
        message={selectedMessage}
      />
    </div>
  );
};

export default Chat;
