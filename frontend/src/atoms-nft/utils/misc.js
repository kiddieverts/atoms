const getBpm = (x) => 60 / (60 / 3600 * x * 4);
const getMs = (x) => 60 / 3600 * x * 4;

export const getIdFromParam = (loc) => {
  const sr = new URLSearchParams(loc.search);
  const id = sr.get('id') || null;
  return id;
}

export const idToState = (id) => {
  const one = +id[0];
  const two = +id[1];
  const three = +id[2];
  const four = +id[3];
  const five = +id[4];
  const six = +id[5];

  return { 1: one, 2: two, 3: three, 4: four, 5: five, 6: six };
}
