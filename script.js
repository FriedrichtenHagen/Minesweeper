const background = document.querySelector("div")
const inputBackgroundSize = document.querySelector("input.backgroundSize")
const inputSideSquares = document.querySelector("input.sideSquares")

inputBackgroundSize.addEventListener("keypress", e => {
    if(e.key === "Enter"){
        let backgroundSize = inputBackgroundSize.value
        
        
    }
})

let backgroundSize = 600

let sideSquares = 64
let maxSquares = sideSquares*sideSquares
let subtractBorder = sideSquares*2
let gridItemHeight = ((backgroundSize-subtractBorder)/sideSquares)
let gridItemWidth = ((backgroundSize-subtractBorder)/sideSquares)


background.style.height = `${backgroundSize}px`
background.style.width = `${backgroundSize}px`

function fillBackground(){
    for(let i=0; i<maxSquares; i++){
        const gridItem = document.createElement("div")
        background.appendChild(gridItem)
        gridItem.setAttribute("class","gridItem")
        gridItem.style.height = `${gridItemHeight}px`
        gridItem.style.width = `${gridItemWidth}px`
        gridItem.addEventListener("mouseover", e => {
            gridItem.setAttribute("class", "marked")
        })
    }
}

fillBackground();


