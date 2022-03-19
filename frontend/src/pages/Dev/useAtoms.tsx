/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useContext } from 'react';

import atoms from '../../atoms-nft';
import { settings } from '../../collection';
import { AtomsContext } from '../../components/Atoms/AtomsContext';

export const useAtoms = (state) => {
  const [isReady, setIsReady] = useState(false);
  const [atm, setAtm] = useContext(AtomsContext);

  useEffect(() => {
    if (!atm) {
      const config = {
        settings,
        state,
        showVisuals: true,
        isLooped: true,
        canvas: {
          x: 1200,
          y: 100,
          h: 400,
          w: 400
        },
        onReady: handleReady
      }
      const a = atoms(config);
      a.init((window as any).p5);
      setAtm(a);
    }
  }, []);

  useEffect(() => {
    if (!!atm) {
      update();
    }
  }, []);

  useEffect(() => {
    if (!!atm) {
      update();
    }
  }, [atm]);

  useEffect(() => {
    if (!!atm && !!state) {
      update();
    }
  }, [state]);

  const update = () => {
    const st = atm.update(state);
    setArr(st);
  }

  const handleReady = () => setIsReady(true);
  const restart = () => { }
  const setNewConfig = (config) => atm.setNewConfig(config);

  const [arr, setArr] = useState(undefined);

  return { atoms: atm, isReady, restart, setNewConfig, arr };
};
