import { ethers } from "ethers";
import React, { useState, useEffect } from "react";

export default function Dashboard({ contract, account }) {
    const [donorName, setDonorName] = React.useState("");
    const [beneficiaryName, setBeneficiaryName] = React.useState("");
    const [donors, setDonors] = useState(0);
    const [beneficiary, setBeneficiary] = useState(0);
    const [donorId, setDonorId] = useState(null);
    const [amount, setAmount] = useState(0);

    async function registerDonor() {
        console.log("Registering donor: " + donorName);
        const tx = await (contract.register_donor(donorName));
        console.log(tx);
        setDonorName("");
    }

    async function registerBeneficiary() {
        console.log("Registering Beneficiary: " + beneficiaryName);
        const tx = await (contract.register_beneficiary(beneficiaryName));
        console.log(tx);
        setBeneficiaryName("");
    }

    async function refresh() {
        console.log("Get Donors");
        const numOfDonors = await (contract.getDonors());
        console.log(numOfDonors);
        //const numOfBen = await contract.beneficiary_id();
        //setDonors(numOfDonors);
        //setBeneficiary(numOfBen);
    }

    async function donate() {
        console.log("Donating");
        const tx = await (contract.donate(donorId, {value: ethers.utils.parseEther(amount)}));
        console.log(tx);
    }

    return (<>
    <p style={{marginBottom : "2rem", borderBottom : "5px solid black", padding : "0.5rem"}}>Account Active: {account}</p>
        <input type="text" onChange={(e) => {
            setDonorName(e.target.value);
        }} placeholder="Enter the donor name" />
        <button onClick={registerDonor}>Add Donor</button>

        <br />

        <input type="text" onChange={(e) => {
            setBeneficiaryName(e.target.value);
        }} placeholder="Enter the beneficiary name" />
        <button onClick={registerBeneficiary}>Add Beneficiary</button>
        
        {/* <div style={{marginTop: "4rem"}}>
            <p>Total Donor: {donors}</p>
            <p>Total Beneficiary: {beneficiary}</p>
            <button onClick={refresh}>Refresh</button>
        </div> */}


        <div style={{marginTop: "2rem", border : "2px solid black", width : "max-content", padding : "10px"}}>
            <input type="number" placeholder="Enter beneficiary id: " onChange={(e)=>{
                setDonorId(e.target.value);
            }}></input>
            <input type="text" placeholder="Enter amount: " onChange={(e)=>{
                setAmount(e.target.value);
            }}></input>
            <button onClick={donate}>Donate</button>
        </div>
    </>);
}