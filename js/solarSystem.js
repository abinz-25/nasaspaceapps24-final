//Import
import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js";


const neoData = [
  {
    object: "P/2004 R1 (McNaught)",
    epoch_tdb: "54629",
    tp_tdb: "2455248.548",
    e: "0.682526943",
    i_deg: "4.894555854",
    w_deg: "0.626837835",
    node_deg: "295.9854497",
    q_au_1: "0.986192006",
    q_au_2: "5.23",
    p_yr: "5.48",
    moid_au: "0.027011",
    ref: "20",
    object_name: "P/2004 R1 (McNaught)",
  },
  {
    object: "P/2008 S1 (Catalina-McNaught)",
    epoch_tdb: "55101",
    tp_tdb: "2454741.329",
    e: "0.6663127807",
    i_deg: "15.1007464",
    w_deg: "203.6490232",
    node_deg: "111.3920029",
    q_au_1: "1.190641555",
    q_au_2: "5.95",
    p_yr: "6.74",
    moid_au: "0.194101",
    ref: "13",
    object_name: "P/2008 S1 (Catalina-McNaught)",
  },
  {
    object: "1P/Halley",
    epoch_tdb: "49400",
    tp_tdb: "2446467.395",
    e: "0.9671429085",
    i_deg: "162.2626906",
    w_deg: "111.3324851",
    node_deg: "58.42008098",
    q_au_1: "0.5859781115",
    q_au_2: "35.08",
    p_yr: "75.32",
    moid_au: "0.063782",
    a1_au_d_2: "0.000000000270",
    a2_au_d_2: "0.000000000155",
    ref: "J863/77",
    object_name: "1P/Halley",
  },
  {
    object: "2P/Encke",
    epoch_tdb: "56870",
    tp_tdb: "2456618.204",
    e: "0.8482682514",
    i_deg: "11.77999525",
    w_deg: "186.5403463",
    node_deg: "334.5698056",
    q_au_1: "0.3360923855",
    q_au_2: "4.09",
    p_yr: "3.3",
    moid_au: "0.173092",
    a1_au_d_2: "0.000000000158",
    a2_au_d_2: "-0.00000000000505",
    ref: "74",
    object_name: "2P/Encke",
  },
  {
    object: "3D/Biela",
    epoch_tdb: "-9480",
    tp_tdb: "2390514.115",
    e: "0.751299",
    i_deg: "13.2164",
    w_deg: "221.6588",
    node_deg: "250.669",
    q_au_1: "0.879073",
    q_au_2: "6.19",
    p_yr: "6.65",
    moid_au: "0.000518",
    a1_au_d_2: "0.00000000390",
    a2_au_d_2: "-0.000000000254",
    ref: "IAUCAT03",
    object_name: "3D/Biela",
  },
  {
    object: "5D/Brorsen",
    epoch_tdb: "7440",
    tp_tdb: "2407439.534",
    e: "0.809796",
    i_deg: "29.3821",
    w_deg: "14.9468",
    node_deg: "102.9676",
    q_au_1: "0.589847",
    q_au_2: "5.61",
    p_yr: "5.46",
    moid_au: "0.366559",
    a1_au_d_2: "0.0000000127",
    a2_au_d_2: "0.00000000134",
    ref: "IAUCAT03",
    object_name: "5D/Brorsen",
  },
  {
    object: "7P/Pons-Winnecke",
    epoch_tdb: "56981",
    tp_tdb: "2457053.028",
    e: "0.6375275046",
    i_deg: "22.33501476",
    w_deg: "172.5061606",
    node_deg: "93.41632728",
    q_au_1: "1.239214834",
    q_au_2: "5.6",
    p_yr: "6.32",
    moid_au: "0.224191",
    a1_au_d_2: "0.0000000000786",
    a2_au_d_2: "-0.0000000000115",
    a3_au_d_2: "-0.000000000153",
    dt_d: "131",
    ref: "K088/14",
    object_name: "7P/Pons-Winnecke",
  },
  {
    object: "8P/Tuttle",
    epoch_tdb: "54374",
    tp_tdb: "2454492.526",
    e: "0.819799747",
    i_deg: "54.98318484",
    w_deg: "207.509246",
    node_deg: "270.341652",
    q_au_1: "1.027116587",
    q_au_2: "10.37",
    p_yr: "13.61",
    moid_au: "0.09531",
    a1_au_d_2: "0.000000000689",
    a2_au_d_2: "0.000000000137",
    a3_au_d_2: "-0.000000000459",
    ref: "K074/27",
    object_name: "8P/Tuttle",
  },
  {
    object: "12P/Pons-Brooks",
    epoch_tdb: "35000",
    tp_tdb: "2434885.381",
    e: "0.9548123942",
    i_deg: "74.17689423",
    w_deg: "199.0284686",
    node_deg: "255.8911444",
    q_au_1: "0.7736670873",
    q_au_2: "33.47",
    p_yr: "70.85",
    moid_au: "0.1873",
    a1_au_d_2: "-0.00000000102",
    a2_au_d_2: "-0.000000000271",
    ref: "15",
    object_name: "12P/Pons-Brooks",
  },
  {
    object: "13P/Olbers",
    epoch_tdb: "35760",
    tp_tdb: "2435643.635",
    e: "0.9302971475",
    i_deg: "44.60988573",
    w_deg: "64.64120652",
    node_deg: "86.10312835",
    q_au_1: "1.178450614",
    q_au_2: "32.64",
    p_yr: "69.52",
    moid_au: "0.477199",
    a1_au_d_2: "0.00000000945",
    a2_au_d_2: "0.000000000649",
    ref: "10",
    object_name: "13P/Olbers",
  },
  {
    object: "15P/Finlay",
    epoch_tdb: "57003",
    tp_tdb: "2457018.557",
    e: "0.7201837656",
    i_deg: "6.798912616",
    w_deg: "347.5528394",
    node_deg: "13.7781465",
    q_au_1: "0.9759007725",
    q_au_2: "6",
    p_yr: "6.51",
    moid_au: "0.009433",
    a1_au_d_2: "0.00000000408",
    a2_au_d_2: "0.0000000000665",
    ref: "K085/14",
    object_name: "15P/Finlay",
  },
  {
    object: "18D/Perrine-Mrkos",
    epoch_tdb: "40240",
    tp_tdb: "2440162.042",
    e: "0.6425809824",
    i_deg: "17.75898277",
    w_deg: "166.0504171",
    node_deg: "240.8755466",
    q_au_1: "1.272248081",
    q_au_2: "5.85",
    p_yr: "6.72",
    moid_au: "0.28923",
    ref: "J682/18",
    object_name: "18D/Perrine-Mrkos",
  },
  {
    object: "20D/Westphal",
    epoch_tdb: "20080",
    tp_tdb: "2420098.29",
    e: "0.919831189",
    i_deg: "40.89006106",
    w_deg: "57.08095497",
    node_deg: "348.0064469",
    q_au_1: "1.254012762",
    q_au_2: "30.03",
    p_yr: "61.87",
    moid_au: "0.468283",
    ref: "19",
    object_name: "20D/Westphal",
  },
  {
    object: "21P/Giacobini-Zinner",
    epoch_tdb: "56498",
    tp_tdb: "2455969.126",
    e: "0.7068178874",
    i_deg: "31.90810099",
    w_deg: "172.5844249",
    node_deg: "195.3970145",
    q_au_1: "1.030696274",
    q_au_2: "6",
    p_yr: "6.59",
    moid_au: "0.035395",
    a1_au_d_2: "0.00000000335",
    a2_au_d_2: "-0.000000000429",
    a3_au_d_2: "-0.000000000957",
    dt_d: "-32.8",
    ref: "K123/6",
    object_name: "21P/Giacobini-Zinner",
  },
  {
    object: "23P/Brorsen-Metcalf",
    epoch_tdb: "47800",
    tp_tdb: "2447781.437",
    e: "0.9719522579",
    i_deg: "19.33394047",
    w_deg: "129.6106837",
    node_deg: "311.5854622",
    q_au_1: "0.4787527107",
    q_au_2: "33.66",
    p_yr: "70.52",
    moid_au: "0.193872",
    a1_au_d_2: "0.00000000225",
    a2_au_d_2: "-0.000000000533",
    ref: "13",
    object_name: "23P/Brorsen-Metcalf",
  },
  {
    object: "24P/Schaumasse",
    epoch_tdb: "52120",
    tp_tdb: "2452032.161",
    e: "0.7048003557",
    i_deg: "11.75152976",
    w_deg: "57.87449255",
    node_deg: "79.8310383",
    q_au_1: "1.205010042",
    q_au_2: "6.96",
    p_yr: "8.25",
    moid_au: "0.28218",
    a1_au_d_2: "0.00000000110",
    a2_au_d_2: "-0.000000000586",
    ref: "K014/19",
    object_name: "24P/Schaumasse",
  },
  {
    object: "26P/Grigg-Skjellerup",
    epoch_tdb: "56978",
    tp_tdb: "2456479.559",
    e: "0.6402771379",
    i_deg: "22.42889388",
    w_deg: "2.146692288",
    node_deg: "211.5375548",
    q_au_1: "1.085247781",
    q_au_2: "4.95",
    p_yr: "5.24",
    moid_au: "0.079476",
    a1_au_d_2: "0.000000000113",
    a2_au_d_2: "-0.0000000000105",
    ref: "K139/6",
    object_name: "26P/Grigg-Skjellerup",
  },
  {
    object: "27P/Crommelin",
    epoch_tdb: "56364",
    tp_tdb: "2455777.391",
    e: "0.9189810923",
    i_deg: "28.96687279",
    w_deg: "196.0253969",
    node_deg: "250.6264098",
    q_au_1: "0.7482874671",
    q_au_2: "17.72",
    p_yr: "28.07",
    moid_au: "0.215189",
    a1_au_d_2: "-0.0000000365",
    a2_au_d_2: "-0.00000000171",
    a3_au_d_2: "0.00000000208",
    ref: "K113/4",
    object_name: "27P/Crommelin",
  },
  {
    object: "41P/Tuttle-Giacobini-Kresak",
    epoch_tdb: "53821",
    tp_tdb: "2453898.291",
    e: "0.6604126649",
    i_deg: "9.228028049",
    w_deg: "62.19321856",
    node_deg: "141.0929309",
    q_au_1: "1.047777635",
    q_au_2: "5.12",
    p_yr: "5.42",
    moid_au: "0.135384",
    a1_au_d_2: "0.0000000135",
    a2_au_d_2: "0.00000000331",
    ref: "K064/9",
    object_name: "41P/Tuttle-Giacobini-Kresak",
  },
  {
    object: "45P/Honda-Mrkos-Pajdusakova",
    epoch_tdb: "56060",
    tp_tdb: "2455833.282",
    e: "0.8246720759",
    i_deg: "4.252433261",
    w_deg: "326.2580404",
    node_deg: "89.0021809",
    q_au_1: "0.5297614214",
    q_au_2: "5.51",
    p_yr: "5.25",
    moid_au: "0.060071",
    a1_au_d_2: "0.00000000388",
    a2_au_d_2: "0.000000000433",
    ref: "K112/2",
    object_name: "45P/Honda-Mrkos-Pajdusakova",
  },
];

//////////////////////////////////////
//NOTE Creating renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
//////////////////////////////////////

//////////////////////////////////////
//NOTE texture loader
const textureLoader = new THREE.TextureLoader();
//////////////////////////////////////

//////////////////////////////////////
//NOTE import all texture
const starTexture = textureLoader.load("./image/stars.jpg");
const sunTexture = textureLoader.load("./image/earth.jpg");
const mercuryTexture = textureLoader.load("./image/moon.jpeg");
const venusTexture = textureLoader.load("./image/assets/asteriods.jpg");
const earthTexture = textureLoader.load("image/assets/images (1).jpeg");
const marsTexture = textureLoader.load("image/assets/images (2).jpeg");
const jupiterTexture = textureLoader.load("image/assets/images (3).jpeg");
const saturnTexture = textureLoader.load("./image/saturn.jpg");
const uranusTexture = textureLoader.load("./image/uranus.jpg");
const neptuneTexture = textureLoader.load("./image/neptune.jpg");
const plutoTexture = textureLoader.load("./image/pluto.jpg");
const saturnRingTexture = textureLoader.load("./image/saturn_ring.png");
const uranusRingTexture = textureLoader.load("./image/uranus_ring.png");
//////////////////////////////////////

//////////////////////////////////////
//NOTE Creating scene
const scene = new THREE.Scene();
//////////////////////////////////////

//////////////////////////////////////
//NOTE screen bg
const cubeTextureLoader = new THREE.CubeTextureLoader();
const cubeTexture = cubeTextureLoader.load([
  starTexture,
  starTexture,
  starTexture,
  starTexture,
  starTexture,
  starTexture,
]);
scene.background = cubeTexture;
//////////////////////////////////////

//////////////////////////////////////
//NOTE Perspective Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(-50, 90, 150);
////////////////////////////////////

//////////////////////////////////////
//NOTE Percpective controll
const orbit = new OrbitControls(camera, renderer.domElement);
//////////////////////////////////////

//////////////////////////////////////
//NOTE - sun
const sungeo = new THREE.SphereGeometry(15, 50, 50);
const sunMaterial = new THREE.MeshBasicMaterial({
  map: sunTexture,
});
const sun = new THREE.Mesh(sungeo, sunMaterial);
scene.add(sun);
//////////////////////////////////////

//////////////////////////////////////
//NOTE - sun light (point light)
const sunLight = new THREE.PointLight(0xffffff, 4, 300);
scene.add(sunLight);
//////////////////////////////////////

//////////////////////////////////////
//NOTE - ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0);
scene.add(ambientLight);
//////////////////////////////////////

//////////////////////////////////////
//NOTE - path for planet
const path_of_planets = [];

function createLineLoopWithMesh(radius, color, width) {
  const material = new THREE.LineBasicMaterial({
    color: color,
    linewidth: width,
  });
  const geometry = new THREE.BufferGeometry();
  const lineLoopPoints = [];

  // Calculate points for the circular path
  const numSegments = 100; // Number of segments to create the circular path
  for (let i = 0; i <= numSegments; i++) {
    const angle = (i / numSegments) * Math.PI * 2;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    lineLoopPoints.push(x, 0, z);
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(lineLoopPoints, 3)
  );
  const lineLoop = new THREE.LineLoop(geometry, material);
  scene.add(lineLoop);
  path_of_planets.push(lineLoop);
}
//////////////////////////////////////

/////////////////////////////////////
//NOTE: create planet
// Function to generate planets (without NEO-specific logic)
const generatePlanet = (size, planetTexture, x, ring) => {
  const planetGeometry = new THREE.SphereGeometry(size, 50, 50);
  const planetMaterial = new THREE.MeshStandardMaterial({
    map: planetTexture,
  });
  const planet = new THREE.Mesh(planetGeometry, planetMaterial);
  const planetObj = new THREE.Object3D();
  planet.position.set(x, 0, 0);

  if (ring) {
    const ringGeo = new THREE.RingGeometry(
      ring.innerRadius,
      ring.outerRadius,
      32
    );
    const ringMat = new THREE.MeshBasicMaterial({
      map: ring.ringmat,
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    planetObj.add(ringMesh);
    ringMesh.position.set(x, 0, 0);
    ringMesh.rotation.x = -0.5 * Math.PI;
  }

  scene.add(planetObj);
  planetObj.add(planet);
  createLineLoopWithMesh(x, 0xffffff, 3); // Orbit

  return {
    planetObj: planetObj,
    planet: planet,
  };
};

const planets = [
  {
    ...generatePlanet(3.2, mercuryTexture, 28),
    rotaing_speed_around_sun: 0.004,
    self_rotation_speed: 0.004,
  },
  {
    ...generatePlanet(5.8, venusTexture, 44),
    rotaing_speed_around_sun: 0.015,
    self_rotation_speed: 0.002,
  },
  {
    ...generatePlanet(6, earthTexture, 62),
    rotaing_speed_around_sun: 0.01,
    self_rotation_speed: 0.02,
  },
  {
    ...generatePlanet(4, marsTexture, 78),
    rotaing_speed_around_sun: 0.008,
    self_rotation_speed: 0.018,
  },
  {
    ...generatePlanet(12, jupiterTexture, 100),
    rotaing_speed_around_sun: 0.002,
    self_rotation_speed: 0.04,
  },
  {
    ...generatePlanet(10, saturnTexture, 138, {
      innerRadius: 10,
      outerRadius: 20,
      ringmat: saturnRingTexture,
    }),
    rotaing_speed_around_sun: 0.0009,
    self_rotation_speed: 0.038,
  },
  {
    ...generatePlanet(7, uranusTexture, 176, {
      innerRadius: 7,
      outerRadius: 12,
      ringmat: uranusRingTexture,
    }),
    rotaing_speed_around_sun: 0.0004,
    self_rotation_speed: 0.03,
  },
  {
    ...generatePlanet(7, neptuneTexture, 200),
    rotaing_speed_around_sun: 0.0001,
    self_rotation_speed: 0.032,
  },
  {
    ...generatePlanet(2.8, plutoTexture, 216),
    rotaing_speed_around_sun: 0.0007,
    self_rotation_speed: 0.008,
  },
];

// Function to generate a Near-Earth Object (NEO)
const generateNEO = (size, texture, x) => {
  const neoGeometry = new THREE.SphereGeometry(size * 0.5, 50, 50); // Smaller size for NEO
  const neoMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    color: 0xff0000, // Red color for NEOs
  });
  const neo = new THREE.Mesh(neoGeometry, neoMaterial);
  neo.position.set(x, 0, 0);

  const neoObj = new THREE.Object3D();
  scene.add(neoObj);
  neoObj.add(neo);

  createLineLoopWithMesh(x, 0xff0000, 1); // Custom color and smaller orbit for NEO

  return {
    neoObj: neoObj,
    neo: neo,
  };
};

let neos = [];

neos = renderNEOs(neoData);

//////////////////////////////////////

//////////////////////////////////////
//NOTE - GUI options
var GUI = dat.gui.GUI;
const gui = new GUI();
const options = {
  "Real view": true,
  "Show path": true,
  speed: 1,
};
gui.add(options, "Real view").onChange((e) => {
  ambientLight.intensity = e ? 0 : 0.5;
});
gui.add(options, "Show path").onChange((e) => {
  path_of_planets.forEach((dpath) => {
    dpath.visible = e;
  });
});
const maxSpeed = new URL(window.location.href).searchParams.get("ms") * 1;
gui.add(options, "speed", 0, maxSpeed ? maxSpeed : 20);

//////////////////////////////////////

//////////////////////////////////////
//NOTE - animate function
function animate(time) {
  sun.rotateY(options.speed * 0.004);
  planets.forEach(
    ({ planetObj, planet, rotaing_speed_around_sun, self_rotation_speed }) => {
      planetObj.rotateY(options.speed * rotaing_speed_around_sun);
      planet.rotateY(options.speed * self_rotation_speed);
    }
  );

  // Update the rotation and position of NEOs
  neos.forEach(
    ({ neoObj, neo, rotaing_speed_around_sun, self_rotation_speed }) => {
      // Rotate around the sun
      neoObj.rotateY(options.speed * rotaing_speed_around_sun);

      // Self-rotation of the NEO
      neo.rotateY(options.speed * self_rotation_speed);
    }
  );

  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
//////////////////////////////////////

//////////////////////////////////////
//NOTE - resize camera view
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
//////////////////////////////////////

function renderNEOs(neoData) {
  const neos_array = []; // Array to store generated NEOs

  neoData.forEach((neo) => {
    let size = 1; // Initial size for NEOs
    const planetTexture = new THREE.TextureLoader().load("./image/moon.jpeg"); // Texture for NEOs

    // Use perihelion distance (`q_au_1`) to calculate position (x)
    const distanceAU = parseFloat(neo.q_au_1); // Parse perihelion distance in AU
    const distanceMultiplier = 50; // Scaling factor for visualization
    const x = distanceAU * distanceMultiplier; // Position based on perihelion distance (scaled)

    // Use orbital period (`p_yr`) to calculate rotation speed around sun
    const orbitalPeriodYears = parseFloat(neo.p_yr); // Parse orbital period in years
    const rotaing_speed_around_sun =
      (2 * Math.PI) / (orbitalPeriodYears * 365.25); // Speed for orbiting around sun

    size = size + 0.5; // Increase size for NEOs

    // Generate NEO using the generateNEO function
    const neoObj = generateNEO(size, planetTexture, x);

    // Generate a random self-rotation speed
    // Assuming NEOs rotate faster if they're smaller (inverse of size)
    const self_rotation_speed = Math.random() * (1 / size); // Random speed inversely proportional to size

    // Apply the calculated speeds to the NEO's rotation or orbit
    neoObj.neo.rotationSpeed = rotaing_speed_around_sun; // Custom property for controlling orbit speed

    // Push the generated NEO into the neos array with both speeds
    neos_array.push({
      ...neoObj,
      rotaing_speed_around_sun: rotaing_speed_around_sun, // Orbit speed around the sun
      self_rotation_speed: self_rotation_speed, // Self-rotation speed
    });
  });

  return neos_array; // Return the array of generated NEOs
}
