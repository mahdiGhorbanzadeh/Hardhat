// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

// Import this file to use console.log
import "hardhat/console.sol";

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Test is OwnableUpgradeable {
    uint256 public varible;

    function initialize() external initializer {
        __Ownable_init();
        varible = 5;
    }
}
