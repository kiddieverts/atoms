/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import { Melodies, PadState } from './types';
import { combineMelodies } from './utils/combineMelodies';
import { patch, scale } from './music/0_patch';
import { runPatch } from './utils/helpers';
import MidiPlayer from './components/MidiPlayer';
import Pads from './components/Pads';

const MAX_LENGTH = 1000000000;
const DEFAULT_STATE: PadState = {
  1: 1,
  2: 1,
  3: 1,
  4: 1,
  5: 1
}
const DEFAULT_TEMPO = 120.0;

type Song = { [key: string]: PadState }
type Mode = 'free' | 'rec' | 'listen' | '';

const App = () => {
  const audioContext = new AudioContext();
  const [voices, setVoices] = useState<Melodies>([]);
  const [max, setMax] = useState(MAX_LENGTH);
  const [isStopped, setIsStopped] = useState(true);
  const [mode, setMode] = useState<Mode>('');
  const [theCnt, setTheCnt] = useState(0);
  const [theSong, setTheSong] = useState<Song>({});
  const [tempo, setTempo] = useState(DEFAULT_TEMPO);
  const [state, setState] = useState<PadState>(DEFAULT_STATE);

  const stateToObj = (s: PadState) => {
    return {
      melodyNumber: s[1],
      transNum: s[2],
      oct: s[3],
      numberOfVoices: s[4],
      tempoNum: s[5]
    }
  }

  useEffect(() => {
    const { melodyNumber, transNum, oct, numberOfVoices, tempoNum } = stateToObj(state);
    const result = runPatch(melodyNumber, transNum, oct, numberOfVoices, tempoNum, patch, scale);
    const { melodies, tempo: t } = result;

    setVoices(combineMelodies(melodies));
    setTempo(t);

    if (mode === 'rec') {
      addStep();
    }
  }, [state]);

  useEffect(() => {
    if (!isStopped && mode === 'rec' && Object.keys(theSong).length === 0) {
      addStep();
    }
  }, [isStopped]);

  const addStep = () => {
    setTheSong(old => ({ ...old, [theCnt]: state }));
  }

  const handleUpdateCounter = (cnt) => {
    if (cnt > max) {
      handleStop();
      throw new Error(''); // Forces playback to stop. TODO: Find a better solution
    }
    setTheCnt(cnt);

    if (mode === 'listen') {
      const u = theSong[cnt + 1];
      if (!u) {
        return;
      }
      // if (u.length === 0) {
      //   handleStop();
      //   return;
      // }
      setState(u);
    }
  }

  const handleStop = () => {
    setIsStopped(true);
    setMode('');
    if (mode === 'rec') {
      const s = theSong;
      setMax(theCnt);
      saveSong(s, theCnt);
      setTheSong({});
      setMode('');
    }
  }

  const doPlay = () => setIsStopped(false);

  const handleChangeMode = (newMode) => {
    setIsStopped(true);

    switch (newMode) {
      case 'free':
        setMode('free');
        setMax(MAX_LENGTH);
        break;
      case 'listen':
        setMode('listen');
        const [daSong, theMax] = loadSong();
        setTheSong(daSong);
        setMax(theMax);
        break;
      case 'rec':
        setMode('rec');
        resetSong();
        setMax(MAX_LENGTH);
        break;
      default:
        return;
    }

    doPlay();
  }

  const saveSong = (s, daMax) => {
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
          audioContext={audioContext}
          isStopped={isStopped}
          tempo={tempo}
          onUpdateCounter={handleUpdateCounter}
        />

        <Pads
          state={state}
          labels={{ 1: 'melody', 2: 'transformation', 3: 'octave', 4: 'density', 5: 'tempo' }}
          cols={4}
          onUpdate={handlePadUpdate}
        />

        <div style={{ height: '100px' }}></div>

        {isStopped &&
          <ModeButtons mode={mode} handleChangeMode={handleChangeMode} />}

        <div>
          {!isStopped && <button onClick={handleStop} className="button2">STOP</button>}
        </div>
      </div>
    </main>
  </>
}

const Status = ({ mode }) => {
  const getModeText = (m) => {
    switch (m) {
      case 'rec': return 'Recording...';
      case 'listen': return 'Listening to song'
      default: return '';
    }
  }

  return <h1 className="faint">{getModeText(mode)}</h1>
}

const ModeButtons = ({ handleChangeMode, mode }) => {
  return <div>
    <button onClick={() => handleChangeMode('free')} className={'button2 ' + (mode === 'free' ? 'button2-selected' : '')}>EXPLORE</button>
    <button onClick={() => handleChangeMode('rec')} className={'button2 ' + (mode === 'rec' ? 'button2-selected' : '')}>REC</button>
    <button onClick={() => handleChangeMode('listen')} className={'button2 ' + (mode === 'listen' ? 'button2-selected' : '')}>LISTEN</button>
  </div>
}

export default App;
