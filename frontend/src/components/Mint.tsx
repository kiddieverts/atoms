/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Web3 from 'web3';
import { convertToState, idToState } from '../atoms-nft';
import Token from '../token.json';
import AtomsStuff, { AtomsPads } from './AtomsStuff';

const Mint = () => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  // useEffect(() => {
  //   const w = (window as any);
  //   const Tkn = (Token as any).output;

  //   if (w.ethereum) {
  //     w.ethereum.request({ method: 'eth_requestAccounts' })
  //       .then(accounts => {
  //         const myAccount = accounts[0];
  //         const w3 = new Web3(w.ethereum);;
  //         const theContract = new w3.eth.Contract(Tkn.abi, '0x7ED3f7a0fa535123838ECa29EF91D98C09D51Fb1');

  //         setContract(theContract);
  //         setAccount(myAccount);
  //       });
  //   } else {
  //     console.log('No window.ethereum object found');
  //   }
  // }, []);

  // const handleMint = (id: string) => {
  //   const value = Web3.utils.toWei('0.01', 'ether');

  //   contract.methods
  //     .mint(id)
  //     .send({ from: account, value })
  //     .then(result => console.log(result));
  // }

  // const handleTheMint = () => {
  //   const params = new URLSearchParams(window.location.search);
  //   const id = params.get('id');

  //   if (!!id) {
  //     handleMint(id);
  //   }
  // }

  return <div>
    {/* <h1>Press mint...</h1>

    <button onClick={handleTheMint}>
      MINT
    </button> */}
    <Pads />

  </div>
}

const Pads = () => {
  // const [tokenId, setTokenId] = useState();
  const [state, setState] = useState<any>({ 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1 });
  const [params] = useSearchParams();
  const searchParams = new URLSearchParams(params);
  const tokenId = searchParams.get('id');
  const stateStr = searchParams.get('state');

  const navigate = useNavigate();

  useEffect(() => {
    if (!tokenId && !stateStr) {
      navigate('/mint?id=' + 1)
    }

    const st = !!stateStr
      ? idToState(stateStr)
      : convertToState(tokenId);

    setState(st);

  }, [tokenId]);

  const handleUpdate = (x) => console.log('handleUpdate', x);

  console.log('>> tokenId', tokenId, state)

  return <>
    <h1>
      {JSON.stringify(state)}

    </h1>

    <AtomsPads
      onStateUpdate={handleUpdate}
      propsState={state}
    />
  </>
}

export default Mint;