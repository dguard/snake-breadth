/**
 *   Snake-Board.js
 *   github.com/dguard/snake-breadth
 *   Licensed under the MIT license.
 *
 *   Implementation By Alexander Serditov (keep@digitallyconstructed.ru)
 **/
var tiles = {
    "not-visited": {
        "not-visited": {
            "className": "not-visited"
        },
        "not-visited_variant_2": {
            "className": "not-visited not-visited_variant-2"
        },
        // snake
        "circle-highlight": {
            "className": "circle-highlight"
        },
        "circle-hightlight_tail": {
            "className": "circle-highlight circle-hightlight_variant-tail"
        }
    }
};

var previewState = {
    "snakeHead": {},
    "goal": {}
};

var CIRCLE_AVAILABLE_TILES = ["not-visited", "not-visited not-visited_variant-2"];

var TOTAL_ROWS = 9;
var TOTAL_COLS = 28;

var snakeHeadPosition = {
    "rowI": 3,
    "colI": 12
}
var goalPosition = {
    "rowI": 2,
    "colI": 23
};
var snakeTailPositions = [];
var keepLatestHeadPositions = 1;
var previewTurns = [];

var currSnakeHeadPosition = {
    "rowI": 3,
    "colI": 12
};


function renderNotVisitedTile() {
    var tile = document.createElement("div");
    tile.classList.add("circle-not-visited");
    tile.style = `
    width: 14px;
    height: 14px;
    background: #ffffff;
    border: 2px solid #636466;
    border-radius: 15px;
 `;
    return tile;
}
function renderNotVisitedTileVariant2() {
    var tile = document.createElement("div");
    tile.classList.add("circle-not-visited");
    tile.classList.add("circle-not-visited_variant-2");
    tile.style = `
    width: 14px;
    height: 14px;
    background: #e4e7ed;
    border: 2px solid #636466;
    border-radius: 15px;
  `;
    return tile;
}

// snake
function renderCircleHighlightTile() {
}
function renderCircleHighlightTileVariantTail() {
}

function renderTile(className) {
    switch(className) {
        case "not-visited":
            return renderNotVisitedTile();
        case "not-visited not-visited_variant-2":
            return renderNotVisitedTileVariant2();
        // snake
        case "circle-hightlight":
            return renderCircleHighlightTile();
        case "circle-hightlight_tail":
            return renderCircleHighlightTileVariantTile();

    }
}

function renderRow(row_i, cellsCount) {
    var row = document.createElement('tr');
    // var availableTiles = ["not-visited", "not-visited not-visited_variant-2"];

    Array.from(Array(cellsCount)).map((cell_i) => {
        var cell = renderCell(row_i, cell_i, CIRCLE_AVAILABLE_TILES);
        row.appendChild(cell);
    })
    return row;
}
function renderCell(row_i, cell_i, availableTiles) {
    var cell = document.createElement("td");
    var selectedTile = choice(availableTiles);
    var tile = renderTile(selectedTile);

    cell.appendChild(tile);
    return cell;
}

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function choice(arr) {
    return arr[randomIntFromInterval(0, arr.length-1)];
}

function renderSnakeTailTile() {
}
function renderSnakeHead(selectedTile) {
    // change classes
    selectedTile.classList.add("circle-highlight");
    selectedTile.style = `
        width: 14px;
        height: 14px;
        background: #00b3ff;
        border: 2px solid #636466;
        border-radius: 15px;
      `;
    selectedTile.classList.remove("circle-not-visited");
}
function renderGoal(selectedTile) {
    selectedTile.classList.add("circle-goal");
    selectedTile.style = `
        width: 14px;
        height: 14px;
        background: #ffb800;
        border: 2px solid #636466;
        border-radius: 15px;
      `;
    selectedTile.classList.remove("circle-not-visited");
}

function spawnSnakeHead() {
    var randomRowI = randomIntFromInterval(0, 8);
    var randomCellI = randomIntFromInterval(0, 27);

    var selectedRow = document.querySelectorAll('table tr')[randomRowI];
    var selectedCell = selectedRow.querySelectorAll('td')[randomCellI];

    var selectedTile = selectedCell.querySelector('div');

    if(Array.from(selectedTile.classList).indexOf("circle-not-visited") >= 0) {
        // keep
    } else {
        // rerun random select
        return;
    }

    snakeHeadPosition["rowI"] = randomRowI;
    snakeHeadPosition["colI"] = randomCellI;

    currSnakeHeadPosition["rowI"] = randomRowI;
    currSnakeHeadPosition["colI"] = randomCellI;

    previewState["snakeHead"] = {
        "rowI": randomRowI,
        "colI": randomCellI
    };

    selectedTile.classList.add("circle-highlight");
    selectedTile.style = `
        width: 14px;
        height: 14px;
        background: #00b3ff;
        border: 2px solid #636466;
        border-radius: 15px;
      `;
    selectedTile.classList.remove("circle-not-visited");
}

function renderSnakeTail(tailPosition) {
    var selectedRow = document.querySelectorAll('table tr')[tailPosition["rowI"]];
    var selectedCell = selectedRow.querySelectorAll('td')[tailPosition["colI"]];

    var selectedTile = selectedCell.querySelector('div');

    if(Array.from(selectedTile.classList).indexOf("circle-not-visited") >= 0) {
        // keep
    } else {
        return;
    }

    selectedTile.classList.add("circle-highlight-tail");
    selectedTile.style = `
        width: 14px;
        height: 14px;
        background: #73b3db;
        border: 2px solid #636466;
        border-radius: 15px;
      `;
    selectedTile.classList.remove("circle-not-visited");
}

function renderPreviewTurnTile(previewTurn) {
    var selectedRow = document.querySelectorAll('table tr')[previewTurn["rowI"]];
    var selectedCell = selectedRow.querySelectorAll('td')[previewTurn["colI"]];

    var circlePreviewTurn = document.createElement("div");
    circlePreviewTurn.classList.add("circle-preview-turn");

    if (Array.from(selectedCell.querySelector('div').classList).length === 1) {
        circlePreviewTurn.style = `
            width: 14px;
            height: 14px;
            border: 2px solid #636466;
            border-radius: 15px;
            background: #ffffff;
        `;
    } else if (Array.from(selectedCell.querySelector('div').classList).indexOf("circle-not-visited_variant-2") >= 0) {
        circlePreviewTurn.style = `
            width: 14px;
            height: 14px;
            background: rgb(228, 231, 237);
            border: 2px solid rgb(99, 100, 102);
            border-radius: 15px;
        `;
        circlePreviewTurn.classList.add("circle-not-not-visited_variant-2");
    }

    var circlePreviewTurnInner = document.createElement("div");
    circlePreviewTurnInner.style = `
        background: #ff5200;
        width: 6px;
        height: 6px;
        border-radius: 15px;
        margin-left: 2px;
        margin-top: 2px;
        border: 2px solid #636466;
    `;
    circlePreviewTurn.appendChild(circlePreviewTurnInner);

    selectedCell.querySelector('div').outerHTML = circlePreviewTurn.outerHTML;
}

var spawnAttempts = 0;

function _spawnGoal() {
    var randomRowI = randomIntFromInterval(0, 8);
    var randomCellI = randomIntFromInterval(0, 27);

    var selectedRow = document.querySelectorAll('table tr')[randomRowI];
    var selectedCell = selectedRow.querySelectorAll('td')[randomCellI];

    var selectedTile = selectedCell.querySelector('div');

    if(Array.from(selectedTile.classList).indexOf("circle-not-visited") >= 0) {
        // keep
    } else {
        // rerun random select
        spawnAttempts += 1;
        if(spawnAttempts > 100) {
            return;
        }
        return _spawnGoal();
    }

    return {selectedTile, randomRowI, randomCellI};
}

function spawnGoal() {
    var {selectedTile, randomRowI, randomCellI} = _spawnGoal();
    if(spawnAttempts > 100) {
        return;
    }

    goalPosition["rowI"] = randomRowI;
    goalPosition["colI"] = randomCellI;


    previewState["snakeHead"] = {
        "rowI": randomRowI,
        "colI": randomCellI
    };

    selectedTile.classList.add("circle-goal");
    selectedTile.style = `
        width: 14px;
        height: 14px;
        background: #ffb800;
        border: 2px solid #636466;
        border-radius: 15px;
    `;
    selectedTile.classList.remove("circle-not-visited");
}

function clearSnakeHead() {
    var listCircleHighlighted = document.querySelectorAll("table .circle-highlight");
    Array.from(listCircleHighlighted).map((circle) => {
        if(circle.classList.length == 1) {
            circle.classList.add("circle-not-visited");
            circle.classList.remove("circle-highlight");
            circle.style = `
                width: 14px;
                height: 14px;
                background: #ffffff;
                border: 2px solid #636466;
                border-radius: 15px;
            `;
        } else if(Array.from(circle.classList).indexOf("circle-highlight")
            && Array.from(circle.classList).indexOf("circle-not-visited_variant-2") >= 0) {
            circle.classList.add("circle-not-visited");
            circle.classList.remove("circle-highlight");
            circle.style = `
                width: 14px;
                height: 14px;
                background: #e4e7ed;
                border: 2px solid #636466;
                border-radius: 15px;
            `;
        }
    })
    delete previewState["snakeHead"]["rowI"];
    delete previewState["snakeHead"]["colI"];
}

function clearGoal() {
    var listCircleHighlighted = document.querySelectorAll("table .circle-goal")
    Array.from(listCircleHighlighted).map((circle) => {
        if(circle.classList.length == 1) {
            // keep
            circle.classList.add("circle-not-visited");
            circle.classList.remove("circle-goal");
            circle.style = `
        width: 14px;
        height: 14px;
        background: #ffffff;
        border: 2px solid #636466;
        border-radius: 15px;
     `;
        } else if(Array.from(circle.classList).indexOf("circle-goal")
            && Array.from(circle.classList).indexOf("circle-not-visited_variant-2") >= 0) {
            circle.classList.add("circle-not-visited");
            circle.classList.remove("circle-goal");
            circle.style = `
         width: 14px;
         height: 14px;
         background: #e4e7ed;
         border: 2px solid #636466;
         border-radius: 15px;
        `;
        }
    })
    delete previewState["goal"]["rowI"];
    delete previewState["goal"]["colI"];
}

function drawPreviewTurns(previewTurns) {

}

function clearPreviewTurns() {
    var listCirclePreviewTurn = document.querySelectorAll('.circle-preview-turn');
    Array.from(listCirclePreviewTurn).map((circlePreviewTurn) => {
        let newCirclePreviewTurn;
        if(Array.from(circlePreviewTurn.classList).length === 1) {
            // keep
            newCirclePreviewTurn = renderNotVisitedTile()
        } else if (Array.from(circlePreviewTurn.classList).indexOf("circle-not-not-visited_variant-2") >= 0) {
            newCirclePreviewTurn = renderNotVisitedTileVariant2()
        } else {
            return;
        }
        circlePreviewTurn.outerHTML = newCirclePreviewTurn.outerHTML;
    })
}


function drawInitial() {
    clearSnakeHead();
    clearGoal();
    clearPreviewTurns();

    let snakeHead = spawnSnakeHead();
    let goalTile = spawnGoal();
    clearSnakeHead();
    clearSnakeTailPositions();
    clearGoal();
    clearPreviewTurns();
    snakeHead = spawnSnakeHead();
    goalTile = spawnGoal();

}

function _calculateNextTurnNaive(currSnakeHeadPosition, goalPosition) {
    if(goalPosition["colI"] > currSnakeHeadPosition["colI"]) {
        return {
            "rowI": currSnakeHeadPosition["rowI"],
            "colI": currSnakeHeadPosition["colI"] + 1
        }
    } else if (goalPosition["colI"] < currSnakeHeadPosition["colI"]) {
        return {
            "rowI": currSnakeHeadPosition["rowI"],
            "colI": currSnakeHeadPosition["colI"] - 1
        }
    } else if(goalPosition["rowI"] > currSnakeHeadPosition["rowI"]) {
        return {
            "rowI": currSnakeHeadPosition["rowI"] + 1,
            "colI": currSnakeHeadPosition["colI"]
        }
    } else if (goalPosition["rowI"] < currSnakeHeadPosition["rowI"]) {
        return {
            "rowI": currSnakeHeadPosition["rowI"] - 1,
            "colI": currSnakeHeadPosition["colI"]
        }
    }
}

function handleLastCellInRow(newNextTurn) {
    // nextNextTurn
    if(newNextTurn["colI"] > TOTAL_ROWS) {
        newNextTurn["colI"] = 0;
    } else if (newNextTurn["colI"] < 0) {
        newNextTurn["colI"] = TOTAL_ROWS - 1;
    } else if (newNextTurn["rowI"] > TOTAL_ROWS) {
        newNextTurn["rowI"] = 0;
    } else if (newNextTurn["rowI"] < 0) {
        newNextTurn["colI"] = TOTAL_COLS - 1;
    }
    return newNextTurn;
}

function calculateNextTurnNaive(currSnakeHeadPosition, goalPosition) {
    var nextTurn = _calculateNextTurnNaive(currSnakeHeadPosition, goalPosition);
    var nextTurnInsideTail = [false].concat(snakeTailPositions).reduce((prev, snakeTailPosition) => {
        return prev || (nextTurn["rowI"] === snakeTailPosition["rowI"] && nextTurn["colI"] === snakeTailPositions["colI"])
    });


    if(nextTurnInsideTail === false) {
        return nextTurn;
    }

    console.log("next turn inside tail");
    var newNextTurn;

    if (nextTurn["colI"] - currSnakeHeadPosition["colI"] === 1) { // for right turn do top
        newNextTurn = {"rowI": nextTurn["rowI"] + 1, "colI": nextTurn["colI"]}
    } else if (nextTurn["colI"] - currSnakeHeadPosition["colI"] === -1) { // for left turn do bottom
        newNextTurn = {"rowI": nextTurn["rowI"] - 1, "colI": nextTurn["colI"]}
    } else if (nextTurn["rowI"] - currSnakeHeadPosition["rowI"] === 1) { // for bottom turn do right
        newNextTurn = {"rowI": nextTurn["rowI"], "colI": nextTurn["colI"] + 1}
    } else if(nextTurn["rowI"] - currSnakeHeadPosition["rowI"] === -1) { // for top turn do left
        newNextTurn = {"rowI": nextTurn["rowI"], "colI": nextTurn["colI"] - 1}
    }

    if(newNextTurn["colI"] > TOTAL_ROWS) {
        newNextTurn["colI"] = 0;
    } else if (newNextTurn["colI"] < 0) {
        newNextTurn["colI"] = TOTAL_ROWS - 1;
    } else if (newNextTurn["rowI"] > TOTAL_ROWS) {
        newNextTurn["rowI"] = 0;
    } else if (newNextTurn["rowI"] < 0) {
        newNextTurn["colI"] = TOTAL_COLS - 1;
    }

    return newNextTurn;
}

/*
var snakeHeadPosition = {
    "rowI": 3,
    "colI": 12
  }
  var goalPosition = {
    "rowI": 2,
    "colI": 23
  };
  var previewTurns = [];

  var currSnakeHeadPosition = {
    "rowI": 3,
    "colI": 12
  };*/

function moveSnakeHead(previewTurn) {
    var miniCurrSnakeHeadPosition = JSON.parse(JSON.stringify(snakeHeadPosition));

    clearSnakeHead();
    // renderSnakeHeadTile();
    snakeHeadPosition["rowI"] = previewTurn["rowI"];
    snakeHeadPosition["colI"] = previewTurn["colI"];

    currSnakeHeadPosition["rowI"] = previewTurn["rowI"];
    currSnakeHeadPosition["colI"] = previewTurn["colI"];

    previewState["snakeHead"] = {
        "rowI": previewTurn["rowI"],
        "colI": previewTurn["colI"]
    };

    var selectedRow = document.querySelectorAll('table tr')[previewTurn["rowI"]];
    var selectedCell = selectedRow.querySelectorAll('td')[previewTurn["colI"]];

    var selectedTile = selectedCell.querySelector('div');

    selectedTile.classList.add("circle-highlight");
    selectedTile.style = `
    width: 14px;
    height: 14px;
    background: #00b3ff;
    border: 2px solid #636466;
    border-radius: 15px;
  `;
    selectedTile.classList.remove("circle-not-visited");

    snakeTailPositions.push({
        "rowI": currSnakeHeadPosition["rowI"],
        "colI": currSnakeHeadPosition["colI"]
    });
    snakeTailPositions = snakeTailPositions.slice(-keepLatestHeadPositions);
    clearSnakeTailPositions();
    spawnSnakeTailPositions(snakeTailPositions);
}

function clearSnakeTailPositions() {
    var listCircleHighlighted = document.querySelectorAll("table .circle-highlight-tail")
    Array.from(listCircleHighlighted).map((circle) => {
        if(circle.classList.length == 1) {
            // keep
            circle.classList.add("circle-not-visited");
            circle.classList.remove("circle-highlight-tail");
            circle.style = `
        width: 14px;
        height: 14px;
        background: #ffffff;
        border: 2px solid #636466;
        border-radius: 15px;
     `;
        } else if(Array.from(circle.classList).indexOf("circle-highlight-tail")
            && Array.from(circle.classList).indexOf("circle-not-visited_variant-2") >= 0) {
            circle.classList.add("circle-not-visited");
            circle.classList.remove("circle-highlight-tail");
            circle.style = `
         width: 14px;
         height: 14px;
         background: #e4e7ed;
         border: 2px solid #636466;
         border-radius: 15px;
        `;
        }
    })

}

function spawnSnakeTailPositions(snakeTailPositions) {
    snakeTailPositions.map((item) => {
        renderSnakeTail(item);
    })
}

async function moveSnakeHeadToGoal(curr) {
    // spawn tail
    clearGoal();
    clearSnakeHead();

    moveSnakeHead(curr);
    keepLatestHeadPositions += 1;
    snakeTailPositions.push({
        "rowI": currSnakeHeadPosition["rowI"],
        "colI": currSnakeHeadPosition["colI"]
    });
    snakeTailPositions = snakeTailPositions.slice(-keepLatestHeadPositions);

    clearSnakeTailPositions();
    spawnSnakeTailPositions(snakeTailPositions);

    spawnGoal();

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 100)
    })
}

async function moveSnakeHeadForThisRound(previewTurns) {
    clearPreviewTurns();

    return [Promise.resolve()].concat(previewTurns).reduce((prev, curr, index) => {
        console.log(prev);
        return prev.then(() => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    moveSnakeHead(curr);

                    resolve();
                }, 100)
            })
        })
    })

}

function calculatePreviewTurnsForThisRound(previewTurns) {
    /*var snakeHeadPosition = {
      "rowI": 3,
      "colI": 12
    }
    var goalPosition = {
      "rowI": 2,
      "colI": 23
    };
    var previewTurns = [];

    var currSnakeHeadPosition = {
      "rowI": 3,
      "colI": 12
    };*/
    while(currSnakeHeadPosition["rowI"] !== goalPosition["rowI"] || currSnakeHeadPosition["colI"] !== goalPosition["colI"]) {
        var nextTurnPosition = calculateNextTurnNaive(currSnakeHeadPosition, goalPosition);
        previewTurns.push(nextTurnPosition);

        currSnakeHeadPosition["rowI"] = nextTurnPosition["rowI"];
        currSnakeHeadPosition["colI"] = nextTurnPosition["colI"];
    }

    return previewTurns;
}
function drawPreviewTurns(previewTurns) {
    previewTurns.map((previewTurn) => {
        renderPreviewTurnTile(previewTurn);
    })
}


function renderBoard() {
    var rows = TOTAL_ROWS;
    var cols = TOTAL_COLS;

    var board = document.createElement("table");
    var boardBody = document.createElement("tbody");

    Array.from(Array(rows)).map((row_i) => {
        var row = renderRow(row_i, cols);
        boardBody.appendChild(row);
    })
    board.appendChild(boardBody);

    return board;
}
function drawBoard() {
    var board = renderBoard();
    document.querySelector('body').querySelector('table').outerHTML = board.outerHTML;
}
