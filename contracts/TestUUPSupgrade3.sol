// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

// Import this file to use console.log
import "hardhat/console.sol";

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract TestUUPSupgrade3 is OwnableUpgradeable, UUPSUpgradeable {
    uint256 public varible;

    function initialize() external initializer {
        __Ownable_init();
        varible = 5;
    }

    function upgradeFunc2() external view returns (uint256) {
        return varible + 5;
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        virtual
        override
        onlyOwner
    {}
}
