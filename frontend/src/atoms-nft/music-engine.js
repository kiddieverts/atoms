import { generateVoices } from './utils/generateVoices.js';
import { play as playFn, setupInstrument as setupInstrumentFn } from './instrument.js';

export const musicEngine = () => {
  let CNT = 0;
  let BEAT = 0;
  let VOICES = undefined;
  let SAMPLES = undefined;
  let LOADED = false;
  let TMP = -1;
  let STATE = { 1: 1, 2: 1, 3: 1, 4: 3, 5: 5, 6: 3 };
  let IS_LOOPED = true;
  let NUMBER_OF_FRAMES = 10; // 90 bpm
  let PATCH = undefined;
  let SCALE = undefined;
  let SAMPLE_FILES = undefined;
  let TOTAL_NUMBER_OF_BEATS = undefined;
  let TEMP_STATE = undefined;

  const restart = () => {
    CNT = 0;
    BEAT = 0;
    TMP = -1;
  }

  const setIsLooped = (isLooped) => {
    IS_LOOPED = isLooped;
  }

  const setupMusic = (audioContext, settings, state, isLooped) => {
    IS_LOOPED = isLooped;
    PATCH = settings.patch;
    SCALE = settings.scale;
    SAMPLE_FILES = settings.sampleFiles;
    TOTAL_NUMBER_OF_BEATS = settings.totalNumberOfBeats;

    return setupInstrumentFn(audioContext, settings.sampleFiles).then(smpls => {
      SAMPLES = smpls;
      LOADED = true;
      if (!!TEMP_STATE) {
        updateState(TEMP_STATE);
      }
    });
  }

  const updateState = (ns) => {
    if (!LOADED) {
      TEMP_STATE = ns;
    }
    else {
      TEMP_STATE = undefined;
      const { voices: vc, tempo: numberOfFrames } = generateVoices(PATCH, SCALE, ns, TOTAL_NUMBER_OF_BEATS);
      VOICES = vc;
      STATE = ns;
      NUMBER_OF_FRAMES = numberOfFrames;
    }
  }

  const playMusic = (audioContext) => {
    const getEmpty = () => ({ currentNotes: [], patch: STATE });

    if (!LOADED) {
      return getEmpty();
    }

    if (audioContext.state === 'running') {
      const currentNotes = VOICES[BEAT];

      if (BEAT !== TMP) {
        TMP = BEAT;
        playNow(audioContext, currentNotes, SAMPLE_FILES);
      }

      const isStopped = increase();
      return { currentNotes, patch: STATE, isStopped, voices: VOICES }
    }

    return getEmpty();
  }

  const playNow = (audioContext, currentNotes, sampleFiles) => {
    currentNotes.forEach(currentNote => {
      const [pitch, noteLength] = currentNote;
      const dur = 0.3;

      if (!!pitch) {
        const t = audioContext.currentTime;
        playFn(audioContext, SAMPLES, pitch, t, dur, sampleFiles);
      }
    });
  }

  const increase = () => {
    if (CNT < NUMBER_OF_FRAMES) {
      CNT = CNT + 1;
    } else {
      if (BEAT < TOTAL_NUMBER_OF_BEATS - 1) {
        BEAT = BEAT + 1;
      }
      else {
        if (IS_LOOPED) {
          BEAT = 0;
          return false;
        } else {
          // getAudioContext().suspend();
          return true;
        }
      }

      CNT = 0;
    }
  }

  return { setupMusic, playMusic, updateState, setIsLooped, restart }
}