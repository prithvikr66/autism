import { useWallet } from "@solana/wallet-adapter-react";
import Message from "./message";
import { useState } from "react";
import ConnectButton from "../Profile/connect";

const Lounge = () => {
  const { publicKey } = useWallet();
  const [inputValue, setInputValue] = useState<string>("");
  const isValidSolanaAddress = (address: string) => {
    const base58Regex = /^[1-9A-HJ-NP-Za-km-z]{43,44}$/;
    return base58Regex.test(address);
  };

  return (
    <div className="w-full mt-[20px] md:w-[90%] md:mx-auto">
      <div className="grid gap-[10px] md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 overflow-y-auto h-[50%]">
        <Message
          ca="A8C3xuqscfmyLrte3VmTqrAq8kgMASius9AFNANwpump"
          pfp="https://nftnow.com/wp-content/uploads/2022/10/kiwami-3428.png"
          username="alpha_hoe"
          key={1}
        />
        {/* <Message
          ca="A8C3xuqscfmyLrte3VmTqrAq8kgMASius9AFNANwpump"
          pfp="https://nftnow.com/wp-content/uploads/2022/10/kiwami-3428.png"
          username="alpha_hoe"
          key={2}
        /> */}
        {/* <Message
          ca="A8C3xuqscfmyLrte3VmTqrAq8kgMASius9AFNANwpump"
          pfp="https://nftnow.com/wp-content/uploads/2022/10/kiwami-3428.png"
          username="alpha_hoe"
          key={3}
        />
        <Message
          ca="A8C3xuqscfmyLrte3VmTqrAq8kgMASius9AFNANwpump"
          pfp="https://nftnow.com/wp-content/uploads/2022/10/kiwami-3428.png"
          username="alpha_hoe"
          key={3}
        />
        <Message
          ca="A8C3xuqscfmyLrte3VmTqrAq8kgMASius9AFNANwpump"
          pfp="https://nftnow.com/wp-content/uploads/2022/10/kiwami-3428.png"
          username="alpha_hoe"
          key={3}
        /> */}
      </div>

      {publicKey ? (
        <div className="w-[90%] md:w-[50%] md:mt-[50px] mx-auto border-[1px] sm:border-[2px] border-[#F8D75A] rounded-[8px] h-[45px] sm:h-[65px] mt-[20px] mb-[20px] flex items-center p-[2px]">
          <input
            type="text"
            placeholder="share a banger ca"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={`flex-grow h-full p-[2px] sm:text-[20px] rounded-[8px] border-none outline-none font-sofia-regular font-semibold px-[20px] ${
              isValidSolanaAddress(inputValue) ? "text-black" : "text-red-500"
            }`}
            style={{
              backgroundColor: "transparent",
              color: isValidSolanaAddress(inputValue) ? "#000" : "#f00",
              caretColor: "#000",
            }}
          />
          <button className="bg-[#F8D75A] h-full w-[35px] sm:w-[55px] rounded-[8px] flex justify-center items-center cursor-pointer">
            <svg
              width="11"
              height="20"
              viewBox="0 0 11 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.6667 10L0 0V20L10.6667 10Z" fill="white" />
            </svg>
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <ConnectButton>Connect to chat</ConnectButton>
        </div>
      )}
    </div>
  );
};

export default Lounge;
