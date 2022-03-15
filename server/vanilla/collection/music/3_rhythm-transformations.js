import { applyToAllVoices } from '../../../lib/utils/applyToAllVoices.js';

const halveValue = (m) => {
  const final = [];

  m.forEach(([pitch, noteLength]) => {
    const [len, repeates] = getHalvedLength(noteLength);
    for (let i = 0; i < repeates; i++) {
      final.push([pitch, len]);
    }
  });

  return final;
}

const everyOtherNoteIsHalved = (m) => {
  const final = [];

  let shouldHalve = false;

  m.forEach(([pitch, noteLength]) => {
    if (shouldHalve === true) {
      const [len, repeates] = getHalvedLength(noteLength);
      for (let i = 0; i < repeates; i++) {
        final.push([pitch, len]);
      }
    }
    else {
      final.push([pitch, noteLength]);
    }
    shouldHalve = !shouldHalve;
  });

  return final;
}

const everyEightNoteIsTurnedIntoDottedEightNote = (melody) => {
  const result = melody
    .map(([pitch, noteLength]) => {
      const newNoteLength = (noteLength === 4)
        ? 6
        : noteLength;

      return [pitch, newNoteLength];
    });

  return result;
}

const notesAreDoubled = (melody) => {
  const result = melody
    .map(([pitch, noteLength]) => {
      const newNoteLength = noteLength * 2;

      return [pitch, newNoteLength];
    });

  return result;
}

const getHalvedLength = (nl) => {
  switch (nl) {
    case 1: return [1, 1];
    case 2: return [1, 2];
    case 3: return [1, 3];
    case 4: return [2, 2];
    case 5: return [1, 5];
    case 6: return [3, 2];
    case 8: return [4, 2];
    case 10: return [5, 2];
    case 12: return [6, 2];
    case 16: return [8, 2];
    default: throw new Error('');
  }
}

export const doHalveValue = (m) => applyToAllVoices(m, halveValue);
export const doEveryOtherNoteIsHalved = (m) => applyToAllVoices(m, everyOtherNoteIsHalved);
export const doEveryEightNoteIsTurnedIntoDottedEightNote = (m) => applyToAllVoices(m, everyEightNoteIsTurnedIntoDottedEightNote);
export const doNotesAreDoubled = (m) => applyToAllVoices(m, notesAreDoubled);
