/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Atoms from './components/Atoms';
import Web3 from 'web3';
import { Route, Routes } from "react-router-dom";

import Token from './token.json';
import { ColNum, PadState } from './types';

const TheApp = () => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  const handleMint = (state: PadState) => {
    let str = '';

    Object.keys(state).forEach(key => {
      const val = state[key];
      str += val;
    });

    const id = +str;
    console.log('id', id);

    const value = Web3.utils.toWei('0.01', 'ether');

    contract.methods
      .mint(id)
      .send({ from: account, value })
      .then(result => console.log(result));
  }

  useEffect(() => {
    const w = (window as any);
    const Tkn = (Token as any).output;
    console.log(Tkn);

    if (w.ethereum) {
      w.ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          const myAccount = accounts[0];
          const w3 = new Web3(w.ethereum);;
          const theContract = new w3.eth.Contract(Tkn.abi, '0x7ED3f7a0fa535123838ECa29EF91D98C09D51Fb1');

          console.log('BANG', myAccount, theContract);

          setContract(theContract);
          setAccount(myAccount);
        });
    } else {
      console.log('No window.ethereum object found');
    }
  }, []);

  return <Atoms
    onMint={handleMint}
    theState={{ 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1 }}
    hideLabels={false}
    isLocked={false}
  />
}

const App = () => {
  return <>
    <Routes>
      <Route path="/" element={<TheApp />} />
      <Route path="/art" element={<Art />} />
    </Routes>
  </>
}

const Art = () => {
  const [state, setState] = useState<PadState>({ 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1 });

  useEffect(() => {
    const s = window.location.search.replace('?', '');

    if (s.length !== 6) return;

    const theState: PadState = {
      1: +[s[0]] as ColNum,
      2: +[s[1]] as ColNum,
      3: +[s[2]] as ColNum,
      4: +[s[3]] as ColNum,
      5: +[s[4]] as ColNum,
      6: +[s[5]] as ColNum
    };

    setState(theState);
  }, []);

  return <Atoms onMint={() => { }} theState={state} hideLabels={true} isLocked={false} />
}

export default App;
