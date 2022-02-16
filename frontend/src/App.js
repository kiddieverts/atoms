/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import { combineMelodies } from './utils/combineMelodies';
import { generateVoiceB, generateVoiceC, generateVoiceD } from './music/melody-generator';
import { getMelody } from './music/melody-picker';
import { transformAndPack, transpose } from './music/melody-transform';
import MidiPlayer from './components/MidiPlayer';
import Pads from './components/Pads';

const MAX_LENGTH = 1000000000;

const App = () => {
  const audioContext = new AudioContext();

  const [melodyNumber, setMelodyNumber] = useState(1);
  const [transNum, setTransNum] = useState(1);
  const [oct, setOct] = useState(1);
  const [numberOfVoices, setNumberOfVoices] = useState(1);
  const [voices, setVoices] = useState([]);

  const tempo = 118.0;
  const [max, setMax] = useState(MAX_LENGTH);
  const [isStopped, setIsStopped] = useState(true);
  const [mode, setMode] = useState('');
  const [theCnt, setTheCnt] = useState(0);
  const [theSong, setTheSong] = useState({});

  useEffect(() => {
    const voiceA = transpose(oct, transformAndPack(transNum, getMelody(melodyNumber)));
    const voiceB = generateVoiceB(voiceA);
    const voiceC = generateVoiceC(voiceA);
    const voiceD = generateVoiceD(voiceA);

    setVoices(generateMelodies(voiceA, voiceB, voiceC, voiceD));
  }, [melodyNumber, transNum, oct, numberOfVoices]);

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

  const generateMelodies = (voiceA, voiceB, voiceC, voiceD) => {
    const all = [voiceA, voiceB, voiceC, voiceD];
    return combineMelodies(all.slice(0, numberOfVoices));
  }

  useEffect(() => {
    if (mode === 'rec') {
      addStep();
    }
  }, [melodyNumber, transNum, oct, numberOfVoices]);

  const addStep = () => {
    const preset = [melodyNumber, transNum, oct, numberOfVoices];
    setTheSong(old => ({ ...old, [theCnt]: preset }));
  }

  useEffect(() => {
    if (!isStopped && mode === 'rec' && Object.keys(theSong).length === 0) {
      addStep();
    }
  }, [isStopped]);

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
      if (u.length === 0) {
        handleStop();
        return;
      }
      const [mn, tn, oc, nv] = u;
      setMelodyNumber(mn);
      setTransNum(tn);
      setOct(oc);
      setNumberOfVoices(nv);
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

  const getModeText = (m) => {
    switch (m) {
      case 'free': return ' ';
      case 'rec': return 'Recording...';
      case 'listen': return 'Listening to song'
      default: return '';
    }
  }

  return <>
    <main>
      <div>

        <h1 className="faint">{getModeText(mode)}</h1>

        <MidiPlayer
          melodies={voices}
          audioContext={audioContext}
          isStopped={isStopped}
          tempo={tempo}
          onUpdateCounter={handleUpdateCounter}
        />

        <Pads
          melody={melodyNumber}
          transNum={transNum}
          oct={oct}
          numberOfMel={numberOfVoices}
          onChangeMelody={setMelodyNumber}
          onChangeTransformation={setTransNum}
          onChangeOct={setOct}
          onChangeNumberOfMel={setNumberOfVoices}
        />

        <div style={{ height: '100px' }}></div>

        {isStopped &&
          <div>
            <button onClick={() => handleChangeMode('free')} className={'button2 ' + (mode === 'free' ? 'button2-selected' : '')}>FREE</button>
            <button onClick={() => handleChangeMode('rec')} className={'button2 ' + (mode === 'rec' ? 'button2-selected' : '')}>REC</button>
            <button onClick={() => handleChangeMode('listen')} className={'button2 ' + (mode === 'listen' ? 'button2-selected' : '')}>LISTEN</button>
          </div>}

        <div>
          {!isStopped && <button onClick={handleStop} className="button2">STOP</button>}
        </div>
      </div>
    </main>
  </>
}

export default App;
