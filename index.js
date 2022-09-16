////////////////////DECLARITIONS///////////////////////////////////
import playerResult from "./playerResult.js";
import { restart, quiteGame, updateTiedCounter,endGame } from "./gameState.js";
const pickmark = document.querySelectorAll(".pick-mark");
const game = document.querySelector(".game");
const newGame = document.querySelector(".new-game");
const squares = document.querySelectorAll(".square");
const vsPlayerbtn = document.querySelector(".vs-player-btn");
const vsCpuBtn = document.querySelector(".vs-cpu-btn");
const playerWin = document.querySelector(".player-win");
const xo = document.querySelector(".player-turn");
const restartBtn = document.querySelector(".restart-btn");
const xCounter = document.getElementById("x-counter");
const tiedCounter = document.getElementById("tied-counter");
const oCounter = document.getElementById("o-counter");
const cancelBtn = document.querySelector(".cancel");
const yesRestartBtn = document.querySelector(".yes-restart");
const nextRoundBtn = document.querySelector(".next-round");
const quitBtn = document.querySelector(".quit");
const rememberText = document.querySelector(".remember-text");
let value;
let squarePosition = [0,0,0,0,0,0,0,0,0];
let imgs = {
    silverX:'<img src="assets/icon-x-silver.svg ">',
    silverO:'<img src="assets/icon-o-silver.svg">',
    darkX:'<img src="assets/icon-x-dark.svg">',
    darkO:'<img src="assets/icon-o-dark.svg">',
    blueX:'<img src="assets/icon-x.svg">',
    yellowO:'<img src="assets/icon-o.svg">',
    outlineX:'<img src="assets/icon-x-outline.svg" class="outlineImg">',
    outlineO:'<img src="assets/icon-o-outline.svg" class="outlineImg">'
}
let winningCombination = [
                            [0,1,2],[0,3,6],[0,4,8],
                            [3,4,5],[6,7,8],[1,4,7],
                            [2,5,8],[2,4,6]
                         ];
if(!sessionStorage.firstMark){
    sessionStorage.setItem("firstMark",2);
}
if(!sessionStorage.isOfirst){
    sessionStorage.setItem("isOfirst",true);
}
let turn = +sessionStorage.firstMark;
turn === -2 ? xo.firstElementChild.setAttribute("src","assets/icon-x-silver.svg"):
xo.firstElementChild.setAttribute("src","assets/icon-o-silver.svg");

///////////////////// ADD EVENT LISTENER ////////////////////////////


///// when cpu btn is clicked ///////
vsCpuBtn.addEventListener("click",()=>{
    sessionStorage.setItem("cpu", true);
    displayUi();
    if(turn === 2 && sessionStorage.cpu) setTimeout(aiTurn, 100);
})

if(sessionStorage.displayBlock && sessionStorage.displayNone){
    game.style.display = sessionStorage.displayBlock;
    newGame.style.display = sessionStorage.displayNone;
}
playerResult();

pickmark.forEach(btn => {
    btn.addEventListener("click",()=>{
        if(btn.classList.contains("o-mark-btn")){
            isOFirstMark();
            rememberText.textContent = `Remember: O goes first`;
            turn = +(sessionStorage.firstMark = 2);
            sessionStorage.isOfirst = true;
            xo.firstElementChild.setAttribute("src","assets/icon-o-silver.svg");
            pickmark[0].classList.remove("is-first");
            pickmark[1].classList.add("is-first");
        }else{
            isXFirstMark();
            rememberText.textContent = `Remember: X goes first`;
            turn = +(sessionStorage.firstMark = -2);
            sessionStorage.isOfirst = false;
            xo.firstElementChild.setAttribute("src","assets/icon-x-silver.svg");
            pickmark[0].classList.add("is-first");
            pickmark[1].classList.remove("is-first");
        }
    });
});
if(turn === 2 && sessionStorage.cpu) setTimeout(aiTurn, 150);
function whoseNextTurnLabel(){
    turn === 2 ? xo.firstElementChild.setAttribute("src","assets/icon-x-silver.svg"):
    xo.firstElementChild.setAttribute("src","assets/icon-o-silver.svg");
}

vsPlayerbtn.addEventListener("click",displayUi);
function displayUi(){
    sessionStorage.displayNone = "none";
    sessionStorage.displayBlock = "block";
    game.style.display = sessionStorage.displayBlock;
    newGame.style.display = sessionStorage.displayNone;
}

squares.forEach((square, index)=>{
    squareOnHover(square, index);
});

squares.forEach((sequare, index)=>{
    sequare.addEventListener("click",function handler(){
        if(squarePosition[index]=== 0){
            whoseNextTurnLabel()
            squarePosition[index] = turn;
            if(turn === -2){
                sequare.innerHTML = imgs.blueX;
                if(hasWinner(-2)){
                    winnerButtonsStyle(-2, "x-win-class", imgs.darkX);
                    endGame("PLAYER 2 WINS!", imgs.blueX, "#31C3BD");
                    sessionStorage.xCounter = Number(sessionStorage.xCounter) + 1;
                    xCounter.innerHTML = sessionStorage.xCounter;
                }
                else if(isTied()){
                    tiedStyle();
                    updateTiedCounter();
                }
                if(!sessionStorage.cpu) switchTurn();
            }else if(!sessionStorage.cpu){
                sequare.innerHTML = imgs.yellowO;
                if(hasWinner(2)) oHasWin("PLAYER 1 WINS!");
                else if(isTied()) tiedUi();
                switchTurn()
            }
            console.time('Execution Time');
            if(sessionStorage.cpu && !isTied()){
                switchTurn();
                setTimeout(aiTurn, 200);
            }
            console.timeEnd('Execution Time');
            console.log(squarePosition);
        }
    },{once:true})
});
function aiTurn(){
    let finalScore = -10;
    let bestMove;
    squarePosition.forEach((el,index)=>{
        if(el === 0){
            squarePosition[index] = 2;
            let score = minmax(10,false);
            squarePosition[index] = 0;
            if(score > finalScore){
                finalScore = score;
                bestMove = index;
            }
        }
    })
    squares[bestMove].innerHTML = imgs.yellowO;
    squarePosition[bestMove] = 2;
    if(hasWinner(2)) oHasWin("OH NO, YOU LOST...");
    else if(sessionStorage.isOfirst && isTied()) tiedUi();
    whoseNextTurnLabel();
    switchTurn();
}
function oHasWin(endGameText){
        winnerButtonsStyle(2, "o-win-class", imgs.darkO);
        endGame(endGameText, imgs.yellowO, "#F2B137");
        sessionStorage.oCounter = Number(sessionStorage.oCounter) + 1;
        oCounter.innerHTML = sessionStorage.oCounter;
}
function tiedUi(){
    tiedStyle();
    updateTiedCounter();
}
function minmax(depth,isMaximizing){
    if(checkWinner() !== 1){
        return checkWinner();
    }
    if(isMaximizing){
        let finalScore = -10;
        squarePosition.forEach((el,index)=>{
            if(el === 0){
                squarePosition[index] = 2;
                let score = minmax(depth-1,false);
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
                squarePosition[index] = -2;
                let score = minmax(depth-1,true);
                squarePosition[index] = 0;
                if(score < finalScore){
                    finalScore = score;
                }
            }
        })
        return finalScore;
    }
}
restartBtn.addEventListener("click", restart);
cancelBtn.addEventListener("click",()=>{
    playerWin.style.display = "none";
    playerWin.children[1].style.display = "none";
});
yesRestartBtn.addEventListener("click",()=>{
    quiteGame();
});
nextRoundBtn.addEventListener("click",()=>{
        location.reload();
});
quitBtn.addEventListener("click",()=>{
    quiteGame();
});

///////////////////////// FUNCTIONS DECLERATIONS /////////////////////////////////////////

//// change O button image to grey and x iamge button to dark
function isXFirstMark(){
    pickmark[0].innerHTML = imgs.darkX;
    pickmark[1].innerHTML = imgs.silverO;
}
//// change O button image to dark and x iamge button to grey
function isOFirstMark(){
    pickmark[1].innerHTML = imgs.darkO;
    pickmark[0].innerHTML = imgs.silverX;
}

function squareOnHover(square, index){
    square.addEventListener("mouseover",()=>{
        //////check if square is empty if so and outline image.
        if(squarePosition[index] === 0){
            if(turn === -2 && sessionStorage.cpu) squares[index].innerHTML = imgs.outlineX ;
            else if(!sessionStorage.cpu) turn === -2? squares[index].innerHTML = imgs.outlineX : squares[index].innerHTML = imgs.outlineO;
        }
    })
    square.addEventListener("mouseout",()=>{
        //////remove outline image.
        if(squarePosition[index] === 0 && squares[index].childNodes.length !== 0 ){
            squares[index].innerHTML = "";
        }
    })
}
////loop of every combination and then check if every element in the combination is equal to num if true return the first element.
function checkWin(num){
    return winningCombination.find( combination => combination.every(position=>squarePosition[position] === num));
}

function hasWinner(num){
    return checkWin(num) !== undefined;
}

function winnerButtonsStyle(num, winClass, bgImg){
    for(let i = 0 ;i<3; i++){
        squares[checkWin(num)[i]].classList.add(winClass);
        squares[checkWin(num)[i]].innerHTML = bgImg;
    }
}

function isTied(){
    return !squarePosition.some(i => i === 0);
}

function tiedStyle(){
    playerWin.style.display = "block";
    playerWin.children[0].children[0].style.display = "none";
    playerWin.children[0].children[1].style.display = "none";
    playerWin.children[0].children[2].style.display = "block";
}

function switchTurn(){
    turn *= -1;
}
function checkWinner(){
    if(winningCombination.some(arr => arr.every(el=> squarePosition[el] === 2))) return 2;
    if(winningCombination.some(arr => arr.every(el=> squarePosition[el] === -2))) return -2;
    return isTied() ? 0 : 1 ; 
}


