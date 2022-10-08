pragma solidity ^0.8.6;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract TestDis is UUPSUpgradeable {
    uint8 public var1;

    /// @custom:oz-upgrades-unsafe-allow state-variable-immutable state-variable-assignment
    address public immutable var2 = address(this);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
        testPrivateDis();
    }

    function initialize() public initializer {}

    function _authorizeUpgrade(address newImplementation)
        internal
        virtual
        override
    {}

    function testPrivateDis() private {
        var1 = 2;
    }

    function getImplementation() external view returns (address) {
        return _getImplementation();
    }
}
