import React, { useEffect, useState } from 'react';
import { useInstrument } from '../hooks/useInstrument';
import { TOTAL_NUMBER_OF_TICKS } from '../constant';

let nextNoteTime = 0.0;
let globalCnt = 0;
let theMelodies = undefined;

const nextNote = (tempo, div) => {
  const interval = 60.0 / tempo / div;
  nextNoteTime += interval;
}

export const MidiPlayer = ({ isStopped, audioContext, tempo, divider, melodies }) => {
  const [playFn, samplesReady] = useInstrument(audioContext);
  const [timerId, setTimerId] = useState(undefined);

  useEffect(() => {
    theMelodies = melodies;
  }, [melodies]);

  const scheduler = () => {
    // while there are notes that will need to play before the next interval,
    // schedule them and advance the pointer.

    const scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)
    const lookahead = 25.0; // How frequently to call scheduling function (in milliseconds)

    while (nextNoteTime < audioContext.currentTime + scheduleAheadTime) {
      nextNote(tempo, divider);

      onBang(nextNoteTime, theMelodies, playFn);
      globalCnt = globalCnt + 1;
    }
    setTimerId(window.setTimeout(scheduler, lookahead));// TODO: Cancel timeout on stop
  }

  const handlePlay = () => {
    audioContext.resume();
    scheduler();
  }

  useEffect(() => {
    if (isStopped === true) {
      window.clearTimeout(timerId);
    }
  }, [isStopped]);

  return <>{
    samplesReady
      ? <></>
      : <h1>Loading...</h1>
  }
    <button onClick={handlePlay}>PLAY</button>
  </>
};

export const onBang = (nextTime, melo, playFn) => {
  if (globalCnt >= TOTAL_NUMBER_OF_TICKS) {
    globalCnt = 0;
  }

  if (!melo) return;

  const x = melo[globalCnt].filter(r => r[1] === null);
  if (melo[globalCnt].length === x.length) {
    return;
  }

  for (let y of melo[globalCnt]) {
    if (y[1] !== null) {
      const duration = 1;
      playFn(y[0], nextTime, duration)
    }
  }
}
