export const playSample = (audioContext, audioBuffer, time, playbackRate = 1, release = 0.3) => {
  const gainNode = new GainNode(audioContext);

  const channels = 2;
  // Create an empty two second stereo buffer at the
  // sample rate of the AudioContext
  const frameCount = audioContext.sampleRate * 1.0;

  const sampleSource = audioContext.createBufferSource(channels, frameCount, audioContext.sampleRate);
  sampleSource.buffer = audioBuffer;
  sampleSource.playbackRate.value = playbackRate;
  sampleSource.connect(gainNode)
  sampleSource.start(time);

  // gainNode.gain.cancelScheduledValues(time);
  gainNode.gain.setValueAtTime(0, time);

  gainNode.gain.linearRampToValueAtTime(1, time + 0.01);
  gainNode.gain.linearRampToValueAtTime(0, time + release + 10); // TODO: <--

  gainNode.connect(audioContext.destination)
}

export const getAudioBufferFromFile = async (audioContext, filepath) => {
  const response = await fetch(filepath);
  const arrayBuffer = await response.arrayBuffer();
  return await audioContext.decodeAudioData(arrayBuffer, function () { return });
}
