/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { Route, Routes } from "react-router-dom";

import Token from './token.json';
import AtomsStuff from './components/AtomsStuff';

const TheApp = () => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  const handleMint = (id: string) => {
    // let str = '';

    // Object.keys(state).forEach(key => {
    //   const val = state[key];
    //   str += val;
    // });

    // const id = +str;
    // console.log('id', id);

    const value = Web3.utils.toWei('0.01', 'ether');

    contract.methods
      .mint(id)
      .send({ from: account, value })
      .then(result => console.log(result));
  }

  useEffect(() => {
    const w = (window as any);
    const Tkn = (Token as any).output;

    if (w.ethereum) {
      w.ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          const myAccount = accounts[0];
          const w3 = new Web3(w.ethereum);;
          const theContract = new w3.eth.Contract(Tkn.abi, '0x7ED3f7a0fa535123838ECa29EF91D98C09D51Fb1');

          setContract(theContract);
          setAccount(myAccount);
        });
    } else {
      console.log('No window.ethereum object found');
    }
  }, []);

  const handleTheMint = () => {
    const sr = window.location.search;
    const params = new URLSearchParams(sr);
    const id = params.get('id');

    if (!!id) {
      console.log('bang', id)
      handleMint(id);
    }
  }

  return <div>
    <h1>Press mint...</h1>

    <button onClick={handleTheMint}>
      MINT
    </button>
  </div>

  // return <Atoms
  //   onMint={handleMint}
  //   theState={{ 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1 }}
  //   hideLabels={false}
  //   isLocked={false}
  // />
}

const App = () => {
  return <>
    <Routes>
      <Route path="/" element={<AtomsStuff />} />
      <Route path="/mint" element={<TheApp />} />
    </Routes>
  </>
}

export default App;
