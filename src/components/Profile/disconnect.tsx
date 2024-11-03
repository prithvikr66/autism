import { motion } from "framer-motion";
import { DisconnectSVG } from "./icons";
import { useWallet } from "@solana/wallet-adapter-react";

const DisconnectButton = () => {
    const {disconnect} = useWallet()
  return (
    <motion.div
      className="relative cursor-pointer w-[90%] mx-auto mt-[20px]"
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="absolute top-1 left-1 w-full h-full bg-[#F27360] rounded-full z-0" />

      <div className="bg-[#F27360] p-[4px] rounded-full relative">
        <button
         onClick={async () => {
            await disconnect();
          }}
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "9999px",
            padding: "10px",
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            gap:"10px",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "20px",
            textTransform: "uppercase",
            color: "#F27360",
            fontFamily: "Sofia-Pro-Bold,sans-serif",
          }}
        >
          <DisconnectSVG />
          Disconnect
        </button>
      </div>
    </motion.div>
  );
};

export default DisconnectButton;
