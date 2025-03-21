import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155/build/three.module.js';

// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas') });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create Sphere
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff5733, roughness: 0.5, metalness: 0.3 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

// Lighting
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(5, 5, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.3));

// Camera Position
camera.position.z = 5;

// Drag Controls
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

window.addEventListener('mousedown', (event) => {
    isDragging = true;
    previousMousePosition = { x: event.clientX, y: event.clientY };
});

window.addEventListener('mousemove', (event) => {
    if (!isDragging) return;

    const deltaX = event.clientX - previousMousePosition.x;
    const deltaY = event.clientY - previousMousePosition.y;
    
    sphere.rotation.y += deltaX * 0.01;
    sphere.rotation.x += deltaY * 0.01;

    previousMousePosition = { x: event.clientX, y: event.clientY };
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});

// Click to Navigate
window.addEventListener('click', (event) => {
    if (!isDragging) {
        window.location.href = "index.html";  // Clicking the sphere takes you to About page
    }
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.005; // Slow auto-rotation
    renderer.render(scene, camera);
}
animate();