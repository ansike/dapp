const AskToken = artifacts.require("AskToken.sol");

// 从Wei转换ether
const fromWei = (bn) => {
  return web3.utils.fromWei(bn, "ether");
};
// 从ether转换到Wei
const toWei = (number) => {
  return web3.utils.toWei(number.toString(), "ether");
};
module.exports = async function (callback) {
  const askToken = await AskToken.deployed();

  // 查看账户余额
  const balanceof1 = await askToken.balanceOf(
    "0x7a11a1bDE5433c3642314B457F9176914ffB482d"
  );
  console.log("balanceof1", fromWei(balanceof1));

  await askToken.transfer(
    "0x874813515BA591271c361BcaFDe263534368B54f",
    toWei(10000),
    {
      from: "0x7a11a1bDE5433c3642314B457F9176914ffB482d",
    }
  );
  // 查看账户余额
  const balanceof2 = await askToken.balanceOf(
    "0x7a11a1bDE5433c3642314B457F9176914ffB482d"
  );
  console.log("balanceof2", fromWei(balanceof2));

  // 查看账户余额
  const balanceof3 = await askToken.balanceOf(
    "0x874813515BA591271c361BcaFDe263534368B54f"
  );
  console.log("balanceof3", fromWei(balanceof3));
  callback();
};
