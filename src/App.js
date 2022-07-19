import Dashboard from './frontend/views/Dashboard';
import { ethers } from 'ethers';
import abi from "../src/backend/output/Donation.json";
import {useState} from "react";

function App() {
  const [contract, setContract] = useState({});
  const [account, setAccount] = useState({});
  const [loading, setLoading] = useState(true);
  const [connectButtonVisible, setConnectButtonVisible] = useState("block");

  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0])

    const provider = new ethers.providers.Web3Provider(window.ethereum)

    const signer = provider.getSigner()

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    })

    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[0])
      await web3Handler()
    })
    loadContracts(signer)
  }

  function loadContracts(signer) {
    const contract = new ethers.Contract(abi.networks[5777].address, abi.abi, signer);
    setContract(contract);
    setLoading(false);
    setConnectButtonVisible("none")
  }

  return (<>
  <button style={{backgroundColor: "black", color: "white", margin: "3rem", padding: "1rem", display: connectButtonVisible}} onClick={web3Handler}>Connect Wallet</button>
  {
    loading ? <p>Awaiting meta mask connection </p> : <Dashboard contract={contract} />
  }
  </>);
}

export default App;