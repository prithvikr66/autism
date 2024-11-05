import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SolanaWalletProvider } from "./utils/wallet-connect.tsx";
import { RecoilRoot } from "recoil";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecoilRoot>
      <SolanaWalletProvider>
        <App />
      </SolanaWalletProvider>
    </RecoilRoot>
  </StrictMode>
);
