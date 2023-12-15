import { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";

// change the contract address after each deployment
const jsonData = require("./oracle.json");
const contractAddress = jsonData?.address;
const abi = jsonData?.abi;

function App() {

  const [message, setMessage] = useState("");
  const [selectedAsset, setSelectedAsset] = useState('BTC-USD');

  const handleRadioChange = (event) => {
    setSelectedAsset(event.target.value);
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
  
        const [answer, decimals] = await nftContract.getChainlinkDataFeedInfo(selectedAsset);
        
        console.log('Chainlink Data Feed Latest Answer:',answer,decimals);
  
        setMessage(`💰 ${selectedAsset}: ${ethers.utils.formatUnits(answer?._hex, decimals)}`);

      } 
      else {
        setMessage("❌ Ethereum object does not exist");
      }
    } catch (err) {
      console.log(err);
      setMessage(`❌ERROR: ${err}`);
    }
  };



  return (
    <div className="card">
      <div className="header">
        <h3 className="text-color">ChainLink Price Feed Assignment</h3>
      </div>
      <div className="radio-sec">
      <h1>Select Asset:</h1>
        <div>
          <label>
            <input
              type="radio"
              name="asset"
              value="BTC-USD"
              checked={selectedAsset === 'BTC-USD'}
              onChange={handleRadioChange}
            />
            BTC-USD
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="asset"
              value="ETH-USD"
              checked={selectedAsset === 'ETH-USD'}
              onChange={handleRadioChange}
            />
            ETH-USD
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="asset"
              value="LINK-USD"
              checked={selectedAsset === 'LINK-USD'}
              onChange={handleRadioChange}
            />
            LINK-USD
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="asset"
              value="BTC-ETH"
              checked={selectedAsset === 'BTC-ETH'}
              onChange={handleRadioChange}
            />
            BTC-ETH
          </label>
        </div>
  
        <div>
          <p>Selected Asset: {selectedAsset}</p>
        </div>
      </div>
      <hr />
      <div className="container">
        <button onClick={mintNftHandler} className="cta-button mint-nft-button">
          Get Price for {selectedAsset}
        </button>
      </div>
      <div>
        <hr />
        {message && <h4>{message}</h4>}
      </div>
    </div>
  );
}

export default App;
