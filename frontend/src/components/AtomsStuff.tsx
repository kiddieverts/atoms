import React, { useEffect } from 'react';

import atoms, { stateStringToStateObject, convertTokenIdToState } from '../atoms-nft/index.js';
import { settings } from '../collection/index.js';

const AtomsStuff = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const stateStr = searchParams.get('state') || null;
  const tokenId = searchParams.get('id') || null;

  const state = !!stateStr
    ? stateStringToStateObject(stateStr)
    : convertTokenIdToState(tokenId);

  console.log('state', state);

  if (!state) return <>load</>

  return <>
    <AtomsVisuals tokenId={tokenId} isSmall={false} state={state} />
  </>
}

export const AtomsVisuals = ({ tokenId, isSmall, state }) => {
  useEffect(() => {
    const state = stateStringToStateObject(tokenId);
    const { init } = atoms(settings, state, true);

    init((window as any).p5);
  }, []);

  return <>
    <button id="play-btn" style={{ zIndex: 99999 }}>Play</button>
    <span id="bang">&nbsp;</span>
  </>
}




export default AtomsStuff;
