
var newSnakeHeadPosition = {
    "rowI": 2,
    "colI": 9
}
putSnakeHead(newSnakeHeadPosition);

var newGoalPosition = {
    "rowI": 2,
    "colI": 19
}
putGoal(newGoalPosition);


var newTriangleStartPosition = {
    "rowI": 2,
    "colI": 11
};
var newTriangleCenterPosition = {
    "rowI": 1,
    "colI": 11
};
var newTrinangleEndPosition = {
    "rowI": 1,
    "colI": 10
};
putWallTriangle(newTriangleStartPosition, newTriangleCenterPosition, newTrinangleEndPosition)
listWallTriangle.push({
    "startPosition": newTriangleStartPosition,
    "centerPosition": newTriangleCenterPosition,
    "endPosition": newTrinangleEndPosition
});

var newTriangleStartPosition = {
    "rowI": 4,
    "colI": 11
};
var newTriangleCenterPosition = {
    "rowI": 5,
    "colI": 11
};
var newTrinangleEndPosition = {
    "rowI": 5,
    "colI": 10
};
putWallTriangle(newTriangleStartPosition, newTriangleCenterPosition, newTrinangleEndPosition)
listWallTriangle.push({
    "startPosition": newTriangleStartPosition,
    "centerPosition": newTriangleCenterPosition,
    "endPosition": newTrinangleEndPosition
});

var newTriangleStartPosition = {
    "rowI": 2,
    "colI": 13
};
var newTriangleCenterPosition = {
    "rowI": 1,
    "colI": 13
};
var newTrinangleEndPosition = {
    "rowI": 1,
    "colI": 14
};
putWallTriangle(newTriangleStartPosition, newTriangleCenterPosition, newTrinangleEndPosition)
listWallTriangle.push({
    "startPosition": newTriangleStartPosition,
    "centerPosition": newTriangleCenterPosition,
    "endPosition": newTrinangleEndPosition
});

var newTriangleStartPosition = {
    "rowI": 4,
    "colI": 13
};
var newTriangleCenterPosition = {
    "rowI": 5,
    "colI": 13
};
var newTrinangleEndPosition = {
    "rowI": 5,
    "colI": 14
};
putWallTriangle(newTriangleStartPosition, newTriangleCenterPosition, newTrinangleEndPosition)
listWallTriangle.push({
    "startPosition": newTriangleStartPosition,
    "centerPosition": newTriangleCenterPosition,
    "endPosition": newTrinangleEndPosition
});


var res = _generateTopLeftWallTriangle()
var newTriangleStartPosition = res['startPosition'];
var newTriangleCenterPosition = res['centerPosition'];
var newTrinangleEndPosition = res['endPosition'];

putWallTriangle(newTriangleStartPosition, newTriangleCenterPosition, newTrinangleEndPosition)
listWallTriangle.push({
    "startPosition": newTriangleStartPosition,
    "centerPosition": newTriangleCenterPosition,
    "endPosition": newTrinangleEndPosition
});

var res = _generateTopRightWallTriangle()
var newTriangleStartPosition = res['startPosition'];
var newTriangleCenterPosition = res['centerPosition'];
var newTrinangleEndPosition = res['endPosition'];

putWallTriangle(newTriangleStartPosition, newTriangleCenterPosition, newTrinangleEndPosition)
listWallTriangle.push({
    "startPosition": newTriangleStartPosition,
    "centerPosition": newTriangleCenterPosition,
    "endPosition": newTrinangleEndPosition
});


var res = _generateBottomLeftWallTriangle()
var newTriangleStartPosition = res['startPosition'];
var newTriangleCenterPosition = res['centerPosition'];
var newTrinangleEndPosition = res['endPosition'];

putWallTriangle(newTriangleStartPosition, newTriangleCenterPosition, newTrinangleEndPosition)
listWallTriangle.push({
    "startPosition": newTriangleStartPosition,
    "centerPosition": newTriangleCenterPosition,
    "endPosition": newTrinangleEndPosition
});

var res = _generateBottomRightWallTriangle()
var newTriangleStartPosition = res['startPosition'];
var newTriangleCenterPosition = res['centerPosition'];
var newTrinangleEndPosition = res['endPosition'];

putWallTriangle(newTriangleStartPosition, newTriangleCenterPosition, newTrinangleEndPosition)
listWallTriangle.push({
    "startPosition": newTriangleStartPosition,
    "centerPosition": newTriangleCenterPosition,
    "endPosition": newTrinangleEndPosition
});