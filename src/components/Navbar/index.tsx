import { Link } from "react-router-dom";
import ChatButton from "./chat-button";
import LoungeButton from "./lounge-button";
import ProfileButton from "./profile-button";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
const Navbar = () => {
  const location = useLocation();
  return (
    <div className="  bg-white h-full flex items-center w-[90%] md:w-[50%] mx-auto">
      <div className=" flex justify-between w-full">
        <Link to={"/"}>
          <motion.div
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <ChatButton currentLocation={location.pathname} />
          </motion.div>
        </Link>
        <Link to={"/lounge"}>
          <motion.div
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <LoungeButton currentLocation={location.pathname} />
          </motion.div>
        </Link>
        <Link to={"/profile"}>
          <motion.div
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <ProfileButton currentLocation={location.pathname} />
          </motion.div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
