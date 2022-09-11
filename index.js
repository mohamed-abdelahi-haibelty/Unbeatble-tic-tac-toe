////////////////////DECLARITIONS///////////////////////////////////
const pickmark = document.querySelectorAll(".pick-mark");
const game = document.querySelector(".game");
const newGame = document.querySelector(".new-game");
const squares = document.querySelectorAll(".square");
const vsPlayerbtn = document.querySelector(".vs-player-btn");
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
let value;
let squarePosition = [0,0,0,0,0,0,0,0,0];
let imgs = {
    silverX:'<img src="assets/icon-x-silver.svg ">',
    silverO:'<img src="assets/icon-o-silver.svg">',
    darkX:'<img src="assets/icon-x-dark.svg">',
    darkO:'<img src="assets/icon-o-dark.svg">',
    blueX:'<img src="assets/icon-x.svg">',
    yellowO:'<img src="assets/icon-o.svg">',
    outlineX:'<img src="assets/icon-x-outline.svg">',
    outlineO:'<img src="assets/icon-o-outline.svg">'
}
let turn = -1;
let winningCombination = [
                            [0,1,2],[0,3,6],[0,4,8],
                            [3,4,5],[6,7,8],[1,4,7],
                            [2,5,8],[2,4,6]
                         ];

///////////////////// ADD EVENT LISTENER ////////////////////////////

if(sessionStorage.displayBlock && sessionStorage.displayNone){
    game.style.display = sessionStorage.displayBlock;
    newGame.style.display = sessionStorage.displayNone;
}
playerResult();

pickmark.forEach(btn => {
    btn.addEventListener("click",()=>{
        if(btn.classList.contains("o-mark-btn")){
            isOFirstMark();
            remember("O");
            playerTurn();
            switchTurn();
        }else{
            isXFirstMark();
            remember("X");
            playerTurn();
            switchTurn();
        }
    });
});

vsPlayerbtn.addEventListener("click",()=>{
    sessionStorage.displayNone = "none";
    sessionStorage.displayBlock = "block";
    game.style.display = sessionStorage.displayBlock;
    newGame.style.display = sessionStorage.displayNone;
});

squares.forEach((square, index)=>{
    squareOnHover(square, index);
});

squares.forEach((sequare, index)=>{
    sequare.addEventListener("click",function handler(){
        playerTurn();
        squarePosition[index] = value;
        if(turn === 1){
            sequare.innerHTML = imgs.blueX;;
            if(hasWinner(1)){
                winnerButtonsStyle(1, "x-win-class", imgs.darkX);
                endGame("PLAYER 2 WINS!", imgs.blueX, "#31C3BD");
                sessionStorage.xCounter = Number(sessionStorage.xCounter) + 1;
                xCounter.innerHTML = sessionStorage.xCounter;
            }
            else if(isTied()){
                tiedStyle();
                updateTiedCounter();
            }
        }else{
            sequare.innerHTML = imgs.yellowO;
            if(hasWinner(-1)){
                winnerButtonsStyle(-1, "o-win-class", imgs.darkO);
                endGame("PLAYER 1 WINS!", imgs.yellowO, "#F2B137");
                sessionStorage.oCounter = Number(sessionStorage.oCounter) + 1;
                oCounter.innerHTML = sessionStorage.oCounter;
            }
            else if(isTied()){
                tiedStyle();
                updateTiedCounter();
            }
        }
        switchTurn();
    },{once:true})
});

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

function isXFirstMark(){
    pickmark[0].innerHTML = imgs.darkX;
    pickmark[0].classList.add("is-first");
    pickmark[1].classList.remove("is-first");
    pickmark[1].innerHTML = imgs.silverO;
}

function isOFirstMark(){
    pickmark[1].innerHTML = imgs.darkO;
    pickmark[1].classList.add("is-first");
    pickmark[0].classList.remove("is-first");
    pickmark[0].innerHTML = imgs.silverX;
}

function remember(mark){
    const rememberText = document.querySelector(".remember-text");
    rememberText.textContent = `Remember: ${mark} goes first`;
}

function squareOnHover(square, index){
    square.addEventListener("mouseover",()=>{
        if(squarePosition[index] === 0){
            turn === 1? squares[index].innerHTML = imgs.outlineX : squares[index].innerHTML = imgs.outlineO;
        }
    })
    square.addEventListener("mouseout",()=>{
        if(squarePosition[index] === 0 && squares[index].childNodes.length !== 0 ){
            squares[index].innerHTML = "";
        }
    })
}

function playerTurn(){
    if(turn === -1){
        xo.firstElementChild.setAttribute("src","assets/icon-x-silver.svg");
        value = -1;
    }
    else{
        xo.firstElementChild.setAttribute("src","assets/icon-o-silver.svg");
        value = 1;
    }
}

function checkWin(num){
    return winningCombination.find((combination)=>{
        return combination.every((position)=>{
            return squarePosition[position] === num;
         });
         
    });
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
    let tied = true;
    for(let i = 0; i<9; i++){
        if(squarePosition[i] === 0){
            tied = false;
            break;
        }
    }
    return tied;
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

function endGame(text, winImg, textColor){
    const takesRound = document.getElementById("takes-round");
    playerWin.style.display = "block";
    playerWin.children[0].children[0].innerHTML = text;
    takesRound.insertAdjacentHTML("beforebegin", winImg);
    takesRound.style.color = textColor;
}

function restart(){
    playerWin.style.display = "block";
    playerWin.children[0].style.display = "none";
    playerWin.children[1].style.display = "block";
}

function playerResult(){
    if(!(sessionStorage.xCounter && sessionStorage.tiedCounter && sessionStorage.oCounter)){
        sessionStorage.setItem("xCounter", 0);
        sessionStorage.setItem("tiedCounter", 0);
        sessionStorage.setItem("oCounter", 0);
    }
    xCounter.innerHTML = sessionStorage.xCounter;
    tiedCounter.innerHTML = sessionStorage.tiedCounter;
    oCounter.innerHTML = sessionStorage.oCounter;
}

function updateTiedCounter(){
    sessionStorage.tiedCounter = Number(sessionStorage.tiedCounter) + 1;
    tiedCounter.innerHTML = sessionStorage.tiedCounter;
}

function quiteGame(){
    sessionStorage.clear();
    location.reload();
}


