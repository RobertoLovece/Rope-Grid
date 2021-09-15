import * as THREE from 'three';

import InstanceStick from './utilities/InstanceStick.js'
import Point from './point.js';

require('normalize.css/normalize.css');
require("./index.css");

let renderer, scene, camera;
let container;
let raycaster, mouse, selectedObject;
let line, points;

window.onload = function () {
    
    init();
    initObjects();

    // initGui(line);
    // initRaycaster();

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

    points = [];

    var point0 = new Point(0, -1, 0, 0, true);
    var point1 = new Point(2, 1, 0, 0, false);

    var point2 = new Point(4, 0, 0, 0, true);
    var point3 = new Point(3, 2, 0, 0, false);

    points.push(point0);
    points.push(point1);
    points.push(point2);
    points.push(point3);

    line = new InstanceStick(point0, point1, point2, point3, 0.05);
    scene.add(line.mesh);

    points.forEach(function (point) {
        scene.add(point);
    });

}

function initRaycaster() {

    raycaster = new THREE.Raycaster();
    raycaster.params.Line.threshold = 0.02; 
    mouse = new THREE.Vector2(30, 30);

    selectedObject = null;

}

function animate() {
    requestAnimationFrame(animate);

    points.forEach(function (point) {
        point.updatePoint();
    });

    line.update();

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