/**
 *   Put-Wall.js
 *   github.com/dguard/snake-breadth
 *   Licensed under the MIT license.
 *
 *   Implementation By Alexander Serditov (keep@digitallyconstructed.ru)
 **/
var wallTriangle = {
    "wallTriangleId": "",
    "startPosition": "",
    "centerPosition": "",
    "endPosition": ""
};

var listWallTriangle = [];

function putSnakeHead(position) {
    clearSnakeHead();
    snakeHeadPosition = JSON.parse(JSON.stringify(position));
    currSnakeHeadPosition = JSON.parse(JSON.stringify(position))

    previewState["snakeHead"] = {
        "rowI": position["rowI"],
        "colI": position["colI"]
    };
    var selectedRow = document.querySelectorAll('table tr')[position["rowI"]];
    var selectedCell = selectedRow.querySelectorAll('td')[position["colI"]];

    var selectedTile = selectedCell.querySelector('div');
    renderSnakeHead(selectedTile);
};

function putGoal(position) {
    clearGoal();
    goalPosition = JSON.parse(JSON.stringify(position));
    var selectedRow = document.querySelectorAll('table tr')[position["rowI"]];
    var selectedCell = selectedRow.querySelectorAll('td')[position["colI"]];

    var selectedTile = selectedCell.querySelector('div');
    renderGoal(selectedTile);
}

function renderStartWallTriangle(selectedTile) {
    var wallTriangleTile = document.createElement("div");
    wallTriangleTile.classList.add("circle-triangle");
    wallTriangleTile.style = `
    width: 14px;
    height: 14px;
    border: 2px solid rgb(99, 100, 102);
    border-radius: 15px;
    background: #b0b3b7;
  `;

    var wallTriangleInner = document.createElement("div");
    wallTriangleInner.style = `
     background: #ffffff;
     width: 6px;
     height: 6px;
     border-radius: 15px;
     margin-left: 2px;
     margin-top: 2px;
     border: 2px solid rgb(99, 100, 102);
  `;
    wallTriangleTile.appendChild(wallTriangleInner);

    selectedTile.outerHTML = wallTriangleTile.outerHTML;
}
function renderCenterWallTriangle(selectedTile) {
    var wallTriangleTile = document.createElement("div");
    wallTriangleTile.classList.add("circle-triangle");
    wallTriangleTile.style = `
    width: 14px;
    height: 14px;
    border: 2px solid rgb(99, 100, 102);
    border-radius: 15px;
    background: #b0b3b7;
  `;

    var wallTriangleInner = document.createElement("div");
    wallTriangleInner.style = `
     background: #ffffff;
     width: 6px;
     height: 6px;
     border-radius: 15px;
     margin-left: 2px;
     margin-top: 2px;
     border: 2px solid rgb(99, 100, 102);
  `;
    wallTriangleTile.appendChild(wallTriangleInner);

    selectedTile.outerHTML = wallTriangleTile.outerHTML;
}
function renderEndWallTriangle(selectedTile) {
    var wallTriangleTile = document.createElement("div");
    wallTriangleTile.classList.add("circle-triangle");
    wallTriangleTile.style = `
    width: 14px;
    height: 14px;
    border: 2px solid rgb(99, 100, 102);
    border-radius: 15px;
    background: #b0b3b7;
  `;

    var wallTriangleInner = document.createElement("div");
    wallTriangleInner.style = `
     background: #ffffff;
     width: 6px;
     height: 6px;
     border-radius: 15px;
     margin-left: 2px;
     margin-top: 2px;
     border: 2px solid rgb(99, 100, 102);
  `;
    wallTriangleTile.appendChild(wallTriangleInner);

    selectedTile.outerHTML = wallTriangleTile.outerHTML;
}

function _generateTopLeftWallTriangle() {
    var randomRowI = randomIntFromInterval(0, 8);
    var randomCellI = randomIntFromInterval(0, 27);

    var startPosition;
    var centerPosition;
    var endPosition;
    // bottom
    try {
        var selectedRow = document.querySelectorAll('table tr')[randomRowI];
        var selectedCell = selectedRow.querySelectorAll('td')[randomCellI];

        var selectedTile = selectedCell.querySelector('div');

        if(Array.from(selectedTile.classList).indexOf("circle-not-visited") >= 0) {
            // keep
        } else {
            throw new Exception("tile overlay other cell");
        }
        startPosition = {
            "rowI": randomRowI,
            "colI": randomCellI
        };
    } catch (e) {
        return _generateTopLeftWallTriangle();
    }

    // top
    try {
        var selectedRow = document.querySelectorAll('table tr')[randomRowI-1];
        var selectedCell = selectedRow.querySelectorAll('td')[randomCellI];

        var selectedTile = selectedCell.querySelector('div');
        if(Array.from(selectedTile.classList).indexOf("circle-not-visited") >= 0) {
            // keep
        } else {
            throw new Exception("tile overlay other cell");
        }
        centerPosition = {
            "rowI": randomRowI-1,
            "colI": randomCellI
        };
    } catch (e) {
        return _generateTopLeftWallTriangle();
    }

    // topLeft
    try {
        var selectedRow = document.querySelectorAll('table tr')[randomRowI-1];
        var selectedCell = selectedRow.querySelectorAll('td')[randomCellI-1];

        var selectedTile = selectedCell.querySelector('div');
        if(Array.from(selectedTile.classList).indexOf("circle-not-visited") >= 0) {
            // keep
        } else {
            throw new Exception("tile overlay other cell");
        }
        endPosition = {
            "rowI": randomRowI-1,
            "colI": randomCellI-1
        };
    } catch (e) {
        return _generateTopLeftWallTriangle();
    }

    return {startPosition, centerPosition, endPosition};
}

function _generateTopRightWallTriangle() {
    var randomRowI = randomIntFromInterval(0, 8);
    var randomCellI = randomIntFromInterval(0, 27);

    var startPosition;
    var centerPosition;
    var endPosition;
    // bottom
    try {
        var selectedRow = document.querySelectorAll('table tr')[randomRowI];
        var selectedCell = selectedRow.querySelectorAll('td')[randomCellI];

        var selectedTile = selectedCell.querySelector('div');

        if(Array.from(selectedTile.classList).indexOf("circle-not-visited") >= 0) {
            // keep
        } else {
            throw new Exception("tile overlay other cell");
        }
        startPosition = {
            "rowI": randomRowI,
            "colI": randomCellI
        };
    } catch (e) {
        return _generateTopRightWallTriangle();
    }

    // top
    try {
        var selectedRow = document.querySelectorAll('table tr')[randomRowI-1];
        var selectedCell = selectedRow.querySelectorAll('td')[randomCellI];

        var selectedTile = selectedCell.querySelector('div');
        if(Array.from(selectedTile.classList).indexOf("circle-not-visited") >= 0) {
            // keep
        } else {
            throw new Exception("tile overlay other cell");
        }
        centerPosition = {
            "rowI": randomRowI-1,
            "colI": randomCellI
        };
    } catch (e) {
        return _generateTopRightWallTriangle();
    }

    // topRight
    try {
        var selectedRow = document.querySelectorAll('table tr')[randomRowI-1];
        var selectedCell = selectedRow.querySelectorAll('td')[randomCellI+1];

        var selectedTile = selectedCell.querySelector('div');
        if(Array.from(selectedTile.classList).indexOf("circle-not-visited") >= 0) {
            // keep
        } else {
            throw new Exception("tile overlay other cell");
        }
        endPosition = {
            "rowI": randomRowI-1,
            "colI": randomCellI+1
        };
    } catch (e) {
        return _generateTopRightWallTriangle();
    }

    return {startPosition, centerPosition, endPosition};
}

function _generateBottomLeftWallTriangle() {
    var randomRowI = randomIntFromInterval(0, 8);
    var randomCellI = randomIntFromInterval(0, 27);

    var startPosition;
    var centerPosition;
    var endPosition;
    // bottom
    try {
        var selectedRow = document.querySelectorAll('table tr')[randomRowI];
        var selectedCell = selectedRow.querySelectorAll('td')[randomCellI];

        var selectedTile = selectedCell.querySelector('div');

        if(Array.from(selectedTile.classList).indexOf("circle-not-visited") >= 0) {
            // keep
        } else {
            throw new Exception("tile overlay other cell");
        }
        startPosition = {
            "rowI": randomRowI,
            "colI": randomCellI
        };
    } catch (e) {
        return _generateBottomLeftWallTriangle();
    }

    // top
    try {
        var selectedRow = document.querySelectorAll('table tr')[randomRowI+1];
        var selectedCell = selectedRow.querySelectorAll('td')[randomCellI];

        var selectedTile = selectedCell.querySelector('div');
        if(Array.from(selectedTile.classList).indexOf("circle-not-visited") >= 0) {
            // keep
        } else {
            throw new Exception("tile overlay other cell");
        }
        centerPosition = {
            "rowI": randomRowI+1,
            "colI": randomCellI
        };
    } catch (e) {
        return _generateBottomLeftWallTriangle();
    }

    // topLeft
    try {
        var selectedRow = document.querySelectorAll('table tr')[randomRowI+1];
        var selectedCell = selectedRow.querySelectorAll('td')[randomCellI-1];

        var selectedTile = selectedCell.querySelector('div');
        if(Array.from(selectedTile.classList).indexOf("circle-not-visited") >= 0) {
            // keep
        } else {
            throw new Exception("tile overlay other cell");
        }
        endPosition = {
            "rowI": randomRowI+1,
            "colI": randomCellI-1
        };
    } catch (e) {
        return _generateBottomLeftWallTriangle();
    }

    return {startPosition, centerPosition, endPosition};
}


function _generateBottomRightWallTriangle() {
    var randomRowI = randomIntFromInterval(0, 8);
    var randomCellI = randomIntFromInterval(0, 27);

    var startPosition;
    var centerPosition;
    var endPosition;
    // bottom
    try {
        var selectedRow = document.querySelectorAll('table tr')[randomRowI];
        var selectedCell = selectedRow.querySelectorAll('td')[randomCellI];

        var selectedTile = selectedCell.querySelector('div');

        if(Array.from(selectedTile.classList).indexOf("circle-not-visited") >= 0) {
            // keep
        } else {
            throw new Exception("tile overlay other cell");
        }
        startPosition = {
            "rowI": randomRowI,
            "colI": randomCellI
        };
    } catch (e) {
        return _generateBottomRightWallTriangle();
    }

    // top
    try {
        var selectedRow = document.querySelectorAll('table tr')[randomRowI+1];
        var selectedCell = selectedRow.querySelectorAll('td')[randomCellI];

        var selectedTile = selectedCell.querySelector('div');
        if(Array.from(selectedTile.classList).indexOf("circle-not-visited") >= 0) {
            // keep
        } else {
            throw new Exception("tile overlay other cell");
        }
        centerPosition = {
            "rowI": randomRowI+1,
            "colI": randomCellI
        };
    } catch (e) {
        return _generateBottomRightWallTriangle();
    }

    // topLeft
    try {
        var selectedRow = document.querySelectorAll('table tr')[randomRowI+1];
        var selectedCell = selectedRow.querySelectorAll('td')[randomCellI+1];

        var selectedTile = selectedCell.querySelector('div');
        if(Array.from(selectedTile.classList).indexOf("circle-not-visited") >= 0) {
            // keep
        } else {
            throw new Exception("tile overlay other cell");
        }
        endPosition = {
            "rowI": randomRowI+1,
            "colI": randomCellI+1
        };
    } catch (e) {
        return _generateBottomRightWallTriangle();
    }

    return {startPosition, centerPosition, endPosition};
}
function putWallTriangle(startPosition, centerPosition, endPosition) {
    // wallTriangleID
    // begin wall start
    wallTriangle['startPosition'] = JSON.parse(JSON.stringify(startPosition));
    var selectedRow = document.querySelectorAll('table tr')[wallTriangle['startPosition']["rowI"]];
    var selectedCell = selectedRow.querySelectorAll('td')[wallTriangle['startPosition']["colI"]];

    var selectedTile = selectedCell.querySelector('div');

    renderStartWallTriangle(selectedTile);
    // end wall start

    // begin wall center
    wallTriangle['centerPosition'] = JSON.parse(JSON.stringify(centerPosition));
    var selectedRow = document.querySelectorAll('table tr')[wallTriangle['centerPosition']["rowI"]];
    var selectedCell = selectedRow.querySelectorAll('td')[wallTriangle['centerPosition']["colI"]];

    var selectedTile = selectedCell.querySelector('div');

    renderCenterWallTriangle(selectedTile);
    // end wall center

    // begin wall end
    wallTriangle['endPosition'] = JSON.parse(JSON.stringify(endPosition));
    var selectedRow = document.querySelectorAll('table tr')[wallTriangle['endPosition']["rowI"]];
    var selectedCell = selectedRow.querySelectorAll('td')[wallTriangle['endPosition']["colI"]];

    var selectedTile = selectedCell.querySelector('div');

    renderEndWallTriangle(selectedTile);
    // end wall end



    // return wallTriangleId
}
function clearWallTriangle() {
    // wallTriangleId
}
