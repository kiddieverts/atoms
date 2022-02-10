import React, { useState, useEffect } from 'react';

import { combineMelodies } from './utils/combineMelodies';
import { generateVoiceB, generateVoiceC, generateVoiceD } from './music/melody-generator';
import { getMelody } from './music/melody-picker';
import { transformAndPack, transpose } from './music/melody-transform';
import MidiPlayer from './components/MidiPlayer';
import Pads from './components/Pads';

const App = () => {
  const audioContext = new AudioContext();
  const [isStopped, setIsStopped] = useState(false);
  const [melodyNumber, setMelodyNumber] = useState(4);
  const [transNum, setTransNum] = useState(0);
  const [oct, setOct] = useState(0);
  const [numberOfVoices, setNumberOfVoices] = useState(1);
  const [voices, setVoices] = useState([]);
  const tempo = 118.0;

  useEffect(() => {
    const voiceA = transpose(oct, transformAndPack(transNum, getMelody(melodyNumber)));
    const voiceB = generateVoiceB(voiceA);
    const voiceC = generateVoiceC(voiceA);
    const voiceD = generateVoiceD(voiceA);

    setVoices(generateMelodies(voiceA, voiceB, voiceC, voiceD));
  }, [melodyNumber, transNum, oct, numberOfVoices]);

  const handleStop = () => setIsStopped(true);

  const generateMelodies = (voiceA, voiceB, voiceC, voiceD) => {
    const all = [voiceA, voiceB, voiceC, voiceD];
    return combineMelodies(all.slice(0, numberOfVoices));
  }

  return <>
    <MidiPlayer
      melodies={voices}
      audioContext={audioContext}
      isStopped={isStopped}
      tempo={tempo}
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

    <button onClick={handleStop}>STOP</button>
  </>
}

export default App;
