import { Vector2 } from "three";

const bounce = 0.9;
const gravity = -0.004;
const friction = 0.999;

export default class Point {

    constructor(x, y, locked) {

        this.position = new Vector2(x, y);
        this.prevPosition;
        this.locked = locked

    }

    setPreviousPosition(prevX, prevY) {
        this.prevPosition = new Vector2(prevX, prevY);
    }

    updatePoint() {

        if (!this.locked) {

            var vx = (this.position.x - this.prevPosition.x) * friction;
            var vy = (this.position.y - this.prevPosition.y) * friction;

            this.prevPosition.x = this.position.x;
            this.prevPosition.y = this.position.y;

            this.position.x += vx;
            this.position.y += vy;

            this.position.y += gravity;

        }

    }

    constrainPoint(sceneW, sceneH) {

        if (!this.locked) {

            var vx = (this.position.x - this.prevPosition.x) * friction;
            var vy = (this.position.y - this.prevPosition.y) * friction;

            if (this.position.x > sceneW / 2) {
                this.position.x = sceneW / 2;
                this.prevPosition.x = this.position.x + vx * bounce;
            }
            else if (this.position.x < -sceneW / 2) {
                this.position.x = -sceneW / 2;
                this.prevPosition.x = this.position.x + vx * bounce;
            }

            if (this.position.y > sceneH / 2) {
                this.position.y = sceneH / 2;
                this.prevPosition.y = this.position.y + vy * bounce;
            }
            else if (this.position.y < -sceneH / 2) {
                this.position.y = -sceneH / 2;
                this.prevPosition.y = this.position.y + vy * bounce;
            }

        }

    }

}