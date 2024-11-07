import Message from "./Message";

interface MessageType {
  username: any;
  text: string;
  sender_pfp: string;
  walletAddress: string;
}
interface ChatComponentType {
  initialMessages: MessageType[];
  newMessages: MessageType[];
  handleOpenModal: any;
}
const DefaultChatAnimation: React.FC<ChatComponentType> = ({
  initialMessages,
  newMessages,
  handleOpenModal,
}) => {
  return (
    <div>
      {initialMessages.map((msg, index) => (
        <div
          key={`initial-${index}`}
          onClick={() => handleOpenModal(msg)}
          className="cursor-pointer w-[90%] md:w-full mx-auto"
        >
          <Message
            username={msg.username}
            text={msg.text}
            sender_pfp={msg.sender_pfp}
          />
          {index !== initialMessages.length - 1 && (
            <div className="w-[80%] md:w-[50%] md:mx-auto bg-gradient-to-r from-[#3D3D3D] to-[#ffffff] h-[2px] mt-[15px] mb-[15px]" />
          )}
        </div>
      ))}
      {newMessages.map((msg, index) => (
        <div
          key={`new-${index}`}
          onClick={() => handleOpenModal(msg)}
          className="cursor-pointer w-[90%] md:w-full mx-auto"
        >
          <div className="w-[80%] md:w-[50%] md:mx-auto bg-gradient-to-r from-[#3D3D3D] to-[#ffffff] h-[2px] mt-[15px] mb-[15px]" />
          <Message
            username={msg.username}
            text={msg.text}
            sender_pfp={msg.sender_pfp}
          />
        </div>
      ))}
    </div>
  );
};

export default DefaultChatAnimation;
