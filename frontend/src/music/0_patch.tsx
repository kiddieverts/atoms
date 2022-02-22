import { doRetrograde, doEightNotesTwoAndSixUpOctave, doUpDiatonicThird, doRetrogradeEveryOther } from './2_melody-transform'
import { calculateVoiceB, calculateVoiceC, calculateVoiceD, calculateVoiceE } from './6_voices';
import { getMelodyA, getMelodyB, getMelodyC, getMelodyD, getMelodyE } from './1_melody-picker';
import { Patch, Scale } from '../types';
import { tempo90, tempo120, tempo150, tempo30, tempo60 } from './4_tempo-changes';
import { transposeDownOneOctave, transposeDownTwoOctaves, transposeUpOneOctave, transposeUpTwoOctaves, transposeZero } from './5_transpose';
import { doNothing } from '../utils/do-nothing';
import { doHalveValue, doEveryEightNoteIsTurnedIntoDottedEightNote, doEveryOtherNoteIsHalved, doNotesAreDoubled } from './3_rhythm-transformations';

export const patch: Patch = {
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
    1: [tempo30, '30 bpm'],
    2: [tempo60, '60 bpm'],
    3: [tempo90, '90 bpm'],
    4: [tempo120, '120 bpm'],
    5: [tempo150, '150 bpm'],
  },
  6: {
    1: [transposeDownTwoOctaves, '-2 octaves'],
    2: [transposeDownOneOctave, '-1 octave'],
    3: [transposeZero, 'Original'],
    4: [transposeUpOneOctave, '+1 octave'],
    5: [transposeUpTwoOctaves, '+2 octave'],
  },

}

export const scale: Scale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
