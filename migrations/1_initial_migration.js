const ErenToken = artifacts.require("ErenToken");

module.exports = function(deployer) {
  deployer.deploy(ErenToken);
};
