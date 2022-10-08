// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

// Import this file to use console.log
import "hardhat/console.sol";

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

import "./IERC20.sol";

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract Unramp is OwnableUpgradeable, UUPSUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    CountersUpgradeable.Counter public _Id;

    struct Post {
        address creator;
        address token;
        string fiat;
        uint256 rate;
        uint256 supply;
        string paymentMethods;
    }

    mapping(uint256 => Post) public idToPost; //id => post

    mapping(address => uint256[]) public creatorToPost; // creator=> post list

    struct Order {
        address creator;
        uint256 postId;
        uint256 amout;
        uint256 state; /// 1 => pending ,2 =>confirm from maker , 3 final accept
    }

    CountersUpgradeable.Counter public _orderId;

    mapping(uint256 => Order) public idToOrder; //id => Order

    mapping(address => uint256[]) public ordersPerUser; // creator => orders

    mapping(address => uint256[]) public makerCreatorToOrdersId; // makerOwner => orders

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() external initializer {
        __Ownable_init();
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        virtual
        override
        onlyOwner
    {}

    function createPost(
        address token,
        string memory fiat,
        uint256 rate,
        uint256 supply,
        string memory paymentMethods
    ) external {
        idToPost[_Id.current()] = Post(
            msg.sender,
            token,
            fiat,
            rate,
            supply,
            paymentMethods
        );

        creatorToPost[msg.sender].push(_Id.current());

        _Id.increment();
    }

    function createOrder(uint256 _postId, uint256 _amount) external {
        Post storage makerStructLocal = idToPost[_postId];

        require(
            IERC20(makerStructLocal.token).balanceOf(msg.sender) >= _amount,
            "Insufficient balance"
        );

        //just for test
        IERC20(makerStructLocal.token).setApprove(
            msg.sender,
            address(this),
            _amount
        );

        bool success = IERC20(makerStructLocal.token).transferFrom(
            msg.sender,
            address(this),
            _amount
        );

        require(success, "Unsuccessful transfer");

        idToOrder[_orderId.current()] = Order(msg.sender, _postId, _amount, 1);

        ordersPerUser[msg.sender].push(_orderId.current());

        makerCreatorToOrdersId[makerStructLocal.creator].push(
            _orderId.current()
        );

        _orderId.increment();
    }

    function acceptOrderFromMaker(uint256 orderId) external {
        Order storage order = idToOrder[orderId];
        Post storage post = idToPost[order.postId];

        require(msg.sender == post.creator, "owner is incorrect");

        require(order.state == 1, "state is incorrect");

        order.state = 2;
    }

    function finalAcceptFromOrderCreator(uint256 orderId) external {
        Order storage order = idToOrder[orderId];
        Post storage post = idToPost[order.postId];

        require(msg.sender == order.creator, "owner is incorrect");
        require(order.state == 2, "state is incorrect");

        order.state = 3;

        IERC20(post.token).transfer(post.creator, order.amout);
    }

    function returnUserMakerStruct(address sender, uint256 index)
        external
        view
        returns (Post memory)
    {
        return idToPost[creatorToPost[sender][index]];
    }

    //------------

    function returnUserOrders(address sender, uint256 index)
        external
        view
        returns (Order memory)
    {
        return idToOrder[ordersPerUser[sender][index]];
    }

    function returnUserLengthUserOrders(address sender)
        external
        view
        returns (uint256)
    {
        return ordersPerUser[sender].length;
    }

    //------------

    function returnMakerOrders(address sender, uint256 index)
        external
        view
        returns (Order memory)
    {
        return idToOrder[makerCreatorToOrdersId[sender][index]];
    }

    function returnLengthMakerOrders(address sender)
        external
        view
        returns (uint256)
    {
        return makerCreatorToOrdersId[sender].length;
    }
}
