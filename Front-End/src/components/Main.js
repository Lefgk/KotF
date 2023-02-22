import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import contracts from "../config/constants/contracts";
// import contract from "./config/abi";
import Web3 from "web3";
import { useEffect, useState } from "react";

const ABI = require("../config/abi/contract.json");

const web3 = new Web3(Web3.givenProvider);
const injectedConnector = new InjectedConnector({
  supportedChainIds: [97],
});

export default function App() {
  const { account, activate, active } = useWeb3React();
  const [fool, setfool] = useState(0);
  const [price, setprice] = useState(0);
  const [refershit, setrefershit] = useState(false);
  const [pricetoEnter, setpricetoEnter] = useState(0);

  var contract_instance = new web3.eth.Contract(ABI, contracts.contract[97]);

  useEffect(() => {
    async function mainData() {
      activate(injectedConnector);
      const foolis = await contract_instance.methods.currentFool().call();
      const priceis = await contract_instance.methods.currentPrice().call();
      setfool(foolis);
      setprice(priceis);
    }
    mainData();
  }, [account, activate, refershit]);

  const Profile = () => {
    if (active) return <div>Connected with {account}</div>;
    return (
      <button onClick={() => activate(injectedConnector)}>
        Connect Wallet
      </button>
    );
  };

  async function Foolme() {
    await contract_instance.methods.BecomeFool().send({
      from: account,
      value: pricetoEnter,
    });
    setTimeout(() => {
      setrefershit(!refershit);
    }, 2000);
  }
  const handleInputChange = (e) => {
    console.log(e);
    setpricetoEnter(e.target.value);
  };
  return (
    <>
      <div style={{ textAlign: "center", color: "red" }}>
        Dapp available in BSC Testnet only
      </div>
      <br />
      <Profile />
      <br />
      Current Fool : {fool} <br />
      <br /> Current Price : {price} Wei
      <br /> <br />
      Insert amount of Wei to send : <br /> <br />
      <input
        placeholder="0"
        maxLength={10}
        value={pricetoEnter}
        onChange={(e) => handleInputChange(e)}
      />
      <button onClick={() => Foolme()}> Become Fool </button>
    </>
  );
}
