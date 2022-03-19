/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { renderPads } from '../../atoms-nft';
import { settings } from '../../collection';

const AtomsPads = ({ onStateUpdate, state, atoms: atm, isReady }) => {
  const [reRenderFn, setReRenderFn] = useState<any>(undefined);

  useEffect(() => {
    if (!!atm) {
      const { reRender } = renderPads(settings.patch, settings.labels, state, onStateUpdate);
      setReRenderFn(() => reRender);
    }
  }, [atm]);

  useEffect(() => {
    if (isReady) {
      reRenderFn(state);
    }
  }, [state, isReady]);

  return <>
    <div id="atoms-mint"></div>
  </>
}


export default AtomsPads;