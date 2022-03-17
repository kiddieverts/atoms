import React, { useEffect, useState } from 'react';

import atoms, { renderPads, getIdFromParam, idToState, convertToState } from '../atoms-nft/index.js';
import { settings } from '../collection/index.js';

const AtomsStuff = () => {
  // const tokenId = getIdFromParam(window.location);
  const handleUpdate = (x) => console.log('handleUpdate', x);

  const searchParams = new URLSearchParams(window.location.search);
  const stateStr = searchParams.get('state') || null;
  const tokenId = searchParams.get('id') || null;

  const state = !!stateStr
    ? idToState(stateStr)
    : convertToState(tokenId);

  const sr = new URLSearchParams(window.location.search);
  const isPad = sr.get('pad') === "true";

  console.log('state', state);

  if (!state) return <>load</>

  return <>
    {isPad
      ? <AtomsPads onStateUpdate={handleUpdate} propsState={state} />
      : <AtomsVisuals tokenId={tokenId} isSmall={false} state={state} />
    }
  </>
}

const AtomsVisuals = ({ tokenId, isSmall, state }) => {
  useEffect(() => {
    const state = idToState(tokenId);
    const { init } = atoms(settings, state, true);
    // const w = isSmall ? 640 : undefined;
    // const h = isSmall ? 640 : undefined;

    init((window as any).p5);
  }, []);

  return <>
    <button id="play-btn" style={{ zIndex: 99999 }}>Play</button>
    <span id="bang">&nbsp;</span>
  </>
}

const AtomsPads = ({ onStateUpdate, propsState }) => {
  const [state, setState] = useState({ 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1 });

  useEffect(() => {
    setState(propsState);
  }, [propsState]);

  useEffect(() => {
    const { initOnlyMusic, update } = atoms(settings, state, false, true);
    initOnlyMusic((window as any).p5);

    const handleUpdate = (id) => {
      const newState = update(id);
      setState(newState);
      onStateUpdate(newState);
    };

    console.log('>>>', state)

    renderPads(settings.patch, settings.labels, state, handleUpdate);
  }, []);

  return <>
    <div id="atoms-mint"></div>
  </>
}

export default AtomsStuff;
