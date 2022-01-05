/**
 *   Snake-Board-Shortest-Path-Step-By-Step.js
 *   github.com/dguard/snake-breadth
 *   Licensed under the MIT license.
 *
 *   Implementation By Alexander Serditov (keep@digitallyconstructed.ru)
 **/

drawBoard()
drawInitial()

var previewTurns = (calculatePreviewTurnsForThisRoundShortestPath()).slice(1)
drawPreviewTurns(previewTurns.slice(0, -1))
clearPreviewTurns()

moveSnakeHeadForThisRound(previewTurns.slice(0,-1))
moveSnakeHeadToGoal(previewTurns.slice(-1)[0])
