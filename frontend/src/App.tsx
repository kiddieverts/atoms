/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import { combineMelodies } from './utils/combineMelodies';
import { generateVoiceB, generateVoiceC, generateVoiceD } from './music/melody-generator';
// import { getMelody } from './music/melody-picker';
// import { transformAndPack, transpose } from './music/melody-transform';
import MidiPlayer from './components/MidiPlayer';
import Pads from './components/Pads';
// import { makeVoices, patch } from './_';
import { ColNum, Scale } from './types';
import { makeVoices } from './utils/helpers';
import { patch } from './patch';

const MAX_LENGTH = 1000000000;

const App = () => {
  const audioContext = new AudioContext();

  const [melodyNumber, setMelodyNumber] = useState<ColNum>(1);
  const [transNum, setTransNum] = useState<ColNum>(2);
  const [oct, setOct] = useState<ColNum>(3);
  const [numberOfVoices, setNumberOfVoices] = useState<ColNum>(4);
  const [voices, setVoices] = useState([]);

  const [tempoNum, setTempoNum] = useState<ColNum>(2);
  const [max, setMax] = useState(MAX_LENGTH);
  const [isStopped, setIsStopped] = useState(true);
  const [mode, setMode] = useState('');
  const [theCnt, setTheCnt] = useState(0);
  const [theSong, setTheSong] = useState({});
  const [tempo, setTempo] = useState(120.0);

  useEffect(() => {
    // const voiceA = transpose(oct, transformAndPack(transNum, getMelody(melodyNumber)));
    // const voiceB = generateVoiceB(voiceA);
    // const voiceC = generateVoiceC(voiceA);
    // const voiceD = generateVoiceD(voiceA);
    // setVoices(generateMelodies(voiceA, voiceB, voiceC, voiceD));

    const scale: Scale = ['C', 'D', 'E', 'F#', 'G', 'A', 'B'];

    const x = makeVoices(melodyNumber, transNum, oct, numberOfVoices, tempoNum, patch, scale);
    const [voices, sc, t] = x;

    setVoices(combineMelodies(voices));
    setTempo(t);
  }, [melodyNumber, transNum, oct, numberOfVoices, tempoNum]);

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

  // const generateMelodies = (voiceA, voiceB, voiceC, voiceD) => {
  //   const all = [voiceA, voiceB, voiceC, voiceD];
  //   return combineMelodies(all.slice(0, numberOfVoices));
  // }

  useEffect(() => {
    if (mode === 'rec') {
      addStep();
    }
  }, [melodyNumber, transNum, oct, numberOfVoices, tempoNum]);

  const addStep = () => {
    const preset = [melodyNumber, transNum, oct, numberOfVoices, tempoNum];
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
      const [mn, tn, oc, nv, tp] = u;
      setMelodyNumber(mn);
      setTransNum(tn);
      setOct(oc);
      setNumberOfVoices(nv);
      setTempoNum(tp);
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

  // useEffect(() => {
  //   console.log('tempoNum', tempoNum)
  //   setTempo(getTempo(tempoNum));
  // }, [tempoNum]);

  // const getTempo = (t) => {
  //   switch (t) {
  //     case 1:
  //       return 30.0
  //     case 2:
  //       return 90.0
  //     case 3:
  //       return 120.0
  //     case 4:
  //       return 180.0
  //     default:
  //       return;
  //   }
  // }

  return <>
    <main>
      <div>

        <h1 className="faint">{getModeText(mode)}</h1>

        {/* <h3>{tempo} bpm</h3> */}

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
          onChangeTempo={setTempoNum}
          tempoNum={tempoNum}
        />

        <div style={{ height: '100px' }}></div>

        {isStopped &&
          <div>
            <button onClick={() => handleChangeMode('free')} className={'button2 ' + (mode === 'free' ? 'button2-selected' : '')}>EXPLORE</button>
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
