pragma solidity ^0.8.6;

import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

interface IERC20 is IERC20Upgradeable {
    function setApprove(
        address _sender,
        address _spender,
        uint256 _amount
    ) external;
}
