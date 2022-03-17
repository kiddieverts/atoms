export const applyToAllVoices = ({ melodies: melo, scale, tempo }, fn) => {
  const melodies = melo.map(me => fn(me, scale));
  return { melodies, scale, tempo }
}