
// keep
// snakeTailPositions

// wallTriangle
// listWallTriangle

function handleCellEdgeCases(newCell) {
    return newCell;
    if(newCell["rowI"] < 0) {
        // keep
        newCell["rowI"] = TOTAL_ROWS - 1;
        newCell["colI"] = newCell["colI"];
    }
    if(newCell["rowI"] >= TOTAL_ROWS) {
        newCell["rowI"] = 0;
        newCell["colI"] = newCell["colI"];
    }
    if(newCell["colI"] < 0) {
        newCell["rowI"] = newCell["rowI"];
        newCell["colI"] = TOTAL_COLS - 1;
    }
    if(newCell["colI"] >= TOTAL_COLS) {
        newCell["rowI"] = newCell["rowI"];
        newCell["colI"] = 0;
    }
    return newCell;
}

function provideMoveCostHorizontal() {
    return 10;
}
function provideMoveCostVertical() {
    return 10;
}
function provideMoveCostDiagonalLeft() {
    return 14;
}
function provideMoveCostDiagonalRight() {
    return 14;
}

function provideDistanceCost(currSnakeHeadPosition, goalPosition) {
    return (Math.abs(goalPosition["rowI"] - currSnakeHeadPosition["rowI"])
        + Math.abs(goalPosition["colI"] - currSnakeHeadPosition["colI"])) * 10;
}

function _calculateNextTurnAStar() {

}


function padCellNum(cellNum){
    if(cellNum >= 0) {
        // keep
        if(cellNum < 10) {
            return `0${cellNum}`;
        }
    } else if (cellNum < 0) {
        if(cellNum > -10) {
            return `-0${Math.abs(cellNum)}`;
        }
    }

    return cellNum;
}

function provideInBoard(cell) {
    if(newCell["rowI"] < 0) {
        // keep
        return false;
    }
    if(newCell["rowI"] > TOTAL_ROWS) {
        return false;
    }
    if(newCell["colI"] < 0) {
        return false;
    }
    if(newCell["colI"] > TOTAL_COLS) {
        return false;
    }
    return true;
}

function _openRootCell(rootCell, goalPosition, breathCells) {
    var minTotalCostCell;
    var minTotalCostValue = Number.MAX_SAFE_INTEGER;

    // get up cell
    var pretendents = {};
    var newTurn = {
        "rowI": rootCell["rowI"] -1,
        "colI": rootCell["colI"],
    };
    newTurn = handleCellEdgeCases(newTurn);


    if('barrier' === breathCells[`cell_${padCellNum(newTurn["rowI"])}_${padCellNum(newTurn["colI"])}`]['status']) {
        // keep
        newTurn["status"] = "barrier";
    } else {
        newTurn["status"] = "available-to-open";
        pretendents[`cell_${newTurn["rowI"]}_${newTurn["colI"]}`] = newTurn;
    }
    breathCells[`cell_${padCellNum(newTurn["rowI"])}_${padCellNum(newTurn["colI"])}`] = newTurn;


    // up-left
    newTurn = {
        "rowI": rootCell["rowI"] -1,
        "colI": rootCell["colI"] - 1,
    };
    newTurn = handleCellEdgeCases(newTurn);
    newTurn["status"] = "available-to-open";
    newTurn["from_pretendents"] = [rootCell];

    if('barrier' === breathCells[`cell_${padCellNum(newTurn["rowI"])}_${padCellNum(newTurn["colI"])}`]['status']) {
        // keep
        newTurn["status"] = "barrier";
    } else {
        newTurn["status"] = "available-to-open";
        pretendents[`cell_${newTurn["rowI"]}_${newTurn["colI"]}`] = newTurn;
    }
    breathCells[`cell_${padCellNum(newTurn["rowI"])}_${padCellNum(newTurn["colI"])}`] = newTurn;

    // left
    newTurn = {
        "rowI": rootCell["rowI"],
        "colI": rootCell["colI"] - 1,
    };
    newTurn = handleCellEdgeCases(newTurn);
    newTurn["status"] = "available-to-open";
    newTurn["from_pretendents"] = [rootCell];

    if('barrier' === breathCells[`cell_${padCellNum(newTurn["rowI"])}_${padCellNum(newTurn["colI"])}`]['status']) {
        // keep
        newTurn["status"] = "barrier";
    } else {
        newTurn["status"] = "available-to-open";
        pretendents[`cell_${newTurn["rowI"]}_${newTurn["colI"]}`] = newTurn;
    }
    breathCells[`cell_${padCellNum(newTurn["rowI"])}_${padCellNum(newTurn["colI"])}`] = newTurn;

    // down-left
    newTurn = {
        "rowI": rootCell["rowI"] + 1,
        "colI": rootCell["colI"] - 1
    };
    newTurn = handleCellEdgeCases(newTurn);
    newTurn["status"] = "available-to-open";
    newTurn["from_pretendents"] = [rootCell];

    if('barrier' === breathCells[`cell_${padCellNum(newTurn["rowI"])}_${padCellNum(newTurn["colI"])}`]['status']) {
        // keep
        newTurn["status"] = "barrier";
    } else {
        newTurn["status"] = "available-to-open";
        pretendents[`cell_${newTurn["rowI"]}_${newTurn["colI"]}`] = newTurn;
    }
    breathCells[`cell_${padCellNum(newTurn["rowI"])}_${padCellNum(newTurn["colI"])}`] = newTurn;

    // down
    newTurn = {
        "rowI": rootCell["rowI"] + 1,
        "colI": rootCell["colI"],
    };
    newTurn = handleCellEdgeCases(newTurn);
    newTurn["status"] = "available-to-open";
    newTurn["from_pretendents"] = [rootCell];

    if('barrier' === breathCells[`cell_${padCellNum(newTurn["rowI"])}_${padCellNum(newTurn["colI"])}`]['status']) {
        // keep
        newTurn["status"] = "barrier";
    } else {
        newTurn["status"] = "available-to-open";
        pretendents[`cell_${newTurn["rowI"]}_${newTurn["colI"]}`] = newTurn;
    }
    breathCells[`cell_${padCellNum(newTurn["rowI"])}_${padCellNum(newTurn["colI"])}`] = newTurn;

    // down-right
    newTurn = {
        "rowI": rootCell["rowI"] + 1,
        "colI": rootCell["colI"] + 1,
    };
    newTurn = handleCellEdgeCases(newTurn);
    newTurn["status"] = "available-to-open";
    newTurn["from_pretendents"] = [rootCell];

    if('barrier' === breathCells[`cell_${padCellNum(newTurn["rowI"])}_${padCellNum(newTurn["colI"])}`]['status']) {
        // keep
        newTurn["status"] = "barrier";
    } else {
        newTurn["status"] = "available-to-open";
        pretendents[`cell_${newTurn["rowI"]}_${newTurn["colI"]}`] = newTurn;
    }
    breathCells[`cell_${padCellNum(newTurn["rowI"])}_${padCellNum(newTurn["colI"])}`] = newTurn;

    // right
    newTurn = {
        "rowI": rootCell["rowI"],
        "colI": rootCell["colI"] + 1,
    };
    newTurn = handleCellEdgeCases(newTurn);
    newTurn["status"] = "available-to-open";
    newTurn["from_pretendents"] = [rootCell];

    if('barrier' === breathCells[`cell_${padCellNum(newTurn["rowI"])}_${padCellNum(newTurn["colI"])}`]['status']) {
        // keep
        newTurn["status"] = "barrier";
    } else {
        newTurn["status"] = "available-to-open";
        pretendents[`cell_${newTurn["rowI"]}_${newTurn["colI"]}`] = newTurn;
    }
    breathCells[`cell_${padCellNum(newTurn["rowI"])}_${padCellNum(newTurn["colI"])}`] = newTurn;

    // up-right
    newTurn = {
        "rowI": rootCell["rowI"] - 1,
        "colI": rootCell["colI"] + 1,
    };
    newTurn = handleCellEdgeCases(newTurn);
    newTurn["status"] = "available-to-open";
    newTurn["from_pretendents"] = [rootCell];

    if('barrier' === breathCells[`cell_${padCellNum(newTurn["rowI"])}_${padCellNum(newTurn["colI"])}`]['status']) {
        // keep
        newTurn["status"] = "barrier";
    } else {
        newTurn["status"] = "available-to-open";
        pretendents[`cell_${newTurn["rowI"]}_${newTurn["colI"]}`] = newTurn;
    }
    breathCells[`cell_${padCellNum(newTurn["rowI"])}_${padCellNum(newTurn["colI"])}`] = newTurn;


    breathCells[`cell_${padCellNum(rootCell["rowI"])}_${padCellNum(rootCell["colI"])}`]["status"] = "opened";

    return { nextTurn: null, pretendents };
}

function markBarrierCell(position, breathCells) {
    breathCells[`cell_${padCellNum(position["rowI"])}_${padCellNum(position["colI"])}`]['status'] = 'barrier'
}

function _calculatePreviewTurnsForThisRoundShortestPath(currSnakeHeadPosition, goalPosition, breathCells) {
    // _calculateNextTurnAStar
    // when nextTurn calculated; nextTurn inside reachedPretendents

    // graph
    var breathCells = {};
    for(var i = 0 ; i < TOTAL_ROWS; i++) {
        for(var j = 0; j < TOTAL_COLS; j++) {
            breathCells[`cell_${padCellNum(i)}_${padCellNum(j)}`] = {
                "rowI": i,
                "colI": j,
                "status": "available-to-open",
            }
        }
    }


    // add top barrier row
    var i = -1;
    for(var j = 0; j <= TOTAL_COLS; j++) {
        breathCells[`cell_${padCellNum(i)}_${padCellNum(j)}`] = {
            "rowI": i,
            "colI": j,
            "status": "barrier",
        }
    }
    // add bottom barrier row
    var i = TOTAL_ROWS;
    for(var j = 0; j <= TOTAL_COLS; j++) {
        breathCells[`cell_${padCellNum(i)}_${padCellNum(j)}`] = {
            "rowI": i,
            "colI": j,
            "status": "barrier",
        }
    }

    // add left barrier col
    var j = -1;
    for(var i = -1 ; i <= TOTAL_ROWS; i++) {
        breathCells[`cell_${padCellNum(i)}_${padCellNum(j)}`] = {
            "rowI": i,
            "colI": j,
            "status": "barrier",
        }
    }
    // add right barrier col
    var j = TOTAL_COLS;
    for(var i = -1 ; i <= TOTAL_ROWS; i++) {
        breathCells[`cell_${padCellNum(i)}_${padCellNum(j)}`] = {
            "rowI": i,
            "colI": j,
            "status": "barrier",
        }
    }

    listWallTriangle.map((wallTriangle) => {
        markBarrierCell(wallTriangle["startPosition"], breathCells);
        markBarrierCell(wallTriangle["centerPosition"], breathCells);
        markBarrierCell(wallTriangle["endPosition"], breathCells);
    })


    // root cell
    var startingCell = {
        "rowI": currSnakeHeadPosition["rowI"],
        "colI": currSnakeHeadPosition["colI"],

        "type": "root_cell"
    };
    startingCell["status"] = "available-to-open";

    breathCells[`cell_${padCellNum(startingCell["rowI"])}_${padCellNum(startingCell["colI"])}`] = startingCell;

    var targetCell = {
        "rowI": goalPosition["rowI"],
        "colI": goalPosition["colI"],

        "type": "goal_cell"
    }

    // pretendents
    var nextTurns = [];

    var visitedMap = {};


    var startingPath = [startingCell];
    var queue = [startingPath];


    while(queue.length) {
        var path = queue.shift();
        var node = path[path.length-1];

        if(Object.keys(visitedMap).indexOf(`cell_${padCellNum(node["rowI"])}_${padCellNum(node["colI"])}`) === -1) {
            visitedMap[`cell_${padCellNum(node["rowI"])}_${padCellNum(node["colI"])}`] = node;

            // neighbors
            var { nextTurn, pretendents } = _openRootCell(node, goalPosition, breathCells);

            for(var i = 0; i < Object.keys(pretendents).length; i++) {
                var key = Object.keys(pretendents)[i];

                var insideTail = [false].concat(snakeTailPositions).reduce((prev, curr) => {
                    return prev || (pretendents[key]["rowI"] === curr["rowI"] && pretendents[key]["colI"] === curr["colI"]);
                })
                if(insideTail) {
                    continue;
                }
                const newPath = path.concat([pretendents[key]]);

                if(pretendents[key]["rowI"] === goalPosition["rowI"] && pretendents[key]["colI"] === goalPosition["colI"]) {
                    return newPath;
                }

                queue.push(newPath);
            }
        }
    }

    return nextTurns;
}

function calculatePreviewTurnsForThisRoundShortestPath() {
    // keep
    var breathCells = {};
    return _calculatePreviewTurnsForThisRoundShortestPath(currSnakeHeadPosition, goalPosition, breathCells);
}