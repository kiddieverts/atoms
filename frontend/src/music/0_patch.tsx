import { doRetrograde, doEightNotesTwoAndSixUpOctave, doUpDiatonicThird, doRetrogradeEveryOther } from './2_melody-transform'
import { calculateVoiceB, calculateVoiceC, calculateVoiceD } from './6_voices';
import { getMelodyA, getMelodyB, getMelodyC, getMelodyD, getMelodyE } from './1_melody-picker';
import { Patch, Scale } from '../types';
import { tempo120, tempo180, tempo30, tempo60 } from './4_tempo-changes';
import { transposeDownOneOctave, transposeUpOneOctave, transposeUpTwoOctaves } from './5_transpose';
import { doNothing } from '../utils/do-nothing';

export const patch: Patch = {
  1: {
    1: getMelodyA,
    2: getMelodyB,
    3: getMelodyC,
    4: getMelodyD,
    5: getMelodyE,
  },
  2: {
    1: doRetrograde,
    2: doEightNotesTwoAndSixUpOctave,
    3: doUpDiatonicThird,
    4: doRetrogradeEveryOther,
    5: doNothing,
  },
  3: {
    1: doNothing,
    2: doNothing,
    3: doNothing,
    4: doNothing,
    5: doNothing,
  },
  4: {
    1: transposeDownOneOctave,
    2: doNothing,
    3: transposeUpOneOctave,
    4: transposeUpTwoOctaves,
    5: doNothing,
  },
  5: {
    1: doNothing,
    2: calculateVoiceB,
    3: calculateVoiceC,
    4: calculateVoiceD,
    5: doNothing,
  },
  6: {
    1: tempo30,
    2: tempo60,
    3: tempo120,
    4: tempo180,
    5: doNothing,
  }
}

export const scale: Scale = ['C', 'D', 'E', 'F#', 'G', 'A', 'B'];
