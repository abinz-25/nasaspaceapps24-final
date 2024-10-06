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
fetchNeoData().then((res) => {
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
console.log("Apply cube texture",cubeTexture);
scene.background = starTexture; // Set the background to the star texture
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
  const tiltFactor = 0.5; // Adjust this factor to control the tilt angle
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

// Function to generate a Near-Earth Object (NEO)
const generateNEO = (size, texture, x, name = "") => {
  const neoGeometry = new THREE.SphereGeometry(size * 0.5, 50, 50); // Smaller size for NEO
  const neoMaterial = new THREE.MeshStandardMaterial({
    map: texture,
  });
  const neo = new THREE.Mesh(neoGeometry, neoMaterial);
  neo.position.set(x, 0, 0);

  const neoObj = new THREE.Object3D();
  scene.add(neoObj);
  neoObj.add(neo);

  createLineLoopWithMesh(x, 0x008000, 1); // Custom color and smaller orbit for NEO

  // Create a sprite to display the name of the NEO
  const nameSprite = createTextSprite(name);
  nameSprite.position.set(neo.position.x, size * 1.2, neo.position.z); // Position label slightly above the NEO
  neoObj.add(nameSprite); // Add the name sprite to the same object group

  return {
    neoObj: neoObj,
    neo: neo,
    nameSprite: nameSprite,
    size: size // Return the sprite for dynamic updates
  };
};

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

 // Update the rotation and position of NEOs and their name sprites
 neos.forEach(
  ({ neoObj, neo, nameSprite, size, rotaing_speed_around_sun, self_rotation_speed }) => {
    // Rotate around the sun
    neoObj.rotateY(options.speed * rotaing_speed_around_sun);

    // Self-rotation of the NEO
    neo.rotateY(options.speed * self_rotation_speed);

    // Update the name sprite's position to follow the NEO
    nameSprite.position.set(neo.position.x, neo.position.y + size * 1.2, neo.position.z);
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

    const planetTexture = new THREE.TextureLoader().load(
      "./image/asteriods.jpg"
    ); // Texture for NEOs

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
    const neoObj = generateNEO(size, planetTexture, x, neo.object_name); // Generate NEO with name

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

// Function to create a sprite for text (NEO name)
const createTextSprite = (text) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = "48px Arial"; // Define font size and style
  context.fillStyle = "white"; // Text color
  context.fillText(text, 0, 50); // Draw text on canvas

  const texture = new THREE.CanvasTexture(canvas);
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(spriteMaterial);

  sprite.scale.set(10, 5, 1); // Adjust scale for visibility

  return sprite;
};
