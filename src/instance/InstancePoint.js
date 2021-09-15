import * as THREE from 'three';

const dummy = new THREE.Object3D();

export default class InstancePoint {

    constructor(points) {

        this.points = points;
        console.log(points.length);

        var geometry = new THREE.CircleGeometry(0.1, 16);
        // const geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial(0xffffff);

        this.mesh = new THREE.InstancedMesh(geometry, material, points.length);

        this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // will be updated every frame

    }

    updatePoints() {

        for (let i = 0; i < this.points.length; i++) {

            console.log(i);

            var point = this.points[i]; 
            
            point.updatePoint();

            dummy.position.set(point.position.x, point.position.y, 0);

            dummy.updateMatrix();

            this.mesh.setMatrixAt(i, dummy.matrix);
        }

        this.mesh.instanceMatrix.needsUpdate = true;

    }

    constrainPoints(sceneW, sceneH) {

        for (let i = 0; i < this.points.length; i++) {

            var point = this.points[i]; 

            point.constrainPoint(sceneW, sceneH);

            dummy.position.set(point.position.x, point.position.y, 0);

            dummy.updateMatrix();

            this.mesh.setMatrixAt(i++, dummy.matrix);
        }

        this.mesh.instanceMatrix.needsUpdate = true;
    }

}