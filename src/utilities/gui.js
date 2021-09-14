import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';

let gui;

export function initGui(line) {

    gui = new GUI();

    const param = {
        'width': line.matLine.linewidth,
        'dashed': line.matLine.dashed,
        'dash scale': line.matLine.dashScale,
        'dash / gap': 1
    };

    gui.add(param, 'width', 1, 10).onChange(function (val) {

        line.matLine.linewidth = val;

    });

    gui.add(param, 'dashed').onChange(function (val) {

        line.matLine.dashed = val;

    });

    gui.add(param, 'dash scale', 0.5, 2, 0.1).onChange(function (val) {

        line.matLine.dashScale = val;

    });

    gui.add(param, 'dash / gap', { '2 : 1': 0, '1 : 1': 1, '1 : 2': 2 }).onChange(function (val) {

        switch (val) {

            case '0':
                line.matLine.dashSize = 2;
                line.matLine.gapSize = 1;

                break;

            case '1':
                line.matLine.dashSize = 1;
                line.atLine.gapSize = 1;

                break;

            case '2':
                line.matLine.dashSize = 1;
                line.matLine.gapSize = 2;

                break;

        }

    });

}