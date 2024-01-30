import logo from "./logo.svg";
import "./App.css";
// import { ethers } from "ethers";
import contractABI from "./abi.json";
const { ethers } = require("ethers");

function App() {
  const contractAddress = "0x24c2a14937da7999595a9eda527edc1267677f22";

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function withdraw() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        const transaction = await contract.withdraw();
        await transaction.wait();
        console.log("Money withdrawn");
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <button onClick={withdraw}>Withdraw</button>
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
