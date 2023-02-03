const Contracts = artifacts.require("StudentStorage");

module.exports = async function (callback) {
  const obj = await Contracts.deployed();
  console.log(obj)
  await obj.setData(12, "test");
  console.log(await obj.getData());
  console.log(await obj.username());
  console.log(await obj.age());

  callback();
};
