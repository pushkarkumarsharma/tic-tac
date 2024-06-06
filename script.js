const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGamebtn = document.querySelector('.btn');
let currentPlayer;
let gameGrid;
const winnerPos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

];
function initGame() {
    currentPlayer = "X"
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList=`box box-${index+1}`;
    });
    newGamebtn.classList.remove("active");
    gameInfo.innerText = `CurrentPlayer - ${currentPlayer}`;

}
initGame();
function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    gameInfo.innerText = `currentPlayer - ${currentPlayer}`;
}

function handleCLick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameover();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleCLick(index);
    })
});
function checkGameover() {
    let answer = "";
    winnerPos.forEach((position) => {
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {
            if (gameGrid[position[0]] === "X")
                answer = "X";
            else
                answer = "0";

            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    if(answer!==""){
        gameInfo.innerText=`Winner Player - ${answer}`;
        newGamebtn.classList.add("active");
        return;
    }
    let fill=0;
    gameGrid.forEach((box)=>{
        if(box!=="")
            fill++;
    });
    if(fill===9){
        gameInfo.innerText="Game Tied";
        newGamebtn.classList.add("active");
    }

}
newGamebtn.addEventListener("click", initGame);
