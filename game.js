import * as THREE from "three"
const SoftwareRenderer = require("three-software-renderer");
const PNG = require("pngjs").PNG;
const fs = require("fs");

// Build scene with cube
const width = 1024;
const height = 768;

const camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000);
camera.position.z = 500;

// Create a simple red cube
const geometry = new THREE.BoxGeometry(200, 200, 200);
const material = new THREE.MeshBasicMaterial({color: 0xff0000});
const mesh = new THREE.Mesh(geometry, material);

// Rotate the cube a bit
mesh.rotation.x += 0.5;
mesh.rotation.y += 0.6;

const scene = new THREE.Scene();
scene.add(mesh);

// Render into an Uint8ClampedArray (RGBA).
const renderer = new SoftwareRenderer({
  alpha: false
});
renderer.setSize(width, height);
var imagedata = renderer.render(scene, camera);

// Create a PNG from the array
const png = new PNG({
  width: width,
  height: height,
  filterType: -1
});

// Copy byte array to png object
for(var i=0;i<imagedata.data.length;i++) {
  png.data[i] = imagedata.data[i];
}

// Write PNG to disk
if (!fs.existsSync("temp")) {
  fs.mkdirSync("temp");
}
png.pack().pipe(fs.createWriteStream("temp/example.png"));

export {width}
