import { useEffect, useState } from "react";
import PigSVG from "../../assets/Pig.svg";
import DefaultProfilePic from "../../assets/degen-logo.svg";
import { SolanaSVG } from "../Profile/icons";
import { ThunderSVG } from "./icons";
import { motion } from "framer-motion";
import { Buffer } from "buffer";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { lineSpinner } from "ldrs";

interface TipProps {
  walletAddress: string;
  username: string;
  pfp: string;
}
// @ts-ignore
window.Buffer = Buffer;

const Tip: React.FC<TipProps> = ({ pfp, username, walletAddress }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [disabled, setDisabled] = useState(true);
  const { publicKey, sendTransaction } = useWallet();
  const connection = new Connection(import.meta.env.VITE_RPC_URL);
  const [solPrice, setSolPrice] = useState(null);
  const [tipStatus, setTipStatus] = useState<
    "Tip" | "Sign & Approve" | "Sending Tip" | "Tip Successful" | "Txn Failed"
  >("Tip");
  lineSpinner.register();
  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        try {
          const balanceInLamports = await connection.getBalance(publicKey);
          const balanceInSol = balanceInLamports / 1e9;
          setBalance(Number(balanceInSol.toFixed(2)));
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
    setTipStatus("Sign & Approve");

    if (!solPrice) return;

    const solAmount = selectedAmount / solPrice;

    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(walletAddress),
          lamports: Math.round(solAmount * 1e9),
        })
      );

      const signature = await sendTransaction(transaction, connection);
      setTipStatus("Sending Tip");

      await connection.confirmTransaction(signature, "confirmed");
      setTipStatus("Tip Successful");
    } catch (error) {
      console.log("Transaction error:", error);
      setTipStatus("Txn Failed");
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

  const buttonStyles = {
    Tip: "bg-[#4EAB5E] text-white bg-[#4EAB5E]",
    "Sign & Approve": "bg-[#ffffff] text-[#999999]",
    "Sending Tip": "bg-[#ffffff] text-[#999999]",
    "Tip Successful": "bg-[#ffffff] text-[#4EAB5E]",
    "Txn Failed": "bg-[#ffffff] text-[#F27360]",
  };
  const borderStyles = {
    Tip: "bg-[#F8D75A]",
    "Sign & Approve": "bg-[#999999] ",
    "Sending Tip": "bg-[#999999]",
    "Tip Successful": "bg-[#4EAB5E] ",
    "Txn Failed": "bg-[#F27360] ",
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
          } md:w-full relative cursor-pointer w-[100%] mx-auto mt-[20px]`}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {tipStatus === "Tip" && (
            <div className="absolute top-1 left-1 w-full h-full bg-black rounded-full z-0" />
          )}

          <div
            className={`${borderStyles[tipStatus]} p-[4px] rounded-full relative`}
          >
            <button
              onClick={handleTip}
              className={` font-suisse-regular font-black  h-full w-full  rounded-full flex items-center justify-center p-[10px] gap-[10px] uppercase z-10  ${buttonStyles[tipStatus]}`}
            >
              {tipStatus === "Tip" ? (
                <ThunderSVG />
              ) : tipStatus === "Sending Tip" ||
                tipStatus === "Sign & Approve" ? (
                <l-line-spinner
                  size="25"
                  stroke="3"
                  speed="1"
                  color="white"
                ></l-line-spinner>
              ) : tipStatus === "Tip Successful" ? (
                <svg
                  width="20"
                  height="19"
                  viewBox="0 0 20 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 18.35L8.55 17.03C3.4 12.36 0 9.27 0 5.5C0 2.41 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.08C11.09 0.81 12.76 0 14.5 0C17.58 0 20 2.41 20 5.5C20 9.27 16.6 12.36 11.45 17.03L10 18.35Z"
                    fill="#4EAB5E"
                  />
                </svg>
              ) : (
                <svg
                  width="17"
                  height="20"
                  viewBox="0 0 17 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.4996 10.1221L13.8026 15.4251C14.084 15.7065 14.4657 15.8646 14.8636 15.8646C15.2616 15.8646 15.6432 15.7065 15.9246 15.4251C16.206 15.1437 16.3641 14.7621 16.3641 14.3641C16.3641 13.9662 16.206 13.5845 15.9246 13.3031L10.6196 8.00011L15.9236 2.69711C16.0629 2.55778 16.1733 2.39238 16.2487 2.21036C16.324 2.02834 16.3628 1.83326 16.3627 1.63626C16.3627 1.43926 16.3238 1.2442 16.2484 1.06221C16.173 0.880224 16.0624 0.714877 15.9231 0.57561C15.7838 0.436343 15.6184 0.325884 15.4364 0.250538C15.2543 0.175193 15.0592 0.136437 14.8623 0.136483C14.6653 0.13653 14.4702 0.175377 14.2882 0.250809C14.1062 0.32624 13.9409 0.436778 13.8016 0.57611L8.4996 5.87911L3.1966 0.57611C3.0583 0.432781 2.89284 0.318431 2.70987 0.239733C2.5269 0.161034 2.33009 0.119563 2.13092 0.117739C1.93176 0.115915 1.73422 0.153774 1.54984 0.229109C1.36546 0.304443 1.19793 0.415744 1.05703 0.556516C0.916123 0.697288 0.804664 0.864713 0.729156 1.04902C0.653648 1.23333 0.615602 1.43083 0.617238 1.63C0.618874 1.82917 0.66016 2.02602 0.738686 2.20906C0.817212 2.3921 0.931406 2.55767 1.0746 2.69611L6.3796 8.00011L1.0756 13.3041C0.932406 13.4425 0.818212 13.6081 0.739686 13.7912C0.66116 13.9742 0.619874 14.1711 0.618238 14.3702C0.616602 14.5694 0.654648 14.7669 0.730156 14.9512C0.805664 15.1355 0.917122 15.3029 1.05803 15.4437C1.19893 15.5845 1.36646 15.6958 1.55084 15.7711C1.73522 15.8464 1.93276 15.8843 2.13192 15.8825C2.33109 15.8807 2.5279 15.8392 2.71087 15.7605C2.89384 15.6818 3.0593 15.5674 3.1976 15.4241L8.4996 10.1221Z"
                    fill="#F27360"
                  />
                </svg>
              )}
              <p>{tipStatus}</p>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Tip;
