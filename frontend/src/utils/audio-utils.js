export const playSample = (audioContext, audioBuffer, time, playbackRate = 1, release = 0.3) => {
  const gainNode = new GainNode(audioContext);

  const sampleSource = audioContext.createBufferSource();
  sampleSource.buffer = audioBuffer;
  sampleSource.playbackRate.value = playbackRate;
  sampleSource.connect(gainNode)
  sampleSource.start(time);

  gainNode.gain.cancelScheduledValues(time);
  gainNode.gain.setValueAtTime(0, time);

  gainNode.gain.linearRampToValueAtTime(1, time + 0.01);
  gainNode.gain.linearRampToValueAtTime(0, time + release + 10); // 

  gainNode.connect(audioContext.destination)
}

export const getAudioBufferFromFile = async (audioContext, filepath) => {
  const response = await fetch(filepath);
  const arrayBuffer = await response.arrayBuffer();
  return await audioContext.decodeAudioData(arrayBuffer, function () { return });
}
