const contract = artifacts.require("Donation");

module.exports = function(deployer) {
    deployer.deploy(contract);
};