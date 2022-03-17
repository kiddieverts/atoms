'use strict';

import { musicEngine } from './music-engine.js';
import { setupVisuals } from './visuals.js';

const sketch = (settings, initState, showVisuals = true) => {
  let STATE = initState;
  let IS_LOADING = true;

  const { onDraw: playMusic, setupMusic, updatePatchRow } = musicEngine();

  const update = (newState) => {
    updatePatchRow(newState[0], newState[1]);
  }

  const init = (p5func) => {
    new p5func(p5 => {
      p5.setup = () => setup(p5);
      p5.draw = () => draw(p5);
      p5.windowResized = () => windowResized(p5);
      p5.mouseClicked = () => mouseClicked(p5);
    });
  }

  const setup = (p) => {
    // STATE = idToState(getId(window.location));
    const audioContext = p.getAudioContext();
    audioContext.suspend();
    setupMusic(audioContext, settings, STATE, false).then(() => IS_LOADING = false);
    if (showVisuals) {
      setupVisuals(p);
    }
  }

  const windowResized = (p) => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  const draw = (p) => {
    const ctx = p.getAudioContext();
    if (IS_LOADING || p.getAudioContext().state === 'suspended') {
      return;
    }

    const { currentNotes, isStopped, voices } = playMusic(ctx);
    settings.drawFn(p, currentNotes, STATE, p.windowWidth, p.windowHeight, voices);
    if (isStopped) {
      ctx.suspend();
    }
  }

  const onlyMusic = (p) => {
    if (IS_LOADING) return;
    const ctx = p.getAudioContext();
    playMusic(ctx);
  }

  const mouseClicked = (p) => {
    const audioContext = p.getAudioContext();
    audioContext.resume();
    const el = document.getElementById('play-btn');
    if (!!el) {
      el.style.display = 'none';
    }
  }

  return { setup, draw, windowResized, mouseClicked, onlyMusic, update, init }
}

export default sketch;