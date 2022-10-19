// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    address public minter;
    mapping(address => uint256) public wavesByAddress;

    address[] public addresses;

    constructor() {
        minter = msg.sender;
    }

    function wave() public {
        if (msg.sender == minter) {
            console.log("hello minter, we ignore your wave");
        } else {
            totalWaves += 1;
            if (wavesByAddress[msg.sender] != 0) {
                wavesByAddress[msg.sender] = wavesByAddress[msg.sender] + 1;
            } else {
                addresses.push(msg.sender);
                wavesByAddress[msg.sender] = 1;
            }
            console.log("%s has waved!", msg.sender);
        }
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

    function getWavesFromAddress() public view returns (uint256) {
        console.log(
            "address %s",
            msg.sender,
            "waved %d:",
            wavesByAddress[msg.sender]
        );
        return wavesByAddress[msg.sender];
    }

    function getAllWavers()
        public
        view
        returns (address[] memory, uint256[] memory)
    {
        address[] memory mAddresses = new address[](addresses.length);
        uint256[] memory mWaves = new uint256[](addresses.length);

        for (uint256 i = 0; i < addresses.length; i++) {
            mAddresses[i] = addresses[i];
            mWaves[i] = wavesByAddress[addresses[i]];
        }
        return (mAddresses, mWaves);
    }
}
