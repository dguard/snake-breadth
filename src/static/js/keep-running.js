var useKeepRunning = false;
var showTurnsPreview = false;
var doMoveTurnDuringRound = false;
var doFinalTurnToTheGoal = false;

var currentStep = "preview";
var STEPS = ["preview", "move_turn_during_round", "move_to_the_goal"];
var previewStarted = false;
var moveTurnDuringRoundStarted = false;
var moveToTheGoalStarted = false;


useKeepRunning = document.querySelector("#keep_running").checked;
showTurnsPreview = document.querySelector("#show_turns_preview").checked;
doMoveTurnDuringRound = document.querySelector("#do_move_turn_during_round").checked;
doFinalTurnToTheGoal = document.querySelector("#do_final_turn_to_the_goal").checked;


var keepRunningListener = document.querySelector("#keep_running").onclick = (event) => {
    useKeepRunning = event.currentTarget.checked;
}

var showTurnsPreviewListener = document.querySelector("#show_turns_preview").onclick = (event) => {
    showTurnsPreview = event.currentTarget.checked;
}

var doMoveTurnDuringRoundListener = document.querySelector("#do_move_turn_during_round").onclick = (event) => {
    doMoveTurnDuringRound = event.currentTarget.checked;
}

var doFinalTurnToTheGoalListener = document.querySelector("#do_final_turn_to_the_goal").onclick = (event) => {
    doFinalTurnToTheGoal = event.currentTarget.checked;
}


async function showTurnsPreviewShortestPath(previewTurns) {
    var promise = new Promise((resolve, reject) => {
        if(useKeepRunning) {
            // keep
        } else {
            return setTimeout(() => { resolve() }, 10);
        }

        drawPreviewTurns(previewTurns.slice(0, -1));
        setTimeout(() => {
            resolve();
        }, 100)
    });
    return new Promise((resolve, reject) => {
        promise.then(() => {
            if(useKeepRunning) {
                // keep
            } else {
                return setTimeout(() => { resolve() }, 10);
            }

            setTimeout(() => {
                clearPreviewTurns();
                resolve();
            }, 0)
        });
    })
}

async function showMoveTurnDuringRound(previewTurns) {
    return new Promise((resolve, reject) => {
        if(useKeepRunning) {
            // keep
        } else {
            return setTimeout(() => { resolve() }, 10);
        }
        moveSnakeHeadForThisRound(previewTurns.slice(0,-1)).then(() => {
            setTimeout(() => {
                resolve();
            }, 10)
        });
    });
}

async function showFinalMoveToTheGoal(previewTurns) {
    return new Promise((resolve, reject) => {
        if(useKeepRunning) {
            // keep
        } else {
            return setTimeout(() => { resolve() }, 10);
        }
        moveSnakeHeadToGoal(previewTurns.slice(-1)[0]).then(() => {
            setTimeout(() => {
                    resolve();
                }, 10
            )    })
    });
}

async function doTact() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(keepRunning) {
                // keep
                var previewTurns = (calculatePreviewTurnsForThisRoundShortestPath()).slice(1);
                var promise = Promise.resolve();
                if(currentStep === 'preview' && showTurnsPreview && !previewStarted) {
                    console.log("show turn preview");
                    previewStarted = true;
                    promise = promise.then(() => {
                        return showTurnsPreviewShortestPath(previewTurns).then(() => {
                            currentStep = "move_turn_during_round"
                            previewStarted = false;
                            return Promise.resolve();
                        });
                    })
                }
                if(currentStep === "move_turn_during_round" && doMoveTurnDuringRound && !moveTurnDuringRoundStarted) {
                    console.log("show move turn during round");
                    moveTurnDuringRoundStarted = true;
                    promise = promise.then(() => {
                        finalMoveDone = false;
                        return showMoveTurnDuringRound(previewTurns).then(() => {
                            currentStep = "move_to_the_goal";
                            moveTurnDuringRoundStarted = false;
                            return Promise.resolve();
                        });
                    })
                }
                if(currentStep === 'move_to_the_goal' && doFinalTurnToTheGoal && !moveToTheGoalStarted) {
                    console.log("show final move to the goal");
                    moveToTheGoalStarted = true;
                    promise = promise.then(() => {
                        return showFinalMoveToTheGoal(previewTurns).then(() => {
                            currentStep = "preview"
                            moveToTheGoalStarted = false;
                            return Promise.resolve();
                        });
                    })
                }
                promise.then(resolve)
            } else {
                return resolve();
            }
            resolve();
        }, 100);
    })
}


async function keepRunning() {
    var queue = [await doTact()]
    var ALLOWED_REPEATS = 1000;
    var repeats = 1;

    while(queue.length) {
        if(repeats >= ALLOWED_REPEATS) {
            break;
        }
        queue.shift();
        queue.push(await doTact())
        repeats += 1;
    }
}