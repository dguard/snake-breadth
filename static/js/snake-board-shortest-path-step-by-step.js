drawBoard()
drawInitial()

var previewTurns = (calculatePreviewTurnsForThisRoundShortestPath()).slice(1)
drawPreviewTurns(previewTurns.slice(0, -1))
clearPreviewTurns()

moveSnakeHeadForThisRound(previewTurns.slice(0,-1))
moveSnakeHeadToGoal(previewTurns.slice(-1)[0])
