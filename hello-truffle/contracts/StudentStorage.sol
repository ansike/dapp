// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract StudentStorage {
    uint public age;
    string public username;

    function setData(uint256 _age, string memory _username) public {
        age = _age;
        username = _username;
    }

    function getData() public view returns (string memory, uint) {
        return (username, age);
    }
}
