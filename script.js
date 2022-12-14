// set global variables
const background = document.querySelector("div.background")
const header = document.querySelector("div.header")
const body = document.querySelector("body")
let backgroundSize = 500
let headerSize = 100
let sideSquares = 16
let maxSquares = sideSquares*sideSquares
let subtractBorder = sideSquares*2
let gridItemHeight = ((backgroundSize-subtractBorder)/sideSquares)
let gridItemWidth = ((backgroundSize-subtractBorder)/sideSquares)
// sound effects
const bombAudio = new Audio('sound/mixkit-sea-mine-explosion-1184.wav');
const clickAudio = new Audio('sound/mixkit-mouse-click-close-1113.wav');
const selectAudio = new Audio('sound/mixkit-select-click-1109.wav');

// create background field
function setBackground(){
    background.style.height = `${backgroundSize}px`
    background.style.width = `${backgroundSize}px`
    header.style.height = `${headerSize}px`
    header.style.width = `${backgroundSize}px`
}
// create grid on background
function fillBackground(){
    for(let i=0; i<maxSquares; i++){
        // create gridItem
        const gridItem = document.createElement("div")
        background.appendChild(gridItem)
        gridItem.setAttribute("id", i)
        gridItem.setAttribute("class","gridItem")
        gridItem.style.height = `${gridItemHeight}px`
        gridItem.style.width = `${gridItemWidth}px`
        // add click event listener
        gridItem.addEventListener("click", e => {
            // check for bomb
            if(!explosionCheck(gridItem)){
                clickAudio.currentTime = 0;
                clickAudio.play();
                gridItem.classList.toggle("sweeped")
                gridItem.classList.remove("marked")
                // check to see if clicked field has zero adjacent bombs
                if(gridItem.classList[1]=== "0"){
                    let startId = gridItem.getAttribute("id") 
                    fillOutZeros(startId) 
                    gridItem.textContent = " " 
                }
            }
            checkForSuccess()
        })
        // add right click functionality
        gridItem.addEventListener("contextmenu", e => {
            selectAudio.currentTime = 0;
            selectAudio.play();
            gridItem.classList.toggle("marked")
            gridItem.classList.remove("sweeped")
            e.preventDefault() // prevent the context menu from showing up on right click
            checkForSuccess()
        })
    }
}

function onLeftClick(){
    if(!explosionCheck(gridItem)){
        clickAudio.currentTime = 0;
        clickAudio.play();
        gridItem.classList.toggle("sweeped")
        gridItem.classList.remove("marked")
        // check to see if clicked field has zero adjacent bombs
        if(gridItem.classList[1]=== "0"){
            let startId = gridItem.getAttribute("id") 
            fillOutZeros(startId) 
            gridItem.textContent = " " 
        }
    }
    checkForSuccess()
}

// randomly place bombs
function plantBombs(){
    let bombNumber = Math.floor(Math.random()*20)+20
    let gridItems = document.querySelectorAll(".gridItem")
    // display the number of bombs
    let bombNumField = document.querySelector(".bombNum")
    bombNumField.textContent = bombNumber
    // place bombs at random positions in the grid
    for(let b=0; b<bombNumber; b++){
        let bombPos = Math.floor(Math.random()*maxSquares)
        gridItems[bombPos].classList.add("bomb")
    }
}
// check if the clicked field is a bomb
function explosionCheck(gridItem){
    if(gridItem.classList[1] === "bomb"){
        letBombsExplode()
        setTimeout(displayGameOverMessage, 500)
        return true
    }
}
// calculate how many bombs are surrounding each field
function calculateAdjBombs(){
    let grids = document.querySelectorAll(".gridItem")
    let adjBombs = 0
    for(let c=0; c<maxSquares; c++){
        adjBombs=0 //reset bombcounter
        /*   the following variables represent the fields adjacent to the current field (X)
             these numbers are the result of one row having 16 fields
             a b c
             d X e
             f g h
        */
        let a1=c-17 
        let b1=c-16
        let c1=c-15
        let d1=c-1  
        let e1=c+1  
        let f1=c+15
        let g1=c+16
        let h1=c+17

        // edge case: left border of grid
        if(c===0 || c%16===0){
            let surroundingArrayLeft = [b1,c1,e1,g1,h1]
            checkAdjFields(surroundingArrayLeft, c, adjBombs)
        }
        // edge case: right border of grid
        else if(c===15 || c===31 || c===47 || c===63 || c===79 || c===95|| c===111 || c===127||c===143||c===159||c===175||c===191||c===207||c===223||c===239||c===255){
            let surroundingArrayRight = [a1,b1,d1,f1,g1]
            checkAdjFields(surroundingArrayRight, c, adjBombs)
        }
        else{
            //regular case (middle of the matrix)
            let surroundingArrayMiddle = [a1,b1,c1,d1,e1,f1,g1,h1]
            checkAdjFields(surroundingArrayMiddle, c, adjBombs)
        }
    }
}
// go through the surrounding fields
function checkAdjFields(surroundingArray, c, adjBombs){
    let grids = document.querySelectorAll(".gridItem")
    // console.log("current fieldID: "+ c)
    for(let sI = 0; sI<surroundingArray.length; sI++){
        let g = surroundingArray[sI]
        // check if field is not undefined and a bomb and increase bomb counter
        if(grids[g]!=undefined && grids[g].classList[1] === "bomb"){
            adjBombs++  
        }
    }
    grids[c].classList.add(`${adjBombs}`)
    grids[c].textContent = adjBombs
}
// check if all fields have been marked/sweeped
function checkForSuccess(){
    let fields = document.querySelectorAll(".gridItem")
    let successCounter = 0
    for(let s=0; s<fields.length; s++){
        if((fields[s].classList[1]=== "bomb" && fields[s].classList[3]=== "marked") || (fields[s].classList[2]=== "sweeped")) {
            //bomb is correctly marked
            successCounter++
        }
    }
    if(successCounter===256){
        displayWinMessage()
        insertRestartButton()
    }
    else{
        console.log(successCounter)
    }
}

function letBombsExplode(){
    bombAudio.currentTime = 0;
    bombAudio.play();
    let bombFields = document.querySelectorAll(".bomb")
    bombFields.forEach(bomb => {
        bomb.textContent = "????"
        bomb.style.color= "black"
    })
    // make bombs explode and grow to fill the screen
        var delayInMilliseconds = 500;
        setTimeout(function() {
            bombFields.forEach(bomb => {
                bomb.textContent = "????"
                bomb.classList.add("exploding")
            })        
            insertRestartButton()        
        }, delayInMilliseconds);
}

let headerDiv = document.querySelector(".header")
    let bomb = document.querySelector(".bombNumber")
    let timer = document.querySelector(".timer")

function displayGameOverMessage(){
    headerDiv.removeChild(bomb)
    headerDiv.removeChild(timer)
    headerDiv.classList.add("gameOverMessage")
    headerDiv.textContent="Game over!"
    // stop timer
    clearInterval(intervalId)
}
function displayWinMessage(){
    headerDiv.removeChild(bomb)
    headerDiv.removeChild(timer)
    headerDiv.classList.add("gameOverMessage")
    headerDiv.textContent="You Won!"
    // stop timer
    clearInterval(intervalId)
}   
function insertRestartButton(){
    //create restartButton
    let restartButton = document.createElement("button")
    restartButton.textContent="Try again!"
    restartButton.classList.add("restartButton")
    body.appendChild(restartButton)
    restartButton.addEventListener("click", restartGame)
}

function restartGame(){
    // clear field
    background.replaceChildren();
    // reset all variables?
    fillBackground()
    // header needs to be set back to original before plantBombs can work
    createHeader()
    plantBombs()
    calculateAdjBombs()
    // remove restartButton
    restartButton = document.querySelector(".restartButton")
    body.removeChild(restartButton)

    // reset timer
    time = 120
    intervalId = setInterval(updateTimer, 1000)

}
function createHeader(){
    // (re)add bomb counter and bomb timer
    headerDiv.textContent = ""
    headerDiv.appendChild(bomb)
    headerDiv.appendChild(timer)
    headerDiv.classList.remove("gameOverMessage")
}

function fillOutZeros(startId){
    // startId is a STRING! This leads to errors in the calculation
    startId = parseInt(startId)
    console.log("ID is"+startId)
    let a1=startId-17 //set adjacent fields
    let b1=startId-16
    let c1=startId-15 // abc
    let d1=startId-1  // d(id)e
    let e1=startId+1  // fgh
    let f1=startId+15
    let g1=startId+16
    let h1=startId+17
    let surroundingField = [a1,b1,c1,d1,e1,f1,g1,h1]

    for(let g = 0; g<surroundingField.length; g++){
        let currentField = surroundingField[g]
        if(currentField<256 && currentField>=0){
            // current Field is not part of the matrix
            let divOfcurrentField = document.querySelector(`#${CSS.escape(currentField)}`)
            console.log(divOfcurrentField)
            let adjBombsOfCurrentField = divOfcurrentField.classList[1]

            if(adjBombsOfCurrentField === "0" && !(divOfcurrentField.classList[2]==="sweeped") && divOfcurrentField.classList[1] !== "bomb"){
                divOfcurrentField.classList.add("sweeped")
                divOfcurrentField.textContent=" "
                fillOutZeros(currentField)
            } 
            else if(adjBombsOfCurrentField !== "0" && !(divOfcurrentField.classList[2]==="sweeped") && divOfcurrentField.classList[1] !== "bomb"){
                divOfcurrentField.classList.add("sweeped")
            }
        }
        else{
            console.log("not in range:"+ currentField)
        }
    }
}

let time = 120
const timerDiv = document.querySelector(".time")
let intervalId = setInterval(updateTimer, 1000)

function updateTimer(){
    let minutes = Math.floor(time/60)
    let seconds = time%60
    if(seconds<10){
        timerDiv.textContent = minutes + ":0" + seconds 
    }
    else{
        timerDiv.textContent = minutes + ":" + seconds 
    }
    time--
    if(time===0){
        letBombsExplode()
        setTimeout(displayGameOverMessage, 500)
    }
}

function removeListeners(){
    let gridItems = document.querySelectorAll(".gridItem")
    gridItems.forEach(field => {
        field.removeEventListener("click", )
    })
}


// TODO: 
// bugs: sweeping the other side of the field over the border
// add a div that displays a GAME OVER Message. Include the possibility of restarting
    // that should prevent further clicks on the field (remove eventlistener?)
// delay zero sweeping and animate it
// stop the timer on a win/restart (how to stop a function?) clearInterval(intervalId)
    // currently the timer goes down faster with each restart???
// maybe create the header with the function the first time around?
// idea: time increment on correctly marked bombs
    // animate the adding of increment on timer
    // animate the correct marking of a bomb
// add more impressive Win animation
// add hover animation
// there is a bug with the success message. Sometimes it is not displayed correctly
// make the queryselector for gridItem global

setBackground()
fillBackground()
plantBombs()
calculateAdjBombs()
