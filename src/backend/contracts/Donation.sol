// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Donation {

    uint donor_id;
    uint beneficiary_id;

    function getDonors() external view returns(uint) {
        return donor_id;
    }

    function getBeneficiaries() external view returns(uint) {
        return beneficiary_id;
    }

    constructor() {
        donor_id = 0;
        beneficiary_id = 0;
    }

    struct Beneficiary {
        address payable beneficiary_address;
        string name;
        uint id;
    }

    struct Donor {
        address payable donor_address;
        string name;
        uint id;
    }

    mapping(uint => Donor) public donors;
    mapping(uint => Beneficiary) public beneficiaries;

    function register_donor(string memory _name) external {
        donor_id++;
        donors[donor_id] = Donor(
            payable(msg.sender),
            _name,
            donor_id
        );
    }

    function register_beneficiary(string memory _name) external {
        beneficiary_id++;
        beneficiaries[beneficiary_id] = Beneficiary(
            payable(msg.sender),
            _name,
            beneficiary_id
        );
    }

    function donate(uint _beneficiary_id) external payable {
        require(_beneficiary_id > 0 && _beneficiary_id <= beneficiary_id, "Beneficiary doesn't exist");
        beneficiaries[_beneficiary_id].beneficiary_address.transfer(msg.value);
    }

    function totalDonation(uint _beneficiary_id) public view returns (uint) {
        require(_beneficiary_id > 0 && _beneficiary_id <= beneficiary_id, "Beneficiary doesn't exist");
        return beneficiaries[_beneficiary_id].beneficiary_address.balance;
    }
}