// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor(string memory _name, string memory _symbol)
        ERC20(_name, _symbol)
    {}

    function setMint(address _address, uint256 _amount) external {
        _mint(_address, _amount);
    }

    function setApprove(
        address _sender,
        address _spender,
        uint256 _amount
    ) external {
        _approve(_sender, _spender, _amount);
    }
}
