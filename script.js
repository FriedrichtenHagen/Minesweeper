const background = document.querySelector("div.background")
const header = document.querySelector("div.header")
let backgroundSize = 500
let headerSize = 100
let sideSquares = 16
let maxSquares = sideSquares*sideSquares
let subtractBorder = sideSquares*2
let gridItemHeight = ((backgroundSize-subtractBorder)/sideSquares)
let gridItemWidth = ((backgroundSize-subtractBorder)/sideSquares)

function setBackground(){
    background.style.height = `${backgroundSize}px`
    background.style.width = `${backgroundSize}px`
    header.style.height = `${headerSize}px`
    header.style.width = `${backgroundSize}px`

}

function fillBackground(){
    for(let i=0; i<maxSquares; i++){
        const gridItem = document.createElement("div")
        background.appendChild(gridItem)
        gridItem.setAttribute("id", i)
        gridItem.setAttribute("class","gridItem")
        gridItem.style.height = `${gridItemHeight}px`
        gridItem.style.width = `${gridItemWidth}px`
        gridItem.addEventListener("click", e => {
            if(!explosionCheck(gridItem)){
                gridItem.classList.toggle("sweeped")
                gridItem.classList.remove("marked")
                if(gridItem.classList[1]=== "0"){
                    let startId = gridItem.getAttribute("id") 
                    fillOutZeros(startId) 
                    gridItem.textContent = " " 
                }
            }
            checkForSuccess()
        })
        gridItem.addEventListener("contextmenu", e => {
            gridItem.classList.toggle("marked")
            gridItem.classList.remove("sweeped")
            e.preventDefault()
            checkForSuccess()
        })
    }
}

function plantBombs(){
    let bombNumber = Math.floor(Math.random()*20)+20
    let gridItems = document.querySelectorAll(".gridItem")

    for(let b=0; b<bombNumber; b++){
        let bombPos = Math.floor(Math.random()*maxSquares)
        gridItems[bombPos].classList.add("bomb")
    }
}

var bombAudio = new Audio('mixkit-sea-mine-explosion-1184.wav');

function explosionCheck(gridItem){
    if(gridItem.classList[1] === "bomb"){
        bombAudio.currentTime = 0;
        bombAudio.play();
        letBombsExplode()
        return true
    }
}
function calculateAdjBombs(){
    let grids = document.querySelectorAll(".gridItem")
    let adjBombs = 0
    for(let c=0; c<maxSquares; c++){
        adjBombs=0 //reset bombcounter
        let a1=c-17 //set adjacent fields
        let b1=c-16
        let c1=c-15 // abc
        let d1=c-1  // dXe
        let e1=c+1  // fgh
        let f1=c+15
        let g1=c+16
        let h1=c+17

        //edge case left border of matrix
        if(c===0 || c%16===0){
            let surroundingArrayLeft = [b1,c1,e1,g1,h1]
            checkAdjFields(surroundingArrayLeft, c, adjBombs)
        }
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

function checkAdjFields(surroundingArray, c, adjBombs){
    let grids = document.querySelectorAll(".gridItem")
    // console.log("current fieldID: "+ c)
        for(let sI = 0; sI<surroundingArray.length; sI++){
            let g = surroundingArray[sI]
            // console.log("neighboring fieldID: " +g +" Neighborarrypos "+ sI)
            if(grids[g]!=undefined && grids[g].classList[1] === "bomb"){
                adjBombs++
                // console.log("Bombs: "+adjBombs)  
            }
            else{
                // console.log("not a bomb")
            }   
        }
        grids[c].classList.add(`${adjBombs}`)
        grids[c].textContent = adjBombs
}
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
        alert("YOU WON! CONGRATULATIONS")
    }
}

function letBombsExplode(){
    let bombFields = document.querySelectorAll(".bomb")
    bombFields.forEach(bomb => {
        bomb.textContent = "💣"
        bomb.style.color= "black"
    })
    // make bombs explode and grow to fill the screen
        var delayInMilliseconds = 500;
        setTimeout(function() {
            bombFields.forEach(bomb => {
                bomb.textContent = "💥"
                bomb.classList.add("exploding")
            })                
        }, delayInMilliseconds);
}
function fillOutZeros(startId){
    // this function should be called when a clicked field is not a bomb and has zero adjBombs
    // this starts our recursion: start in upper left corner
    // go through all adjFields (exclude the edge cases)
    // edge cases: !(adjField<256 && adjField>0) then skip field 
    // if adjBombs === 0 (if already revealed, skip) repeat function from this position, else reveal textContent go to next field
    // if already revealed, skip


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

// TODO: 
// function that automatically sweeps all "zero fields" https://stackoverflow.com/questions/34459086/minesweeper-reveal-nearby-tiles-function
    // bugs: upper left corner, reclicking and marking fields, sweeping the clicked field
// add a div that displays a GAME OVER Message. Include the possibility of restarting
    // that should prevent further clicks on the field 
// add timer and display of leftover bombs

setBackground()
fillBackground()
plantBombs()
calculateAdjBombs()
