
export const calculateVoiceB = (m) => generate(m, 2);
export const calculateVoiceC = (m) => generate(m, 3);
export const calculateVoiceD = (m) => generate(m, 4);
export const calculateVoiceE = (m) => generate(m, 5);

const generate = ({ scale, tempo, melodies: melo }, num) => {
  const melodies = generateMelodies(melo, num); // TODO: <--
  return { melodies, scale, tempo };
}

const generateMelodies = (m, numberOfVoices) => {
  const a = [...m[0]];
  const b = generateVoiceB(a);
  const c = generateVoiceC(a);
  const d = generateVoiceD(a);
  const e = generateVoiceE(a);
  const all = [a, b, c, d, e];
  return all.slice(0, numberOfVoices);
}

const generateVoiceB = (melody) =>
  melody
    .map(([pitch, noteLength]) => [!!pitch ? pitch + 12 : null, noteLength + 2])
    .slice(2, 8)
    .reverse();

const generateVoiceC = (melody) =>
  melody
    .map(([pitch, noteLength]) => [pitch - 12, noteLength + 1])
    .slice(5, 12);

const generateVoiceD = (melody) =>
  melody
    .map(note => {
      const [pitch, noteLength] = note;
      const newPitch = ((noteLength === 1 || noteLength === 4)
        ? pitch
        : pitch - 5);

      const newLength = (noteLength === 4 || noteLength === 2)
        ? 1
        : 2;

      const newNote = [newPitch, newLength];
      return newNote;
    })
    .reverse()
    .slice(3, 8);

const generateVoiceE = (melody) =>
  melody
    .map(note => {
      const [pitch, noteLength] = note;
      const newPitch = noteLength === 4
        ? pitch + 12 + 7
        : null;

      const newLength = (noteLength === 4 || noteLength === 2)
        ? noteLength + 1
        : 2;


      const newNote = [newPitch, newLength];
      return newNote;
    })