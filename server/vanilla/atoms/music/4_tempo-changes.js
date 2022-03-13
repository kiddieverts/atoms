
export const tempo15 = (m) => changeTempo(m, 48); // 15
export const tempo30 = (m) => changeTempo(m, 24); // 30
export const tempo60 = (m) => changeTempo(m, 12); // 60
export const tempo90 = (m) => changeTempo(m, 10); // 90
export const tempo120 = (m) => changeTempo(m, 7); // 120

const changeTempo = ({ melodies, scale }, tempo) => {
  return { melodies, scale, tempo };
}