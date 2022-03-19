/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { renderPads } from '../../atoms-nft';
import { settings } from '../../collection';

const AtomsPads = ({ onStateUpdate, state, atoms: atm, isReady }) => {
  const [reRenderFn, setReRenderFn] = useState<any>(undefined);

  useEffect(() => {
    const handleUpdate = (id) => {
      const newState = atm.updatePartial(id);
      onStateUpdate(newState);
    };

    const { reRender } = renderPads(settings.patch, settings.labels, state, handleUpdate);
    setReRenderFn(() => reRender);
  }, []);

  useEffect(() => {
    if (isReady) {
      atm.updateWholePatch(state);
      reRenderFn(state);
    }
  }, [isReady]);

  return <>
    <div id="atoms-mint"></div>
  </>
}


export default AtomsPads;