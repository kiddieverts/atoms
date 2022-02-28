import React, { useState, useEffect } from 'react';

import { ColNum, Melodies, PadState } from '../types';
import { combineMelodies } from '../utils/combineMelodies';
import { patch, scale } from '../music/0_patch';
import { runPatch } from '../utils/helpers';
import MidiPlayer from '../components/MidiPlayer';
import Pads from '../components/Pads';

const MAX_LENGTH = 1000000000;
const DEFAULT_STATE: PadState = {
  1: 4,
  2: 3,
  3: 1,
  4: 2,
  5: 1,
  6: 2,
}
const DEFAULT_TEMPO = 120.0;

type Song = { [key: string]: PadState }
type Mode = 'EXPLORE' | 'REC' | 'LISTEN' | '';

type AtomsProps = { onMint: (state: PadState) => void; }

const Atoms = ({ onMint }: AtomsProps) => {
  const [voices, setVoices] = useState<Melodies>([]);
  const [max, setMax] = useState(MAX_LENGTH);
  const [isStopped, setIsStopped] = useState(true);
  const [mode, setMode] = useState<Mode>('');
  const [globalCounter, setGlobalCounter] = useState(0);
  const [song, setSong] = useState<Song>({});
  const [tempo, setTempo] = useState(DEFAULT_TEMPO);
  const [state, setState] = useState<PadState>(DEFAULT_STATE);

  useEffect(() => {
    const s = window.location.pathname.replace('/', '');
    if (s.length !== 6) return;

    const theState: PadState = {
      1: +[s[0]] as ColNum,
      2: +[s[1]] as ColNum,
      3: +[s[2]] as ColNum,
      4: +[s[3]] as ColNum,
      5: +[s[4]] as ColNum,
      6: +[s[5]] as ColNum
    };

    setState(theState)
  }, []);

  useEffect(() => {
    const { melodies, tempo: t } = runPatch(state, patch, scale);
    setVoices(combineMelodies(melodies));
    if (t !== tempo) {
      setTempo(t);
    }

    if (mode === 'REC') {
      addStep();
    }
  }, [state]);

  useEffect(() => {
    if (!isStopped && mode === 'REC' && Object.keys(song).length === 0) {
      addStep();
    }
  }, [isStopped]);

  const addStep = () => setSong(old => ({ ...old, [globalCounter]: state }));

  const handleUpdateCounter = (cnt) => {
    if (cnt > max) {
      handleStop();
      throw new Error(''); // Forces playback to stop. TODO: Find a better solution
    }
    setGlobalCounter(cnt);

    if (mode === 'LISTEN') {
      const newState = song[cnt + 1];
      if (!newState) {
        return;
      }
      // if (u.length === 0) {
      //   handleStop();
      //   return;
      // }
      setState(newState);
    }
  }

  const handleStop = () => {
    setIsStopped(true);
    setMode('');
    if (mode === 'REC') {
      setMax(globalCounter);
      saveSong(song, globalCounter);
      setSong({});
      setMode('');
    }
  }

  const doPlay = () => setIsStopped(false);

  const handleChangeMode = (newMode: Mode) => {
    setIsStopped(true);

    switch (newMode) {
      case 'EXPLORE':
        setMode('EXPLORE');
        setMax(MAX_LENGTH);
        break;
      case 'LISTEN':
        setMode('LISTEN');
        const [sng, theMax] = loadSong();
        setSong(sng);
        setMax(theMax);
        break;
      case 'REC':
        setMode('REC');
        resetSong();
        setMax(MAX_LENGTH);
        break;
      default:
        return;
    }

    doPlay();
  }

  const saveSong = (s: Song, daMax: number) => {
    localStorage.setItem('song', JSON.stringify([s, daMax]));
  }

  const loadSong = () => {
    const str = localStorage.getItem('song');
    const [loadedSong, theMax] = JSON.parse(str);
    return [loadedSong, theMax];
  }

  const resetSong = () => {
    localStorage.removeItem('song');
  }

  const handlePadUpdate = (rowIndex: number, colIndex: number) => {
    setState(old => ({ ...old, [rowIndex]: colIndex }))
  }

  return <>
    <main>
      <div>
        <Status mode={mode} />

        <MidiPlayer
          melodies={voices}
          isStopped={isStopped}
          tempo={tempo}
          onUpdateCounter={handleUpdateCounter}
        />

        <Pads
          state={state}
          labels={{ 1: 'melody', 2: 'transformation', 3: 'rhythm change', 4: 'density', 5: 'tempo', 6: 'octave' }}
          cols={5}
          patch={patch}
          onUpdate={handlePadUpdate}
        />

        <div style={{ height: '100px' }}></div>

        {isStopped &&
          <ModeButtons
            mode={mode}
            onChangeMode={handleChangeMode}
            onMint={() => onMint(state)}
          />}

        <div>
          {!isStopped && <button
            onClick={handleStop}
            className="button2"
          >STOP</button>}
        </div>
      </div>
    </main>
  </>
}

const Status = ({ mode }: { mode: Mode }) => {
  const getModeText = (m) => {
    switch (m) {
      case 'REC': return 'Recording...';
      case 'LISTEN': return 'Listening to song'
      default: return '';
    }
  }

  return <h1 className="faint">{getModeText(mode)}</h1>
}

type ModeButtonsProps = {
  mode: Mode;
  onChangeMode: (mode: Mode) => void;
  onMint: () => void;
}

const ModeButtons = ({ onChangeMode, mode, onMint }: ModeButtonsProps) => {
  return <div>
    <button onClick={() => onChangeMode('EXPLORE')} className={'button2 ' + (mode === 'EXPLORE' ? 'button2-selected' : '')}>PLAY</button>
    {/* <button onClick={() => onChangeMode('REC')} className={'button2 ' + (mode === 'REC' ? 'button2-selected' : '')}>REC</button>
    <button onClick={() => onChangeMode('LISTEN')} className={'button2 ' + (mode === 'LISTEN' ? 'button2-selected' : '')}>LISTEN</button> */}

    <button onClick={onMint} className={'button2 button2-selected'}>MINT</button>


  </div>
}

export default Atoms;