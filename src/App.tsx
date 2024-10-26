import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Chat from "./components/Chat";
import Lounge from "./components/Lounge";
import Profile from "./components/Profile";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        <header className="h-[12%]">
          <Header />
        </header>

        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/lounge" element={<Lounge />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>

        <nav className="h-[12%]">
          <Navbar />
        </nav>
      </div>
    </BrowserRouter>
  );
}

export default App;
