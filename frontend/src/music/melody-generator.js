export const generateVoiceB = (melody) =>
  melody
    .map(([p, r]) => [p + 12, r + 2])
    .slice(2, 8)
    .reverse();

export const generateVoiceC = (melody) =>
  melody
    .map(([p, r]) => [p - 12, r + 1])
    .slice(5, 12);

export const generateVoiceD = (melody) =>
  melody
    .map(([p, r]) => {
      const pp = (r === 1 || r === 4)
        ? p
        : p - 5;

      const rr = (r === 4 || r === 2)
        ? 1
        : 2;

      return [pp, rr];
    })
    .reverse()
    .slice(3, 8);
