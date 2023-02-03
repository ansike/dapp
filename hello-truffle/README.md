# hello truffle 

1. 安装配置truffle
```shell
npm install -g truffle
```

2. 编写contracts

StudentStorage.sol
```sol
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
```

3. 编写migration

1_deploy.js
```javascript
const Contracts = artifacts.require("StudentStorage.sol");

module.exports = function (deployer) {
  deployer.deploy(Contracts);
};
```

4. 执行编译部署
```shell
truffle migrate

# 执行之后结果如下
# ➜  hello-truffle git:(main) ✗ truffle migrate

# Compiling your contracts...
# ===========================
# > Compiling ./contracts/StudentStorage.sol
# > Artifacts written to /Users/ansike/project/self/dapp/hello-truffle/build/contracts
# > Compiled successfully using:
#    - solc: 0.8.17+commit.8df45f5f.Emscripten.clang


# Starting migrations...
# ======================
# > Network name:    'development'
# > Network id:      1675433963338
# > Block gas limit: 30000000 (0x1c9c380)


# 1_deploy.js
# ===========

#    Replacing 'StudentStorage'
#    --------------------------
#    > transaction hash:    0xc87a4123b6dcf9ad9b5da0f813823d4d04694721763c92c7ec4068646eddf9e8
#    > Blocks: 0            Seconds: 0
#    > contract address:    0x5E765e2b459DaAbE5a6674A9c91Bb2338ec3af39
#    > block number:        4
#    > block timestamp:     1675437122
#    > account:             0x6995406230412E302C14Afba8BfC2C094CDeF072
#    > balance:             899.996730824988815426
#    > gas used:            505059 (0x7b4e3)
#    > gas price:           3.089147928 gwei
#    > value sent:          0 ETH
#    > total cost:          0.001560201963367752 ETH

#    > Saving artifacts
#    -------------------------------------
#    > Total cost:     0.001560201963367752 ETH

# Summary
# =======
# > Total deployments:   1
# > Final cost:          0.001560201963367752 ETH

```

5. 验证合约
```shell
truffle console

const obj = await StudentStorage.deployed()
# truffle(development)> obj.username()
# 'test'
# truffle(development)> obj.age()
# BN { negative: 0, words: [ 11, <1 empty item> ], length: 1, red: null }
```