import React, { useState, useEffect } from 'react';
import { getMelody } from './music/melody-picker';
import { transformAndPack, transpose } from './music/melody-transform';
import { pack, unpack } from './utils/packing';
import { doUnpack } from './music/melody-unpacker-two';
import { MidiPlayer } from './components/MidiPlayer';
import { TOTAL_NUMBER_OF_TICKS } from './constant';

const calculateMelody = (m, melodyId) => {
  let nextStep = {}
  let playingCount = {}
  let timeline = [];

  let [pitches, rhythm] = doUnpack(m);

  for (let counter = 0; counter < TOTAL_NUMBER_OF_TICKS; counter++) {
    let next = nextStep[melodyId];

    const ns = (next === undefined)
      ? 1
      : (next === rhythm.length - 1)
        ? 0
        : next + 1;

    const pc = next === rhythm.length - 1
      ? !!playingCount[melodyId]
        ? playingCount[melodyId] + 1
        : 1
      : playingCount[melodyId];

    nextStep[melodyId] = ns;
    playingCount[melodyId] = pc;

    timeline.push([pitches[ns - 1], rhythm[ns - 1]]);
  }

  return timeline;
}

const comb = (melodies) => {
  const final = [];

  const newArr = calculateMelody(melodies[0], 1);

  for (let j = 0; j < newArr.length; j++) {
    final.push([]);
  }

  for (let i = 0; i < melodies.length; i++) {
    const melody = melodies[i];

    const newArr = calculateMelody(melody, i);
    for (let j = 0; j < newArr.length; j++) {
      const bla = [...final[j], newArr[j]];
      final[j] = bla;
    }
  }

  return final;
}

const App = () => {
  const audioContext = new AudioContext();
  const [isStopped, setIsStopped] = useState(false);

  const [melody, setMelody] = useState(4);
  const [transNum, setTransNum] = useState(0);
  const [finalMelody, setFinalMelody] = useState(undefined);
  const [oct, setOct] = useState(0);
  const [numberOfMel, setNumberOfMel] = useState(1);

  useEffect(() => {
    const finalMel = transpose(oct, transformAndPack(transNum, getMelody(melody)));
    setFinalMelody(finalMel);
  }, [melody, transNum, oct]);

  const divider = 4.0;
  const tempo = 118.0;

  const handleChangeMelody = (val) => setMelody(val);
  const handleStop = () => setIsStopped(true);

  const handleChangeTransformation = (v) => setTransNum(v);

  const transFormFn = (melo, currentStep, timesPlayed) => {
    let [pitches, rhythm] = unpack(melo);

    return pack(pitches, rhythm);
  }

  const finalMelody2 = !!finalMelody ? [...finalMelody].map(m => {
    let [p, r] = m;

    return [p + 12, r + 2]
  }).slice(2, 8).reverse() : undefined;

  const finalMelody3 = !!finalMelody ? [...finalMelody].map(m => {
    let [p, r] = m;

    return [p - 12, r + 1]
  }).slice(5, 12) : undefined;

  const finalMelody4 = !!finalMelody ? [...finalMelody].map(m => {
    let [p, r] = m;

    const rr = (r === 4 || r === 2) ? 1 : 2
    const pp = (r === 1 || r === 4) ? p : p - 5;
    return [pp, rr];
  }).reverse().slice(3, 8) : undefined;

  const getMelodies = () => {
    const arr = [];

    if (numberOfMel === 1) {
      arr.push([finalMelody, 1, transFormFn]);
      return arr;
    } else if (numberOfMel === 2) {
      arr.push([finalMelody, 1, transFormFn]);
      arr.push([finalMelody2, 2, transFormFn]);
      return arr;
    } else if (numberOfMel === 3) {
      arr.push([finalMelody, 1, transFormFn]);
      arr.push([finalMelody2, 2, transFormFn]);
      arr.push([finalMelody3, 3, transFormFn]);
      return arr;
    } else if (numberOfMel === 4) {
      arr.push([finalMelody, 1, transFormFn]);
      arr.push([finalMelody2, 2, transFormFn]);
      arr.push([finalMelody3, 3, transFormFn]);
      arr.push([finalMelody4, 4, transFormFn]);
      return arr;
    }

    return arr;
  }

  const melodies = getMelodies(numberOfMel);

  const handleChangeOct = (v) => setOct(v);

  let com = [];

  if (!!finalMelody && !!finalMelody2 && !!finalMelody3 && !!finalMelody4) {
    com = comb([finalMelody, finalMelody2, finalMelody3, finalMelody4]);
    console.log(com);
  }

  return <>
    <MidiPlayer
      melodies={com}
      audioContext={audioContext}
      isStopped={isStopped}
      tempo={tempo}
      divider={divider}
    />

    <div>
      <button className={melody === 1 ? 'selected' : ''} selected onClick={() => handleChangeMelody(1)}></button>
      <button className={melody === 2 ? 'selected' : ''} onClick={() => handleChangeMelody(2)}></button>
      <button className={melody === 3 ? 'selected' : ''} onClick={() => handleChangeMelody(3)}></button>
      <button className={melody === 4 ? 'selected' : ''} onClick={() => handleChangeMelody(4)}></button>
    </div>

    <div>
      <button className={transNum === 1 ? 'selected' : ''} onClick={() => handleChangeTransformation(1)}></button>
      <button className={transNum === 2 ? 'selected' : ''} onClick={() => handleChangeTransformation(2)}></button>
      <button className={transNum === 3 ? 'selected' : ''} onClick={() => handleChangeTransformation(3)}></button>
      <button className={transNum === 4 ? 'selected' : ''} onClick={() => handleChangeTransformation(4)}></button>
    </div>

    <div>
      <button className={oct === 1 ? 'selected' : ''} onClick={() => handleChangeOct(1)}></button>
      <button className={oct === 2 ? 'selected' : ''} onClick={() => handleChangeOct(2)}></button>
      <button className={oct === 3 ? 'selected' : ''} onClick={() => handleChangeOct(3)}></button>
      <button className={oct === 4 ? 'selected' : ''} onClick={() => handleChangeOct(4)}></button>
    </div>

    <div>
      <button className={numberOfMel === 1 ? 'selected' : ''} onClick={() => setNumberOfMel(1)}></button>
      <button className={numberOfMel === 2 ? 'selected' : ''} onClick={() => setNumberOfMel(2)}></button>
      <button className={numberOfMel === 3 ? 'selected' : ''} onClick={() => setNumberOfMel(3)}></button>
      <button className={numberOfMel === 4 ? 'selected' : ''} onClick={() => setNumberOfMel(4)}></button>
    </div>

    <button onClick={handleStop}>STOP</button>
  </>

}
export default App;
