import * as THREE from 'three';

import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';

import * as GeometryUtils from './GeometryUtils';

export default class Line extends Line2 {
    // takes an x and y position and size
    constructor(p, width, dashed) {
        super();

        var points = [];

        if (Array.isArray(p)) {
            points = p;
        }
        else {

            // points for hilbert3D shape
            // points = GeometryUtils.hilbert3D(new THREE.Vector3(0, 0, 0), 20.0, 1, 0, 1, 2, 3, 4, 5, 6, 7);

            // points.push(new THREE.Vector3(15, 0, 0))
            // points.push(new THREE.Vector3(-15, 0, 0))
        }

        // generates a curve from through the points
        const spline = new THREE.CatmullRomCurve3(points);
        // how smooth the triangles are (very noticable on curved lines)
        const divisions = Math.round(12 * points.length);

        const positions = [];

        for (let i = 0, l = divisions; i < l; i++) {

            let t = i / l;

            let point = spline.getPoint(t);
            positions.push(point.x, point.y, point.z);

        }

        // Line2 ( LineGeometry, LineMaterial )
        var geometry = new LineGeometry();
        geometry.setPositions(positions);

        this.matLine = new LineMaterial({
            color: 0xffffff,
            linewidth: width,
            //resolution:  // to be set by renderer, eventually
            dashed: dashed,
            dashScale: 1,
            alphaToCoverage: true,
        });

        this.mesh = new THREE.InstancedMesh(geometry, this.matLine, 1);

        this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

        // for rendering dotted lines
        // this.computeLineDistances();
        // this.scale.set(1, 1, 1);

    }

    // contains animation logic
    update() {
        
    }

    changeDashType(dash) {
        if (dash == 0) {
            this.matLine.dashSize = 2;
            this.matLine.gapSize = 1;
        }
        else if (dash == 1) {
            this.matLine.dashSize = 1;
            this.atLine.gapSize = 1;
        }
        else if (dash == 2) {
            this.matLine.dashSize = 1;
            this.matLine.gapSize = 2;
        }
    }
}