import { doRetrograde, doEightNotesTwoAndSixUpOctave, doUpDiatonicThird, doRetrogradeEveryOther } from './music/melody-transform'
import { doVoiceA, doVoiceB, doVoiceC, doVoiceD } from './music/voices';
import { getMelody1, getMelody2, getMelody3, getMelody4 } from './music/melody-picker';
import { Patch } from './types';
import { tempo120, tempo180, tempo30, tempo60 } from './music/tempo-changes';
import { transposeDownOneOctave, transposeNone, transposeUpOneOctave, transposeUpTwoOctaves } from './music/transpose';

export const patch: Patch = {
  1: {
    1: getMelody1,
    2: getMelody2,
    3: getMelody3,
    4: getMelody4
  },
  2: {
    1: doRetrograde,
    2: doEightNotesTwoAndSixUpOctave,
    3: doUpDiatonicThird,
    4: doRetrogradeEveryOther,
  },
  3: {
    1: transposeDownOneOctave,
    2: transposeNone,
    3: transposeUpOneOctave,
    4: transposeUpTwoOctaves
  },
  4: {
    1: doVoiceA,
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
