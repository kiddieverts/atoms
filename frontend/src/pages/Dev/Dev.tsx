/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { convertTokenIdToState, stateObjectToStateString, stateStringToStateObject, stateStringToTokenId } from '../../atoms-nft';
import AtomsPads from '../../components/Atoms';
import { PadState } from '../../types';
import { useAtoms } from './useAtoms';

const Dev = () => {
  const [state, setState] = useState<PadState>({ 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1 });
  const [padNumber, setPadNumber] = useState(undefined);
  const [params] = useSearchParams();
  const searchParams = new URLSearchParams(params);
  const id = searchParams.get('id');
  const stateString = searchParams.get('state');
  const { atoms, isReady } = useAtoms(state);
  const navigate = useNavigate();
  const tokenId = stateStringToTokenId(stateObjectToStateString(state));

  useEffect(() => {
    if (!id && !stateString) {
      navigate(`?id=${1}`);
    }

    const theState = !!stateString
      ? stateStringToStateObject(stateString)
      : convertTokenIdToState(id);

    setState(theState as PadState);
  }, [id, stateString]);

  useEffect(() => {
    if (!!padNumber) {
      const [row, col] = padNumber;
      const newState = { ...state, [row]: parseInt(col) };
      const str = stateObjectToStateString(newState);

      navigate(`?state=${str}`);
      setState(newState);
    }
  }, [padNumber]);

  const handleUpdatePad = (padNumber) => setPadNumber(padNumber);
  const toggleVisuals = () => atoms.toggleVisuals()
  const toggleReset = () => atoms.restart();

  // const finalArr = arr?.voices.filter(voices => {
  //   return voices.find(([pitch, noteLength]) => !!pitch);
  // })

  return <>
    <h1>#{tokenId}</h1>
    <AtomsPads
      onStateUpdate={handleUpdatePad}
      state={state}
      atoms={atoms}
      isReady={isReady}
    />

    <button onClick={toggleVisuals}>Show / hide</button>
    <button onClick={toggleReset}>Reset</button>

    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>
  </>
};

export default Dev;
