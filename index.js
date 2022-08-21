const pickmark = document.querySelectorAll(".pick-mark");
let imgs = {
    silverX:'<img src="assets/icon-x-silver.svg ">',
    silevrO:'<img src="assets/icon-o-silver.svg">',
    darkX:'<img src="assets/icon-x-dark.svg">',
    darkO:'<img src="assets/icon-o-dark.svg">'
}
let turn = "x";

/*******************************pick player 1's mark************************************/

pickmark.forEach(btn => {
    const rememberText = document.querySelector(".remember-text");
    btn.addEventListener("click",()=>{
        if(btn.classList.contains("o-mark-btn")){
            btn.innerHTML = imgs.silevrO;
            btn.classList.remove("is-not-first");
            pickmark[0].classList.add("is-not-first");
            pickmark[0].innerHTML = imgs.darkX;
            rememberText.textContent = "Remember: O goes first";
            turn = "o";
        }else{
            btn.innerHTML = imgs.silverX;
            btn.classList.remove("is-not-first");
            pickmark[1].classList.add("is-not-first");
            pickmark[1].innerHTML = imgs.darkO;
            rememberText.textContent = "Remember: X goes first";
            turn = "x";
        }
    })
});
playerTurn();

function playerTurn(){
    const xo = document.querySelector(".player-turn");
    if(turn === "o")
        xo.firstElementChild.setAttribute("src","assets/icon-o-silver.svg");
    else
        xo.firstElementChild.setAttribute("src","assets/icon-x-silver.svg");
}