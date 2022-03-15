import { musicEngine } from './music-engine.js';
import { setupVisuals } from './visuals.js';

const sketch = (settings, initState, showVisuals = true) => {
  let STATE = initState;
  let IS_LOADING = true;

  const { onDraw: playMusic, setupMusic, updatePatchRow } = musicEngine();

  const update = (newState) => {
    updatePatchRow(newState[0], newState[1]);
  }

  const setup = () => {
    // STATE = idToState(getId(window.location));
    const audioContext = getAudioContext();
    audioContext.suspend();
    setupMusic(audioContext, settings, STATE, false).then(() => IS_LOADING = false);
    if (showVisuals) {
      setupVisuals();
    }
  }

  const windowResized = () => {
    resizeCanvas(windowWidth, windowHeight);
  };

  const draw = () => {
    if (IS_LOADING || getAudioContext().state === 'suspended') {
      return;
    }

    const { currentNotes, isStopped, voices } = playMusic(getAudioContext());
    settings.drawFn(currentNotes, STATE, windowWidth, windowHeight, voices);
    if (isStopped) {
      getAudioContext().suspend();
    }
  }

  const onlyMusic = () => {
    if (IS_LOADING) return;
    playMusic(getAudioContext());
  }

  const mouseClicked = () => {
    const audioContext = getAudioContext();
    audioContext.resume();
    const el = document.getElementById('play-btn');
    if (!!el) {
      el.style.display = 'none';
    }
  }

  return { setup, draw, windowResized, mouseClicked, onlyMusic, update }
}

export default sketch;