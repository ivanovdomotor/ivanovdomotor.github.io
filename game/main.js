//(Global Options)
let TheScope = 40; //TheScope % 10 === false!!!!
let PlayerLength = 6; //PlayerLength % 2 === false!!!!
let BallSpeed = 1500; //max: 1500 min: 500
let BallCurrentPosition = 0; // 0 :Upleft, 1: Left, 2: Downleft, 3: Down, 4: Downright, 5: Right, 6: Upright, 7: Up

//Window-resize
window.moveTo(0, 0);
window.resizeTo(screen.width, screen.height)
const TdWidth = (window.innerWidth / TheScope);
const TrHeight = (window.innerHeight / TheScope);

//Create a new table with cells, every cell's ID = "td[ROW],[COLUMN]"
function tableCreate() {
    mainTable = document.querySelector("#mainTable");
    mainBody = mainTable.querySelector("tbody");
    for (let i = 0; i < TheScope; i++) {
        let TrAttribute = {
            height: TrHeight
        }
        mainTr = createAnyChild("tr", mainBody, TrAttribute);
        for (let j = 0; j < TheScope; j++) {
            let TdAttribute = {
                width: TdWidth,
                id: "td" + i + "," + j,
            }
            mainTd = createAnyChild("td", mainTr, TdAttribute);
            if (i !== 0 && i !== (TheScope - 1)) {
                mainTd.addEventListener("mouseover", function () { onTheBlock(this); });
                mainTd.addEventListener("mouseout", function () { offTheBlock(this); });
            }
        }
    }
}

//Create a parent's child with attributes
function createAnyChild(tag, parent, attributes) {
    newElement = document.createElement(`${tag}`);
    for (let k in attributes) {
        newElement.setAttribute(k, attributes[k]);
    }
    parent.appendChild(newElement);
    return newElement;
}

//This happens, when the mouse on the cell
function onTheBlock(block) {
    blockID = block.getAttribute("id");
    let irrelevantID = getSecondPart(blockID);
    let playerID = "td3," + irrelevantID;
    let playerBlock = getThePlayer(playerID);
    for (let i in playerBlock) {
        if (document.querySelector(`[id = '${playerBlock[i]}']`)) {
            thisPlayerBlock = document.querySelector(`[id = '${playerBlock[i]}']`);
            thisPlayerBlock.setAttribute("style", "background-color:green");
        }
    }
}

//This happens, when the mouse off the cell
function offTheBlock(block) {
    blockID = block.getAttribute("id");
    let irrelevantID = getSecondPart(blockID);
    let playerID = "td3," + irrelevantID;
    let playerBlock = getThePlayer(playerID);
    for (let i in playerBlock) {
        if (document.querySelector(`[id = '${playerBlock[i]}']`)) {
            thisPlayerBlock = document.querySelector(`[id = '${playerBlock[i]}']`);
            thisPlayerBlock.removeAttribute("style");
        }
    }
}

//This get the player rectangle's IDs from the center-ID
function getThePlayer(mainBlockID) {
    let playerID = [mainBlockID];
    let irrelevantID = getFirstPart(mainBlockID);
    let relevantID = getSecondPart(mainBlockID);
    for (let i = 0; i < (PlayerLength / 2); i++) {
        if (i != 0) {
            let plus = Number(relevantID) + i;
            let minus = Number(relevantID) - i;
            playerID.push(irrelevantID + "," + plus);
            playerID.push(irrelevantID + "," + minus);
        }
    }
    return playerID;
}

//This get the first part from the cell ID ("td[ROW]")
function getFirstPart(str) {
    return str.substr(0, str.indexOf(','));
}

//This get the second part from the cell ID ("[COLUMN]")
function getSecondPart(str) {
    return str.split(',')[1];
}

//This Create the ball in the position, and call the ballGo
function ballCreate(ballFirstPosition, ballSecondPosition, beforeBall) {
    if (document.querySelector(`[id = 'td${ballFirstPosition},${ballSecondPosition}']`)) {

        startPlace = document.querySelector(`[id = 'td${ballFirstPosition},${ballSecondPosition}']`);
        if (startPlace !== beforeBall) {
            if (beforeBall) {
                if("background-color:green"===beforeBall.getAttribute("style")){

                }else{
                    beforeBall.removeAttribute("style");
                }
            }
            startPlace.setAttribute("style", "background-color:yellow");
        }
        positionArray = ballScope(startPlace.getAttribute("id"));
        let nextPosition = ballNextPosition(positionArray);
        ballGo(nextPosition, startPlace);
    }
}

//This count the next position of the Ball, then call the ballCreate
function ballGo(nextPosition, beforePosition) {
    firstPostion = getFirstPart(nextPosition).split('d')[1];
    secondPosition = getSecondPart(nextPosition);
    speed = 200000 / BallSpeed
    setTimeout(() => { ballCreate(firstPostion, secondPosition, beforePosition); }, speed);
}
function ballNextPosition(positionArray) {
    nextPosition = positionArray[BallCurrentPosition];
    nextCell = document.querySelector(`[id = '${nextPosition}']`)
    if (nextCell) {
        cellColor = nextCell.getAttribute("style");
    } else {
        cellColor = "background-color:green";
    }
    if (cellColor === "background-color:green") {
        switch (BallCurrentPosition) { // 0 :Upleft, 1: Left, 2: Downleft, 3: Down, 4: Downright, 5: Right, 6: Upright, 7: Up
            case 0: //Upleft
                if (document.querySelector(`[id = '${positionArray[2]}']`)) {
                    BallCurrentPosition = 2; //Downleft
                } else {
                    if(document.querySelector(`[id = '${positionArray[6]}']`)) {
                    BallCurrentPosition = 6; //Upright
                }else
                    BallCurrentPosition = 4; //Downright
                };
                break;
            case 1: BallCurrentPosition = 5;
                break;
            case 2: //Downleft
                if (document.querySelector(`[id = '${positionArray[0]}']`)) {
                    BallCurrentPosition = 0; //Upleft
                } else {
                    if (document.querySelector(`[id = '${positionArray[4]}']`)) {
                    BallCurrentPosition = 4; //Downright
                } else
                    BallCurrentPosition = 6; //Upright
                };
                break;
            case 3: BallCurrentPosition = 7;
                break;
            case 4: //Downright
                if (document.querySelector(`[id = '${positionArray[6]}']`)) {
                    BallCurrentPosition = 6; //Upright
                } else {
                    if (document.querySelector(`[id = '${positionArray[2]}']`)) {
                        BallCurrentPosition = 2; //Downleft
                    } else
                    BallCurrentPosition = 0; //Upleft
                };
                break;
            case 5: BallCurrentPosition = 1;
                break;
            case 6: //Upright
                if (document.querySelector(`[id = '${positionArray[4]}']`)) {
                    BallCurrentPosition = 4; //Downright
                } else {
                    if (document.querySelector(`[id = '${positionArray[0]}']`)) {
                        BallCurrentPosition = 0; //Upleft
                    } else
                    BallCurrentPosition = 2; //Downleft
                };
                break;
            case 7: BallCurrentPosition = 3;
                break;
            default: ; //Exit game?
        }
        nextPosition = positionArray[BallCurrentPosition];
        return nextPosition;
    } else {

        return nextPosition;
    }
}
function ballScope(ballPosition) {
    positionArray = [];
    firstID = getFirstPart(ballPosition).split('d')[1];
    secondID = getSecondPart(ballPosition);
    onePos = Number(firstID) - 1;
    twoPos = Number(firstID);
    threePos = Number(firstID) + 1;
    fourPos = Number(secondID) - 1;
    fivePos = Number(secondID);
    sixPos = Number(secondID) + 1;
    positionArray.push("td" + onePos + "," + fourPos); // 0: Upleft
    positionArray.push("td" + twoPos + "," + fourPos); // 1 : Left
    positionArray.push("td" + threePos + "," + fourPos); // 2: DownLeft
    positionArray.push("td" + threePos + "," + fivePos); // 3: Down
    positionArray.push("td" + threePos + "," + sixPos); // 4: DownRight
    positionArray.push("td" + twoPos + "," + sixPos); // 5: Right
    positionArray.push("td" + onePos + "," + sixPos); // 6: UpRight
    positionArray.push("td" + onePos + "," + fivePos); // 7: Up
    positionArray.push("td" + twoPos + "," + fivePos); // 8: Don't move!
    return positionArray;
}

//START
tableCreate();
ballCreate(TheScope / 2, TheScope / 2);