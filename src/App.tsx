import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Chat from "./components/Chat";
import Lounge from "./components/Lounge";
import Profile from "./components/Profile";
import Modal from "./components/Header/modal";
import TokenInfo from "./components/TokenInfo";
import EditProfile from "./components/EditProfile";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "./atoms/users";
import { useWallet } from "@solana/wallet-adapter-react";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, setUser] = useRecoilState(userState);
  const { publicKey } = useWallet();

  useEffect(() => {
    if (publicKey) {
      checkAndCreateUser(publicKey?.toString());
    }
  }, [publicKey]);

  useEffect(() => {
    const userPreferences = localStorage.getItem("userPreferences");
    if (!userPreferences) {
      const userPreferences = {
        reactions: false,
        messages: false,
        ambience: false,
        chatAnimation: "default",
      };
      localStorage.setItem("userPreferences", JSON.stringify(userPreferences));
    }
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const checkAndCreateUser = async (walletAddress: string) => {
    try {
      const checkUserResponse = await axios.get(
        `https://7dfinzalu3.execute-api.ap-south-1.amazonaws.com/dev/`,
        {
          params: {
            method: "get_user_info",
            walletAddress: walletAddress,
          },
        }
      );
      if (checkUserResponse.status === 200) {
        setUser({
          username: checkUserResponse.data.username,
          profilePic: "",
          walletAddress: walletAddress,
        });
        return checkUserResponse.data;
      }
    } catch (error) {
      console.log("User not found, proceeding with registration");
    }
    try {
      const registerResponse = await axios.post(
        `https://7dfinzalu3.execute-api.ap-south-1.amazonaws.com/dev/`,
        {
          method: "register",
          walletAddress: walletAddress,
          username: walletAddress,
          profilePicUrl: "",
          alphaAccess: false,
        }
      );

      if (registerResponse.data.error) {
        console.log(registerResponse.data.error);
      }

      if (!registerResponse.data.user) {
        console.log("User data missing from registration response");
      }

      return registerResponse.data.user;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BrowserRouter>
      <div className={`flex flex-col h-screen`}>
        <header className="h-[10%] sticky top-0 z-50">
          <Header toggleModal={toggleModal} />
        </header>
        <main className=" h-[60%] flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/lounge" element={<Lounge />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/profile/edit/:walletAddress"
              element={<EditProfile />}
            />
            <Route path="/lounge/:ca" element={<TokenInfo />} />
          </Routes>
        </main>

        <nav className="h-[10%] sticky bottom-0 z-50">
          <Navbar />
        </nav>

        {isModalOpen && <Modal toggleModal={toggleModal} />}
      </div>
    </BrowserRouter>
  );
}

export default App;
