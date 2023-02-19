// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./AskToken.sol";

// 交易所
contract Exchange {
    using SafeMath for uint256; // 给uint256增加add sub方法
    address public feeAccount; // 收费账户地址
    uint256 public feePercent; // 费率
    // 交易所存储货币=>用户=>余额关系mapping
    mapping(address => mapping(address => uint256)) public tokens;
    address constant ETHER = address(0); // 定义以太坊在当前地址下的地址

    struct _Order {
        uint256 id;
        address user;
        address token;
        uint256 amount;
        address exchangeToken;
        uint256 exchangeAmount;
        uint256 timestamp;
    }
    mapping(uint256 => _Order) public orders;
    mapping(uint256 => bool) public cancleOrders;
    uint256 public orderCount;

    // 交易所中哪个货币下，哪个用户，要存入金额，余额是多少
    event Deposit(address token, address user, uint256 amount, uint256 balance);
    // 交易所中哪个货币下，哪个用户，要提取金额，余额是多少
    event Withdraw(
        address token,
        address user,
        uint256 amount,
        uint256 balance
    );
    event OrderEvent(
        uint256 id,
        address user,
        address token,
        uint256 amount,
        address exchangeToken,
        uint256 exchangeAmount,
        uint256 timestamp
    );
    event CancleOrderEvent(
        uint256 id,
        address user,
        address token,
        uint256 amount,
        address exchangeToken,
        uint256 exchangeAmount,
        uint256 timestamp
    );

    constructor(address _feeAccount, uint256 _feePercent) {
        feeAccount = _feeAccount;
        feePercent = _feePercent;
    }

    // 给合约地址存以太币，因方法比较特殊
    function depositEther() public payable {
        tokens[ETHER][msg.sender] = tokens[ETHER][msg.sender].add(msg.value);
        // 触发存款事件
        emit Deposit(ETHER, msg.sender, msg.value, tokens[ETHER][msg.sender]);
    }

    // 存普通的token
    function depositToken(address _token, uint256 _amount) public {
        // 判断地址是否有效
        require(_token != ETHER);
        // 调用方法往交易所转钱
        require(
            AskToken(_token).transferFrom(msg.sender, address(this), _amount)
        );
        tokens[_token][msg.sender] = tokens[_token][msg.sender].add(_amount);
        emit Deposit(_token, msg.sender, _amount, tokens[_token][msg.sender]);
    }

    // 从交易所中提取以太币
    function withdrawEther(uint256 _amount) public {
        require(tokens[ETHER][msg.sender] >= _amount);
        tokens[ETHER][msg.sender] = tokens[ETHER][msg.sender].sub(_amount);
        // ETH内置的方法，不需要授权
        payable(msg.sender).transfer(_amount);
        emit Withdraw(ETHER, msg.sender, _amount, tokens[ETHER][msg.sender]);
    }

    // 从交易所中提取AskToken
    function withdrawToken(address _token, uint256 _amount) public {
        require(_token != ETHER);
        require(tokens[_token][msg.sender] >= _amount);
        tokens[_token][msg.sender] = tokens[_token][msg.sender].sub(_amount);
        require(AskToken(_token).transfer(msg.sender, _amount));
        emit Withdraw(_token, msg.sender, _amount, tokens[_token][msg.sender]);
    }

    // 创建订单池 eg: 100 AskToken 兑换 1 ETH
    function makeOrder(
        address _token,
        uint256 _amount,
        address _exchangeToken,
        uint256 _exchangeAmount
    ) public {
        require(tokens[_token][msg.sender] >= _amount, unicode"当前余额不足");
        orderCount = orderCount.add(1);
        orders[orderCount] = _Order(
            orderCount,
            msg.sender,
            _token,
            _amount,
            _exchangeToken,
            _exchangeAmount,
            block.timestamp
        );

        emit OrderEvent(
            orderCount,
            msg.sender,
            _token,
            _amount,
            _exchangeToken,
            _exchangeAmount,
            block.timestamp
        );
    }

    // // 取消订单
    function cancleOrder(uint256 _id) public {
        // 放置order不存在
        _Order memory myOrder = orders[_id];
        require(myOrder.id == _id);
        cancleOrders[_id] = true;
        emit CancleOrderEvent(
            _id,
            myOrder.user,
            myOrder.token,
            myOrder.amount,
            myOrder.exchangeToken,
            myOrder.exchangeAmount,
            block.timestamp
        );
    }

    // // 完成订单
    // function fillOrder() {}
}
