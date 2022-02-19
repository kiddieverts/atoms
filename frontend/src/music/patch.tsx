import { doRetrograde, doEightNotesTwoAndSixUpOctave, doUpDiatonicThird, doRetrogradeEveryOther } from './melody-transform'
import { doVoiceB, doVoiceC, doVoiceD } from './voices';
import { getMelodyA, getMelodyB, getMelodyC, getMelodyD } from './melody-picker';
import { MelodyTransformation, Patch, Scale } from '../types';
import { tempo120, tempo180, tempo30, tempo60 } from './tempo-changes';
import { transposeDownOneOctave, transposeUpOneOctave, transposeUpTwoOctaves } from './transpose';

const doNoting = (m: MelodyTransformation): MelodyTransformation => m;

export const scale: Scale = ['C', 'D', 'E', 'F#', 'G', 'A', 'B'];

export const patch: Patch = {
  1: {
    1: getMelodyA,
    2: getMelodyB,
    3: getMelodyC,
    4: getMelodyD
  },
  2: {
    1: doRetrograde,
    2: doEightNotesTwoAndSixUpOctave,
    3: doUpDiatonicThird,
    4: doRetrogradeEveryOther,
  },
  3: {
    1: transposeDownOneOctave,
    2: doNoting,
    3: transposeUpOneOctave,
    4: transposeUpTwoOctaves
  },
  4: {
    1: doNoting,
    2: doVoiceB,
    3: doVoiceC,
    4: doVoiceD
  },
  5: {
    1: tempo30,
    2: tempo60,
    3: tempo120,
    4: tempo180,
  }
}
