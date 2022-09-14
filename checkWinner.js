import { squarePosition } from "./index.js";
import { winningCombination } from "./index.js";
export const checkWinner = function checkWinner(num){
    if(checkWin(num) === undefined) return isTied() ? 0 : 1 ; 
    return squarePosition[checkWin(num)[0]] === 2 ?  2 : -2;
}
export const checkWin = function checkWin(num){
    return winningCombination.find( combination => combination.every(position=>squarePosition[position] === num));
}
export const isTied =  function isTied(){
    return !squarePosition.some(i => i === 0);
}