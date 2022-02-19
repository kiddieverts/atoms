import { ColNum, MelodyTransformation, VoiceGenerator } from "../types";
import { Melody, MelodyNote, Pitch, NoteLength } from "../types";

export const calculateVoiceB = (m: MelodyTransformation): MelodyTransformation => generate(m, 2);
export const calculateVoiceC = (m: MelodyTransformation): MelodyTransformation => generate(m, 3);
export const calculateVoiceD = (m: MelodyTransformation): MelodyTransformation => generate(m, 4);

const generate = ({ scale, tempo, melodies: melo }: MelodyTransformation, num: ColNum): MelodyTransformation => {
  const melodies = generateMelodies(melo[0], num); // TODO: <--
  return { melodies, scale, tempo };
}

const generateMelodies = (m: Melody, numberOfVoices: ColNum) => {
  const all = [m, generateVoiceB(m), generateVoiceC(m), generateVoiceD(m)];
  return all.slice(0, numberOfVoices);
}

const generateVoiceB: VoiceGenerator = (melody) =>
  melody
    .map(([p, r]) => [p + 12, r + 2] as MelodyNote)
    .slice(2, 8)
    .reverse();

const generateVoiceC: VoiceGenerator = (melody) =>
  melody
    .map(([p, r]) => [p - 12, r + 1] as MelodyNote)
    .slice(5, 12);

const generateVoiceD: VoiceGenerator = (melody) =>
  melody
    .map(note => {
      const [pitch, noteLength] = note;
      const newPitch = ((noteLength === 1 || noteLength === 4)
        ? pitch
        : pitch - 5 as Pitch);

      const newLength: NoteLength = (noteLength === 4 || noteLength === 2)
        ? 1
        : 2;

      const newNote: MelodyNote = [newPitch, newLength];
      return newNote;
    })
    .reverse()
    .slice(3, 8);
