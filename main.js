import * as THREE from "three";


/* =========================================================
   GOVERNMENT PROPERTY
   FIRST 3D FACILITY TEST
   ========================================================= */


const stage = document.querySelector("#stage");


/* =========================================================
   SCENE
   ========================================================= */

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x050607);


/*
   Fog hides the far end of the institution
   and makes the facility feel much larger.
*/

scene.fog = new THREE.FogExp2(
  0x050607,
  0.018
);



/* =========================================================
   CAMERA
   ========================================================= */

const camera = new THREE.PerspectiveCamera(
  65,
  stage.clientWidth / stage.clientHeight,
  0.1,
  300
);


/*
   Eye height.
   Looking down the negative Z axis.
*/

camera.position.set(
  0,
  2.25,
  15
);



/* =========================================================
   RENDERER
   ========================================================= */

const renderer = new THREE.WebGLRenderer({
  antialias: true
});


renderer.setPixelRatio(
  Math.min(window.devicePixelRatio, 1.7)
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
  0.92;


stage.appendChild(
  renderer.domElement
);



/* =========================================================
   MATERIALS
   ========================================================= */


const concreteDark =
  new THREE.MeshStandardMaterial({

    color: 0x303438,

    roughness: 0.96,

    metalness: 0.02

  });


const concreteMid =
  new THREE.MeshStandardMaterial({

    color: 0x555a5e,

    roughness: 0.94,

    metalness: 0.01

  });


const concreteLight =
  new THREE.MeshStandardMaterial({

    color: 0x707579,

    roughness: 0.92

  });


const floorMaterial =
  new THREE.MeshStandardMaterial({

    color: 0x202326,

    roughness: 0.72,

    metalness: 0.08

  });


const redMaterial =
  new THREE.MeshStandardMaterial({

    color: 0x8d0812,

    roughness: 0.58,

    metalness: 0.05

  });


const blackMaterial =
  new THREE.MeshStandardMaterial({

    color: 0x060708,

    roughness: 0.75

  });


const lightMaterial =
  new THREE.MeshStandardMaterial({

    color: 0xffffff,

    emissive: 0xe9ffff,

    emissiveIntensity: 4

  });


const redLightMaterial =
  new THREE.MeshStandardMaterial({

    color: 0xff1727,

    emissive: 0xff0015,

    emissiveIntensity: 5

  });



/* =========================================================
   HELPER
   Creates rectangular architecture.
   ========================================================= */

function box(
  width,
  height,
  depth,
  x,
  y,
  z,
  material
) {

  const geometry =
    new THREE.BoxGeometry(
      width,
      height,
      depth
    );


  const mesh =
    new THREE.Mesh(
      geometry,
      material
    );


  mesh.position.set(
    x,
    y,
    z
  );


  scene.add(mesh);


  return mesh;

}



/* =========================================================
   FLOOR

   Actual 3D floor — not a triangle.
   ========================================================= */

box(
  18,
  0.5,
  135,

  0,
  -0.35,
  -48,

  floorMaterial
);



/* =========================================================
   RED CENTRAL ROUTE
   ========================================================= */

box(
  2.25,
  0.08,
  135,

  0,
  -0.04,
  -48,

  redMaterial
);



/* =========================================================
   SIDE WALLS

   Real parallel rectangular walls.
   ========================================================= */

box(
  0.8,
  9,
  135,

  -8.7,
  4.2,
  -48,

  concreteDark
);


box(
  0.8,
  9,
  135,

  8.7,
  4.2,
  -48,

  concreteDark
);



/* =========================================================
   CEILING
   ========================================================= */

box(
  18,
  0.6,
  135,

  0,
  9,
  -48,

  concreteDark
);



/* =========================================================
   MASSIVE STRUCTURAL FRAMES

   These repeat deeper into the building.
   They give us actual scale and perspective.
   ========================================================= */

function makeFrame(z) {


  /* LEFT COLUMN */

  box(
    1.4,
    8,
    1.5,

    -6.7,
    3.7,
    z,

    concreteMid
  );


  /* RIGHT COLUMN */

  box(
    1.4,
    8,
    1.5,

    6.7,
    3.7,
    z,

    concreteMid
  );


  /* TOP BEAM */

  box(
    15,
    1.2,
    1.5,

    0,
    7.6,
    z,

    concreteMid
  );

}



for (
  let z = 8;
  z >= -105;
  z -= 18
) {

  makeFrame(z);

}



/* =========================================================
   SIDE SECURITY DOORS
   ========================================================= */

function makeDoor(
  side,
  z
) {

  const x =
    side === "left"
      ? -8.22
      : 8.22;


  /*
     Dark recessed door
  */

  box(
    0.15,
    4.2,
    3.2,

    x,
    2.05,
    z,

    blackMaterial
  );


  /*
     Thick concrete surround
  */

  const frameX =
    side === "left"
      ? -8.08
      : 8.08;


  box(
    0.3,
    0.4,
    3.8,

    frameX,
    4.25,
    z,

    concreteLight
  );


  /*
     Red access/status light
  */

  const bulb =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        0.11,
        12,
        12
      ),
      redLightMaterial
    );


  bulb.position.set(
    side === "left"
      ? -8.05
      : 8.05,

    3.55,

    z - 1.1
  );


  scene.add(bulb);

}



[
  -5,
  -25,
  -45,
  -65,
  -85
].forEach((z, index) => {

  makeDoor(
    index % 2 === 0
      ? "left"
      : "right",
    z
  );


  makeDoor(
    index % 2 === 0
      ? "right"
      : "left",
    z - 7
  );

});



/* =========================================================
   RED BRANCHING ROUTES

   Government Property's red routes now physically exist
   in the floor.
   ========================================================= */

function redBranch(z) {

  box(
    13,
    0.09,
    1.35,

    0,
    -0.025,
    z,

    redMaterial
  );

}


redBranch(-23);

redBranch(-57);

redBranch(-88);



/* =========================================================
   CEILING LIGHTS
   ========================================================= */

function ceilingLight(z) {


  /*
     Visible glowing fixture
  */

  box(
    4.5,
    0.08,
    0.42,

    0,
    8.64,
    z,

    lightMaterial
  );


  /*
     Actual light illuminating geometry
  */

  const light =
    new THREE.PointLight(
      0xe8f0f0,
      28,
      19,
      2
    );


  light.position.set(
    0,
    8,
    z
  );


  scene.add(light);

}



for (
  let z = 7;
  z >= -105;
  z -= 12
) {

  ceilingLight(z);

}



/* =========================================================
   GENERAL LOW LIGHT
   ========================================================= */

const hemi =
  new THREE.HemisphereLight(
    0xaab8bd,
    0x070707,
    0.42
  );


scene.add(hemi);



/* =========================================================
   OVERHEAD BRIDGE

   Camera will physically travel underneath it.
   ========================================================= */

box(
  15,
  0.55,
  4,

  0,
  5.2,
  -48,

  concreteMid
);


/* bridge rails */

box(
  15,
  0.7,
  0.18,

  0,
  6,
  -46.15,

  concreteLight
);


box(
  15,
  0.7,
  0.18,

  0,
  6,
  -49.85,

  concreteLight
);



/* =========================================================
   TINY HUMAN FIGURES

   Used only to communicate enormous scale.
   ========================================================= */

const people = [];


function makePerson(
  x,
  z
) {

  const person =
    new THREE.Group();


  const body =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        0.18,
        0.23,
        1.25,
        10
      ),

      blackMaterial

    );


  body.position.y =
    0.72;


  person.add(body);


  const head =
    new THREE.Mesh(

      new THREE.SphereGeometry(
        0.19,
        12,
        12
      ),

      blackMaterial

    );


  head.position.y =
    1.52;


  person.add(head);


  person.position.set(
    x,
    0,
    z
  );


  scene.add(person);


  people.push(person);


  return person;

}



makePerson(
  -1.7,
  -35
);


makePerson(
  2.2,
  -58
);


makePerson(
  -3.4,
  -81
);



/* =========================================================
   ANIMATION
   ========================================================= */

let startTime = null;


function animate(time) {


  if (startTime === null) {

    startTime = time;

  }


  /*
     14-second journey.
  */

  const duration =
    14000;


  const elapsed =
    (time - startTime) % duration;


  const progress =
    elapsed / duration;


  /*
     Travel from entrance toward the deep interior.
  */

  camera.position.z =
    14 - progress * 92;


  /*
     Tiny walking sway.
  */

  camera.position.x =
    Math.sin(
      time * 0.0024
    ) * 0.08;


  camera.position.y =
    2.25 +
    Math.sin(
      time * 0.0048
    ) * 0.035;


  /*
     Camera always looks farther down the corridor.
  */

  camera.lookAt(
    camera.position.x * 0.2,
    2.1,
    camera.position.z - 25
  );


  /*
     A distant person slowly crosses the red path.
  */

  people[0].position.x =
    -2.4 +
    Math.sin(
      time * 0.0007
    ) * 2.5;


  renderer.render(
    scene,
    camera
  );

}



renderer.setAnimationLoop(
  animate
);



/* =========================================================
   MOBILE RESIZE
   ========================================================= */

function resize() {


  const width =
    stage.clientWidth;


  const height =
    stage.clientHeight;


  camera.aspect =
    width / height;


  camera.updateProjectionMatrix();


  renderer.setSize(
    width,
    height,
    false
  );

}


window.addEventListener(
  "resize",
  resize
);
