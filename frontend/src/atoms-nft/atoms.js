'use strict';

import { musicEngine } from './music-engine.js';

const atoms = (settings, initState, showVisuals = true, isLooped = false) => {
  let state = initState;
  let isLoading = true;

  const { playMusic, setupMusic, updatePatchRow, updateWholePatch } = musicEngine();

  const init = (p5func) => { // TODO: <-- Rename ? 
    new p5func(p5 => {
      p5.setup = () => setup(p5);
      p5.draw = () => draw(p5);
      p5.windowResized = () => windowResized(p5);
      p5.mouseClicked = () => mouseClicked(p5);
    });
  }

  const initOnlyMusic = (p5func) => {
    return new Promise((res, rej) => {
      new p5func(p5 => {
        const audioContext = p5.getAudioContext();
        setupMusic(audioContext, settings, state, isLooped)
          .then(() => {
            isLoading = false;

            p5.setup = () => setup(p5);
            p5.draw = () => onlyMusic(p5);
            p5.windowResized = () => windowResized(p5);
            p5.mouseClicked = () => mouseClicked(p5);
            res();
          });
      });
    })
  }

  const setup = (p) => {
    const audioContext = p.getAudioContext();
    audioContext.suspend();
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
      p.saveFrames('item', 'png', 1, 1, (data) => {
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

  const updatePartial = (newState) => updatePatchRow(+newState[0], +newState[1]);

  return { setup, draw, windowResized, mouseClicked, onlyMusic, updatePartial, init, initOnlyMusic, updateWholePatch }
}

export default atoms;