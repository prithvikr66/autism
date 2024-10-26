import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>{/* <Route path="/" element={<Landing />} /> */}</Routes>
      <Navbar />
    </BrowserRouter>
  );
}

export default App;
