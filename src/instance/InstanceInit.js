import * as THREE from 'three';

import InstancePoint from './InstancePoint.js'
import InstanceStick from './InstanceStick.js'

import Stick from './stick.js'
import Point from './point.js';

export function initInstanceObjects() {

    var returnArray = [];

    // init points

    var point0 = new Point(0, -1, true);
    var point1 = new Point(2, 1, false);

    var point2 = new Point(4, 0, true);
    var point3 = new Point(3, 2, false);

    var points = [];

    points.push(point0);
    points.push(point1);
    points.push(point2);
    points.push(point3);

    points.forEach(function(point) {
        point.setPreviousPosition(point.position.x, point.position.y)
    });

    var instancePoints = new InstancePoint(points);

    // init of sticks
    var sticks = [];
        
    sticks.push(new Stick(point0, point1));
    sticks.push(new Stick(point2, point3));

    var instanceSticks = new InstanceStick(sticks, 0.05);

    returnArray.push(instancePoints);
    returnArray.push(instanceSticks);

    return returnArray;

}





