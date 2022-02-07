import React, { useEffect, useState } from 'react';
import { doUnpack } from '../music/melody-unpacker-two';
import { useInstrument } from '../hooks/useInstrument';

let nextNoteTime = 0.0;
let globalCnt = 0;
let theMelodies = undefined;
let nextStep = {};
let playingCount = {};

const nextNote = (tempo, div) => {
  const interval = 60.0 / tempo / div;
  nextNoteTime += interval;
}

export const Metro = ({ isStopped, audioContext, tempo, divider, melodies }) => {
  const [playFn, samplesReady] = useInstrument(audioContext);
  const [timerId, setTimerId] = useState(undefined);

  useEffect(() => {
    theMelodies = melodies;
    console.log(theMelodies);
  }, [melodies]);

  const scheduler = () => {
    // while there are notes that will need to play before the next interval,
    // schedule them and advance the pointer.

    const scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)
    const lookahead = 25.0; // How frequently to call scheduling function (in milliseconds)

    while (nextNoteTime < audioContext.currentTime + scheduleAheadTime) {
      nextNote(tempo, divider);
      globalCnt = globalCnt + 1;

      for (const melody of theMelodies) {
        onBang(globalCnt, nextNoteTime, melody[0], melody[1], melody[2], playFn);
      }
    }
    setTimerId(window.setTimeout(scheduler, lookahead));// TODO: Cancel timeout on stop
  }

  const handlePlay = () => {
    audioContext.resume();
    scheduler();
  }

  // useEffect(() => {
  //   if (samplesReady === true) {
  //     audioContext.resume();
  //     scheduler();
  //   }
  // }, [samplesReady]);

  useEffect(() => {
    if (isStopped === true) {
      window.clearTimeout(timerId);
    }
  }, [isStopped]); // /

  return <>{
    samplesReady
      ? <></>
      : <h1>Loading...</h1>
  }
    <button onClick={handlePlay}>PLAY</button>
  </>
};

export const onBang = (globalCounter, nextTime, melo, melodyId, transformFn, playFn) => {
  if (!melo) return;

  let m = transformFn(melo, nextStep[melodyId] - 1, playingCount[melodyId]);

  let [pitches, rhythm] = doUnpack(m);

  let next = nextStep[melodyId];

  if (next === undefined) {
    nextStep[melodyId] = 1;
  } else {
    nextStep[melodyId] = (next === rhythm.length - 1)
      ? 0
      : next + 1;

    if (next === rhythm.length - 1) {
      playingCount[melodyId] = !!playingCount[melodyId] ? playingCount[melodyId] + 1 : 1;
    }
  }

  const stepToPlay = rhythm[nextStep[melodyId] - 1];
  const pitchToPlay = pitches[nextStep[melodyId] - 1];



  if (!!stepToPlay && pitchToPlay !== null) {
    const duration = 1;
    playFn(pitchToPlay, nextTime, duration);
  }
}
