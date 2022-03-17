'use strict';

import { musicEngine } from './music-engine.js';

const atoms = (settings, initState, showVisuals = true) => {
  let state = initState;
  let isLoading = true;

  const { playMusic, setupMusic, updatePatchRow } = musicEngine();

  const init = (p5func) => { // TODOL: <--
    new p5func(p5 => {
      p5.setup = () => setup(p5);
      p5.draw = () => draw(p5);
      p5.windowResized = () => windowResized(p5);
      p5.mouseClicked = () => mouseClicked(p5);
    });
  }

  const setup = (p) => {
    const audioContext = p.getAudioContext();
    audioContext.suspend();
    setupMusic(audioContext, settings, state, false).then(() => isLoading = false);
    if (showVisuals) {
      setupVisuals(p);
    }
  }

  const draw = (p) => {
    const ctx = p.getAudioContext();
    if (isLoading || p.getAudioContext().state === 'suspended') {
      return;
    }

    const { currentNotes, isStopped, voices } = playMusic(ctx);
    settings.drawFn(p, currentNotes, state, p.windowWidth, p.windowHeight, voices);
    if (isStopped) {
      saveFrames('item', 'png', 1, 1, (data) => {
        console.log('save', data[0].imageData)
      });
      ctx.suspend();
    }
  }

  const windowResized = (p) => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  const onlyMusic = (p) => {
    if (isLoading) return;
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

  const setupVisuals = (p) => {
    const cv = p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(0);
    cv.position(0, 0);
  }

  const update = (newState) => updatePatchRow(newState[0], newState[1]);

  return { setup, draw, windowResized, mouseClicked, onlyMusic, update, init }
}

export default atoms;