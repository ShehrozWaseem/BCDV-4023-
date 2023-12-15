// // SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract DataConsumerV3 {
    AggregatorV3Interface internal dataFeed;
    mapping(string => address) public aggregatorAddresses;

    constructor() {
        aggregatorAddresses["BTC-USD"] = 0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43;
        aggregatorAddresses["ETH-USD"] = 0x694AA1769357215DE4FAC081bf1f309aDC325306;
        aggregatorAddresses["LINK-USD"] = 0xc59E3633BAAC79493d908e63626716e204A45EdF;
        aggregatorAddresses["BTC-ETH"] = 0x5fb1616F78dA7aFC9FF79e0371741a747D2a7F22;
    }

    function getChainlinkDataFeedInfo(string memory asset) public view returns (int answer, uint8 decimals) {
        address aggregatorAddress = aggregatorAddresses[asset];
        require(aggregatorAddress != address(0), "Invalid asset");

        AggregatorV3Interface dataFeed = AggregatorV3Interface(aggregatorAddress);

        (/* uint80 roundID */,
            int _answer,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/) = dataFeed.latestRoundData();

        return (_answer, dataFeed.decimals());
    }

    function updateAggregatorAddress(string memory asset, address newAggregatorAddress) public {
        require(msg.sender == owner, "Not the contract owner");
        aggregatorAddresses[asset] = newAggregatorAddress;
    }

    address private owner = msg.sender;
}

