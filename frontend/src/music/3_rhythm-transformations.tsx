import { Melody, NoteLength, TransformationFunction, VoiceTransformationFunction } from '../types';
import { applyToAllVoices } from '../utils/helpers';

const halveValue: VoiceTransformationFunction = (m) => {
  const final = [];

  m.forEach(([pitch, noteLength]) => {
    const [len, repeates] = getHalvedLength(noteLength);
    for (let i = 0; i < repeates; i++) {
      final.push([pitch, len]);
    }
  });

  return final;
}

const everyOtherNoteIsHalved: VoiceTransformationFunction = (m) => {
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

const everyEightNoteIsTurnedIntoDottedEightNote: VoiceTransformationFunction = (melody) => {
  const result: Melody = melody
    .map(([pitch, noteLength]) => {
      const newNoteLength: NoteLength = (noteLength === 4)
        ? 6
        : noteLength;

      return [pitch, newNoteLength];
    });

  return result;
}

const notesAreDoubled: VoiceTransformationFunction = (melody) => {
  const result: Melody = melody
    .map(([pitch, noteLength]) => {
      const newNoteLength = noteLength * 2 as NoteLength;

      return [pitch, newNoteLength];
    });

  return result;
}

type NoteLengthAndRepeats = [NoteLength, number];

const getHalvedLength = (nl: NoteLength): NoteLengthAndRepeats => {
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
    default: throw new Error('');
  }
}

export const doHalveValue: TransformationFunction = (m) => applyToAllVoices(m, halveValue);
export const doEveryOtherNoteIsHalved: TransformationFunction = (m) => applyToAllVoices(m, everyOtherNoteIsHalved);
export const doEveryEightNoteIsTurnedIntoDottedEightNote: TransformationFunction = (m) => applyToAllVoices(m, everyEightNoteIsTurnedIntoDottedEightNote);
export const doNotesAreDoubled: TransformationFunction = (m) => applyToAllVoices(m, notesAreDoubled);
