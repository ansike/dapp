const Contracts = artifacts.require("StudentListStorage");

module.exports = function(deployer){
  deployer.deploy(Contracts);
}