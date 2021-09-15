import * as THREE from 'three';

export default class Point extends THREE.Mesh {
    constructor(x, y, oldX, oldY, locked) {
        super();

        this.type = "point";
        this.locked = locked;
        this.unlockedColor = 0xffffff;
        this.lockedColor = 0xff5382

        if (this.locked) {
            this.defaultColor = 0xff5382;
        }
        else {
            this.defaultColor = 0xffffff;
        }

        // created the mesh before you assign a position
        this.geometry = new THREE.CircleGeometry(0.1, 16);
        this.material = new THREE.MeshBasicMaterial({ 
            color: this.defaultColor,
            side: THREE.FrontSide
        });

        this.bounce = 0.9;
        this.gravity = -0.001;
        this.friction = 0.999;

        // assign the position now the mesh is created keep track of old position
        this.position.x = x;
        this.position.y = y;

        this.prevPosition = new THREE.Vector3();
        this.prevPosition.x = this.position.x - oldX;
        this.prevPosition.y = this.position.y - oldY;


    }

    updatePoint() {
        if (!this.locked) {
            var vx = (this.position.x - this.prevPosition.x) * this.friction;
            var vy = (this.position.y - this.prevPosition.y) * this.friction;

            this.prevPosition.x = this.position.x;
            this.prevPosition.y = this.position.y;

            this.position.x += vx;
            this.position.y += vy;

            this.position.y += this.gravity;

            // this.updateMatrixWorld();
        }
    }

    constrainPoint(sceneW, sceneH) {
        if (!this.locked) {
            var vx = (this.position.x - this.prevPosition.x) * this.friction;
            var vy = (this.position.y - this.prevPosition.y) * this.friction;

            if (this.position.x > sceneW / 2) {
                this.position.x = sceneW / 2;
                this.prevPosition.x = this.position.x + vx * this.bounce;
            }
            else if (this.position.x < -sceneW / 2) {
                this.position.x = -sceneW / 2;
                this.prevPosition.x = this.position.x + vx * this.bounce;
            }

            if (this.position.y > sceneH / 2) {
                this.position.y = sceneH / 2;
                this.prevPosition.y = this.position.y + vy * this.bounce;
            }
            else if (this.position.y < -sceneH / 2) {
                this.position.y = -sceneH / 2;
                this.prevPosition.y = this.position.y + vy * this.bounce;
            }

            // this.updateMatrixWorld();
        }
    }

    updateColor() {
        if (this.locked) {
            this.defaultColor = 0xff5382;
        }
        else {
            this.defaultColor = 0xffffff;
        }
    }
}