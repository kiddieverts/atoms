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
      atm.update(state);
    }
  }, []);

  useEffect(() => {
    if (!!atm) {
      atm.update(state);
    }
  }, [atm]);

  useEffect(() => {
    if (!!atm && !!state) {
      atm.update(state);
    }
  }, [state]);

  const handleReady = () => setIsReady(true);
  const restart = () => { }
  const setNewConfig = (config) => atm.setNewConfig(config);

  return { atoms: atm, isReady, restart, setNewConfig };
};
