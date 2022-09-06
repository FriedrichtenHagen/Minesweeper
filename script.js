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
        })
        gridItem.addEventListener("contextmenu", e => {
            gridItem.classList.toggle("marked")
            gridItem.classList.remove("sweeped")
            e.preventDefault()
        })
    }
}

function plantBombs(){
    let bombNumber = Math.floor(Math.random()*20)+50


    let gridItems = document.querySelectorAll(".gridItem")

    for(let b=0; b<bombNumber; b++){
        let bombPos = Math.floor(Math.random()*maxSquares)
        gridItems[bombPos].classList.add("bomb")
    }
}
function explosionCheck(gridItem){
    if(gridItem.classList[1] === "bomb"){
        alert("THAT WAS A BOMB!")
        return true
    }
}
function calculateAdjBombs(){
    let grids = document.querySelectorAll(".gridItem")
    let adjBombs = 0
    for(let c=0; c<maxSquares; c++){

        /*
        let a=c-17
        let b=c-16
        let c=c-15
        let d=c-1
        let e=c+1
        let f=c+15
        let g=c+16
        let h=c+17
        */
        let surroundingArray = [c-17,c-16,c-15,c-1,c+1,c+15,c+16,c+17]
        
        for(let sI = 0; sI<surroundingArray.lenght; sI++){
            console.log(grids[surroundingArray[sI]])
            if(grids[surroundingArray[sI]].classList[1] === "bomb"){
                adjBombs++
                console.log("Bombs: "+adjBombs)
                grids[c].textContent = adjBombs
            }
            else{
                console.log("didnt work")
            }   
        }
    }
}



setBackground()
fillBackground()
plantBombs()
calculateAdjBombs()
