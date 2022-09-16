const background = document.querySelector("div")
const inputBackgroundSize = document.querySelector("input.backgroundSize")
const inputSideSquares = document.querySelector("input.sideSquares")

function setBackground(){
    background.style.height = `${backgroundSize}px`
    background.style.width = `${backgroundSize}px`
}
let backgroundSize = 400
let sideSquares = 16
let maxSquares = sideSquares*sideSquares
let subtractBorder = sideSquares*2
let gridItemHeight = ((backgroundSize-subtractBorder)/sideSquares)
let gridItemWidth = ((backgroundSize-subtractBorder)/sideSquares)

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
       // alert("THAT WAS A BOMB!")
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
    console.log("finished: "+successCounter)
    console.log("not finished: "+(256-successCounter))
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

// TODO: 
// function that automatically sweeps all "zero fields" https://stackoverflow.com/questions/34459086/minesweeper-reveal-nearby-tiles-function
// add a div that displays a GAME OVER Message. Include the possibility of restarting
    // that should prevent further clicks on the field 
// add timer and display of leftover bombs

setBackground()
fillBackground()
plantBombs()
calculateAdjBombs()
