/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import atoms, { convertTokenIdToState, stateStringToStateObject } from '../../atoms-nft';
import AtomsPads from '../../components/Atoms';
import { PadState } from '../../types';
import { stateObjectToStateString, stateStringToTokenId } from '../../atoms-nft/utils/tokenIdToState';
import { settings } from '../../collection';
import { AtomsContext } from '../../components/Atoms/AtomsContext';

const useAtoms = () => {
  const initState = { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1 };
  const [isReady, setIsReady] = useState(false);

  const handleReady = () => setIsReady(true);

  const [atm, setAtm] = useContext(AtomsContext);

  useEffect(() => {
    if (!atm) {
      const showVisuals = true;
      const isLooped = true;
      const canvas = {
        x: 1200,
        y: 100,
        h: 400,
        w: 400
      }
      setAtm(atoms(settings, initState, showVisuals, isLooped, handleReady, canvas));
    }
  }, []);

  useEffect(() => {
    if (!!atm) {
      atm.initOnlyMusic((window as any).p5);
    }
  }, [atm]);


  return { atm, isReady }
}

const Parent = () => {
  const [state, setState] = useState<PadState>({ 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1 });
  const [params] = useSearchParams();
  const searchParams = new URLSearchParams(params);
  const tokenId = searchParams.get('id');
  const stateString = searchParams.get('state');

  const { atm, isReady } = useAtoms();

  const navigate = useNavigate();

  useEffect(() => {
    if (!tokenId && !stateString) {
      navigate(`?id=${1}`);
    }

    const theState = !!stateString
      ? stateStringToStateObject(stateString)
      : convertTokenIdToState(tokenId);

    setState(theState as PadState);
  }, [tokenId]);

  const handleUpdate = (newState: PadState) => {
    const str = stateObjectToStateString(newState);
    setState(newState);
    const tokenId = stateStringToTokenId(str);
    // onUpdate(tokenId);
  };

  return <>
    <AtomsPads
      onStateUpdate={handleUpdate}
      state={state}
      atoms={atm}
      isReady={isReady}
    />
  </>
}

export default Parent;