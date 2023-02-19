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

  // 1. accounts[0]往交易所存以太币
  // await exchange.depositEther({from: accounts[0], value: toWei(10)})
  // const balanceof1 = await exchange.tokens(ETH_ADDRESS, accounts[0]);
  // console.log("accounts[0]在ETH中余额", fromWei(balanceof1));

  // 2. accounts[0]往交易所存AskToken
  // const money = toWei(100000);
  // // 用户授权交易所
  // await askToken.approve(exchange.address, money, {from: accounts[0]});
  // await exchange.depositToken(askToken.address, money, {from: accounts[0]});
  // // 查看账户余额
  // const balanceof2 = await askToken.balanceOf(accounts[0]);
  // const balanceof3 = await exchange.tokens(askToken.address, accounts[0]);
  // console.log("accounts[0]在askToken下的余额", fromWei(balanceof2));
  // console.log("accounts[0]在交易所中askToken下的余额", fromWei(balanceof3));

  callback();
};
