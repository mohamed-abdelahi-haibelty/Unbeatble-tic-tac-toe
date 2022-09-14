const squares = document.querySelectorAll(".square");
const vsPlayerbtn = document.querySelector(".vs-player-btn");
const playerWin = document.querySelector(".player-win");
let squarePosition = [0,0,0,0,0,0,0,0,0];
let winningCombination = [
    [0,1,2],[0,3,6],[0,4,8],
    [3,4,5],[6,7,8],[1,4,7],
    [2,5,8],[2,4,6]
 ];
squares.forEach((square,index)=>{
    square.addEventListener("click",()=>{
        console.time('Execution Time');
        square.textContent = "X";
        squarePosition[index] = -2;
        aiTurn();
        console.timeEnd('Execution Time');
    });
})

function aiTurn(){
    let finalScore = -10;
    let bestMove;
    squarePosition.forEach((el,index)=>{
        if(el === 0){
            squares[index].textContent = "O";
            squarePosition[index] = 2;
            let score = minmax(10,false);
            squares[index].textContent = "";
            squarePosition[index] = 0;
            if(score > finalScore){
                finalScore = score;
                bestMove = index;
            }
        }
    })
    squares[bestMove].textContent = "O";
    squarePosition[bestMove] = 2;
}
function minmax(depth,isMaximizing){
    if(checkWinner() !== 1){
        return result = checkWinner();
    }
    if(isMaximizing){
        let finalScore = -10;
        squarePosition.forEach((el,index)=>{
            if(el === 0){
                squares[index].textContent = "O";
                squarePosition[index] = 2;
                let score = minmax(depth-1,false);
                squares[index].textContent = "";
                squarePosition[index] = 0;
                if(score > finalScore){
                    finalScore = score;
                }
            }
        })
        return finalScore;
    }
    else{
        let finalScore = 10;
        squarePosition.forEach((el,index)=>{
            if(el === 0){
                squares[index].textContent = "X";
                squarePosition[index] = -2;
                let score = minmax(depth-1,true);
                squares[index].textContent = "";
                squarePosition[index] = 0;
                if(score < finalScore){
                    finalScore = score;
                }
            }
        })
        return finalScore;
    }
}
function checkWinner(){
  let isTherWiner = winningCombination.find(arr => arr.every((el,i,array) => squares[el].textContent !=="" && squares[el].textContent === squares[array[0]].textContent));
  if(isTherWiner === undefined) return isTied() ? 0 : 1 ; 
  return squares[isTherWiner[0]].textContent === "O" ?  2 : -2;
}
function isTied(){
    return !squarePosition.some(i => i === 0);
}