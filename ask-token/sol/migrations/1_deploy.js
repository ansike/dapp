/*
 * @Description: description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2023-02-13 21:58:58
 * @LastEditTime: 2023-02-19 12:02:25
 */

const contracts = artifacts.require("AskToken.sol");
const exchange = artifacts.require("Exchange.sol");
module.exports = async function (deployer) {
  const accounts = await web3.eth.getAccounts();
  await deployer.deploy(contracts);
  await deployer.deploy(exchange, accounts[0], 10);
}