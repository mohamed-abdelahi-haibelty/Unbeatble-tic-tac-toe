const playerWin = document.querySelector(".player-win");
const tiedCounter = document.getElementById("tied-counter");
export const restart = function restart(){
    playerWin.style.display = "block";
    playerWin.children[0].style.display = "none";
    playerWin.children[1].style.display = "block";
}

export const quiteGame = function quiteGame(){
    sessionStorage.clear();
    location.reload();
}

export const updateTiedCounter = function updateTiedCounter(){
    sessionStorage.tiedCounter = Number(sessionStorage.tiedCounter) + 1;
    tiedCounter.innerHTML = sessionStorage.tiedCounter;
}
export const endGame = function endGame(text, winImg, textColor){
    const takesRound = document.getElementById("takes-round");
    playerWin.style.display = "block";
    playerWin.children[0].children[0].innerHTML = text;
    takesRound.insertAdjacentHTML("beforebegin", winImg);
    takesRound.style.color = textColor;
}