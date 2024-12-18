import { motion } from "framer-motion";
const WhiteButton = ({
  children,
  onclick,
}: {
  children: any;
  onclick: any;
 
}) => {
  return (
    <motion.div
      onClick={onclick}
      className="relative cursor-pointer w-[45%] mx-auto mt-[20px]"
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="absolute top-1 left-1 w-full h-full bg-whiet rounded-full z-0 bg-black" />

      <div className="bg-[#000000] p-[4px] rounded-full relative">
        <button className="font-suisse-bold font-black text-black h-full w-full bg-[#ffffff] rounded-full flex items-center justify-center p-[10px] gap-[10px] uppercase z-10">
          {children}
        </button>
      </div>
    </motion.div>
  );
};

export default WhiteButton;
