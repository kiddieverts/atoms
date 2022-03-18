/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { convertTokenIdToState, stateStringToStateObject } from '../../atoms-nft';
import AtomsPads from '../../components/Atoms';
import { PadState } from '../../types';
import { stateObjectToStateString, stateStringToTokenId } from '../../atoms-nft/utils/tokenIdToState';

export const Pads = ({ onUpdate }: any) => {
  const [state, setState] = useState<PadState>({ 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1 });
  const [params] = useSearchParams();
  const searchParams = new URLSearchParams(params);
  const tokenId = searchParams.get('id');
  const stateString = searchParams.get('state');

  const navigate = useNavigate();

  useEffect(() => {
    if (!tokenId && !stateString) {
      navigate(`/mint?id=${1}`);
    }

    const theState = !!stateString
      ? stateStringToStateObject(stateString)
      : convertTokenIdToState(tokenId);

    setState(theState as PadState);
  }, [tokenId]);

  const handleUpdate = (newState: PadState) => {

    const str = stateObjectToStateString(newState);
    console.log('handleUpdate', newState, str)
    setState(newState);
    const tokenId = stateStringToTokenId(str);
    onUpdate(tokenId);
  };

  return <>
    <AtomsPads
      onStateUpdate={handleUpdate}
      propsState={state}
    />

    <pre>
      {JSON.stringify(state)}
    </pre>
  </>;
};
