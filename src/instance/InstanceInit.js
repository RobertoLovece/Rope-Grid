import InstancePoint from './InstancePoint.js'
import InstanceStick from './InstanceStick.js'

import Stick from './stick.js'
import Point from './point.js';

//

export function initInstanceObjects(canvasW, canvasH) {

    var returnArray = [];

    var instanceObj = createGrid(canvasW, canvasH);
    //var instanceObj = createTest();

    returnArray.push(instanceObj[0]);
    returnArray.push(instanceObj[1]);

    return returnArray;

}

//

function createTest() {

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

    points.forEach(function (point) {
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

//

function createGrid(canvasW, canvasH) {

    var returnArray = [];

    var points = [];
    var sticks = [];

    var xCoords = [];
    var xOffset = 3;
    var xNumber = 11;
    
    var xStart = (canvasW / 2) - canvasW + xOffset
    var xEnd = (canvasW / 2) - xOffset;
    var xInterval = (xStart - xEnd) / (xNumber -1);

    for (let i = 0 ; i < xNumber ; i++ ) {
        xCoords.push(
            xStart + (i * - xInterval)
        );
    } 

    var yCoords = [];
    var yOffsetUp = 0.5;
    var yOffsetDown = 3;
    var yNumber = 8; 

    var yStart = (canvasH / 2) - canvasH + yOffsetDown
    var yEnd = (canvasH / 2) - yOffsetUp;
    var yInterval = ((yStart - yEnd) / (yNumber -1));

    for (let i = 0 ; i < yNumber ; i++ ) {
        yCoords.push(
            yEnd + (i * yInterval)
        );
    } 

    var count = 0;

    yCoords.forEach(function(y) {
        xCoords.forEach(function(x) {
            if (count == 0 || count == 5 || count == 10) {
                points.push(
                    new Point(x, y, true)
                );
            } else {
                points.push(
                    new Point(x, y, false)
                );
            }
            count+=1;
        });
    });

    points.forEach(function (point) {
        point.setPreviousPosition(point.position.x, point.position.y)
    });

    var previous = null;
    var above = null;

    points.forEach(function (current, i) {

        if (previous != null) {
            if (current.position.y == previous.position.y) {
                sticks.push(
                    new Stick(previous, current)
                );
            }
        }

        previous = current;

        if (above != null) {
            sticks.push(
                new Stick(above, current)
            );
        }

        if ((i - xNumber) >= -1) {
            above = points[i-xNumber+1];
        }

    });

    var instancePoints = new InstancePoint(points);
    var instanceSticks = new InstanceStick(sticks, 0.08);

    returnArray.push(instancePoints);
    returnArray.push(instanceSticks);

    return returnArray;

}





