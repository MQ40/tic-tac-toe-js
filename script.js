const x_class = 'x'
const circle_class = 'circle'

let circleTurn //This variable is going to be used to determine whose turn it is.

//possibilities to win
const winning_conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
]

const cellElements = document.querySelectorAll('[data-cell]') //represents all cells from the board
const board = document.getElementById('board') //represents board

//used to display messages about the game result.
const winningMessageElement = document.getElementById('winningMessage') 
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')

//Adding an event listener to the restart button. 
//When this button is clicked, the startGame function will be triggered.
const restartButton = document.getElementById('restartButton')
restartButton.addEventListener('click', startGame)

startGame() //initializes the game state

function startGame(){

    //sets circleTurn to false, indicating that X player will start the game.
    circleTurn = false

    cellElements.forEach(cell => {
        //RESTART BUTTON 
        cell.classList.remove(x_class)
        cell.classList.remove(circle_class)

        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()

    winningMessageElement.classList.remove('show')
}

//The handleClick function is called whenever a cell is clicked.
function handleClick(eventClicker){
    const cell = eventClicker.target

    //if its circle's turn, return circle class otherwise return x class
    const currentClass = circleTurn ? circle_class : x_class

    placeMark(cell, currentClass)

    // Switch Turns
    switchTurns()
    //hover feature
    setBoardHoverClass()

    // Check for Win and Draw
    if (checkWin(currentClass)){
        console.log('winner')
        endGame(false)
    } else if (isDraw()){
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }


}

//marks the place of x's and o's on each cell
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function switchTurns() {
    //turns to the opposite of circle's turn
    circleTurn = !circleTurn
}

//Hovers which CURRENT player's turn it is
function setBoardHoverClass() {
    board.classList.remove(x_class)
    board.classList.remove(circle_class)

    if (circleTurn) {
        board.classList.add(circle_class)
    }   else {
        board.classList.add(x_class)
    }
}

//winning conditions
function checkWin(currentClass){
    //checks all winning conditions to see if they are met by the the arrays.
    //.some loops over all the different conditions
    return winning_conditions.some(combination => {
        //checks all of the values in the cells if they have the same class
        return combination.every(index =>{
            //if the current class are in three continuous cells = winner
            return cellElements[index].classList.contains(currentClass)
        })
            
    })
}

//checks if the game has resulted in a draw by examining all the cells. 
//If all cells are filled but there's no winner, it's a draw.
function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(x_class) ||
        cell.classList.contains(circle_class)
    })
}

//updates the text in the winning message element and shows it on the screen.
function endGame(draw){
    if(draw){
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "X" : "O" } Wins!`
    }
    winningMessageElement.classList.add('show')
}

