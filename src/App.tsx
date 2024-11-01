import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Chat from "./components/Chat";
import Lounge from "./components/Lounge";
import Profile from "./components/Profile";
import Modal from "./components/Header/modal";
import TokenInfo from "./components/TokenInfo";
import EditProfile from "./components/EditProfile";
// import { WalletContextProvider } from "./utils/wallet-connect";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <BrowserRouter>
      <div className={`flex flex-col h-screen`}>
        <header className="h-[8%]">
          <Header toggleModal={toggleModal} />
        </header>
        <main className=" h-[60%] flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/lounge" element={<Lounge />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit/:walletAddress" element={<EditProfile />} />
            <Route path="/lounge/:ca" element={<TokenInfo />} />
          </Routes>
        </main>

        <nav className="h-[8%]">
          <Navbar />
        </nav>

        {isModalOpen && <Modal toggleModal={toggleModal} />}
      </div>
    </BrowserRouter>
  );
}

export default App;
