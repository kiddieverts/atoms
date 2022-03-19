'use strict';

import { musicEngine } from './music-engine.js';

const atoms = (settings, initState, showVisuals = true, isLooped = false, onReadyCallback, frame) => {
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
    init(p5func);
  }

  const setup = (p) => {
    console.log('P5 Setup')
    const audioContext = p.getAudioContext();
    audioContext.suspend();
    setupMusic(audioContext, settings, state, isLooped)
      .then(() => {
        isLoading = false;
        onReadyCallback(true);
      });

    if (showVisuals) {
      console.log('setupvis')
      setupVisuals(p, frame);
    }
  }

  const draw = (p) => {
    const ctx = p.getAudioContext();
    if (isLoading || p.getAudioContext().state === 'suspended') {
      return;
    }

    const { currentNotes, isStopped, voices } = playMusic(ctx);
    if (showVisuals) {
      settings.drawFn(p, currentNotes, state, p.windowWidth, p.windowHeight, voices);
      if (isStopped) {
        p.saveFrames('item', 'png', 1, 1, (data) => {
          console.log('save', data[0].imageData)
        });
        ctx.suspend();
      }
    }
  }

  const windowResized = (p) => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  const mouseClicked = (p) => {
    const audioContext = p.getAudioContext();
    audioContext.resume();
    const el = document.getElementById('play-btn');
    if (!!el) {
      el.style.display = 'none';
    }
  }

  const setupVisuals = (p, frame) => {
    const w = !!frame && frame.w ? frame.w : p.windowWidth;
    const h = !!frame && frame.h ? frame.h : p.windowHeight;
    const x = !!frame && frame.x ? frame.x : 0;
    const y = !!frame && frame.y ? frame.y : 0;
    const cv = p.createCanvas(w, h);
    p.background(255);
    cv.position(x, y);
  }

  const updatePartial = (newState) => updatePatchRow(+newState[0], +newState[1]);

  return { setup, draw, windowResized, mouseClicked, updatePartial, init, initOnlyMusic, updateWholePatch }
}

export default atoms;