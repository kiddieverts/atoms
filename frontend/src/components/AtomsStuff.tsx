/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react';

const AtomsVisuals = ({ tokenId, propsState, isReady, atm }) => {
  useEffect(() => {
    if (isReady) {
      atm.updateWholePatch(propsState);
    }
  }, [isReady, propsState]);

  return <>
    <button id="play-btn" style={{ zIndex: 99999 }}>Play</button>
    <span id="bang">&nbsp;</span>
  </>
}

export default AtomsVisuals;
