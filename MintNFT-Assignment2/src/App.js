import { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";

// change the contract address after each deployment
const jsonData = require("./Marketplace.json");
const contractAddress = jsonData?.address;
const abi = jsonData?.abi;
// console.log(JSON.stringify(contract.abi));

function App() {
  const [message, setMessage] = useState("");
  const [currentAccount, setCurrentAccount] = useState(null);
  // const [walletAddress, setWalletAddress] = useState('');

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log("🦊 Install the Metamask browser extension.");
      return;
    } else {
      setMessage("✅ Wallet exists.");
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });
    // console.log(accounts);

    if (accounts.length !== 0) {
      const account = accounts[0];
      setMessage("1️⃣ Using first account in wallet as default.");
      setCurrentAccount(account);
    } else {
      setMessage("❗ No authorized account found.");
    }
  };

  const connectWalletHandler = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      setMessage("🦊 Install the Metamask browser extension.");
    }

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setMessage("1️⃣ Using first account in wallet: ", accounts[0]);
      setCurrentAccount(accounts[0]);
      // setWalletAddress(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const mintNftHandler = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        console.log(contractAddress, abi, signer);
        const nftContract = new ethers.Contract(contractAddress, abi, signer);
        console.log(nftContract);
        setMessage("💰 ➡ Authorize payment to mint NFT.");
        // let nftTxn = await nftContract.mintNFT(1, {
        //     value: ethers.utils.parseEther('0.001'),
        // });
        //  await nftContract.tokenURI(1);
        // await token.wait()
        // console.log(nftTxn)
        const nftTxn = await nftContract.mintTokens(
          currentAccount,
          " https://emerald-changing-mule-988.mypinata.cloud/ipfs/QmbveKamwZVjHCyCFTQKAwfUXiWF3W9fZoi3KJKcjkmYW4/",
          1,
          { value: ethers.utils.parseEther("0.001") }
        );
        console.log(nftTxn);
        setMessage("🔄 Validating...");
        await nftTxn.wait();
        // await nftTxn.wait();

        setMessage(
          `🔎 Etherscan: https://sepolia.etherscan.io/tx/${nftTxn.hash}`
        );
      } else {
        setMessage("❌ Ethereum object does not exist");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const connectWalletButton = () => {
    return (
      <div>
        <button
          onClick={connectWalletHandler}
          className="cta-button connect-wallet-button"
        >
          Connect Wallet
        </button>
      </div>
    );
  };

  const mintNftButton = () => {
    return (
      <div>
        <h3 className="text-style">🦊 Account Address: {currentAccount}</h3>
        <button onClick={mintNftHandler} className="cta-button mint-nft-button">
          Mint NFT
        </button>
      </div>
    );
  };

  useEffect(() => {
    checkWalletIsConnected();
  }, []);
  return (
    <div className="card">
      <div className="header">
        <h3 className="text-color">Sepolia Testnet 🔹 NFT Minter</h3>
      </div>
      <hr />
      <div className="container">
        {currentAccount ? mintNftButton() : connectWalletButton()}
      </div>
      <div>
        <hr />
        <h4>{message}</h4>
      </div>
    </div>
  );
}

export default App;
