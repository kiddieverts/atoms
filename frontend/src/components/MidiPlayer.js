import React, { useEffect, useState } from 'react';
import { useInstrument } from '../hooks/useInstrument';
import { TOTAL_NUMBER_OF_TICKS } from '../constant';

let nextTick = 0.0;
let globalCnt = 0;
let theMelodies = [];

const MidiPlayer = ({ isStopped, audioContext, tempo, melodies }) => {
  const [playFn, samplesReady] = useInstrument(audioContext);
  const [timerId, setTimerId] = useState(undefined);

  useEffect(() => {
    theMelodies = melodies;
    // Reset counter whenever a new melody is received
    globalCnt = 0;
  }, [melodies]);

  const scheduler = () => {
    // while there are notes that will need to play before the next interval,
    // schedule them and advance the pointer.

    const scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)
    const lookahead = 25.0; // How frequently to call scheduling function (in milliseconds)

    while (nextTick < audioContext.currentTime + scheduleAheadTime) {
      getNextTick(tempo);

      onBang(nextTick, theMelodies, playFn);
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

const getNextTick = (tempo, div) => {
  const interval = 60.0 / tempo / 4.0;
  nextTick += interval;
}

const onBang = (nextTick, melodies, playFn) => {
  // Loop
  if (globalCnt >= TOTAL_NUMBER_OF_TICKS) {
    globalCnt = 0;
  }

  const tick = melodies[globalCnt];

  for (let [p, r] of tick) {
    if (!!r) {
      const duration = 1;
      playFn(p, nextTick, duration)
    }
  }
}

export default MidiPlayer;