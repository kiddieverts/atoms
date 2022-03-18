/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Web3 from 'web3';

import Token from '../../token.json';
import { Pads } from './Pads';

const CONTRACT_ADDRESS = '0x7ED3f7a0fa535123838ECa29EF91D98C09D51Fb1';

const Mint = () => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [tokenId, setTokenId] = useState(null);

  useEffect(() => {
    const { abi } = (Token as any).output;

    if ((window as any).ethereum) {
      (window as any).ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          const myAccount = accounts[0];
          const w3 = new Web3((window as any).ethereum);;
          const theContract = new w3.eth.Contract(abi, CONTRACT_ADDRESS);

          setContract(theContract);
          setAccount(myAccount);
        })
        .catch(err => console.log('TODO: //', err));
    } else {
      console.log('TODO: No window.ethereum object found');
    }
  }, []);

  const handleMint = () => {
    console.log('handleMint', tokenId)
    if (!tokenId) return;
    const value = Web3.utils.toWei('0.01', 'ether');

    contract.methods
      .mint(tokenId)
      .send({ from: account, value })
      .then(result => console.log(result));
  }

  const handleTokenIdUpdate = (newTokenId) => {
    console.log('handleTokenIdUpdate', newTokenId)
    setTokenId(newTokenId);
  }

  return <>
    <Pads
      onUpdate={handleTokenIdUpdate}
    />

    <button
      disabled={!tokenId}
      onClick={handleMint}
    >MINT</button>
  </>
}

export default Mint;