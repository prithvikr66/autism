import { motion } from "framer-motion";
const GreenButton = ({
  children,
  onclick,
}: {
  children: any;
  onclick: any;
}) => {
  return (
    <motion.div
      onClick={onclick}
      className="relative cursor-pointer w-[40%] mx-auto mt-[20px]"
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="absolute top-1 left-1 w-full h-full bg-black rounded-full z-0" />

      <div className="bg-[#F8D75A] p-[4px] rounded-full relative">
        <button className="font-suisse-bold font-black text-white h-full w-full bg-[#4EAB5E] rounded-full flex items-center justify-center p-[10px] gap-[10px] uppercase z-10">
          {children}
        </button>
      </div>
    </motion.div>
  );
};

export default GreenButton;
