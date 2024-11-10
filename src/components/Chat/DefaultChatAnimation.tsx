import Message from "./Message";

interface ReactionsType {
  floor_rolling_laugh: number;
  fire: number;
  crying_face: number;
  angry_sad_unhappy: number;
  poop: number;
  clown: number;
}
interface MessageType {
  _id: string;
  username: any;
  text: string;
  sender_pfp: string;
  walletAddress: string;
  reactions: ReactionsType;
  timestamp?: string;
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
    <div className=" overflow-y-auto">
      {initialMessages.map((msg, index) => (
        <div
          key={msg._id}
          onClick={() => handleOpenModal(msg)}
          className="cursor-pointer w-[90%] md:w-full mx-auto"
        >
          <Message
            username={msg.username}
            text={msg.text}
            sender_pfp={msg.sender_pfp}
            reactions={msg.reactions}
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
            reactions={msg.reactions}
          />
        </div>
      ))}
    </div>
  );
};

export default DefaultChatAnimation;
