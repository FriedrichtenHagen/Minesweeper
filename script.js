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
    calculateAdjBombs()
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
    let gridItems = document.querySelectorAll(".gridItem")
    let adjBombs = 0
    for(let c=0; c<maxSquares; c++){
        
        console.log(c-17)
        let adj1 = document.getElementById(`${(c-17)}`)
        if(adj1 === null){
            console.log("field not existant")
        }
        else{
            if(adj1.classList[1]=== "bomb"){
                adjBombs++
                console.log(adj1 + adjBombs)
            }

        }

        let gridItemByID = document.getElementById(`${c}`)
        gridItemByID.textContent = `${adjBombs}`
    }
    
    //gridItems.forEach(gridItem => {




    
}


setBackground()
fillBackground()
plantBombs()

