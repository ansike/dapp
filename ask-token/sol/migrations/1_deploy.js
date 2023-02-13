/*
 * @Description: description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2023-02-13 21:58:58
 * @LastEditTime: 2023-02-13 22:23:34
 */

const contracts = artifacts.require("AskToken.sol");
module.exports = function (deployer) {
  deployer.deploy(contracts);
}