import { useLocation, useMatch } from "react-router-dom";
import { Link } from "react-router-dom";
import DegenLogo from "../../assets/degen-logo.svg";
import { BackButtonSVG, HamburgerMenuSVG, PointsSVG } from "./svgs";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { degenPoints } from "../../atoms/degen-points";
import { formatPoints } from "../../utils/format";
const Header = ({ toggleModal }: { toggleModal: any }) => {
  const location = useLocation();
  const isLounge = useMatch("/lounge/:ca");
  const points = useRecoilValue(degenPoints);

  return (
    <div className=" bg-white w-[90%] mx-auto flex justify-between pt-[15px] items-center">
      {isLounge && (
        <Link to={"/lounge"}>
          <motion.div
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className=""
          >
            <BackButtonSVG />
          </motion.div>
        </Link>
      )}
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
          <div className="  relative top-[-40px] left-[50px] font-microgemma  text-black text-[16px]">
            {formatPoints(points)}
          </div>
          <div className=" mt-[-25px] flex items-center gap-[5px] justify-center">
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
