import React, { useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";

console.log(Web3.givenProvider);

const web3 = new Web3((window as any).web3.currentProvider || "http://127.0.0.1:8545");
function App() {
  const [curAccount, setCurAccount] = useState<string>("");
  const [desAccount, setDesAccount] = useState<string>("");
  useEffect(() => {
    getCurAccount();
  }, []);

  const transMoney = async () => {
    web3.eth
      .sendTransaction({
        from: curAccount,
        to: desAccount,
        value: web3.utils.toWei("1", "ether"),
      })
      .then(function (receipt) {
        console.log("transaction done", receipt);
      });
  };

  const getCurAccount = async () => {
    let accounts = await web3.eth.getAccounts();
    
    if (!accounts.length) {
      accounts = await web3.eth.requestAccounts();
    }
    console.log('linked account：',accounts);
    setCurAccount(accounts[0]);
  };
  return (
    <div className="App">
      <p>{curAccount}</p>
      <input
        type="text"
        value={desAccount}
        onChange={(e) => setDesAccount(e.target.value)}
      />
      <button onClick={transMoney}>transform</button>
    </div>
  );
}

export default App;
