import { Melody, MelodyNote, Pitch, NoteLength } from "../types";

export type VoiceGenerator = (melo: Melody) => Melody;

export const generateVoiceB: VoiceGenerator = (melody) =>
  melody
    .map(([p, r]) => [p + 12, r + 2] as MelodyNote)
    .slice(2, 8)
    .reverse();

export const generateVoiceC: VoiceGenerator = (melody) =>
  melody
    .map(([p, r]) => [p - 12, r + 1] as MelodyNote)
    .slice(5, 12);

export const generateVoiceD: VoiceGenerator = (melody) =>
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
