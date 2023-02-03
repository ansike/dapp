const Contracts = artifacts.require("StudentListStorage");

module.exports = async function (callback) {
  const obj = await Contracts.deployed();
  console.log(obj)
  await obj.addList("test", 12);
  console.log(await obj.getList());
  console.log(await obj.StudentList(1));
  callback();
};
