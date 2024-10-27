import { useMemo } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import "@solana/wallet-adapter-react-ui/styles.css";
import { ConnectWalletSVG } from "../components/Chat/ConnectButton";

const WalletConnect = () => {
  const network = WalletAdapterNetwork.Mainnet;

  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={`https://api.${network}.solana.com`}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletConnectButton />
      </WalletProvider>
    </ConnectionProvider>
  );
};

const WalletConnectButton = () => {
  const { connect } = useWallet();
  return (
    <div className="">
      <ConnectWalletSVG onClick={connect} />
    </div>
  );
};

export default WalletConnect;
