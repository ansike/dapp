import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

function App() {
  useEffect(()=>{
    const web3 = new Web3("http://localhost:8545");
    web3.eth.getBlockNumber().then((res) => {
      console.log("blockNumber", res);
    });
    web3.eth.getChainId().then((res) => {
      console.log("chainID", res);
    });
  },[])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
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
