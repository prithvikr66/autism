import { ChatActiveSVG, ChatInactiveSVG } from "../../assets/icons";

const ChatButton = ({ currentLocation }: { currentLocation: string }) => {
  return (
    <>{currentLocation === "/" ? <ChatActiveSVG /> : <ChatInactiveSVG />}</>
  );
};

export default ChatButton;
