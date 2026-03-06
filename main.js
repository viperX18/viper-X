// main.js

import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { HandTrack } from 'handtrackjs';

let scene, camera, renderer, controller;
let handTrack; 

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    camera.position.z = 5;
    
    // Add VR support
    document.body.appendChild(VRButton.createButton(renderer));
    renderer.xr.enabled = true;

    // Initialize hand tracking
    handTrack = HandTrack.load();
}

function animate() {
    renderer.setAnimationLoop(render);
}

function render() {
    renderer.render(scene, camera);
}

async function startHandTracking() {
    const model = await handTrack;
    model.detect(document.querySelector('video')).then(predictions => {
        console.log(predictions);
    });
}

init();
startHandTracking();
animate();