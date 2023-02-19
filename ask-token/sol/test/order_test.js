/*
 * @Description: 订单测试脚本
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2023-02-19 14:36:41
 * @LastEditTime: 2023-02-19 15:33:21
 */
const AskToken = artifacts.require("AskToken.sol");
const Exchange = artifacts.require("Exchange.sol");

const ETH_ADDRESS = '0x0000000000000000000000000000000000000000';
// 从Wei转换ether
const fromWei = (bn) => {
  return web3.utils.fromWei(bn, "ether");
};
// 从ether转换到Wei
const toWei = (number) => {
  return web3.utils.toWei(number.toString(), "ether");
};
module.exports = async function (callback) {
  const accounts = await web3.eth.getAccounts();
  const askToken = await AskToken.deployed();
  const exchange = await Exchange.deployed();

  // 数据准备
  // 1. accounts[0]往交易所存AskToken
  // const money = toWei(100000);
  // // 用户授权交易所
  // await askToken.approve(exchange.address, money, {from: accounts[0]});
  // await exchange.depositToken(askToken.address, money, {from: accounts[0]});
  // // 查看账户余额
  // const balanceof1 = await askToken.balanceOf(accounts[0]);
  // const balanceof2 = await exchange.tokens(askToken.address, accounts[0]);
  // console.log("accounts[0]在askToken下的余额", fromWei(balanceof1));
  // console.log("accounts[0]在交易所中askToken下的余额", fromWei(balanceof2));
  
  // // 2. accounts[1]往交易所存ETH
  // await exchange.depositEther({from: accounts[1], value: toWei(100)});
  // const balanceof3 = await exchange.tokens(ETH_ADDRESS, accounts[1]);
  // console.log("accounts[1]在交易所中ETH下的余额", fromWei(balanceof3));

  // // 1. 创建订单
  // // 100 ASK <=> 1 ETH
  // const res1 = await exchange.makeOrder(askToken.address, toWei(100), ETH_ADDRESS, toWei(1));
  // console.log(res1.logs[0].args[0]);
  // const orderCount = await exchange.orderCount();
  // console.log("当前订单数", orderCount);
  
  // // 2. 取消订单
  // // const res2 = await exchange.cancleOrder(1);
  // // console.log(res2.logs[0].args[0]);
  
  // // 3. 完成订单
  const res3 = await exchange.fillOrder(3, {from: accounts[1]});
  // console.log(res3.logs[0].args[0]);

  const balanceof4 = await exchange.tokens(askToken.address, accounts[1]);
  const balanceof5 = await exchange.tokens(ETH_ADDRESS, accounts[1]);
  console.log("accounts[1]在交易所中askToken下的余额", fromWei(balanceof4));
  console.log("accounts[1]在交易所中ETH下的余额", fromWei(balanceof5));

  callback();
};
