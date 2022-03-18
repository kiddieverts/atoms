/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import atoms, { renderPads } from '../../atoms-nft';
import { settings } from '../../collection';

const AtomsPads = ({ onStateUpdate, propsState }) => {
  const [state, setState] = useState(initState);
  const [atm] = useState(atoms(settings, initState, false, true))
  const [isReady, setIsReady] = useState(false);

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

const initState = { 1: 1, 2: 1, 3: 1, 4: 1, 5: 5, 6: 3 };

export default AtomsPads;