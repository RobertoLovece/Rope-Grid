import * as THREE from 'three';

const dummy = new THREE.Object3D();

export default class InstanceStick {
    // takes an x and y position and size
    constructor(sticks, width) {

        this.sticks = sticks;

        this.geometry = new THREE.PlaneBufferGeometry(width, 1);
    
        this.matLine = new THREE.MeshBasicMaterial(0xffffff);

        this.mesh = new THREE.InstancedMesh(this.geometry, this.matLine, this.sticks.length);

        this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    }

    update() {

        for (let i = 0; i < this.sticks.length; i++) {
            
            var stick = this.sticks[i];

            var mid = this.centerMidPoint(stick.p0, stick.p1)
            var midX = mid.x;
            var midY = mid.y;
            dummy.position.set(midX,midY,-0.01);

            var angle = (this.angleBetweenPoints(stick.p0, stick.p1)) * 1;
            dummy.rotation.set(0,0, angle);
        
            var dist = stick.distance(stick.p0, stick.p1);
            dummy.scale.set(1,dist,1);

            dummy.updateMatrix();

            this.mesh.setMatrixAt(i, dummy.matrix);

            stick.updateStick();

        }

        this.mesh.instanceMatrix.needsUpdate = true;
    }

    updateSticks() {

        for (let i = 0; i < this.sticks.length; i++) {
            sticks[i].updateStick();
        }
    }

    centerMidPoint(p0, p1) {

        var midX = p1.position.x - ((p1.position.x - p0.position.x) / 2);
        var midY = p1.position.y - ((p1.position.y - p0.position.y) / 2);

        return new THREE.Vector2(midX, midY);

    }

    angleBetweenPoints(p0, p1) {
        var deltaY = p1.position.y - p0.position.y;
        var deltaX = p1.position.x - p0.position.x;

        return Math.atan2(deltaY, deltaX) + (90 * Math.PI/180);
    }

}