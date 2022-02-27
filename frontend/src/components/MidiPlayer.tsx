import React, { useEffect, useState } from 'react';
import { useInstrument } from '../hooks/useInstrument';
import { TOTAL_NUMBER_OF_TICKS } from '../constant';

let nextTick = 0.0;
let theMelodies = [];
let globalCnt = 0;
let megaGlobalCount = -1;
let interval = 0.0
let timerId = undefined;

const reset = () => {
  globalCnt = 0;
  megaGlobalCount = -1;
  nextTick = 0.0;
}

const MidiPlayer = ({ isStopped, tempo, onUpdateCounter, melodies }) => {
  const [audioContext] = useState(new AudioContext());
  const [playFn, samplesReady] = useInstrument(audioContext);

  useEffect(() => {
    theMelodies = melodies;
    // Reset counter whenever new melodies are received
    // globalCnt = 0;
  }, [melodies]);

  useEffect(() => {
    interval = 60.0 / tempo / 4.0;
  }, [tempo]);

  const scheduler = () => {
    // while there are notes that will need to play before the next interval,
    // schedule them and advance the pointer.

    const scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)
    const lookahead = 75.0; // How frequently to call scheduling function (in milliseconds)

    while (nextTick < audioContext.currentTime + scheduleAheadTime) {
      nextTick += interval;

      onBang(playFn);
      onUpdateCounter(megaGlobalCount);
      globalCnt = globalCnt + 1;
      megaGlobalCount = megaGlobalCount + 1;
    }
    timerId = window.setTimeout(scheduler, lookahead)
  }

  useEffect(() => {
    if (isStopped === true) {
      audioContext.suspend();
      window.clearTimeout(timerId);
      reset();
    } else {
      audioContext.resume();
      scheduler();
    }
  }, [isStopped]);

  return <>{
    samplesReady
      ? <></>
      : <h1>Loading samples...</h1>
  }
  </>
};

const onBang = (playFn) => {
  // Loop
  if (globalCnt >= TOTAL_NUMBER_OF_TICKS) {
    globalCnt = 0;
  }

  const tick = theMelodies[globalCnt];

  for (let [pitch, r] of tick) {
    if (!!r) {
      const duration = 1;
      playFn(pitch, nextTick, duration)
    }
  }
}

export default MidiPlayer;