const background = document.querySelector("div")
const inputBackgroundSize = document.querySelector("input.backgroundSize")
const inputSideSquares = document.querySelector("input.sideSquares")


setBackground()
fillBackground()

inputSideSquares.addEventListener("keypress", function(e){
    if(e.key === "Enter" && inputSideSquares.value < 100){
        fillBackground()
    }
})
inputBackgroundSize.addEventListener("keypress", function(e){
    if(e.key === "Enter" && inputBackgroundSize.value < 800){
        setBackground()
    }
})    
function getSideSquares(){
    return parseInt(inputSideSquares.value)  
}

function setBackground(){
    let backgroundSize = parseInt(inputBackgroundSize.value)
    background.style.height = `${backgroundSize}px`
    background.style.width = `${backgroundSize}px`
    return backgroundSize
}

function fillBackground(){
    let backgroundSize = setBackground()
    let sideSquares = getSideSquares()
    let maxSquares = sideSquares*sideSquares
    let subtractBorder = sideSquares*2
    let gridItemHeight = ((backgroundSize-subtractBorder)/sideSquares)
    let gridItemWidth = ((backgroundSize-subtractBorder)/sideSquares)
    console.log(sideSquares)
    console.log(maxSquares)
    console.log(gridItemHeight)

    for(let i=0; i<maxSquares; i++){
        const gridItem = document.createElement("div")
        background.appendChild(gridItem)
        gridItem.setAttribute("class","gridItem")
        gridItem.style.height = `${gridItemHeight}px`
        gridItem.style.width = `${gridItemWidth}px`
        gridItem.addEventListener("mousedown", e => {
            gridItem.setAttribute("class", "marked")
        })
    }
}




