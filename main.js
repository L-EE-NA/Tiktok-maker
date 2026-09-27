import * as THREE from "three";

const stage = document.querySelector("#stage");

stage.style.position = "relative";
stage.style.overflow = "hidden";


/* =========================================================
   SCENE
   ========================================================= */

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x050607);

scene.fog = new THREE.FogExp2(
  0x050607,
  0.017
);


/* =========================================================
   CAMERA
   ========================================================= */

const camera = new THREE.PerspectiveCamera(
  58,
  stage.clientWidth / stage.clientHeight,
  0.1,
  260
);

camera.position.set(
  0,
  2.05,
  16
);


/* =========================================================
   RENDERER
   ========================================================= */

const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setPixelRatio(
  Math.min(
    window.devicePixelRatio,
    1.6
  )
);

renderer.setSize(
  stage.clientWidth,
  stage.clientHeight,
  false
);

renderer.outputColorSpace =
  THREE.SRGBColorSpace;

renderer.toneMapping =
  THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure =
  0.95;

stage.appendChild(
  renderer.domElement
);


/* =========================================================
   OVERLAYS
   ========================================================= */

const ui =
  document.createElement("div");

ui.style.cssText =
  `
  position:absolute;
  inset:0;
  pointer-events:none;
  font-family:Arial,sans-serif;
  `;

stage.appendChild(ui);


/* BLACK FADE */

const fade =
  document.createElement("div");

fade.style.cssText =
  `
  position:absolute;
  inset:0;
  background:#000;
  opacity:1;
  z-index:20;
  `;

ui.appendChild(fade);


/* TITLE */

const title =
  document.createElement("div");

title.textContent =
  "GOVERNMENT PROPERTY";

title.style.cssText =
  `
  position:absolute;

  left:50%;
  top:50%;

  transform:
    translate(-50%,-50%)
    scale(.25);

  opacity:0;

  z-index:25;

  white-space:nowrap;

  font-family:
    Georgia,
    serif;

  font-size:
    clamp(
      26px,
      7vw,
      62px
    );

  letter-spacing:.12em;

  font-weight:600;

  color:#eeeeee;

  text-shadow:
    0 2px 18px
    rgba(0,0,0,.95);
  `;

ui.appendChild(title);


/* START BUTTON */

const startButton =
  document.createElement("button");

startButton.textContent =
  "TAP TO START";

startButton.style.cssText =
  `
  position:absolute;

  left:50%;
  top:50%;

  transform:
    translate(-50%,-50%);

  z-index:40;

  pointer-events:auto;

  border:
    1px solid
    rgba(255,255,255,.35);

  background:
    rgba(0,0,0,.62);

  color:#fff;

  padding:
    14px 18px;

  font-size:14px;

  letter-spacing:.18em;

  border-radius:4px;
  `;

stage.appendChild(
  startButton
);


/* =========================================================
   MATERIALS
   ========================================================= */

const concrete =
  new THREE.MeshStandardMaterial({

    color:0x3b3f42,

    roughness:0.97,

    metalness:0.02

  });


const concrete2 =
  new THREE.MeshStandardMaterial({

    color:0x555a5e,

    roughness:0.94,

    metalness:0.02

  });


const dark =
  new THREE.MeshStandardMaterial({

    color:0x0b0c0d,

    roughness:0.82

  });


const floorMat =
  new THREE.MeshStandardMaterial({

    color:0x202326,

    roughness:0.55,

    metalness:0.12

  });


const redMat =
  new THREE.MeshStandardMaterial({

    color:0x7f0a12,

    roughness:0.6,

    metalness:0.05

  });


const greyCloth =
  new THREE.MeshStandardMaterial({

    color:0x6b6f72,

    roughness:0.9

  });


const skin =
  new THREE.MeshStandardMaterial({

    color:0x9a7b6a,

    roughness:0.92

  });


const steel =
  new THREE.MeshStandardMaterial({

    color:0x8a9197,

    roughness:0.32,

    metalness:0.75

  });


const screenDark =
  new THREE.MeshBasicMaterial({

    color:0x06090b

  });


const lightMat =
  new THREE.MeshStandardMaterial({

    color:0xf7ffff,

    emissive:0xe9ffff,

    emissiveIntensity:4.5

  });


/* =========================================================
   ARCHITECTURE HELPER
   ========================================================= */

function box(
  width,
  height,
  depth,
  x,
  y,
  z,
  material,
  parent = scene
) {

  const mesh =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        width,
        height,
        depth
      ),

      material

    );

  mesh.position.set(
    x,
    y,
    z
  );

  parent.add(mesh);

  return mesh;

}


/* =========================================================
   FIRST CORRIDOR
   ========================================================= */

box(
  9.6,
  0.35,
  48,

  0,
  -0.22,
  -5,

  floorMat
);


box(
  0.55,
  6.8,
  48,

  -4.75,
  3.15,
  -5,

  concrete
);


box(
  0.55,
  6.8,
  48,

  4.75,
  3.15,
  -5,

  concrete
);


box(
  9.6,
  0.45,
  48,

  0,
  6.55,
  -5,

  concrete
);


/* RED FLOOR ROUTE */

box(
  0.72,
  0.055,
  48,

  0,
  0.02,
  -5,

  redMat
);


/* =========================================================
   CORRIDOR LIGHTING
   ========================================================= */

for (
  let z = 13;
  z >= -20;
  z -= 6.5
) {

  box(
    2.8,
    0.08,
    0.32,

    0,
    6.27,
    z,

    lightMat
  );


  const light =
    new THREE.PointLight(

      0xe7f1f2,

      8,

      10,

      2
    );


  light.position.set(
    0,
    5.75,
    z
  );


  scene.add(light);

}


/* =========================================================
   SIDE DOORS
   ========================================================= */

for (
  const side of [-1, 1]
) {

  for (
    let z = 10;
    z >= -16;
    z -= 7
  ) {

    box(
      0.18,
      3.7,
      2.8,

      side * 4.42,
      1.8,
      z,

      dark
    );


    /* tiny red access light */

    box(
      0.12,
      0.12,
      0.12,

      side * 4.28,
      3.15,
      z - 0.95,

      redMat
    );

  }

}


/* =========================================================
   HUGE DOUBLE DOORS
   ========================================================= */

const doorZ =
  -23.5;


const doorLeft =
  box(
    4.15,
    5.7,
    0.55,

    -2.08,
    2.65,
    doorZ,

    dark
  );


const doorRight =
  box(
    4.15,
    5.7,
    0.55,

    2.08,
    2.65,
    doorZ,

    dark
  );


/* concrete frame */

box(
  9.4,
  0.65,
  0.75,

  0,
  5.75,
  doorZ,

  concrete2
);


box(
  0.65,
  6.4,
  0.75,

  -4.38,
  2.75,
  doorZ,

  concrete2
);


box(
  0.65,
  6.4,
  0.75,

  4.38,
  2.75,
  doorZ,

  concrete2
);


/* =========================================================
   MASSIVE TRAINING ROOM
   ========================================================= */

box(
  18,
  0.42,
  56,

  0,
  -0.28,
  -53,

  floorMat
);


box(
  0.6,
  10,
  56,

  -9,
  4.65,
  -53,

  concrete
);


box(
  0.6,
  10,
  56,

  9,
  4.65,
  -53,

  concrete
);


box(
  18,
  0.6,
  56,

  0,
  9.45,
  -53,

  concrete
);


box(
  0.65,
  0.055,
  55,

  0,
  0.02,
  -53,

  redMat
);


/* =========================================================
   TRAINING ROOM LIGHTS
   ========================================================= */

for (
  let z = -30;
  z >= -77;
  z -= 9
) {

  box(
    4.8,
    0.08,
    0.35,

    0,
    9.08,
    z,

    lightMat
  );


  const light =
    new THREE.PointLight(

      0xe6eef0,

      12,

      14,

      2
    );


  light.position.set(
    0,
    8.2,
    z
  );


  scene.add(light);

}


/* GLOBAL LOW LIGHT */

const hemi =
  new THREE.HemisphereLight(

    0xa6b0b5,

    0x050505,

    0.42

  );

scene.add(hemi);


/* =========================================================
   PEOPLE / PRISONERS
   ========================================================= */

const prisoners = [];


function cylinder(
  radiusTop,
  radiusBottom,
  height,
  material
) {

  return new THREE.Mesh(

    new THREE.CylinderGeometry(

      radiusTop,
      radiusBottom,
      height,

      10
    ),

    material

  );

}


function makePrisoner(
  x,
  z,
  phase = 0
) {

  const person =
    new THREE.Group();


  person.position.set(
    x,
    0,
    z
  );


  /* torso */

  const torso =
    cylinder(
      0.27,
      0.34,
      1.22,
      greyCloth
    );

  torso.position.y =
    1.55;

  person.add(torso);


  /* head */

  const head =
    new THREE.Mesh(

      new THREE.SphereGeometry(
        0.2,
        12,
        12
      ),

      skin
    );

  head.position.y =
    2.36;

  person.add(head);


  /* legs */

  const leg1 =
    cylinder(
      0.11,
      0.12,
      1.05,
      greyCloth
    );

  leg1.position.set(
    -0.14,
    0.62,
    0
  );

  person.add(leg1);


  const leg2 =
    leg1.clone();

  leg2.position.x =
    0.14;

  person.add(leg2);


  /* arms */

  const arm1 =
    cylinder(
      0.085,
      0.095,
      0.88,
      greyCloth
    );


  arm1.rotation.z =
    0.25;


  arm1.position.set(
    -0.27,
    1.52,
    0.16
  );


  person.add(arm1);


  const arm2 =
    arm1.clone();


  arm2.rotation.z =
    -0.25;


  arm2.position.x =
    0.27;


  person.add(arm2);


  /* cuff */

  const cuff =
    new THREE.Mesh(

      new THREE.TorusGeometry(
        0.14,
        0.035,
        6,
        14
      ),

      steel

    );


  cuff.rotation.x =
    Math.PI / 2;


  cuff.position.set(
    0,
    1.13,
    0.28
  );


  person.add(cuff);


  /* chain to ceiling */

  const chainGeometry =
    new THREE.BufferGeometry()
      .setFromPoints([

        new THREE.Vector3(
          0,
          1.13,
          0.28
        ),

        new THREE.Vector3(
          0,
          8.95,
          0.28
        )

      ]);


  const chain =
    new THREE.Line(

      chainGeometry,

      new THREE.LineBasicMaterial({
        color:0x9ca3a8
      })

    );


  person.add(chain);


  person.userData.phase =
    phase;


  scene.add(person);


  prisoners.push(person);

}


/* GROUP OF PRISONERS */

let prisonerNumber =
  0;


for (
  let row = 0;
  row < 4;
  row++
) {

  for (
    let column = 0;
    column < 5;
    column++
  ) {

    makePrisoner(

      -3.6 +
      column * 1.8,

      -40 -
      row * 2.7,

      prisonerNumber++ * 0.7

    );

  }

}


/* =========================================================
   DESKS AROUND THE ROOM
   ========================================================= */

function makeDesk(
  x,
  z,
  rotationY = 0
) {

  const desk =
    new THREE.Group();


  desk.position.set(
    x,
    0,
    z
  );


  desk.rotation.y =
    rotationY;


  box(
    2.5,
    0.14,
    1.25,

    0,
    1.05,
    0,

    concrete2,

    desk
  );


  box(
    0.14,
    1,
    0.14,

    -1.05,
    0.5,
    -0.42,

    concrete2,

    desk
  );


  box(
    0.14,
    1,
    0.14,

    1.05,
    0.5,
    -0.42,

    concrete2,

    desk
  );


  box(
    0.14,
    1,
    0.14,

    -1.05,
    0.5,
    0.42,

    concrete2,

    desk
  );


  box(
    0.14,
    1,
    0.14,

    1.05,
    0.5,
    0.42,

    concrete2,

    desk
  );


  scene.add(desk);

  return desk;

}


/* far desks */

for (
  let x = -6.5;
  x <= 6.5;
  x += 3.25
) {

  makeDesk(
    x,
    -34.5,
    0
  );

}


/* side desks */

for (
  let z = -39;
  z >= -52;
  z -= 3.4
) {

  makeDesk(
    -7,
    z,
    Math.PI / 2
  );


  makeDesk(
    7,
    z,
    -Math.PI / 2
  );

}


/* =========================================================
   OUR WORKSTATION
   ========================================================= */

const station =
  new THREE.Group();


station.position.set(
  3.1,
  0,
  -58.8
);


scene.add(station);


/* desk */

box(
  3.1,
  0.16,
  1.55,

  0,
  1,
  0,

  concrete2,

  station
);


box(
  0.17,
  1,
  0.17,

  -1.28,
  0.48,
  -0.55,

  concrete2,

  station
);


box(
  0.17,
  1,
  0.17,

  1.28,
  0.48,
  -0.55,

  concrete2,

  station
);


/* =========================================================
   COMPUTER
   ========================================================= */

box(
  2.3,
  1.38,
  0.12,

  0,
  1.85,
  -0.45,

  dark,

  station
);


const monitorScreen =
  box(
    2.08,
    1.14,
    0.025,

    0,
    1.85,
    -0.52,

    screenDark,

    station
  );


function makeScreenTexture() {

  const canvas =
    document.createElement(
      "canvas"
    );


  canvas.width =
    1024;


  canvas.height =
    560;


  const context =
    canvas.getContext("2d");


  context.fillStyle =
    "#06090b";


  context.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );


  context.fillStyle =
    "#d7dddd";


  context.font =
    "bold 68px Arial";


  context.textAlign =
    "center";


  context.fillText(

    "UTILITY RANKS",

    canvas.width / 2,

    225

  );


  context.font =
    "32px Arial";


  context.fillStyle =
    "#9aa3a6";


  context.fillText(

    "50 CASES LOADED",

    canvas.width / 2,

    305

  );


  context.strokeStyle =
    "#6c0d15";


  context.lineWidth =
    5;


  context.strokeRect(

    90,
    85,

    canvas.width - 180,
    canvas.height - 170

  );


  return new THREE.CanvasTexture(
    canvas
  );

}


const screenTexture =
  makeScreenTexture();


monitorScreen.material =
  new THREE.MeshBasicMaterial({

    map:screenTexture,

    transparent:true,

    opacity:0

  });


/* =========================================================
   DRAWER
   ========================================================= */

const drawer =
  new THREE.Group();


drawer.position.set(
  0,
  0.78,
  0.18
);


station.add(drawer);


/* drawer tray */

box(
  2.1,
  0.28,
  0.95,

  0,
  0,
  0,

  dark,

  drawer
);


/* drawer face */

box(
  2.18,
  0.34,
  0.12,

  0,
  0,
  0.49,

  concrete,

  drawer
);


/* =========================================================
   KNIFE
   ========================================================= */

const knife =
  new THREE.Group();


knife.position.set(
  0.1,
  0.18,
  0.02
);


knife.rotation.y =
  -0.18;


drawer.add(knife);


/* handle */

box(
  0.34,
  0.08,
  0.84,

  0,
  0,
  0.2,

  dark,

  knife
);


/* blade */

box(
  0.14,
  0.045,
  1.2,

  0,
  0,
  -0.78,

  steel,

  knife
);


/* blade tip */

const tip =
  new THREE.Mesh(

    new THREE.ConeGeometry(
      0.11,
      0.45,
      4
    ),

    steel
  );


tip.rotation.x =
  Math.PI / 2;


tip.position.set(
  0,
  0,
  -1.58
);


knife.add(tip);


/* =========================================================
   AUDIO
   ========================================================= */

let audioCtx = null;

let master = null;

let started = false;

const fired =
  new Set();


function createAudio() {

  audioCtx =
    new (
      window.AudioContext ||
      window.webkitAudioContext
    )();


  master =
    audioCtx.createGain();


  master.gain.value =
    0.55;


  master.connect(
    audioCtx.destination
  );


  /* low ventilation rumble */

  const hum =
    audioCtx.createOscillator();


  hum.type =
    "sine";


  hum.frequency.value =
    47;


  const humGain =
    audioCtx.createGain();


  humGain.gain.value =
    0.035;


  hum
    .connect(humGain)
    .connect(master);


  hum.start();


  /* electrical secondary hum */

  const hum2 =
    audioCtx.createOscillator();


  hum2.type =
    "triangle";


  hum2.frequency.value =
    94;


  const hum2Gain =
    audioCtx.createGain();


  hum2Gain.gain.value =
    0.009;


  hum2
    .connect(hum2Gain)
    .connect(master);


  hum2.start();


  /* faint ventilation noise */

  const buffer =
    audioCtx.createBuffer(

      1,

      audioCtx.sampleRate * 2,

      audioCtx.sampleRate

    );


  const data =
    buffer.getChannelData(0);


  for (
    let i = 0;
    i < data.length;
    i++
  ) {

    data[i] =
      Math.random() * 2 - 1;

  }


  const noise =
    audioCtx.createBufferSource();


  noise.buffer =
    buffer;


  noise.loop =
    true;


  const filter =
    audioCtx.createBiquadFilter();


  filter.type =
    "bandpass";


  filter.frequency.value =
    720;


  filter.Q.value =
    0.7;


  const noiseGain =
    audioCtx.createGain();


  noiseGain.gain.value =
    0.008;


  noise
    .connect(filter)
    .connect(noiseGain)
    .connect(master);


  noise.start();

}


/* FOOTSTEP / HEAVY IMPACT */

function thump(
  volume = 0.12
) {

  const oscillator =
    audioCtx.createOscillator();


  const gain =
    audioCtx.createGain();


  oscillator.type =
    "sine";


  oscillator.frequency
    .setValueAtTime(

      105,

      audioCtx.currentTime

    );


  oscillator.frequency
    .exponentialRampToValueAtTime(

      55,

      audioCtx.currentTime + 0.12

    );


  gain.gain
    .setValueAtTime(

      volume,

      audioCtx.currentTime

    );


  gain.gain
    .exponentialRampToValueAtTime(

      0.001,

      audioCtx.currentTime + 0.16

    );


  oscillator
    .connect(gain)
    .connect(master);


  oscillator.start();


  oscillator.stop(
    audioCtx.currentTime + 0.18
  );

}


/* SECURITY BEEP */

function beep() {

  const oscillator =
    audioCtx.createOscillator();


  const gain =
    audioCtx.createGain();


  oscillator.type =
    "sine";


  oscillator.frequency.value =
    880;


  gain.gain
    .setValueAtTime(

      0.12,

      audioCtx.currentTime

    );


  gain.gain
    .exponentialRampToValueAtTime(

      0.001,

      audioCtx.currentTime + 0.11

    );


  oscillator
    .connect(gain)
    .connect(master);


  oscillator.start();


  oscillator.stop(
    audioCtx.currentTime + 0.12
  );

}


/* DOOR MECHANISM */

function doorClunk() {

  thump(0.22);


  const oscillator =
    audioCtx.createOscillator();


  const gain =
    audioCtx.createGain();


  oscillator.type =
    "sawtooth";


  oscillator.frequency
    .setValueAtTime(

      85,

      audioCtx.currentTime

    );


  oscillator.frequency
    .exponentialRampToValueAtTime(

      35,

      audioCtx.currentTime + 0.5

    );


  gain.gain
    .setValueAtTime(

      0.04,

      audioCtx.currentTime

    );


  gain.gain
    .exponentialRampToValueAtTime(

      0.001,

      audioCtx.currentTime + 0.55

    );


  oscillator
    .connect(gain)
    .connect(master);


  oscillator.start();


  oscillator.stop(
    audioCtx.currentTime + 0.6
  );

}


/* VERY QUIET BACKGROUND WHIMPER */

function whimper() {

  const oscillator =
    audioCtx.createOscillator();


  const gain =
    audioCtx.createGain();


  oscillator.type =
    "triangle";


  oscillator.frequency
    .setValueAtTime(

      235,

      audioCtx.currentTime

    );


  oscillator.frequency
    .linearRampToValueAtTime(

      175,

      audioCtx.currentTime + 0.65

    );


  gain.gain
    .setValueAtTime(

      0.001,

      audioCtx.currentTime

    );


  gain.gain
    .linearRampToValueAtTime(

      0.018,

      audioCtx.currentTime + 0.08

    );


  gain.gain
    .exponentialRampToValueAtTime(

      0.001,

      audioCtx.currentTime + 0.7

    );


  oscillator
    .connect(gain)
    .connect(master);


  oscillator.start();


  oscillator.stop(
    audioCtx.currentTime + 0.72
  );

}


/* CHAIN SNAP */

function chainSnap() {

  [
    620,
    980,
    1510
  ].forEach(
    (
      frequency,
      index
    ) => {

      const oscillator =
        audioCtx.createOscillator();


      const gain =
        audioCtx.createGain();


      oscillator.type =
        "sine";


      oscillator.frequency.value =
        frequency;


      gain.gain
        .setValueAtTime(

          0.08 /
          (index + 1),

          audioCtx.currentTime

        );


      gain.gain
        .exponentialRampToValueAtTime(

          0.001,

          audioCtx.currentTime +
          0.28 +
          index * 0.05

        );


      oscillator
        .connect(gain)
        .connect(master);


      oscillator.start();


      oscillator.stop(
        audioCtx.currentTime + 0.4
      );

    }

  );

}


/* SINGLE FINAL SCREAM */

function distantScream() {

  const oscillator =
    audioCtx.createOscillator();


  const gain =
    audioCtx.createGain();


  const filter =
    audioCtx.createBiquadFilter();


  oscillator.type =
    "sawtooth";


  oscillator.frequency
    .setValueAtTime(

      330,

      audioCtx.currentTime

    );


  oscillator.frequency
    .linearRampToValueAtTime(

      760,

      audioCtx.currentTime + 0.22

    );


  oscillator.frequency
    .exponentialRampToValueAtTime(

      220,

      audioCtx.currentTime + 0.95

    );


  gain.gain
    .setValueAtTime(

      0.001,

      audioCtx.currentTime

    );


  gain.gain
    .linearRampToValueAtTime(

      0.085,

      audioCtx.currentTime + 0.12

    );


  gain.gain
    .exponentialRampToValueAtTime(

      0.001,

      audioCtx.currentTime + 1

    );


  filter.type =
    "bandpass";


  filter.frequency.value =
    900;


  filter.Q.value =
    0.9;


  oscillator
    .connect(filter)
    .connect(gain)
    .connect(master);


  oscillator.start();


  oscillator.stop(
    audioCtx.currentTime + 1.05
  );

}


/* =========================================================
   ONLY SPOKEN WORD
   ========================================================= */

function sayBegin() {

  if (
    !(
      "speechSynthesis"
      in window
    )
  ) {

    return;

  }


  speechSynthesis.cancel();


  const voiceLine =
    new SpeechSynthesisUtterance(
      "Begin"
    );


  voiceLine.rate =
    0.68;


  voiceLine.pitch =
    0.62;


  voiceLine.volume =
    0.82;


  const voices =
    speechSynthesis.getVoices();


  voiceLine.voice =

    voices.find(
      voice =>
        /en-GB/i.test(
          voice.lang
        )
    )

    ||

    voices.find(
      voice =>
        /^en/i.test(
          voice.lang
        )
    )

    ||

    null;


  speechSynthesis.speak(
    voiceLine
  );

}


/* =========================================================
   ANIMATION HELPERS
   ========================================================= */

let startTime =
  0;


function clamp01(value) {

  return Math.max(
    0,
    Math.min(
      1,
      value
    )
  );

}


function smooth(value) {

  value =
    clamp01(value);


  return (
    value *
    value *
    (3 - 2 * value)
  );

}


function lerp(
  start,
  end,
  progress
) {

  return (

    start +

    (
      end -
      start
    )

    * progress

  );

}


function setCamera(
  x,
  y,
  z,
  lookX,
  lookY,
  lookZ
) {

  camera.position.set(
    x,
    y,
    z
  );


  camera.lookAt(
    lookX,
    lookY,
    lookZ
  );

}


/* FIRE AUDIO EVENT ONCE */

function once(
  key,
  condition,
  functionToRun
) {

  if (
    condition &&
    !fired.has(key)
  ) {

    fired.add(key);

    functionToRun();

  }

}


/* =========================================================
   MAIN FILM
   ========================================================= */

function animate(now) {

  const time =

    started

      ?

    (
      now -
      startTime
    ) / 1000

      :

    0;


  /* tiny natural movement among prisoners */

  prisoners.forEach(
    prisoner => {

      prisoner.rotation.z =

        Math.sin(

          now * 0.0009 +

          prisoner
            .userData
            .phase

        )

        * 0.012;

    }

  );


  /* BEFORE START */

  if (!started) {

    setCamera(

      0,
      2.05,
      16,

      0,
      2,
      -18

    );


    renderer.render(
      scene,
      camera
    );


    requestAnimationFrame(
      animate
    );


    return;

  }


  /* =====================================================
     0 - 0.8
     FADE INTO CORRIDOR
     ===================================================== */

  fade.style.opacity =
    String(

      1 -
      smooth(
        time / 0.8
      )

    );


  /* =====================================================
     0 - 5.5
     WALK DOWN CORRIDOR
     ===================================================== */

  if (
    time < 5.5
  ) {

    const progress =
      smooth(
        time / 5.5
      );


    const z =
      lerp(

        16,

        -17.4,

        progress

      );


    const sway =

      Math.sin(
        time * 6.2
      )

      * 0.035;


    setCamera(

      sway,

      2.05 +
      Math.sin(
        time * 12.4
      ) * 0.012,

      z,


      sway * 0.15,

      2,

      z - 20

    );


    const step =
      Math.floor(
        time / 0.55
      );


    once(

      "step" + step,

      time > 0.25,

      () =>
        thump(0.07)

    );

  }


  /* =====================================================
     5.5 - 6.8
     DOORS OPEN
     ===================================================== */

  else if (
    time < 6.8
  ) {

    setCamera(

      0,
      2.05,
      -17.4,

      0,
      2.2,
      -28

    );


    const progress =

      smooth(

        (
          time -
          5.7
        )

        / 0.9

      );


    doorLeft.position.x =

      lerp(

        -2.08,

        -4.55,

        progress

      );


    doorRight.position.x =

      lerp(

        2.08,

        4.55,

        progress

      );


    once(
      "beep",
      time > 5.65,
      beep
    );


    once(
      "door",
      time > 5.86,
      doorClunk
    );

  }


  /* =====================================================
     6.8 - 10.4
     ENTER TRAINING ROOM
     ===================================================== */

  else if (
    time < 10.4
  ) {

    const progress =

      smooth(

        (
          time -
          6.8
        )

        / 3.6

      );


    const z =

      lerp(

        -17.4,

        -41.5,

        progress

      );


    const x =

      lerp(

        0,

        0.8,

        progress

      );


    setCamera(

      x,
      2.05,
      z,

      0,
      2.2,
      -48

    );


    once(

      "whimper1",

      time > 8.35,

      whimper

    );


    once(

      "whimper2",

      time > 9.75,

      whimper

    );

  }


  /* =====================================================
     10.4 - 12.6
     APPROACH COMPUTER
     ===================================================== */

  else if (
    time < 12.6
  ) {

    const progress =

      smooth(

        (
          time -
          10.4
        )

        / 2.2

      );


    const x =

      lerp(

        0.8,

        3.1,

        progress

      );


    const z =

      lerp(

        -41.5,

        -55,

        progress

      );


    setCamera(

      x,
      2.05,
      z,

      3.1,
      1.8,
      -59.3

    );


    monitorScreen
      .material
      .opacity =

      smooth(

        (
          time -
          11.25
        )

        / 0.7

      );

  }


  /* =====================================================
     12.6 - 13.5
     PUSH INTO COMPUTER
     ===================================================== */

  else if (
    time < 13.5
  ) {

    const progress =

      smooth(

        (
          time -
          12.6
        )

        / 0.9

      );


    setCamera(

      3.1,

      lerp(
        2.05,
        1.95,
        progress
      ),

      lerp(
        -55,
        -56.5,
        progress
      ),

      3.1,
      1.85,
      -59.35

    );

  }


  /* =====================================================
     13.5 - 15.1
     PAN DOWN / DRAWER OPENS
     ===================================================== */

  else if (
    time < 15.1
  ) {

    const progress =

      smooth(

        (
          time -
          13.5
        )

        / 1.6

      );


    drawer.position.z =

      lerp(

        0.18,

        1.08,

        smooth(

          (
            time -
            13.7
          )

          / 0.9

        )

      );


    setCamera(

      3.1,
      1.92,
      -56.5,

      3.1,

      lerp(
        1.75,
        0.85,
        progress
      ),

      -58.65

    );


    once(

      "drawer",

      time > 13.72,

      doorClunk

    );

  }


  /* =====================================================
     15.1 - 16.25
     KNIFE / BEGIN / SCREAM
     ===================================================== */

  else if (
    time < 16.25
  ) {

    setCamera(

      3.1,
      1.88,
      -56.5,

      3.1,
      0.85,
      -58.7

    );


    once(

      "begin",

      time > 15.15,

      sayBegin

    );


    once(

      "chain",

      time > 15.78,

      chainSnap

    );


    once(

      "scream",

      time > 15.92,

      distantScream

    );


    if (
      time > 15.75
    ) {

      prisoners[7]
        .position
        .y =

        Math.sin(

          (
            time -
            15.75
          )

          * 32

        )

        * 0.035;

    }

  }


  /* =====================================================
     16.25 - 18.9
     WORLD PULLS BACK
     TITLE COMES FORWARD
     ===================================================== */

  else if (
    time < 18.9
  ) {

    const progress =

      smooth(

        (
          time -
          16.25
        )

        / 2.65

      );


    const z =

      lerp(

        -56.5,

        12.5,

        progress

      );


    const shake =

      (
        1 -
        progress
      )

      *

      Math.sin(
        time * 38
      )

      * 0.05;


    setCamera(

      shake,
      2,
      z,

      0,
      2.1,
      z - 24

    );


    title.style.opacity =

      String(

        smooth(

          (
            time -
            16.45
          )

          / 0.75

        )

      );


    const titleScale =

      lerp(

        0.25,

        1.12,

        smooth(

          (
            time -
            16.45
          )

          / 2.1

        )

      );


    title.style.transform =

      `
      translate(-50%,-50%)
      scale(${titleScale})
      `;

  }


  /* =====================================================
     FINAL BLACK
     ===================================================== */

  else {

    title.style.opacity =
      "1";


    title.style.transform =

      `
      translate(-50%,-50%)
      scale(1.12)
      `;


    fade.style.opacity =

      String(

        smooth(

          (
            time -
            18.9
          )

          / 1.1

        )

      );

  }


  renderer.render(
    scene,
    camera
  );


  requestAnimationFrame(
    animate
  );

}


requestAnimationFrame(
  animate
);


/* =========================================================
   START
   ========================================================= */

startButton.addEventListener(

  "click",

  async () => {

    if (started) {

      return;

    }


    started =
      true;


    fired.clear();


    doorLeft.position.x =
      -2.08;


    doorRight.position.x =
      2.08;


    drawer.position.z =
      0.18;


    title.style.opacity =
      "0";


    fade.style.opacity =
      "1";


    startButton.style.display =
      "none";


    createAudio();


    if (
      audioCtx.state ===
      "suspended"
    ) {

      await audioCtx.resume();

    }


    startTime =
      performance.now();

  }

);


/* =========================================================
   RESIZE
   ========================================================= */

window.addEventListener(

  "resize",

  () => {

    const width =
      stage.clientWidth;


    const height =
      stage.clientHeight;


    camera.aspect =
      width /
      height;


    camera.updateProjectionMatrix();


    renderer.setSize(

      width,
      height,
      false

    );

  }

);
