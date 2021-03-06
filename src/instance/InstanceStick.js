import * as THREE from 'three';

const dummy = new THREE.Object3D();

//

export default class InstanceStick {
    // takes an x and y position and size
    constructor(sticks, width) {

        this.sticks = sticks;

        var geometry = new THREE.PlaneBufferGeometry(width, 1);
        // var geometry = new THREE.BoxGeometry(width, 1, width);
    
        var material = new THREE.MeshBasicMaterial();

        this.mesh = new THREE.InstancedMesh(geometry, material, this.sticks.length);

        this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    }

    //

    update(delta) {

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

            var color = new THREE.Color(stick.defaultColor);

            this.mesh.setColorAt(i, color);

            stick.updateStick(delta);

        }

        this.mesh.instanceMatrix.needsUpdate = true;
        this.mesh.instanceColor.needsUpdate = true;
    }

    //

    updateSticks(delta) {

        for (let i = 0; i < this.sticks.length; i++) {
            sticks[i].updateStick(delta);
        }
    }

    //

    centerMidPoint(p0, p1) {

        var midX = p1.position.x - ((p1.position.x - p0.position.x) / 2);
        var midY = p1.position.y - ((p1.position.y - p0.position.y) / 2);

        return new THREE.Vector2(midX, midY);

    }

    //

    angleBetweenPoints(p0, p1) {
        var deltaY = p1.position.y - p0.position.y;
        var deltaX = p1.position.x - p0.position.x;

        return Math.atan2(deltaY, deltaX) + (90 * Math.PI/180);
    }

}