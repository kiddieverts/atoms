import React, { useEffect, useState } from 'react';
import { useInstrument } from '../hooks/useInstrument';
import { TOTAL_NUMBER_OF_TICKS } from '../constant';

let nextTick = 0.0;
let theMelodies = [];
let globalCnt = 0;
let megaGlobalCount = -1;
let globalTempo = 120.0;

const reset = () => {
  globalCnt = 0;
  megaGlobalCount = -1;
  nextTick = 0.0;
}

const MidiPlayer = ({ isStopped, audioContext, tempo, onUpdateCounter, melodies }) => {
  const [playFn, samplesReady] = useInstrument(audioContext);
  const [timerId, setTimerId] = useState(undefined);

  useEffect(() => {
    theMelodies = melodies;
    // Reset counter whenever a new melody is received
    // globalCnt = 0;
  }, [melodies]);

  useEffect(() => {
    globalTempo = tempo;
  }, [tempo]);

  const scheduler = () => {
    // while there are notes that will need to play before the next interval,
    // schedule them and advance the pointer.

    const scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)
    const lookahead = 75.0; // How frequently to call scheduling function (in milliseconds)

    while (nextTick < audioContext.currentTime + scheduleAheadTime) {
      getNextTick(globalTempo);

      onBang(nextTick, theMelodies, playFn);
      onUpdateCounter(megaGlobalCount);
      globalCnt = globalCnt + 1;
      megaGlobalCount = megaGlobalCount + 1;
    }
    setTimerId(window.setTimeout(scheduler, lookahead));// TODO: Cancel timeout on stop
  }

  useEffect(() => {
    if (isStopped === true) {
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

const getNextTick = (tempo) => {
  const interval = 60.0 / tempo / 4.0;
  nextTick += interval;
}

const onBang = (nextTick, melodies, playFn) => {
  // Loop
  if (globalCnt >= TOTAL_NUMBER_OF_TICKS) {
    globalCnt = 0;
  }

  console.log('MEEE', melodies, globalCnt)

  const tick = melodies[globalCnt];

  for (let [p, r] of tick) {
    if (!!r) {
      const duration = 1;
      playFn(p, nextTick, duration)
    }
  }
}

export default MidiPlayer;