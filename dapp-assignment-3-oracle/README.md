# ChainLink Price Feed Assignment

This React application interacts with a Chainlink Oracle smart contract to fetch price information for different assets. Users can select an asset from a list and retrieve the latest price using the Chainlink Oracle.

## Setup

### ORACLE BASED PRICE FEED DAPP USING CHAINLINK

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file at the root of the project and use the keys available in `.env.example`.

3. Compile the smart contracts:
   ```bash
   npx hardhat compile
   ```

4. Deploy the smart contracts to the Sepolia network:
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

5. Start the React application:
   ```bash
   npm start
   ```

The application will be running at [http://localhost:3000](http://localhost:3000).

## Usage

1. Open the application in your web browser.

2. Select an asset by clicking on the corresponding radio button:
   - BTC-USD
   - ETH-USD
   - LINK-USD
   - BTC-ETH

3. Click the "Get Price for {selectedAsset}" button to fetch the latest price for the selected asset.

4. View the fetched price information displayed below the button.

## Technologies Used

- React: JavaScript library for building user interfaces.
- ethers.js: Ethereum JavaScript library for interacting with smart contracts.
- Chainlink: Decentralized oracle network.

## Additional Notes

- Make sure your Ethereum wallet (e.g., MetaMask) is connected to the Ethereum network.
- The address for the smart contract will be picked by the code itself using file generation.


