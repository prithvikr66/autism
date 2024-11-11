import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Lounge from "./components/Lounge";
import Profile from "./components/Profile";
import Modal from "./components/Header/modal";
import TokenInfo from "./components/TokenInfo";
import EditProfile from "./components/EditProfile";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "./atoms/users";
import { useWallet } from "@solana/wallet-adapter-react";
import Autism from "./components/Chat/AutismChatAnimation";
import { animationState } from "./atoms/messageAnimations";
import Default from "./components/Chat";
import { degenPoints } from "./atoms/degen-points";
const AmbientAudio = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const userPreferences = JSON.parse(
      localStorage.getItem("userPreferences") ||
        `{
        reaction: false,
        message: true,
        ambience: true,
        chatAnimation: "default",
      }`
    );

    if (audioRef.current) {
      if (userPreferences.ambience) {
        audioRef.current.volume = 0.3;
        audioRef.current.loop = true;
        audioRef.current.play().catch((error) => {
          console.log("Audio playback failed:", error);
        });
        setIsPlaying(true);
      } else if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const userPreferences = JSON.parse(
        localStorage.getItem("userPreferences") ||
          `{
          reaction: false,
          message: true,
          ambience: true,
          chatAnimation: "default",
        }`
      );

      if (audioRef.current) {
        if (userPreferences.ambience && !isPlaying) {
          audioRef.current.play().catch((error) => {
            console.log("Audio playback failed:", error);
          });
          setIsPlaying(true);
        } else if (!userPreferences.ambience && isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [isPlaying]);

  return <audio ref={audioRef} src="/path-to-your-ambient-sound.mp3" />;
};

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, setUser] = useRecoilState(userState);
  const { publicKey } = useWallet();
  const animationType = useRecoilValue(animationState);
  const [, setDegenPoints] = useRecoilState(degenPoints);

  useEffect(() => {
    const fetchDegenPoints = async () => {
      const response = await axios.get(
        `https://7dfinzalu3.execute-api.ap-south-1.amazonaws.com/dev/`,
        {
          params: {
            method: "get_points",
            walletAddress: publicKey?.toString(),
          },
        }
      );
      setDegenPoints(response.data.points);
      console.log("degen points", response.data.points);
    };
    if (publicKey) {
      checkAndCreateUser(publicKey?.toString());
      fetchDegenPoints();
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
          profilePic: checkUserResponse.data.profilePic,
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
        <AmbientAudio />
        <header className="h-[10%] sticky top-0 z-50">
          <Header toggleModal={toggleModal} />
        </header>
        <main className="h-[60%] flex-1">
          <Routes>
            <Route
              path="/"
              element={animationType === "default" ? <Default /> : <Autism />}
            />
            <Route path="/lounge" element={<Lounge />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/profile/edit/:walletAddress"
              element={<EditProfile />}
            />
            <Route path="/lounge/:ca" element={<TokenInfo />} />
          </Routes>
        </main>
        <div className="h-[10%] ">
          <Navbar />
        </div>
        {isModalOpen && <Modal toggleModal={toggleModal} />}
      </div>
    </BrowserRouter>
  );
}

export default App;
