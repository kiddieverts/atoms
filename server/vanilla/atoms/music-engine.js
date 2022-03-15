import { generateVoices } from './utils/generateVoices.js';
import { TOTAL_NUMBER_OF_TICKS as TOTAL_NUMBER_OF_BEATS } from './constant.js';
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


  const setupMusic = (audioContext, settings, state, isLooped) => {
    IS_LOOPED = isLooped;
    PATCH = settings.patch;
    SCALE = settings.scale;
    SAMPLE_FILES = settings.sampleFiles;

    updateWholePatch(state);

    return setupInstrumentFn(audioContext, settings.sampleFiles).then(smpls => {
      SAMPLES = smpls;
      LOADED = true;
    });
  }

  const updatePatchRow = (row, col) => {
    const ns = { ...STATE, [row]: col };
    const { voices: vc, tempo: numberOfFrames } = generateVoices(PATCH, SCALE, ns);
    VOICES = vc;
    STATE = ns;
    NUMBER_OF_FRAMES = numberOfFrames;
    return ns;
  }

  const onDraw = (audioContext) => {
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

  const getEmpty = () => ({ currentNotes: [], patch: STATE });

  const updateWholePatch = (ns) => {
    const { voices: vc, tempo: numberOfFrames } = generateVoices(PATCH, SCALE, ns);
    VOICES = vc;
    STATE = ns;
    NUMBER_OF_FRAMES = numberOfFrames;
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
          saveFrames('item', 'png', 1, 1, (data) => {
            console.log('save', data[0].imageData)
          });
          // getAudioContext().suspend();
          return true;
        }
      }

      CNT = 0;
    }
  }

  return { setupMusic, updatePatchRow, onDraw }
}