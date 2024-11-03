import { WalletModalButton } from "@solana/wallet-adapter-react-ui";
import { motion } from "framer-motion";
import { SolanaSVG } from "./icons";

const ConnectButton = ({ children }: { children: any }) => {
  return (
    <motion.div
      className="relative cursor-pointer w-[90%] mx-auto mt-[20px]"
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="absolute top-1 left-1 w-full h-full bg-black rounded-full z-0" />

      <div className="bg-[#000000] p-[4px] rounded-full relative">
        <WalletModalButton
          style={{
            backgroundColor: "#B280D9",
            borderRadius: "9999px",
            padding: "10px",
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "20px",
            textTransform: "uppercase",
            color: "#FFFFFF",
            fontFamily: "Sofia-Pro-Bold,sans-serif",
          }}
        >
          <SolanaSVG color="#ffffff" />
          {children}
        </WalletModalButton>
      </div>
    </motion.div>
  );
};

export default ConnectButton;
