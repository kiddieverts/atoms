/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Atoms from './components/Atoms';
import Web3 from 'web3';

import Token from './token.json';
import { PadState } from './types';

const App = () => {
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



  return <Atoms onMint={handleMint} />
}

export default App;
