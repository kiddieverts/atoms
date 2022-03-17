import { doRetrograde, doEightNotesTwoAndSixUpOctave, doUpDiatonicThird, doRetrogradeEveryOther } from './2_melody-transform.js';
import { calculateVoiceB, calculateVoiceC, calculateVoiceD, calculateVoiceE } from './6_voices.js';
import { getMelodyA, getMelodyB, getMelodyC, getMelodyD, getMelodyE } from './1_melody-picker.js';
import { tempo90, tempo120, tempo30, tempo60, tempo15 } from './4_tempo-changes.js';
import { transposeDownOneOctave, transposeDownTwoOctaves, transposeUpOneOctave, transposeUpTwoOctaves, transposeZero } from './5_transpose.js';
import { doHalveValue, doEveryEightNoteIsTurnedIntoDottedEightNote, doEveryOtherNoteIsHalved, doNotesAreDoubled } from './3_rhythm-transformations.js';

const doNothing = (m) => m;

export const labels = ['melody', 'melody trans', 'pitch trans', 'voices', 'tempo', 'octave'];

export const patch = {
  1: {
    1: [getMelodyA, 'Melody A'],
    2: [getMelodyB, 'Melody B'],
    3: [getMelodyC, 'Melody C'],
    4: [getMelodyD, 'Melody D'],
    5: [getMelodyE, 'Melody E'],
  },
  2: {
    1: [doNothing, 'Original'],
    2: [doRetrograde, 'Retrograde'],
    3: [doEightNotesTwoAndSixUpOctave, 'Eight note 2 and 6 up 1 oct'],
    4: [doUpDiatonicThird, 'Up diatonic third'],
    5: [doRetrogradeEveryOther, 'Retrograde every other'],
  },
  3: {
    1: [doNothing, 'Original'],
    2: [doHalveValue, 'Halve'],
    3: [doEveryOtherNoteIsHalved, 'Every other note is halved'],
    4: [doEveryEightNoteIsTurnedIntoDottedEightNote, 'Eight note becomes dotted eight note.'],
    5: [doNotesAreDoubled, 'Notes are doubled'],
  },
  4: {
    1: [doNothing, '1 voice'],
    2: [calculateVoiceB, '2 voices'],
    3: [calculateVoiceC, '3 voices'],
    4: [calculateVoiceD, '4 voices'],
    5: [calculateVoiceE, '5 voices'],
  },
  5: {
    1: [tempo15, '15 bpm'],
    2: [tempo30, '30 bpm'],
    3: [tempo60, '60 bpm'],
    4: [tempo90, '90 bpm'],
    5: [tempo120, '120 bpm'],
  },
  6: {
    1: [transposeDownTwoOctaves, '-2 octaves'],
    2: [transposeDownOneOctave, '-1 octave'],
    3: [transposeZero, 'Original'],
    4: [transposeUpOneOctave, '+1 octave'],
    5: [transposeUpTwoOctaves, '+2 octave'],
  },
}

export const scale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
