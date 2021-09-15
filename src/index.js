import * as THREE from 'three';

import Stats from 'three/examples/jsm/libs/stats.module.js';

import { initInstanceObjects } from './instance/InstanceInit.js';

require('normalize.css/normalize.css');
require("./index.css");

//

let renderer, scene, camera;
let container, stats;
let raycaster, color, mouse, leftMouseButtonDown;
let instanceSticks, instancePoints;
let dist;

//

window.onload = function () {

    dist = 15;

    init();
    initObjects();
    initRaycaster();
    initStats();

    animate();

    initEventListeners();
    onWindowResize();
}

//

function init() {

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    container = document.getElementById('canvas');
    container.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, dist);

    scene = new THREE.Scene();

}

//

function initObjects() {

    var dimensions = getTrueCanvasSize()
    var canvasW = dimensions[0];
    var canvasH = dimensions[1];

    var instancedObj = initInstanceObjects(canvasW, canvasH);
    instancePoints = instancedObj[0];
    instanceSticks = instancedObj[1];

    scene.add(instancePoints.mesh);
    scene.add(instanceSticks.mesh);

}

//

function initStats() {

    stats = new Stats();
    document.body.appendChild(stats.dom);

}

//

function initRaycaster() {

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2(30, 30);

    color = new THREE.Color(0xff0000);

}

//

function animate() {

    requestAnimationFrame(animate);

    raycaster.setFromCamera(mouse, camera);

    instancePoints.updatePoints();

    var selected = raycastPoints();

    instanceSticks.update();

    if (selected == false) {
        raycastSticks();
    }

    stats.update();

    renderer.render(scene, camera);

}

//

function raycastPoints() {

    var selected = false;

    var intersection = raycaster.intersectObject(instancePoints.mesh);

    if (intersection.length > 0) {

        var intersectionId = intersection[0].instanceId;

        instancePoints.mesh.setColorAt(intersectionId, color);
        instancePoints.mesh.instanceColor.needsUpdate = true;

        selected = true

        // if (leftMouseButtonDown) {
        //     instancePoints.points[intersectionId].toggleLocked();
        // }

    }

    return selected;
}

//

function raycastSticks() {

    var intersection = raycaster.intersectObject(instanceSticks.mesh);

    if (intersection.length > 0) {

        var intersectionId = intersection[0].instanceId;

        instanceSticks.mesh.setColorAt(intersectionId, color);
        instanceSticks.mesh.instanceColor.needsUpdate = true;

        if (leftMouseButtonDown) {
            instanceSticks.sticks.splice(intersectionId, 1);
            instanceSticks.mesh.count = instanceSticks.sticks.length;
        }

    }
}

//

// calculates the size of the bounding box of what is visible on the canvas given
// different screen sizes
function getTrueCanvasSize() {

    var returnArray = [];

    var vFOV = THREE.MathUtils.degToRad(camera.fov); // convert vertical fov to radians

    var canvasH = 2 * Math.tan(vFOV / 2) * dist; // visible height
    // camera aspect changes on resize
    var canvasW = canvasH * camera.aspect;           // visible width

    returnArray.push(canvasW);
    returnArray.push(canvasH);

    return returnArray;

}

//

function initEventListeners() {

    document.body.onmousedown = setLeftButtonState;
    document.body.onmousemove = setLeftButtonState;
    document.body.onmouseup = setLeftButtonState;


    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onMouseMove);
}

/*
 *  CODE BELOW IS FOR EVENT LISTENERS 
 */

function setLeftButtonState(e) {
    leftMouseButtonDown = e.buttons === undefined
        ? e.which === 1
        : e.buttons === 1;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

//

function onMouseMove(event) {

    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

}

