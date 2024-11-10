import { useLocation, useMatch } from "react-router-dom";
import { Link } from "react-router-dom";
import DegenLogo from "../../assets/degen-logo.svg";
import { HamburgerMenuSVG, PointsSVG } from "./svgs";
import { motion } from "framer-motion";
const Header = ({ toggleModal }: { toggleModal: any }) => {
  const location = useLocation();
  const isLounge = useMatch("/lounge/:ca");
  return (
    <div className=" bg-white w-[90%] mx-auto flex justify-between mt-[15px] items-center">
      <Link to={"/"}>
        <motion.div
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className=""
        >
          <img src={DegenLogo} />
        </motion.div>
      </Link>
      {location.pathname !== "/profile" && !isLounge && (
        <div className="">
          <PointsSVG />
          <div className=" flex items-center gap-[5px] justify-center">
            <div className=" rounded-full bg-[#4EAB5E] h-[8px] w-[8px]"></div>
            <p className=" font-sofia-regular font-black uppercase text-[12px] sm:text-[15px] md:text-[17px] xl:text-[20px]">
              420 online
            </p>
          </div>
        </div>
      )}

      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={toggleModal}
        className=" "
      >
        <HamburgerMenuSVG />
      </motion.button>
    </div>
  );
};

export default Header;
