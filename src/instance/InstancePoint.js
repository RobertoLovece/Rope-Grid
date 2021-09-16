import * as THREE from 'three';

const dummy = new THREE.Object3D();

//

export default class InstancePoint {

    constructor(points, radius) {

        this.points = points;

        var geometry = new THREE.CircleGeometry(radius, 16);
        // var geometry = new THREE.SphereGeometry(radius, 16, 16);
        // const geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial(0xffffff);

        this.mesh = new THREE.InstancedMesh(geometry, material, this.points.length);

        this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // will be updated every frame

    }

    //

    updatePoints() {

        // update points in random order
        var random = this.generateRandomIndexes(this.points.length);

        for (let i = 0; i < this.points.length; i++) {

            var index = random[i];
            var point = this.points[index]; 
            
            point.updatePoint();

            dummy.position.set(point.position.x, point.position.y, 0);

            dummy.updateMatrix();

            this.mesh.setMatrixAt(index, dummy.matrix);

            var color = new THREE.Color(point.defaultColor);

            this.mesh.setColorAt(index, color);
        }

        this.mesh.instanceMatrix.needsUpdate = true;
        this.mesh.instanceColor.needsUpdate = true;

    }

    //

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

    //

    generateRandomIndexes(length) {

        var array = [];

        for (let i = 0 ; i < length ; i++) {
            array.push(i);
        }

        var currentIndex = array.length, temporaryValue, randomIndex;
    
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
    
        return array;
        
    }

    //

    randomArrayShuffle(array) {
    
        var currentIndex = array.length, temporaryValue, randomIndex;
    
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
    
        return array;
    }

}