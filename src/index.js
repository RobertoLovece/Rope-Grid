import * as THREE from 'three';

import { initInstanceObjects } from './instance/InstanceInit.js';

require('normalize.css/normalize.css');
require("./index.css");

let renderer, scene, camera;
let container;
let raycaster, mouse, selectedObject;
let instanceSticks, instancePoints;

window.onload = function () {
    
    init();
    initObjects();

    animate();

    initEventListeners();
    onWindowResize();
}

function init() {

    renderer = new THREE.WebGLRenderer({ antialias: true });

    container = document.getElementById('canvas');
    container.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 15);

    scene = new THREE.Scene();

}

function initObjects() {

    var instancedObj = initInstanceObjects();
    instancePoints = instancedObj[0];
    instanceSticks = instancedObj[1];

    scene.add(instancePoints.mesh);
    scene.add(instanceSticks.mesh);

}

function initRaycaster() {

    raycaster = new THREE.Raycaster();
    raycaster.params.Line.threshold = 0.02; 
    mouse = new THREE.Vector2(30, 30);

    selectedObject = null;

}

function animate() {
    requestAnimationFrame(animate);

    instancePoints.updatePoints();

    instanceSticks.update();

    renderer.render(scene, camera);

}

function initEventListeners() {
    window.addEventListener('resize', onWindowResize, false);
    // document.addEventListener('pointermove', onPointerMove);
}

/*
 *  CODE BELOW IS FOR EVENT LISTENERS 
 */

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

// modification of code from {https://github.com/mrdoob/three.js/blob/master/examples/webgl_raycast_sprite.html}
function onPointerMove( event ) {

    if ( selectedObject ) {

        // set back to default colour and clear selected object
        selectedObject.material.color.set(0xffffff);
        selectedObject = null;

    }

    // mouse position for comparision to object positions
	// trueMouse.x = (( event.clientX / window.innerWidth ) * canvasW) - canvasW/2; 
	// trueMouse.y = -((( event.clientY / window.innerHeight ) * canvasH) - canvasH/2);

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );

    const intersects = raycaster.intersectObjects( scene.children);

    if ( intersects.length > 0 ) {

        const res = intersects.filter( function ( res ) {

            return res && res.object;

        } )[ 0 ];

        if ( res && res.object ) {

            // set the object to red when highlighted
            selectedObject = res.object;
            selectedObject.material.color.set(0xff0000);

        }

    }

}