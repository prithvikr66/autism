import { Link } from "react-router-dom";
import ChatButton from "./chat-button";
import LoungeButton from "./lounge-button";
import ProfileButton from "./profile-button";
import { useLocation } from "react-router-dom";
const Navbar = () => {
  const location = useLocation();
  return (
    <div className="  h-full flex items-center w-[95%] mx-auto">
      <div className=" flex justify-between w-full">
        <Link to={"/"}>
          <ChatButton currentLocation = {location.pathname}/>
        </Link>
        <Link to={"/lounge"}>
          <LoungeButton currentLocation = {location.pathname}/>
        </Link>
        <Link to={"/profile"}>
          <ProfileButton currentLocation = {location.pathname}/>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
