import React from "react";

export default function Dashboard({ contract }) {
    const [donorName, setDonorName] = React.useState("");
    const [beneficiaryName, setBeneficiaryName] = React.useState("");

    async function registerDonor() {
        console.log("Registering donor: " + donorName);
        await (contract.register_donor(donorName));
    }

    async function registerBeneficiary() {
        console.log("Registering Beneficiary: " + beneficiaryName);
        await (contract.register_beneficiary(beneficiaryName));
    }

    return (<>
        <input type="text" onChange={(e) => {
            setDonorName(e.target.value);
        }} placeholder="Enter the donor name" />
        <button onClick={registerDonor}>Add Donor</button>

        <br />

        <input type="text" onChange={(e) => {
            setBeneficiaryName(e.target.value);
        }} placeholder="Enter the beneficiary name" />
        <button onClick={registerBeneficiary}>Add Beneficiary</button>
    </>);
}