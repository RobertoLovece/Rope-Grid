import * as THREE from 'three';

import InstanceStick from './InstanceStick.js'

import Stick from './stick.js'
import Point from './point.js';

export function initInstanceObjects() {

    var returnArray = [];
    var points = [];

    var point0 = new Point(0, -1, 0, 0, true);
    var point1 = new Point(2, 1, 0, 0, false);

    var point2 = new Point(4, 0, 0, 0, true);
    var point3 = new Point(3, 2, 0, 0, false);

    points.push(point0);
    points.push(point1);
    points.push(point2);
    points.push(point3);

    console.log(points);

    var sticks = [];
        
    sticks.push(new Stick(point0, point1));
    sticks.push(new Stick(point2, point3));

    var instanceStick = new InstanceStick(sticks, 0.05);
    // scene.add(line.mesh);

    returnArray.push(points);
    returnArray.push(instanceStick);

    return returnArray;

}





