import React, { useEffect, useState } from 'react';

import atoms, { renderPads, idToState, convertToState } from '../atoms-nft/index.js';
import { settings } from '../collection/index.js';

const AtomsStuff = () => {
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

export const AtomsVisuals = ({ tokenId, isSmall, state }) => {
  useEffect(() => {
    const state = idToState(tokenId);
    const { init } = atoms(settings, state, true);

    init((window as any).p5);
  }, []);

  return <>
    <button id="play-btn" style={{ zIndex: 99999 }}>Play</button>
    <span id="bang">&nbsp;</span>
  </>
}

export const AtomsPads = ({ onStateUpdate, propsState }) => {
  const [state, setState] = useState({ 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1 });
  const [isReady, setIsReady] = useState(false);

  const [atm] = useState(atoms(settings, state, false, true));
  const [reRenderFn, setReRenderFn] = useState<any>(undefined);

  useEffect(() => {
    atm.initOnlyMusic((window as any).p5).then(r => {
      const handleUpdate = (id) => {
        const newState = atm.updatePartial(id);
        setState(newState);
        onStateUpdate(newState);
      };
      const { reRender } = renderPads(settings.patch, settings.labels, state, handleUpdate);
      setReRenderFn(() => reRender);
      setIsReady(true);
    });
  }, []);

  useEffect(() => {
    setState(propsState);
  }, [propsState]);

  useEffect(() => {
    if (isReady) {
      atm.updateWholePatch(propsState);
      reRenderFn(propsState);
    }
  }, [isReady]);

  return <>
    <div id="atoms-mint"></div>
  </>
}

export default AtomsStuff;
