import { motion } from "framer-motion";

export const ApeButton = () => {
  return (
    <motion.div
      className="relative cursor-pointer w-[90%] mx-auto mt-[20px]"
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="absolute top-1 left-1 w-full h-full bg-black rounded-full z-0" />

      <div className="bg-[#F8D75A] p-[4px] rounded-full relative">
        <button className="font-suisse-regular font-black text-white h-full w-full bg-[#4EAB5E] rounded-full flex items-center justify-center p-[10px] gap-[10px] uppercase z-10">
          <ThunderSVG />
          <p>Ape now</p>
        </button>
      </div>
    </motion.div>
  );
};

const ThunderSVG = () => {
  return (
    <svg
      width="19"
      height="22"
      viewBox="0 0 19 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.0331 0.526346C18.0072 0.468495 17.9651 0.419415 17.9118 0.385088C17.8585 0.35076 17.7964 0.332667 17.7331 0.333013H8.44639C8.39062 0.333106 8.33576 0.347192 8.28684 0.37398C8.23792 0.400769 8.19651 0.439404 8.16639 0.486346L1.02639 11.8197C0.992016 11.869 0.971933 11.9269 0.968353 11.9869C0.964773 12.047 0.977835 12.1068 1.0061 12.1599C1.03437 12.213 1.07674 12.2573 1.12855 12.2878C1.18036 12.3183 1.23959 12.334 1.29972 12.333H6.41306L1.89972 21.1663C1.87381 21.2189 1.86163 21.2771 1.86432 21.3356C1.86701 21.3941 1.88449 21.451 1.91511 21.501C1.94574 21.5509 1.98851 21.5922 2.03945 21.6212C2.09039 21.6501 2.14782 21.6656 2.20639 21.6663H4.20639C4.25266 21.6667 4.29848 21.6573 4.34095 21.639C4.38342 21.6206 4.4216 21.5936 4.45306 21.5597L16.1664 8.89968C16.2129 8.85228 16.2442 8.79208 16.2562 8.72678C16.2683 8.66148 16.2606 8.59407 16.2341 8.53319C16.2076 8.47231 16.1635 8.42073 16.1075 8.38506C16.0515 8.3494 15.9861 8.33127 15.9197 8.33301H11.4264L17.9797 0.879679C18.022 0.832329 18.0495 0.773699 18.059 0.710952C18.0685 0.648204 18.0594 0.584056 18.0331 0.526346Z"
        fill="white"
      />
    </svg>
  );
};
