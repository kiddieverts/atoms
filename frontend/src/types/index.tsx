export type NoteLength = 1 | 2 | 4 | 8 | 12;
export type Pitch = null | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100 | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110 | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120 | 121 | 122 | 123 | 124 | 125 | 126 | 127;
export type MelodyNote = readonly [Pitch, NoteLength];
type PitchName = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';
export type Scale = PitchName[];
export type Melody = MelodyNote[];
export type Melodies = Melody[];
export type Tempo = number;
export type MelodyTransformation = { melodies: Melodies; scale: Scale; tempo: Tempo; }
export type TransformationFunction = (m: MelodyTransformation) => MelodyTransformation;
type UnpackedMelody = readonly [Pitch[], NoteLength[]];
export type UnpackingFunction = (packedMelody: Melody) => UnpackedMelody;
export type PackingFunction = (pitches: Pitch[], durations: NoteLength[]) => Melody;
export type VoiceTransformationFunction = (p: Melody, s: Scale) => Melody;
export type ColNum = 1 | 2 | 3 | 4 | 5;
export type VoiceGenerator = (melo: Melody) => Melody;
export type StartFunction = (s: Scale, t: Tempo) => MelodyTransformation;
export type PadStateLabels = {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
}

export type PadState = {
  1: ColNum,
  2: ColNum,
  3: ColNum,
  4: ColNum,
  5: ColNum,
  6: ColNum,
}

export type Patch = {
  1: {
    1: StartFunction;
    2: StartFunction;
    3: StartFunction;
    4: StartFunction;
    5: StartFunction;
  };
  2: {
    1: TransformationFunction;
    2: TransformationFunction;
    3: TransformationFunction;
    4: TransformationFunction;
    5: TransformationFunction;
  };
  3: {
    1: TransformationFunction;
    2: TransformationFunction;
    3: TransformationFunction;
    4: TransformationFunction;
    5: TransformationFunction;
  };
  4: {
    1: TransformationFunction;
    2: TransformationFunction;
    3: TransformationFunction;
    4: TransformationFunction;
    5: TransformationFunction;
  };
  5: {
    1: TransformationFunction;
    2: TransformationFunction;
    3: TransformationFunction;
    4: TransformationFunction;
    5: TransformationFunction;
  },
  6: {
    1: TransformationFunction;
    2: TransformationFunction;
    3: TransformationFunction;
    4: TransformationFunction;
    5: TransformationFunction;
  };
};
