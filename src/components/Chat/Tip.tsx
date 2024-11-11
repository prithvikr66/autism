import { useEffect, useState } from "react";
import PigSVG from "../../assets/Pig.svg";
import DefaultProfilePic from "../../assets/degen-logo.svg";
import { SolanaSVG } from "../Profile/icons";
import { ThunderSVG } from "./icons";
import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
interface TipProps {
  walletAddress: string;
  username: string;
  pfp: string;
}
const Tip: React.FC<TipProps> = ({ pfp, username, walletAddress }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [disabled, setDisabled] = useState(true);
  const { publicKey, sendTransaction } = useWallet();
  const connection = new Connection(import.meta.env.VITE_RPC_URL);
  const [solPrice, setSolPrice] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        try {
          const balanceInLamports = await connection.getBalance(publicKey);

          const balanceInSol = balanceInLamports / 1e9;
          const fixedBalance = balanceInSol.toFixed(2);
          setBalance(Number(fixedBalance));
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      }
    };
    fetchBalance();
    fetchSolPrice();
  }, [publicKey]);

  const handleTip = async () => {
    if (disabled || !publicKey || !selectedAmount) return;
    if (!solPrice) {
      //   await fetchSolPrice();
      return;
    }
    const solAmount = selectedAmount / solPrice;
    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(walletAddress),
          lamports: solAmount * 1e9,
        })
      );

      const signature = await sendTransaction(transaction, connection);
        await connection.confirmTransaction(signature, "confirmed");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSolPrice = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
      );
      const data = await response.json();
      setSolPrice(data.solana.usd);
    } catch (error) {
      console.log("sol price err", error);
    }
  };

  return (
    <div>
      <div className=" flex  items-center gap-[15px]">
        <img src={PigSVG} />
        <p className=" mt-[4px] font-suisse-regular font-black text-black text-[20px]">
          Tip a fellow Degen :)
        </p>
      </div>
      <div className="w-[80%] bg-gradient-to-r from-[#3D3D3D] to-[#ffffff] h-[2px] mt-[15px] mb-[15px]" />
      <div className=" flex justify-between items-center">
        <div className="flex items-center gap-[10px]">
          <div
            className={`h-[50px] w-[50px] rounded-full overflow-hidden flex-shrink-0 ${
              !pfp ? "border border-black" : ""
            }`}
          >
            <img
              src={pfp ? pfp : DefaultProfilePic}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div>
            <p className="font-sofia-bold uppercase text-[20px] text-[#3d3d3d]">
              {username}
            </p>
            <p className="font-sofia-regular text-[14px] md:text-[16px] text-[#8F95B2] font-black uppercase">
              all tips paid in <span className=" text-[#B280D9]">SOL</span>
            </p>
          </div>
        </div>
        <div>
          <p className="font-sofia-regular text-[14px] md:text-[16px] text-[#8F95B2] font-black uppercase">
            sol balance
          </p>
          <div className="font-sofia-regular text-[14px] md:text-[16px] text-[#000000] font-black uppercase flex items-center gap-[5px]">
            <SolanaSVG color="#000000" /> {balance} sol
          </div>
        </div>
      </div>
      <div className="w-[80%] bg-gradient-to-r from-[#3D3D3D] to-[#ffffff] h-[2px] mt-[15px] mb-[15px]" />
      <div className=" flex justify-between items-center font-suisse-regular font-black text-[14px]">
        <button
          className={` rounded-[4px] border-black border-[2px] p-[5px] px-[10px] ${
            selectedAmount === 10 ? "bg-[#4EAB5E] text-white" : "text-black"
          }`}
          onClick={() => {
            setSelectedAmount(10);
            setDisabled(false);
          }}
        >
          $10
        </button>
        <button
          className={` rounded-[4px] border-black border-[2px] p-[5px] px-[10px] ${
            selectedAmount === 20 ? "bg-[#4EAB5E] text-white" : "text-black"
          }`}
          onClick={() => {
            setSelectedAmount(20);
            setDisabled(false);
          }}
        >
          $20
        </button>
        <button
          className={` rounded-[4px] border-black border-[2px] p-[5px] px-[10px] ${
            selectedAmount === 50 ? "bg-[#4EAB5E] text-white" : "text-black"
          }`}
          onClick={() => {
            setSelectedAmount(50);
            setDisabled(false);
          }}
        >
          $50
        </button>
        <button
          className={` rounded-[4px] border-black border-[2px] p-[5px] px-[10px] ${
            selectedAmount === 100 ? "bg-[#4EAB5E] text-white" : "text-black"
          }`}
          onClick={() => {
            setSelectedAmount(100);
            setDisabled(false);
          }}
        >
          $100
        </button>
        <button
          className={` rounded-[4px] border-black border-[2px] p-[5px] px-[10px] ${
            selectedAmount === 500 ? "bg-[#4EAB5E] text-white" : "text-black"
          }`}
          onClick={() => {
            setSelectedAmount(500);
            setDisabled(false);
          }}
        >
          $500
        </button>
      </div>
      <div className=" bg-gradient-to-r from-[#3D3D3D] to-[#ffffff] h-[2px] mt-[15px] mb-[15px]" />
      <div className=" w-full">
        <motion.div
          className={` ${
            disabled && "opacity-50"
          }  md:w-full relative cursor-pointer w-[100%] mx-auto mt-[20px]`}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="absolute top-1 left-1 w-full h-full bg-black rounded-full z-0" />

          <div className="bg-[#F8D75A] p-[4px] rounded-full relative">
            <button
              onClick={handleTip}
              className={`font-suisse-regular font-black text-white h-full w-full bg-[#4EAB5E] rounded-full flex items-center justify-center p-[10px] gap-[10px] uppercase z-10 `}
            >
              <ThunderSVG />
              <p>Tip</p>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Tip;
