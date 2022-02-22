import { ColNum, Melodies, MelodyTransformation, VoiceGenerator } from "../types";
import { MelodyNote, Pitch, NoteLength } from "../types";

export const calculateVoiceB = (m: MelodyTransformation): MelodyTransformation => generate(m, 2);
export const calculateVoiceC = (m: MelodyTransformation): MelodyTransformation => generate(m, 3);
export const calculateVoiceD = (m: MelodyTransformation): MelodyTransformation => generate(m, 4);
export const calculateVoiceE = (m: MelodyTransformation): MelodyTransformation => generate(m, 5);

const generate = ({ scale, tempo, melodies: melo }: MelodyTransformation, num: ColNum): MelodyTransformation => {
  const melodies = generateMelodies(melo, num); // TODO: <--
  return { melodies, scale, tempo };
}

const generateMelodies = (m: Melodies, numberOfVoices: ColNum): Melodies => {
  const a = [...m[0]];
  const b = generateVoiceB(a);
  const c = generateVoiceC(a);
  const d = generateVoiceD(a);
  const e = generateVoiceE(a);
  const all: Melodies = [a, b, c, d, e];
  return all.slice(0, numberOfVoices);
}

const generateVoiceB: VoiceGenerator = (melody) =>
  melody
    .map(([pitch, noteLength]) => [!!pitch ? pitch + 12 : null, noteLength + 2] as MelodyNote)
    .slice(2, 8)
    .reverse();

const generateVoiceC: VoiceGenerator = (melody) =>
  melody
    .map(([pitch, noteLength]) => [pitch - 12, noteLength + 1] as MelodyNote)
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

const generateVoiceE: VoiceGenerator = (melody) =>
  melody
    .map(note => {
      const [pitch, noteLength] = note;
      const newPitch = noteLength === 4
        ? pitch + 12 + 7 as Pitch
        : null;

      const newLength: NoteLength = (noteLength === 4 || noteLength === 2)
        ? noteLength + 1 as NoteLength
        : 2 as NoteLength;


      const newNote: MelodyNote = [newPitch, newLength];
      return newNote;
    })