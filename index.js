const pickmark = document.querySelectorAll(".pick-mark");
const squares = document.querySelectorAll(".square");
const vsPlayerbtn = document.querySelector(".vs-player-btn");
const xo = document.querySelector(".player-turn");
let imgs = {
    silverX:'<img src="assets/icon-x-silver.svg ">',
    silverO:'<img src="assets/icon-o-silver.svg">',
    darkX:'<img src="assets/icon-x-dark.svg">',
    darkO:'<img src="assets/icon-o-dark.svg">',
    blueX:'<img src="assets/icon-x.svg">',
    yellowO:'<img src="assets/icon-o.svg">'
}
let turn = "o";



vsPlayerbtn.addEventListener("click",()=>{
    const game = document.querySelector(".game");
    const newGame = document.querySelector(".new-game");
    game.style.display = "block";
    newGame.style.display = "none";
})

pickmark.forEach(btn => {
    btn.addEventListener("click",()=>{
        pickFirstMark(btn);
    })
});

squares.forEach((sequare, index)=>{
    sequare.addEventListener("click",()=>{
        playerTurn(sequare);
    })
})







///////////////////////// FUNCTIONS DECLERATIONS /////////////////////////////////////////

function pickFirstMark(btn){
    const rememberText = document.querySelector(".remember-text");
    if(btn.classList.contains("o-mark-btn")){
        pickmark[1].innerHTML = imgs.darkO;
        pickmark[1].classList.add("is-first");
        pickmark[0].classList.remove("is-first");
        pickmark[0].innerHTML = imgs.silverX;
        rememberText.textContent = "Remember: O goes first";
        xo.firstElementChild.setAttribute("src","assets/icon-o-silver.svg");
        turn = "o";
    }else{
        pickmark[0].innerHTML = imgs.darkX;
        pickmark[0].classList.add("is-first");
        pickmark[1].classList.remove("is-first");
        pickmark[1].innerHTML = imgs.silverO;
        rememberText.textContent = "Remember: X goes first";
        xo.firstElementChild.setAttribute("src","assets/icon-x-silver.svg");
        turn = "x";
    }
}

function playerTurn(btn){
    if(turn === "o"){
        btn.innerHTML = imgs.yellowO;
        xo.firstElementChild.setAttribute("src","assets/icon-x-silver.svg");
        turn = "x";
    }
    else{
        btn.innerHTML = imgs.blueX;
        xo.firstElementChild.setAttribute("src","assets/icon-o-silver.svg");
        turn = "o";
    }
}

function convertTo2DIndex(index){
    let matrix = {
        row : Math.floor(index/3),
        col : index % 3
    }
    return matrix;
}

console.log(convertTo2DIndex(8).row);