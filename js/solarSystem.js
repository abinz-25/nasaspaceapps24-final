//Import
import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js";

let neoData = [];

const apiUrl = "https://data.nasa.gov/resource/b67r-rgxc.json";

async function fetchNeoData() {
  try {
    // Fetch data from the API
    const response = await fetch(apiUrl);
    
    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    // Parse the JSON data
    const neoData = await response.json();
    
    // Store the fetched data in a variable
    console.log(neoData); // Output the fetched data
    return neoData;
  } catch (error) {
    console.error("Error fetching NEO data:", error);
  }
}

let neos = [];

// Call the function to fetch and store the data
fetchNeoData().then(res => {
  // You can now use `neoData` here
  neoData = res;

  neos = renderNEOs(neoData);

});

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
  const tiltFactor = 2; // Adjust this factor to control the tilt angle
  for (let i = 0; i <= numSegments; i++) {
    const angle = (i / numSegments) * Math.PI * 2;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);

    // Gradually adjust the y-coordinate for the tilt effect
    const y = tiltFactor * Math.sin(angle * 2); // Modify the Y based on the angle, creating a slight up-and-down tilt

    lineLoopPoints.push(x, y, z); // Push the slightly tilted Y-coordinate along with X and Z
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(lineLoopPoints, 3)
  );

  const lineLoop = new THREE.LineLoop(geometry, material);

  // Randomize the rotation around the Y-axis (optional)
  const randomRotationAngle = Math.random() * Math.PI * 2; // Random angle between 0 and 2π
  lineLoop.rotation.y = randomRotationAngle; // Apply the random rotation

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
  // {
  //   ...generatePlanet(3.2, mercuryTexture, 28),
  //   rotaing_speed_around_sun: 0.004,
  //   self_rotation_speed: 0.004,
  // },
  // {
  //   ...generatePlanet(5.8, venusTexture, 44),
  //   rotaing_speed_around_sun: 0.015,
  //   self_rotation_speed: 0.002,
  // },
  // {
  //   ...generatePlanet(6, earthTexture, 62),
  //   rotaing_speed_around_sun: 0.01,
  //   self_rotation_speed: 0.02,
  // },
  // {
  //   ...generatePlanet(4, marsTexture, 78),
  //   rotaing_speed_around_sun: 0.008,
  //   self_rotation_speed: 0.018,
  // },
  // {
  //   ...generatePlanet(12, jupiterTexture, 100),
  //   rotaing_speed_around_sun: 0.002,
  //   self_rotation_speed: 0.04,
  // },
  // {
  //   ...generatePlanet(10, saturnTexture, 138, {
  //     innerRadius: 10,
  //     outerRadius: 20,
  //     ringmat: saturnRingTexture,
  //   }),
  //   rotaing_speed_around_sun: 0.0009,
  //   self_rotation_speed: 0.038,
  // },
  // {
  //   ...generatePlanet(7, uranusTexture, 176, {
  //     innerRadius: 7,
  //     outerRadius: 12,
  //     ringmat: uranusRingTexture,
  //   }),
  //   rotaing_speed_around_sun: 0.0004,
  //   self_rotation_speed: 0.03,
  // },
  // {
  //   ...generatePlanet(7, neptuneTexture, 200),
  //   rotaing_speed_around_sun: 0.0001,
  //   self_rotation_speed: 0.032,
  // },
  // {
  //   ...generatePlanet(2.8, plutoTexture, 216),
  //   rotaing_speed_around_sun: 0.0007,
  //   self_rotation_speed: 0.008,
  // },
];

// Function to generate a Near-Earth Object (NEO)
const generateNEO = (size, texture, x) => {
  const neoGeometry = new THREE.SphereGeometry(size * 0.5, 50, 50); // Smaller size for NEO
  const neoMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    // color: 0xff0000, // Red color for NEOs
  });
  const neo = new THREE.Mesh(neoGeometry, neoMaterial);
  neo.position.set(x, 0, 0);

  const neoObj = new THREE.Object3D();
  scene.add(neoObj);
  neoObj.add(neo);

  createLineLoopWithMesh(x, 0x008000, 1); // Custom color and smaller orbit for NEO

  return {
    neoObj: neoObj,
    neo: neo,
  };
};

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
    // Randomize size based on a combination of eccentricity (`e`), inclination (`i_deg`), and moid (`moid_au`)
    const eccentricity = parseFloat(neo.e);
    const inclination = parseFloat(neo.i_deg);
    const moid = parseFloat(neo.moid_au);

    // Normalize values to control the size
    const sizeFactor = (eccentricity + inclination + moid) / 10;
    let size = Math.random() * sizeFactor + 0.5; // Random size between 0.5 and `sizeFactor`

    const planetTexture = new THREE.TextureLoader().load("./image/assets/asteriods.jpg"); // Texture for NEOs

    // Use perihelion distance (`q_au_1`) to calculate position (x)
    const distanceAU = parseFloat(neo.q_au_1); // Parse perihelion distance in AU
    const distanceMultiplier = 150; // Scaling factor for visualization
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
