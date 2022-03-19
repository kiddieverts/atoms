import { musicEngine } from './music-engine.js';

const atoms = (config) => {
  const { settings, state, isLooped = false, onReady = () => { } } = config;
  let isLoading = true;
  let showVisuals = config.showVisuals || true;
  let canvas = config.canvas || undefined;

  const { setupMusic, playMusic, updateState, setIsLooped, restart: restartMusic } = musicEngine();

  let p5instance = undefined;

  const init = (p5func) => {
    p5instance = new p5func(p5 => {
      p5.setup = () => setup(p5);
      p5.draw = () => draw(p5);
      p5.windowResized = () => windowResized(p5);
      p5.mouseClicked = () => mouseClicked(p5);
    });
  }

  const setup = (p) => {
    const audioContext = p.getAudioContext();
    audioContext.suspend();
    setupMusic(audioContext, settings, state, isLooped)
      .then(() => {
        isLoading = false;
        onReady(true);
      });

    if (showVisuals) {
      setupVisuals(p, canvas);
    }
  }

  const setupVisuals = (p, frame) => {
    const w = !!frame && frame.w ? frame.w : p.windowWidth;
    const h = !!frame && frame.h ? frame.h : p.windowHeight;
    const x = !!frame && frame.x ? frame.x : 0;
    const y = !!frame && frame.y ? frame.y : 0;
    const cv = p.createCanvas(w, h);
    p.background(100);
    cv.position(x, y);
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

  const update = (newState) => updateState(newState);

  const restart = () => {
    const config = {
      isLooped,
      showVisuals,
      canvas
    }

    const ctx = p5instance.getAudioContext();
    ctx.suspend();
    restartMusic();

    setNewConfig(config);
  }

  const toggleVisuals = () => {
    const config = {
      isLooped,
      showVisuals: !showVisuals,
      canvas
    }
    setNewConfig(config);
  }

  const setNewConfig = (config) => {
    isLoading = true;

    setIsLooped(config.isLooped);
    const ctx = p5instance.getAudioContext();
    ctx.suspend();

    showVisuals = config.showVisuals;
    canvas = config.canvas;

    p5instance.clear();
    if (showVisuals) {
      setupVisuals(p5instance, canvas);
    }
    isLoading = false;
    ctx.resume();
  }

  return { init, update, restart, setNewConfig, toggleVisuals }
}

export default atoms;