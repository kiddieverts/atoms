// let i = 0;
// let beat = 0;
// let voices = undefined;
// let lastNote = 0;
// let samples = undefined;
// let loaded = false;
// let tmp = -1;
// let state = { 1: 1, 2: 1, 3: 1, 4: 3, 5: 5, 6: 3 };
// let NUMBER_OF_FRAMES = 10; // 90 bpm
// let mint = true;

// const TOTAL_NUMBER_OF_BEATS = 32 * 8; // 64 * 4 * 32; // 32 bars

export const setupVisuals = () => {
  // const { voices: vc } = window.generateVoices(1, 3, 1, 3, 3, 2);
  // voices = vc;

  // const { id: idd, mint: mnt } = getParams();
  // mint = mnt;

  // if (!!idd && idd.length === 6) {
  //   st = idToState(idd);
  //   updateAllState(st);
  // }

  // const ctx = getAudioContext();
  // ctx.suspend();


  // if (mint) {
  //   const pads = document.getElementById('pads');
  //   pads.style.display = 'flex';
  // }

  const cv = createCanvas(windowWidth, windowHeight);
  background(0);
  cv.position(0, 0);

  // if (mint) {
  //   cv.elt.style.display = 'none';
  // }

  // document.addEventListener('keyup', (e) => {
  //   if (e.code === "ArrowUp") {
  //     cv.style('display', 'none')
  //   }
  //   if (e.code === "ArrowDown") {
  //     cv.style('display', 'flex')
  //   }
  // });

  // window.setupInstrument(ctx).then(smpls => {
  //   samples = smpls;
  //   loaded = true;
  // });

  // const x = document.getElementsByClassName("tile");

  // Object.keys(x).forEach(key => {
  //   x[key].addEventListener('click', () => {
  //     const theId = x[key].id;
  //     updateState(theId);
  //     updateCss(theId);
  //   });
  // });

  // const btn = document.getElementById('btn');
  // const pads = document.getElementById('pads');

  // btn.addEventListener('click', () => {
  //   if (pads.style.display === 'flex') {
  //     pads.style.display = 'none';
  //   } else {
  //     pads.style.display = 'flex';
  //   }
  // });

  // const mintBtn = document.getElementById('mint');

  // mintBtn.addEventListener('click', () => {
  //   let str = '';
  //   Object.keys(state).forEach(key => str = str + state[key])
  //   window.location = 'https://atooooms.web.app?id=' + str;
  // })
}

// function draw() {
//   // if (!loaded) {
//   //   return;
//   // }

//   // const audioContext = getAudioContext();
//   // if (audioContext.state === 'running') {
//   //   const currentNotes = voices[beat];

//   //   if (beat !== tmp) {
//   //     tmp = beat;
//   //     playNow(audioContext, currentNotes);
//   //   }

//   // window.doDraw(NUMBER_OF_FRAMES, i, tmp, currentNotes, state, windowWidth, windowHeight);

//   // increase();
//   // }
// }

// const updateCss = (id) => {
//   const row = id[0];
//   const col = id[1];
//   for (let j = 0; j < 5; j++) {
//     const cl = +j + 1;
//     const k = row + '' + cl;
//     const el = document.getElementById(k);
//     el.classList.remove("selected");
//   }

//   const el = document.getElementById(id);
//   el.classList.add("selected");
// }

// const playNow = (audioContext, currentNotes) => {
//   currentNotes.forEach(currentNote => {
//     const [pitch, noteLength] = currentNote;

//     const dur = 0.3;
//     if (!!pitch) {
//       const t = audioContext.currentTime;
//       window.playFn(audioContext, samples, pitch, t, dur);
//     }
//   });
// }

// function mousePressed() {
//   if (getAudioContext().state === 'running') {
//     // getAudioContext().suspend();
//   } else {
//     userStartAudio();
//   }
// }

// const increase = () => {
//   if (i < NUMBER_OF_FRAMES) {
//     i = i + 1;
//   } else {
//     if (beat < TOTAL_NUMBER_OF_BEATS - 1) {
//       beat = beat + 1;
//     }
//     else {
//       if (!mint) {
//         getAudioContext().suspend();
//         // saveFrames('item', 'png', 1, 1);
//       } else {
//         beat = 0;
//       }
//     }

//     i = 0;
//   }
// }

// const updateState = (num) => {
//   const row = num[0];
//   const col = +num[1];

//   const ns = { ...state, [row]: col };

//   const { voices: vc, tempo: numberOfFrames } = window.generateVoices(ns['1'], ns['2'], ns['3'], ns['4'], ns['5'], ns['6']);

//   voices = vc;
//   state = ns;
//   NUMBER_OF_FRAMES = numberOfFrames;
// }

// const updateAllState = (ns) => {
//   const { voices: vc, tempo: numberOfFrames } = window.generateVoices(ns['1'], ns['2'], ns['3'], ns['4'], ns['5'], ns['6']);

//   voices = vc;
//   state = ns;
//   NUMBER_OF_FRAMES = numberOfFrames;
// }