const Contracts = artifacts.require("StudentListStorage");

module.exports = async function (callback) {
  const obj = await Contracts.deployed();
  console.log(await obj.setList("test", 121));
  console.log(await obj.setList("test", 121));
  console.log(await obj.setList("test", 121));
  // console.log(await obj.remove(0));
  console.log(await obj.getList());
  callback();
};
