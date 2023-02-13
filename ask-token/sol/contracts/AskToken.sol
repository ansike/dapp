// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract AskToken {
    using SafeMath for uint256;

    string public name = "AskToken";
    string public symbol = "ASK";
    uint256 public decimals = 18; // 1 AskToken = 10**decimals
    uint256 public totalSupply; // 1 AskToken = 10**decimals
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    constructor() {
        totalSupply = 1000000 * (10**decimals);
        balanceOf[msg.sender] = totalSupply;
    }

    // 普通用户调用
    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        // 有效地址
        require(_to != address(0));
        _transfer(msg.sender, _to, _value);
        return true;
    }

    function _transfer(
        address _from,
        address _to,
        uint256 _value
    ) internal {
        // 转账用户的余额大于_value
        require(balanceOf[_from] >= _value);
        balanceOf[_from] = balanceOf[_from].sub(_value);
        balanceOf[_to] = balanceOf[_to].add(_value);
        emit Transfer(_from, _to, _value);
    }

    // 交易所调用
    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        // _from 放款账号
        // _to 首款账号
        // msg.sender 交易所地址

        require(balanceOf[_from] >= _value);
        require(allowance[_from][msg.sender] >= _value);

        // 减少交易所授权金额
        allowance[_from][msg.sender] = allowance[_from][msg.sender].sub(_value);
        // 发起转账
        _transfer(_from, _to, _value);

        return true;
    }

    function approve(address _spender, uint256 _value)
        public
        returns (bool success)
    {
        // require检测失败时，消耗的gas会返回
        require(_spender != address(0));
        // _spender 第三方交易所地址
        // allowance存储每个人对某个交易所授权多少token
        allowance[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);
        return true;
    }
}
