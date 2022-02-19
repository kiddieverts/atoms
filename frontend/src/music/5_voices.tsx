import { ColNum, MelodyTransformation, VoiceGenerator } from "../types";
import { Melody, MelodyNote, Pitch, NoteLength } from "../types";

export const doVoiceA = (m: MelodyTransformation): MelodyTransformation => _generate(m, 1);
export const doVoiceB = (m: MelodyTransformation): MelodyTransformation => _generate(m, 2);
export const doVoiceC = (m: MelodyTransformation): MelodyTransformation => _generate(m, 3);
export const doVoiceD = (m: MelodyTransformation): MelodyTransformation => _generate(m, 4);

const _generate = (m: MelodyTransformation, num: ColNum): MelodyTransformation => {
  const { scale, tempo, melodies: melo } = m;
  const melodies = _generateMelodies(melo[0], num);
  return { melodies, scale, tempo };
}

const _generateMelodies = (m: Melody, numberOfVoices: ColNum) => {
  const all = [m, _generateVoiceB(m), _generateVoiceC(m), _generateVoiceD(m)];
  return all.slice(0, numberOfVoices);
}

const _generateVoiceB: VoiceGenerator = (melody) =>
  melody
    .map(([p, r]) => [p + 12, r + 2] as MelodyNote)
    .slice(2, 8)
    .reverse();

const _generateVoiceC: VoiceGenerator = (melody) =>
  melody
    .map(([p, r]) => [p - 12, r + 1] as MelodyNote)
    .slice(5, 12);

const _generateVoiceD: VoiceGenerator = (melody) =>
  melody
    .map(arr => {
      const [p, r] = arr;
      const pp = ((r === 1 || r === 4)
        ? p
        : p - 5 as Pitch);

      const rr: NoteLength = (r === 4 || r === 2)
        ? 1
        : 2;

      const x: MelodyNote = [pp, rr];
      return x;
    })
    .reverse()
    .slice(3, 8);
