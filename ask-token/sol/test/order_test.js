/*
 * @Description: 订单测试脚本
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2023-02-19 14:36:41
 * @LastEditTime: 2023-02-24 00:25:35
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

  try {

  // 数据准备
  // 1. accounts[0]往交易所存AskToken
  const money = toWei(100000);
  // 用户授权交易所
  await askToken.approve(exchange.address, money, {from: accounts[0]});
  await exchange.depositToken(askToken.address, money, {from: accounts[0]});

  const balanceof11 = await askToken.balanceOf(accounts[0]);
  console.log("accounts[0]在askToken下的余额", fromWei(balanceof11));

  await askToken.transfer(accounts[1], money, {from: accounts[0]});
  await askToken.transfer(accounts[2], money, {from: accounts[0]});
  // console.log(res);

  await askToken.approve(exchange.address, money, {from: accounts[1]});
  await exchange.depositToken(askToken.address, money, {from: accounts[1]});

  // 查看账户余额
  const balanceof1 = await askToken.balanceOf(accounts[0]);
  console.log("accounts[0]在askToken下的余额", fromWei(balanceof1));
  const balanceof2 = await exchange.tokens(askToken.address, accounts[0]);
  console.log("accounts[0]在交易所中askToken下的余额", fromWei(balanceof2));
  
  // 2. accounts[1]往交易所存ETH
  await exchange.depositEther({from: accounts[0], value: toWei(100)});
  const balanceof31 = await exchange.tokens(ETH_ADDRESS, accounts[0]);
  console.log("accounts[0]在交易所中ETH下的余额", fromWei(balanceof31));

  await exchange.depositEther({from: accounts[1], value: toWei(100)});
  const balanceof32 = await exchange.tokens(ETH_ADDRESS, accounts[1]);
  console.log("accounts[1]在交易所中ETH下的余额", fromWei(balanceof32));

  // 1. 创建订单
  // 100 ASK <=> 1 ETH
  await exchange.makeOrder(askToken.address, toWei(88), ETH_ADDRESS, toWei(1), {
    from: accounts[0]
  });
  await exchange.makeOrder(askToken.address, toWei(89), ETH_ADDRESS, toWei(2),{
    from: accounts[1]
  });
  const orderCount = await exchange.orderCount();
  console.log("当前订单数", orderCount);
  
  // 2. 取消订单
  // await exchange.cancleOrder(1);
  
  // // 3. 完成订单
  const res3 = await exchange.fillOrder(2, {from: accounts[1]});
  // console.log(res3.logs[0].args[0]);

  const balanceof4 = await exchange.tokens(askToken.address, accounts[1]);
  const balanceof5 = await exchange.tokens(ETH_ADDRESS, accounts[1]);
  console.log("accounts[1]在交易所中askToken下的余额", fromWei(balanceof4));
  console.log("accounts[1]在交易所中ETH下的余额", fromWei(balanceof5));

  callback();
      
  } catch (error) {
    console.log(error); 
  }
};
